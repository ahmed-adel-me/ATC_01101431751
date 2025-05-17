# 🎫 Event Booking System

A full-stack web application that allows users to browse and book events, while providing an admin panel for managing event listings. This project was developed as part of the **Areeb AI Task** using AI tools like ChatGPT and GitHub Copilot throughout the workflow.

---

## 📦 Tech Stack

* **Frontend:** Next.js 15 (App Router), Tailwind CSS, i18n (English + Arabic)
* **Backend:** Next.js API routes (Server Actions), Mongoose ODM
* **Authentication:** NextAuth.js with role-based access (Admin / User)
* **Database:** MongoDB (Mongoose ODM)
* **Storage:** Local file system for event images
* **AI Tools:** ChatGPT, GitHub Copilot

---

## 🧰 Project Structure

```
📁 ATC_01101431751
│
├── app/                  # App directory (frontend & API routes)
├── components/           # Shared React components
├── lib/                  # Supabase client, server helpers
├── i18n/                 # Multi-language support (EN/AR)
├── public/               # Static assets
├── middleware.ts         # Role-based route protection
├── .env.local.example    # Example environment variable file
├── README.md             # Main project documentation
├── README.frontend.md       # Frontend-specific instructions
├── README.backend.md        # Backend-specific instructions
├── backend/README.md     # Backend-specific instructions
```

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

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

Create a `.env.local` file in the root directory and add:

```env
NEXTAUTH_SECRET=your_auth_secret
MONGODB_URI=your_mongodb_connection_uri
```

> 🔑 Replace with your own environment variables based on your local MongoDB and NextAuth setup.

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

## 📁 Sub-Project Documentation

The frontend and backend documentation are included in this root directory for convenience:

* 🧩 [Frontend Documentation](./README.frontend.md)
* 🔧 [Backend Documentation](./README.backend.md)

---

## 🎯 Features

### 👥 Authentication

* User registration and login (NextAuth)
* Role-based access (Admin vs User)
* Middleware-protected routes

### 🎫 User Experience

* Home page with event cards
* "Book Now" button per event (shows "Booked" if already booked)
* Detailed event page with booking functionality
* Congratulations screen after booking

### 🧾 Admin Panel

* Add, update, delete events
* Upload event images
* View event categories and tags

### 🌍 Internationalization

* English and Arabic language support via i18n files

---

## 🌟 Optional & Bonus Features

| Feature                | Status                             |
| ---------------------- | ---------------------------------- |
| Tags and Categories    | ✅ Implemented                      |
| Booked Label UI        | ✅ Implemented                      |
| Image Upload           | ✅ Local Storage                    |
| Multi-language (EN/AR) | ✅ Implemented                      |
| Responsive UI          | ✅ Fully responsive (Tailwind used) |
| Pagination             | ✅ Implemented                      |
| Unit Tests             | ❌ Not included                     |
| Deployment             | ✅ Deployed on Vercel               |
| Dark Mode              | ✅ Implemented                      |

---

## 🤖 AI Tools Used

| Tool               | Description                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------- |
| **ChatGPT**        | Used for project architecture, Supabase setup, localization, and CRUD implementation guidance |
| **GitHub Copilot** | Assisted in auto-completion for React components and Tailwind classes                         |

---

## 🌐 Live Demo

The application is live at:

🔗 [https://atc-01101431751.vercel.app](https://atc-01101431751.vercel.app)

---

## 📸 Screenshots

> *Add actual screenshots before submission.*

* Home Page (Event Listings)
* Event Details Page
* Booking Confirmation Page
* Admin Panel (Dashboard)

---

## 📅 Submission Notes

* Developed for the **Areeb AI Challenge – May 2025**.
* AI tools were used actively throughout the development lifecycle.
* Project meets the required feature set and structure described in the task.
