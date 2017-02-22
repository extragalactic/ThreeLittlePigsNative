import { StyleSheet, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const window = Dimensions.get('window');

const MasterStyleSheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

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
    right: DeviceInfo.isTablet() ? 660 : 180,
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
    backgroundColor: '#779ECB'

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
  surveyMainView: {
    marginTop: 0,
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
  surveyMainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 25,
    right: DeviceInfo.isTablet() ? 0 : 75,
    left: DeviceInfo.isTablet() ? 10 : null,
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
    fontSize: 32,
  },
  surveyResultInsideView: {
  },
  surveyResultsText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  surveyResultPhotos: {
    width: DeviceInfo.isTablet() ? window.width / 1.4 : 300,
    height: DeviceInfo.isTablet() ? window.height / 1.4 : 300,
  },
  CustomerCardNotesButton: {
    padding: 10,
    margin: 4,
  },
});

export {
  MasterStyleSheet,
}
