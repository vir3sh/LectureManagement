import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { FaChalkboardTeacher, FaBook, FaVideo } from "react-icons/fa";

import { format } from "date-fns";
const AdminPanel = () => {
  const {
    instructors,
    courses,
    allLectures,
    fetchInstructors,
    fetchCourses,
    getAllLectures,
  } = useContext(AdminContext);

  useEffect(() => {
    fetchInstructors();
    fetchCourses();
    getAllLectures();
  }, []);

  return (
    <div className="p-10 bg-yellow-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Admin Panel
      </h1>

      {/* Flex Layout for Better Alignment */}
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        {/* Instructors Section */}
        <div className="bg-white shadow-xl rounded-lg p-6 flex-1">
          <div className="flex items-center space-x-3">
            <FaChalkboardTeacher className="text-blue-600 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-700">
              Instructor List
            </h2>
          </div>
          <div className="mt-4 h-60 overflow-y-auto">
            <ul>
              {instructors.map((instructor) => (
                <li
                  key={instructor._id}
                  className="border-b border-gray-200 p-3 hover:bg-gray-50"
                >
                  <p className="font-semibold text-lg">{instructor.name}</p>
                  <p className="text-gray-600">Email: {instructor.email}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Courses Section */}
        <div className="bg-white shadow-xl rounded-lg p-6 flex-1">
          <div className="flex items-center space-x-3">
            <FaBook className="text-green-600 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-700">Courses</h2>
          </div>
          <div className="mt-4 h-60 overflow-y-auto">
            <ul className="space-y-4">
              {courses.map((course) => (
                <li
                  key={course._id}
                  className="border-b border-gray-200 p-3 hover:bg-gray-50 flex justify-between items-center"
                >
                  {/* Left Side - Course Details */}
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{course.name}</p>
                    <p className="text-gray-600">Level: {course.level}</p>
                    <p className="text-gray-600">
                      Description: {course.description}
                    </p>
                    <p className="text-gray-600">
                      Batches:{" "}
                      {course.batches.length > 0 ? (
                        <span className="font-medium">
                          {course.batches
                            .map((batch) => batch.batchName)
                            .join(", ")}
                        </span>
                      ) : (
                        <span className="text-gray-400">
                          No batches available
                        </span>
                      )}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Created on:{" "}
                      {course.createdAt
                        ? format(new Date(course.createdAt), "PPP")
                        : "Unknown Date"}
                    </p>
                  </div>

                  {/* Right Side - Course Image */}
                  <div className="w-40 h-40 flex-shrink-0 ml-4">
                    <img
                      src={`http://localhost:5000/${course.image}`} 
                      alt={course.name}
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Lectures Section (Full Width) */}
      <div className="mt-6 bg-white shadow-xl rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <FaVideo className="text-purple-600 text-2xl" />
          <h2 className="text-xl font-semibold text-gray-700">Lectures</h2>
        </div>
        <div className="mt-4 h-72 overflow-y-auto">
          <ul>
            {allLectures.map((lecture) => (
              <li
                key={lecture._id}
                className="border-b border-gray-200 p-3 hover:bg-gray-50"
              >
                <p className="font-semibold text-lg">{lecture.course?.name}</p>
                <p className="text-gray-600">
                  Instructor: {lecture.instructor?.name}
                </p>
                <p className="text-gray-600">Details: {lecture.details}</p>
                <p className="text-gray-600">
                  Date:{" "}
                  {new Date(lecture.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
