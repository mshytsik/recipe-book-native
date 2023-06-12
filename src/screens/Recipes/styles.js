import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  nav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginRight: 15,
  },
  contentContainer: {
    padding: 15,
    gap: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginBottom: 60,
    fontWeight: 700,
    fontSize: 24,
    color: '#ba0f30',
    textAlign: 'center',
  },
});

export default styles;
