import React, { Component } from 'react';
import {
  ScrollView,
  View,
  AlertIOS,
  Linking,
  Image,
 } from 'react-native';
import Drawer from 'react-native-drawer';
import RNCalendarEvents from 'react-native-calendar-events';
import { graphql, compose } from 'react-apollo';
import { Actions } from 'react-native-router-flux';

import CustomerCardConact from '../Cards/customerCardConact';
import CustomerCardChat from '../Cards/customerCardChat';
import CustomerCardMaps from '../Cards/customerCardMaps';
import CustomerCardQueue from '../Cards/customerCardQueue';
import SurveyCompleteModal from '../Modals/customerSurveyCompleteModal';
import ContactCustomerMenu from '../contactCustomerMenu';
import CustomerFollowupModal from '../Modals/customerFollowupModal';
import CustomerFormModal from '../Modals/customerFormModal';
import CustomerNotesModal from '../Modals/customerNotesModal';
import SurveyMainModal from '../Surveys/surveyMainModal';

import { MasterStyleSheet } from '../../style/MainStyles';
import { getCustomer } from '../../graphql/queries';
import { getFinishedSurvey, acceptEstimate } from '../../graphql/mutations';


const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60000);

class _CustomerDetailsIPadQueue extends Component {
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
    };
  }
  onDateChange = (date) => {
    this.setState({ date });
    this.props.getAppointmentsforDay({ variables: {
      userid: this.props.user._id,
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
      userid: this.props.user._id,
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
          userid: this.props.user._id,
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
  getFinishedSurvey = () => {
    this.props.getFinishedSurvey({
      variables: {
        id: this.props.customerId,
      },
    }).then((survey) => {
      this.setState({ finishedSurvey: survey.data.getFinishedSurvey });
    });
    this.setState({ formCompleteModal: true });
  };

  acceptEstimate = () => {
    this.props.acceptEstimate({
      variables: {
        custid: this.props.data.customer.id,
        userid: this.props.user._id,
      },
    });
    Actions.home();
  }

  deleteAppointment = (meetingid, calid) => {
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
    Linking.openURL(`http://maps.apple.com/?daddr=${this.props.data.customer.coordinates.latitude},${this.props.data.customer.coordinates.longitude}&dirflg=d&t=h`);
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
    if (!this.props.data.customer) {
      return (
        <Image
          source={{ uri: 'https://s3.ca-central-1.amazonaws.com/tlpm/pictures/iTunesArtwork%403x.png' }}
          style={MasterStyleSheet.logo}
        />
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
        onCloseStart={this.closeDrawer}
      >
        <View style={MasterStyleSheet.detailsContainer}>
          <ScrollView>
            <CustomerCardConact
              customer={this.props.data.customer}
              openDrawer={this.openDrawer}
              openFollowupModal={this.openFollowupModal}
              openFormModal={this.openFormModal}
            />
            <CustomerCardMaps
              customer={this.props.data.customer}
              getDirections={this.getDirections}
            />
            <CustomerCardChat
              customer={this.props.data.customer}
              getNotes={this.openNotesModal}
              id={this.props.id}

            />
            <CustomerCardQueue
              customer={this.props.data.customer}
              acceptEstimate={this.acceptEstimate}
            />

          </ScrollView>
          <CustomerNotesModal
            modal={this.state.notesModal}
            customer={this.props.data.customer}
            customerId={this.props.data.customer.id}
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
            closeFormModal={this.closeFormModal}
            updateCustomer={this.props.updateCustomer}
          />
          <SurveyMainModal
            modal={this.state.surveyModal}
            customer={this.props.data.customer}
            id={this.props.id}
            closeSurveyModal={() => { this.setState({ surveyModal: false }); }}
          />

        </View>
      </Drawer>
    );
  }
}

const CustomerDetailsIPadQueue = compose(
  graphql(getCustomer, {
    options: ({ customerId }) => ({ variables: { id: customerId }, pollInterval: 1000 }),
  }),
  graphql(getFinishedSurvey, { name: 'getFinishedSurvey' }),
  graphql(acceptEstimate, { name: 'acceptEstimate' }),

)(_CustomerDetailsIPadQueue);

export default CustomerDetailsIPadQueue;
