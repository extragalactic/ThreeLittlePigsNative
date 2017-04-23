import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const surveyStyles = StyleSheet.create({
  standardView: {
    flex: 1,
    marginTop: 65,
    justifyContent: 'flex-start',
  },
  customersListItem: {
    height: 90,
    bottom: 10,
    backgroundColor: '#FFFFFF',
  },
});


export default surveyStyles;
