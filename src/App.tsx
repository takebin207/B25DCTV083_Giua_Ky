import { useState } from "react";
import { Link, Navigate, NavLink, Route, Routes } from "react-router-dom";
import { hasSession } from "./storage";
import { NotFound } from "./components";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import WritePost from "./pages/WritePost";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(hasSession);

  function logout() {
    sessionStorage.removeItem("miniblog_user");
    setLoggedIn(false);
  }

  return (
    <>
      <header>
        <div className="container header-inner">
          <Link className="logo" to="/">MiniBlog</Link>
          <nav aria-label="Điều hướng chính">
            <NavLink to="/" end>Trang chủ</NavLink>
            <NavLink to="/write">Viết bài</NavLink>
            {loggedIn ? (
              <>
                <span>Chào, admin</span>
                <button onClick={logout}>Đăng xuất</button>
              </>
            ) : (
              <NavLink to="/login">Đăng nhập</NavLink>
            )}
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login loggedIn={loggedIn} onLogin={() => setLoggedIn(true)} />} />
          <Route
            path="/write"
            element={loggedIn ? <WritePost /> : <Navigate to="/login" replace state={{ from: "/write" }} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="container">MiniBlog — Bài thực hành lập trình web</footer>
    </>
  );
}
