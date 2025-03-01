# MERN Project

## 📌 Overview

This project is a **MERN (MongoDB, Express, React, Node.js) stack application** that provides Course and instructor management functionality. The app allows admin to log in, and manage instructor profiles securely.

## 🚀 Features

- User authentication (Login, Logout, Protected Routes)
- Instructor CRUD operations (Add, Update, Delete, View)
- Role-based access control for instructors
- Secure API with JWT authentication
- Fully responsive UI with Tailwind CSS

## 🛠️ Technologies Used

- **Frontend:** React.js, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token)
- **State Management:** Context API

## 📂 Project Structure

```
mern-project/
│── server/       # Express backend (Node.js, API routes)
│── admin/       # Express backend (Node.js, API routes)
│── instructor/      # React frontend (UI, components)
│── package.json  # Dependencies and scripts
│── README.md     # Project documentation
```

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/vir3sh/LectureManagement.git
```

### 2️⃣ Install Dependencies

#### Backend

```server
cd server
npm install
```

#### Frontend

```Admin panel
cd admin
npm install
```

#### instructor

```instructor panel
cd instructor
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file inside the `server/` directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_PASSWORD=
ADMIN_EMAIL=
```

### 4️⃣ Run the Project

#### Start Backend Server

```sh
cd server
npm start
```

#### Start Adminpanel

```sh
cd admin
npm start
```

#### Start instructor panel

```sh
cd instructor
npm start
```

### 5️⃣ Open in Browser (Adminpanel and Instructor panel)

Navigate to : `http://localhost:5173`
Navigate to: `http://localhost:5174`

### ✨ Developed by [Viresh Dhanaji Patil]
