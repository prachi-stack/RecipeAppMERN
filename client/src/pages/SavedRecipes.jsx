import React, { useEffect, useState } from "react";
import { getUserIDFromToken } from '../hooks/getUserIDFromToken';
import axios from "axios";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = getUserIDFromToken();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipeappmernbackend.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  return (
    <div className="min-h-screen py-[8rem] bg-gradient-to-r from-gray-400 to-gray-800 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 font-mono">Saved Recipes</h1>
      <div className=" xs:mx-[4rem] sm:mx-[5rem] md:mx-[3rem] lg:mx-[9rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-[5rem]">
        {savedRecipes.map((recipe) => (
          <div key={recipe._id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="rounded-t-lg object-cover h-48 w-full mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{recipe.name}</h2>
            <div className="ingredients text-gray-600 mb-4">
              <h4 className="font-medium text-lg">Ingredients:</h4>
              <p className="text-sm">{recipe.ingredients.join(', ')}</p>
            </div>
            <div className="instructions text-gray-600 mb-4">
              <h4 className="font-medium text-lg">Instructions:</h4>
              <p className="text-sm">{recipe.instructions}</p>
            </div>
            <p className="text-gray-600 mb-4">Cooking Time: {recipe.cookingTime} minutes</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRecipes;
