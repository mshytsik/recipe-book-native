import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { selectRecipes } from '../../store/recipesReducer';

import { View, ScrollView, Text, ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';
import IconButton from '../../components/IconButton/IconButton';
import RemoveModal from '../../components/RemoveModal/RemoveModal';

import noImage from '../../../assets/no-image.jpg';
import styles from './styles';

const Recipe = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <IconButton icon="leftcircle" onPress={() => navigation.navigate('Recipes Book')} />
        </View>
      ),
      headerRight: () => (
        <View style={styles.nav}>
          <IconButton
            icon="edit"
            onPress={() =>
              navigation.navigate('Add Recipe', { id: route.params.id, action: 'edit' })
            }
          />
          <IconButton icon="delete" onPress={() => setModalVisible(true)} />
        </View>
      ),
    });
  }, [navigation]);

  let recipes = useSelector(selectRecipes);
  const recipe = recipes.find((recipe) => recipe.id === route.params.id);

  return (
    <>
      {recipe && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground source={recipe.img ? { uri: recipe.img } : noImage} style={styles.image}>
            {recipe.name && (
              <View style={styles.name}>
                <Text style={styles.nameText}>{recipe.name}</Text>
              </View>
            )}
          </ImageBackground>

          <View style={styles.container}>
            <View style={styles.meta}>
              {recipe.tags && (
                <Text style={styles.list}>
                  Tags: <Text style={styles.highlight}>{recipe.tags.join(', ')}</Text>
                </Text>
              )}

              {recipe.country && (
                <View style={styles.country}>
                  <Text style={styles.list}>
                    Cuisine:{' '}
                    <Text style={[styles.highlight, { color: '#ba0f30' }]}>{recipe.country}</Text>
                  </Text>
                  {recipe.countryIcon && (
                    <ImageBackground
                      source={{ uri: recipe.countryIcon }}
                      style={styles.countryIcon}
                    />
                  )}
                </View>
              )}

              {recipe.ingredients && (
                <Text style={styles.list}>
                  Ingredients: <Text style={styles.highlight}>{recipe.ingredients.join(', ')}</Text>
                </Text>
              )}
            </View>

            {recipe.instructions && (
              <>
                <View style={styles.subtitle}>
                  <Text style={styles.subtitleText}>Instructions</Text>
                </View>
                <View style={styles.instructions}>
                  {recipe.instructions.map((item, index) => {
                    return (
                      <Text style={styles.step} key={index}>
                        <Text style={[styles.highlight, { fontSize: 18, color: '#ba0f30' }]}>{`${index + 1
                          }.`}</Text>{' '}
                        {item}
                      </Text>
                    );
                  })}
                </View>
              </>
            )}

            {recipe.video && (
              <>
                <View style={styles.subtitle}>
                  <Text style={styles.subtitleText}>Video</Text>
                </View>
                <View style={styles.video}>
                  <WebView
                    source={{ uri: recipe.video }}
                    javaScriptEnabled={true}
                    style={{ flex: 1, width: '100%', height: 200 }}
                  />
                </View>
              </>
            )}
          </View>
        </ScrollView>
      )}

      <RemoveModal
        route={route}
        navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default Recipe;

Recipe.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
