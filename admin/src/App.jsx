import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import InstructorList from "./components/InstructorList";
import AddCourse from "./components/AddCourse";
import ScheduleLecture from "./components/ScheduleLecture";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";

const ProtectedRoute = ({ element }) => {
  const { token } = useContext(AdminContext);
  return token ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <>
      <Router>
        <ToastContainer />

        <div className="p-8">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoute element={<AdminPanel />} />}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/instructors"
              element={<ProtectedRoute element={<InstructorList />} />}
            />
            <Route
              path="/courses/add"
              element={<ProtectedRoute element={<AddCourse />} />}
            />
            <Route
              path="/lectures/schedule"
              element={<ProtectedRoute element={<ScheduleLecture />} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
