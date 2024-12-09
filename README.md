# MessageMate - Chat Application

**MessageMate** is a real-time chat application built using the MERN stack. It leverages **WebSockets** for instant messaging, ensuring a seamless and interactive communication experience. The application features private messaging, real-time updates, and a user-friendly interface.

---

## 🗂 Project Structure

### Backend
The `backend` folder contains the server-side code, including API endpoints, WebSocket server, authentication, and database management.

### Frontend
The `frontend` folder contains the client-side code, providing a responsive and dynamic user interface for the chat application.

---

## 🔧 Environment Variables

### Backend `.env`
To configure the backend, create a `.env` file in the `backend` directory with the following keys:

```env
PORT=8080
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
```
### Frontend `.env`
To configure the frontend, create a `.env` file in the `frontend` directory with the following keys:

```env
VITE_API_ENDPOINT=http://localhost8080
```
## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or later)
- **MongoDB** (running locally or a cloud instance)
- **Vite** (for frontend development)
---

### Installation

#### Backend
Starting `backend`:
   ```bash
   cd backend
   npm install
   npm run dev
  ```
Starting `frontend`:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
## 🛠 Technologies Used

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building APIs and handling server-side logic.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **WebSocket**: For real-time, bi-directional communication using **Socket.IO**.

### Frontend
- **React.js**: JavaScript library for building user interfaces.
- **Vite**: Fast and modern build tool for frontend development.

### Additional Tools
- **Real-time Communication**: Implemented with **WebSocket** .
- **Authentication**: Secured using **JWT (JSON Web Tokens)** for user sessions.

---

## 🌟 Features

- **Real-time Messaging**: Instant chat powered by WebSockets.
- **Private Chats**: Secure one-on-one communication between users.
- **User Authentication**: Robust login and registration functionality.
---

## 👩‍💻 Contributions

Contributions are welcome! If you have ideas for features, bug fixes, or enhancements, feel free to:
- Submit a **pull request**.
- Open an **issue** in the repository.

---

## 📧 Contact

For any queries or support, please reach out via email: **arshsomal100@gmail.com**
