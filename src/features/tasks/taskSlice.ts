import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, addTask, updateTask, deleteTask } from './taskAPI';
import type { Task } from '../../types/Task';

interface TasksState {
  items: Task[];
}

const initialState: TasksState = {
  items: [],
};

export const loadTasks = createAsyncThunk<Task[]>('tasks/load', fetchTasks);
export const createTask = createAsyncThunk<Task, Partial<Task>>('tasks/create', addTask);
export const editTask = createAsyncThunk<Task, Task>('tasks/update', updateTask);
export const removeTask = createAsyncThunk<string, string>('tasks/delete', deleteTask);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload);
      });
  }
});

export default taskSlice.reducer;
