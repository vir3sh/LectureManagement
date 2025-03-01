import React, { useState, useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
const ScheduleLecture = () => {
  const {
    scheduleLecture,
    fetchCourses,
    fetchInstructors,
    courses,
    instructors,
  } = useContext(AdminContext);

  const [lectureData, setLectureData] = useState({
    courseId: "",
    instructorId: "",
    date: "",
    details: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await scheduleLecture(lectureData);
      if (scheduleLecture) {
        toast.success("Lecture scheduled successfully");
      }
      setLectureData({ courseId: "", instructorId: "", date: "", details: "" });
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded mt-4">
      <h2 className="text-2xl font-bold mb-4">Schedule Lecture</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Select Course</label>
          <select
            value={lectureData.courseId}
            onChange={
              (e) =>
                setLectureData({ ...lectureData, courseId: e.target.value }) 
            }
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {" "}
                {/* Use _id, not name */}
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Select Instructor</label>
          <select
            value={lectureData.instructorId}
            onChange={
              (e) =>
                setLectureData({ ...lectureData, instructorId: e.target.value }) 
            }
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select an instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor._id} value={instructor._id}>
                {" "}
                {/* Use _id here */}
                {instructor.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Lecture Date</label>
          <input
            type="date"
            value={lectureData.date}
            onChange={(e) =>
              setLectureData({ ...lectureData, date: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Details</label>
          <textarea
            value={lectureData.details}
            onChange={(e) =>
              setLectureData({ ...lectureData, details: e.target.value })
            }
            className="w-full border p-2 rounded"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Schedule Lecture
        </button>
      </form>
    </div>
  );
};

export default ScheduleLecture;
