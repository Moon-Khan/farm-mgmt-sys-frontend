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

export async function fetchCaretakers() {
    try {
      const url = `${process.env.REACT_APP_API_BASE}/caretakers`;
      const response = await fetch(url, {
        headers: { ...authHeaders() }
      });
      await handleUnauthorized(response);
      return await handleApiResponse(response);
    } catch (err) {
      console.error('Error fetching caretakers:', err);
      throw err;
    }
  }