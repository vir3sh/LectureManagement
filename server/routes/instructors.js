// routes/instructors.js
const express = require("express");
const router = express.Router();
const Instructor = require("../models/Instructor");

// Get all instructors
router.get("/", async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new instructor (using name, email, and password)
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const instructor = new Instructor({
    name,
    email,
    password,
  });
  try {
    const newInstructor = await instructor.save();
    res.status(201).json(newInstructor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an instructor's details (optionally updating password)
router.put("/:id", async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor)
      return res.status(404).json({ message: "Instructor not found" });

    instructor.name = req.body.name || instructor.name;
    instructor.email = req.body.email || instructor.email;
    if (req.body.password) {
      instructor.password = req.body.password;
    }

    const updatedInstructor = await instructor.save();
    res.json(updatedInstructor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
