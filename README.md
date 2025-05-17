# 🎫 Event Booking System

A full-stack web application that allows users to browse and book events, while providing an admin panel for managing event listings. This project was developed as part of the **Areeb AI Task** using AI tools like ChatGPT and GitHub Copilot throughout the workflow.

---

## 📦 Tech Stack

* **Frontend:** Next.js 15 (App Router), Tailwind CSS, i18n (English + Arabic)
* **Backend:** Next.js API routes (Server Actions), Mongoose ODM
* **Authentication:** NextAuth.js with role-based access (Admin / User)
* **Database:** MongoDB (Mongoose ODM)
* **Storage:** Cloudinary (image upload and delivery)
* **AI Tools:** ChatGPT, GitHub Copilot

---

## 🧰 Project Structure

```
📁 ATC_01101431751
│
├── app/                  # App directory (frontend & API routes)
├── components/           # Shared React components
├── lib/                  # Database + auth + Cloudinary logic
├── models/               # Mongoose models
├── i18n/                 # Multi-language support (EN/AR)
├── messages/             # Translations (en.json, ar.json)
├── public/               # Static assets
├── middleware.js         # Route protection
├── .env.local.example    # Example env file
├── README.md             # Main project documentation
├── README.frontend.md    # Frontend-specific instructions
├── README.backend.md     # Backend-specific instructions
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ahmed-adel-me/ATC_01101431751.git
cd ATC_01101431751
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXTAUTH_SECRET=your_auth_secret
MONGODB_URI=your_mongodb_connection_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> 🔑 Replace with your actual credentials.

### 4. Run the Development Server

```bash
npm run dev
```

To build for production:

```bash
npm run build
npm start
```

Visit `http://localhost:3000` in your browser.

---

## 🌐 Live Demo

🔗 [https://atc-01101431751.vercel.app](https://atc-01101431751.vercel.app)

✨ You can log in with the pre-created admin credentials:

* Email: admin@gmail.com

* Password: admin123

---

## 📁 Sub-Project Documentation

* 🧩 [Frontend Documentation](./README.frontend.md)
* 🔧 [Backend Documentation](./README.backend.md)

---

## 🎯 Features

### 👥 Authentication

* User registration and login with credentials
* Role-based access (Admin vs User)
* Middleware-protected routes

### 🎫 User Experience

* Responsive home page with event cards
* Each event shows "Book Now" or "Booked"
* Event details + booking confirmation screen

### 🧾 Admin Panel

* CRUD for events, categories, and tags
* Upload event images via Cloudinary
* Role-protected admin views

### 🌍 Internationalization

* English and Arabic via i18n + messages folder

---

## 🌟 Optional & Bonus Features

| Feature                | Status                             |
| ---------------------- | ---------------------------------- |
| Tags and Categories    | ✅ Implemented                      |
| Booked Label UI        | ✅ Implemented                      |
| Image Upload           | ✅ Cloudinary                       |
| Multi-language (EN/AR) | ✅ Implemented                      |
| Responsive UI          | ✅ Fully responsive (Tailwind used) |
| Pagination             | ✅ Implemented                      |
| Unit Tests             | ❌ Not included                     |
| Deployment             | ✅ Deployed on Vercel               |
| Dark Mode              | ✅ Implemented                      |

---

## 🤖 AI Tools Used

| Tool               | Description                                                                      |
| ------------------ | -------------------------------------------------------------------------------- |
| **ChatGPT**        | Used for architecture, bug fixing, authentication logic, and i18n integration    |
| **GitHub Copilot** | Assisted in auto-generating form handling, components, and styling with Tailwind |

---

## 📸 Screenshots

> *Add screenshots before submission.*

* Home Page
* Event Detail
* Booking Confirmation
* Admin Panel

---

## 📅 Submission Notes

* Developed for the **Areeb AI Challenge – May 2025**
* AI tools were actively used throughout development
* All features from the task description are implemented and documented
