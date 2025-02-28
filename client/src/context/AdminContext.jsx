// src/context/AdminContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);
  const backendUrl = "http://localhost:5000"; // Update with your backend URL

  // Fetch instructors from API
  const fetchInstructors = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/instructors`);
      setInstructors(response.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  // Fetch courses from API
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/courses`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Fetch lectures for a specific instructor
  const fetchLectures = async (instructorId) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/instructor/${instructorId}`
      );
      setLectures(response.data);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  // Add instructor via API
  const addInstructor = async (instructor) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/instructors`,
        instructor
      );
      setInstructors((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding instructor:", error);
    }
  };

  // Update instructor via API
  const updateInstructor = async (id, updatedData) => {
    try {
      await axios.put(`${backendUrl}/api/instructors/${id}`, updatedData);
      setInstructors((prev) =>
        prev.map((inst) =>
          inst.id === id ? { ...inst, ...updatedData } : inst
        )
      );
    } catch (error) {
      console.error("Error updating instructor:", error);
    }
  };

  // Delete instructor via API
  const deleteInstructor = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/instructors/${id}`);
      setInstructors((prev) => prev.filter((inst) => inst.id !== id));
    } catch (error) {
      console.error("Error deleting instructor:", error);
    }
  };

  // Add a new course
  const addCourse = (course) => {
    setCourses((prev) => [...prev, course]);
  };

  // Schedule a lecture via API
  const scheduleLecture = async (lecture) => {
    try {
      const response = await axios.post(`${backendUrl}/api/lectures`, {
        course: lecture.courseId, // Changing courseId to course
        instructor: lecture.instructorId, // Changing instructorId to instructor
        date: lecture.date,
        details: lecture.details,
      });

      setLectures((prev) => [...prev, response.data]); // Add scheduled lecture to state
    } catch (error) {
      console.error("Error scheduling lecture:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Failed to schedule lecture"
      );
    }
  };

  useEffect(() => {
    fetchInstructors();
    fetchCourses();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        instructors,
        fetchInstructors,
        addInstructor,
        updateInstructor,
        deleteInstructor,
        courses,
        fetchCourses,
        addCourse,
        lectures,
        fetchLectures,
        scheduleLecture,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
