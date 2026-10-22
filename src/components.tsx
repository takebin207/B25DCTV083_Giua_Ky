import { Link } from "react-router-dom";

export function Loading() {
  return (
    <div className="state" role="status">
      <span className="spinner" />
      <p>Đang tải câu chuyện…</p>
    </div>
  );
}

export function ErrorMessage({
  message,
  retry,
}: {
  message: string;
  retry?: () => void;
}) {
  return (
    <div className="state error" role="alert">
      <h2>Chưa tải được dữ liệu</h2>
      <p>{message}</p>
      {retry && (
        <button className="button" onClick={retry}>
          Thử lại
        </button>
      )}
    </div>
  );
}

export function NotFound() {
  return (
    <section className="state not-found">
      <span className="eyebrow">LẠC ĐƯỜNG MỘT CHÚT</span>
      <div className="error-code">404</div>
      <h1>Trang này không tồn tại.</h1>
      <p>Có thể đường dẫn đã sai. Những câu chuyện khác vẫn đang chờ bạn.</p>
      <Link className="button" to="/">
        Về trang chủ →
      </Link>
    </section>
  );
}
