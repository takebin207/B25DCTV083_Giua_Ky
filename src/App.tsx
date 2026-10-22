import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { hasSession } from "./storage";
import { NotFound } from "./components";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import WritePost from "./pages/WritePost";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(hasSession);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  function logout() {
    sessionStorage.removeItem("miniblog_user");
    setLoggedIn(false);
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Đến nội dung chính
      </a>
      <header className="header">
        <div className="container header-inner">
          <Link className="logo" to="/" aria-label="MiniBlog — Trang chủ">
            <span className="logo-mark">m.</span>mini<span>blog</span>
            <span className="logo-dot">.</span>
          </Link>
          <nav aria-label="Điều hướng chính">
            <NavLink to="/" end>
              Trang chủ
            </NavLink>
            {loggedIn ? (
              <>
                <span className="hello">Chào, admin</span>
                <button className="nav-button" onClick={logout}>
                  Đăng xuất
                </button>
              </>
            ) : (
              <NavLink to="/login">Đăng nhập</NavLink>
            )}
            <Link className="button button-small" to="/write">
              <span aria-hidden="true">＋</span> Viết bài
            </Link>
          </nav>
        </div>
      </header>
      <main id="main" className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route
            path="/login"
            element={
              <Login loggedIn={loggedIn} onLogin={() => setLoggedIn(true)} />
            }
          />
          <Route
            path="/write"
            element={
              loggedIn ? (
                <WritePost />
              ) : (
                <Navigate to="/login" replace state={{ from: "/write" }} />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer container">
        <span>
          <strong>miniblog.</strong> Một góc nhỏ, nhiều câu chuyện.
        </span>
        <span>Đọc · Viết · Kết nối</span>
      </footer>
    </>
  );
}
