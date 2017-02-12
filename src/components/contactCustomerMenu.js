import React from 'react';
import { List, ListItem, Icon } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';
import Communications from 'react-native-communications';

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
    container2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ContactCustomerMenu = ({ customer }) => (
  <View>

  <View style={styles.container1}>

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
      <Icon
        name="work"
        color="#517fa4"
        raised
        onPress={() => Communications.phonecall(customer.wphone, true)}
      />
  </View>
  <View style={styles.container2}>
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
        onPress={() => Communications.email(customer.email1)}
      />
      <Icon
        name="email"
        color="#517fa4"
        raised
        onPress={() => Communications.email(customer.email2)}
      />
  
  </View>
</View>
  );

export default ContactCustomerMenu;
