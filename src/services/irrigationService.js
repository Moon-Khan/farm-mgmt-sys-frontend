import { handleApiResponse } from './index';

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

export async function fetchIrrigations() {
    try {
      const url = `${process.env.REACT_APP_API_BASE}/irrigation`;
      const response = await fetch(url, { headers: { ...authHeaders() } });
      await handleUnauthorized(response);
      return await handleApiResponse(response);
    } catch (err) {
      console.error('Error fetching irrigations:', err);
      throw err;
    }
}

export async function fetchIrrigationsByPlot(plotId) {
  try {
    const url = `${process.env.REACT_APP_API_BASE}/irrigation/plot/${plotId}`;
    const response = await fetch(url, { headers: { ...authHeaders() } });
    await handleUnauthorized(response);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error fetching irrigations:', err);
    throw err;
  }
}

export async function createIrrigation(irrigationData) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/irrigation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(irrigationData),
    });
    await handleUnauthorized(response);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error creating irrigation:', err);
    throw err;
  }
}

export async function createIrrigationSchedule(data) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/irrigation`, {
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
      console.error('Error creating irrigation schedule:', err);
      throw err;
    }
}