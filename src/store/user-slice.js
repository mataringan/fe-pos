"use client";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    isAuthenticated: false,
    token: null,
    role: "",
  },
  reducers: {
    addToEmail(state, action) {
      state.email = action.payload;
    },
    login(state, action) {
      // state.isAuthenticated = true;
      // state.token = action.payload;
      state.role = action.payload;
    },
    logout(state, action) {
      // state.isAuthenticated = false;
      // state.token = null;
      state.role = "";
    },
  },
});

export const userAction = userSlice.actions;
