# Swagger-ToDoApp

# TodoApp Backend API

Đây là API backend cho ứng dụng TodoApp, được xây dựng bằng **Node.js**, **Express**, **MySQL**, và **Sequelize**.

## Tính năng chính

- Quản lý danh sách Todo (CRUD: Create, Read, Update, Delete)
- Kết nối với **MySQL** bằng Sequelize ORM
- Xây dựng RESTful API với **Express.js**
- Triển khai tài liệu API bằng **Swagger**
- Hỗ trợ **CORS** cho frontend React/Vue

API Endpoints
Method Endpoint Description

- GET /api/todos Lấy danh sách tất cả todos
- POST /api/todos Thêm một todo mới
- PUT /api/todos/:id Cập nhật trạng thái todo
- DELETE /api/todos/:id Xóa một todo
