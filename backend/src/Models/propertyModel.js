import slugify from "slugify";
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: [true,"Please enter your property name"]
    },
    description: {
        type: String,
        require: [true,"Please add information about your property"]
    },
    extraInfo: {
        type: String,
        default:"Check in on time. Good services are available. The place is full of freshness and cool vibes.",
    },
    propertyType: {
        type: String,
        enum:["House","Flat","Guest House","Hotel"],
        default:"House"
    },
    roomType:{
        type: String,
        enum: ["Anytype","Room","Entire Home"],
        default:"Anytype"
    },
    
    maximumGuest: {
        type: Number,
        required:[true,"Please give the maximum no. of Guest that can occupy"]
    },

    // amenities means facilities
    amenities: [
        {
            name:{
                type:String,
                required:true,
                enum:[
                    "Wifi",
                    "Kitchen",
                    "Ac",
                    "Washing Machine",
                    "Tv",
                    "Pool",
                    "Free Parking"
                ]
            },
            icon: {
                type:String,
                required:true
            }
        }
    ],

    images: {
        type:[
            {
                public_id: {
                    type:String
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        validate: {
            validator: function(arr) {
                return arr.length >= 6;
            },
            message: "The images must contain atleast 6 images"
        }
    },

    price: {
        type:Number,
        required:[true, "Please enter the price per night value"],
        default:500
    },

    address: {
        area:String,
        city:String,
        state:String,
        pincode:Number
    },

    currentBookings : [
        {
            bookingId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Booking"
            },
            fromDate:{
                type:Date
            },
            toDate: {
                type:Date
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    slug:String,
    chekInTime: {
        type:String,
        default:"11:00"
    },
    chekOutTime: {
        type:String,
        default:"13:00"
    }
});

// converting property name into URL friendly name using slugify
propertySchema.pre("save", function() {
    this.slug = slugify(this.propertyName,{lower:true});
    
});

propertySchema.pre("save", function() {
    this.address.city = this.address.city.toLowerCase().replaceAll(" ","");
    
});
// if the property already exists in the collection we need not create it again
const Property = mongoose.models.Property || mongoose.model("Property",propertySchema);

export{ Property };