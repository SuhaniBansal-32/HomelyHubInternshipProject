// stores everything related to the user

// slice helps to create the redux state and the functions that can update that state

import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user", // redux uses this name to identify this slice
    initialState: {
        isAuthenticated: false, // intially user is not logged in
        loading: false,
        user: null,
        errors: null,
        success: false // no API request is running for user initially
    },
    // reducers are the functions that change our redux state.
    reducers: {
        getSignupRequest(state) {
            state.loading = true;
        },
        getSignupDetails(state,action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        getLoginRequest(state) {
            state.loading = true;
        },
        getLoginDetails(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        getError(state,action) {
            state.errors = action.payload; // storing error details
            state.loading = false;
        },
        // who is now logged in, who is the current user
        getCurrentRequest(state) {
            state.loading = true;
        },
        getUpdateUserRequest(state) {
            state.loading = true;
        },
        getCurrentUser(state,action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        getLogoutRequest(state){
            state.loading = true;
        },
        getLogout(state,action) {
            state.user = action.payload;
            state.isAuthenticated = false;
            state.loading = false;
        },
        getPasswordRequest(state) {
            state.loading = true;
        },
        getPasswordSuccess(state,action) {
            state.success = action.payload;
            state.loading = false;
        },
        // clearing old errors 
        clearErrors(state) {
            state.errors = null
        }

    }
});

export const userActions = userSlice.actions;
export default userSlice;