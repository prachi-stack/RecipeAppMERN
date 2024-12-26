import { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getUserIDFromToken } from '../hooks/getUserIDFromToken';

const CreateRecipe = () => {
    const userID = getUserIDFromToken();
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: "",  // Change to a string for ingredients
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const [suggestedRecipes, setSuggestedRecipes] = useState([]);  // To store suggested recipes from Gemini API

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        // Validate required fields
        if (!recipe.name || !recipe.ingredients || !recipe.instructions || !recipe.imageUrl || recipe.cookingTime <= 0) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await axios.post("https://recipeappmernbackend.onrender.com/recipe", recipe);
            console.log("Recipe created:", response.data);
            alert("Recipe created successfully!");
            navigate("/"); 
        } catch (err) {
            console.error("Error creating recipe:", err);
        }
    };

    // Function to get recipes using Gemini AI
    const getSuggestedRecipes = async () => {
        if (!recipe.ingredients) {
            alert("Please add some ingredients first.");
            return;
        }

        try {
            // Send ingredients as a comma-separated string
            const response = await axios.post("https://recipeappmernbackend.onrender.com/recipes/variations", {
                recipeData: {
                    ingredients: recipe.ingredients.split(',').map(ingredient => ingredient.trim())  // Split and trim ingredients
                }
            });
            setSuggestedRecipes(response.data.variations); // Set the suggested recipes in state
        } catch (err) {
            console.error("Error fetching recipe suggestions:", err);
            alert("Failed to fetch recipe suggestions.");
        }
    };

    return (
        <div className="min-h-screen py-[8rem] flex items-center justify-center bg-gradient-to-r from-green-200 to-green-900 px-[2rem] sm:px- ">
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md max-w-[30%] md:max-w-[50%]">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8 font-poppins">Create a New Recipe</h2>
                <form className="space-y-6" onSubmit={onSubmit}>
                    {/* Recipe Name */}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-lg text-gray-800 mb-2">Recipe Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={recipe.name}
                            onChange={handleChange}
                            className="px-4 py-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                            required
                        />
                    </div>

                    {/* Ingredients */}
                    <div className="flex flex-col">
                        <label htmlFor="ingredients" className="text-lg text-gray-800 mb-2">Ingredients</label>
                        <textarea
                            id="ingredients"
                            name="ingredients"
                            value={recipe.ingredients}
                            onChange={handleChange}
                            className="px-4 py-3 mb-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                            placeholder="eg. potato, curd, tomato"
                            rows="3"
                        />
                    </div>

                    {/* Instructions */}
                    <div className="flex flex-col">
                        <label htmlFor="instructions" className="text-lg text-gray-800 mb-2">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            value={recipe.instructions}
                            onChange={handleChange}
                            className="px-4 py-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                            rows="5"
                            required
                        ></textarea>
                    </div>

                    {/* Image URL */}
                    <div className="flex flex-col">
                        <label htmlFor="imageUrl" className="text-lg text-gray-800 mb-2">Image URL</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={recipe.imageUrl}
                            onChange={handleChange}
                            className="px-4 py-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                            required
                        />
                    </div>

                    {/* Cooking Time */}
                    <div className="flex flex-col">
                        <label htmlFor="cookingTime" className="text-lg text-gray-800 mb-2">Cooking Time (minutes)</label>
                        <input
                            type="number"
                            id="cookingTime"
                            name="cookingTime"
                            value={recipe.cookingTime}
                            onChange={handleChange}
                            className="px-4 py-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                        >
                            Create Recipe
                        </button>
                    </div>
                </form>

                {/* Get Recipe Suggestions Button */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={getSuggestedRecipes}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition"
                    >
                        Get Recipe Suggestions
                    </button>
                </div>

                {/* Suggested Recipes */}
                <div className="mt-8">
                    {suggestedRecipes.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Suggested Recipes</h3>
                            <ul className="space-y-4">
                                {suggestedRecipes.map((recipe, idx) => (
                                    <li key={idx} className="p-4 bg-gray-100 rounded-md shadow-md">
                                        <h4 className="text-xl font-semibold text-gray-700">{recipe}</h4>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateRecipe;
