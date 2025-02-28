import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import InstructorList from "./components/InstructorList";
import AddCourse from "./components/AddCourse";
import ScheduleLecture from "./components/ScheduleLecture";
import { ToastContainer, toast } from "react-toastify";
const App = () => {
  return (
    <Router>
      <ToastContainer />
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4 text-white">
          <li>
            <Link to="/">Admin Panel</Link>
          </li>
          <li>
            <Link to="/instructors">Instructors</Link>
          </li>
          <li>
            <Link to="/courses/add">Add Course</Link>
          </li>
          <li>
            <Link to="/lectures/schedule">Schedule Lecture</Link>
          </li>
        </ul>
      </nav>

      <div className="p-8">
        <Routes>
          <Route path="/" element={<AdminPanel />} />
          <Route path="/instructors" element={<InstructorList />} />
          <Route path="/courses/add" element={<AddCourse />} />
          <Route path="/lectures/schedule" element={<ScheduleLecture />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
