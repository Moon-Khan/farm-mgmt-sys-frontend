import { handleApiResponse } from './index';
// const API_BASE = "http://localhost:5000/v1";


export async function fetchFertilizers() {
    try {
      const url = `${process.env.PROD_API_BASE}/fertilizers`;
      const response = await fetch(url);
      return await handleApiResponse(response);
    } catch (err) {
      console.error('Error fetching fertilizers:', err);
      throw err;
    }
}

export async function fetchFertilizersByPlot(plotId) {
  try {
    const url = `${process.env.PROD_API_BASE}/fertilizers/plot/${plotId}`;
    const response = await fetch(url);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error fetching fertilizers:', err);
    throw err;
  }
}

export async function createFertilizer(fertilizerData) {
  try {
    const response = await fetch(`${process.env.PROD_API_BASE}/fertilizers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fertilizerData),
    });
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error creating fertilizer:', err);
    throw err;
  }
}

export async function createFertilizerApplication(data) {
    try {
      const response = await fetch(`${process.env.PROD_API_BASE}/fertilizers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await handleApiResponse(response);
    } catch (err) {
      console.error('Error creating fertilizer application:', err);
      throw err;
    }
}