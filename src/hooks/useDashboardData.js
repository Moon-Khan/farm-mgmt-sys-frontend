import { useState, useEffect } from 'react';
import { fetchPlots } from '../services/plotsService';
import { fetchWeather } from '../services/weatherService';

export const useDashboardData = (options = {}) => {
  const [plots, setPlots] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const loadData = async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const [plotsData, weatherData] = await Promise.all([
        fetchPlots({ ...options, ...params }),
        fetchWeather(),
      ]);
      
      // Handle new API response structure
      if (plotsData.success && plotsData.data) {
        setPlots(plotsData.data);
        
        // Update pagination if meta is available
        if (plotsData.meta) {
          setPagination(plotsData.meta);
        }
      } else {
        setPlots([]);
        setError(plotsData.message || 'Failed to load plots');
      }
      
      // Handle weather data (assuming it has similar structure)
      if (weatherData && weatherData.success) {
        setWeather(weatherData.data);
      } else {
        setWeather(null);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data. Please try again later.');
      setPlots([]);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    console.log("PLOTS DATA", plots);
  }, []);

  const refreshData = async (params = {}) => {
    await loadData(params);
  };

  const loadMorePlots = async () => {
    if (pagination.page < pagination.totalPages) {
      await loadData({ page: pagination.page + 1 });
    }
  };

  const filterPlots = async (filters) => {
    await loadData({ page: 1, ...filters });
  };

  return {
    plots,
    weather,
    loading,
    error,
    pagination,
    refreshData,
    loadMorePlots,
    filterPlots
  };
}; 