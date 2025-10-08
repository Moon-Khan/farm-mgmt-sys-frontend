import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";
import { fetchPlotById, updatePlot } from "../services/plotsService";
import { fetchCrops } from "../services/cropService";
import { ChevronDown, ChevronUp } from 'lucide-react';

const EditPlotPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [crops, setCrops] = useState([]);
  const [loadingCrops, setLoadingCrops] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    acreage: "",
    caretaker_name: "",
    current_crop_id: "",
    status: "growing",
    planted_date: "",
    expected_harvest_date: "",
    location: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const [plotRes, cropsRes] = await Promise.all([
          fetchPlotById(id),
          fetchCrops()
        ]);

        console.log("===> cropsRes", cropsRes);

        if (plotRes?.success && plotRes?.data) {
          const plot = plotRes.data;
          setFormData({
            name: plot.name || "",
            acreage: plot.acreage || "",
            caretaker_name: plot.caretaker_name || "",
            current_crop_id: plot.current_crop_id || "",
            status: plot.status || "growing",
            planted_date: plot.planted_date ? plot.planted_date.split("T")[0] : "",
            expected_harvest_date: plot.expected_harvest_date ? plot.expected_harvest_date.split("T")[0] : "",
            location: plot.location || ""
          });
        }

        setCrops(cropsRes || []);
        
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
        setLoadingCrops(false);
      }
    };

    loadData();
  }, [id]);

  // Organize crops into categories for UI display
  const cropCategories = React.useMemo(() => {
    const categories = {
      majorCrops: {
        title: "Major Crops",
        titleUrdu: "اہم فصلیں",
        crops: []
      },
      pulsesLegumes: {
        title: "Pulses & Legumes",
        titleUrdu: "دالیں اور legumes",
        crops: []
      },
      oilseeds: {
        title: "Oilseeds",
        titleUrdu: "تیل کے بیج",
        crops: []
      },
      vegetables: {
        title: "Vegetables",
        titleUrdu: "سبزیاں",
        crops: []
      }
    };

    console.log("====> BEFORE CROPS:", crops);
    // Categorize crops based on their names
    crops.forEach(crop => {
      console.log("====> CROPS:", crop);
      const cropName = crop.name.toLowerCase();

      if (['wheat', 'rice', 'sugarcane', 'cotton', 'maize'].some(major => cropName.includes(major))) {
        categories.majorCrops.crops.push(crop);
      } else if (['moong', 'mash', 'masoor', 'gram', 'chickpea', 'lentil'].some(pulse => cropName.includes(pulse))) {
        categories.pulsesLegumes.crops.push(crop);
      } else if (['mustard', 'rapeseed', 'sunflower', 'sesame', 'til'].some(oilseed => cropName.includes(oilseed))) {
        categories.oilseeds.crops.push(crop);
      } else {
        categories.vegetables.crops.push(crop); // Default to vegetables
      }
    });

    console.log("Categorized crops:", categories);

    return categories;
  }, [crops]);

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

  const toggleCategory = (categoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const selectCrop = (cropId, cropName, categoryKey) => {
    setFormData(prev => ({
      ...prev,
      current_crop_id: cropId
    }));
  };

  // Get crop by ID from API data
  const getCropById = (id) => {
    return crops.find(crop => crop.id === parseInt(id));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Plot name is required";
    }

    if (!formData.acreage || parseFloat(formData.acreage) <= 0) {
      newErrors.acreage = "Valid acreage is required";
    }

    if (!formData.caretaker_name.trim()) {
      newErrors.caretaker_name = "Caretaker name is required";
    }

    if (!formData.current_crop_id) {
      newErrors.current_crop_id = "Please select a current crop";
    }

    if (!formData.planted_date) {
      newErrors.planted_date = "Planted date is required";
    }

    if (!formData.expected_harvest_date) {
      newErrors.expected_harvest_date = "Expected harvest date is required";
    }

    // Validate that harvest date is after planted date
    if (formData.planted_date && formData.expected_harvest_date) {
      const plantedDate = new Date(formData.planted_date);
      const harvestDate = new Date(formData.expected_harvest_date);
      if (harvestDate <= plantedDate) {
        newErrors.expected_harvest_date = "Harvest date must be after planted date";
      }
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
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
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
      <div className="p-4 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="mt-4">
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
            </select>
          </div>
        </div>

        {/* Assignment */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Assignment</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caretaker Name *
              </label>
              <input
                type="text"
                name="caretaker_name"
                value={formData.caretaker_name}
                onChange={handleInputChange}
                placeholder="Enter caretaker name"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.caretaker_name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.caretaker_name && (
                <p className="text-red-500 text-sm mt-1">{errors.caretaker_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Crop *
              </label>

              {loadingCrops ? (
                <div className="border border-gray-300 rounded-lg bg-white p-4 text-center">
                  <div className="text-gray-500">Loading crops...</div>
                </div>
              ) : crops.length === 0 ? (
                <div className="border border-gray-300 rounded-lg bg-white p-4 text-center">
                  <div className="text-red-500">No crops available</div>
                </div>
              ) : (
                /* Categorized Crop Selection */
                <div className={`border rounded-lg bg-white max-h-64 overflow-y-auto ${
                  errors.current_crop_id ? 'border-red-500' : 'border-gray-300'
                }`}>
                  {Object.entries(cropCategories).map(([categoryKey, category]) => (
                    <div key={categoryKey} className="border-b border-gray-200 last:border-b-0">
                      {/* Category Header */}
                      <button
                        type="button"
                        onClick={() => toggleCategory(categoryKey)}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800 text-sm">{category.title}</span>
                          <span className="text-xs text-gray-500">({category.titleUrdu})</span>
                        </div>
                        {expandedCategories[categoryKey] ?
                          <ChevronUp size={16} className="text-gray-500" /> :
                          <ChevronDown size={16} className="text-gray-500" />
                        }
                      </button>

                      {/* Category Crops */}
                      {expandedCategories[categoryKey] && (
                        <div className="px-3 pb-3 space-y-2">
                          {category.crops.map((crop) => (
                            <label
                              key={crop.id}
                              className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                                formData.current_crop_id === crop.id ? 'bg-green-50 border border-green-200' : ''
                              }`}
                            >
                              <input
                                type="radio"
                                name="current_crop_id"
                                value={crop.id}
                                checked={formData.current_crop_id === crop.id}
                                onChange={() => selectCrop(crop.id, crop.name, categoryKey)}
                                className="mt-1 text-green-600"
                              />
                              <div className="flex-1">
                                <div className="font-medium text-gray-800 text-sm">
                                  {crop.name} ({crop.name_urdu})
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {errors.current_crop_id && (
                <p className="text-red-500 text-sm mt-1">{errors.current_crop_id}</p>
              )}

              {/* Selected Crop Display */}
              {formData.current_crop_id && (
                <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm text-green-700">
                      Selected: {getCropById(formData.current_crop_id)?.name} ({getCropById(formData.current_crop_id)?.name_urdu})
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline Section - Made more prominent */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Timeline</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Planted Date *
              </label>
              <input
                type="date"
                name="planted_date"
                value={formData.planted_date}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.planted_date ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.planted_date && (
                <p className="text-red-500 text-sm mt-1">{errors.planted_date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Harvest Date *
              </label>
              <input
                type="date"
                name="expected_harvest_date"
                value={formData.expected_harvest_date}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.expected_harvest_date ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.expected_harvest_date && (
                <p className="text-red-500 text-sm mt-1">{errors.expected_harvest_date}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlotPage;
