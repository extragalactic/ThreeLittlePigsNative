import React from 'react';
import { Card, Button } from 'react-native-elements';
import { MasterStyleSheet } from '../../style/MainStyles';

const CustomerCardConact = ({ customer, openDrawer, openFollowupModal, openFormModal }) => (
  <Card
    containerStyle={MasterStyleSheet.cardStyle}
    title={customer.firstName ? `${customer.firstName} ${customer.lastName}` : 'Customer'}
  >
    <Button
      icon={{ name: 'phone' }}
      backgroundColor="#03A9F4"
      buttonStyle={MasterStyleSheet.mainButtonStyle}
      title="Contact Customer"
      onPress={openDrawer}
    />
    <Button
      icon={{ name: 'assignment' }}
      backgroundColor="#03A9F4"
      buttonStyle={MasterStyleSheet.mainButtonStyle}
      title="Update Info"
      onPress={openFormModal}
    />
    <Button
      icon={{ name: 'alarm' }}
      backgroundColor="#03A9F4"
      buttonStyle={MasterStyleSheet.mainButtonStyle}
      title="Reminders"
      onPress={openFollowupModal}
    />
  </Card>
);

export default CustomerCardConact;
