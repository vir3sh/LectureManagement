import React, { useState } from "react";

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    name: "",
    level: "",
    description: "",
    image: null,
    batches: [],
  });
  const [batchData, setBatchData] = useState({ batchName: "", date: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleCourseChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseData({ ...courseData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleBatchChange = (e) => {
    setBatchData({ ...batchData, [e.target.name]: e.target.value });
  };

  const addBatch = () => {
    if (!batchData.batchName || !batchData.date) {
      setError("Please select a batch name and date.");
      return;
    }

    setCourseData({
      ...courseData,
      batches: [...courseData.batches, batchData],
    });

    setBatchData({ batchName: "", date: "" });
    setError("");
  };

  const removeBatch = (index) => {
    const updatedBatches = [...courseData.batches];
    updatedBatches.splice(index, 1);
    setCourseData({ ...courseData, batches: updatedBatches });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (courseData.batches.length === 0) {
      setError("Please add at least one batch.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", courseData.name);
      formData.append("level", courseData.level);
      formData.append("description", courseData.description);

      if (courseData.image) {
        formData.append("image", courseData.image);
      }

      formData.append("batches", JSON.stringify(courseData.batches));

      const response = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add course");
      }

      alert("Course added successfully!");
      setCourseData({
        name: "",
        level: "",
        description: "",
        image: null,
        batches: [],
      });
      setImagePreview(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Course</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Course Name</label>
          <input
            type="text"
            name="name"
            value={courseData.name}
            onChange={handleCourseChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Level</label>
          <input
            type="text"
            name="level"
            value={courseData.level}
            onChange={handleCourseChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleCourseChange}
            className="w-full border p-2 rounded"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
            accept="image/*"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-full h-40 object-cover rounded"
            />
          )}
        </div>

        <div className="border p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Course Batches</h3>

          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Batch Name</label>
              <select
                name="batchName"
                value={batchData.batchName}
                onChange={handleBatchChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Batch</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="night">Night</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Batch Date</label>
              <input
                type="date"
                name="date"
                value={batchData.date}
                onChange={handleBatchChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={addBatch}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
              >
                Add
              </button>
            </div>
          </div>

          {courseData.batches.length > 0 && (
            <div className="mt-2">
              <h4 className="font-medium mb-1">Added Batches:</h4>
              <ul className="space-y-1">
                {courseData.batches.map((batch, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded"
                  >
                    <span className="capitalize">
                      {batch.batchName} batch on{" "}
                      {new Date(batch.date).toLocaleDateString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeBatch(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded font-medium"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
