import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { selectRecipes, selectBase, add, edit } from '../../store/recipesReducer';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, ScrollView } from 'react-native';
import IconButton from '../../components/IconButton/IconButton';
import TextButton from '../../components/TextButton/TextButton';
import ControlTextField from '../../components/ControlTextField/ControlTextField';

import { generateId } from '../../utils/generateId';

import styles from './styles';

const RecipeForm = ({ route, navigation }) => {
  const id = route.params?.id;
  const action = route.params?.action ?? 'add';
  const isLoad = route.params?.isLoad;

  let recipes = useSelector(selectRecipes);
  let base = useSelector(selectBase);

  const [defaultRecipe, setDefaultRecipe] = useState(null);

  const dispatch = useDispatch();
  const dispatchAdd = (recipe) => dispatch(add(recipe));
  const dispatchEdit = (recipe) => dispatch(edit(recipe));

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
    defaultValues: {
      name: '',
      tags: '',
      country: '',
      countryIcon: '',
      ingredients: '',
      instructions: '',
      img: '',
      video: '',
    },
  });

  useEffect(() => {
    if (action === 'edit') {
      setDefaultRecipe(recipes.find((item) => item.id === id));
    } else if (isLoad) {
      setDefaultRecipe(base.recipe.value);
    }
  }, [action, recipes, id, isLoad, base.recipe.value]);

  useEffect(() => {
    const recipe = { ...defaultRecipe };
    recipe.tags = defaultRecipe?.tags?.join(', ');
    recipe.ingredients = defaultRecipe?.ingredients?.join(', ');
    recipe.instructions = defaultRecipe?.instructions?.join('\n');
    reset(recipe);
  }, [defaultRecipe, reset]);

  const onSubmit = (data) => {
    const recipe = { ...data };
    recipe.tags = data.tags.split(', ');
    recipe.ingredients = data.ingredients.split(', ');
    recipe.instructions = data.instructions.split('\n').filter((line) => line.length);

    recipe.id = action === 'edit' ? id : generateId(recipes, 'id');

    action === 'edit' ? dispatchEdit(recipe) : dispatchAdd(recipe);
    navigation.navigate('Recipe', { id: recipe.id });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${action === 'edit' ? 'Edit' : 'Add'} Recipe`,
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <IconButton icon="leftcircle" onPress={() => navigation.goBack()} />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.content}>
          <ControlTextField
            control={control}
            name="name"
            label="Name"
            isRequired
            maxLength={40}
            error={errors.name}
          />

          <ControlTextField
            control={control}
            name="tags"
            label="Tags"
            isRequired
            maxLength={120}
            error={errors.tags}
            helperText="Divide your tags with commas and spaces: ', '"
          />

          <ControlTextField
            control={control}
            name="country"
            label="Country"
            isRequired
            maxLength={40}
            error={errors.country}
          />

          <ControlTextField
            control={control}
            name="countryIcon"
            label="Country Icon"
            maxLength={120}
            error={errors.countryIcon}
          />

          <ControlTextField
            control={control}
            name="ingredients"
            label="Ingredients"
            isRequired
            maxLength={200}
            error={errors.ingredients}
            helperText="Divide your ingredients with commas and spaces: ', '"
          />

          <ControlTextField
            control={control}
            name="instructions"
            label="Instructions"
            isRequired
            maxLength={2000}
            error={errors.instructions}
            helperText="Start each your instruction from new line"
          />

          <ControlTextField
            control={control}
            name="img"
            label="Image link"
            maxLength={120}
            error={errors.img}
          />

          <ControlTextField
            control={control}
            name="video"
            label="Video link"
            maxLength={120}
            error={errors.video}
          />

          <TextButton onPress={handleSubmit(onSubmit)} btnStyle={{ marginTop: 20 }}>
            {action === 'edit' ? 'Save' : 'Add'} Recipe
          </TextButton>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default RecipeForm;

RecipeForm.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
