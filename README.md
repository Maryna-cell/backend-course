# 🚀 Node.js Backend API for Portfolio Showcase

This project is a complete **RESTful API** built with **Node.js** and **Express**, designed to demonstrate key backend development skills, including database management, file handling, and clean architecture.

This is an ideal portfolio piece, showing the ability to create structured and maintainable server applications.

---

## 🛠️ Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Runtime** | `Node.js` | Asynchronous JavaScript runtime environment. |
| **Framework** | `Express.js` | Fast, minimalist web application framework. |
| **Database** | `MongoDB` | NoSQL database for flexible data storage. |
| **ODM** | `Mongoose` | Object Data Modeling library for MongoDB. |
| **File Uploads** | `express-fileupload` | Middleware used for handling image file uploads. |

---

## ✨ Key Features

* **CRUD Operations:** Full functionality for Create, Read, Update, and Delete actions on data resources.
* **Clean Architecture:** Logic is separated into **Controllers** and **Services** for better maintainability and logic segregation.
* **Secure File Handling:** Implements a service for uploading and saving images to the local `static/` directory.
* **Configuration:** Uses a `.env` file to securely store sensitive data like the MongoDB connection string.

---

## ⚙️ Local Setup Guide

### Prerequisites

1.  **Node.js** (LTS version recommended).
2.  **MongoDB** database access (local or MongoDB Atlas).

### 1. Installation

```bash
# Navigate to the project folder
cd backend-course
# Install all dependencies
npm install
