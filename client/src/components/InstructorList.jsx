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
  });

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleEdit = (instructor) => {
    setEditId(instructor._id);
    setEditFormData({
      name: instructor.name,
      email: instructor.email,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateInstructor(editId, editFormData);
    setEditId(null);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addInstructor(addFormData);
    toast.success("Instructor added");
    setAddFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="p-4 bg-white shadow rounded pt-10">
      <h2 className="text-xl font-bold mb-4">Instructor List</h2>

      {/* Add Instructor Form */}
      <form onSubmit={handleAdd} className="mb-4 flex flex-col">
        <input
          type="text"
          value={addFormData.name}
          onChange={(e) =>
            setAddFormData({ ...addFormData, name: e.target.value })
          }
          className="border p-2 my-1"
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={addFormData.email}
          onChange={(e) =>
            setAddFormData({ ...addFormData, email: e.target.value })
          }
          className="border p-2 my-1"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={addFormData.password}
          onChange={(e) =>
            setAddFormData({ ...addFormData, password: e.target.value })
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
          <li key={instructor._id} className="border p-2 my-2">
            {editId === instructor._id ? (
              <form onSubmit={handleUpdate} className="flex flex-col">
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  className="border p-2 my-1"
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, email: e.target.value })
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
                    onClick={() => deleteInstructor(instructor._id)}
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
