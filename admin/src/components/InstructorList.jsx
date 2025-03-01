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
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleEdit = (instructor) => {
    setEditId(instructor._id);
    setEditFormData({
      name: instructor.name,
      email: instructor.email,
      password: "",
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateInstructor(editId, editFormData);
    toast.success("Instructor updated");
    setEditId(null);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addInstructor(addFormData);
    toast.success("Instructor added");
    setAddFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Instructor Management
      </h2>

      {/* Add Instructor Form */}
      <form onSubmit={handleAdd} className="mb-6 space-y-3">
        <input
          type="text"
          value={addFormData.name}
          onChange={(e) =>
            setAddFormData({ ...addFormData, name: e.target.value })
          }
          className="border p-2 rounded w-full"
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={addFormData.email}
          onChange={(e) =>
            setAddFormData({ ...addFormData, email: e.target.value })
          }
          className="border p-2 rounded w-full"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={addFormData.password}
          onChange={(e) =>
            setAddFormData({ ...addFormData, password: e.target.value })
          }
          className="border p-2 rounded w-full"
          placeholder="Password"
          required
        />
        <button className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600">
          Add Instructor
        </button>
      </form>

      {/* Instructor List */}
      <ul className="space-y-4">
        {instructors.map((instructor) => (
          <li key={instructor._id} className="border p-4 rounded-lg shadow">
            {editId === instructor._id ? (
              <form onSubmit={handleUpdate} className="space-y-2">
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, email: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  value={editFormData.password}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      password: e.target.value,
                    })
                  }
                  className="border p-2 rounded w-full"
                  placeholder="New Password (optional)"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{instructor.name}</p>
                  <p className="text-gray-600">{instructor.email}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(instructor)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteInstructor(instructor._id);
                      toast.error("Instructor deleted");
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
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
