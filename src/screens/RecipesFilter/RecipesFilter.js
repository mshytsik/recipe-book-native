import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import IconButton from '../../components/IconButton/IconButton';
import TextButton from '../../components/TextButton/TextButton';

import styles from './styles';

const RecipesFilter = ({ route, navigation }) => {
  const pickerNames = useSelector((state) => {
    const uniqueNames = new Set(state.recipes.list.map((recipe) => recipe.name));
    return Array.from(uniqueNames);
  });

  const pickerTags = useSelector((state) => {
    const allTags = state.recipes.list.reduce((tags, recipe) => tags.concat(recipe.tags), []);
    const uniqueTags = new Set(allTags);
    return Array.from(uniqueTags);
  });

  const pickerCountries = useSelector((state) => {
    const uniqueCountries = new Set(state.recipes.list.map((recipe) => recipe.country));
    return Array.from(uniqueCountries);
  });

  const [openNames, setOpenNames] = useState(false);
  const [openTags, setOpenTags] = useState(false);
  const [openCountries, setOpenCountries] = useState(false);

  const closePickers = (target) => {
    if (target !== 'names') setOpenNames(false);
    if (target !== 'tags') setOpenTags(false);
    if (target !== 'countries') setOpenCountries(false);
  };

  const [names, setNames] = useState(route.params.filter.names);
  const [tags, setTags] = useState(route.params.filter.tags);
  const [countries, setCountries] = useState(route.params.filter.countries);

  const handleSubmit = () => {
    navigation.navigate('Recipes Book', { filter: { names, tags, countries } });
  };

  const handleReset = () => {
    navigation.navigate('Recipes Book', { filter: { names: [], tags: [], countries: [] } });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <IconButton icon="leftcircle" onPress={() => navigation.goBack()} />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={[styles.picker, { zIndex: 20 }]}>
        <Text style={styles.pickerTitle}>Filter by names</Text>
        <DropDownPicker
          value={names}
          items={pickerNames.map((item) => ({ value: item, label: item }))}
          open={openNames}
          setOpen={setOpenNames}
          onOpen={() => closePickers('names')}
          setValue={setNames}
          multiple={true}
          textStyle={{ fontSize: 15 }}
        />
      </View>

      <View style={[styles.picker, { zIndex: 15 }]}>
        <Text style={styles.pickerTitle}>Filter by tags</Text>
        <DropDownPicker
          value={tags}
          items={pickerTags.map((item) => ({ value: item, label: item }))}
          open={openTags}
          setOpen={setOpenTags}
          onOpen={() => closePickers('tags')}
          setValue={setTags}
          multiple={true}
          textStyle={{ fontSize: 15 }}
        />
      </View>

      <View style={[styles.picker, { zIndex: 10 }]}>
        <Text style={styles.pickerTitle}>Filter by countries</Text>
        <DropDownPicker
          value={countries}
          items={pickerCountries.map((item) => ({ value: item, label: item }))}
          open={openCountries}
          setOpen={setOpenCountries}
          onOpen={() => closePickers('countries')}
          setValue={setCountries}
          multiple={true}
          textStyle={{ fontSize: 15 }}
        />
      </View>

      <TextButton onPress={handleSubmit} btnStyle={{ marginTop: 30 }}>
        Filter
      </TextButton>

      {route.params.filter.names.length +
        route.params.filter.tags.length +
        route.params.filter.countries.length >
        0 && (
          <TextButton onPress={handleReset} btnStyle={{ marginTop: 15, backgroundColor: '#4c4799' }}>
            Reset
          </TextButton>
        )}
    </View>
  );
};

export default RecipesFilter;

RecipesFilter.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
