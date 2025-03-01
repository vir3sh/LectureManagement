const express = require("express");
const router = express.Router();
const Lecture = require("../models/Lecture");

router.post("/", async (req, res) => {
  const { course, instructor, date, details } = req.body;

  try {
    // Check if the instructor already has a lecture scheduled on the given date
    const existingLecture = await Lecture.findOne({ instructor, date });
    if (existingLecture) {
      return res.status(400).json({
        message: "Instructor already has a lecture scheduled on this date",
      });
    }

    const lecture = new Lecture({
      course,
      instructor,
      date,
      details,
    });

    const newLecture = await lecture.save();
    res.status(201).json(newLecture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate({
        path: "course",
        select: "name batches", // Include batches
      })

      .populate("instructor", "name");

    res.json(lectures);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/instructor/:instructorId", async (req, res) => {
  try {
    const lectures = await Lecture.find({
      instructor: req.params.instructorId,
    }).populate("course");
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
