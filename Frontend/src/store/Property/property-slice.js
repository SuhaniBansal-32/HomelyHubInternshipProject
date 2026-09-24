// state manager
// slice means a piece of something. Slice is one piece of the redux store
// list of all properties
// count the total properties
// search filters
// loading flag: appears when the user request for data from server until the data comes and loading closes once the data reaches
// proper error handling 
// it happens when the action is dispatched, reducer never calls the API by itself, it only updates the state

import { createSlice } from "@reduxjs/toolkit";
// createSlice is a helper that builds the reducer, state, action creators in one shot

const propertySlice = createSlice({
    name: "property", // the name is put in front of each action type
    initialState:{ // it tells what the user is going to see on first render
        properties:[], // array of properties from backend
        totalProperties: 0,
        searchParams: {},
        error:null, // holds the error message when the API fails
        loading:false
    },
    // reducers are the functions that are allowed to change the state, each key automatically acts as the action creator
    // reducers are synchronous
    reducers: {
        // loads the flag on when it is dispatched at very start of the API call
        // current slice state
        // user makes a request to the backend and the loading begins
        getRequest(state) {
            state.loading = true
        },
        // stores the data that backend returned
        getProperties(state,action) {
            state.properties = action.payload.data;
            state.totalProperties = action.payload.all_properties;
            state.loading = false; // request finished => hide the laoder
        },
        updateSearchParams:(state,action) => {
            // updates the filter used by property listing API
            // these are dispatched from the filter UI or search bar before API call
            state.searchParams = Object.keys(action.payload).length === 0 ? {} : {
                ...state.searchParams,
                ...action.payload
            }

        },

        getErrors(state,action) {
            state.error = action.payload
        }
    }

})

export const propertyAction = propertySlice.actions // it auto generates the action creator for the reducer key above

export default propertySlice;
