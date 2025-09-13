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

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching caretakers and crops...");
        const cropsData = await fetchCrops();
        const caretakersData = await fetchCaretakers();
        
        console.log("Crops data:", cropsData);
        console.log("Caretakers data:", caretakersData);
        
        setCrops(cropsData?.data || []);
        setCaretakers(caretakersData?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/dashboard')}
          className="mr-3 text-gray-600 hover:text-gray-800"
        >
          ←
        </button>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Add New Plot</h1>
          <p className="text-sm text-gray-500">Create a new plot for your farm</p>
        </div>
      </div>

      {successMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
          
          {/* Plot Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Plot Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="North Field, South Valley, etc"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Acreage */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Acreage *</label>
            <input
              type="number"
              step="0.1"
              name="acreage"
              value={formData.acreage}
              onChange={handleChange}
              placeholder="25.5"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Location */}
          
        </div>

        {/* Assignment Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Assignment</h2>
          
          {/* Assign Caretaker */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign Caretaker *</label>
            <select
              name="caretaker_id"
              value={formData.caretaker_id}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
            >
              <option value="">Select a caretaker</option>
              {caretakers.map((ct) => (
                <option key={ct.id} value={ct.id}>{ct.name}</option>
              ))}
            </select>
          </div>

          {/* Current Crop */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Crop</label>
            <select
              name="current_crop_id"
              value={formData.current_crop_id}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
            >
              <option value="">Select crop type</option>
              {crops.map((crop) => (
                <option key={crop.id} value={crop.id}>{crop.name}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
            >
              <option value="planting">Planting</option>
              <option value="growing">Growing</option>
              <option value="harvested">Harvested</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg transition font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition font-medium disabled:opacity-50"
          >
            {loading ? "Adding Plot..." : "Add Plot"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlot;
