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

export async function signup({ name, email, password }) {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await handleResponse(res);
  if (data?.data?.token) localStorage.setItem('auth_token', data.data.token);
  return data;
}

export async function login({ email, password }) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(res);
  if (data?.data?.token) localStorage.setItem('auth_token', data.data.token);
  return data;
}

export async function getMe() {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { ...authHeaders() },
  });
  return handleResponse(res);
}

export async function updateMe({ name, password }) {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ name, password }),
  });
  return handleResponse(res);
}

export function logout() {
  localStorage.removeItem('auth_token');
}
