# 📘 KnowledgeBase Platform

A full-stack, Confluence-like collaborative platform for teams to create, edit, organize, and search documents. Built using the **MERN stack** with JWT authentication, WYSIWYG editing, real-time collaboration features, and version control.

---

## 🚀 Live Demo

Coming Soon. (Link will be added after deployment)

---

## 📌 Key Features

### 🔐 Authentication
- User registration and login via email
- JWT-based secure authentication
- Forgot password via email reset link

### 📝 Document Management
- Rich WYSIWYG editor using **React Quill**
- Auto-save while editing
- Document listing with metadata (title, author, visibility, last modified)
- Global search on title and content

### 👥 User Collaboration
- `@username` mention system
- Automatic sharing when mentioned
- Real-time-like collaboration features

### 🔒 Privacy & Permissions
- Public documents accessible via link (no login)
- Private documents restricted to author and shared users
- Add/remove user access (View/Edit)

### 🕒 Version Control
- Track and store all document versions
- View and compare previous versions
- Author and timestamp tracking

---

## 🧱 Tech Stack

| Layer        | Technology               |
|--------------|---------------------------|
| Frontend     | React.js, React Router    |
| Backend      | Node.js, Express.js       |
| Database     | MongoDB + Mongoose        |
| Auth         | JWT + Bcrypt              |
| Editor       | React Quill               |
| Styling      | TailwindCSS / Bootstrap   |
| Mail         | Nodemailer (for reset)    |

---

## 🔧 Installation

1. Clone the repository  
   `git clone https://github.com/Thiru7869/knowledgebase-platform.git`

2. Navigate into the project folder  
   `cd knowledgebase-platform`

3. Install dependencies  
   `npm install`

4. Start the development server  
   `npm start`

---

## 📂 Folder Structure

