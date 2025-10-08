// import { mockPlots } from './mockData';
import { handleApiResponse } from './index';

// const API_BASE = "http://localhost:5000/v1";

function authHeaders() {
  const token = localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Helper function to handle unauthorized responses
async function handleUnauthorized(response) {
  if (response.status === 401) {
    console.log('🚫 Unauthorized - redirecting to login');
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
    throw new Error('Unauthorized - please login');
  }
  return response;
}

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
    if (params.caretaker_name) queryParams.append('caretaker_name', params.caretaker_name);
    if (params.current_crop_id) queryParams.append('current_crop_id', params.current_crop_id);

    const url = `${process.env.REACT_APP_API_BASE}/plots${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url, { headers: { ...authHeaders() } });
    await handleUnauthorized(response);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error fetching plots:', err);
    throw err;
  }
}

// Get plot by ID
export async function fetchPlotById(id) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/plots/${id}`, { headers: { ...authHeaders() } });
    await handleUnauthorized(response);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error fetching plot:', err);
    throw err;
  }
}

// Create new plot
export async function createPlot(plotData) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/plots`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(plotData),
    });
    await handleUnauthorized(response);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error creating plot:', err);
    throw err;
  }
}

// Update plot
export async function updatePlot(id, plotData) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/plots/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(plotData),
    });
    await handleUnauthorized(response);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error updating plot:', err);
    throw err;
  }
}

// Delete plot
export async function deletePlot(id) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/plots/${id}`, {
      method: 'DELETE',
      headers: { ...authHeaders() },
    });
    await handleUnauthorized(response);
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

    const url = `${process.env.REACT_APP_API_BASE}/plots/status/${status}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url, { headers: { ...authHeaders() } });
    await handleUnauthorized(response);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error fetching plots by status:', err);
    throw err;
  }
}
