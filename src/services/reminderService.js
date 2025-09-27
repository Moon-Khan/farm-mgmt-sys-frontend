const API_BASE_URL = 'http://localhost:5000/v1';

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

export async function fetchAllReminders() {
  const res = await fetch(`${API_BASE_URL}/reminders`, { headers: { ...authHeaders() } });
  return handleResponse(res);
}

export async function fetchRemindersByPlot(plotId) {
  const res = await fetch(`${API_BASE_URL}/reminders/plot/${plotId}`, { headers: { ...authHeaders() } });
  return handleResponse(res);
}

export async function fetchUpcomingReminders(days = 7) {
  const res = await fetch(`${API_BASE_URL}/reminders/upcoming?days=${days}`, { headers: { ...authHeaders() } });
  return handleResponse(res);
}

export async function createReminder(payload) {
  const res = await fetch(`${API_BASE_URL}/reminders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
}

export async function markReminderDone(reminderId) {
  const res = await fetch(`${API_BASE_URL}/reminders/${reminderId}/done`, {
    method: 'PATCH',
    headers: { ...authHeaders() }
  });
  return handleResponse(res);
}
