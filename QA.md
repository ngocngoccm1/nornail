# Kiểm tra bàn giao

Đã kiểm tra lại bản thiết kế theo hướng Townhouse bằng Chromium trên giao diện desktop và điện thoại, ngày 21/10/2026.

| Chiều rộng | Tràn ngang | Ảnh lỗi | Lỗi JavaScript | Liên kết nội bộ lỗi |
| --- | --- | --- | --- | --- |
| 1440 px | Không | Không | Không | Không |
| 768 px | Không | Không | Không | Không |
| 390 px | Không | Không | Không | Không |
| 360 px | Không | Không | Không | Không |
| 320 px | Không | Không | Không | Không |

Đã kiểm tra nút chuyển danh mục/sản phẩm và mở/thu gọn toàn bộ sản phẩm. Đã thao tác bộ lọc, tìm kiếm có kết quả/không kết quả, mở chi tiết từ sản phẩm và danh mục, chuyển từ tìm kiếm sang sản phẩm, đóng dialog bằng nút và Escape, câu hỏi thường gặp, mở/đóng menu điện thoại và chọn liên kết liên hệ. Đã kiểm tra liên kết hỏi giá có đúng email, sản phẩm và nội dung điền sẵn. Đã kiểm tra cú pháp JavaScript, tài nguyên nội bộ và ID HTML không trùng.

Đã xem ảnh chụp desktop/mobile và kiểm tra hiệu ứng xuất hiện nội dung, hỗ trợ reduced motion và mở khóa cuộn sau khi đóng dialog.

Chưa thực hiện gửi email, gọi điện, thanh toán hay xuất bản. Liên kết email mở ứng dụng email của người dùng; không gửi đơn tự động. Giá và tồn kho được xác nhận trực tiếp với Nornails.

Bản cập nhật dùng nền trắng và taupe, ảnh manicure thật, chữ Libre Caslon Display và DM Sans. Tài nguyên ảnh và font được phục vụ tại máy; các ảnh sử dụng có nguồn trong `ASSET-SOURCES.md`.

Đã kiểm tra riêng bằng cấu hình iPhone 13: vuốt cảm ứng ngang trong danh mục hoạt động, menu mobile mở/đóng đúng và nút xem tất cả hiển thị đủ 8 sản phẩm. Không xuất hiện cuộn ngang toàn trang.

## Cập nhật màu sắc — 22/10/2026

Đổi nhận diện sang đỏ rượu vang `#651B32`, mận đậm `#391020` và kem ấm `#F4E9DC`. Đã xem lại toàn trang trên desktop 1440 px và mobile 390/320 px: không tràn ngang, không ảnh lỗi, không lỗi JavaScript. Các mảng tối dùng chữ kem sáng và viền focus riêng để dễ đọc, dễ điều hướng. Bố cục và chức năng sản phẩm được giữ nguyên.

## Ngôn ngữ và tìm kiếm — 23/10/2026

Đã kiểm tra trên Chromium ở 1440, 768, 390 và 320 px:

- Chuyển Na Uy → Anh → Na Uy; dịch trang, danh mục, sản phẩm, thông báo, nhãn hỗ trợ tiếp cận, metadata và email hỏi hàng.
- Nhớ lựa chọn sau khi tải lại và khi quay lại URL không có tham số; hỗ trợ `?lang=en` và `?lang=nb`.
- Vẫn đổi ngôn ngữ được khi localStorage bị trình duyệt chặn.
- Tìm qua ô đầu trang bằng Enter/nút Search; tìm trực tiếp và dùng phím mũi tên để chọn kết quả trong cửa sổ tìm kiếm.
- Tìm cả “nail drill” / “negledrill”, “acetone” / “aceton”, thương hiệu và nhiều từ khóa như “buffer orange”, “novicide 500”.
- Tình huống không có kết quả, dữ liệu giống HTML được coi là văn bản và không được thực thi.
- Giữ bộ lọc và trạng thái xem toàn bộ sản phẩm khi đổi ngôn ngữ.
- Không ảnh lỗi, lỗi JavaScript hoặc tràn ngang trong cả hai ngôn ngữ.

Đã xem ảnh chụp desktop và mobile của bản tiếng Anh. Trên mobile, ô nhập dùng font 16 px khi gõ để tránh trình duyệt phóng to khi focus. Chưa gửi email hay xuất bản trong lần cập nhật này.
