// import { mockPlots } from './mockData';
import { handleApiResponse } from './index';

const API_BASE = "http://localhost:5000/v1";



// Enhanced API response handler
// const handleApiResponse = async (response) => {
//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//   }
//   return response.json(); 
// };

// Get all plots with pagination and filtering
export async function fetchPlots(params = {}) {
  try {
    const queryParams = new URLSearchParams();
    
    // Add pagination params
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    
    // Add filter params
    if (params.status) queryParams.append('status', params.status);
    if (params.caretaker_id) queryParams.append('caretaker_id', params.caretaker_id);
    if (params.current_crop_id) queryParams.append('current_crop_id', params.current_crop_id);
    
    const url = `${API_BASE}/plots${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error fetching plots:', err);
    throw err;
  }
}

// Get plot by ID
export async function fetchPlotById(id) {
  try {
    const response = await fetch(`${API_BASE}/plots/${id}`);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error fetching plot:', err);
    throw err;
  }
}

// Create new plot
export async function createPlot(plotData) {
  try {
    const response = await fetch(`${API_BASE}/plots`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plotData),
    });
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error creating plot:', err);
    throw err;
  }
}

// Update plot
export async function updatePlot(id, plotData) {
  try {
    const response = await fetch(`${API_BASE}/plots/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plotData),
    });
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error updating plot:', err);
    throw err;
  }
}

// Delete plot
export async function deletePlot(id) {
  try {
    const response = await fetch(`${API_BASE}/plots/${id}`, {
      method: 'DELETE',
    });
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error deleting plot:', err);
    throw err;
  }
}

// Get plots by status
export async function fetchPlotsByStatus(status, params = {}) {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    
    const url = `${API_BASE}/plots/status/${status}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error fetching plots by status:', err);
    throw err;
  }
}
