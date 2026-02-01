# School Management API

A backend service for managing schools, classrooms, and students with role-based access control (RBAC), JWT authentication, and MongoDB persistence.

The system is designed with a clear separation of concerns, explicit bootstrapping, and production-oriented practices suitable for backend technical evaluations and real-world service foundations.

---

## Table of Contents

- Overview
- Problem Scope
- Architecture
- Design Principles
- Authentication & Authorization
- Master Admin Bootstrap
- Database Design
- Docker Setup
- Environment Configuration
- Running the Application
- Login & Authentication Flow
- API Documentation (Swagger)
- Core API Capabilities
- Example End-to-End Workflow
- Error Handling
- Security Considerations
- Technology Stack
- Notes & Scope
- Summary

---

## Overview

The School Management API provides backend functionality for:

- Managing multiple schools
- Managing classrooms within a school
- Enrolling students
- Assigning and transferring students between classrooms
- Enforcing classroom capacity constraints
- Securing access using JWT-based authentication and RBAC

The project intentionally avoids UI concerns and focuses on authorization, domain logic, and correctness.

---

## Problem Scope

The primary goals of this system are to:

- Demonstrate clean backend architecture
- Enforce strict role-based access control
- Support multi-tenant data isolation at the school level
- Implement non-trivial domain rules (classroom capacity and transfers)
- Provide complete, self-contained API documentation
- Ensure deterministic and secure system initialization

---

## Architecture

The application follows a layered architecture with an explicit composition root.

index.js                 Application entrypoint (composition root)
bootstrap/               Startup initialization logic
connect/                 External service connections (MongoDB)
loaders/                 Dependency wiring and bootstrapping
managers/entities/       Domain models and business logic
managers/api/            HTTP transport layer (routes/controllers)
mws/                     Authentication & authorization middleware
docs/swagger/            OpenAPI (Swagger) specifications

---

## Design Principles

- Separation of concerns between domain logic and transport
- Explicit bootstrapping with no hidden framework behavior
- Idempotent startup (safe restarts)
- Secure-by-default design
- Documentation decoupled from implementation

---

## Authentication & Authorization

### Authentication

- Users authenticate using email and password
- Passwords are hashed using bcrypt
- JWTs are issued upon successful login

### Authorization (RBAC)

Two roles are supported:

SUPERADMIN   System-wide administrator  
SCHOOL_ADMIN Administrator scoped to a single school  

JWTs must be provided with every protected request using the Authorization header.

---

## Master Admin Bootstrap

A SUPERADMIN account is automatically created (or repaired) at application startup using environment variables.

This avoids exposing insecure administrative APIs.

### Required Environment Variables

MASTER_ADMIN_EMAIL=admin@system.com  
MASTER_ADMIN_PASSWORD=SuperSecret123!  

### Bootstrap Behavior

- If the admin user does not exist, it is created
- If the admin exists without a password hash, it is self-healed
- If the admin already exists correctly, no action is taken

This process is idempotent and safe on every startup.

---

## Database Design

MongoDB is used as the primary datastore.

Collections include:
- users
- schools
- classrooms
- students

Relationships:
- Schools own classrooms
- Schools own students
- Students may belong to classrooms
- Access is strictly scoped by school ownership

---

## Docker Setup

MongoDB is run locally using Docker for consistent and repeatable setup.

To start MongoDB:

docker run -d --name mongo-school -p 27017:27017 mongo:7

Verify the container:

docker ps

---

## Environment Configuration

Create a .env file in the project root:

PORT=3000  
LONG_TOKEN_SECRET=supersecretjwtkey  
MONGO_URI=mongodb://127.0.0.1:27017/school_management  
MASTER_ADMIN_EMAIL=admin@system.com  
MASTER_ADMIN_PASSWORD=SuperSecret123!  

---

## Running the Application

Install dependencies:

npm install

Start the server:

npm start

Expected output:

Mongoose connected  
Master admin verified  
Server running on port 3000  

---

## Login & Authentication Flow

Login endpoint:

POST /auth/login

Request body:

{
  "email": "admin@system.com",
  "password": "SuperSecret123!"
}

Response:

{
  "token": "<jwt-token>"
}

The returned JWT must be used for all protected endpoints.

---

## API Documentation (Swagger)

Swagger UI is available at:

http://localhost:3000/api-docs

Swagger features include:
- OpenAPI 3.0 compliance
- JWT authorization support
- Request and response schemas
- Interactive Try-It-Out functionality

Swagger specifications are located in the docs/swagger directory.

---

## Core API Capabilities

Schools:
- Create schools (SUPERADMIN only)
- List schools

Classrooms:
- Create classrooms
- Enforce capacity limits

Students:
- Enroll students
- Assign students to classrooms
- Transfer students between classrooms with capacity checks

---

## Example End-to-End Workflow

1. Login as SUPERADMIN
2. Create a school
3. Login as SCHOOL_ADMIN
4. Create classrooms
5. Enroll students
6. Assign students to classrooms
7. Transfer students with capacity enforcement

---

## Error Handling

- Authentication failures return 401 Unauthorized
- Authorization failures return 403 Forbidden
- Domain rule violations return 400 Bad Request
- Errors are returned in a consistent JSON format

---

## Security Considerations

- Passwords are never stored in plain text
- bcrypt is used for hashing
- JWT secrets are stored in environment variables
- Admin creation is restricted to startup bootstrap logic
- School-level data isolation is strictly enforced

---

## Technology Stack

Node.js  
Express  
MongoDB  
Mongoose  
JWT  
bcrypt  
Swagger (OpenAPI 3.0)  
Docker  

---

## Notes & Scope

- Password reset and refresh tokens are intentionally out of scope
- Input validation is minimal to focus on domain behavior
- MongoDB Atlas can be used by updating MONGO_URI
- No frontend components are included

---

## Summary

This project demonstrates clean backend architecture, secure authentication and authorization, deterministic bootstrapping, clear API documentation, and production-minded engineering decisions.
