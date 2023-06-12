import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modal: {
    margin: 20,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 40,
    backgroundColor: '#ffffff',
  },
  modalText: {
    marginBottom: 25,
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 32,
    color: '#ba0f30',
    textAlign: 'center',
  },
  buttonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    width: 100,
    paddingVertical: 10,
  },
});

export default styles;
