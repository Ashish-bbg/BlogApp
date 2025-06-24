# 📝 BlogApp

A full-stack Blog Application built with **Node.js**, **Express**, **MongoDB Atlas**, and **Cloudinary**, allowing users to create and share blogs with image uploads.

🚀 **Live App**: [https://blogapp-109z.onrender.com/](https://blogapp-109z.onrender.com/)

---

## 🌟 Features

- 🔐 User Authentication (Login & Signup)
- ✍️ Create Blog Posts
- 🖼️ Upload blog cover images (Cloudinary)
- 💬 Comment on blog posts
- 📦 MongoDB Atlas for data storage
- 🧠 EJS Templating for views
- 🌐 Deployed on [Render](https://render.com)

---

## 🛠️ Tech Stack

| Category     | Tech                         |
|--------------|------------------------------|
| Backend      | Node.js, Express.js          |
| Frontend     | EJS, Bootstrap               |
| Database     | MongoDB Atlas (Mongoose)     |
| File Upload  | Multer + Cloudinary          |
| Deployment   | Render                       |

---

## ⚙️ Environment Variables

Create a `.env` file with the following variables:

```env
MONGO_DB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


📂 Folder Structure

📦 8_BLOG_APPLICATION_PRACTICE
├── controllers/        # Controller logic (e.g., route handlers)
├── db/                 # Database connection setup
├── model/              # Mongoose models
├── node_modules/       # Installed npm packages
├── public/             # Static assets (CSS, JS, images)
├── routes/             # Express route definitions
├── services/           # Utility services (e.g., Cloudinary, JWT)
├── views/              # EJS templates
├── .env                # Environment variables (not committed)
├── .gitignore          # Files to ignore in Git
├── ex.env              # Example environment variables
├── index.js            # Main server entry point
├── package.json        # Project metadata and scripts
├── package-lock.json   # Dependency lock file
└── readme.md           # Project documentation



🧪 Run Locally

git clone https://github.com/Ashish-bbg/BlogApp.git
cd BlogApp
npm install
cp .env.example .env   # Then fill in your actual values
npm start

🙌 Author
Ashish Singh
🔗 Visit Live App