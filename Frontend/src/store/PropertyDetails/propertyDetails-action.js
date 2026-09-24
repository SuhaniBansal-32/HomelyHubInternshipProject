import { propertyDetailsAction } from "./propertyDetails-slice";
import { axiosInstance } from "../../utils/axios";

// the function is going to fetch details of one specific property using the property id

// recieve the property id
// start loading
// call backend api
// wait for response
// get the property data
// store the details in redux
// if error store error in redux

export const getPropertyDetails = (id) => async (dispatch) => {
    try{

        console.log("request started");
        dispatch(propertyDetailsAction.getListRequest());
        const response = await axiosInstance.get(`/v1/rent/listing/${id}`);
        console.log(response);

        if(!response) {
            throw new Error("Could not fetch any property details");
        }

        const {data} = response.data;
        console.log(data);

        dispatch(propertyDetailsAction.getPropertyDetails(data));

    }
    catch(error) {
        dispatch(propertyDetailsAction.getErrors(error.response.data.error));
    }
}

