# SyncSketch 🎨

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=nodedotjs)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4-010101?logo=socketdotio)](https://socket.io/)

A real-time, zero-auth collaborative whiteboard built with the **MERN** stack and **Socket.IO**. Just share a room code and start drawing together instantly.

> **Note:** Add a GIF of your app in action here!
> `![SyncSketch Demo](./demo.gif)`

---

## 📚 Table of Contents

* [✨ Features](#-features)
* [⚙️ Tech Stack](#️-tech-stack)
* [🚀 Getting Started](#-getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation & Setup](#installation--setup)
    * [Running the App](#running-the-app)
* [🔌 Real-time API (Socket.IO)](#-real-time-api-socketio)
* [🚢 Deployment](#-deployment)
* [📝 License](#-license)

---

## ✨ Features

* **⚡ Real-Time Collaboration:** All drawings and cursor movements are synced instantly across all users in the room.
* **🖱️ Live Cursor Tracking:** See where other users are pointing with uniquely colored cursors.
* **🚪 Simple Room Management:** No login needed. Join or create a room with a simple 6-8 character code.
* **✏️ Complete Drawing Tools:**
    * Pencil tool with multiple colors.
    * Eraser tool.
    * Adjustable stroke width.
    * "Clear All" button to wipe the canvas for everyone.
* **👨‍👩‍👧‍👦 Live User Count:** See exactly how many people are in the room.
* **🖥️ Multi-Tab Sync:** Uses a `BroadcastChannel` to keep your tools and canvas in sync across your *own* browser tabs.

---

## ⚙️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (for room persistence, etc. - *optional*) |
| **Real-time** | Socket.IO |

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development.

### Prerequisites

* **Node.js** (v16.x or newer)
* **npm** / **yarn**
* **MongoDB** (a local instance or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)

### Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-username/SyncSketch.git](https://github.com/your-username/SyncSketch.git)
    cd SyncSketch
    ```

2.  **Set up the Backend (Server):**
    ```bash
    # Navigate to the server directory
    cd server
    
    # Install dependencies
    npm install
    ```
    Create a `.env` file in the `/server` directory and add your variables:
    ```env
    PORT=8000
    MONGODB_URI=your_mongodb_connection_string
    ```

3.  **Set up the Frontend (Client):**
    ```bash
    # Navigate to the client directory from the root
    cd ../client
    
    # Install dependencies
    npm install
    ```
    Create a `.env` file in the `/client` directory to point to your backend:
    ```env
    VITE_BACKEND_URL=http://localhost:8000
    ```

### Running the App

You'll need two terminals open.

1.  **Start the Backend (Terminal 1):**
    ```bash
    # In the /server directory
    npm run start
    ```

2.  **Start the Frontend (Terminal 2):**
    ```bash
    # In the /client directory
    npm run dev
    ```

Open `http://localhost:5173` (or whatever port Vite specifies) in your browser!

---

## 🔌 Real-time API (Socket.IO)

The app's real-time functionality is handled by Socket.IO.

### Client → Server

* `join-room` (roomId): Fired when a user joins a room.
* `cursor-move` (data): Sends the user's mouse position and user ID.
* `draw-start` (data): Fired on `onMouseDown` to begin a drawing stroke.
* `draw-move` (data): Fired on `onMouseMove` to send path coordinates.
* `draw-end` (data): Fired on `onMouseUp` to finish the stroke.
* `clear-canvas` (data): Emitted when a user clicks the "Clear All" button.

### Server → Client

* `user-count` (count): Sends the updated number of active users in the room.
* `cursor-update` (data): Broadcasts a user's cursor position to others.
* `draw-start` (data): Broadcasts the beginning of a stroke from another user.
* `draw-move` (data): Broadcasts the stroke path data to others.
* `draw-end` (data): Broadcasts the end of a stroke.
* `clear-canvas` (data): Tells all clients in the room to clear their canvas.

---

## 🚢 Deployment

Ready to go live? Here’s a simple guide.

### Backend (Server)

1.  **Hosting:** Use a service that supports Node.js and WebSockets.
    * [Render](https://render.com/) (Recommended, easy)
    * [Railway](https://railway.app/)
    * Heroku
    * VPS (DigitalOcean, Vultr, etc.)

2.  **Database:** Use a production **MongoDB Atlas** cluster.
    * Create a free cluster on MongoDB Atlas.
    * Whitelist your server's IP address (or `0.0.0.0/0` for all, if you're not on a static IP).
    * Get the connection string.

3.  **Environment Variables:** Set these in your hosting provider's dashboard:
    * `PORT`: (Usually set by the provider)
    * `MONGODB_URI`: Your production MongoDB Atlas connection string.

### Frontend (Client)

1.  **Hosting:** Use a static site host.
    * [Vercel](https://vercel.com/) (Recommended, fast)
    * [Netlify](https://www.netlify.com/)

2.  **Environment Variables:** Set this in your Vercel/Netlify dashboard:
    * `VITE_BACKEND_URL`: The **live URL** of your deployed backend (e.g., `https://syncsketch-server.onrender.com`)

---

## 📝 License

This project is open-source and available under the MIT License.

MIT © 2025 Atharv Mujumale