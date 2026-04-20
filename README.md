# Bookstore Management System

### Capstone Project - Full Stack Development with Java

**Student Name:** Pratik Rath  
**Roll No:** 23052584  
**Program:** Full Stack Development with Java

---

## 📋 Project Description

A full-stack web application for managing an online bookstore. The system supports user registration, book browsing with search/filter, order placement, and a complete admin dashboard for managing books, categories, and orders.

## 🛠️ Technology Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Frontend    | React 19, Vite, Bootstrap 5   |
| Backend     | Spring Boot 3.2.5, Java 17    |
| Database    | MySQL 8.x                     |
| Security    | JWT (JSON Web Tokens)          |
| API Docs    | Swagger / OpenAPI              |

## 📁 Project Structure

```
Bookstore-Management-System/
├── bookstore-backend/        # Spring Boot REST API
│   ├── src/main/java/com/pratik/bookstore/
│   │   ├── config/           # Security, JWT, CORS, Swagger
│   │   ├── controller/       # REST Controllers
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── entity/           # JPA Entities
│   │   ├── exception/        # Custom Exceptions
│   │   ├── repository/       # Spring Data JPA Repositories
│   │   └── service/          # Business Logic
│   └── pom.xml
├── bookstore-frontend/       # React + Vite SPA
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   └── services/         # API service layer
│   └── package.json
└── README.md
```

## ⚙️ Prerequisites

Before running this project, ensure you have:

- **Java 17** (JDK 17 or higher)
- **Node.js 18+** and npm
- **MySQL 8.x** (running on port 3306)
- **Maven 3.9+** (or use the included Maven wrapper `./mvnw`)

## 🚀 How to Run

### Step 1: Setup MySQL Database

```bash
# Login to MySQL
mysql -u root -p

# Create the database
CREATE DATABASE bookstore_db;
EXIT;
```

### Step 2: Configure Database Credentials

Edit `bookstore-backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```
> **Note:** Default configuration uses `root` with empty password.

### Step 3: Run the Backend (Spring Boot)

```bash
cd bookstore-backend
./mvnw spring-boot:run
```
The backend will start at **http://localhost:8080**

### Step 4: Run the Frontend (React)

```bash
cd bookstore-frontend
npm install
npm run dev
```
The frontend will start at **http://localhost:5173**

### Step 5: Open in Browser

Navigate to **http://localhost:5173** to use the application.

## 🔑 Demo Credentials

| Role  | Email                 | Password |
|-------|-----------------------|----------|
| Admin | admin@bookstore.com   | admin123 |
| User  | john@example.com      | user123  |

> Sample data (books, categories) is automatically seeded on first run.

## 📌 Features

### Public (No Login Required)
- Browse all books with cover images
- Search books by title or author
- Filter books by category
- View book details

### User Features (Login Required)
- Register new account
- Login / Logout
- Place book orders
- View order history

### Admin Features
- Dashboard with statistics
- Add / Edit / Delete books
- Manage categories
- View all orders

## 🔗 API Endpoints

| Method | Endpoint                | Description          | Auth       |
|--------|-------------------------|----------------------|------------|
| POST   | /api/auth/register      | Register user        | Public     |
| POST   | /api/auth/login         | Login user           | Public     |
| GET    | /api/books              | List all books       | Public     |
| GET    | /api/books/search       | Search books         | Public     |
| POST   | /api/books              | Add book             | Admin      |
| PUT    | /api/books/{id}         | Update book          | Admin      |
| DELETE | /api/books/{id}         | Delete book          | Admin      |
| GET    | /api/categories         | List categories      | Public     |
| POST   | /api/categories         | Add category         | Admin      |
| POST   | /api/orders             | Place order          | User       |
| GET    | /api/orders             | My orders            | User       |
| GET    | /api/orders/all         | All orders           | Admin      |

API Documentation (Swagger): **http://localhost:8080/swagger-ui.html**

## 📝 License

This project is submitted as part of the Full Stack Development with Java capstone project.
