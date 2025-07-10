import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadTasks, createTask, removeTask, editTask } from '../../features/tasks/taskSlice';
import { logout } from '../../features/auth/authSlice';  // Importa la acción logout
import { FaSyncAlt, FaTrash, FaClock, FaSignOutAlt } from 'react-icons/fa';  // Importa el icono

type EstadoTarea = 'pendiente' | 'en_progreso' | 'completada';

interface Task {
    _id: string;
    titulo: string;
    descripcion: string;
    estado: EstadoTarea;
    createdAt: string;
}

interface TaskForm {
    titulo: string;
    descripcion: string;
    estado: EstadoTarea;
}

const estadoColor = {
    pendiente: 'text-red-500',
    en_progreso: 'text-yellow-500',
    completada: 'text-green-500',
};

const estadoBgColor = {
    pendiente: 'bg-red-500',
    en_progreso: 'bg-yellow-500',
    completada: 'bg-green-500',
    todos: 'bg-gray-200',
};

export default function Home() {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(state => state.tasks.items as Task[]);

    const [filtro, setFiltro] = useState<EstadoTarea | 'todos'>('todos');
    const [form, setForm] = useState<TaskForm>({
        titulo: '',
        descripcion: '',
        estado: 'pendiente',
    });

    useEffect(() => {
        dispatch(loadTasks());
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createTask(form));
        setForm({ titulo: '', descripcion: '', estado: 'pendiente' });
    };

    const handleDelete = (id: string) => {
        dispatch(removeTask(id));
    };

    const handleFiltro = (estado: EstadoTarea | 'todos') => {
        setFiltro(estado);
    };

    const cambiarEstado = (tarea: Task) => {
        const estados: EstadoTarea[] = ['pendiente', 'en_progreso', 'completada'];
        const index = estados.indexOf(tarea.estado);
        const nuevoEstado = estados[(index + 1) % estados.length];
        dispatch(editTask({ ...tarea, estado: nuevoEstado }));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const tareasFiltradas = filtro === 'todos' ? tasks : tasks.filter(t => t.estado === filtro);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <img
                    src="https://hacertareas.mx/wp-content/uploads/2023/11/Logo-instagram-facebook-transparency.png"
                    alt=""
                    className="w-30 h-auto"
                />
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                    title="Cerrar sesión"
                >
                    <FaSignOutAlt />
                    Cerrar sesión
                </button>
            </div>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 shadow rounded-lg flex flex-col gap-3">
                <input
                    value={form.titulo}
                    onChange={e => setForm({ ...form, titulo: e.target.value })}
                    placeholder="Título"
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                    required
                />
                <input
                    value={form.descripcion}
                    onChange={e => setForm({ ...form, descripcion: e.target.value })}
                    placeholder="Descripción"
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                    required
                />
                <select
                    value={form.estado}
                    onChange={e => setForm({ ...form, estado: e.target.value as EstadoTarea })}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-blue-500"
                    required
                >
                    <option value="pendiente">Pendiente</option>
            
                </select>
                <button type="submit" className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition">
                    Agregar tarea
                </button>
            </form>

            {/* FILTROS */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {(['todos', 'pendiente', 'en_progreso', 'completada'] as const).map(estado => {
                    const isActive = filtro === estado;
                    const isTodos = estado === 'todos';

                    const bgColor = isTodos
                        ? isActive
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        : isActive
                            ? `${estadoBgColor[estado]} text-white`
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300';

                    return (
                        <button
                            key={estado}
                            onClick={() => handleFiltro(estado)}
                            className={`rounded px-4 py-1 text-sm font-medium transition ${bgColor}`}
                        >
                            {estado}
                        </button>
                    );
                })}
            </div>

            {/* LISTADO DE TAREAS */}
            <ul className="space-y-6">
                {tareasFiltradas.map(t => (
                    <li
                        key={t._id}
                        className="bg-white shadow-lg rounded-xl p-6 flex justify-between items-start transition-transform transform hover:scale-[1.02]"
                    >
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.titulo}</h3>
                            <p className="text-gray-700 mb-3">{t.descripcion}</p>
                            <p className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${estadoColor[t.estado]} bg-opacity-20`}>
                                Estado: {t.estado.replace('_', ' ')}
                            </p>
                            <p className="text-xs text-gray-400 mt-3 flex items-center gap-2">
                                <FaClock className="text-gray-400" /> {new Date(t.createdAt).toLocaleString()}
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 ml-6 min-w-[120px]">
                            <button
                                onClick={() => cambiarEstado(t)}
                                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg shadow transition"
                                title="Cambiar estado"
                            >
                                <FaSyncAlt /> Cambiar
                            </button>
                            <button
                                onClick={() => handleDelete(t._id)}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg shadow transition"
                                title="Eliminar tarea"
                            >
                                <FaTrash /> Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
}
