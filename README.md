# NomasApp

A full‑stack e‑commerce application with **admin management**, **Supabase-backed media uploads**, **Stripe payments**, and a modern **React + Vite** frontend. Designed for scalability, clean separation of concerns, and real‑world production usage.

---

## 🚀 Core Features

### 🛍️ Storefront (Public)

* Product listing & filtering
* Product detail pages
* Image galleries
* Add to cart / remove from cart
* Cart persistence
* Guest & authenticated checkout

### 👤 Authentication

* User registration & login
* JWT-based authentication
* Role-based access (Admin / User)
* Secure token storage

### 💳 Payments

* Stripe Embedded Checkout
* Server-generated checkout sessions
* Secure client secret retrieval
* Order confirmation handling

---

## 🧑‍💼 Admin Features

> Accessible only to admin users

* Admin dashboard
* Create, update, delete products
* Upload & manage product images
* Manage prices, stock, and metadata
* View orders & payment status
* Role-based route protection

---

## ☁️ Media & Storage (Supabase)

* Product images uploaded via **Supabase Storage**
* Public bucket for product media
* Signed URLs or public URLs for image delivery
* Automatic image association with products

---

## 🖼️ Image Previews

> Add screenshots, GIFs, or UI previews here

```md
![Storefront](./docs/images/storefront.png)
![Admin Dashboard](./docs/images/admin.png)
![Product Editor](./docs/images/product-editor.png)
```

---

## 🎥 Video Demo

> Optional demo or walkthrough video

```md
[![Demo Video](./docs/images/video-thumbnail.png)](https://your-video-link)
```

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **Vite**
* **React Router**
* **Axios**
* **Tailwind CSS**

### Backend (External)

* REST API
* JWT Authentication
* Stripe SDK
* Supabase SDK

### Services

* Stripe (Payments)
* Supabase (Auth & Storage)

---

## 📁 Project Structure

```text
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components
│   ├── admin/             # Admin dashboard & tools
│   ├── services/          # API, Stripe, Supabase logic
│   ├── hooks/             # Custom React hooks
│   ├── routes.jsx         # App routing
│   ├── App.jsx            # Root component
│   └── main.jsx           # Entry point
├── index.html
└── dist/                  # Production build
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `frontend` directory.

### Required Variables

```env
# API
VITE_API_BASE_URL=

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=

# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SUPABASE_STORAGE_BUCKET=
```

### Variable Descriptions

| Variable                       | Description                     |
| ------------------------------ | ------------------------------- |
| `VITE_API_BASE_URL`            | Backend API base URL            |
| `VITE_STRIPE_PUBLISHABLE_KEY`  | Stripe public key               |
| `VITE_SUPABASE_URL`            | Supabase project URL            |
| `VITE_SUPABASE_ANON_KEY`       | Supabase anonymous public key   |
| `VITE_SUPABASE_STORAGE_BUCKET` | Storage bucket name for uploads |

> ⚠️ Never commit real credentials to version control.

---

## ▶️ Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn

### Install Dependencies

```bash
cd frontend
npm install
```

### Run Development Server

```bash
npm run dev
```

App runs at `http://localhost:5173` by default.

---

## 🔐 Security Notes

* JWT tokens stored securely in browser storage
* Admin routes protected both client & server side
* Stripe handled entirely via server-generated sessions
* Supabase keys are public anon keys only

---

## 📦 Build & Deployment

```bash
npm run build
```

* Output: `frontend/dist`
* Deployable to Netlify, Vercel, or any static host

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Open a Pull Request

---

## 📄 License

MIT License

---

## ✨ Notes

* README includes placeholders for visuals
* Environment variables documented without exposing secrets
* Designed to reflect a real production e‑commerce system
