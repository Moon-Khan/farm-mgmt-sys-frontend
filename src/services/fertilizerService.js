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

export async function fetchFertilizers() {
    try {
      const url = `${process.env.REACT_APP_API_BASE}/fertilizers`;
      const response = await fetch(url, { headers: { ...authHeaders() } });
      await handleUnauthorized(response);
      return await handleApiResponse(response);
    } catch (err) {
      console.error('Error fetching fertilizers:', err);
      throw err;
    }
}

export async function fetchFertilizersByPlot(plotId) {
  try {
    const url = `${process.env.REACT_APP_API_BASE}/fertilizers/plot/${plotId}`;
    const response = await fetch(url, { headers: { ...authHeaders() } });
    await handleUnauthorized(response);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error fetching fertilizers:', err);
    throw err;
  }
}

export async function createFertilizer(fertilizerData) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/fertilizers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(fertilizerData),
    });
    await handleUnauthorized(response);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error creating fertilizer:', err);
    throw err;
  }
}

export async function createFertilizerApplication(data) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/fertilizers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(),
        },
        body: JSON.stringify(data),
      });
      await handleUnauthorized(response);
      return await handleApiResponse(response);
    } catch (err) {
      console.error('Error creating fertilizer application:', err);
      throw err;
    }
}