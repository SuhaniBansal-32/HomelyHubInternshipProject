import { configureStore } from "@reduxjs/toolkit";
import propertySlice from "./Property/property-slice";
import propertyDetailsSlice from "./PropertyDetails/propertyDetails-slice";
import userSlice from "./User/user-slice";
import bookingSlice from "./Booking/booking-slice";
import paymentSlice from "./Payment/payment-slice";
import accomodationSlice from "./Accomodation/Accomodation-slice";

// all the slices have to be stored inside the redux store so that these can be used by the components

const store = configureStore({
    reducer: {
        properties: propertySlice.reducer,
        propertydetails: propertyDetailsSlice.reducer,
        user: userSlice.reducer,
        booking: bookingSlice.reducer,
        payment:paymentSlice.reducer,
        accomodation:accomodationSlice.reducer
    }
})

export default store;