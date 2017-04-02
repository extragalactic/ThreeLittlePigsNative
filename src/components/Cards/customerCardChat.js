import React from 'react';
import { Card, Button } from 'react-native-elements';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { graphql, compose } from 'react-apollo';
import { MasterStyleSheet } from '../../style/MainStyles';
import { getUserQuery } from '../../graphql/queries';

const _CustomerCardChat = ({ getNotes, customer, ...props }) => (
  <Card
    containerStyle={MasterStyleSheet.cardStyle}
  >
    <View>
      <Button
        icon={{ name: 'note' }}
        backgroundColor="#03A9F4"
        title="Notes"
        buttonStyle={MasterStyleSheet.mainButtonStyle}
        onPress={() => Actions.giftedChatContainer({id: customer.id, user: props.data.user})}
      />
    </View>
  </Card>
);

const CustomerCardChat = compose(
  graphql(getUserQuery, {
    options: ({ id }) => ({ variables: { id }, pollInterval: 5000 }),
  }),
 )(_CustomerCardChat);

export default CustomerCardChat;
