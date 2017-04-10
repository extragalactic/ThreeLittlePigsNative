import React from 'react';
import { Button, Grid, Row, Col, Card } from 'react-native-elements';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { addPrice } from '../../graphql/mutations';
import { getCustomer } from '../../graphql/queries';
import { estimateStyles } from '../Style/estimateStyle';

class _PricingDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      numPrices: [''],
      text0: '',
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      text5: '',
      price0: '',
      price1: '',
      price2: '',
      price3: '',
      price4: '',
      price5: '',
      showInput: false,
      prices : ['']
    };
  }
  componentDidMount() {
  }

  addPricefromState = () => {
    const NumPricesArray = this.state.numPrices;
    NumPricesArray.push('');
    this.setState({ numPrices: NumPricesArray });
  };
  removePricefromState = (index) => {
    const textIndex = `text${index}`;
    const priceIndex = `price${index}`;
    this.setState({
      [textIndex]: '',
      [priceIndex]: '',
    });
    const NumPricesArray = this.state.numPrices;
    this.setState({ numPrices: NumPricesArray.splice(index, 1) });
  }
  addPricetoEstimate = () => {
    const prices = [];
    if (this.state.text0) {
      prices.push({
        description: this.state.text0,
        price: this.state.price0,
      });
    }
    if (this.state.text1) {
      prices.push({
        description: this.state.text1,
        price: this.state.price1,
      });
    }
    if (this.state.text2) {
      prices.push({
        description: this.state.text2,
        price: this.state.price2,
      });
    }
    if (this.state.text3) {
      prices.push({
        description: this.state.text3,
        price: this.state.price3,
      });
    }
    if (this.state.text4) {
      prices.push({
        description: this.state.text4,
        price: this.state.price4,
      });
    }
    if (this.state.text5) {
      prices.push({
        description: this.state.text5,
        price: this.state.price5,
      });
    }

    this.props.addPrice({
      variables: {
        price: prices,
        custid: this.props.currentCustomer
      },
    });

    this.setState({
      text0: '',
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      text5: '',
      price0: '',
      price1: '',
      price2: '',
      price3: '',
      price4: '',
      price: '',
    });
  }
  render() {
    console.log('pricing', this)
    return (
      <View
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
      >
        <Grid>
          <Row size={0.8}
           backgroundColor={'#CFCFC4'}
           >
            <View
              style={{ flex: 1, flexDirection: 'row', marginTop: 65, justifyContent: 'center' }}
            >
            <Icon
            raised	
            reversed
            size={36}
               name='price-tag'
               type='entypo'
               color='#517fa4'
               onPress={() => this.setState({ showInput: !this.state.showInput })}

            />
            </View>
          </Row>
          <Col
            backgroundColor={'#e7e8ee'}
            size={3.5}
          >
           
              <View
                style={{ height: 600 }}
              >
                <ScrollView>
                  { this.state.numPrices.map((item, index) => {
                    const textIndex = `text${index}`;
                    const priceIndex = `price${index}`;
                    if (index !== 0) {
                      return (
                        <View
                          style={estimateStyles.priceInputView}
                        >
                          <TextInput
                            style={estimateStyles.priceDescription}
                            multiline
                            onChangeText={text => this.setState({ [textIndex]: text })}
                            value={this.state[textIndex]}
                          />
                          <Text> Price</Text>
                          <TextInput
                            style={estimateStyles.pricePrice}
                            keyboardType={'numeric'}
                            placeholder="Dollar Amount"
                            onChangeText={price => this.setState({ [priceIndex]: price })}
                            value={this.state[priceIndex]}
                          />
                          
                          <Button
                            title={'Remove'}
                            buttonStyle={{ width: 200, justifyContent: 'center', margin: 10 }}
                            onPress={() => this.removePricefromState(index)}
                          />
                        </View>
                      );
                    }
                    return (
                      <Card
                        containerStyle={estimateStyles.priceCard}
                      >
                      <View
                        style={estimateStyles.priceInputView}
                      >
                        <TextInput
                          style={estimateStyles.priceDescription}
                          multiline
                          onChangeText={text => this.setState({ [textIndex]: text })}
                          value={this.state[textIndex]}
                        />
                        <Text> Price</Text>
                        <TextInput
                          style={estimateStyles.pricePrice}
                          keyboardType={'numeric'}
                          placeholder="Dollar Amount"
                          onChangeText={price => this.setState({ [priceIndex]: price })}
                          value={this.state[priceIndex]}
                        />
                        <Icon
                          raised
                          reversed
                          size={36}
                          name="plus-one"
                          color="#517fa4"
                          onPress={this.addPricefromState}
                        />
                      </View>
                      </Card>
                    );
                  })}
                </ScrollView>
                <View
                  style={estimateStyles.estimateAddPriceView}
                >

                  </View>
              
              </View>
          </Col>
        </Grid>
      </View>
    );
  }
}


const PricingDetails = compose(
    graphql(getCustomer, {
      options: ({ id }) => ({ variables: { id }, pollInterval: 1000 }),
    }),
    graphql(addPrice, { name: 'addPrice' }),
)(_PricingDetails);

export default PricingDetails;



/*

                  <Button
                    buttonStyle={estimateStyles.estimateAddPriceButton}
                    title={'Add Alternative Price'}
                    onPress={this.addPricefromState}
                  />
                  <Button
                    buttonStyle={estimateStyles.estimateAddPriceButton}
                    title={'Submit'}
                    onPress={this.addPricetoEstimate}
                  />

*/