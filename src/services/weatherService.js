import { mockWeather } from './mockData';

const API_BASE = "https://farm-mgmt-sys.onrender.com/v1";

export async function fetchWeather() {
  try {
    const res = await fetch(`${API_BASE}/weather`);
    if (!res.ok) throw new Error("Failed to fetch weather");
    return res.json();
  } catch (err) {
    console.error(err);
    return mockWeather;
  }
}
