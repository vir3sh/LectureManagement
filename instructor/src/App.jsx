import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import InstructorPanel from "./pages/InstructorPanel";
import Login from "./pages/Login";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import React from "react";
import Navbar from "./components/Navbar";
// Private Route Component to protect pages
const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  // console.log("Checking user in PrivateRoute:", user); // Debugging

  if (user === null) {
    return <p>Loading...</p>; // Prevent redirection until state updates
  }

  return user?.instructorId ? element : <Navigate to="/login" />;
};

const handleLogout = () => {
  localStorage.removeItem("token"); // Example: Remove JWT
  window.location.href = "/login"; // Redirect to login page
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/instructor/:instructorId"
            element={<PrivateRoute element={<InstructorPanel />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
