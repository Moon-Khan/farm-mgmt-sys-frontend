import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { fetchPlotById } from "../services/plotsService";
import { createIrrigation } from "../services/irrigationService";

const AddIrrigationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    method: "sprinkler",
    quantity: "",
    duration: "",
    date: new Date().toISOString().split('T')[0],
    notes: ""
  });

  const [errors, setErrors] = useState({});

  const irrigationMethods = [
    { value: "sprinkler", label: "Sprinkler" },
    { value: "drip", label: "Drip Irrigation" },
    { value: "flood", label: "Flood Irrigation" },
    { value: "manual", label: "Manual Watering" },
    { value: "pivot", label: "Center Pivot" }
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
    
    if (!formData.quantity.trim()) {
      newErrors.quantity = "Water quantity is required";
    }
    
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setSaving(true);
    try {
      const irrigationData = {
        plot_id: parseInt(id),
        method: formData.method,
        quantity: formData.quantity,
        duration: formData.duration,
        date: formData.date,
        notes: formData.notes
      };

      const result = await createIrrigation(irrigationData);

      if (result?.success) {
        navigate(`/plots/${id}`);
      } else {
        alert("Failed to add irrigation record. Please try again.");
      }
    } catch (err) {
      console.error("Error adding irrigation:", err);
      alert("Failed to add irrigation record. Please try again.");
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
            <h1 className="text-lg font-semibold text-gray-800">Add Irrigation Record</h1>
            <p className="text-sm text-gray-500">Record irrigation activity for {plot?.name}</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="flex justify-center p-6">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6">
          <form className="flex flex-col gap-4">
            {/* Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Irrigation Method
              </label>
              <select
                name="method"
                value={formData.method}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {irrigationMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water Quantity *
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.quantity ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., 1000 liters, 50 gallons, 2 inches"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 2 hours, 30 minutes"
              />
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
                placeholder="Additional notes about weather conditions, soil moisture, etc."
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
                {saving ? "Adding Record..." : "Add Irrigation Record"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddIrrigationPage;
