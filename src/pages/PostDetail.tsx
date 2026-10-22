import { Link, useParams } from "react-router-dom";
import { NotFound } from "../components";
import { readAllPosts, readComments } from "../storage";

export default function PostDetail() {
  const { id } = useParams();
  const post = readAllPosts().find((item) => item.id === id);
  if (!post) return <NotFound />;

  const comments = readComments(post.id);

  return (
    <section className="detail">
      <Link to="/">← Về danh sách</Link>
      <article>
        <h1>{post.title}</h1>
        <p className="muted">
          {post.authorName || "Admin"} · {post.category || "Bài của bạn"}
          {post.createdAt && ` · ${new Date(post.createdAt).toLocaleDateString("vi-VN")}`}
        </p>
        <p className="post-body">{post.body}</p>
        {post.sourceUrl && (
          <p>Nguồn tham khảo cho bản tóm tắt: <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer">Eva.vn</a></p>
        )}
      </article>
      <section className="comments">
        <h2>Bình luận ({comments.length})</h2>
        {comments.length > 0 ? (
          <>
            <p className="muted">Các bình luận dưới đây là dữ liệu mẫu.</p>
            {comments.map((comment) => (
              <article className="comment" key={comment.id}>
                <strong>{comment.name}</strong>
                <small>{comment.email}</small>
                <p>{comment.body}</p>
              </article>
            ))}
          </>
        ) : (
          <p>Chưa có bình luận.</p>
        )}
      </section>
    </section>
  );
}
