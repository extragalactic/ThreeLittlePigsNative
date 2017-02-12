import React from 'react';
import { List, ListItem, FormLabel, FormInput, Icon } from 'react-native-elements';
import { View, StyleSheet, AlertIOS } from 'react-native';
import Swipeout from 'react-native-swipeout';

import {
  FirstNameSwipe,
  FirstNameForm,
  LastNameSwipe,
  LastNameForm,
  Email1Swipe,
  Email1Form,
  Email2Swipe,
  Email2Form,
  CphoneSwipe,
  CphoneForm,
  HphoneSwipe,
  HphoneForm,
  WphoneSwipe,
  WphoneForm,
  AddressSwipe,
  AddressForm
} from './updateCustomerFormListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  button: {
    left: 240,
    bottom: 66,
    marginBottom: -60,
  },
  label: {
    marginTop: 2,
  },
  input: {
    width: 200,
  },
});

class UpdateCustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.customer.firstName,
      lastName: props.customer.lastName,
      email1: props.customer.email1,
      email2: props.customer.email2,
      hphone: props.customer.hphone,
      cphone: props.customer.cphone,
      wphone: props.customer.wphone,
      address: props.customer.address,
      surveyor: props.customer.surveyor,
      firstNameEdit: true,
      lastNameEdit: true,
      email1Edit: true,
      email2Edit: true,
      hphoneEdit: true,
      cphoneEdit: true,
      wphoneEdit: true,
      addressEdit: true,
      surveyorEdit: true,
    };
  }
  updateFormState = (field, input) => {
    this.setState({
      [field]: input,
    });
  };
  toggleForm = (field) => {
    this.setState({
      [field]: !this.state[field],
    });
  };
  updateCustomer = (type, field) => {
    const customer = this.props.customer;
    this.props.updateCustomer({
      variables: {
        [field]: this.state[field],
        id: customer.id,
      },
    }).then(() => AlertIOS.alert(
        'Updated!',
    )).then(() => this.toggleForm(type));
  };

  render() {
    console.log(this.props)
    const customer = this.props.customer;
    return (
      <View>
        <List containerStyle={{ marginTop: 20 }}>
          {this.state.firstNameEdit ?
            <FirstNameSwipe
              toggleForm={this.toggleForm}
              customer={customer}
            /> :
            <FirstNameForm
              customer={this.state.firstName}
              updateFormState={this.updateFormState}
              updateCustomer={this.updateCustomer}
            />
           }
          {this.state.lastNameEdit ?
            <LastNameSwipe
              toggleForm={this.toggleForm}
              customer={customer}
            /> :
            <LastNameForm
              customer={this.state.lastName}
              updateFormState={this.updateFormState}
              updateCustomer={this.updateCustomer}
            />
           }

          {this.state.email1Edit ?
            <Email1Swipe
              toggleForm={this.toggleForm}
              customer={customer}
            /> :
            <Email1Form
              customer={this.state.email1}
              updateFormState={this.updateFormState}
              updateCustomer={this.updateCustomer}
            />
           }

          {this.state.email2Edit ?
            <Email2Swipe
              toggleForm={this.toggleForm}
              customer={customer}
            /> :
            <Email2Form
              customer={this.state.email2}
              updateFormState={this.updateFormState}
              updateCustomer={this.updateCustomer}
            />
           }

          {this.state.cphoneEdit ?
            <CphoneSwipe
              toggleForm={this.toggleForm}
              customer={customer}
            /> :
            <CphoneForm
              customer={this.state.cphone}
              updateFormState={this.updateFormState}
              updateCustomer={this.updateCustomer}
            />
           }
          {this.state.hphoneEdit ?
            <HphoneSwipe
              toggleForm={this.toggleForm}
              customer={customer}
            /> :
            <HphoneForm
              customer={this.state.hphone}
              updateFormState={this.updateFormState}
              updateCustomer={this.updateCustomer}
            />
           }
          {this.state.wphoneEdit ?
            <WphoneSwipe
              toggleForm={this.toggleForm}
              customer={customer}
            /> :
            <WphoneForm
              customer={this.state.wphone}
              updateFormState={this.updateFormState}
              updateCustomer={this.updateCustomer}
            />
           }
          {this.state.addressEdit ?
            <AddressSwipe
              toggleForm={this.toggleForm}
              customer={customer}
            /> :
            <AddressForm
              customer={this.state.address}
              updateFormState={this.updateFormState}
              updateCustomer={this.updateCustomer}
            />
           }
        </List>
      </View>
    );
  }
}

export default UpdateCustomerForm;

