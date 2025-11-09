# 🔗 LinkedIn Clone — MERN Stack (Full-Stack Internship Project)

A simplified full-stack social media app inspired by LinkedIn.  
Users can sign up, log in, create posts, like posts, comment on posts, and delete their own posts.

✅ Authentication (JWT)  
✅ Create post (text + optional image)  
✅ Global feed (all users can see all posts)  
✅ Like / Unlike posts  
✅ Comment under posts (with username)  
✅ Delete post (only owner)  
✅ Responsive LinkedIn-style UI  
✅ Deployed frontend + backend + MongoDB Atlas

---

## 🚀 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React (Create React App), React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose ORM) |
| Auth | JWT (stored in localStorage) |
| Deployment | Vercel (frontend), Render/Railway (backend) |

---

## 📌 Features

| Feature | Status |
|---------|--------|
| Signup / Login with JWT | ✅ |
| Protected routes (Feed, Create Post) | ✅ |
| Create post (text + optional image URL) | ✅ |
| Global feed sorted by newest | ✅ |
| Like / Unlike | ✅ |
| Comment on posts (with author name) | ✅ |
| Delete post (only owner) | ✅ |
| Avatar initials based on user name | ✅ |
| CORS + ENV based deployment config | ✅ |

---

## 🛠️ Project Structure

```
root/
├── backend/ # Node + Express + MongoDB
│ ├── src/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middleware/
│ │ ├── config/
│ │ └── index.js
│ └── .env.example
│
└── frontend/ # React (CRA)
├── public/
├── src/
│ ├── pages/
│ ├── components/
│ ├── api.js
│ ├── styles.css
│ └── App.js
└── .env.example
```


---

## ⚙️ Environment Variables

### 🔹 Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://db_user:Ppwii5PdX9XiZ29k@cluster0.pzbhvnv.mongodb.net/?appName=Cluster0
JWT_SECRET=your_secret_key
CLIENT_ORIGIN=http://localhost:3000
```

### 🔹 Frontend (`frontend/.env`)
```env
REACT_APP_API_BASE=http://localhost:5000/api
```
---

## ▶️ Run Project Locally

### 1️⃣ Backend Setup
```sh
cd backend
cp .env.example .env
npm install
npm run dev
```
Backend runs at:
```arduino
http://localhost:5000
```
### 2️⃣ Frontend Setup
```sh
cd frontend
cp .env.example .env
npm install
npm start
```
Frontend runs at:
```arduino
http://localhost:3000
```
---

## 🧪 API Endpoints

| Method | Endpoint                 | Auth | Description              |
| ------ | ------------------------ | ---- | ------------------------ |
| POST   | `/api/auth/signup`       | ❌    | Register user            |
| POST   | `/api/auth/login`        | ❌    | Login user               |
| GET    | `/api/posts`             | ❌    | Fetch all posts          |
| POST   | `/api/posts`             | ✅    | Create post              |
| POST   | `/api/posts/:id/like`    | ✅    | Like / Unlike post       |
| POST   | `/api/posts/:id/comment` | ✅    | Add comment              |
| DELETE | `/api/posts/:id`         | ✅    | Delete post (owner only) |

---

## 👨‍💻 Author

**Rohit Raparthi**  
📧 [rohit.raparthi2003@gmail.com](mailto:rohit.raparthi2003@gmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/rohit-raparthi/) / [GitHub](https://github.com/RohitRaparthi/)