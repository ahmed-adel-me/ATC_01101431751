# 🔧 Backend Documentation

This backend system powers the **ATC\_01101431751** event booking application. It manages authentication, event data, user bookings, and role-based permissions through a robust structure of server actions, secure database models, and modular logic. Designed with scalability and maintainability in mind, it leverages modern tools such as Next.js server actions, MongoDB, and NextAuth.

---

## 🛠️ Technologies Used

* **Next.js (API Routes)** – Serverless backend logic.
* **MongoDB** – NoSQL database for event and user data.
* **Mongoose** – ODM for MongoDB to define schemas.
* **NextAuth.js** – User authentication with credentials provider.
* **bcrypt** – For secure password hashing.
* **Axios** – HTTP client used in frontend-to-backend communication.
* **Cloudinary** – Image upload and hosting solution

---

## 📁 Directory Structure (Backend Focus)

```
├── actions/
│   ├── authActions.js          # Logic for signing in and credentials handling
│   ├── bookingActions.js       # Booking creation and validation
│   ├── categoryActions.js      # CRUD logic for categories
│   ├── eventActions.js         # Event-related database operations
│   ├── tagActions.js           # CRUD logic for tags
│   └── userActions.js          # User statistics
├── app/
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/
│       ├── events/
│       ├── bookings/
│       ├── users/
│       ├── categories/
│       └── tags/
├── lib/
│   ├── dbConnect.js             # MongoDB connection
│   ├── auth/
│   │   └── authOptions.js       # NextAuth config
│   └── utils/
│       ├── imageHandler.js      # Image upload via Cloudinary
│       └── cloudinary.js        # Cloudinary config
├── models/
│   ├── User.js
│   ├── Event.js
│   ├── Booking.js
│   ├── Category.js
│   └── Tag.js
```

---

## 🔐 Authentication & Authorization

The backend implements a secure and flexible authentication system using **NextAuth.js** with a custom credentials provider and **JWT**-based session strategy. Passwords are safely hashed with **bcrypt**. The authentication flow is tightly integrated with role-based access control to differentiate between **admin** and **regular users**.

* **Custom credentials login** using email and password.
* **JWT-based sessions** for stateless authentication.
* **Password hashing** with bcrypt before saving to the database.
* **Middleware** and `requireAdmin` utility ensure only authorized users can access sensitive operations.
* **Role-based permission** enforced through the `role` field in the user model (`user` or `admin`).
* Admins can perform privileged actions such as creating, editing, or deleting events, categories, tags, and accessing user statistics.

---

## 📦 Server Actions (API Alternative)

Server actions are used as a modern and modular replacement for traditional REST API endpoints. Instead of relying on multiple route files and HTTP request parsing, logic is encapsulated into reusable functions that can be invoked directly within the app. This approach is more suitable for Next.js projects, improves maintainability, and streamlines backend logic.

### 🧾 `authActions.js`

* `loginUser(email, password)`: Verifies credentials using bcrypt and returns a session-ready user.
* `signup(userData)`: Hashes password and registers a new user after checking for duplicates.

### 🎫 `eventActions.js`

* `getAllEvents(searchParams)`: Fetches filtered and paginated list of events by category and tags.
* `getEventById(eventId)`: Retrieves a specific event by ID.
* `createEvent(formData)`: Creates an event with optional image upload to Cloudinary (admin only).
* `editEvent(id, formData)`: Edits an existing event, handles optional image replacement.
* `deleteEvent(eventId)`: Deletes an event and its associated image (admin only).

### 🗂 `categoryActions.js`

* `AddCategory(name)`: Checks for admin role, creates a category if it doesn't exist, and revalidates the category page.
* `DeleteCategory(id)`: Deletes a category by ID and revalidates the category page.
* `GetCategories()`: Returns all categories, sorted and converted to plain objects.

### 🏷 `tagActions.js`

* `AddTag(name)`: Checks for admin role, creates a tag if it doesn't exist, and revalidates the tag page.
* `DeleteTag(id)`: Deletes a tag by ID and revalidates the tag page.
* `GetTags()`: Returns all tags, converted to plain objects.

### 👥 `userActions.js`

* `getTotalUsers()`: Returns the total number of users in the system (admin only).

### 📅 `bookingActions.js`

* `checkIfBooked(eventId)`: Checks if the currently logged-in user has already booked the specified event.
* `createBooking(eventId)`: Validates session, prevents duplicate bookings, stores booking, and redirects to confirmation.

---

## 🗄️ Mongoose Models

### 🔹 User

* `name`, `email`, `password`, `role`
* Uses `bcrypt` for hashing
* Enforced uniqueness on email

### 🔹 Event

* `title`, `description`, `image`, `date`, `price`, `venue`, `category`, `tags`
* References `Category` and `Tag` via ObjectIds

### 🔹 Booking

* `userId`, `eventId`, `createdAt`
* Prevents duplicate bookings using a compound index on (`userId`, `eventId`)

### 🔹 Category

* `name`
* Unique field to prevent duplicates

### 🔹 Tag

* `name`
* Unique field to prevent duplicates

---

## 🏷️ Categories & Tags Support

* Admins can **create and delete categories and tags**.
* Events can be **assigned categories and tags** during creation or editing.
* The system supports **filtering events by category and tags** on the frontend.

---

## 📄 Notes

* Ensure MongoDB and Cloudinary credentials are valid and set in `.env.local`
* Image uploads are handled via Cloudinary for scalability and CDN delivery
* Admin vs User role enforcement is done at both route and UI level

---

For frontend-related info, see [Frontend Documentation](./README.frontend.md).
