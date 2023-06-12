import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  picker: {
    width: '100%',
    marginBottom: 10,
    zIndex: 10,
    zIndexInverse: 20,
  },
  pickerLabel: {
    marginBottom: 5,
    fontWeight: 700,
    fontSize: 12,
    color: '#ba0f30',
    textTransform: 'uppercase',
  },
});

export default styles;
