import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    minHeight: 120,
    borderWidth: 2,
    borderColor: '#ba0f30',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardBody: {
    flex: 1,
    padding: 10,
  },
  name: {
    marginBottom: 'auto',
    paddingBottom: 10,
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 24,
    color: '#ba0f30',
  },
  tags: {
    fontSize: 13,
    lineHeight: 16,
  },
  highlight: {
    fontWeight: 700,
  },
  country: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryName: {
    fontSize: 13,
    lineHeight: 16,
  },
  countryIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    flexShrink: 0,
    width: 120,
    height: '100%',
  },
});

export default styles;
