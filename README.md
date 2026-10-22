# MiniBlog

Bài tập blog dùng React, TypeScript và Vite. Có 4 bài tóm tắt truyện và 12 bình luận giả lập để trình diễn, tham khảo từ [bài tổng hợp trên Eva.vn](https://eva.vn/nuoi-con-khoe-day-con-khon/truyen-co-tich-4-cau-chuyen-dan-gian-viet-nam-ngan-nhung-mang-y-nghia-sau-sac-c429a527130.html). Mỗi bài có chủ đề, người đăng, ngày đăng và liên kết nguồn. Dữ liệu mẫu nằm trong mã nguồn, không cần gọi API và không ghi đè bài người dùng tự tạo.

## Chạy dự án

Cài Node.js 20.19+ hoặc 22.12+, sau đó chạy:

```bash
npm install
npm run dev
```

Mở địa chỉ Vite in ra trong terminal (thường là http://localhost:5173).

```bash
npm run build
npm run preview
```

Lệnh build kiểm tra TypeScript và tạo thư mục `dist`.

## Các trang

| Đường dẫn          | Chức năng                                           |
| ------------------ | --------------------------------------------------- |
| `/`                | Danh sách, tìm kiếm tiêu đề, phân trang 3 bài/trang |
| `/posts/:id`       | Chi tiết bài viết và bình luận                      |
| `/login`           | Đăng nhập                                           |
| `/write`           | Viết bài, yêu cầu đăng nhập                         |
| Các đường dẫn khác | Trang 404                                           |

Tài khoản: **admin** / **123456**. Phiên đăng nhập lưu trong `sessionStorage` của tab hiện tại. Đây là đăng nhập mô phỏng cho bài tập, không phải cơ chế xác thực dùng cho hệ thống thật.

Tiêu đề cần 5–150 ký tự, nội dung cần 20–10.000 ký tự sau khi bỏ khoảng trắng ở hai đầu. Bài mới được lưu vào `localStorage` với khóa `miniblog_posts`, có ID bắt đầu bằng `local-`. Bài mới xuất hiện đầu danh sách và vẫn còn khi tải lại trang. Bài viết chưa có bình luận.

## Tổ chức mã

- `src/App.tsx`: khung trang, router và trạng thái đăng nhập.
- `src/pages/`: các trang của ứng dụng.
- `src/storage.ts`: đọc, kiểm tra dữ liệu localStorage và lưu bài viết.
- `src/sampleData.ts`: 4 bài tóm tắt và 12 bình luận mẫu; tên, email và nội dung bình luận đều là giả lập.
- `src/components.tsx`: trạng thái tải, báo lỗi và trang 404.
- `src/types.ts`: kiểu bài viết và bình luận.
- `src/style.css`: giao diện và bố cục responsive.

## Kiểm tra thủ công

1. Mở trang chủ: có 4 bài mẫu, 3 bài ở trang đầu và 1 bài ở trang sau. Tìm “Thần Sắt”, sau đó tìm một từ không tồn tại và xóa tìm kiếm.
2. Mở bài mẫu để xem chủ đề, ngày đăng, nguồn và 3 bình luận. Mở bài tự tạo để xem trạng thái chưa có bình luận. Đường dẫn không tồn tại như `/posts/1` hiển thị trang 404.
3. Chưa đăng nhập, vào thẳng `/write`: ứng dụng chuyển đến đăng nhập. Thử sai mật khẩu rồi đăng nhập đúng.
4. Gửi form viết bài trống, nhập toàn khoảng trắng, nhập quá ngắn; kiểm tra thông báo. Nhập đủ dữ liệu rồi đăng bài.
5. Quay về trang chủ, kiểm tra bài mới ở đầu danh sách. Tải lại trang và mở lại bài đó.
6. Đăng xuất, vào lại `/write` để kiểm tra chặn truy cập.
7. Mở một đường dẫn bất kỳ không tồn tại để xem trang 404.
8. Dùng chế độ Offline trong DevTools rồi tải lại trang: bài tự tạo và bài mẫu vẫn hiển thị mà không cần API.
9. Kiểm tra trên kích thước điện thoại và dùng Tab để di chuyển qua các nút, trường nhập.

Font Google có font hệ thống thay thế khi không tải được. Khi triển khai lên hosting tĩnh, cấu hình chuyển các đường dẫn về `index.html` để BrowserRouter hoạt động khi tải lại trang con.

