import React, { Component } from 'react';
import {
  ScrollView,
  View,
  AlertIOS,
  Linking,
  Text,
  ActivityIndicator,
} from 'react-native';
import Drawer from 'react-native-drawer';
import { graphql, compose } from 'react-apollo';

import RNCalendarEvents from '../../node_modules/react-native-calendar-events/index.ios';

import CustomerCardConact from './Cards/customerCardConact';
import CustomerCardChat from './Cards/customerCardChat';
import CustomerCardMaps from './Cards/customerCardMaps';
import CustomerCardSurvey from './Cards/customerCardSurvey';
import SurveyCompleteModal from './Modals/customerSurveyCompleteModal';
import ContactCustomerMenu from './contactCustomerMenu';
import CustomerFollowupModal from './Modals/customerFollowupModal';
import CustomerFormModal from './Modals/customerFormModal';
import CustomerNotesModal from './Modals/customerNotesModal';
import SurveyMainModal from './Surveys/surveyMainModal';
import { MasterStyleSheet } from '../style/MainStyles';
import { getFinishedSurvey,
   toggleSurveyReady,
   submitFollowup,
   getAppointmentsforDay,
   updateCustomer,
   addNotes,
   deleteAppointment,
   getCustomer,
  } from '../graphql/mutations';
import { getMyCustomer } from '../graphql/queries';

const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60000);

class _CustomerDetails extends Component {
  constructor() {
    super();
    this.state = {
      customer: {},
      drawer: false,
      followModal: false,
      formModal: false,
      formCompleteModal: false,
      notesModal: false,
      surveyModal: false,
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
      selectedIndex: 'Followup',
      dateSelection: [],
      notes: '',
      change: false,
      currentLocation: {},
      messages: [],
      finishedSurvey: [],
      ready: false,
    };
  }
  onDateChange = (date) => {
    console.log(date);
    this.setState({ date });
    this.props.getAppointmentsforDay({ variables: {
      userid: this.props.id,
      date,
    } }).then((data) => {
      this.setState({
        dateSelection: data.data.getAppointmentsforDay,
      });
    });
  };
  onSend = (message) => {
    this.props.addNotes({ variables: {
      custid: this.props.data.customer.id,
      name: `${this.props.data.customer.firstName} ${this.props.data.customer.lastName}`,
      userid: this.props.id,
      text: message[0].text,
      createdAt: message[0].createdAt,
    } });
  }
  onCalSaveFollow = () => {
  
    const howlong = (type) => {
      if (type === 'Followup') {
        return { duration: 15, description: 'Followup' };
      }
      if (type === 'Survey') {
        return { duration: 60, description: 'Onsite' };
      }
    };
    const selection = howlong(this.state.selectedIndex);
    const end = addMinutes(this.state.date, selection ? selection.duration : 15);
    const endhour = new Date(end).toISOString();
    const starthour = this.state.date.toISOString();
    const that = this;
    RNCalendarEvents.saveEvent(`${selection ? selection.description : 'Followup'} ${this.props.data.customer.firstName} ${this.props.data.customer.lastName}`, {
      location: this.props.data.customer.address,
      notes: this.props.data.customer.cphone ? this.props.data.customer.cphone : this.props.data.customer.hphone,
      startDate: starthour,
      endDate: endhour,
    })
      .then((id) => {
        AlertIOS.alert('Appointment Saved');
        that.props.submitFollowup({ variables: {
          description: selection ? selection.description : 'Followup',
          userid: this.props.id,
          custid: this.props.data.customer.id,
          name: `${this.props.data.customer.firstName} ${this.props.data.customer.lastName}`,
          address: this.props.data.customer.address,
          start: starthour,
          end: endhour,
          calid: id,
        } });
      })
     .catch((error) => {
       console.error(error);
     });
    this.setState({
      change: false,
    });
    
  };

  getFinishedSurvey = () => {
    this.props.getFinishedSurvey({
      variables: {
        id: this.props.selection,
      },
    }).then((survey) => {
      this.setState({ finishedSurvey: survey.data.getFinishedSurvey });
    });
    this.setState({ formCompleteModal: true });
  };

  getCurrentLocation = () => {
    const that = this;
    navigator.geolocation.getCurrentPosition((position) => {
      that.setState({
        currentLocation: position.coords,
      });
    });
  };

  getDirections = () => {
    this.getCurrentLocation();
    Linking.openURL(`http://maps.apple.com/?daddr=${this.props.data.customer.coordinates.latitude},${this.props.data.customer.coordinates.longitude}&dirflg=d&t=h`);
  };
  changeAppointment = (meetingid, calid) => {
    this.setState({
      change: true,
    });
    RNCalendarEvents.removeEvent(calid).then(status => console.log(status));
  };

  deleteAppointment = (meetingid, calid) => {
    this.props.deleteAppointment({
      variables: {
        meetingid,
        userid: this.props.id,
      },
    }).then(() => {
      if (this.state.change) { AlertIOS.alert('Appointment Removed'); }
      this.props.updateUser(this.props.id);
      RNCalendarEvents.removeEvent(calid).then(status => console.log(status));
    });
  };

