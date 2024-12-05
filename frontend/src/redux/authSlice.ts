import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the user
export interface User {
  _id?: string;
  username?: string;
  friends?: User[]; // Define friends as an array of User objects
}

// Define a type for the slice state
export interface UserState {
  user: User;
}

// Define the initial state using that type
const initialState: UserState = {
  user: {
    _id: '',
    username: '',
    friends: [],
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {
        _id: '',
        username: '',
        friends: [],
      };
    },
  },
});
// Export actions
export const { setUser, clearUser } = authSlice.actions;

export const isUserLoggedIn = (state: RootState) => !!state.auth.user._id;

// Selector example
export const selectUser = (state: RootState) => state.auth.user;

// Export reducer
export default authSlice.reducer;
