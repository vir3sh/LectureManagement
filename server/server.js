require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const instructorRoutes = require("./routes/instructors");
const courseRoutes = require("./routes/courses");
const lectureRoutes = require("./routes/lectures");

const app = express();
const corsoption = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
};
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsoption));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// API Routes
app.use("/api/instructors", instructorRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lectures", lectureRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
