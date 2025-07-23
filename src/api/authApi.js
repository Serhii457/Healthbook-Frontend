const BASE_URL = 'http://localhost:8080'; // или твой backend URL

export async function login(username, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username, password }),
    credentials: 'include',  // важно: отправляем куки
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
    return null; // неавторизован
  }
  return await response.json(); // {username, role}
}
