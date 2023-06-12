import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 15,
  },
  radios: {
    marginVertical: 30,
  },
  radiosTitle: {
    marginBottom: 10,
    fontWeight: 700,
    fontSize: 12,
    color: '#ba0f30',
    textTransform: 'uppercase',
  },
  radiosContent: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.6)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  radio: {
    fontWeight: 700,
    fontSize: 12,
    color: '#ba0f30',
    textTransform: 'uppercase',
  },
  label: {
    fontWeight: 700,
    fontSize: 13,
    textTransform: 'uppercase',
  },
});

export default styles;
