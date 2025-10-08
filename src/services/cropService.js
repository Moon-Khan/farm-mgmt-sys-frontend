
import { handleApiResponse } from './index';
// const API_BASE = "http://localhost:5000/v1";

export async function fetchCrops(params = {}) {
  try {
    const url = `${process.env.REACT_APP_API_BASE}/crops`;
    const token = localStorage.getItem('auth_token');

    console.log('🌾 Fetching crops from:', url);
    console.log('🔑 Auth token present:', !!token);

    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    console.log('📡 Response status:', response.status);

    if (response.status === 401) {
      console.log('🚫 Unauthorized - redirecting to login');
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
      throw new Error('Unauthorized - please login');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Crops API response:', data);

    // Return the data array from the response
    return data?.data || data || [];
  } catch (err) {
    console.error('❌ Error fetching crops:', err);
    if (err.message.includes('Unauthorized')) {
      // Already handled above, but catch here for safety
      return [];
    }
    return [];
  }
}

