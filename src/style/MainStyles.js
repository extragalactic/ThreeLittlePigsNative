import { StyleSheet, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const window = Dimensions.get('window');

const MasterStyleSheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

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
  CustomerCardNotesTextInput: {
    height: 80,
    width: 260,
    borderColor: 'gray',
    padding: 1,
    borderWidth: 2,
  },
  CustomerCardNotesButton: {
    padding: 10,
    margin: 4,
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
    height: 200,
  },
  surveyNotesModal: {
    height: 650,
    top: 50,
  },
  surveyMainView: {
    marginTop: 0,
  },
  surveyMainPicker: {
    top: 50,
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
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  surveyNotesInputText: {
    left: 0,
    right: 0,
    height: 80,
    width: 250,
    borderColor: 'gray',
    borderWidth: 2,
  },

});

export {
  MasterStyleSheet,
}
