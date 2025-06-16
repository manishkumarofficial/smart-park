# 🚗 IoT-Enabled Smart Parking System

An AI and IoT-powered smart parking web application that provides real-time slot availability detection, online booking, QR code-based entry/exit, and voice navigation—built to reduce urban traffic congestion and improve user convenience.

## 🔍 Overview

This project is designed to solve the urban challenge of inefficient parking using a blend of AI, IoT, and web technologies. It allows users to:
- Search for available parking slots
- View real-time occupancy via CCTV
- Book and pay online
- Enter/exit using a QR code
- Use voice commands to interact with the app

## 🚀 Features

- ✅ Real-time parking slot detection using AI
- ✅ Interactive web app with live map view
- ✅ QR code-based contactless entry/exit
- ✅ Online payments with Stripe, UPI & PayPal
- ✅ Voice navigation with Gemini API
- ✅ Admin dashboard with occupancy & revenue analytics
- ✅ Scalable architecture (Cloud Ready)

## 🧰 Tech Stack

**Frontend:** React.js, Tailwind CSS, Framer Motion  
**Backend:** Python Flask (API), REST APIs  
**Database:** MongoDB  
**AI/ML:** OpenCV, TensorFlow  
**Voice Control:** Gemini API, Web Speech API  
**Payments:** Stripe, PayPal, UPI  
**Cloud:** AWS / Google Cloud  
**Others:** Chart.js, QR Code, Leaflet.js

## 🛠️ Installation

### 🖥️ Prerequisites
- Node.js
- Python 3.9+
- MongoDB
- pip or virtualenv

### 📦 Frontend Setup
cd frontend
npm install
npm run dev

### 🔧 Backend Setup
cd backend
python -m venv venv
source venv/bin/activate  # or venv\\Scripts\\activate on Windows
pip install -r requirements.txt
python app.py

### 🔑 Environment Variables

Create a `.env` file in the backend folder with:

MONGO_URI=your_mongo_uri
STRIPE_SECRET_KEY=your_stripe_key
GEMINI_API_KEY=your_gemini_api_key

## 📸 Demo

![Screenshot 2025-03-15 093959](https://github.com/user-attachments/assets/7afff4d3-5d4a-4b28-9db2-96b5c723270f)
![Screenshot 2025-03-15 094309](https://github.com/user-attachments/assets/851ab975-0e68-493e-8b06-ecfbd744b285)
![Screenshot 2025-03-15 094538](https://github.com/user-attachments/assets/004fb2ca-4868-4ef6-b848-45fc1ff640e4)
![Screenshot 2025-03-15 094617](https://github.com/user-attachments/assets/2a30b2d9-6a90-409f-8e9e-49392ce4ca6d)
![Screenshot 2025-03-15 094835](https://github.com/user-attachments/assets/549ad70e-38dc-4420-a017-9819252d1cfc)
![Screenshot (803)](https://github.com/user-attachments/assets/368e8d66-74a5-4183-b98d-5e10fe428a4c)

## 📡 Architecture
User
 ↕️ Web App (React)
 ↔️ Flask API (Python)
 ↔️ MongoDB
 ↕️ CCTV Camera + OpenCV/TensorFlow
 ↔️ Admin Dashboard
 ↕️ Gemini API (Voice Nav)

## 🧠 AI & ML Flow

1. CCTV captures live feed of parking lot.
2. OpenCV + TensorFlow model detects each slot as **Available (Green)** or **Occupied (Red)**.
3. Data is sent to the backend → stored in DB → reflected in frontend UI.

## 📈 Admin Dashboard

Admins can:

* View number of bookings
* Check real-time occupancy
* Track peak hours
* Analyze revenue and usage

## 🎙 Voice Control

Users can say things like:

* “Find nearest parking”
* “Book a slot”
* “Show my bookings”
* “Go to profile”

These voice commands are transcribed using the Web Speech API, sent to Gemini AI for processing, and routed by the backend accordingly.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 👨‍💻 Developed by

**Team Mastermind Mavericks – CARE Hackathon 2025**

* Manishkumar M
* Visvajeet S
* Amjath M
* Yuvanesh P


---
