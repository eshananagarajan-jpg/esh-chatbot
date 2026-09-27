# 🤖 Chatbot Project v2

A fresh start for your personal AI chatbot website with a Node.js/Express backend and React/Vite frontend.

---

## 📁 Project Structure

```
chatbot-v2/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### 1. Create Project Folder Structure

```bash
# Create the main project folder
mkdir chatbot-v2
cd chatbot-v2

# Create backend folder
mkdir backend
cd backend

# Create frontend folder (from chatbot-v2)
cd ..
mkdir frontend
```

### 2. Setup Backend

```bash
cd backend

# Copy the backend files here:
# - server.js
# - package.json
# - .env

# Install dependencies
npm install

# Start the server
npm start
```

**Backend will run on:** `http://localhost:5000`

### 3. Setup Frontend

```bash
cd ../frontend

# Copy the frontend files here:
# - index.html
# - vite.config.js
# - package.json
# - main.jsx
# - App.jsx
# - App.css
# - index.css

# Install dependencies
npm install

# Start the development server
npm run dev
```

**Frontend will run on:** `http://localhost:3000`

---

## 📝 How It Works

1. **Backend (Port 5000):**
   - Express server listens for messages
   - `/api/chat` endpoint receives messages from frontend
   - Returns bot responses

2. **Frontend (Port 3000):**
   - React/Vite application
   - Clean, modern chatbot UI
   - Sends user messages to backend API
   - Displays responses in chat

---

## ✨ Features

- ✅ Responsive chat interface
- ✅ Real-time message sending
- ✅ Backend API integration
- ✅ Error handling
- ✅ Loading states
- ✅ Beautiful UI with gradients

---

## 🔗 API Endpoints

### POST `/api/chat`

**Request:**
```json
{
  "message": "Hello"
}
```

**Response:**
```json
{
  "user": "Hello",
  "bot": "Hello! How can I help you today?"
}
```

---

## 🌳 Git Setup

```bash
# Initialize git in your project
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: chatbot v2 setup"

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/chatbot-v2.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 📚 Next Steps

1. **Test both servers running together** ✅
2. **Replace the simple bot logic** with real AI (GPT API, custom logic, etc.)
3. **Add database** for storing chat history
4. **Deploy to production** (Vercel, Heroku, AWS, etc.)
5. **Add authentication** for user accounts

---

## 🐛 Troubleshooting

**"Cannot find module 'express'"**
- Run `npm install` in the backend folder

**"Port already in use"**
- Change PORT in backend .env file or kill the process using the port

**"Frontend can't connect to backend"**
- Make sure backend is running on port 5000
- Check CORS is enabled in Express

---

## 📞 Support

If you need help, check the files in the project or ask for guidance!

**Happy Coding!** 🚀
