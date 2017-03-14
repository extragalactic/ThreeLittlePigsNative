import React from 'react';
import { Card, Button } from 'react-native-elements';
import { View } from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';

const CustomerCardChat = ({ getNotes }) => (
  <Card
    containerStyle={MasterStyleSheet.cardStyle}
  >
    <View>
      <Button
        icon={{ name: 'note' }}
        backgroundColor="#03A9F4"
        title="Notes"
        buttonStyle={MasterStyleSheet.mainButtonStyle}
        onPress={getNotes}
      />
    </View>
  </Card>
);

export default CustomerCardChat;
