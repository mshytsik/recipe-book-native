import React, { useState, useEffect } from 'react';
import { useDrawerStatus } from '@react-navigation/drawer';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { selectRecipes, selectRecipesStatus } from '../../store/recipesReducer';

import { View, FlatList, Text } from 'react-native';
import IconButton from '../../components/IconButton/IconButton';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

import styles from './styles';

const Recipes = ({ route, navigation }) => {
  const [search, setSearch] = useState({ value: '', type: 'name' });

  useEffect(() => {
    if (route.params?.search) {
      setSearch({ value: route.params.search.value, type: route.params.search.type });
    }
  }, [route.params?.search]);

  const [filter, setFilter] = useState({ names: [], tags: [], countries: [] });

  useEffect(() => {
    if (route.params?.filter) {
      setFilter({
        names: route.params.filter.names,
        tags: route.params.filter.tags,
        countries: route.params.filter.countries,
      });
    }
  }, [route.params?.filter]);

  const inNames = (recipe) => !filter.names.length || filter.names.includes(recipe.name);

  const inTags = (recipe) =>
    !filter.tags.length || !recipe.tags.every((tag) => !filter.tags.includes(tag));

  const inCountries = (recipe) =>
    !filter.countries.length || filter.countries.includes(recipe.country);

  const inSearch = (recipe) => {
    if (search.value) {
      if (search.type === 'name' || search.type === 'country') {
        return recipe[search.type].toLowerCase().includes(search.value.toLowerCase());
      } else if (search.type === 'tag') {
        return !recipe.tags.every((tag) => !tag.toLowerCase().includes(search.value.toLowerCase()));
      }
    }
    return true;
  };

  const recipesStatus = useSelector(selectRecipesStatus);
  let recipes = useSelector(selectRecipes);

  if (search.value || filter.names.length || filter.tags.length || filter.countries.length) {
    recipes = recipes.filter(
      (recipe) => inNames(recipe) && inTags(recipe) && inCountries(recipe) && inSearch(recipe)
    );
  }

  const isMenuOpen = useDrawerStatus() === 'open';

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <IconButton
            icon={isMenuOpen ? 'menu-unfold' : 'menu-fold'}
            onPress={() => navigation.openDrawer()}
          />
        </View>
      ),
      headerRight: () => (
        <View style={styles.nav}>
          <IconButton
            icon="filter"
            isActive={filter.names.length + filter.tags.length + filter.countries.length > 0}
            onPress={() => {
              navigation.navigate('Recipes Filter', { filter });
            }}
          />
          <IconButton
            icon="search1"
            isActive={search.value.length > 0}
            onPress={() => {
              navigation.navigate('Recipes Search', { search });
            }}
          />
        </View>
      ),
    });
  }, [navigation, isMenuOpen, search, filter]);

  return (
    recipesStatus === 'loaded' &&
    (recipes.length ? (
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard recipe={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    ) : (
      <View style={styles.container}>
        <Text style={styles.message}>No recipes found :(</Text>
      </View>
    ))
  );
};

export default Recipes;

Recipes.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
