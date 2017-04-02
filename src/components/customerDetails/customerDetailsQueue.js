import React, { Component } from 'react';
import {
  ScrollView,
  View,
  AlertIOS,
  Linking,
} from 'react-native';
import Drawer from 'react-native-drawer';
import { graphql, compose } from 'react-apollo';

import RNCalendarEvents from 'react-native-calendar-events';
import { Actions } from 'react-native-router-flux';

import CustomerCardConact from '../Cards/customerCardConact';
import CustomerCardChat from '../Cards/customerCardChat';
import CustomerCardMaps from '../Cards/customerCardMaps';
import CustomerCardQueue from '../Cards/customerCardQueue';
import CustomerCardSurvey from '../Cards/customerCardSurvey';
import SurveyCompleteModal from '../Modals/customerSurveyCompleteModal';
import ContactCustomerMenu from '../contactCustomerMenu';
import CustomerFollowupModal from '../Modals/customerFollowupModal';
import CustomerFormModal from '../Modals/customerFormModal';
import CustomerNotesModal from '../Modals/customerNotesModal';
import SurveyMainModal from '../Surveys/surveyMainModal';

import { MasterStyleSheet } from '../../style/MainStyles';

import { getFinishedSurvey,
   toggleSurveyReady,
   submitFollowup,
   getAppointmentsforDay,
   updateCustomer,
   addNotes,
   deleteAppointment,
   getCustomer,
   acceptEstimate,
  } from '../../graphql/mutations';

import { getUserandCustomers } from '../../graphql/queries';

const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60000);

