import { handleApiResponse } from './index';
const API_BASE = "http://localhost:5000/v1";


export async function fetchCaretakers() {
    try {
      const url = `${API_BASE}/caretakers`;
      const response = await fetch(url);
      return await handleApiResponse(response);
    } catch (err) {
      console.error('Error fetching caretakers:', err);
      throw err;
    }
  }