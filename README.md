# 🎥 Video Streaming and Uploading Platform

This is a full-stack **Video Streaming and Uploading** platform built with **FastAPI**, **React.js**, **PostgreSQL**, and **Apache Kafka**. The application allows users to upload video files, which are encrypted and saved to a PostgreSQL database, and supports real-time streaming using Kafka.

---

## 🚀 Features

- ✅ Video file uploading from frontend
- 🔐 Data encryption before storing in the PostgreSQL database
- 🧩 Backend API powered by FastAPI
- 📦 Real-time video stream processing using Apache Kafka
- 🌐 Interactive frontend built with React.js

---

## 🛠 Tech Stack

| Component       | Technology         |
|----------------|--------------------|
| Frontend       | React.js           |
| Backend        | FastAPI            |
| Database       | PostgreSQL         |
| Streaming      | Apache Kafka       |
| Encryption     | Python Cryptography |

---

## 🧪 Setup Instructions

### 1. Clone the repository

```bash
# 1. Clone the repository
git clone https://github.com/hanumanta97/video-streaming.git

# 2. Navigate into the project directory
cd video-streaming

# 3. Install Python dependencies 
pip install -r requirements.txt

# 4. Run the FastAPI backend
uvicorn main:app --reload

# Open a new terminal for frontend

# 5. Navigate to the frontend directory
cd Frontend

# 6. Install Node.js dependencies
npm install

# 7. Run the React frontend
npm start

# 8. Start Kafka and Zookeeper using Docker Compose
docker-compose -f docker-compose.kafka.yml up -d
