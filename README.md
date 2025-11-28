
# Employee API with File Upload

## Overview

This document explains the backend API for employee management using NodeJS + Express + MongoDB including:
- Full CRUD operations
- Search functionality
- File upload using Multer
- JWT authentication protection

---

## 📁 Employee Routes (Protected with JWT)

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| POST | `/employees` | 🔐 Yes | Create new employee with optional image |
| GET | `/employees` | 🔐 Yes | Get all employees |
| GET | `/employees/:id` | 🔐 Yes | Get single employee details |
| PUT | `/employees/:id` | 🔐 Yes | Update employee + upload new image |
| DELETE | `/employees/:id` | 🔐 Yes | Remove employee |
| GET | `/search` | 🔐 Yes | Filter by department or position |

---



