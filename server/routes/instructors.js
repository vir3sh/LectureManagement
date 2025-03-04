const express = require("express");
const router = express.Router();
const Instructor = require("../models/Instructor");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor)
      return res.status(404).json({ message: "Instructor not found" });
    res.json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!instructor)
      return res.status(404).json({ message: "Instructor not found" });
    res.json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const instructor = await Instructor.findOne({ email });

    if (!instructor || instructor.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { instructorId: instructor._id, email: instructor.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, instructorId: instructor._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    res.json({ token, message: "Admin logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
