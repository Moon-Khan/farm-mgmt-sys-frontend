import { handleApiResponse } from './index';
const API_BASE = "http://localhost:5000/v1";


export async function fetchIrrigations() {
    try {
      const url = `${process.env.PROD_API_BASE}/irrigation`;
      const response = await fetch(url);
      return await handleApiResponse(response);
    } catch (err) {
      console.error('Error fetching irrigations:', err);
      throw err;
    }
}

export async function fetchIrrigationsByPlot(plotId) {
  try {
    const url = `${process.env.PROD_API_BASE}/irrigation/plot/${plotId}`;
    const response = await fetch(url);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error fetching irrigations:', err);
    throw err;
  }
}

export async function createIrrigation(irrigationData) {
  try {
    const response = await fetch(`${process.env.PROD_API_BASE}/irrigation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(irrigationData),
    });
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error creating irrigation:', err);
    throw err;
  }
}

export async function createIrrigationSchedule(data) {
    try {
      const response = await fetch(`${process.env.PROD_API_BASE}/irrigation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await handleApiResponse(response);
    } catch (err) {
      console.error('Error creating irrigation schedule:', err);
      throw err;
    }
}