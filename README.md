# 🛍️ MERN E-Commerce Platform

An end-to-end full-stack E-Commerce application built with the MERN stack (MongoDB, Express, React, Node.js). It supports user authentication, cart management, product listings, and a separate admin dashboard for managing orders and inventory.

[🌐 Live Demo](https://e-commerce-mern-frontend-vr2x.onrender.com)


## ✨ Features

### 👤 User Side

* User SignUp & Login with JWT Authentication
* Browse products
* Add to cart
* Place orders
* View order history

### 🛠️ Admin Panel

* Admin login
* Add/update/delete products
* View all users
* Manage orders
* View total orders, users & product count

---

## 🛠️ Tech Stack & Libraries

### 🚧 **Frontend**

* **React.js** – UI library for building interactive interfaces
* **React Router DOM** – Client-side routing
* **Tailwind CSS** – Utility-first CSS framework
* **Axios** – For making HTTP requests
* **React Toastify** – For showing notifications
* **Context API** – For global state management (auth & shop context)

### 🧩 **Backend**

* **Node.js** – JavaScript runtime
* **Express.js** – Backend framework
* **Mongoose** – ODM for MongoDB
* **bcrypt.js** – Password hashing
* **jsonwebtoken (JWT)** – For authentication
* **Validator** – For validating email inputs
* **dotenv** – To manage environment variables

### ☁️ **Deployment**

* **Render** – Hosting for both frontend and backend
* **MongoDB Atlas** – Cloud MongoDB database

---

## 🚀 Getting Started Locally

### 📦 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Add your Mongo URI, JWT secret, etc.
npm run dev
```

### 💻 Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Set REACT_APP_BASE_URL=http://localhost:4000
npm run dev
```

---

## 📂 Folder Structure

```bash
├── backend
│   ├── controller
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
├── frontend
│   ├── components
│   ├── context
│   ├── pages
│   └── App.jsx
```

---

## 🙌 Acknowledgements

Built with ❤️ by [Sarthak Gupta](https://github.com/sar07thak)

If you like this project, feel free to ⭐ the repo and connect on [LinkedIn](https://www.linkedin.com/in/sar07thak/).
