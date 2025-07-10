// src/components/pages/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/auth/authAPI';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      alert('Cuenta creada con éxito. Inicia sesión.');
      navigate('/login');
    } catch {
      alert('Error al registrar. Intenta con otro correo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Crear cuenta</h2>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="input border rounded px-3 py-2 mb-3 w-full"
        required
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Contraseña"
        type="password"
        className="input border rounded px-3 py-2 mb-4 w-full"
        required
      />
      <button type="submit" className="btn bg-blue-600 text-white rounded py-2 w-full hover:bg-blue-700 transition">
        Registrarse
      </button>
    </form>
  );
}
