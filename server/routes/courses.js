const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const multer = require("multer");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure the 'uploads' directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, level, description, batches } = req.body;
    let parsedBatches = [];

    // Parse the batches JSON string
    if (batches) {
      try {
        parsedBatches = JSON.parse(batches);
        if (!Array.isArray(parsedBatches)) {
          return res
            .status(400)
            .json({ message: "Batches should be an array" });
        }
      } catch (err) {
        return res.status(400).json({ message: "Invalid batches format" });
      }
    }

    // Construct the course data
    const courseData = {
      name,
      level,
      description,
      batches: parsedBatches,
    };

    // If an image file was uploaded, add its path
    if (req.file) {
      courseData.image = req.file.path;
    }

    const course = new Course(courseData);
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
