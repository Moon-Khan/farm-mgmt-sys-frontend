import React, { useState, useEffect } from "react";
import { createPlot } from "../services/plotsService";
import { useNavigate } from "react-router-dom";
import { fetchCrops } from "../services/cropService";
import { fetchCaretakers } from "../services/caretakersService";


const AddPlot = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    acreage: "",
    location: "",
    caretaker_id: "",
    current_crop_id: "",
    status: "planting",
  });

  const [caretakers, setCaretakers] = useState([]);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // TODO: Fetch caretakers + crops from API (services to be made)
  useEffect(() => {
    async function fetchData() {
      // Example placeholder data
      const cropsData = await fetchCrops();
      const caretakersData = await fetchCaretakers();
      setCrops(cropsData?.data || []);
      setCaretakers(caretakersData?.data || []);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPlot(formData);
      setSuccessMsg("✅ Plot added successfully!");
      setFormData({
        name: "",
        acreage: "",
        location: "",
        caretaker_id: "",
        current_crop_id: "",
        status: "planting",
      });
      navigate('/dashboard');
    } catch (err) {
      console.error("Error creating plot:", err);
      alert("Failed to create plot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-[#fcfcf7] min-h-screen">
      <h1 className="text-2xl font-bold text-green-700 mb-4">➕ Add New Plot</h1>

      {successMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Plot Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Plot Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="North Field, South Valley..."
            required
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Acreage */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Acreage *</label>
          <input
            type="number"
            name="acreage"
            value={formData.acreage}
            onChange={handleChange}
            placeholder="25.5"
            required
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Location */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="GPS coordinates or description"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-600"
          />
        </div> */}

        {/* Caretaker */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Assign Caretaker *</label>
          <select
            name="caretaker_id"
            value={formData.caretaker_id}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-600"
          >
            <option value="">Select caretaker</option>
            {caretakers.map((ct) => (
              <option key={ct.id} value={ct.id}>{ct.name}</option>
            ))}
          </select>
        </div>

        {/* Current Crop */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Crop</label>
          <select
            name="current_crop_id"
            value={formData.current_crop_id}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-600"
          >
            <option value="">Select crop</option>
            {crops.map((crop) => (
              <option key={crop.id} value={crop.id}>{crop.name}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-600"
          >
            <option value="planting">Planting</option>
            <option value="growing">Growing</option>
            <option value="harvested">Harvested</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
        >
          {loading ? "Saving..." : "Save Plot"}
        </button>
      </form>
    </div>
  );
};

export default AddPlot;
