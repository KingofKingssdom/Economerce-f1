# 🚀 Project Frontend - React + Vite

Đây là dự án Frontend sử dụng **React + Vite** để phát triển giao diện người dùng.  
---

## 📦 Công nghệ sử dụng

- ⚛️ **React 18**
- ⚡ **Vite**
- 🧭 **React Router DOM**
---
# 🔑 Tài khoản thử nghiệm (Test Credentials)

Để trải nghiệm đầy đủ các tính năng (Đặt hàng, Quản lý, Thanh toán), bạn có thể sử dụng các tài khoản mẫu dưới đây:

### 1. Tài khoản ứng dụng (App Accounts)
* **User (Khách hàng):**
  * Email: `an@gmail.com` 
  * Password: `123`
* **Admin (Quản trị viên):**
  * Email: `admin@gmail.com`
  * Password: `123`

### 2. Thông tin thẻ test VNPay Sandbox
Khi thực hiện thanh toán qua cổng VNPay, bạn hãy chọn thanh toán qua **"Thẻ nội địa / Tài khoản ngân hàng"** và nhập thông tin sau:

| Thông tin | Giá trị Test |
| :--- | :--- |
| **Ngân hàng** | **NCB** |
| **Số thẻ** | `9704198526191432196` |
| **Tên chủ thẻ** | `NGUYEN VAN A` |
| **Ngày phát hành** | `07/15` |
| **Mã OTP** | `123456` |

> 💡 *Lưu ý: Mọi giao dịch trên môi trường Sandbox hoàn toàn là tiền ảo/thử nghiệm và không phát sinh bất kỳ chi phí thực tế nào.*
## 📁 Cấu trúc thư mục

```bash
src/
├── assets/              # Ảnh, icon, file tĩnh
├── common/              # Các component dùng chung
├── pages/               # Các page chính
├── routers/             # Cấu hình routes
├── services/            # Gọi API, xử lý dữ liệu
├── features/            # Các tính năng của dự án
├── App.jsx              # Component gốc
└── main.jsx             # File khởi chạy




