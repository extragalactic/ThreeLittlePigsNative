import React from 'react';
import { List, ListItem, FormLabel, FormInput, Icon } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';

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
  secondTitle: {
    color: 'black',
  },
  listStyle: {
    height: 55,
  },
});

const FirstNameSwipe = ({ toggleForm, customer }) => (
  <View>
    <Swipeout
      right={[{
        text: 'Edit',
        onPress: toggleForm.bind(this, 'firstNameEdit'),
        backgroundColor: 'green',
      }]}
      autoClose
    >
      <ListItem
        containerStyle={styles.listStyle}
        title={customer.firstName}
        rightTitle={'First Name'}
        rightTitleStyle={styles.secondTitle}
      />
    </Swipeout>
  </View>
 );

const FirstNameForm = ({ updateFormState, updateCustomer, customer }) => (
  <View>
    <FormLabel>First Name</FormLabel>
    <FormInput
      onChangeText={updateFormState.bind(this, 'firstName')}
      value={customer}
    />
    <Icon
      containerStyle={styles.button}
      name="save"
      raised
      onPress={updateCustomer.bind(this, 'firstNameEdit', 'firstName')}
    />
  </View>
);

const LastNameSwipe = ({ toggleForm, customer }) => (
  <View>
    <Swipeout
      right={[{
        text: 'Edit',
        onPress: toggleForm.bind(this, 'lastNameEdit'),
        backgroundColor: 'green',
      }]}
      autoClose
    >
      <ListItem
        containerStyle={styles.listStyle}
        title={customer.lastName}
        rightTitle={'Last Name'}
        rightTitleStyle={styles.secondTitle}
      />
    </Swipeout>
  </View>
 );

const LastNameForm = ({ updateFormState, updateCustomer, customer }) => (
  <View>
    <FormLabel>last Name</FormLabel>
    <FormInput
      onChangeText={updateFormState.bind(this, 'lastName')}
      value={customer}
    />
    <Icon
      containerStyle={styles.button}
      name="save"
      raised
      onPress={updateCustomer.bind(this, 'lastNameEdit', 'lastName')}
    />
  </View>
);

const Email1Swipe = ({ toggleForm, customer }) => (
  <View>
    <Swipeout
      right={[{
        text: 'Edit',
        onPress: toggleForm.bind(this, 'email1Edit'),
        backgroundColor: 'green',
      }]}
      autoClose
    >
      <ListItem
        containerStyle={styles.listStyle}
        title={customer.email1}
        rightTitle={'Email 1'}
        rightTitleStyle={styles.secondTitle}
      />
    </Swipeout>
  </View>
 );

const Email1Form = ({ updateFormState, updateCustomer, customer }) => (
  <View>
    <FormLabel>Email 1</FormLabel>
    <FormInput
      onChangeText={updateFormState.bind(this, 'email1')}
      value={customer}
    />
    <Icon
      containerStyle={styles.button}
      name="save"
      raised
      onPress={updateCustomer.bind(this, 'email1Edit', 'email1')}
    />
  </View>
);

const Email2Swipe = ({ toggleForm, customer }) => (
  <View>
    <Swipeout
      right={[{
        text: 'Edit',
        onPress: toggleForm.bind(this, 'email2Edit'),
        backgroundColor: 'green',
      }]}
      autoClose
    >
      <ListItem
        containerStyle={styles.listStyle}
        title={customer.email2}
        rightTitle={'Email 2'}
        rightTitleStyle={styles.secondTitle}
      />
    </Swipeout>
  </View>
 );

const Email2Form = ({ updateFormState, updateCustomer, customer }) => (
  <View>
    <FormLabel>Email 2</FormLabel>
    <FormInput
      onChangeText={updateFormState.bind(this, 'email2')}
      value={customer}
    />
    <Icon
      containerStyle={styles.button}
      name="save"
      raised
      onPress={updateCustomer.bind(this, 'email2Edit', 'email2')}
    />
  </View>
);

const CphoneSwipe = ({ toggleForm, customer }) => (
  <View>
    <Swipeout
      right={[{
        text: 'Edit',
        onPress: toggleForm.bind(this, 'cphoneEdit'),
        backgroundColor: 'green',
      }]}
      autoClose
    >
      <ListItem
        containerStyle={styles.listStyle}
        title={customer.cphone}
        rightTitle={'Mobile'}
        rightTitleStyle={styles.secondTitle}
      />
    </Swipeout>
  </View>
 );

const CphoneForm = ({ updateFormState, updateCustomer, customer }) => (
  <View>
    <FormLabel>Mobile</FormLabel>
    <FormInput
      onChangeText={updateFormState.bind(this, 'cphone')}
      value={customer}
    />
    <Icon
      containerStyle={styles.button}
      name="save"
      raised
      onPress={updateCustomer.bind(this, 'cphoneEdit', 'cphone')}
    />
  </View>
);
const HphoneSwipe = ({ toggleForm, customer }) => (
  <View>
    <Swipeout
      right={[{
        text: 'Edit',
        onPress: toggleForm.bind(this, 'hphoneEdit'),
        backgroundColor: 'green',
      }]}
      autoClose
    >
      <ListItem
        containerStyle={styles.listStyle}
        title={customer.hphone}
        rightTitle={'Home'}
        rightTitleStyle={styles.secondTitle}
      />
    </Swipeout>
  </View>
 );

const HphoneForm = ({ updateFormState, updateCustomer, customer }) => (
  <View>
    <FormLabel>Home</FormLabel>
    <FormInput
      onChangeText={updateFormState.bind(this, 'hphone')}
      value={customer}
    />
    <Icon
      containerStyle={styles.button}
      name="save"
      raised
      onPress={updateCustomer.bind(this, 'hphoneEdit', 'hphone')}
    />
  </View>
);

const WphoneSwipe = ({ toggleForm, customer }) => (
  <View>
    <Swipeout
      right={[{
        text: 'Edit',
        onPress: toggleForm.bind(this, 'wphoneEdit'),
        backgroundColor: 'green',
      }]}
      autoClose
    >
      <ListItem
        containerStyle={styles.listStyle}
        title={customer.wphone}
        rightTitle={'Work'}
        rightTitleStyle={styles.secondTitle}
      />
    </Swipeout>
  </View>
 );

const WphoneForm = ({ updateFormState, updateCustomer, customer }) => (
  <View>
    <FormLabel>Home</FormLabel>
    <FormInput
      onChangeText={updateFormState.bind(this, 'wphone')}
      value={customer}
    />
    <Icon
      containerStyle={styles.button}
      name="save"
      raised
      onPress={updateCustomer.bind(this, 'wphoneEdit', 'wphone')}
    />
  </View>
);

const AddressSwipe = ({ toggleForm, customer }) => (
  <View>
    <Swipeout
      right={[{
        text: 'Edit',
        onPress: toggleForm.bind(this, 'addressEdit'),
        backgroundColor: 'green',
      }]}
      autoClose
    >
      <ListItem
        containerStyle={styles.listStyle}
        title={customer.address}
        rightTitle={'Address'}
        rightTitleStyle={styles.secondTitle}
      />
    </Swipeout>
  </View>
 );

const AddressForm = ({ updateFormState, updateCustomer, customer }) => (
  <View>
    <FormLabel>Address</FormLabel>
    <FormInput
      onChangeText={updateFormState.bind(this, 'address')}
      value={customer}
    />
    <Icon
      containerStyle={styles.button}
      name="save"
      raised
      onPress={updateCustomer.bind(this, 'addressEdit', 'address')}
    />
  </View>
);

export {
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
  AddressForm,
};
