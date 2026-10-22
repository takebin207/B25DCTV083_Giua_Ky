import { useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

export default function Login({
  loggedIn,
  onLogin,
}: {
  loggedIn: boolean;
  onLogin: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.from === "/write" ? "/write" : "/";

  if (loggedIn) return <Navigate to={destination} replace />;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username.trim() !== "admin" || password !== "123456") {
      setError("Tên đăng nhập hoặc mật khẩu chưa đúng.");
      return;
    }
    try {
      sessionStorage.setItem("miniblog_user", "admin");
      onLogin();
      navigate(destination, { replace: true });
    } catch {
      setError(
        "Trình duyệt không cho phép lưu phiên đăng nhập. Hãy bật quyền lưu trữ rồi thử lại.",
      );
    }
  }

  return (
    <section className="form-page login-page">
      <Link className="back-link" to="/">
        ← Về trang chủ
      </Link>
      <span className="eyebrow">CHÀO MỪNG TRỞ LẠI</span>
      <h1>
        Một câu chuyện mới
        <br />
        đang chờ bạn viết.
      </h1>
      <p className="muted">
        Đăng nhập để chia sẻ ý tưởng của bạn với MiniBlog.
      </p>
      <form onSubmit={submit}>
        <label htmlFor="username">Tên đăng nhập</label>
        <input
          id="username"
          autoComplete="username"
          placeholder="Nhập tên đăng nhập"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">Mật khẩu</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Nhập mật khẩu"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {error && (
          <p role="alert" className="field-error">
            {error}
          </p>
        )}
        <button className="button full-width" type="submit">
          Đăng nhập →
        </button>
      </form>
      <p className="demo-note">
        Tài khoản demo: <strong>admin</strong> / <strong>123456</strong>
      </p>
    </section>
  );
}
