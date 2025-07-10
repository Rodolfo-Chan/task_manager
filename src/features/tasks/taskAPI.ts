import type { Task } from '../../types/Task';

const API_URL = 'https://tareas-api-production.up.railway.app/api/tasks';

const getToken = () => localStorage.getItem('token');

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return await res.json();
};

// Aquí especificamos que 'task' es Partial<Task> para permitir crear con menos campos (p. ej. sin _id)
export const addTask = async (task: Partial<Task>): Promise<Task> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(task)
  });
  return await res.json();
};

export const updateTask = async (task: Task): Promise<Task> => {
  const res = await fetch(`${API_URL}/${task._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(task)
  });
  return await res.json();
};

export const deleteTask = async (id: string): Promise<string> => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return id;
};
