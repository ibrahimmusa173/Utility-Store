# 🛒 Utility Store Management System

A full-stack e-commerce and administrative platform built using the **MVC (Model-View-Controller)** architecture. This project enables public users to browse products while providing a secure dashboard for administrators to manage inventory and user data.

## 🚀 Tech Stack

### Frontend
* **Library:** React 19 (Vite)
* **Styling:** Tailwind CSS
* **State Management:** Context API (AuthContext)
* **Routing:** React Router 7
* **API Client:** Axios with Interceptors (Automatic JWT handling)

### Backend
* **Runtime:** Node.js & Express
* **Database:** MySQL
* **Authentication:** JSON Web Tokens (JWT) & Bcryptjs
* **File Uploads:** Multer (for product images)
* **Security:** Helmet.js & CORS

## ✨ Key Features

### 🔐 Authentication & Security
* **JWT Session Management:** Secure login and registration.
* **Protected Routes:** Private dashboards accessible only to logged-in users.
* **Password Recovery:** Complete "Forgot Password" and "Reset Password" workflow.
* **Axios Interceptors:** Automatically attaches tokens to every request.

### 📦 Product Management (Full CRUD)
* **Image Uploads:** Seamlessly upload and store product images using Multer.
* **Public Catalog:** Searchable and category-filtered product view for guests.
* **Admin Controls:** Add, Edit (with image update), and Delete products.

### 👥 User Administration
* **Data Management:** View list of registered users.
* **User Profiles:** Update user information via an administrative interface.