import { handleApiResponse } from './index';
// const API_BASE = "http://localhost:5000/v1";


export async function fetchCaretakers() {
    try {
      const url = `${process.env.REACT_APP_API_BASE}/caretakers`;
      const token = localStorage.getItem('auth_token');
      const response = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return await handleApiResponse(response);
    } catch (err) {
      console.error('Error fetching caretakers:', err);
      throw err;
    }
  }