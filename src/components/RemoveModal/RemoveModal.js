import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { remove } from '../../store/recipesReducer';

import { View, Text, Modal } from 'react-native';
import TextButton from '../TextButton/TextButton';

import styles from './styles';

const RemoveModal = ({ route, navigation, modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();
  const dispatchRemove = (recipe) => dispatch(remove(recipe));

  const handleRemove = () => {
    dispatchRemove(Number(route.params.id));
    setModalVisible(false);
    navigation.navigate('Recipes Book');
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.content}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>Are you sure?</Text>
            <View style={styles.buttonWrap}>
              <TextButton onPress={() => setModalVisible(false)} btnStyle={styles.button}>
                No
              </TextButton>
              <TextButton
                onPress={handleRemove}
                btnStyle={{ ...styles.button, backgroundColor: '#20983e' }}
              >
                Yes
              </TextButton>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RemoveModal;

RemoveModal.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};
