import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { fetchPlotById } from "../services/plotsService";
import { createPesticide } from "../services/pesticideService";

const AddPesticidePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    type: "insecticide",
    quantity: "",
    application_date: new Date().toISOString().split('T')[0],
    target_pest: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});

  const pesticideTypes = [
    { value: "insecticide", label: "Insecticide" },
    { value: "herbicide", label: "Herbicide" },
    { value: "fungicide", label: "Fungicide" },
    { value: "organic", label: "Organic" },
    { value: "biological", label: "Biological" }
  ];

  useEffect(() => {
    const loadPlot = async () => {
      try {
        const plotRes = await fetchPlotById(id);
        if (plotRes?.success && plotRes?.data) {
          setPlot(plotRes.data);
        }
      } catch (err) {
        console.error("Error loading plot:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPlot();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
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
      newErrors.name = "Pesticide name is required";
    }
    
    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    }
    
    if (!formData.application_date) {
      newErrors.application_date = "Application date is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setSaving(true);
    try {
      const pesticideData = {
        plot_id: parseInt(id),
        name: formData.name,
        type: formData.type,
        quantity: formData.quantity,
        application_date: formData.application_date,
        target_pest: formData.target_pest,
        notes: formData.notes
      };

      const result = await createPesticide(pesticideData);

      if (result?.success) {
        navigate(`/plots/${id}`);
      } else {
        alert("Failed to add pesticide record. Please try again.");
      }
    } catch (err) {
      console.error("Error adding pesticide:", err);
      alert("Failed to add pesticide record. Please try again.");
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Add Pesticide Record</h1>
            <p className="text-sm text-gray-500">Record pesticide application for {plot?.name}</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="flex justify-center p-6">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6">
          <form className="flex flex-col gap-4">
            {/* Pesticide Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pesticide Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., Roundup, Neem Oil, etc."
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {pesticideTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Pest */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Pest/Disease
              </label>
              <input
                type="text"
                name="target_pest"
                value={formData.target_pest}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Aphids, Weeds, Fungal infection"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.quantity ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., 2 liters, 500ml, 1 kg"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
              )}
            </div>

            {/* Application Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Date *
              </label>
              <input
                type="date"
                name="application_date"
                value={formData.application_date}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.application_date ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.application_date && (
                <p className="text-red-500 text-sm mt-1">{errors.application_date}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Additional notes about application method, weather conditions, effectiveness, etc."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {saving ? "Adding Record..." : "Add Pesticide Record"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPesticidePage;
