import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  rst_id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload?.role;
      state.rst_id = action.payload?.rst_id;
    },
    clearUserRole: (state) => {
      state.role = null;
      state.rst_id = null;
    },
  },
});

export const { setUserRole, clearUserRole } = userSlice.actions;

export default userSlice.reducer;
