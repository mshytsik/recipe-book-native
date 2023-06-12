import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { View, Text } from 'react-native';
import { TextInput, RadioButton } from 'react-native-paper';
import IconButton from '../../components/IconButton/IconButton';
import TextButton from '../../components/TextButton/TextButton';

import styles from './styles';

const RecipesSearch = ({ route, navigation }) => {
  const [value, setValue] = useState(route.params.search.value);
  const [type, setType] = useState(route.params.search.type ?? 'name');

  const handleSubmit = () => {
    if (value) {
      navigation.navigate('Recipes Book', { search: { value, type } });
    } else {
      handleReset();
    }
  };

  const handleReset = () => {
    navigation.navigate('Recipes Book', { search: { value: '', type: 'name' } });
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
      <TextInput
        value={value}
        onChangeText={(value) => setValue(value)}
        mode="outlined"
        label="Search"
        maxLength={200}
      />

      <View style={styles.radios}>
        <Text style={styles.radiosTitle}>Search in</Text>
        <View style={styles.radiosContent}>
          <RadioButton.Group onValueChange={(value) => setType(value)} value={type}>
            <RadioButton.Item
              label="Names"
              value="name"
              labelStyle={styles.label}
              style={styles.radio}
            />
            <RadioButton.Item
              label="Tags"
              value="tag"
              labelStyle={styles.label}
              style={styles.radio}
            />
            <RadioButton.Item
              label="Country"
              value="country"
              labelStyle={styles.label}
              style={styles.radio}
            />
          </RadioButton.Group>
        </View>
      </View>

      <TextButton onPress={handleSubmit}>Search</TextButton>

      {route.params.search.value && (
        <TextButton onPress={handleReset} btnStyle={{ marginTop: 15, backgroundColor: '#4c4799' }}>
          Reset
        </TextButton>
      )}
    </View>
  );
};

export default RecipesSearch;

RecipesSearch.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
