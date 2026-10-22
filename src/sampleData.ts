import type { Comment, Post } from "./types";

const sourceUrl = "https://eva.vn/nuoi-con-khoe-day-con-khon/truyen-co-tich-4-cau-chuyen-dan-gian-viet-nam-ngan-nhung-mang-y-nghia-sau-sac-c429a527130.html";

// Short summaries; the full stories remain available at the source link.
export const samplePosts: Post[] = [
  {
    id: "sample-ong-trang-tha-dieu",
    userId: 2,
    title: "Ông Trạng thả diều",
    body: "Nguyễn Hiền nhà nghèo, phải nghỉ học nhưng vẫn nghe giảng nhờ và tự luyện chữ. Cậu vừa giúp gia đình, vừa nuôi niềm ham học, rồi đỗ Trạng nguyên khi mới mười ba tuổi.",
    category: "Hiếu học",
    authorName: "Ban biên tập MiniBlog",
    createdAt: "2026-10-22T08:00:00+07:00",
    sourceUrl,
  },
  {
    id: "sample-than-sat",
    userId: 3,
    title: "Truyện Thần Sắt",
    body: "Một nông dân nghèo đón vị khách giản dị thay vì những người sang trọng. Khách để lại sắt; anh rèn thành nông cụ, làm việc hiệu quả hơn và dần có cuộc sống đủ đầy.",
    category: "Lao động",
    authorName: "Ban biên tập MiniBlog",
    createdAt: "2026-10-21T08:00:00+07:00",
    sourceUrl,
  },
  {
    id: "sample-su-tich-cay-thi-la",
    userId: 4,
    title: "Sự tích cây Thì Là",
    body: "Khi các cây xin tên, một cây gia vị nhỏ đến muộn. Nghe Trời ngập ngừng nói “thì… là…”, nó tưởng đã được đặt tên và vui vẻ chạy đi báo với bạn bè.",
    category: "Sự tích",
    authorName: "Ban biên tập MiniBlog",
    createdAt: "2026-10-20T08:00:00+07:00",
    sourceUrl,
  },
  {
    id: "sample-ba-anh-em",
    userId: 5,
    title: "Ba anh em",
    body: "Ba anh em học nghề rồi trở về thi tài. Người em út được cha thưởng nhà, nhưng muốn cùng các anh chung sống. Họ dùng tài nghề để xây dựng cuộc đời hòa thuận, sung túc.",
    category: "Gia đình",
    authorName: "Ban biên tập MiniBlog",
    createdAt: "2026-10-19T08:00:00+07:00",
    sourceUrl,
  },
];

// Fictional readers and comments for the classroom demonstration.
export const sampleComments: Comment[] = [
  { id: 1, postId: "sample-ong-trang-tha-dieu", name: "Minh Anh", email: "minhanh@example.com", body: "Mình thích chuyên mục này. Những bài ngắn rất tiện đọc trong giờ nghỉ." },
  { id: 2, postId: "sample-ong-trang-tha-dieu", name: "Hoàng Nam", email: "hoangnam@example.com", body: "Có đường dẫn nguồn nên mình dễ tìm đọc bản đầy đủ. Mong có thêm nhiều truyện nữa!" },
  { id: 3, postId: "sample-ong-trang-tha-dieu", name: "Thu Hà", email: "thuha@example.com", body: "Mình đã lưu tên truyện để đọc cùng em vào cuối tuần." },
  { id: 4, postId: "sample-than-sat", name: "Gia Huy", email: "giahuy@example.com", body: "Phần tóm tắt rõ ràng, dễ theo dõi trên điện thoại." },
  { id: 5, postId: "sample-than-sat", name: "Ngọc Mai", email: "ngocmai@example.com", body: "Mỗi ngày đọc một truyện là một thói quen mình muốn thử." },
  { id: 6, postId: "sample-than-sat", name: "Đức Anh", email: "ducanh@example.com", body: "Mình muốn giới thiệu trang này cho nhóm đọc sách của lớp." },
  { id: 7, postId: "sample-su-tich-cay-thi-la", name: "Bảo Ngọc", email: "baongoc@example.com", body: "Tên truyện làm mình tò mò nên bấm vào đọc ngay." },
  { id: 8, postId: "sample-su-tich-cay-thi-la", name: "Khánh Linh", email: "khanhlinh@example.com", body: "Mình thích cách chia nội dung theo từng chủ đề." },
  { id: 9, postId: "sample-su-tich-cay-thi-la", name: "Tuấn Kiệt", email: "tuankiet@example.com", body: "Mong có thêm chuyên mục gợi ý truyện cho cuối tuần." },
  { id: 10, postId: "sample-ba-anh-em", name: "Phương Thảo", email: "phuongthao@example.com", body: "Mình sẽ chọn bài này cho buổi đọc sách cùng gia đình." },
  { id: 11, postId: "sample-ba-anh-em", name: "Quang Minh", email: "quangminh@example.com", body: "Đã thử tìm bằng tên truyện và tìm được bài rất nhanh." },
  { id: 12, postId: "sample-ba-anh-em", name: "Hải Yến", email: "haiyen@example.com", body: "Cảm ơn trang đã tổng hợp. Mình sẽ quay lại đọc các bài còn lại." },
];
