import { handleApiResponse } from './index';
const API_BASE_URL = 'http://localhost:5000/v1';

export const fetchLifecycles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/lifecyclecrops`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching lifecycles:', error);
    return { success: false, error: error.message };
  }
};

export const fetchLifecycleById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lifecyclecrops/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching lifecycle by id:', error);
    return { success: false, error: error.message };
  }
};

export const fetchLifecyclesByPlot = async (plotId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lifecyclecrops/plot/${plotId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching lifecycles by plot:', error);
    return { success: false, error: error.message };
  }
};

export const createLifecycle = async (lifecycleData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lifecyclecrops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lifecycleData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating lifecycle:', error);
    return { success: false, error: error.message };
  }
};

export const updateLifecycle = async (id, lifecycleData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lifecyclecrops/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lifecycleData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating lifecycle:', error);
    return { success: false, error: error.message };
  }
};

export const deleteLifecycle = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lifecyclecrops/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting lifecycle:', error);
    return { success: false, error: error.message };
  }
};