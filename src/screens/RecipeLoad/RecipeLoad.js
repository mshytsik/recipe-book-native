import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { selectBase, getBaseGroup, getBaseRecipe } from '../../store/recipesReducer';

import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import IconButton from '../../components/IconButton/IconButton';
import TextButton from '../../components/TextButton/TextButton';

import styles from './styles';

const RecipeLoad = ({ navigation }) => {
  const [groupsData] = useState([
    { value: 'random', label: 'Random meal' },
    { value: 'category', label: 'Category' },
    { value: 'ingredient', label: 'Ingredient' },
    { value: 'country', label: 'Country' },
  ]);

  const [openGroup, setOpenGroup] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openIngredient, setOpenIngredient] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);

  const closePickers = (target) => {
    if (target !== 'group') setOpenGroup(false);
    if (target !== 'category') setOpenCategory(false);
    if (target !== 'ingredient') setOpenIngredient(false);
    if (target !== 'country') setOpenCountry(false);
  };

  let base = useSelector(selectBase);

  const [group, setGroup] = useState('random');
  const [category, setCategory] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (base.groups.category.status === 'loaded') {
      setCategory(base.groups.category.list[0]);
    }
  }, [base.groups.category.status]);

  useEffect(() => {
    if (base.groups.ingredient.status === 'loaded') {
      setIngredient(base.groups.ingredient.list[0]);
    }
  }, [base.groups.ingredient.status]);

  useEffect(() => {
    if (base.groups.country.status === 'loaded') {
      setCountry(base.groups.country.list[0]);
    }
  }, [base.groups.country.status]);

  useEffect(() => {
    if (group !== 'random' && base.groups[group].status !== 'loaded') {
      dispatch(getBaseGroup(group));
    }
  }, [group]);

  const handleSubmit = () => {
    if (group === 'random' || base.groups[group].status === 'loaded') {
      let searchValue;
      switch (group) {
        case 'category':
          searchValue = category;
          break;
        case 'ingredient':
          searchValue = ingredient;
          break;
        case 'country':
          searchValue = country;
          break;
        default:
          searchValue = '';
      }

      dispatch(getBaseRecipe({ group, searchValue }));
      navigation.navigate('Add Recipe', { isLoad: true });
    }
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
        <Text style={styles.pickerLabel}>Search by</Text>
        <DropDownPicker
          value={group}
          items={groupsData}
          open={openGroup}
          setOpen={setOpenGroup}
          onOpen={() => closePickers('group')}
          setValue={setGroup}
          textStyle={{ fontSize: 15 }}
        />
      </View>

      {base.groups.category.status === 'loaded' && group === 'category' && (
        <View style={styles.picker}>
          <Text style={styles.pickerLabel}>Category</Text>
          <DropDownPicker
            value={category}
            items={base.groups.category.list.map((item) => ({ value: item, label: item }))}
            open={openCategory}
            setOpen={setOpenCategory}
            onOpen={() => closePickers('category')}
            setValue={setCategory}
            style={styles.pickerInput}
            textStyle={{ fontSize: 15 }}
          />
        </View>
      )}

      {base.groups.ingredient.status === 'loaded' && group === 'ingredient' && (
        <View style={styles.picker}>
          <Text style={styles.pickerLabel}>Ingredient</Text>
          <DropDownPicker
            value={ingredient}
            items={base.groups.ingredient.list.map((item) => ({ value: item, label: item }))}
            open={openIngredient}
            setOpen={setOpenIngredient}
            onOpen={() => closePickers('ingredient')}
            setValue={setIngredient}
            style={styles.pickerInput}
            textStyle={{ fontSize: 15 }}
          />
        </View>
      )}

      {base.groups.country.status === 'loaded' && group === 'country' && (
        <View style={styles.picker}>
          <Text style={styles.pickerLabel}>Country</Text>
          <DropDownPicker
            value={country}
            items={base.groups.country.list.map((item) => ({ value: item, label: item }))}
            open={openCountry}
            setOpen={setOpenCountry}
            onOpen={() => closePickers('country')}
            setValue={setCountry}
            style={styles.pickerInput}
            textStyle={{ fontSize: 15 }}
          />
        </View>
      )}

      <TextButton onPress={handleSubmit} btnStyle={{ marginTop: 20 }}>
        Load Recipe
      </TextButton>
    </View>
  );
};

export default RecipeLoad;

RecipeLoad.propTypes = {
  navigation: PropTypes.object.isRequired,
};
