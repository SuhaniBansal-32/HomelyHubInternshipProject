import { propertyAction } from "./property-slice";
import { axiosInstance } from "../../utils/axios";

// get all properties ->
// 1) start API request
// 2) tell redux loading started
// 3) get search parameters
// 4) call backend API
// 5) wait for response
// 6) get property data
// 7) send data to redux store
// 8) If error => send error to redux

// dispatch means to send something to redux, redux do this, update this, bring this, get this, post this

// dispatch => SEND to redux

// getState means to get the data from redux, getting current data from the redux store

// getState => GET from redux

export const getAllProperties = () => async (dispatch,getState) => {
    try{
        console.log("API call started");
        dispatch(propertyAction.getRequest()); // telling redux that the request has started

        const {searchParams} = getState().properties;
        console.log(searchParams);

        // making API call to backend to get all the properties
        const response = await axiosInstance.get(`/v1/rent/listing`,{params:{...searchParams}})
        console.log(response)

        if(!response) {
            throw new Error("Could not fetch any properties");
        }

        console.log("backend call completed successfully");

        // taking data out of the axios wrapper response

        const {data} = response;
        console.log(data);

        // send the properties data to redux store
        dispatch(propertyAction.getProperties(data));

    }
    catch(error) {
        // if error occurs then dispacthing the error to redux 
        dispatch(propertyAction.getErrors(error.message));
    }
}