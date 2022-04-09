import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import * as api from 'services/tasks';
import { Status, Task, ValidationErrors } from 'types';
import { AddTaskFields, UpdateTaskFields } from 'types/task';

export type TasksState = {
  items: Task[];
  status: Status;
  error: string;
  selectedTask: Task | null;
};

export const tasksInitialState: TasksState = {
  items: [],
  status: 'idle',
  error: '',
  selectedTask: null,
};

export const fetchTasks = createAsyncThunk<Task[], undefined, { rejectValue: ValidationErrors }>(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getTasks();
      return response;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (fields: AddTaskFields, { rejectWithValue }) => {
    try {
      const response = await api.addTask(fields);
      return response;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.deleteTask(id);
      return response;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, fields }: { id: string; fields: UpdateTaskFields }, { rejectWithValue }) => {
    try {
      const response = await api.updateTask(id, fields);
      return response;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksInitialState,
  reducers: {
    selectTask(state, action: PayloadAction<Task>) {
      state.selectedTask = action.payload;
    },
    clearSelectedTask(state) {
      state.selectedTask = null;
    },
  },
  extraReducers: (builder) => {
    // fetch tasks case
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = 'succeed';
      state.items = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      if (action.payload?.message) {
        state.error = action.payload.message;
      }
      state.status = 'failed';
    });

    // add task case
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.items = [action.payload, ...state.items];
    });

    // delete task case
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    });

    // update task case
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.items = state.items.map((item) =>
        action.payload.id === item.id ? { ...item, ...action.payload } : item
      );
    });
  },
});

export const { selectTask, clearSelectedTask } = tasksSlice.actions;

export default tasksSlice.reducer;
