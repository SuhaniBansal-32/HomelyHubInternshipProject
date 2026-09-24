// which property
// which user
// price
// dates
// guests 
// paid or not

import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
    {
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: [true,"Booking must belong to a Property"]
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:[true, "Booking must belong to a User"]
        },
        price: {
            type: Number,
            required:[true,"Booking must have a price"]
        },
        createdAt: {
            type:Date,
            default:Date.now()
        },
        paid:{
            type: Boolean,
            default:true
        },
        fromDate: {
            type: Date
        },
        toDate: {
            type: Date
        },
        guests: {
            type: Number
        },
        numberOfnights: {
            type: Number
        }
    },

    {timestamps: true} // saves the updation and creation time of a property
);

// ^ means start with /^find/ means anything that starts with find, so it covers find, findOne, findById, findAll, findByIdAndUpdate. Means all of the built in functions that starts with find run this logic for them.

// Mongoose does this using the "/^find/" middleware hook:
// 1) Builds the query
// 2) Runs the pre(/^find/) middleware
// 3) Your middleware adds .populate("user") and .populate("property") to that query
// 4) next() says: “OK, continue”
// 5) Then Mongoose executes the query
// 6) Only the documents matched by that query are returned, and those matched documents are populated

bookingSchema.pre(/^find/, function() {
    // We chain populate because we want to apply more than one populate to the same query.
    this.populate("user").populate({
        path:"property",
        select: "maximumGuest images propertyName address"
    });

})

const Booking = mongoose.model("Booking",bookingSchema);

export { Booking };