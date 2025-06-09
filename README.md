# Chat-Bot

A real-time chat application built with a Spring Boot backend and a React frontend using WebSocket (STOMP) for seamless instant messaging.

---

## Table of Contents

- [About](#about)  
- [Technologies Used](#technologies-used)  
- [Project Structure](#project-structure)  
- [Setup & Run](#setup--run)  
- [Usage](#usage)  
- [Configuration](#configuration)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

---

## About

Chat-Bot is a modern, real-time chat application that allows users to create or join chat rooms and exchange messages instantly. The backend is powered by Spring Boot with WebSocket and STOMP protocol, while the frontend is built using React, leveraging Vite for fast development and Tailwind CSS for styling.

---

## Technologies Used

### Backend
- Java 17+  
- Spring Boot  
- WebSocket with STOMP  
- JPA / Hibernate  
- Maven  

### Frontend
- React  
- Vite  
- Tailwind CSS  
- Axios  
- React Context API  

---

## Project Structure
Chat-Bot/

├── backend/ # Spring Boot backend source code

├── frontend/ # React frontend source code

├── README.md # Project documentation

---

## Setup & Run

### Prerequisites

Make sure you have the following installed:

- Java JDK 17 or higher  
- Maven  
- Node.js (v16+) and npm or yarn  

---

### Running Backend
---
```
cd backend
./mvnw clean install
./mvnw spring-boot:run
```
The backend will start at: http://localhost:8080

---

### Running Frontend
---
```
cd frontend
npm install
npm run dev
```
The frontend will be available at: http://localhost:5173 (default Vite port)

---

## 📌 Usage

- Open the frontend URL in your browser (e.g., `http://localhost:5173`).
- Use the interface to **create** or **join** chat rooms.
- Start chatting — messages are delivered in **real-time via WebSocket (STOMP)**.
- The backend handles all **message routing**, **room creation**, and **data management**.

---

## ⚙️ Configuration

### Backend
- Application settings:  
  `backend/src/main/resources/application.properties`
- You can configure:
  - Server port
  - Database credentials
  - WebSocket settings

### Frontend
- Add environment variables in:  
  `frontend/.env`
- Common variables:
  - API base URLs
  - WebSocket endpoints

---

## 🤝 Contributing

We welcome contributions! 🚀

- Fork this repository
- Create a new branch: `git checkout -b feature/your-feature-name`
- Commit your changes: `git commit -m "Add feature"`
- Push and create a Pull Request

✅ Follow clean code practices and include useful commit messages.

---


## 🙋 Contact

**Created & Maintained By:**  
[Chiranshu Jindal](https://github.com/Chiranshu-Jindal)  
📧 chiranshujindal03@gmail.com

---

## 🙌 Acknowledgments

- Thanks to the **open-source community** for the powerful tools used in this project.
- Special mention to:
  - Spring Boot  
  - React  
  - WebSocket/STOMP  
  - Tailwind CSS  
  - Vite




