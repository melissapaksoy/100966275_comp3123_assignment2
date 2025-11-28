
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

## 📌 add this route file as `routes/employeeRoutes.js`

```js
const express = require('express');
const Employee = require('../models/Employee');
const protect = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// store images in /uploads folder
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST /employees
router.post('/employees', protect, upload.single('profileImage'), async (req, res) => {
  try {
    const { firstName, lastName, email, department, position } = req.body;

    const employee = await Employee.create({
      firstName,
      lastName,
      email,
      department,
      position,
      profileImage: req.file ? `/uploads/${req.file.filename}` : undefined
    });

    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /employees
router.get('/employees', protect, async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// GET /employees/:id
router.get('/employees/:id', protect, async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  if (!emp) return res.status(404).json({ message: 'Not found' });
  res.json(emp);
});

// PUT /employees/:id
router.put('/employees/:id', protect, upload.single('profileImage'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.profileImage = `/uploads/${req.file.filename}`;

    const emp = await Employee.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /employees/:id
router.delete('/employees/:id', protect, async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee removed' });
});

// SEARCH /search?department=value&position=value
router.get('/search', protect, async (req, res) => {
  const { department, position } = req.query;
  const query = {};
  if (department) query.department = department;
  if (position) query.position = position;

  const employees = await Employee.find(query);
  res.json(employees);
});

module.exports = router;
```

---

## 📌 Make uploads folder public in `server.js`

```js
app.use('/uploads', express.static('uploads'));
```

---

## Employee Schema Update

```js
profileImage: { type: String }
```


