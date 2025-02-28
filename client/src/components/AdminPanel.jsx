// src/components/AdminPanel.js
import React from "react";
import InstructorList from "./InstructorList";
import AddCourse from "./AddCourse";
import ScheduleLecture from "./ScheduleLecture";

const AdminPanel = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InstructorList />
        <AddCourse />
      </div>
      <ScheduleLecture />
    </div>
  );
};

export default AdminPanel;
