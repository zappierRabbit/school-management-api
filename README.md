# Axion API – Backend Service

Axion is a Node.js + Express backend service with JWT-based authentication, role-based access control (RBAC), and MongoDB persistence.
This repository is designed to be easy to run locally and fully testable without cloud services.

---

## 🧱 Tech Stack

- Node.js (>= 18)
- Express.js
- MongoDB
- JWT Authentication
- Jest + Supertest (testing)
- mongodb-memory-server (in-memory DB for tests)
- Swagger (API docs)

---

## 📂 Project Structure (Simplified)

```
.
├── index.js
├── config/
├── connect/
├── loaders/
├── managers/
├── bootstrap/
├── docs/
├── tests/
├── package.json
└── README.md
```

---

## ⚙️ Prerequisites

- Node.js >= 18
- npm >= 9
- MongoDB running locally

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/axion
LONG_TOKEN_SECRET=supersecretjwtkey
SHORT_TOKEN_SECRET=shortsecretkey
MASTER_ADMIN_EMAIL=admin@system.com
MASTER_ADMIN_PASSWORD=SuperSecret123!
```

---

## 📦 Install Dependencies

```bash
npm install
```

---

## ▶️ Run the Application

```bash
npm start
```

---

## 📘 Swagger Docs

http://localhost:3000/api-docs

---

## 🧪 Run Tests

```bash
npm test
```

---

## ✅ Reviewer Quick Start

1. npm install
2. npm test
3. npm start
4. Open Swagger

---

## 📄 License

MIT
