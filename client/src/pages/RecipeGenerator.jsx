import React, { useState } from 'react';
import axios from 'axios';

const RecipeGenerator = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipe, setRecipe] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle the change in the ingredients input field
    const handleIngredientsChange = (e) => {
        setIngredients(e.target.value);
    };

    // Function to generate the recipe by sending ingredients to the backend
    const generateRecipe = async () => {
        if (!ingredients) {
            alert('Please enter ingredients');
            return;
        }

        setLoading(true);
        setError('');
        setRecipe('');

        try {
            // Send a POST request to the backend with the ingredients
            const response = await axios.post('https://recipeappmernbackend.onrender.com/generate-recipe', {
                ingredients: ingredients.split(',').map(item => item.trim()) // Split and trim ingredients
            });

            // Set the generated recipe in the state
            setRecipe(response.data.recipe);
        } catch (err) {
            // Handle errors
            setError('Error generating recipe. Please try again.');
        } finally {
            // Stop loading state
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Recipe Generator</h1>
            <div>
                <label>
                    Enter ingredients (separate by commas):
                    <input
                        type="text"
                        value={ingredients}
                        onChange={handleIngredientsChange}
                        placeholder="e.g., eggs, flour, milk"
                    />
                </label>
            </div>
            <button onClick={generateRecipe} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Recipe'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {recipe && (
                <div>
                    <h2>Generated Recipe:</h2>
                    <p>{recipe}</p>
                </div>
            )}
        </div>
    );
};

export default RecipeGenerator;
