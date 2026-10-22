import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="state">
      <h1>404 — Không tìm thấy trang</h1>
      <p>Trang hoặc bài viết này không tồn tại.</p>
      <Link to="/">Về trang chủ</Link>
    </section>
  );
}
