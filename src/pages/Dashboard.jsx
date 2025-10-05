import React, { useEffect, useState } from "react";
import SummaryCard from "../components/cards/SummaryCard";
import WeatherCard from "../components/cards/WeatherCard";
import PlotCard from "../components/cards/PlotCard";
import { useDashboardData } from "../hooks/useDashboardData";
import { LocationIcon, PlantIcon, ThermometerIcon, RainIcon } from "../components/icons/ProfessionalIcons";
import { useNavigate } from "react-router-dom";

// Intelligent next task calculation based on plot state
const calculateNextTask = (plot) => {
  const { status, current_crop, planted_date } = plot;

  // Calculate days since planting
  const daysSincePlanted = planted_date
    ? Math.floor((new Date() - new Date(planted_date)) / (1000 * 60 * 60 * 24))
    : 0;

  // Status-based task logic with time progression
  switch (status) {
    case 'planting':
      if (daysSincePlanted <= 2) return "Water seedlings daily";
      if (daysSincePlanted <= 5) return "Monitor germination closely";
      if (daysSincePlanted <= 10) return "Thin overcrowded seedlings";
      return "Harden off transplants";

    case 'growing':
      // Early growth stage
      if (daysSincePlanted <= 7) return "Apply balanced fertilizer";
      if (daysSincePlanted <= 14) return "Mulch to retain moisture";
      if (daysSincePlanted <= 21) return "Check for early pests";

      // Mid growth stage
      if (daysSincePlanted <= 35) return "Side-dress with nitrogen";
      if (daysSincePlanted <= 45) return "Monitor for nutrient deficiencies";

      // Late growth stage
      if (daysSincePlanted <= 60) return "Reduce watering frequency";
      if (daysSincePlanted <= 75) return "Monitor fruit/flower development";

      return "Prepare harvesting equipment";

    case 'harvested':
      return "Test soil nutrients for next crop";

    case 'ready':
      return "Schedule harvest within 3 days";

    default:
      // Crop-specific intelligent tasks
      const cropName = current_crop?.name?.toLowerCase() || '';

      if (cropName.includes('wheat')) {
        if (daysSincePlanted <= 15) return "Monitor tiller development";
        if (daysSincePlanted <= 40) return "Scout for stripe rust";
        if (daysSincePlanted <= 70) return "Check grain fill progress";
        return "Prepare combine harvester";
      }

      if (cropName.includes('corn')) {
        if (daysSincePlanted <= 12) return "Check plant establishment";
        if (daysSincePlanted <= 35) return "Monitor ear initiation";
        if (daysSincePlanted <= 65) return "Assess kernel development";
        return "Schedule corn harvest";
      }

      if (cropName.includes('tomato')) {
        if (daysSincePlanted <= 20) return "Prune lower leaves weekly";
        if (daysSincePlanted <= 45) return "Stake heavy fruit clusters";
        if (daysSincePlanted <= 70) return "Monitor calcium deficiency";
        return "Begin harvest preparation";
      }

      if (cropName.includes('rice')) {
        if (daysSincePlanted <= 10) return "Maintain water depth";
        if (daysSincePlanted <= 30) return "Control weed competition";
        return "Monitor panicle development";
      }

      // Generic fallback with urgency indicators
      if (daysSincePlanted <= 7) return "Monitor daily";
      if (daysSincePlanted <= 30) return "Weekly maintenance check";
      return "Monthly growth assessment";
  }
};

