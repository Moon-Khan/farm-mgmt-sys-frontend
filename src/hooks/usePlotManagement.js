import { useState } from 'react';
import { createPlot, updatePlot, deletePlot, fetchPlotById } from '../services/plotsService';

export const usePlotManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNewPlot = async (plotData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await createPlot(plotData);
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to create plot');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateExistingPlot = async (id, plotData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await updatePlot(id, plotData);
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to update plot');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteExistingPlot = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await deletePlot(id);
      if (result.success) {
        return true;
      } else {
        throw new Error(result.message || 'Failed to delete plot');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPlotDetails = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchPlotById(id);
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to fetch plot details');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createNewPlot,
    updateExistingPlot,
    deleteExistingPlot,
    getPlotDetails
  };
};