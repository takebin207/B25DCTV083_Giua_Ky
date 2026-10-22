import { Link, useSearchParams } from "react-router-dom";
import { readAllPosts } from "../storage";

const PAGE_SIZE = 3;

export default function Home() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const posts = readAllPosts();
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const requestedPage = Math.floor(Number(params.get("page"))) || 1;
  const page = Math.min(totalPages, Math.max(1, requestedPage));
  const visiblePosts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changePage(next: number) {
    setParams({ q: query, page: String(next) });
  }

  return (
    <section>
      <h1>Danh sách bài viết</h1>
      <p className="muted">Đọc truyện dân gian và chia sẻ bài viết của bạn.</p>
      <label htmlFor="search">Tìm theo tiêu đề</label>
      <input
        id="search"
        type="search"
        placeholder="Nhập tên bài viết..."
        value={query}
        onChange={(event) => setParams(event.target.value ? { q: event.target.value } : {})}
      />
      <p>Tìm thấy {filtered.length} / {posts.length} bài viết</p>

      <div className="post-grid">
        {visiblePosts.map((post) => (
          <article className="post-card" key={post.id}>
            <span className="tag">{post.category || "Bài của bạn"}</span>
            <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
            <p className="excerpt">{post.body}</p>
            <p className="muted">
              {post.authorName || "Admin"}
              {post.createdAt && ` · ${new Date(post.createdAt).toLocaleDateString("vi-VN")}`}
            </p>
            <Link to={`/posts/${post.id}`}>Đọc tiếp →</Link>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="state">
          <p>Không có bài viết phù hợp.</p>
          <button onClick={() => setParams({})}>Xóa tìm kiếm</button>
        </div>
      )}
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => changePage(page - 1)}>Trước</button>
          <span>Trang {page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => changePage(page + 1)}>Sau</button>
        </div>
      )}
    </section>
  );
}
