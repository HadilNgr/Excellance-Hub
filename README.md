# 🎓 Student Portal — Fullstack Mini Project

## 📌 Project Overview

This Student Portal is a fullstack web application designed to manage final-year projects and academic announcements for students and administrators.

It features:

- A modern, responsive frontend built with **React** and **Tailwind CSS**
- A robust backend built with **Raw PHP** and **MySQL**
- Student and admin roles with login functionality
- Real-time project wishlisting system
- Public and department-specific announcements

---

## 🧑‍🎓 User Roles

### 👨‍🎓 Student
- Login to a personal dashboard
- Browse available projects
- Add projects to a personal wishlist
- View announcements (general and department-specific)

### 🛡️ Admin
- Login to admin panel
- Create, update, and manage announcements
- Add and manage final-year projects
- View student wishlists

---

## ⚙️ Technologies Used

### Frontend:
- React (with TypeScript)
- Tailwind CSS
- React Router DOM
- Axios for API integration

### Backend:
- Raw PHP
- MySQL
- RESTful API structure

---

## 💡 Features Implemented

- 🔐 Role-based login (student/admin)
- 📢 Announcement system
- 📁 Project listing and management
- ⭐ Project wishlist feature (student-specific)
- 🎨 Fully responsive UI with animations and hover effects
- 🌐 CORS-enabled API communication

---

## 🚀 How to Run the Project

### 1. Prerequisites

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache/Nginx web server
- Node.js and npm

### 2. Backend Setup

1. **Database Setup:**
   - Import the provided SQL file (`student_portal_project.sql`) into your MySQL database
   - Update database credentials in `api/config/database.php`

2. **Web Server Setup:**
   - Place the `api` folder in your web server's document root (e.g., `htdocs` for XAMPP)
   - Ensure mod_rewrite is enabled for Apache
   - Make sure the API is accessible at `http://localhost/api`

3. **Seed Database (Optional):**
   ```bash
   php api/seed.php
   ```

### 3. Frontend Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Access the Application:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost/api`

### 4. Test Credentials

After seeding the database:
- **Student:** student@example.com / password123
- **Admin:** admin@example.com / admin123

---

## 📁 Project Structure

```
student-portal/
├── api/                    # PHP Backend
│   ├── config/            # Database configuration
│   ├── models/            # Data models
│   ├── auth/              # Authentication endpoints
│   ├── students/          # Student endpoints
│   ├── admins/            # Admin endpoints
│   ├── projects/          # Project endpoints
│   ├── announcements/     # Announcement endpoints
│   ├── wishlist/          # Wishlist endpoints
│   └── .htaccess          # URL rewriting rules
├── src/                   # React Frontend
│   ├── components/        # Reusable components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   ├── services/          # API services
│   └── types/             # TypeScript types
└── public/                # Static assets
```

---

## 🔧 API Endpoints

### Authentication
- `POST /api/login/student` - Student login
- `POST /api/login/admin` - Admin login
- `POST /api/register/student` - Student registration
- `POST /api/register/admin` - Admin registration

### Students
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project

### Announcements
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create announcement
- `PUT /api/announcements/{id}/update` - Update announcement
- `DELETE /api/announcements/{id}/delete` - Delete announcement

### Wishlist
- `GET /api/wishlist/{student_id}` - Get student's wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist` - Remove from wishlist

---

## 🎯 Future Enhancements

- Email notifications for announcements
- File upload for project documents
- Advanced search and filtering
- Real-time notifications
- Mobile app version

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).