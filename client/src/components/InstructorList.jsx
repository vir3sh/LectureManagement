// src/components/InstructorList.js
import React, { useContext, useState, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";

const InstructorList = () => {
  const {
    instructors,
    addInstructor,
    updateInstructor,
    deleteInstructor,
    fetchInstructors,
  } = useContext(AdminContext);

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleEdit = (instructor) => {
    setEditId(instructor.id);
    setFormData({
      name: instructor.name,
      email: instructor.email,
      password: "",
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateInstructor(editId, { name: formData.name, email: formData.email });
    setEditId(null);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addInstructor(formData);
    if (addInstructor) {
      toast.success("instructor added");
    }
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Instructor List</h2>
      <form onSubmit={handleAdd} className="mb-4 flex flex-col">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 my-1"
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 my-1"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="border p-2 my-1"
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 mt-2 rounded"
        >
          Add Instructor
        </button>
      </form>
      <ul>
        {instructors.map((instructor) => (
          <li key={instructor.id} className="border p-2 my-2">
            {editId === instructor.id ? (
              <form onSubmit={handleUpdate} className="flex flex-col">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border p-2 my-1"
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border p-2 my-1"
                  placeholder="Email"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 mt-2 rounded"
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{instructor.name}</p>
                  <p>{instructor.email}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(instructor)}
                    className="bg-blue-500 text-white p-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteInstructor(instructor.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorList;
