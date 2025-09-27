import { handleApiResponse } from './index';
const API_BASE = "http://localhost:5000/v1";


export async function fetchExpenses() {
    try {
      const url = `${API_BASE}/expenses`;
      const response = await fetch(url);
      return await handleApiResponse(response);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      throw err;
    }
}

export async function fetchExpensesByPlot(plotId) {
  try {
    const url = `${API_BASE}/expenses/plot/${plotId}`;
    const response = await fetch(url);
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error fetching expenses:', err);
    throw err;
  }
}

export async function createExpense(expenseData) {
  try {
    const response = await fetch(`${API_BASE}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    });
    return await handleApiResponse(response);
  } catch (err) {
    console.error('Error creating expense:', err);
    throw err;
  }
}