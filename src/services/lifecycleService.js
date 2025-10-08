import { handleApiResponse } from './index';
// const API_BASE_URL = 'http://localhost:5000/v1';

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

export const fetchLifecycles = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/lifecyclecrops`, {
      headers: { ...authHeaders() }
    });
    await handleUnauthorized(response);
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching lifecycles:', error);
    return { success: false, error: error.message };
  }
};

export const fetchLifecycleById = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/lifecyclecrops/${id}`, {
      headers: { ...authHeaders() }
    });
    await handleUnauthorized(response);
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching lifecycle by id:', error);
    return { success: false, error: error.message };
  }
};

export const fetchLifecyclesByPlot = async (plotId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/lifecyclecrops/plot/${plotId}`, {
      headers: { ...authHeaders() }
    });
    await handleUnauthorized(response);
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching lifecycles by plot:', error);
    return { success: false, error: error.message };
  }
};

export const createLifecycle = async (lifecycleData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/lifecyclecrops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(lifecycleData),
    });
    await handleUnauthorized(response);
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error creating lifecycle:', error);
    return { success: false, error: error.message };
  }
};

export const updateLifecycle = async (id, lifecycleData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/lifecyclecrops/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(lifecycleData),
    });
    await handleUnauthorized(response);
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error updating lifecycle:', error);
    return { success: false, error: error.message };
  }
};

export const deleteLifecycle = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/lifecyclecrops/${id}`, {
      method: 'DELETE',
      headers: { ...authHeaders() },
    });
    await handleUnauthorized(response);
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error deleting lifecycle:', error);
    return { success: false, error: error.message };
  }
};