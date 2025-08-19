# 📚 Public Library Management System
A full-stack Library Management System built using Spring Boot and React, designed to manage books, users, borrowing workflows efficiently.

![React](https://img.shields.io/badge/React-Frontend-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Backend-green)
![MySQL](https://img.shields.io/badge/MySQL-Database-orange)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED)

## 🚀 Project Overview
The system digitizes traditional library operations by providing:
- Book inventory management
- Member registration and role management 
- Borrow and return tracking 
- Automated fine calculation system
- Integrated Khalti Payment for secure online fine payments
- Search and filtering capabilities

Supported Roles
- Member – Browse books, borrow, return, and pay fines
- Librarian – Manage borrow/return operations, books, categories and members
- Admin - Full system access, manage librarians and reports

The goal of this project is to simulate an enterprise application with secure authentication, structured architecture, and cloud-ready deployment.

## 🌐 Live Demo
[![Live Demo](https://img.shields.io/badge/CLICK_HERE-2ea44f?style=for-the-badge)](https://lms-two-tau.vercel.app)
   ```diff
   https://lms-two-tau.vercel.app
   ```

## 🏗️ Architecture Overview
### High-Level Architecture Flow
- Frontend: React (UI & client-side logic)
- Backend: Spring Boot (REST APIs)
- Service Layer: Implements core business logic
- Repository Layer: JPA/Hibernate data access
- Database: MySQL (AWS RDS)
- Additional integrations: RabbitMQ (Asynchronous messaging), AWS S3 (image storage)

### Deployment/Infra Overview
- Infrastructure Provisioning: Terraform (IaC)
- Database Hosting: AWS RDS
- Storage: AWS S3 (For images)
- Message Broker: CloudAMQP (RabbitMQ)
- Containerization: Docker
- Deployment: Render(backend) & Vercel(frontend)

### Best Practices
- Layer Architecture (Controller → Service → Repository)
- DTOs for data transfer
- Global exception handling
- Rate limiting (Token Bucket Algorithm) for API protection
- Environment-based configuration (dev / prod) using .env
- Multi-stage dockerized for production deployment

## 🛠️ Tech Stack
### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend
![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![JPA](https://img.shields.io/badge/JPA/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

### DevOps & Cloud
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![AWS RDS](https://img.shields.io/badge/AWS_RDS-527FFF?style=for-the-badge&logo=amazon-rds&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazon-s3&logoColor=white)
![CloudAMQP](https://img.shields.io/badge/CloudAMQP-2B3A4B?style=for-the-badge&logo=rabbitmq&logoColor=FF6600)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## ✨ Features
- 🔐 JWT authentication with role-based authorization
- 🔄 Borrow & return workflow 
- 💳 Automated fine calculation system
- 📦 Pagination & Sorting
- 🔎 Advanced Search & Filtering
- ️🛡️ Global Exception Handling
- 📁 Image Upload with AWS S3

## 📂 Project Structure
### Backend
```
backend/
├── config/
├── controller/
├── entity/
├── exception/
├── repository/
├── security/
└── service/
```

### Frontend
```
frontend/
├── src/
├── components/
├── services/
└── environments/
```

## 🧪️ Run Locally
### 1️⃣ Clone Repository
Run: git clone https://github.com/AnkitGurungg/public-library-management-system

### 2️⃣ Backend Setup
1. Navigate to backend directory
   ```diff 
   cd backend
2. Copy .env.example and create a .env file.
   ```diff 
   cp .env.example .env
3. Update the values inside .env according to your local setup.
4. Start the backend using: 
    ```diff
   mvn spring-boot:run
    ```

### 3️⃣ Frontend Setup
1. Navigate to frontend directory
   ```diff 
   cd frontend
2. Install dependencies with:
   ```diff
   npm install
3. Start the development server:
   ```diff
   npm run dev

Runs locally at:
- Frontend → http://localhost:5173
- Backend → http://localhost:8080

## 📈 Future Enhancements
- Microservices migration
- Redis caching
- Elasticsearch integration
- Kubernetes deployment
