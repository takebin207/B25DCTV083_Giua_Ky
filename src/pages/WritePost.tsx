import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { savePost } from "../storage";
import type { Post } from "../types";

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    body?: string;
    save?: string;
  }>({});
  const navigate = useNavigate();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (title.trim().length < 5 || title.trim().length > 150)
      nextErrors.title =
        "Tiêu đề cần từ 5 đến 150 ký tự, không tính khoảng trắng ở hai đầu.";
    if (body.trim().length < 20 || body.trim().length > 10000)
      nextErrors.body = "Nội dung cần từ 20 đến 10.000 ký tự.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const post: Post = {
      id: `local-${crypto.randomUUID()}`,
      userId: 1,
      title: title.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    };
    try {
      savePost(post);
      navigate(`/posts/${post.id}`);
    } catch {
      setErrors({
        save: "Chưa lưu được bài viết. Bộ nhớ trình duyệt có thể đã đầy hoặc bị chặn. Nội dung của bạn vẫn ở đây, hãy thử lại.",
      });
    }
  }

  return (
    <section className="form-page write-page">
      <Link className="back-link" to="/">
        ← Tất cả bài viết
      </Link>
      <span className="eyebrow">TRANG GIẤY CỦA BẠN</span>
      <h1>Kể câu chuyện của bạn.</h1>
      <p className="muted">
        Không cần hoàn hảo. Chỉ cần là điều bạn muốn chia sẻ.
      </p>
      <form onSubmit={submit} noValidate>
        <div className="label-row">
          <label htmlFor="title">Tiêu đề bài viết</label>
          <span>{title.length}/150</span>
        </div>
        <input
          id="title"
          placeholder="Một tiêu đề cho câu chuyện này…"
          maxLength={150}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p className="field-error" id="title-error" role="alert">
            {errors.title}
          </p>
        )}
        <div className="label-row">
          <label htmlFor="body">Nội dung</label>
          <span>{body.length}/10.000</span>
        </div>
        <textarea
          id="body"
          rows={12}
          placeholder="Bắt đầu từ điều bạn đang nghĩ…"
          maxLength={10000}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          aria-invalid={!!errors.body}
          aria-describedby={errors.body ? "body-error" : undefined}
        />
        {errors.body && (
          <p className="field-error" id="body-error" role="alert">
            {errors.body}
          </p>
        )}
        {errors.save && (
          <p className="field-error" role="alert">
            {errors.save}
          </p>
        )}
        <div className="form-actions">
          <p>Bài viết được lưu trên trình duyệt này.</p>
          <button className="button" type="submit">
            Đăng bài viết ↗
          </button>
        </div>
      </form>
    </section>
  );
}
