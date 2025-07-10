//authApi.ts
// src/features/auth/authAPI.ts

// Función para iniciar sesión
export const loginUser = async (email: string, password: string) => {
  const response = await fetch('https://tareas-api-production.up.railway.app/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error('Error al iniciar sesión');
  const data = await response.json();
  return data.token;
};

// ✅ Nueva función para registrar usuario
export const registerUser = async (email: string, password: string) => {
  const response = await fetch('https://tareas-api-production.up.railway.app/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error('Error al registrar usuario');
  return await response.json();
};
