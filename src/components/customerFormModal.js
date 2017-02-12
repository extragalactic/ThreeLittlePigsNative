import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';

import CustomerContactForm from './forms/updateCustomerForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 50,
  },
});

const CustomerFormModal = ({
    modal,
    closeFormModal,
    onCalSave,
    customer,
    updateCustomer, 
   }) => (
     <View style={{ marginTop: 22 }}>
       <Modal
         animationType={'slide'}
         transparent={false}
         visible={modal}
       >
         <Icon
           name={'chevron-left'}
           iconStyle={{ marginRight: 300, marginTop: 40 }}
           onPress={closeFormModal}
           size={32}
           color={'blue'}
         />
         <CustomerContactForm
           customer={customer}
           updateCustomer={updateCustomer}
         />
       </Modal>
     </View>
);

export default CustomerFormModal;
