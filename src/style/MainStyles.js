import { StyleSheet, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const window = Dimensions.get('window');

const MasterStyleSheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',

  },
  modalTouch: {
    backgroundColor: '#635DB7',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  cardStyle: {
    backgroundColor: '#CFCFC4',
  },
  ipadViewLeft: {
    marginTop: 45,
    height: window.height - 50,
  },
  ipadViewRight: {
    marginTop: 55,
    height: window.height - 50,
  },
  iphoneViewTop: {
    marginTop: 60,
    backgroundColor: '#635DB7',
    height: window.height / 1.75,

  },
  iphoneViewBottom: {
    backgroundColor: '#00CE9F',
  },
  iphoneViewBottomList: {
    right: 100,
  },
  mainList: {
    height: window.height - window.height + 80,
  },
  mainListView: {
    top: window.height - window.height + 45,
  },
  customersListView: {
    top: 10,
  },
  customersListContainer: {
    flex: 1,
  },
  list: {
    marginTop: 45,
  },
  iPhoneListScroll: {
    marginTop: 60,
  },
  customersListItem: {
    height: 90,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',

  },
  logo: {
    width: 400,
    height: 400,
    marginLeft: 120,
  },
  modalIcon: {
    marginTop: 20,
    right: DeviceInfo.isTablet() ? 660 : window.width / 2.3,
  },
  modalView: {
    marginTop: 10,
  },
  modalFolloupView: {
    marginTop: 10,
  },
  modalFolloupScrollView: {
    marginTop: 10,
  },
  mainButtonStyle: {
    borderRadius: 15,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 7,
    backgroundColor: '#779ECB',

  },
  pricingCardView: {
    width: 260,
    borderColor: 'gray',
    borderWidth: 1,
  },
  customerCardMap: {
    backgroundColor: '#CFCFC4',
    height: 210,
    width: window.width - 800,
  },
  constacCustomerContainerOne: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  constacCustomerContainerTwo: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surveyItemContainer: {
    marginTop: 5,
    margin: 20,
    height: DeviceInfo.isTablet() ? 660 : 300,
  },
  surveyMainPicker: {
    top: 50,
    marginTop: 20,
  },
  surveyResultsTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surveyDetailsList: {
    marginTop: 120,
  },
  surveyMainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  surveyMainContainer: {
    top: 25,
    position: 'absolute',
    flexDirection: 'row',
    marginLeft: window.width - window.width + 60,

  },
  surveyMainButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 80,
    right: DeviceInfo.isTablet() ? 0 : 175,
    left: DeviceInfo.isTablet() ? 10 : null,
  },
  surveyCardTextInput: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 250,
    borderColor: 'gray',
    borderWidth: 2,
  },
  surveyCardPhoto: {
    flex: 1,
  },
  surveyCardPicker: {
    bottom: -10,
  },
  surveyCardPickerItem: {
    fontSize: 15,
  },
  surveyNotesInputContainer: {
    width: 300,

  },
  surveyNotesInputText: {
    height: 90,
    width: DeviceInfo.isTablet() ? 600 : 300,
    borderColor: 'gray',
    borderWidth: 2,
    alignItems: 'center',
    padding: 4,

  },
  surveyNotesModalCard: {
    backgroundColor: '#FFFF66',
    alignItems: 'center',
    marginTop: 20,
    height: DeviceInfo.isTablet() ? window.height / 3.25 : window.height / 1.56,
    width: DeviceInfo.isTablet() ? window.width / 2 : window.width - 20,
  },
  surveyPhotoModalCard: {
    backgroundColor: '#FFFF66',
    alignItems: 'center',
    marginTop: 20,
    height: DeviceInfo.isTablet() ? window.height / 3.25 : window.height / 1.56,
    width: DeviceInfo.isTablet() ? window.width / 2 : window.width - 20,
  },
  surveyNotesModal: {
    alignItems: 'center',
    height: DeviceInfo.isTablet() ? window.height / 2.3 : window.height / 1.60,
    top: 50,
    width: DeviceInfo.isTablet() ? window.width / 2 : window.width - 20,
  },
  surveyPhotoModal: {
    alignItems: 'center',
    height: DeviceInfo.isTablet() ? window.height / 2 : window.height / 1.50,
    top: 50,
    width: DeviceInfo.isTablet() ? window.width / 2 : window.width - 20,
  },
  surveyResultPhotosView: {
    flex: 1,
    alignItems: 'center',
    marginRight: 1,
    marginBottom: 100,
  },
  surveyResultsButton: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    bottom: 56,
    width: window.width,
    right: 1,
  },
  surveyResultPricingView: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 4,
    margin: 20,
  },
  surveyResultInsideView: {
  },
  surveyResultsText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  surveyResultPhotos: {
    width: DeviceInfo.isTablet() ? window.width / 2 : window.width / 1.1,
    height: DeviceInfo.isTablet() ? window.height / 2 : 300,
  },
  surveyResultsNotes: {
    width: DeviceInfo.isTablet() ? window.width / 3 : window.width / 1.1,
    height: DeviceInfo.isTablet() ? window.height / 3 : window.height / 4,
  },
  surveyResultsNotesView: {},
  CustomerCardNotesButton: {
    padding: 10,
    margin: 4,
  },

  EstimatePriceModal: {
    alignItems: 'center',
    height: DeviceInfo.isTablet() ? window.height / 2.9 : window.height / 1.60,
    width: DeviceInfo.isTablet() ? window.width / 2 : window.width - 20,
  },
  AutoComplete: {},
  EstimateModalColLeft: {
    height: window.height - 55,
  },
  EstimateModalColRight: {
    height: window.height - 55,
  },
  EstimatePreviewCard: {
    flex: 1,
    bottom: 20,
    marginTop: 40,
  },
  PricingCard: {
    position: 'absolute',
    width: window.width / 2.1,
    alignSelf: 'center',
  },
  addEstimateButton: {
    bottom: 20,
    margin: 2,
  },
  EstimateMainSwipe: {
    marginBottom: 119,
  },
  EstimateGenerics: {
    flex: 1,
    position: 'absolute',
    top: 300,
    height: 210,

  },
});

export {
  MasterStyleSheet,
};


/*

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 25,
    right: DeviceInfo.isTablet() ? 0 : null,
    left: DeviceInfo.isTablet() ? 10 : null,
*/
