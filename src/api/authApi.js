const BASE_URL = 'http://localhost:8080';

export async function login(username, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username, password }),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Неверный логин или пароль');
  }
  return true;
}

export async function logout() {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Ошибка выхода из системы');
  }
  return true;
}

export async function fetchCurrentUser() {
  const response = await fetch(`${BASE_URL}/api/auth/me`, {
    credentials: 'include',
  });
  if (!response.ok) {
    return null;
  }
  return await response.json();
}
