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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded-lg flex flex-col gap-6">
      {/* Logo arriba del título */}
      <div className="flex justify-center">
        <img
          src="https://hacertareas.mx/wp-content/uploads/2023/11/Logo-instagram-facebook-transparency.png"
          alt="Logo"
          className="w-32 h-auto"
        />
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800">Crear cuenta</h2>

      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Contraseña"
        type="password"
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold rounded py-3 hover:bg-blue-700 transition"
      >
        Registrarse
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿Ya tienes una cuenta?{' '}
        <a href="/login" className="text-blue-600 hover:underline font-medium">
          Inicia sesión
        </a>
      </p>
    </form>
  );
}
