// const API_BASE_URL = 'http://localhost:5000/v1';

function authHeaders() {
  const token = localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.message || res.statusText;
    throw new Error(msg);
  }
  return data;
}

export async function fetchAllReminders(type) {
  const qs = type ? `?type=${encodeURIComponent(type)}` : '';
  const res = await fetch(`${process.env.REACT_APP_API_BASE}/reminders${qs}`, { headers: { ...authHeaders() } });
  return handleResponse(res);
}

export async function fetchRemindersByPlot(plotId) {
  const res = await fetch(`${process.env.REACT_APP_API_BASE}/reminders/plot/${plotId}`, { headers: { ...authHeaders() } });
  return handleResponse(res);
}

export async function fetchUpcomingReminders(days = 7, type) {
  const params = new URLSearchParams({ days: String(days) });
  if (type) params.set('type', type);
  const res = await fetch(`${process.env.REACT_APP_API_BASE}/reminders/upcoming?${params.toString()}`, { headers: { ...authHeaders() } });
  return handleResponse(res);
}

export async function createReminder(payload) {
  const res = await fetch(`${process.env.REACT_APP_API_BASE}/reminders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
}

export async function markReminderDone(reminderId) {
  const res = await fetch(`${process.env.REACT_APP_API_BASE}/reminders/${reminderId}/done`, {
    method: 'PATCH',
    headers: { ...authHeaders() }
  });
  return handleResponse(res);
}
