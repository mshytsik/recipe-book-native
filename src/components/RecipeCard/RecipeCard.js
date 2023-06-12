import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';

import noImage from '../../../assets/no-image.jpg';
import styles from './styles';

const RecipeCard = ({ recipe, navigation }) => {
  const navigateToRecipe = () => navigation.navigate('Recipe', { id: recipe.id });

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToRecipe}>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          {recipe.name && <Text style={styles.name}>{recipe.name}</Text>}
          {recipe.tags && (
            <Text style={styles.tags}>
              Tags: <Text style={styles.highlight}>{recipe.tags.join(', ')}</Text>
            </Text>
          )}
          {recipe.country && (
            <View style={styles.country}>
              <Text style={styles.countryName}>
                Cuisine:{' '}
                <Text style={[styles.highlight, { color: '#ba0f30' }]}>{recipe.country}</Text>
              </Text>
              {recipe.countryIcon && (
                <ImageBackground source={{ uri: recipe.countryIcon }} style={styles.countryIcon} />
              )}
            </View>
          )}
        </View>

        <ImageBackground source={recipe.img ? { uri: recipe.img } : noImage} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    country: PropTypes.string.isRequired,
    countryIcon: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
    img: PropTypes.string,
    video: PropTypes.string,
  }),
  navigation: PropTypes.object.isRequired,
};
