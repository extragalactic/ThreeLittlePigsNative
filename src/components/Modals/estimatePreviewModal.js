import { View, Modal, WebView, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import React from 'react';
import { MasterStyleSheet } from '../../style/MainStyles';

class EstimatePreviewModal extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 12000);
  }
  componentWillUnmount() {
    this.setState({ loading: true });
  }
  render() {
    return (
      <View>
        <Modal
          visible={this.props.open}
        >
          <Icon
            name={'chevron-left'}
            iconStyle={MasterStyleSheet.modalIcon}
            onPress={this.props.close}
            size={32}
            color={'blue'}
          />
          {this.state.loading ? <ActivityIndicator /> :
          <WebView
            source={{ uri: `https://3lpm.s3.ca-central-1.amazonaws.com/${this.props.customer.id}/${this.props.customer.firstName}${this.props.customer.lastName}Estimate.pdf` }}
          />
        }
        </Modal>
      </View>
    );
  }
}

export default EstimatePreviewModal;
