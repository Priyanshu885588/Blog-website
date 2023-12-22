import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        
    }
})