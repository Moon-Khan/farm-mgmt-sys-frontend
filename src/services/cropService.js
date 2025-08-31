
import { handleApiResponse } from './index';
const API_BASE = "http://localhost:5000/v1";

export async function fetchCrops(params = {}) {
  try {
    
    const url = `${API_BASE}/crops`;
    const response = await fetch(url);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error fetching plots:', err);
    throw err;
  }
}

