import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserIDFromToken } from '../hooks/getUserIDFromToken';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = getUserIDFromToken();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://recipeappmernbackend.onrender.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipeappmernbackend.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://recipeappmernbackend.onrender.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="min-h-screen py-[8rem] bg-gradient-to-r from-orange-900 to-orange-200 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-[4rem] font-mono">Recipes Created By All Users</h1>
      <div className="xs:mx-[4rem] sm:mx-[5rem] md:mx-[3rem] lg:mx-[9rem] grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-[5rem]">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col sm:mx-[4rem] md:mx-auto">
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="rounded-t-lg object-cover h-48 w-full mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{recipe.name}</h2>
            <div className="ingredients text-gray-600 mb-4">
              <h4 className="font-medium text-lg">Ingredients:</h4>
              <p className="text-sm">{recipe.ingredients.join(', ')}</p> {/* Display ingredients as string */}
            </div>
            <div className="instructions text-gray-600 mb-4">
              <h4 className="font-medium text-lg">Instructions:</h4>
              <p className="text-sm">{recipe.instructions}</p>
            </div>
            <p className="text-gray-600 mb-4">Cooking Time: {recipe.cookingTime} minutes</p>
            <button
              onClick={() => saveRecipe(recipe._id)}
              disabled={isRecipeSaved(recipe._id)}
              className={`px-6 py-2 text-white font-medium rounded-lg transition duration-300 ${
                isRecipeSaved(recipe._id)
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
