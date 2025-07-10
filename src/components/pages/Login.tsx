import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../features/auth/authSlice';
import { loginUser } from '../../features/auth/authAPI';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await loginUser(email, password);
      dispatch(setToken(token));
      navigate('/');
    } catch {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg flex flex-col gap-6"
    >
      {/* Logo */}
      <div className="flex justify-center">
        <img
          src="https://hacertareas.mx/wp-content/uploads/2023/11/Logo-instagram-facebook-transparency.png"
          alt="Logo"
          className="w-32 h-auto"
        />
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800">Iniciar sesión</h2>

      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Contraseña"
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded py-3 transition"
      >
        Iniciar sesión
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿No tienes una cuenta?{' '}
        <a href="/register" className="text-blue-600 hover:underline font-medium">
          Regístrate
        </a>
      </p>
    </form>
  );
}
