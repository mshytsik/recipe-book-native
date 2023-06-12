import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  nav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginRight: 15,
  },
  image: {
    width: '100%',
    height: 300,
  },
  name: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    padding: 15,
  },
  nameText: {
    marginTop: 'auto',
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 36,
    color: '#ffffff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 30,
  },
  meta: {
    flex: 1,
    flexDirection: 'column',
    gap: 5,
  },
  list: {
    fontSize: 16,
    lineHeight: 20,
  },
  highlight: {
    fontWeight: 700,
  },
  country: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryIcon: {
    width: 40,
    height: 40,
    marginLeft: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  subtitle: {
    width: '100%',
    marginTop: 30,
    paddingBottom: 5,
    marginBottom: 15,
    borderBottomWidth: 2,
    borderColor: '#ba0f30',
  },
  subtitleText: {
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 24,
    color: '#ba0f30',
  },
  instructions: {
    flexDirection: 'column',
    gap: 20,
  },
  step: {
    fontSize: 16,
    lineHeight: 20,
  },
});

export default styles;
