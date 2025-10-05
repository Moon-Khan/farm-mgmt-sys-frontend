import { handleApiResponse } from './index';
// const API_BASE = "http://localhost:5000/v1";


export async function fetchPesticides() {
    try {
      const url = `${process.env.REACT_APP_API_BASE}/pesticides`;
      const response = await fetch(url);
      return await handleApiResponse(response);
    } catch (err) {
      console.error('Error fetching pesticides:', err);
      throw err;
    }
}

export async function fetchPesticidesByPlot(plotId) {
  try {
    const url = `${process.env.REACT_APP_API_BASE}/pesticides/plot/${plotId}`;
    const response = await fetch(url);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error fetching pesticides:', err);
    throw err;
  }
}

export async function createPesticide(pesticideData) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/pesticides`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pesticideData),
    });
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error creating pesticide:', err);
    throw err;
  }
}

export async function createPesticideApplication(data) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/pesticides`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await handleApiResponse(response);
    } catch (err) {
      console.error('Error creating pesticide application:', err);
      throw err;
    }
}