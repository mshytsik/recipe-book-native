import AsyncStorage from '@react-native-async-storage/async-storage';
import recipes from '../mocks/recipes';

export const getStorageList = async (name) => {
  let values = await AsyncStorage.getItem(name);
  if (values == null) {
    return recipes;
  }

  values = JSON.parse(values);
  return Array.isArray(values) ? values : [];
};

export const updateStorageList = async (name, data) => {
  await AsyncStorage.setItem(name, JSON.stringify(data));
};
