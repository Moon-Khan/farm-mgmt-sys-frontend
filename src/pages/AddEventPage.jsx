import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { fetchPlotById } from "../services/plotsService";
import { createLifecycle } from "../services/lifecycleService";
import { getLifecycleEventOptions } from "../constants/lifecycleEvents";

const AddEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    event_type: "",
    title: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    notes: "",
    yield_amount: "",
    yield_unit: "kg"
  });

  const [errors, setErrors] = useState({});

  const eventOptions = getLifecycleEventOptions();

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

    // Handle event type change specially to reset yield fields
    if (name === 'event_type') {
      const newFormData = { ...formData, [name]: value };

      // Reset yield fields when changing from harvest events
      if ((formData.event_type === 'HARVESTING' || formData.event_type === 'POST_HARVEST') &&
          (value !== 'HARVESTING' && value !== 'POST_HARVEST')) {
        newFormData.yield_amount = "";
        newFormData.yield_unit = "kg";
      }

      setFormData(newFormData);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.event_type) {
      newErrors.event_type = "Event type is required";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    // Validate yield fields only for harvest events
    if ((formData.event_type === 'HARVESTING' || formData.event_type === 'POST_HARVEST')) {
      if (!formData.yield_amount || formData.yield_amount <= 0) {
        newErrors.yield_amount = "Yield amount is required for harvest events";
      }
      if (!formData.yield_unit) {
        newErrors.yield_unit = "Yield unit is required for harvest events";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const lifecycleData = {
        plot_id: parseInt(id),
        crop_id: plot?.current_crop_id || null,
        event_type: formData.event_type,
        title: formData.title,
        description: formData.description,
        date: formData.date,
        notes: formData.notes,
        yield_amount: formData.yield_amount ? parseFloat(formData.yield_amount) : null,
        yield_unit: formData.yield_unit
      };

      const result = await createLifecycle(lifecycleData);

      if (result?.success) {
        navigate(`/plots/${id}/timeline`);
      } else {
        alert("Failed to add event. Please try again.");
      }
    } catch (err) {
      console.error("Error adding event:", err);
      alert("Failed to add event. Please try again.");
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
            <h1 className="text-lg font-semibold text-gray-800">Add Lifecycle Event</h1>
            <p className="text-sm text-gray-500">Record a new activity in your crop's lifecycle</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="flex justify-center p-6">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6">
          <form className="flex flex-col gap-4">
            {/* Event Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type *
              </label>
              <select
                name="event_type"
                value={formData.event_type}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.event_type ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Event Type</option>
                {eventOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.event_type && (
                <p className="text-red-500 text-sm mt-1">{errors.event_type}</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter event description"
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
                placeholder="Additional notes (optional)"
              />
            </div>

            {/* Yield Information - Only show for harvest-related events */}
            {(formData.event_type === 'HARVESTING' || formData.event_type === 'POST_HARVEST') && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-sm font-medium text-green-800 mb-3">Harvest Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yield Amount *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="yield_amount"
                      value={formData.yield_amount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0.0"
                      required={formData.event_type === 'HARVESTING' || formData.event_type === 'POST_HARVEST'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yield Unit *
                    </label>
                    <select
                      name="yield_unit"
                      value={formData.yield_unit}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required={formData.event_type === 'HARVESTING' || formData.event_type === 'POST_HARVEST'}
                    >
                      <option value="kg">Kilograms (kg)</option>
                      <option value="tons">Tons</option>
                      <option value="quintals">Quintals</option>
                      <option value="lbs">Pounds (lbs)</option>
                      <option value="bushels">Bushels</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

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
                {saving ? "Adding Event..." : "Add Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEventPage;
