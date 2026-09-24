// address list for bookings

import express from "express";
import { getBookingDetails, getUserBookings, createOrder, verifyPayment } from "../controllers/bookingController.js";

import {protect} from "../controllers/authController.js";

const bookingRouter = express.Router();

// if the user is not logged in he is not allowed to book, pay or access any other functions, thus we are going to use the 'protect' middleware for this

bookingRouter.get("/",protect, getUserBookings);
bookingRouter.get("/:bookingId",protect, getBookingDetails);
bookingRouter.post("/create-order",protect, createOrder);
bookingRouter.post("/verify-payment",protect, verifyPayment);

export { bookingRouter };



