import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import {
  ScrollView,
  View,
  StyleSheet,
  AlertIOS,
  Linking,
} from 'react-native';

import _ from 'lodash';

import Drawer from 'react-native-drawer';
import RNCalendarEvents from '../../node_modules/react-native-calendar-events/index.ios';

import CustomerCardConact from './customerCardConact';
import CustomerCardChat from './/customerCardChat';
import CustomerCardMaps from './customerCardMaps';
import CustomerCardSurvey from './customerCardSurvey';
import CustomerCardPricing from './customerCardPricing';
import ContactCustomerMenu from './contactCustomerMenu';
import CustomerFollowupModal from './customerFollowupModal';
import CustomerFormModal from './customerFormModal';
import CustomerNotesModal from './customerNotesModal';
import SurveyMainModal from './Surveys/surveyMainModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 55,
  },
});

const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60000);

class CustomerDetails extends Component {
  constructor() {
    super();
    this.state = {
      customer: {},
      drawer: false,
      followModal: false,
      formModal: false,
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
    };
  }
  componentDidMount() {
    this.props.getCustomer({ variables: {
      id: this.props.selection,
    } }).then((customer) => {
      console.log('didmountcustomer', customer);
      this.setState({
        customer: customer.data.getCustomer,
      });
    });
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'My message',
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
          },
        },
      ],
    });
  }
  onDateChange = (date) => {
    this.setState({ date });
    this.props.getAppointmentsforDay({ variables: {
      userid: this.props.user._id,
      date,
    } }).then((data) => {
      console.log('DATA', data);
      this.setState({
        dateSelection: data.data.getAppointmentsforDay,
      });
    });
  };
  onSend = (message) => {
     console.log(message);
  console.log(this)
    this.props.addNotes({ variables: { 
      custid: this.state.customer.id,
      name: `${this.state.customer.firstName} ${this.state.customer.lastName}`,
      userid: this.props.user._id,
      text: message[0].text,
      createdAt: message[0].createdAt,
    } });
  }
  onCalSaveFollow = (meetingid, calid) => {
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
      notes: this.state.customer.cphone,
      startDate: starthour,
      endDate: endhour,
    })
      .then((id) => {
        console.log('ID', id);
        AlertIOS.alert('Appointment Saved');
        that.props.submitFollowup({ variables: {
          description: selection ? selection.description : 'Followup',
          userid: this.props.user._id,
          custid: this.state.customer.id,
          name: `${this.state.customer.firstName} ${this.state.customer.lastName}`,
          address: this.state.customer.address,
          start: starthour,
          end: endhour,
          calid: id,
        } });
        this.props.updateUser(this.props.user._id);
      })
     .catch((error) => {
       console.error(error);
     });
    this.setState({
      change: false,
    });
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
    console.log('tesingmeeting', calid);
    this.props.deleteAppointment({
      variables: {
        meetingid,
        userid: this.props.user._id,
      },
    }).then(() => {
      if (this.state.change) { AlertIOS.alert('Appointment Removed'); }
      this.props.updateUser(this.props.user._id);
      RNCalendarEvents.removeEvent(calid).then(status => console.log(status));
    });
  };
  changeAppointment = (meetingid, calid) => {
    console.log(meetingid, calid);
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

  updateNotes = (notes) => {
    this.setState({
      notes,
    });
  };
  submitNotes = () => {
    this.setState({ notes: '' });
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
        <View style={styles.container}>
          <ScrollView>
            <CustomerCardConact
              customer={this.state.customer}
              openDrawer={this.openDrawer}
              openFollowupModal={this.openFollowupModal}
              openFormModal={this.openFormModal}
            />
            <CustomerCardMaps customer={this.state.customer} getDirections={this.getDirections} />
            <CustomerCardChat customer={this.state.customer} getNotes={this.openNotesModal} />
            <CustomerCardSurvey
              customer={this.state.customer}
              startSurvey={this.openSurveyModal}
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
            user={this.props.user}
            closeSurveyModal={this.closeSurveyModal}
          />
        </View>
      </Drawer>
    );
  }
}

export default CustomerDetails;

//<CustomerCardPricing customer={this.state.customer} />//
