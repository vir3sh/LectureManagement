import React, { useState } from "react";

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    name: "",
    level: "",
    description: "",
    date: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", courseData.name);
      formData.append("level", courseData.level);
      formData.append("description", courseData.description);
      formData.append("date", courseData.date);
      formData.append("image", courseData.image);
      formData.append("batches", JSON.stringify(courseData.batches));

      const response = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add course");

      alert("Course added successfully!");
      setCourseData({
        name: "",
        level: "",
        description: "",
        date: "",
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
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Course Name</label>
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
          <label className="block text-gray-700">Level</label>
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
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleCourseChange}
            className="w-full border p-2 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Course Date</label>
          <input
            type="date"
            name="date"
            value={courseData.date}
            onChange={handleCourseChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
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
          <h3 className="text-lg font-semibold mb-2">Add Batch</h3>
          <div>
            <label className="block text-gray-700">Batch Name</label>
            <select
              value={batchData.batchName}
              onChange={(e) =>
                setBatchData({ ...batchData, batchName: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Batch</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="night">Night</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Batch Date</label>
            <input
              type="date"
              value={batchData.date}
              onChange={(e) =>
                setBatchData({ ...batchData, date: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button
            type="button"
            onClick={addBatch}
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            Add Batch
          </button>
          {courseData.batches.length > 0 && (
            <ul className="mt-2">
              {courseData.batches.map((batch, idx) => (
                <li key={idx} className="text-gray-600">
                  {batch.batchName} on {batch.date}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
