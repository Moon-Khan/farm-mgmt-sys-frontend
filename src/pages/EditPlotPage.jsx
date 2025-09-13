import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";
import { fetchPlotById, updatePlot } from "../services/plotsService";
import { fetchCaretakers } from "../services/caretakersService";
import { fetchCrops } from "../services/cropService";

const EditPlotPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [caretakers, setCaretakers] = useState([]);
  const [crops, setCrops] = useState([]);
  
  const [formData, setFormData] = useState({
    name: "",
    acreage: "",
    caretaker_id: "",
    current_crop_id: "",
    status: "growing"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const [plotRes, caretakersRes, cropsRes] = await Promise.all([
          fetchPlotById(id),
          fetchCaretakers(),
          fetchCrops()
        ]);

        if (plotRes?.success && plotRes?.data) {
          const plot = plotRes.data;
          setFormData({
            name: plot.name || "",
            acreage: plot.acreage || "",
            caretaker_id: plot.caretaker_id || "",
            current_crop_id: plot.current_crop_id || "",
            status: plot.status || "growing"
          });
        }

        if (caretakersRes?.success) {
          setCaretakers(caretakersRes.data || []);
        }

        if (cropsRes?.success) {
          setCrops(cropsRes.data || []);
        }
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Plot name is required";
    }
    
    if (!formData.acreage || parseFloat(formData.acreage) <= 0) {
      newErrors.acreage = "Valid acreage is required";
    }
    
    if (!formData.caretaker_id) {
      newErrors.caretaker_id = "Caretaker is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setSaving(true);
    try {
      const result = await updatePlot(id, formData);
      if (result?.success) {
        navigate(`/plots/${id}`);
      } else {
        alert("Failed to update plot. Please try again.");
      }
    } catch (err) {
      console.error("Error updating plot:", err);
      alert("Failed to update plot. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Edit Plot Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              <Save size={16} />
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-4 space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plot Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter plot name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Acreage *
              </label>
              <input
                type="number"
                name="acreage"
                value={formData.acreage}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.acreage ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter acreage"
              />
              {errors.acreage && (
                <p className="text-red-500 text-sm mt-1">{errors.acreage}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="growing">Growing</option>
                <option value="planting">Planting</option>
                <option value="harvested">Harvested</option>
                <option value="fallow">Fallow</option>
              </select>
            </div>
          </div>
        </div>

        {/* Assignment */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Assignment</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caretaker *
              </label>
              <select
                name="caretaker_id"
                value={formData.caretaker_id}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.caretaker_id ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a caretaker</option>
                {caretakers.map((caretaker) => (
                  <option key={caretaker.id} value={caretaker.id}>
                    {caretaker.name}
                  </option>
                ))}
              </select>
              {errors.caretaker_id && (
                <p className="text-red-500 text-sm mt-1">{errors.caretaker_id}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Crop
              </label>
              <select
                name="current_crop_id"
                value={formData.current_crop_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">No crop assigned</option>
                {crops.map((crop) => (
                  <option key={crop.id} value={crop.id}>
                    {crop.name} - {crop.variety}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlotPage;
