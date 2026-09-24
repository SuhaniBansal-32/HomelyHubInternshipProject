// backend will recieve the user's information, validate the required info, sends the info to the AI trip planner, which calculates budget per night and search for suitable properties inside the database, and sends the AI trip plan and matching properties back to frontend

// 1) Recieve the user's information
// 2) Validate the required information
// 3) Send the information to our AI trip planner
// 4) Calculate the budget per night
// 5) Search mongodb for suitable properties
// 6) Send both AI trip plan + matching properties back to the frontend/user

import {Property} from "../Models/propertyModel.js";
import { planTrip } from "../ai/tripPlanner.js";
import { generateDescription } from "../ai/generateDescription.js";

// helper function so that user's search city name matches the city name in property database
const cleanCity = (text) => text.toLowerCase().replaceAll(" ","");

const createTripPlan = async(req,res) => {
    try{
        // getting the user's data
        const {destination, budget, days, people, interests} = req.body;

        // validating the user's data
        if(!destination || !budget || !days || !people) {
            return res.status(400).json({
                status: "fail",
                message: "Please fill in destination, budget, days and people"
            })
        }

        // if the input is validated we call AI model through Groq

        const plan = await planTrip({
            destination,
            budget,
            days,
            people,
            interests : interests || []
        });

        const perNight = Number(budget)/ Number(days);

        const city = cleanCity(destination);

        const properties = await Property.find({
            $or: [
                {"address.city": city},
                {"address.state" : city},
                {"address.area": city} 
            ],
            price:{$lte:perNight},
            maximumGuest: {$gte:Number(people)}
        }).limit(6); // means return 6 matching properties only

        res.status(200).json({
            status: "success",
            data: {plan,properties,perNight}
        })
    }
    catch(error) {
        res.status(500).json({
            status:"fail",
            message:"Could not create a trip plan, please try again"
        })
    }
}

const writeDescription = async(req,res) => {
    try{
        const description = await generateDescription(req.body);
        res.status(200).json({
        status:"success",
        data:{description}
    })
    }
    catch(error) {
        res.status(500).json({
            status: "fail",
            message: "Could not generate a description"
        })
    }
}

export {createTripPlan, writeDescription};