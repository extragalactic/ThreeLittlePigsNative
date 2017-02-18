import React from 'react';
import { Modal, View } from 'react-native';
import { Icon } from 'react-native-elements';

import CustomerContactForm from '../forms/updateCustomerForm';
import { MasterStyleSheet } from '../../style/MainStyles';

const CustomerFormModal = ({
    modal,
    closeFormModal,
    onCalSave,
    customer,
    updateCustomer, 
   }) => (
     <View style={MasterStyleSheet.modalView}>
       <Modal
         animationType={'slide'}
         transparent={false}
         visible={modal}
       >
         <Icon
           name={'chevron-left'}
           iconStyle={MasterStyleSheet.modalIcon}
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
