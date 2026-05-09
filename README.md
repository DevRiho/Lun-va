# Lunéva - Luxury eCommerce Platform

![Lunéva Cover](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop) 
*(Note: Replace the image link above with an actual screenshot of your application once deployed)*

Lunéva is a premium, full-stack eCommerce platform designed for luxury fashion and accessories. Built with a modern tech stack, it features a blazingly fast Next.js frontend, a robust Node.js/Express backend, and seamless payment integrations.

## ✨ Features

- **Modern User Interface**: Responsive, aesthetic, and dynamic design utilizing Tailwind CSS and Framer Motion.
- **Robust Product Catalog**: Browsing, filtering, and detailed product views.
- **Secure Authentication**: JWT-based user authentication and authorization (User & Admin roles).
- **Shopping Cart & Checkout**: Seamless cart management and secure checkout process.
- **Multi-Gateway Payments**: Integrated with **Stripe** and **Paystack** for global and local transactions.
- **Order Management**: Order tracking and history for users, with a comprehensive admin management system.
- **Image Hosting**: Cloudinary integration for scalable product image management.

## 🛠️ Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/) (App Router, Server Components)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand) (State Management)
- [Framer Motion](https://www.framer.com/motion/) (Animations)

**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/) (Database)
- [Redis](https://redis.io/) (Caching)
- [Docker](https://www.docker.com/) (Containerized Database & Redis Services)

**Integrations:**
- **Stripe & Paystack** (Payment Processing)
- **Cloudinary** (Image Storage)
- **Resend** (Email Notifications)

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rihofficial/luneva.git
   cd luneva
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the `backend` directory using your credentials:
   ```env
   PORT=5000
   DATABASE_URL="postgresql://admin:adminpassword@localhost:5433/luneva?schema=public"
   REDIS_URL="redis://localhost:6379"
   JWT_SECRET="your_jwt_secret"
   JWT_EXPIRES_IN="1h"
   CLIENT_URL="http://localhost:3000"
   
   # Add your Stripe, Paystack, Cloudinary, and Resend keys here
   ```

   Start the database and Redis containers:
   ```bash
   docker-compose up -d
   ```

   Push the database schema and seed it with sample data:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

   Start the backend development server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup:**
   Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```

   Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
   ```

   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Building for Production

To build the application for a production environment:

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## 📄 License
This project is for portfolio and demonstration purposes.

---
*Designed and built by [Abejoye Timothy](https://github.com/Rihofficial).*
