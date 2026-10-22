# MiniBlog

Bài thực hành React + TypeScript + Vite: danh sách bài viết, tìm kiếm, phân trang, chi tiết, bình luận mẫu, đăng nhập và viết bài.

## Chạy dự án

```bash
npm install
npm run dev
```

Kiểm tra bản build: `npm run build`. Xem bản build: `npm run preview`.

## Chức năng

- `/`: tìm tiêu đề bằng `filter`, chia trang bằng `slice`, 3 bài/trang.
- `/posts/:id`: tìm bài theo ID, hiển thị nội dung và bình luận tương ứng.
- `/login`: tài khoản demo **admin / 123456**, lưu phiên trong `sessionStorage`.
- `/write`: yêu cầu đăng nhập; kiểm tra tiêu đề 5–150 ký tự, nội dung 20–10.000 ký tự; lưu bài vào `localStorage`.
- Đường dẫn hoặc bài không tồn tại: hiện 404.

Bài tự tạo giữ nguyên sau khi tải lại trang, chỉ lưu trên trình duyệt đang dùng. Đăng nhập là mô phỏng, không có backend. Bình luận chỉ để xem, chưa có chức năng gửi.

## Các file chính

- `src/App.tsx`: menu và các route.
- `src/pages/`: bốn trang của web.
- `src/storage.ts`: đọc, lưu bài tự tạo và ghép với bài mẫu.
- `src/sampleData.ts`: 4 truyện tóm tắt, 12 bình luận giả lập.
- `src/types.ts`: kiểu dữ liệu bài viết và bình luận.
- `src/components.tsx`: trang 404.
- `src/style.css`: CSS cơ bản, một breakpoint cho điện thoại.

Nguồn truyện: [bài tổng hợp trên Eva.vn](https://eva.vn/nuoi-con-khoe-day-con-khon/truyen-co-tich-4-cau-chuyen-dan-gian-viet-nam-ngan-nhung-mang-y-nghia-sau-sac-c429a527130.html). Tên, email và nội dung bình luận đều là giả lập.

## Gợi ý tự luyện trong 90 phút

Thời gian dưới đây là mục tiêu luyện tập, tùy mức độ quen React:

| Thời gian | Nội dung |
| --- | --- |
| 0–10 phút | Tạo dự án, khai báo dữ liệu và kiểu dữ liệu |
| 10–30 phút | Menu, route, danh sách và chi tiết |
| 30–45 phút | Tìm kiếm, phân trang và bình luận mẫu |
| 45–65 phút | Đăng nhập, chặn trang viết, form và lưu bài |
| 65–80 phút | CSS cho máy tính và điện thoại |
| 80–90 phút | Kiểm tra chức năng, sửa lỗi và build |

Bản tham khảo này có AI hỗ trợ chỉnh sửa. Nếu bài kiểm tra không cho dùng AI, hãy tự thực hiện theo quy định của môn học.

## Kiểm tra nhanh

1. Trang chủ có 4 bài, trang 1 có 3 bài, trang 2 có 1 bài.
2. Tìm “Thần Sắt”, thử từ không tồn tại rồi xóa tìm kiếm.
3. Mở bài mẫu: có nguồn và 3 bình luận; mở ID sai: hiện 404.
4. Chưa đăng nhập thì `/write` chuyển đến `/login`; đăng nhập sai báo lỗi, đăng nhập đúng quay lại viết bài.
5. Nhập toàn khoảng trắng hoặc nội dung quá ngắn: báo lỗi. Đăng bài hợp lệ, quay về danh sách và tải lại để kiểm tra bài còn lưu.
6. Đăng xuất và kiểm tra không vào được `/write`.
7. Kiểm tra ở màn hình điện thoại, sau đó chạy build.

Khi đưa lên hosting tĩnh, cấu hình chuyển đường dẫn về `index.html` để tải lại trang con bằng BrowserRouter.
