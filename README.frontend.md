# 🎨 Frontend Documentation

This document describes the frontend layer of the **ATC\_01101431751** event booking system. Built using **Next.js App Router**, the frontend enables users to explore and book events, while providing administrators with a dashboard to manage event-related resources.

---

## 🛠️ Technologies Used

* **Next.js 15 (App Router)** – file-based routing with layouts and loading/error states
* **Tailwind CSS** – utility-first styling framework
* **React Hook Form** – for form state management and validation
* **Next Themes** – dark mode support
* **Next Intl** – multi-language support (English & Arabic)
* **React Icons** – for consistent iconography
* **React Icons** – for consistent iconography

---

## 🌟 Key Features

### ✅ User Experience

* Fully **responsive design** using Tailwind CSS
* Pages implement **loading** and **error boundaries**
* UI dynamically adjusts based on session and role

### 🧭 Navigation & Routing

* **Public Pages**: homepage, event details, booking confirmation
* **Authentication Pages**: login and signup with form validation
* **Admin Dashboard**: only accessible to users with the `admin` role

### 🛒 Event Booking
* Each event on the homepage displays a “Book Now” button if available, or a “Booked” label if the user has already reserved it
* Users can book events if authenticated
* Duplicate booking prevention on backend
* Confirmation shown after booking

### 🧾 Pagination & Filtering

* Homepage includes **pagination** for event list
* Users can filter events by **category** and **tags**

### 🌐 i18n, Theming & Accessibility

* Multi-language support (**English**, **Arabic**) via Next Intl
* **Dark mode** toggle implemented using `next-themes`

### ✅ Form Validation

* All forms use **React Hook Form** for state and validation
* Custom rules ensure data integrity and improve UX

---

## 🔐 Route Protection

* **middleware.js** protects routes that require user authentication
* **AdminAuthGuard** restricts access to admin-only areas
* Role-aware navigation and components

---

## 🧩 Component Strategy

* Uses **React Server Components** by default
* **Client Components** only where interactivity is needed (forms, toggles)
* Optimized for performance and SEO

---

## 📁 Project Structure (Frontend)

```
├── app/
│   ├── layout.js              # Root layout
│   ├── page.js                # Home (event listing)
|   ├── globals.css           # Tailwind CSS
│   ├── events/[id]/page.js    # Event detail
│   ├── auth/login/page.js     # Login form
│   ├── auth/signup/page.js    # Signup form
│   ├── congrats/page.js       # Post-booking confirmation
│   ├── admin/                 # Admin dashboard
│   │   ├── events/
│   │   ├── categories/
│   │   └── tags/
├── components/
│   ├── auth/
│   ├── bookings/
│   ├── events/
│   ├── categories/
│   ├── tags/
│   └── providers/
├── i18n/                      # i18n configuration
├── messages/                 # Translation files (en.json, ar.json)
├── public/                    # Static assets
```

---

## 📄 Notes

* Uses server actions to interact with backend logic
* Image uploads handled via `FormData`
* Optimized for responsiveness and maintainability

---

For backend logic, refer to [Backend Documentation](./README.backend.md)
