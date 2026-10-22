import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { readAllPosts } from "../storage";

const PAGE_SIZE = 3;

export default function Home() {
  const [posts] = useState(readAllPosts);
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const requestedPage = Math.max(1, Number(params.get("page")) || 1);

  const filtered = posts.filter((post) =>
    post.title
      .toLocaleLowerCase("vi")
      .includes(query.trim().toLocaleLowerCase("vi")),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(totalPages, Math.floor(requestedPage));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changePage(next: number) {
    setParams(
      query ? { q: query, page: String(next) } : { page: String(next) },
    );
    document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="live-dot" /> KHÔNG GIAN CỦA NHỮNG Ý TƯỞNG
          </span>
          <h1>
            Chuyện nhỏ.
            <br />
            <em>Cảm hứng lớn.</em>
          </h1>
          <p>
            Mỗi bài viết là một góc nhìn mới.
            <br />
            Ghé đọc một chút, hoặc kể câu chuyện của riêng bạn.
          </p>
          <Link className="text-link" to="/write">
            Bắt đầu viết <span>↗</span>
          </Link>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="paper paper-back" />
          <div className="paper paper-front">
            <span className="paper-label">MỘT Ý TƯỞNG MỚI</span>
            <span className="paper-spark">✳</span>
            <div className="paper-lines">
              <i />
              <i />
              <i />
            </div>
            <span className="paper-bottom">bắt đầu từ một dòng chữ.</span>
          </div>
          <span className="art-caption">GHI LẠI ĐIỀU BẠN NGHĨ.</span>
          <span className="floating-star">✦</span>
        </div>
      </section>
      <section id="stories" className="stories">
        <div className="section-heading">
          <div>
            <span className="eyebrow">GÓC ĐỌC</span>
            <h2>
              Những câu chuyện{" "}
              <span className="count">{posts.length}</span>
            </h2>
          </div>
          <div className="search">
            <span aria-hidden="true">⌕</span>
            <label className="sr-only" htmlFor="search">
              Tìm kiếm theo tiêu đề
            </label>
            <input
              id="search"
              type="search"
              placeholder="Tìm một bài viết…"
              value={query}
              onChange={(event) =>
                setParams(event.target.value ? { q: event.target.value } : {}, {
                  replace: true,
                })
              }
            />
          </div>
        </div>
        {query && (
          <p className="search-result">
            {filtered.length} kết quả cho “{query}”
          </p>
        )}
        {visible.length > 0 ? (
          <div className="post-grid">
            {visible.map((post, index) => (
              <article className="post-card" key={post.id}>
                <div className="card-top">
                  <span
                    className={post.sourceUrl ? "tag" : "tag tag-local"}
                  >
                    {post.category || "Bài của bạn"}
                  </span>
                  <span className="card-number">
                    {String((page - 1) * PAGE_SIZE + index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>
                </div>
                <h3>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="excerpt">{post.body}</p>
                <div className="card-footer">
                  <div className="author">
                    <span className={`avatar color-${post.userId % 4}`}>
                      {post.sourceUrl ? "M" : "A"}
                    </span>
                    <span>
                      {post.authorName || "Admin"}
                      <small>
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString(
                              "vi-VN",
                            )
                          : "Cộng đồng MiniBlog"}
                      </small>
                    </span>
                  </div>
                  <Link
                    className="read-arrow"
                    to={`/posts/${post.id}`}
                    aria-label={`Đọc bài: ${post.title}`}
                  >
                    ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
            <div className="state">
              <h3>{query ? "Chưa tìm thấy câu chuyện nào" : "Chưa có bài viết nào"}</h3>
              <p>{query ? "Thử tìm bằng một từ khóa khác nhé." : "Hãy chia sẻ câu chuyện đầu tiên của bạn."}</p>
              {query ? (
                <button
                  className="button button-outline"
                  onClick={() => setParams({})}
                >
                  Xóa tìm kiếm
                </button>
              ) : (
                <Link className="button" to="/write">Viết bài đầu tiên ↗</Link>
              )}
            </div>
        )}
        {totalPages > 1 && (
          <div className="pagination">
            <span>
              Trang {page} / {totalPages}
            </span>
            <div>
              <button
                disabled={page === 1}
                onClick={() => changePage(page - 1)}
              >
                ← Trước
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => changePage(page + 1)}
              >
                Sau →
              </button>
            </div>
          </div>
        )}
      </section>
      <aside className="write-banner">
        <div>
          <span className="eyebrow">ĐẾN LƯỢT BẠN</span>
          <h2>Bạn đang có điều muốn kể?</h2>
          <p>Một suy nghĩ, một trải nghiệm, hay chỉ là chuyện hôm nay.</p>
        </div>
        <Link to="/write" className="button">
          Viết câu chuyện của bạn ↗
        </Link>
      </aside>
    </>
  );
}
