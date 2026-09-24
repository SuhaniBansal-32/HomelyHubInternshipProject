// AI connection setup file

import Groq from "groq-sdk"; // helps the nodejs application to communicate with groq
import dotenv from "dotenv"; // helps to read values from dotenv file

dotenv.config(); // loads the environment variables

// the groq client object
const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY
});

export default groq;