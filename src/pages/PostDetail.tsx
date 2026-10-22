import { Link, useParams } from "react-router-dom";
import { NotFound } from "../components";
import { readAllPosts, readComments } from "../storage";

export default function PostDetail() {
  const { id } = useParams();
  const post = readAllPosts().find((item) => item.id === id);

  if (!post) return <NotFound />;
  const comments = readComments(post.id);

  return (
    <div className="detail">
      <Link className="back-link" to="/">
        ← Tất cả bài viết
      </Link>
      <article>
        <span className="eyebrow">
          {post.category || "CÂU CHUYỆN CỦA BẠN"}
        </span>
        <h1>{post.title}</h1>
        <div className="detail-meta">
          <span className="avatar">{post.sourceUrl ? "M" : "A"}</span>
          <span>{post.authorName || "Admin"}</span>
          <span>·</span>
          <span>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("vi-VN")
              : "Cộng đồng MiniBlog"}
          </span>
        </div>
        <div className="post-body">{post.body}</div>
        {post.sourceUrl && (
          <p className="muted">
            Bản tóm tắt phục vụ bài kiểm tra. Tham khảo:{" "}
            <a className="text-link" href={post.sourceUrl} target="_blank" rel="noopener noreferrer">
              Đọc truyện đầy đủ trên Eva.vn ↗
            </a>
          </p>
        )}
      </article>
      <section className="comments">
        <h2>
          Bình luận <span className="count">{comments.length}</span>
        </h2>
        {comments.length > 0 ? (
          <>
            <p className="muted">Bình luận mẫu để minh họa giao diện.</p>
            {comments.map((comment) => (
              <article className="comment" key={comment.id}>
                <span className="avatar">{comment.name[0].toUpperCase()}</span>
                <div>
                  <h3>{comment.name}</h3>
                  <span className="comment-email">{comment.email}</span>
                  <p>{comment.body}</p>
                </div>
              </article>
            ))}
          </>
        ) : (
          <p className="muted">Bài viết này chưa có bình luận.</p>
        )}
      </section>
    </div>
  );
}
