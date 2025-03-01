import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [allLectures, setAlllectures] = useState([]);
  const backendUrl = "http://localhost:5000";

  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

  useEffect(() => {
    localStorage.setItem("adminToken", token);
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("adminToken");
  };

  const fetchInstructors = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/instructors`);
      setInstructors(response.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/courses`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const getAllLectures = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/lectures`);
      setAlllectures(response.data);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

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

  const deleteInstructor = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/instructors/${id}`);
      setInstructors((prev) => prev.filter((inst) => inst.id !== id));
    } catch (error) {
      console.error("Error deleting instructor:", error);
    }
  };

  const addCourse = (course) => {
    setCourses((prev) => [...prev, course]);
  };

  const scheduleLecture = async (lecture) => {
    try {
      const response = await axios.post(`${backendUrl}/api/lectures`, {
        course: lecture.courseId,
        instructor: lecture.instructorId,
        date: lecture.date,
        details: lecture.details,
      });

      setLectures((prev) => [...prev, response.data]);
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
        token,
        login,
        logout,
        addCourse,
        lectures,
        allLectures,
        setAlllectures,
        getAllLectures,
        fetchLectures,
        scheduleLecture,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
