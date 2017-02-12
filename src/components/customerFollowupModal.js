import React from 'react';
import { Modal, View, DatePickerIOS, SegmentedControlIOS, ScrollView, AlertIOS } from 'react-native';
import { List, ListItem, Icon, Button } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import moment from 'moment';

const buttons = ['Followup', 'Survey'];

const CustomerFollowupModal = ({
    modal,
    closeFollowupModal,
    onDateChange,
    onCalSave,
    date,
    updateIndex,
    dateSelection,
    deleteAppointment,
    changeAppointment,
    updateUser,
    change,
   }) => (
     <View style={{ marginTop: 22 }}>
       <Modal
         animationType={'slide'}
         transparent={false}
         visible={modal}
       >
         <View style={{ marginTop: 50 }}>
           <Icon
             name={'chevron-left'}
             iconStyle={{ marginRight: 300 }}
             onPress={closeFollowupModal}
             size={32}
             color={'blue'}
           />
           <SegmentedControlIOS
             values={buttons}
             selectedIndex={0}
             onValueChange={updateIndex}
           />
         </View>
         <DatePickerIOS
           mode="datetime"
           date={date}
           onDateChange={onDateChange}
         />
         <Button
           onPress={onCalSave}
           title={change ? 'Update' : 'Save'}
           raised
         />
         <ScrollView>
           <List containerStyle={{ marginTop: 10 }}>
             {dateSelection.map((appointment, idx) => (
               <Swipeout
                 key={idx}
                 right={[{
                   text: 'Delete',
                   backgroundColor: 'red',
                   onPress: deleteAppointment.bind(this, appointment._id, appointment.calid),
                 }, {
                   text: 'Change',
                   backgroundColor: 'green',
                   onPress: changeAppointment.bind(this, appointment._id, appointment.calid),
                 }]}
                 autoClose
               >
                 <ListItem
                   key={idx}
                   title={`${appointment.name} ${appointment.address}`}
                   subtitle={`${moment(appointment.start).format('MMM DD hh:mm A')} to ${moment(appointment.end).format('MMM DD hh:mm A')}`}
                   leftIcon={appointment.description === 'Followup' ? { name: 'phone' } : { name: 'assignment' }}
                 />
               </Swipeout>
             ),
            )}
           </List>
         </ScrollView>
       </Modal>
     </View>
);

export default CustomerFollowupModal;
