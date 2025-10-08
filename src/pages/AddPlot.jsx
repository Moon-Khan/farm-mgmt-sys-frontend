import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { fetchCrops } from '../services/cropService';
import { createPlot } from '../services/plotsService';

const AddPlot = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    acreage: "",
    location: "",
    caretaker_name: "",
    current_crop_id: "",
    status: "planting",
    planted_date: "",
    expected_harvest_date: "",
  });

  const [loadingCrops, setLoadingCrops] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState({});

  // Fetch crops from API on component mount
  useEffect(() => {
    fetchCropsFromAPI();
  }, []);

  const fetchCropsFromAPI = async () => {
    try {
      setLoadingCrops(true);
      console.log("🔄 Starting to fetch crops...");

      const response = await fetchCrops();
      console.log("📥 Raw API response:", response);

      // Extract data from API response
      const cropsData = response || [];
      console.log("📊 Processed crops data:", cropsData);
      console.log("🔢 Is array?", Array.isArray(cropsData));
      console.log("📏 Length:", cropsData.length);

      if (Array.isArray(cropsData)) {
        setCrops(cropsData);
        console.log("✅ Crops loaded from API:", cropsData.length, "crops");
      } else {
        console.error("❌ Invalid crops data format:", response);
        setCrops([]);
      }
    } catch (error) {
      console.error("❌ Failed to fetch crops:", error);
      console.error("❌ Error details:", error.message);
      setCrops([]);
    } finally {
      setLoadingCrops(false);
    }
  };

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

    // Categorize crops based on their names
    crops.forEach(crop => {
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

    return categories;
  }, [crops]);

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
    setSelectedCategory(categoryKey);
  };

  // Get crop by ID from API data
  const getCropById = (id) => {
    return crops.find(crop => crop.id === parseInt(id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error or show error message
      const firstErrorElement = document.querySelector('[class*="border-red-500"]');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        caretaker_name: formData.caretaker_name, // Send caretaker_name as expected by backend
      };

      // Remove caretaker_id since we're using caretaker_name
      delete submitData.caretaker_id;

      await createPlot(submitData);
      setSuccessMsg("✅ Plot added successfully!");
      setFormData({
        name: "",
        acreage: "",
        location: "",
        caretaker_name: "",
        current_crop_id: "",
        status: "planting",
        planted_date: "",
        expected_harvest_date: "",
      });
      setErrors({});
      navigate('/dashboard');
    } catch (err) {
      console.error("Error creating plot:", err);
      setErrors({ submit: "Failed to create plot. Please check your selections and try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ←
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Add New Plot</h1>
              <p className="text-sm text-gray-500">Create a new plot for your farm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="mx-4 mt-4 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg flex items-center gap-2">
          <span>✅</span>
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 space-y-6 pb-24">
        {/* Basic Information Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">1</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Basic Information</h2>
          </div>

          {/* Plot Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Plot Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="North Field, South Valley, etc"
              required
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Acreage */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Acreage *</label>
            <input
              type="number"
              step="0.1"
              name="acreage"
              value={formData.acreage}
              onChange={handleChange}
              placeholder="25.5"
              required
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                errors.acreage ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.acreage && (
              <p className="text-red-500 text-sm mt-1">{errors.acreage}</p>
            )}
          </div>
        </div>

        {/* Assignment Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-semibold text-sm">2</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Assignment</h2>
          </div>

          {/* Assign Caretaker */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Caretaker Name *</label>
            <input
              type="text"
              name="caretaker_name"
              value={formData.caretaker_name}
              onChange={handleChange}
              placeholder="Enter caretaker name"
              required
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                errors.caretaker_name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>

          {/* Current Crop */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Crop *</label>

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
              <div className={`border rounded-lg bg-white max-h-96 overflow-y-auto ${
                errors.current_crop_id ? 'border-red-500' : 'border-gray-300'
              }`}>
                {Object.entries(cropCategories).map(([categoryKey, category]) => (
                  <div key={categoryKey} className="border-b border-gray-200 last:border-b-0">
                    {/* Category Header */}
                    <button
                      type="button"
                      onClick={() => toggleCategory(categoryKey)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{category.title}</span>
                        <span className="text-sm text-gray-500">({category.titleUrdu})</span>
                      </div>
                      {expandedCategories[categoryKey] ?
                        <ChevronUp size={16} className="text-gray-500" /> :
                        <ChevronDown size={16} className="text-gray-500" />
                      }
                    </button>

                    {/* Category Crops */}
                    {expandedCategories[categoryKey] && (
                      <div className="px-4 pb-4 space-y-3">
                        {category.crops.map((crop) => (
                          <label
                            key={crop.id}
                            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
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
                              <div className="font-medium text-gray-800">
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
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-green-700">
                    Selected: {getCropById(formData.current_crop_id)?.name} ({getCropById(formData.current_crop_id)?.name_urdu})
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors"
            >
              <option value="planting">Planting</option>
              <option value="growing">Growing</option>
              <option value="harvested">Harvested</option>
            </select>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 font-semibold text-sm">3</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Timeline</h2>
          </div>

          {/* Planted Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Planted Date *</label>
            <input
              type="date"
              name="planted_date"
              value={formData.planted_date}
              onChange={handleChange}
              required
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                errors.planted_date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.planted_date && (
              <p className="text-red-500 text-sm mt-1">{errors.planted_date}</p>
            )}
          </div>

          {/* Expected Harvest Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Expected Harvest Date *</label>
            <input
              type="date"
              name="expected_harvest_date"
              value={formData.expected_harvest_date}
              onChange={handleChange}
              required
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                errors.expected_harvest_date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.expected_harvest_date && (
              <p className="text-red-500 text-sm mt-1">{errors.expected_harvest_date}</p>
            )}
          </div>
        </div>

        {/* Action Buttons - Inside form but positioned at bottom */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4 -mb-4 mt-6">
          <div className="flex space-x-3 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding Plot..." : "Add Plot"}
            </button>
          </div>
        </div>
      </form>

      {/* Bottom spacer for fixed button */}
      <div className="h-20"></div>
    </div>
  );
};

export default AddPlot;
