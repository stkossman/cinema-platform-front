# 🎬 Cinema Platform - Frontend

Modern, responsive web client for the Cinema Management System, developed as part of the **SoftServe Practice**. This application provides an interactive interface for users to book tickets and for administrators to manage the cinema ecosystem.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?style=flat&logo=vite)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=flat&logo=tailwindcss)
![Biome](https://img.shields.io/badge/Biome-Linting-FFC53D?style=flat&logo=biome)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel)

> **Backend:** Check out [cinema-platform-back](https://github.com/stkossman/cinema-platform-back)

---

## ⚡ Tech Stack

Built with a focus on performance, type safety, and modern development experience.

| Category | Technologies |
|---|---|
| **Core** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS **v4**, clsx, tailwind-merge, Lucide React (Icons) |
| **State & API** | Context API, Custom Hooks, Axios (Interceptors) |
| **Forms** | React Hook Form + Zod (Schema Validation) |
| **Routing** | React Router DOM |
| **Tooling** | Biome.js (Fast Linting & Formatting) |
| **Deployment** | Vercel |

---

## ✨ Features

### 👤 For Customers (User Experience)
* **Dynamic Hero Slider**: Features active movies with trailers and quick booking actions.
* **Smart Scheduling**: "Now in Theaters" vs "Coming Soon" tabs with an integrated date picker.
* **Interactive Booking Flow**:
    * **Visual Seat Selection**: Real-time interactive hall map showing available/occupied seats.
    * **Pricing Logic**: Dynamic price calculation based on seat type (VIP, Sofa, Standard) and day of the week.
    * **Payment Simulation**: Integrated flow with order summary and success confirmation.
* **User Dashboard**:
    * Ticket history and active bookings.
    * Profile management (Edit details, change password).
* **Authentication**: Secure Login/Register with JWT handling (auto-redirects, protected routes).

### 🛡️ For Administrators (Management Panel)
* **Hall Builder**: A drag-and-drop style visual editor to construct cinema halls, define rows/columns, and assign seat types.
* **Pricing Matrix Editor**: A sophisticated grid interface to set prices per seat type for every day of the week.
* **User Activity Tracker**: Advanced search and view of specific user order history and tickets.
* **Ticket Validation**: Interface for scanning/validating ticket codes (QR simulation).
* **Content Management**: Tools to manage movies and sessions (connected to backend).

## 🚀 Getting Started

### Prerequisites
* Node.js (v18 or higher)
* npm or pnpm or bun

### Installation

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:stkossman/cinema-platform-front.git
    cd cinema-platform-front
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory:
    ```env
    VITE_API_URL=https://your-backend-api-url.com/api
    ```

4.  **Run the development server:**
    ```bash
    bun dev
    ```
    The app will run at `http://localhost:5173`.

## 📸 Key UI Components

### 1. Booking Interface
Users can select sessions based on time and choose specific seats on a visual map.

### 2. Hall Builder (Admin)
Visual tool for administrators to design hall layouts and seat configurations.

### 3. Pricing Matrix
Grid-based editor for managing dynamic pricing strategies across different days.

## 📜 License

This project is licensed under the MIT License.