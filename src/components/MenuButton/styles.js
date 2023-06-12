import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },
  button: {
    flexDirection: 'row',
    flexGrow: 1,
    gap: 15,
    alignItems: 'center',
  },
  text: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 20,
    textTransform: 'uppercase',
  },
});

export default styles;
