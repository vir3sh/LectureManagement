import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InstructorDetails from "./InstructorDetails";

const InstructorPanel = () => {
  const { instructorId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/lectures/instructor/${instructorId}`
        );
        setLectures(response.data);
      } catch (error) {
        console.error("Error fetching lectures:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, [instructorId]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Instructor Details */}
      <InstructorDetails />

      {/* Lecture Section */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Lectures</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : lectures.length === 0 ? (
          <p className="text-red-500 font-medium">No lectures scheduled.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lectures.map((lecture) => (
              <div
                key={lecture._id}
                className="bg-blue-50 border border-blue-200 p-5 rounded-lg shadow-md hover:shadow-xl transition"
              >
                {/* Course Image on Top - Check if course exists */}
                {lecture.course && lecture.course.image && (
                  <img
                    src={`http://localhost:5000/${lecture.course.image}`}
                    alt={lecture.course.name}
                    className="w-full h-40 object-cover rounded-t-lg mb-3"
                  />
                )}
                <h2 className="text-lg font-semibold text-blue-700 mb-2">
                  {lecture.course ? lecture.course.name : "Unknown Course"}
                </h2>
                <p className="text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(lecture.date).toLocaleString()}
                </p>
                <p className="text-gray-700">
                  <strong>Details:</strong> {lecture.details}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorPanel;
