import React from 'react';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import Communications from 'react-native-communications';
import { MasterStyleSheet } from '../style/MainStyles';

const ContactCustomerMenu = ({ customer }) => (
  <View>
    <View style={MasterStyleSheet.constacCustomerContainerOne}>
      {customer.cphone ?
        <Icon
          name="phone-iphone"
          color="#517fa4"
          raised
          onPress={() => Communications.phonecall(customer.cphone, true)}
        /> : null
   }
      {customer.hphone ?
        <Icon
          name="home"
          color="#517fa4"
          raised
          onPress={() => Communications.phonecall(customer.hphone, true)}
        /> : null}
      {customer.wphone ?
        <Icon
          name="work"
          color="#517fa4"
          raised
          onPress={() => Communications.phonecall(customer.wphone, true)}
        /> : null}
    </View>
    <View style={MasterStyleSheet.constacCustomerContainerTwo}>
      <Icon
        name="sms"
        color="#517fa4"
        raised
        onPress={() => Communications.text(customer.cphone, true)}
      />
      <Icon
        name="mail-outline"
        color="#517fa4"
        raised
        onPress={() => Communications.email([customer.email1], null, null, null, 'my body text')}
      />
      {customer.email2 ? <Icon
        name="email"
        color="#517fa4"
        raised
        onPress={() => Communications.email([customer.email2], null, null, null, 'my body text')}
      /> : null}
    </View>
  </View>
  );

export default ContactCustomerMenu;
