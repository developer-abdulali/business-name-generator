import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // user: null,
    // token: null,
    // error: null,
    loading: false,
  },
  reducers: {
    // actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // loginSuccess: (state, action) => {
    //   state.user = action.payload.user;
    //   state.token = action.payload.token;
    //   state.error = null;
    // },
    // loginFailure: (state, action) => {
    //   state.error = action.payload;
    //   state.token = null;
    //   state.user = null;
    // },
    // logout: (state) => {
    //   state.user = null;
    //   state.token = null;
    //   state.error = null;
    // },
  },
});

// export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export const { setLoading } = authSlice.actions;

export default authSlice.reducer;
