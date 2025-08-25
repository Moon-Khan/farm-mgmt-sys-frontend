import { useState, useEffect } from 'react';
import { fetchPlots } from '../services/plotsService';
import { fetchWeather } from '../services/weatherService';

export const useDashboardData = () => {
  const [plots, setPlots] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [plotsData, weatherData] = await Promise.all([
          fetchPlots(),
          fetchWeather(),
        ]);
        
        setPlots(plotsData.plots || []);
        setWeather(weatherData);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [plotsData, weatherData] = await Promise.all([
        fetchPlots(),
        fetchWeather(),
      ]);
      
      setPlots(plotsData.plots || []);
      setWeather(weatherData);
    } catch (err) {
      console.error('Error refreshing dashboard data:', err);
      setError('Failed to refresh data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return {
    plots,
    weather,
    loading,
    error,
    refreshData
  };
}; 