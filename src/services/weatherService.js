// import { mockWeather } from './mockData';

const API_BASE = "http://localhost:5000/v1";

export async function fetchWeather() {
  try {
    const res = await fetch(`${API_BASE}/weather`);
    if (!res.ok) throw new Error("Failed to fetch weather");
    return res.json();
  } catch (err) {
    console.error(err);
  }
}