class _CustomerDetailsQueue extends Component {
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
      selectedIndex: '',
      dateSelection: [],
      notes: '',
      change: false,
      currentLocation: {},
      messages: [],
      finishedSurvey: [],
      ready: false,
    };
  }
  componentDidMount() {
    this.props.getCustomer({ variables: {
      id: this.props.selection,
    } }).then((customer) => {
      this.setState({
        customer: customer.data.getCustomer,
      });
    });
  }

  onDateChange = (date) => {
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
      custid: this.state.customer.id,
      name: `${this.state.customer.firstName} ${this.state.customer.lastName}`,
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

    RNCalendarEvents.saveEvent(`${selection ? selection.description : 'Followup'} ${this.state.customer.firstName} ${this.state.customer.lastName}`, {
      location: this.state.customer.address,
      notes: this.props.data.customer.cphone ? this.props.data.customer.cphone : this.props.data.customer.hphone,
      startDate: starthour,
      endDate: endhour,
    })
      .then((id) => {
        AlertIOS.alert('Appointment Saved');
        that.props.submitFollowup({ variables: {
          description: selection ? selection.description : 'Followup',
          userid: this.props.id,
          custid: this.state.customer.id,
          name: `${this.state.customer.firstName} ${this.state.customer.lastName}`,
          address: this.state.customer.address,
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

  openDrawer = () => {
    this.setState({
      drawer: true,
    });
  };
  closeDrawer = () => {
    this.setState({
      drawer: false,
    });
  };
  openFollowupModal = () => {
    this.setState({
      followModal: true,
    });
  };
  openFormModal = () => {
    this.setState({
      formModal: true,
    });
  };
  closeFormModal = () => {
    this.setState({
      formModal: false,
    });
  };
  openNotesModal = () => {
    this.setState({
      notesModal: true,
    });
  };
  closeNotesModal = () => {
    this.setState({
      notesModal: false,
    });
  };
  openSurveyModal = () => {
    this.setState({
      surveyModal: true,
    });
  };
  closeSurveyModal = () => {
    this.setState({
      surveyModal: false,
    });
  };
  openSurveyCompleteModal = () => {
    this.setState({
      surveyCompleteModal: true,
    });
  };
  closeSurveyCompleteModal = () => {
    this.setState({
      surveyCompleteModal: false,
    });
  };

  closeFollowupModal = () => {
    this.setState({
      followModal: false,
    });
  };

  updateIndex = (selectedIndex) => {
    this.setState({
      selectedIndex,
    });
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
  changeAppointment = (meetingid, calid) => {
    this.setState({
      change: true,
    });
    RNCalendarEvents.removeEvent(calid).then(status => console.log(status));
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
    Linking.openURL(`http://maps.apple.com/?daddr=${this.state.customer.coordinates.latitude},${this.state.customer.coordinates.longitude}&dirflg=d&t=h`);
  };

  acceptEstimate = () => {
    this.props.acceptEstimate({
      variables: {
        custid: this.state.customer.id,
        userid: this.props.id,
      },
    });
    Actions.home();
  }

  updateNotes = (notes) => {
    this.setState({
      notes,
    });
  };
  submitNotes = () => {
    this.setState({ notes: '' });
  };
  toggleReady = () => {
    AlertIOS.alert(
      'Are you sure?',
       'Survey will be sent to estimator',
      [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Send to Estimator',
          onPress: () => {
            this.setState({ ready: !this.state.ready });
            this.props.toggleSurveyReady({
              variables: {
                custid: this.state.customer.id,
                userid: this.props.id,
              },
            });
          },
        },
      ],
    );
  };
  render() {
    return (
      <Drawer
        type="static"
        open={this.state.drawer}
        content={<ContactCustomerMenu customer={this.state.customer} />}
        tapToClose
        openDrawerOffset={0.3} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-4}
        onCloseStart={this.closeDrawer}
      >
        <View style={MasterStyleSheet.container}>
          <ScrollView
            style={MasterStyleSheet.iPhoneListScroll}
          >
            <CustomerCardConact
              customer={this.state.customer}
              openDrawer={this.openDrawer}
              openFollowupModal={this.openFollowupModal}
              openFormModal={this.openFormModal}
            />
            <CustomerCardMaps customer={this.state.customer} getDirections={this.getDirections} />
            <CustomerCardChat customer={this.state.customer} getNotes={this.openNotesModal} />
             <CustomerCardQueue
              customer={this.state.customer}
              acceptEstimate={this.acceptEstimate}
            />
   
          </ScrollView>
          <CustomerNotesModal
            modal={this.state.notesModal}
            customer={this.state.customer}
            customerId={this.state.customer.id}
            closeNotesModal={this.closeNotesModal}
            onSend={this.onSend}
            messages={this.state.messages}
          />
          <CustomerFollowupModal
            modal={this.state.followModal}
            closeFollowupModal={this.closeFollowupModal}
            onDateChange={this.onDateChange}
            onCalSave={this.onCalSaveFollow}
            date={this.state.date}
            updateIndex={this.updateIndex}
            customer={this.state.customer}
            dateSelection={this.state.dateSelection}
            changeAppointment={this.changeAppointment}
            deleteAppointment={this.deleteAppointment}
            getCurrentLocation={this.getCurrentLocation}
            change={this.state.change}
            location={this.state.location}
          />
          <CustomerFormModal
            modal={this.state.formModal}
            customer={this.state.customer}
            closeFormModal={this.closeFormModal}
            updateCustomer={this.props.updateCustomer}
          />
          <SurveyMainModal
            modal={this.state.surveyModal}
            customer={this.state.customer}
            user={this.props.data.user}
            closeSurveyModal={this.closeSurveyModal}
          />
          <SurveyCompleteModal
            modal={this.state.formCompleteModal}
            close={() => { this.setState({ formCompleteModal: false }); }}
            finishedSurvey={this.state.finishedSurvey}
            myCustomers={this.props.myCustomers}
            ready={this.state.ready}
            toggleReady={this.toggleReady}
          />
        </View>
      </Drawer>
    );
  }
}

const CustomerDetailsQueue = compose(
graphql(acceptEstimate, { name: 'acceptEstimate' }),
graphql(getFinishedSurvey, { name: 'getFinishedSurvey' }),
graphql(toggleSurveyReady, { name: 'toggleSurveyReady' }),
graphql(submitFollowup, { name: 'submitFollowup' }),
graphql(updateCustomer, { name: 'updateCustomer' }),
graphql(getCustomer, { name: 'getCustomer' }),
graphql(getAppointmentsforDay, { name: 'getAppointmentsforDay' }),
graphql(addNotes, { name: 'addNotes' }),
graphql(deleteAppointment, { name: 'deleteAppointment' }),
graphql(getUserandCustomers, {
  options: ({ id }) => ({ variables: { id }, pollInterval: 1000 }),
}),
)(_CustomerDetailsQueue);

export default CustomerDetailsQueue ;


// <CustomerCardPricing customer={this.state.customer} />//