  toggleReady = () => {
    if (this.props.data.customer.surveyReadyforPrice){
      AlertIOS.alert(
      'Are you sure?',
       'Survey will be removed from queue',
        [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Set to not ready',
            onPress: () => {
              this.setState({ ready: !this.state.ready });
              this.props.toggleSurveyReady({
                variables: {
                  custid: this.props.data.customer.id,
                  userid: this.props.id,
                },
              });
            },
          },
        ],
      );
    } else {
      AlertIOS.alert(
      'Are you sure?',
       'Survey will be sent to estimator',
        [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Send to Estimator',
            onPress: () => {
              this.setState({ ready: !this.state.ready });
              this.props.toggleSurveyReady({
                variables: {
                  custid: this.props.data.customer.id,
                  userid: this.props.id,
                },
              });
            },
          },
        ],
    );
    }
  };
  selectIndex = (selectedIndex) => { 
  //  console.log(selectedIndex);
    this.setState({ selectedIndex });
    
     }
  render() {
  //  console.log('detials', this)
    if (!this.props.data.customer) {
      return (
        <ActivityIndicator />
      );
    }
    return (
      <Drawer
        type="static"
        open={this.state.drawer}
        content={<ContactCustomerMenu customer={this.props.data.customer} />}
        tapToClose
        openDrawerOffset={0.3} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-4}
        onCloseStart={() => { this.setState({ drawer: false }); }}
      >
        <View style={MasterStyleSheet.container}>
          <ScrollView
            style={MasterStyleSheet.iPhoneListScroll}
          >
            <CustomerCardConact
              customer={this.props.data.customer}
              openDrawer={() => { this.setState({ drawer: true }); }}
              openFollowupModal={() => { this.setState({ followModal: true }); }}
              openFormModal={() => { this.setState({ formModal: true }); }}
            />
            <CustomerCardMaps
              customer={this.props.data.customer}
              getDirections={this.getDirections}
            />
            <CustomerCardChat
              customer={this.props.data.customer}
              getNotes={() => { this.setState({ notesModal: true }); }}
              id={this.props.id}
            />
            <CustomerCardSurvey
              customer={this.props.data.customer}
              startSurvey={() => { this.setState({ surveyModal: true }); }}
              surveyComplete={this.getFinishedSurvey}
            />
          </ScrollView>
          <CustomerNotesModal
            modal={this.state.notesModal}
            customer={this.props.data.customer}
            customerId={this.props.selection}
            closeNotesModal={() => { this.setState({ notesModal: false }); }}
            onSend={this.onSend}
            messages={this.state.messages}
          />
          <CustomerFollowupModal
            modal={this.state.followModal}
            closeFollowupModal={() => { this.setState({ followModal: false }); }}
            onDateChange={this.onDateChange}
            onCalSave={this.onCalSaveFollow}
            date={this.state.date}
            updateIndex={this.selectIndex}
            customer={this.props.data.customer}
            dateSelection={this.state.dateSelection}
            changeAppointment={this.changeAppointment}
            deleteAppointment={this.deleteAppointment}
            getCurrentLocation={this.getCurrentLocation}
            change={this.state.change}
            location={this.state.location}
          />
          <CustomerFormModal
            modal={this.state.formModal}
            customer={this.props.data.customer}
            closeFormModal={() => { this.setState({ formModal: false }); }}
            updateCustomer={this.props.updateCustomer}
          />
          <SurveyMainModal
            modal={this.state.surveyModal}
            customer={this.props.data.customer}
            id={this.props.id}
            closeSurveyModal={() => { this.setState({ surveyModal: false }); }}
          />
          <SurveyCompleteModal
            modal={this.state.formCompleteModal}
            close={() => { this.setState({ formCompleteModal: false }); }}
            finishedSurvey={this.state.finishedSurvey}
            myCustomers={this.props.myCustomers}
            ready={this.props.data.customer.surveyReadyforPrice}
            toggleReady={this.toggleReady}
          />
        </View>
      </Drawer>
    );
  }
}

const CustomerDetails = compose(
graphql(getFinishedSurvey, { name: 'getFinishedSurvey' }),
graphql(toggleSurveyReady, { name: 'toggleSurveyReady' }),
graphql(submitFollowup, { name: 'submitFollowup' }),
graphql(updateCustomer, { name: 'updateCustomer' }),
graphql(getCustomer, { name: 'getCustomer' }),
graphql(getAppointmentsforDay, { name: 'getAppointmentsforDay' }),
graphql(addNotes, { name: 'addNotes' }),
graphql(deleteAppointment, { name: 'deleteAppointment' }),
  graphql(getMyCustomer, {
    options: ({ selection }) => ({ variables: { id: selection }, pollInterval: 1000 }),
  }),
)(_CustomerDetails);

export default CustomerDetails;


// <CustomerCardPricing customer={this.props.data.customer} />//
