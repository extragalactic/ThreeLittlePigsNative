import React from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';
import { Text, Card, Button } from 'react-native-elements';
import { MasterStyleSheet } from '../../style/MainStyles';


class CustomGenericsModal extends React.Component {
  constructor() {
    super();
    this.state = {
      data: '',
      query: '',
      price: 0,
    };
  }

  render() {
    return (
      <Modal
        isOpen={this.props.open}
        onClosed={this.props.close}
        style={MasterStyleSheet.EstimatePriceModal}
        position={'center'}
      >
        <Card
          title={'Add Conditions to Estimate'}
          containerStyle={MasterStyleSheet.PricingCard}
        >
          <TextInput
            style={{ height: 200, borderColor: 'gray', borderWidth: 1 }}
            placeholder="Dollar Amount"
            onChangeText={price => this.props.updateCustomInput(price)}
            value={this.props.value}
          />
        </Card>

      </Modal>

    );
  }
}


export default CustomGenericsModal;
