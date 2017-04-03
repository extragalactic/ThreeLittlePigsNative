import React from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modalbox';
import { Text, Card, Button } from 'react-native-elements';
import { Col, Grid } from 'react-native-easy-grid';
import { graphql, compose } from 'react-apollo';
import Autocomplete from 'react-native-autocomplete-input';
import { MasterStyleSheet } from '../../style/MainStyles';
import { getPrices } from '../../graphql/queries';
import { addPrice } from '../../graphql/mutations';

class _EstimatePriceModal extends React.Component {
  constructor() {
    super();
    this.state = {
      data: '',
      query: '',
      price: '',
    };
  }

  findPrice(query) {
    if (query === '') {
      return [];
    }
    const prices = this.props.data.getPrices;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return prices.filter(price => price.description.search(regex) >= 0);
  }

  submitPrice = () => {
    const inputValidate = this.state.query === '' || this.state.price === '';
    console.log(!inputValidate);
    if (!inputValidate) {
      this.props.addPrice(this.state.query, this.state.price);
      this.setState({
        price: 0,
        query: '',
      });
    }
  };

  render() {
    const { query } = this.state;
    const prices = this.findPrice(query);
    return (
      <Modal
        isOpen={this.props.open}
        onClosed={this.props.close}
        style={MasterStyleSheet.EstimatePriceModal}
        position={'center'}
      >
        <Card
          title={'Add Price'}
          containerStyle={MasterStyleSheet.PricingCard}
        >
          <Grid>
            <Col
              size={75}
              style={{ height: 200, borderColor: 'black', borderWidth: 1, borderRightWidth: 0.5 }}
            >
              <Text> Description</Text>
              {this.props.data.getPrices ?
                <Autocomplete
                  data={prices}
                  defaultValue={query}
                  onChangeText={text => this.setState({ query: text })}
                  placeholder="Enter Item Description"
                  renderItem={({ description, price }) => (
                    <TouchableOpacity onPress={() => this.setState({ query: description })}>
                      <Text style={{ height: 30, fontSize: 20 }}>
                        {description}
                      </Text>
                    </TouchableOpacity>
          )}
                />
                : null}
            </Col>
            <Col
              size={25}
              style={{ height: 200, borderColor: 'black', borderWidth: 1, borderLeftWidth: 0.5 }}
            >
              <Text> Price</Text>
              <TextInput
                style={{ height: 42, borderColor: 'gray', borderWidth: 1 }}
                keyboardType={'numeric'}
                placeholder="Dollar Amount"
                onChangeText={price => this.setState({ price })}
                value={this.state.price}
              />
            </Col>
          </Grid>
          <Button
            icon={{ name: 'info' }}
            backgroundColor="#03A9F4"
            title="Submit"
            raised
            onPress={this.submitPrice}
          />
        </Card>

      </Modal>

    );
  }
}

const EstimatePriceModal = compose(
  graphql(getPrices),
)(_EstimatePriceModal);

export default EstimatePriceModal;
