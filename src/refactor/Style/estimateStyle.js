import { StyleSheet, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const window = Dimensions.get('window');

const estimateStyles = StyleSheet.create({
  estimateAddPriceView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  estimateAddPriceButton: {
    width: window.width / 6,
    margin: 2,
  },
  priceInputView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceDescription: {
    padding: 5,
    margin: 20,
    alignSelf: 'center',
    fontSize: 16,
    width: window.width / 3,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 50,
    marginTop: 10,
  },
  pricePrice: {
    alignSelf: 'center',
    padding: 5,
    height: 50,
    fontSize: 38,
    width: window.width / 4,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 50,
    marginBottom: 20,
  },
  surveyResultPhotosView: {
    flex: 1, 
    marginTop: 100,
    marginLeft: 30,
    backgroundColor: '#CFCFC4',
    alignItems: 'center',
  },
  priceCard: {
    width: window.width / 2.3,
    alignSelf: 'center',

  }
});


export  { estimateStyles } ;
