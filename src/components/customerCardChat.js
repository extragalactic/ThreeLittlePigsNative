import React from 'react';
import { Card, Button } from 'react-native-elements';
import { TextInput, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: 200,
  },
  button: { 
  borderRadius: 15, marginLeft: 0, marginRight: 0, marginTop: 5
  }
});

const CustomerCardChat = ({ customer, updateNotes, submitNotes, notes, getNotes }) => (
  <Card>
  <View>
     <Button
      icon={{ name: 'note' }}
      backgroundColor="#03A9F4"
      title="Notes"
      buttonStyle={styles.button}
      onPress={getNotes}
    />
    </View>
  </Card>
);

export default CustomerCardChat;
