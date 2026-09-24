import { Property } from "../Models/propertyModel.js";
import { Booking } from "../Models/bookingModel.js";

// function - 1 (createorder => user books a property). Booking any property
const createOrder = async (req,res) => {
    const {amount, propertyId, fromDate,toDate,guests} = req.body;

    // orderID
    const orderId = "order_" + Date.now();

    res.json({
        success: true,
        message: "Order created successfully",
        orderId,
        amount,
        propertyId,
        fromDate,
        toDate,
        guests
    });
}

// function - 2 (verifyPayment): means payment is done. 
// 1) save the booking in mongodb
// 2) block these dates which the user has used for booking
const verifyPayment = async(req,res) => {
    const{orderId, bookingDetails, forceStatus} = req.body;

    if(forceStatus === "success") {
        const paymentId = "pay_" + Date.now();

        // save the booking 
        const newBooking = await Booking.create({
            // user id is taken from the token and not from the browser url, never let the browser decide the user
            user: req.user._id,
            property: bookingDetails.propertyId,
            price:bookingDetails.price,
            fromDate: bookingDetails.fromDate,
            toDate: bookingDetails.toDate,
            guests: bookingDetails.guests,
            numberOfnights: bookingDetails.nights,
            paid:true
        });
        
        // tell the property those dates are taken
        // updating the property with new bookings
        const updateProperty = await Property.findByIdAndUpdate(
            bookingDetails.propertyId, {
                $push:{
                    currentBookings: {
                        bookingId: newBooking._id,
                        fromDate: bookingDetails.fromDate,
                        toDate: bookingDetails.toDate,
                        userId: req.user._id
                    }
                }
            },
            {new:true}
        );

        res.json({
            success: true,
            message: "Payment successful, booking confirmed!!",
            paymentId,
            orderId,
            booking: newBooking
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: "Payment failed",
            orderId
        })
    }
}

// function - 3 get user's bookings (booking history)
const getUserBookings = async (req,res) => {
    try {
        const bookings = await Booking.find({user:req.user._id});
        res.status(200).json({
            status: "success",
            data:{
                bookings
            }
        })
    }
    catch(error) {
        res.status(401).json({
            status: "fail",
            message:error.message
        })
    }
};

// function - 4 get one booking details
// when clicking on a specific booking there will be /:id in the route for that booking. /:id => details
const getBookingDetails = async(req,res) => {
    try{
        const booking = await Booking.findById(req.params.bookingId);

        res.status(200).json({
            status:"success",
            data: {
                booking
            }
        })
    }
    catch(error) {
        res.status(401).json({
            status:"fail",
            message:error.message
        })
    }
}

export { createOrder, verifyPayment, getUserBookings, getBookingDetails};






