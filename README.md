# PureDrop - Pure & Fresh Water Solutions

PureDrop is a modern, responsive web application for showcasing residential and commercial water purifiers. It features an interactive catalog, a lead submission form for quotes, and a secure administrator dashboard for managing products and enquiries.

---

## 🚀 Key Features

* **Visitor Site**: Premium responsive design with fluid animations, dynamic product routing, and custom enquiry forms.
* **Secure Admin Portal (`/admin`)**: 
  * Full CRUD management for products.
  * Direct photo uploads from phone/desktop.
  * Secure credential authentication using `bcrypt` and JWT session tokens.
* **Cloudinary Storage**: High-performance CDN hosting for uploaded product images.
* **MongoDB Integration**: Dynamic Atlas database synchronization with fail-fast timeouts and local static fallback datasets.

---

## 🛠️ Tech Stack

* **Frontend**: React (Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide icons)
* **Backend**: Node.js, Express
* **Database**: MongoDB (Mongoose ODM)
* **Cloud Storage**: Cloudinary (direct memory buffer streaming)

---

## 💻 Local Setup

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Backend Server Setup
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server/` folder with the following configuration:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. Start the server:
   ```bash
   node server.js
   ```
   *Note: On initial boot, the database automatically seeds default products and an admin user (`admin` / `puredrop123`).*

### 3. Frontend Client Setup
1. From the project root, install packages:
   ```bash
   npm install
   ```
2. Start the local Vite server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:8080` in your browser.
