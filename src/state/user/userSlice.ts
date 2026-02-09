import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  Task,
  TaskState,
  UserStateType,
} from "../../types/user";
import { dataBaseMockTasks, dataBaseMockUsers } from "./dataBaseMock";

export const getTasks = createAsyncThunk<
  Task[],
  string,   
  { rejectValue: string }
>(
  "user/getTasks",
  async (userId, { rejectWithValue }) => {
    try {
      const tasks = await new Promise<Task[]>((resolve) => {
        setTimeout(() => {
          resolve(
            dataBaseMockTasks.filter(
              (task) => task.owner === userId
            )
          );
        }, 1000);
      });

      return tasks;
    } catch (error) {
      return rejectWithValue('The server failed to fetch the tasks');
    }
  }
);

export const addTask = createAsyncThunk<
  Task,
  Task,
  {
    rejectValue: string;
    state: { user: UserStateType };
  }
>(
  "user/addTask",
  async (task, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().user;

      if (!user) throw new Error('There is no user');

      const taskWithOwner: Task = {
        ...task,
        owner: user.id,
      };

      const result = await new Promise<Task>((resolve) => {
        setTimeout(() => {
          resolve(taskWithOwner);
        }, 500);
      });

      return result;
    } catch (error) {
      return rejectWithValue("The server failed to add the task");
    }
  }
);

export const editTask = createAsyncThunk<
  {
    id: string;
    newState: string;
    newDescription: string;
  },
  {
    newState: string;
    newDescription: string;
  },
  {
    rejectValue: string;
    state: { user: UserStateType };
  }
>(
  "user/editTask",
  async ({ newState, newDescription }, { getState, rejectWithValue }) => {
   try {
      const { editTaskId } = getState().user;

      if (!editTaskId) {
        throw new Error('No task selected to edit');
      }

      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      return {
        id: editTaskId,
        newState,
        newDescription,
      };
    } catch (error) {
      return rejectWithValue("The server failed to edit the task");
    }
  }
);

export const deleteTask = createAsyncThunk<
  string,
  string,
  {
    rejectValue: string;
  }
>(
  "user/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const result = await new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(taskId);
        }, 500);
      });

      return result;
    } catch (error) {
      return rejectWithValue("The server failed to remove the task");
    }
  }
);


const initialState: UserStateType = {
  user: {
    id: '',
    name: ''
  },
  tasks: [],
  loading: false,
  error: '',
  editMode: false,
  editTaskId: '',
  editTaskState: '',
  editTaskDescription: '',
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    setUser:  (state, action: PayloadAction<string>) => {
      const tokenId = action.payload;

      const userFound = dataBaseMockUsers.find(
        (user) => user.id === tokenId
      );

      if (!userFound) return;

      state.user = {
        id: userFound.id,
        name: userFound.name,
      };
    },
    logout: (state) => {
      state.user = {
        id: '',
        name: '',
      };
      state.tasks = [];
      state.loading = false;
      state.error = '';
      state.editMode = false;
      state.editTaskId = '';
      state.editTaskState = '';
      state.editTaskDescription = '';
    },
    selectTaskToEdit:  (state, action: PayloadAction<string>) => {
      const taskId = action.payload;

      const taskToEdit = state.tasks.find(
        (task) => task.id === taskId
      );

      if (!taskToEdit) return;

      state.editMode = true;
      state.editTaskId = taskId;
      state.editTaskState = taskToEdit.state;
      state.editTaskDescription = taskToEdit.description;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown Error';
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push (action.payload);
        state.loading = false;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown Error';
      })
      .addCase(editTask.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const { id, newState, newDescription } = action.payload;

        const task = state.tasks.find(
          (task) => task.id === id
        );

        if (task) {
          task.state = newState as TaskState;
          task.description = newDescription;
        }

        state.editMode = false;
        state.editTaskId = '';
        state.editTaskState = '';
        state.editTaskDescription = '';
        state.loading = false;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown Error';
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown Error';
      })
  }
});

export const { setUser, logout, selectTaskToEdit } = userSlice.actions;
export default userSlice.reducer;