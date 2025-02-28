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

// Add a new course with multiple batches and an image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, level, description, batches } = req.body;
    let parsedBatches;

    if (typeof batches === "string") {
      try {
        // Try to parse the string as JSON
        parsedBatches = JSON.parse(batches);
        // If the parsed value is not an array, wrap it in an array
        if (!Array.isArray(parsedBatches)) {
          parsedBatches = [{ batchName: parsedBatches }];
        }
      } catch (err) {
        // If JSON parsing fails, assume it's a plain string and wrap it in an array
        parsedBatches = [{ batchName: batches }];
      }
    } else {
      // If it's already an array, use it as is
      parsedBatches = batches;
    }

    const courseData = {
      name,
      level,
      description,
      batches: parsedBatches,
    };

    // If an image file was uploaded, add its path to the course data
    if (req.file) {
      courseData.image = req.file.path;
    }

    const course = new Course(courseData);
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
