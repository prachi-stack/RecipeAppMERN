import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();

// Middlewares
app.use(express.json());
 app.use(cors({
  origin: 'https://recipeappmernfrontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
// Routes
app.use("/auth", userRouter);
app.use('/recipes', recipesRouter);

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// MongoDB connection
mongoose.connect("mongodb+srv://deopaprachi60:prachi1999@recipeapp.3dhlh.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipeapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
});

app.post('/recipes/variations', async (req, res) => {
    const { recipeData } = req.body;
    if (!recipeData || !recipeData.ingredients || recipeData.ingredients.length === 0) {
        return res.status(400).json({ error: "Ingredients are required." });
    }

    // Prepare the prompt to be sent to Gemini API
    const prompt = `Generate 3 recipes using the following ingredients: ${recipeData.ingredients.join(', ')}. Provide creative variations. Also provide each recipe's cooking minutes. Summarized instructions to cook each recipe in one paragraph. Use only provided ingredients. In instructions, also write the amount of each ingredient you're using. Use easy English words. Recipe names should be short. Prioritize Indian recipes if no indian recipe then any other.`;

    try {
        const result = await model.generateContent(prompt);
        const recipeSuggestions = result.response.text().split('\n').map(recipe => recipe.trim()).filter(Boolean);
        
        // Send back the recipe suggestions
        res.json({ variations: recipeSuggestions });
    } catch (error) {
        console.error("Error generating recipe variations:", error);
        res.status(500).json({ error: "Failed to generate recipe variations" });
    }
});


// Start the server
app.listen(5000, () => console.log("Server started on port 5000"));
