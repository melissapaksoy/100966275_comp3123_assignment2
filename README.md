# Employee Management App – Full Stack (React + Node + MongoDB)

This project is a complete **Employee Management System** featuring:

- **Frontend:** React (Create React App)
- **Backend:** Node.js + Express + MongoDB
- **Database:** MongoDB Atlas
- **Authentication:** JWT Authorization + Protected Routes
- **Extra Features:** Employee Search + File Upload (Profile Picture)
- **Deployment:** Vercel (Frontend) & Render (Backend)

---

## 🚀 Live Deployment Links

| Component | Platform | URL |
|---------|----------|------|
| **Frontend (React)** | Vercel | 🔗 https://100966275-comp3123-assignment2.vercel.app/login |
| **Backend API (Express)** | Render | 🔗 https://one00966275-comp3123-assignment2-backend.onrender.com/ |

Frontend communicates with the backend using Axios over HTTPS.

---

## Available Scripts – Frontend (React)

In the `frontend` directory:

### `npm start`
Runs dev server → `http://localhost:3000`

### `npm test`
Runs test suite in watch mode.

### `npm run build`
Bundles for production → outputs to `/build`

---

## Available Scripts – Backend (Node/Express)

In the `backend` directory:

### `npm run dev`
Runs backend with nodemon hot reload.

### `npm start`
Runs production server.

Default local backend URL:  
http://localhost:5001



---

## 🔐 Environment Variables

Inside `/backend/.env`:

```env
MONGO_URI=your_mongo_atlas_connection
JWT_SECRET=super_secret_key
PORT=5001
