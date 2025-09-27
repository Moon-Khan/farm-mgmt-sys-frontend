export function getToken() {
  return localStorage.getItem('auth_token');
}

export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function isTokenValid(token) {
  const payload = parseJwt(token || '');
  if (!payload || !payload.exp) return false;
  const nowSec = Math.floor(Date.now() / 1000);
  return payload.exp > nowSec;
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;
  return isTokenValid(token);
}
