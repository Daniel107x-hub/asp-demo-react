import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = Boolean(action.payload) || false
        }
    }
})

export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer;