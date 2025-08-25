import { mockPlots } from './mockData';

const API_BASE = "https://farm-mgmt-sys.onrender.com/v1";

export async function fetchPlots() {
  try {
    const res = await fetch(`${API_BASE}/plots`);
    if (!res.ok) throw new Error("Failed to fetch plots");
    return res.json();
  } catch (err) {
    console.error(err);
    return { plots: mockPlots };
  }
}
