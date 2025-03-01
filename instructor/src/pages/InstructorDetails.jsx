import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InstructorDetails = () => {
  const { instructorId } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/instructors/${instructorId}`
        );
        setInstructor(response.data);
      } catch (error) {
        console.error("Error fetching instructor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [instructorId]);

  return (
    <div className="p-6 border rounded shadow bg-white mb-6">
      <h2 className="text-2xl font-bold mb-4">Instructor Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : instructor ? (
        <div>
          <p>
            <strong>Name:</strong> {instructor.name}
          </p>
          <p>
            <strong>Email:</strong> {instructor.email}
          </p>
        </div>
      ) : (
        <p>Instructor details not found.</p>
      )}
    </div>
  );
};

export default InstructorDetails;
