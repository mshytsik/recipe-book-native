import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useSelector, useDispatch } from 'react-redux';
import { selectRecipes, setRecipes } from '../store/recipesReducer';

import { updateStorageList } from '../utils/storage';

import Recipes from '../screens/Recipes/Recipes';
import Recipe from '../screens/Recipe/Recipe';
import RecipeForm from '../screens/RecipeForm/RecipeForm';
import RecipeLoad from '../screens/RecipeLoad/RecipeLoad';
import RecipesSearch from '../screens/RecipesSearch/RecipesSearch';
import RecipesFilter from '../screens/RecipesFilter/RecipesFilter';

const Stack = createStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRecipes('recipes'));
  }, []);

  let recipes = useSelector(selectRecipes);

  useEffect(() => {
    updateStorageList('recipes', recipes);
  }, [recipes]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#ba0f30' },
        headerTitleStyle: {
          fontWeight: '700',
          color: '#ffffff',
          textAlign: 'center',
          textTransform: 'uppercase',
        },
      }}
    >
      <Stack.Screen name="Recipes Book" component={Recipes} />
      <Stack.Screen name="Recipe" component={Recipe} />
      <Stack.Screen name="Add Recipe" component={RecipeForm} />
      <Stack.Screen name="Load Recipe" component={RecipeLoad} />
      <Stack.Screen name="Recipes Search" component={RecipesSearch} />
      <Stack.Screen name="Recipes Filter" component={RecipesFilter} />
    </Stack.Navigator>
  );
};

export default Navigation;
