import React from 'react';
import { Card, Button } from 'react-native-elements';

const buttonStyle = {
  borderRadius: 15, marginLeft: 0, marginRight: 0, marginBottom: 5,
};

const CustomerCardConact = ({ customer, openDrawer, openFollowupModal, openFormModal }) => (
  <Card title={customer.firstName ? `${customer.firstName} ${customer.lastName}` : 'Customer'}>
    <Button
      icon={{ name: 'phone' }}
      backgroundColor="#03A9F4"
      buttonStyle={buttonStyle}
      title="Contact Customer"
      onPress={openDrawer}
    />
    <Button
      icon={{ name: 'assignment' }}
      backgroundColor="#03A9F4"
      buttonStyle={buttonStyle}
      title="Update Info"
      onPress={openFormModal}
    />
    <Button
      icon={{ name: 'alarm' }}
      backgroundColor="#03A9F4"
      buttonStyle={buttonStyle}
      title="Reminders"
      onPress={openFollowupModal}
    />
  </Card>
);

export default CustomerCardConact;