const Dashboard = () => {


  const navigate = useNavigate();
  const { 
    plots, 
    weather, 
    loading, 
    error, 
    pagination, 
    refreshData, 
    filterPlots 
  } = useDashboardData({ limit: 20 });
  
  // Handler functions for plot actions
  const handleWater = (plotId) => {
    console.log(`Navigating to irrigation management for plot ${plotId}`);
    // Navigate to irrigation management for this specific plot
    // Since there's no specific irrigation route, navigate to plot details
    // where irrigation can be managed
    navigate(`/plots/${plotId}#irrigation`);
  };

  const handleTrack = (plotId) => {
    console.log(`Navigating to crop tracking for plot ${plotId}`);
    // Navigate to crop lifecycle tracking for this plot
    navigate(`/plots/${plotId}/timeline`);
  };

  const handleDetails = (plotId) => {
    console.log(`Navigating to plot details for plot ${plotId}`);
    // Navigate to comprehensive plot details page
    navigate(`/plots/${plotId}`);
  };

  const handleMenuClick = (plotId) => {
    console.log(`Menu clicked for plot ${plotId}`);
    // TODO: Show plot options menu
  };

  const handleAddPlot = () => {
    console.log('Navigate to add plot page');
    navigate('/add-plot');
  };

  const handleFilterByStatus = (status) => {
    filterPlots({ status });
  };

  // Calculate total acres safely - updated for new data structure
  const totalAcres = plots.length > 0 
    ? plots.reduce((acc, plot) => acc + parseFloat(plot.acreage || 0), 0).toFixed(1)
    : "0.0";

  // Calculate active plots (plots with status 'growing' or 'planting')
  const activePlots = plots.filter(plot => 
    plot.status === 'growing' || plot.status === 'planting'
  ).length;

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => refreshData()}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0 md:p-4 bg-[#fcfcf7] min-h-screen">
      {/* Header */}
      <div className="text-center mt-6 mb-2">
        <h1 className="text-2xl md:text-3xl font-bold text-green-700 flex items-center justify-center gap-2">
          <span className="text-3xl">🌾</span> GreenFields Farm
        </h1>
        <div className="text-sm text-gray-500 mt-1">Smart Farm Management System</div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 px-2 md:px-0 mb-4">
        <SummaryCard
          icon={<LocationIcon className="w-6 h-6" color="#059669" />}
          label="Total Acres"
          value={totalAcres}
          bgColor="bg-green-50 border border-green-100"
        />
        <SummaryCard
          icon={<PlantIcon className="w-6 h-6" color="#D97706" />}
          label="Active Plots"
          value={activePlots}
          bgColor="bg-yellow-50 border border-yellow-100"
        />
        <SummaryCard
          icon={<ThermometerIcon className="w-6 h-6" color="#EA580C" />}
          label="Temperature"
          value={`${weather?.temperature || 0}°C`}
          bgColor="bg-orange-50 border border-orange-100"
        />
        <SummaryCard
          icon={<RainIcon className="w-6 h-6" color="#2563EB" />}
          label="Expected Rain"
          value={`${weather?.expectedRain || 0}mm`}
          bgColor="bg-blue-50 border border-blue-100"
        />
      </div>

      {/* Weather Update */}
      {weather && (
        <div className="px-2 md:px-0 mb-4">
          <WeatherCard
            status={weather.status}
            rain={weather.expectedRain}
            humidity={weather.humidity}
          />
        </div>
      )}

      {/* Your Plots */}
      <div className="px-2 md:px-0">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">
            Your Plots ({pagination.total || plots.length})
          </h2>
          <button 
            onClick={handleAddPlot}
            className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg shadow flex items-center gap-1 text-sm"
          >
            <span className="text-lg">+</span> Add Plot
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          <button 
            onClick={() => filterPlots({})}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition whitespace-nowrap"
          >
            All
          </button>
          <button 
            onClick={() => handleFilterByStatus('growing')}
            className="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-full transition whitespace-nowrap"
          >
            Growing
          </button>
          <button 
            onClick={() => handleFilterByStatus('harvested')}
            className="px-3 py-1 text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-full transition whitespace-nowrap"
          >
            Harvested
          </button>
          <button 
            onClick={() => handleFilterByStatus('planting')}
            className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full transition whitespace-nowrap"
          >
            Planting
          </button>
        </div>

        <div className="space-y-4">
          {plots.length > 0 ? (
            plots.map((plot) => (
              <PlotCard
                key={plot.id}
                name={plot.name}
                acres={parseFloat(plot.acreage)}
                crop={plot.current_crop?.name || "N/A"}
                caretaker={plot.caretaker?.name || "N/A"}
                status={plot.status}
                nextTask={calculateNextTask(plot)}
                onWater={() => handleWater(plot.id)}
                onTrack={() => handleTrack(plot.id)}
                onDetails={() => handleDetails(plot.id)}
                onMenuClick={() => handleMenuClick(plot.id)}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-lg font-semibold mb-2">No plots found</h3>
              <p className="mb-4">Get started by adding your first plot</p>
              <button 
                onClick={handleAddPlot}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
              >
                Add Your First Plot
              </button>
            </div>
          )}
        </div>

        {/* Pagination Info */}
        {pagination.totalPages > 1 && (
          <div className="text-center mt-6 text-sm text-gray-500">
            Showing {plots.length} of {pagination.total} plots
            {pagination.page < pagination.totalPages && (
              <button 
                onClick={() => filterPlots({ page: pagination.page + 1 })}
                className="ml-2 text-green-600 hover:text-green-700 font-medium"
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>
      <div className="h-16"></div> {/* Spacer for FooterNav */}
    </div>
  );
};

export default Dashboard;
