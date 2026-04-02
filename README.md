CodeAlpha Social Media App

A full-stack social media web application built using the MERN stack.
Users can create posts, like, comment, follow others, and manage their profiles.

---

Features

- User Signup and Login
- Create, edit and delete posts
- Upload images in posts
- Like and unlike posts
- Add and view comments
- Search users
- Follow and unfollow users
- Profile with image upload
- Responsive UI

---

Tech Stack

Frontend

- React.js
- Tailwind CSS
- Axios

Backend

- Node.js
- Express.js
- MongoDB (Mongoose)

---

Project Structure

CodeAlpha_SocialMediaApp/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
├── frontend/
│   ├── src/
│   └── index.html

---

Installation

Clone the repository

git clone https://github.com/SumitJangid23/CodeAlpha_SocialMediaApp.git
cd CodeAlpha_SocialMediaApp

Backend

cd backend
npm install
npm start

Frontend

cd frontend
npm install
npm run dev

---

Environment Variables

Create a ".env" file in backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
