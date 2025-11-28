const express = require('express');
const Employee = require('../models/Employee');
const protect = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/**
 * POST /employees  (with optional file)
 */
router.post(
  '/employees',
  protect,
  upload.single('profileImage'),
  async (req, res) => {
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
  }
);

/**
 * GET /employees
 */
router.get('/employees', protect, async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

/**
 * GET /employees/:id
 */
router.get('/employees/:id', protect, async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  if (!emp) return res.status(404).json({ message: 'Not found' });
  res.json(emp);
});

/**
 * PUT /employees/:id  (update + optional new file)
 */
router.put(
  '/employees/:id',
  protect,
  upload.single('profileImage'),
  async (req, res) => {
    try {
      const updates = { ...req.body };
      if (req.file) updates.profileImage = `/uploads/${req.file.filename}`;

      const emp = await Employee.findByIdAndUpdate(req.params.id, updates, {
        new: true
      });

      res.json(emp);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/**
 * DELETE /employees/:id
 */
router.delete('/employees/:id', protect, async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee removed' });
});

/**
 * GET /search?department=IT&position=Manager
 */
router.get('/search', protect, async (req, res) => {
  const { department, position } = req.query;
  const query = {};
  if (department) query.department = department;
  if (position) query.position = position;

  const employees = await Employee.find(query);
  res.json(employees);
});

module.exports = router;
