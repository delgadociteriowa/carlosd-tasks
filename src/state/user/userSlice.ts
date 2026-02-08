import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Task,
  UserStateType,
} from "../../types/user";
import { dataBaseMockUsers, dataBaseMockTasks } from "./dataBaseMock";


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
)


const initialState: UserStateType = {
  user: {
    id: 'a3964',
    name: 'John'
  },
  tasks: [],
  loading: false,
  error: '',
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers:{},
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
  }
});

export default userSlice.reducer;