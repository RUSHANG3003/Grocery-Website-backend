# 🛒 Grocery Website - Backend

This is the backend API for the Grocery E-commerce Web Application built using Node.js and Express. It handles product management, user authentication, cart operations, and order processing.

---

## 🚀 Features

* 🔐 User authentication & login system
* 📦 Product & category management
* 🛒 Cart management APIs
* 💳 Razorpay payment integration
* 📊 Order management system
* 🧾 RESTful APIs

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MySQL
* Razorpay API

---

## 📂 Project Structure

```
/controllers   → Business logic  
/routes        → API routes  
/models        → Database queries  
/config        → Configuration files  
/utils         → Helper functions  
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone https://github.com/RUSHANG3003/grocery-backend.git
cd grocery-backend
```

### 2️⃣ Install Dependencies

```
npm install
```

---

### 3️⃣ Setup Environment Variables

Create `.env` file:

```
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=grocery_db

RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret
```

---

### 4️⃣ Run the Server

```
npm start
```

Server will run on:
👉 http://localhost:3001

---

## 📌 API Endpoints (Example)

* `POST /api/auth/login` → User login
* `GET /api/products` → Get all products
* `POST /api/cart` → Add to cart
* `POST /api/order` → Place order

---

## ✨ Future Improvements

* 🔔 Email notifications
* 📊 Admin analytics dashboard
* 🚚 Real-time order tracking

---

## 👨‍💻 Author

Developed by **ND**
