import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// Access the API key from the environment variables
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const SPOONACULAR_API_URL = 'https://api.spoonacular.com/recipes/';

const fetchRecipes = async (diet: string, healthGoal: string) => {
  try {
    const response = await axios.get(`${SPOONACULAR_API_URL}complexSearch`, {
      params: {
        diet: diet,
        health: healthGoal,
        number: 5,
        apiKey: SPOONACULAR_API_KEY,
        addRecipeInformation: true // To get more detailed recipe info
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

const DietPlanner: React.FC = () => {
  const [diet, setDiet] = useState<string>('');
  const [healthGoal, setHealthGoal] = useState<string>('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDietChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDiet(e.target.value);
  };

  const handleHealthGoalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHealthGoal(e.target.value);
  };

  const getRecipeSuggestions = async () => {
    if (!diet || !healthGoal) return;
    
    setIsLoading(true);
    const fetchedRecipes = await fetchRecipes(diet, healthGoal);
    setRecipes(fetchedRecipes);
    setIsLoading(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "#ff85a2" },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-300 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center mb-12"
        >
          <motion.h2 
        className="text-pink-700 text-3xl font-bold mb-4"
        style={{ fontFamily: "'DynaPuff', cursive" }} 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >🍴 Let's Plan Your Diet! 🌸</motion.h2>
          <p className="text-pink-500">Discover recipes tailored to your dietary needs</p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Diet Preference Selector */}
          <div className="mb-6">
            <label htmlFor="diet" className="block text-pink-700 font-medium mb-2">
              Diet Preference:
            </label>
            <select
              id="diet"
              value={diet}
              onChange={handleDietChange}
              className="w-full p-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-pink-50 text-pink-800"
            >
              <option value="">Select your diet</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="gluten free">Gluten Free</option>
              <option value="dairy-free">Dairy Free</option>
              <option value="nonvegetarian">Non-vegetarian</option>
              <option value="ketogenic">Ketogenic</option>
            </select>
          </div>

          {/* Health Goal Selector */}
          <div className="mb-6">
            <label htmlFor="healthGoal" className="block text-pink-700 font-medium mb-2">
              Health Goal:
            </label>
            <select
              id="healthGoal"
              value={healthGoal}
              onChange={handleHealthGoalChange}
              className="w-full p-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-pink-50 text-pink-800"
            >
              <option value="">Select your health goal</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="heart-health">Heart Health</option>
              <option value="low-carb">Low Carb</option>
              <option value="low-fat">Low Fat</option>
            </select>
          </div>

          <div className="flex justify-center">
            <motion.button
              onClick={getRecipeSuggestions}
              disabled={!diet || !healthGoal || isLoading}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`px-8 py-3 rounded-full font-medium text-white ${(!diet || !healthGoal) ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-600'}`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                'Get Recipes'
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Displaying fetched recipes */}
        <div className="mb-12">
          <AnimatePresence>
            {recipes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6"
              >
                <h3 className="text-2xl font-bold text-pink-700 mb-4">Suggested Recipes</h3>
                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-6"
                >
                  {recipes.map((recipe) => (
                    <motion.li
                      key={recipe.id}
                      variants={itemVariants}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="md:flex">
                        <div className="md:flex-shrink-0">
                          <img
                            className="h-48 w-full md:w-48 object-cover"
                            src={recipe.image}
                            alt={recipe.title}
                          />
                        </div>
                        <div className="p-6">
                          <div className="uppercase tracking-wide text-sm text-pink-600 font-semibold">
                            {recipe.diets?.join(', ')}
                          </div>
                          <h4 className="mt-1 text-xl font-semibold text-gray-900">{recipe.title}</h4>
                          <p className="mt-2 text-gray-600 line-clamp-3">
                            {recipe.summary?.replace(/<[^>]*>?/gm, '')}
                          </p>
                          <div className="mt-4">
                            <motion.a
                              href={`https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              View Recipe
                              <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                              </svg>
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default DietPlanner;