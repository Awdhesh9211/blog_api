# 📘 Blog API – Postman Testing Guide

This README helps you quickly test the Blog API using Postman (or any API client).

---

## 🚀 Base URL

```
http://localhost:3000
```

---

## ⚙️ Setup Instructions

1. Clone project
2. Install dependencies:

```
npm install
```

3. Create `.env` file:

```
PORT=3000
# Database configuration
MONGO_URI=mongodb://localhost:27017/express-blog

JWT_SECRET=your_jwt_secret_key
NODE_ENV =development
```

4. Run server:

```
npm run dev
```

---

## 🍪 Important (Cookies in Postman)

* JWT is stored in **cookies**, not headers
* Postman automatically saves cookies after login
* Make sure:

  * "Enable cookie jar" is ON

---

# 🔐 AUTH APIs

## 1. Register User

**POST** `/api/auth/register`

### Body (JSON)

```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Response

```
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 2. Login User

**POST** `/api/auth/login`

### Body

```
{
  "email": "john@example.com",
  "password": "123456"
}
```

✅ Cookie is automatically stored after login

---

## 3. Get Current User

**GET** `/api/auth/me`

🔒 Requires login (cookie required)

---

## 4. Logout

**POST** `/api/auth/logout`

---

# 📝 POST APIs

## 1. Create Post

**POST** `/api/posts`

🔒 Protected

### Body

```
{
  "title": "My First Blog",
  "content": "This is my content"
}
```

---

## 2. Get All Posts

**GET** `/api/posts`

---

## 3. Get Single Post

**GET** `/api/posts/:id`

---

## 4. Update Post

**PUT** `/api/posts/:id`

🔒 Owner only

### Body

```
{
  "title": "Updated title",
  "content": "Updated content"
}
```

---

## 5. Delete Post

**DELETE** `/api/posts/:id`

🔒 Owner only

## 6. MY POST

**DELETE** `/api/my-posts`

🔒 Owner only

---

# 🔄 Testing Flow (Step-by-Step)

1. Register user
2. Login user
3. Create post
4. Get all posts
5. Update post
6. Delete post
7. Logout
8. MY POST

---

# ⚠️ Common Issues

### ❌ Unauthorized

* Not logged in
* Cookie missing

### ❌ Cannot update/delete

* You are not the owner

### ❌ Server error

* Check MongoDB connection

---

# 🧪 Tips

* Use Postman collections for saving APIs
* Use environment variables for base URL
* Always login before testing protected routes

---

# 🎯 Future Improvements

* Pagination
* Search
* Comments system
* Likes feature
* Image upload

---

Happy Testing 🚀
