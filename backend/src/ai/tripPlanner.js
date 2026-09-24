// revieve information from frontend application, prepares the information for AI and send it to Groq, then ask the AI to generate the trip plan and then it recieves the AI response, convert it to JSON and return the result that the user sees

import groq from "./aiClient.js";

// tell AI the rules and role to follow
const systemPrompt = `You are a travel planner for a holiday rental website in India.

Create a day-by-day trip plan from the details the user gives you.

Rules:
1. Give exactly one entry per day of the trip.
2. Each day needs a short title and 3 to 4 activities.
3. Write each activity as "Morning: ...", "Afternoon: ...", or "Evening: ...".
4. Keep the plan inside the budget the user gave, and say roughly what things cost in rupees.
5. Match the activities to the interests the user picked.
6. Only suggest places that really exist in that destination. Do not invent places.
7. Keep the language simple and friendly.
8. Do not use emojis.

Reply with ONLY this JSON shape:
{
  "summary": "two sentences about the trip",
  "days": [
    { "day": 1, "title": "short title", "activities": ["Morning: ...", "Afternoon: ...", "Evening: ..."] }
  ],
  "tips": ["short tip", "short tip", "short tip"]
}`;

// this function creates a trip plan
const planTrip = async (trip) => {
  // AI readable information (actual user data)
  const tripInfo = `- Destination: ${trip.destination}
- Total Budget: Rs ${trip.budget}
- Number of Days: ${trip.days}
- Number of People: ${trip.people}
- Interests: ${trip.interests.join(", ")}`;

// calling groq, sending request to groq
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b", // AI model that process the prompt and generates the response
    max_tokens: 2000, // this API key runs only 2000 times and after that new key has to be generated, controls the maximum amount of output we allow the model to generate
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: tripInfo },
    ],
  });

  return JSON.parse(completion.choices[0].message.content); // choices[0] means take the first AI generated response and send it to the user. JSON.parse() converts JSON string to JSON object
};

export { planTrip };
