import { useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

export default function Login({ loggedIn, onLogin }: {
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
      setError("Không lưu được phiên đăng nhập. Hãy kiểm tra quyền lưu trữ của trình duyệt.");
    }
  }

  return (
    <section className="form-page login-page">
      <h1>Đăng nhập</h1>
      <form onSubmit={submit}>
        <label htmlFor="username">Tên đăng nhập</label>
        <input id="username" autoComplete="username" required value={username}
          onChange={(event) => setUsername(event.target.value)} />
        <label htmlFor="password">Mật khẩu</label>
        <input id="password" type="password" autoComplete="current-password" required value={password}
          onChange={(event) => setPassword(event.target.value)} />
        {error && <p className="field-error" role="alert">{error}</p>}
        <button type="submit">Đăng nhập</button>
      </form>
      <p className="demo-note">Tài khoản demo: <strong>admin / 123456</strong></p>
      <Link to="/">Về trang chủ</Link>
    </section>
  );
}
