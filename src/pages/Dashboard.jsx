// ...existing code...
import React, { useEffect, useState } from "react";
import SummaryCard from "../components/cards/SummaryCard";
import WeatherCard from "../components/cards/WeatherCard";
import PlotCard from "../components/cards/PlotCard";
import { fetchPlots } from "../services/plotsService";
import { fetchWeather } from "../services/weatherService";

const Dashboard = () => {
  const [plots, setPlots] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const [plotsData, weatherData] = await Promise.all([
        fetchPlots(),
        fetchWeather(),
      ]);

      setPlots(plotsData.plots || []);
      setWeather(weatherData);
      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) return <div className="p-4">Loading Dashboard...</div>;

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
        <div className="bg-green-50 rounded-xl border border-green-100 shadow flex flex-col items-center py-4 px-2">
          <div className="text-green-600 text-2xl mb-1"><span>📍</span></div>
          <div className="text-[1.7rem] font-bold text-gray-800">{plots.reduce((acc, p) => acc + p.acres, 0).toFixed(1)}</div>
          <div className="text-sm text-gray-500">Total Acres</div>
        </div>
        <div className="bg-yellow-50 rounded-xl border border-yellow-100 shadow flex flex-col items-center py-4 px-2">
          <div className="text-yellow-600 text-2xl mb-1"><span>🌱</span></div>
          <div className="text-[1.7rem] font-bold text-gray-800">{plots.length}</div>
          <div className="text-sm text-gray-500">Active Plots</div>
        </div>
        <div className="bg-orange-50 rounded-xl border border-orange-100 shadow flex flex-col items-center py-4 px-2">
          <div className="text-orange-600 text-2xl mb-1"><span>🌡️</span></div>
          <div className="text-[1.7rem] font-bold text-gray-800">{weather?.temperature}°C</div>
          <div className="text-sm text-gray-500">Temperature</div>
        </div>
        <div className="bg-blue-50 rounded-xl border border-blue-100 shadow flex flex-col items-center py-4 px-2">
          <div className="text-blue-600 text-2xl mb-1"><span>🌧️</span></div>
          <div className="text-[1.7rem] font-bold text-gray-800">{weather?.expectedRain}mm</div>
          <div className="text-sm text-gray-500">Expected Rain</div>
        </div>
      </div>

      {/* Weather Update */}
      {weather && (
        <div className="px-2 md:px-0 mb-4">
          <div className="bg-orange-50 border border-orange-200 rounded-2xl shadow flex items-center gap-3 p-4">
            <div className="text-orange-400 text-2xl"><span>⚠️</span></div>
            <div>
              <div className="font-semibold text-orange-700 text-base">Weather Update</div>
              <div className="text-sm text-gray-600">{weather.status}</div>
              <div className="text-xs text-gray-500 mt-1 flex gap-4">
                <span>Expected: <span className="font-semibold">{weather.expectedRain}mm</span></span>
                <span>Humidity: <span className="font-semibold">{weather.humidity}%</span></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Your Plots */}
      <div className="px-2 md:px-0">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700">Your Plots</h2>
          <button className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg shadow flex items-center gap-1 text-sm">
            <span className="text-lg">+</span> Add Plot
          </button>
        </div>

        <div className="space-y-4">
          {plots.map((plot) => (
            <div key={plot.id} className="bg-white border border-green-100 rounded-2xl shadow p-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-xl">📍</span>
                  <span className="font-semibold text-base md:text-lg text-gray-800">{plot.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${plot.status === "growing" ? "bg-green-100 text-green-700" : ""}
                    ${plot.status === "ready" ? "bg-yellow-100 text-yellow-700" : ""}
                  `}>
                    {plot.status === "growing" ? <span>🟢 growing</span> : <span>⚡ ready</span>}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600 px-2 py-1 rounded-full">
                    <span className="text-lg">⋮</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 mt-2">
                <div className="flex items-center gap-1"><span>📏</span> {plot.acres} acres</div>
                <div className="flex items-center gap-1"><span>🌱</span> {plot.crop}</div>
                <div className="flex items-center gap-1"><span>👨‍🌾</span> {plot.caretaker}</div>
                <div className="flex items-center gap-1"><span>📅</span> <span className="font-semibold text-green-700">Ready!</span></div>
              </div>
              <div className="bg-orange-50 text-orange-700 text-sm rounded-md p-2 mt-3 flex items-center gap-2">
                <span className="text-orange-400 text-lg">📋</span>
                <span>Next: {plot.nextTask}</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-2 mt-3">
                <button className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg flex items-center justify-center gap-1 font-medium text-sm hover:bg-blue-100 transition">
                  <span>⚡</span> Water
                </button>
                <button className="flex-1 bg-green-50 text-green-700 px-3 py-2 rounded-lg flex items-center justify-center gap-1 font-medium text-sm hover:bg-green-100 transition">
                  <span>📈</span> Track
                </button>
                <button className="flex-1 bg-gray-50 text-gray-700 px-3 py-2 rounded-lg flex items-center justify-center gap-1 font-medium text-sm hover:bg-gray-100 transition">
                  <span>📄</span> Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-16"></div> {/* Spacer for FooterNav */}
    </div>
  );
};

export default Dashboard;// ...existing code...
