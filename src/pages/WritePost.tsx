import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { savePost } from "../storage";

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTitle = title.trim();
    const cleanBody = body.trim();
    if (cleanTitle.length < 5 || cleanTitle.length > 150) {
      setError("Tiêu đề cần từ 5 đến 150 ký tự.");
      return;
    }
    if (cleanBody.length < 20 || cleanBody.length > 10000) {
      setError("Nội dung cần từ 20 đến 10.000 ký tự.");
      return;
    }

    const post = {
      id: `local-${crypto.randomUUID()}`,
      userId: 1,
      title: cleanTitle,
      body: cleanBody,
      createdAt: new Date().toISOString(),
    };
    try {
      savePost(post);
      navigate(`/posts/${post.id}`);
    } catch {
      setError("Không lưu được bài viết. Bộ nhớ có thể đã đầy hoặc bị chặn.");
    }
  }

  return (
    <section className="form-page">
      <h1>Viết bài mới</h1>
      <form onSubmit={submit}>
        <label htmlFor="title">Tiêu đề (5–150 ký tự)</label>
        <input id="title" required maxLength={150} value={title}
          onChange={(event) => setTitle(event.target.value)} />
        <label htmlFor="body">Nội dung (20–10.000 ký tự)</label>
        <textarea id="body" required maxLength={10000} rows={10} value={body}
          onChange={(event) => setBody(event.target.value)} />
        {error && <p className="field-error" role="alert">{error}</p>}
        <div className="form-actions">
          <button type="submit">Đăng bài</button>
          <Link to="/">Hủy</Link>
        </div>
      </form>
      <p className="muted">Bài viết được lưu trên trình duyệt này.</p>
    </section>
  );
}
