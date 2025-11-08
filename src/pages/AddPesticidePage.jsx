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
    pesticide_type: "",
    quantity: "",
    date: new Date().toISOString().split('T')[0],
    cost: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const plotRes = await fetchPlotById(id);

        if (plotRes?.success && plotRes?.data) {
          setPlot(plotRes.data);
        }
      } catch (err) {
        console.error("Error loading plot data:", err);
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
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(parseFloat(formData.quantity))) {
      newErrors.quantity = "Quantity must be a valid number";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.cost.trim()) {
      newErrors.cost = "Cost is required";
    } else if (isNaN(parseFloat(formData.cost))) {
      newErrors.cost = "Cost must be a valid number";
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
        pesticide_type: formData.pesticide_type,
        quantity: parseFloat(formData.quantity),
        date: new Date(formData.date), // Convert string to Date object
        cost: parseFloat(formData.cost)
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
            {/* Pesticide Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pesticide Type *</label>
              <input
                type="text"
                name="pesticide_type"
                value={formData.pesticide_type}
                onChange={handleInputChange}
                placeholder="e.g., Glyphosate, Neem Oil, Copper Fungicide"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
              {errors.pesticide_type && (
                <p className="mt-1 text-sm text-red-600">{errors.pesticide_type}</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (kg/liters) *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.quantity ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., 2.5"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.date ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            {/* Cost */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost ($) *
              </label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.cost ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0.00"
              />
              {errors.cost && (
                <p className="text-red-500 text-sm mt-1">{errors.cost}</p>
              )}
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
