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
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Instructor Details */}
      <InstructorDetails />

      {/* Lecture Section */}
      <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Your Lectures
        </h1>

        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : lectures.length === 0 ? (
          <p className="text-red-500 font-medium text-center">
            No lectures scheduled.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lectures.map((lecture) => (
              <div
                key={lecture._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Course Image on Top */}
                {lecture.course && lecture.course.image && (
                  <img
                    src={`http://localhost:5000/${lecture.course.image}`}
                    alt={lecture.course.name}
                    className="w-full h-44 object-cover"
                  />
                )}

                {/* Course Details */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-blue-800 mb-2">
                    {lecture.course ? lecture.course.name : "Unknown Course"}
                  </h2>

                  <p className="text-gray-600 mb-2">
                    <strong className="text-gray-700">Date:</strong>{" "}
                    {new Date(lecture.date).toLocaleDateString()}
                  </p>

                  {/* Show Batches */}
                  <p className="text-gray-600 mb-2">
                    <strong className="text-gray-700">Batches:</strong>{" "}
                    {lecture.course && lecture.course.batches.length > 0 ? (
                      <span className="font-medium">
                        {lecture.course.batches
                          .map((batch) => batch.batchName)
                          .join(", ")}
                      </span>
                    ) : (
                      <span className="text-gray-400">
                        No batches available
                      </span>
                    )}
                  </p>

                  <p className="text-gray-700">
                    <strong className="text-gray-800">Details:</strong>{" "}
                    {lecture.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorPanel;
