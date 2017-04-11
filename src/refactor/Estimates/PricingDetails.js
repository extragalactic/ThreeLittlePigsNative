import React from 'react';
import { Button, Grid, Row, Col, Card, Text } from 'react-native-elements';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { addPrice } from '../../graphql/mutations';
import { getCustomer } from '../../graphql/queries';
import { estimateStyles } from '../Style/estimateStyle';
import { MasterStyleSheet } from '../../style/MainStyles';

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
      prices: [true],
    };
  }
  componentDidMount() {

  }
  handleKeyDown = (e) => {
    if (e.nativeEvent.key == 'Enter') {
      //console.log('submit');
    }
  }
  addPrice = () => {
    const NumPricesArray = this.state.numPrices;
    NumPricesArray.push(true);
    this.setState({ numPrices: NumPricesArray });
  }
  addPricetoState = () => {
    const NumPricesArray = this.state.prices;
    NumPricesArray.push(true);
    this.setState({ prices: NumPricesArray });
  };
  removePricefromState = (index) => {
    const textIndex = `text${index}`;
    const priceIndex = `price${index}`;
    const NumPricesArray = this.state.prices;
    NumPricesArray.splice(index, 1);
    this.setState({
      prices: NumPricesArray,
      [`text${index}`]: '',
      [`price${index}`]: '',
    });
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
    if (prices.length !== 0) {
      this.props.addPrice({
        variables: {
          price: prices,
          custid: this.props.id,
        },
      });
    }
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
    return (
      <View
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
      >
        <Grid>
          <Row
            size={0.8}
            backgroundColor={'#CFCFC4'}
          >
            <View
              style={{ flex: 1, flexDirection: 'row', marginTop: 100, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text h1 >Add Prices to Estimate </Text>
            </View>
          </Row>
          <Col
            backgroundColor={'#e7e8ee'}
            size={3.5}
          >
            <View
              style={estimateStyles.scrollView}
            >
              <ScrollView>
                <Card
                  containerStyle={estimateStyles.priceCard}
                >
                  <View
                    style={estimateStyles.priceInputView}
                  >
                    { this.state.prices.map((item, index) => {
                      const textIndex = `text${index}`;
                      const priceIndex = `price${index}`;
                      return (
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                          }}
                        >
                          <View>
                            {index !== 0 ?
                              <Icon
                                raised
                                style={{
                                }}
                                size={16}
                                name="close"
                                color="red"
                                onPress={() => this.removePricefromState(index)}
                              /> : null}
                          </View>
                          <TextInput
                            style={estimateStyles.priceDescription}
                            multiline
                            placeholder="Work Description"
                            onChangeText={text => this.setState({ [textIndex]: text })}
                            value={this.state[textIndex]}
                          />
                          <TextInput
                            style={estimateStyles.pricePrice}
                            keyboardType={'numeric'}
                            placeholder="Dollar Amount"
                            onKeyPress={this.handleKeyDown}
                            onChangeText={price => this.setState({ [priceIndex]: price })}
                            value={this.state[priceIndex]}
                            onEndEditing={() => console.log('end')}
                          />
                        </View>
                      );
                    })}

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                      }}
                    >
                      <Icon
                        raised
                        size={24}
                        name="plus"
                        type="entypo"
                        color="#517fa4"
                        onPress={this.addPricetoState}
                      />
                      <Icon
                        raised
                        size={24}
                        name="plus-square"
                        type="font-awesome"
                        color="#517fa4"
                        onPress={this.addPricetoEstimate}
                      />
                    </View>
                  </View>
                </Card>

                { this.props.data.customer.estimate.prices.map((price, index) => (
                  <Card
                    containerStyle={estimateStyles.savedPriceCard}
                  >
                    <View>
                      {price.map(p => (
                        <View
                          style={{
                            marginTop: 20,
                          }}
                        >

                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'column',
                              justifyContent: 'flex-end',
                              alignItems: 'flex-end',
                            }}
                          >
                            <Icon
                              raised
                              style={{
                              }}
                              size={16}
                              name="close"
                              color="red"
                              onPress={() => console.log(index)}
                            />

                          </View>
                          <TextInput
                            style={estimateStyles.priceDescription}
                            multiline
                            placeholder="Work Description"
                            defaultValue={p.description}
                          />
                          <TextInput
                            style={estimateStyles.pricePrice}
                            keyboardType={'numeric'}
                            placeholder="Dollar Amount"
                            onKeyPress={this.handleKeyDown}
                            value={`${p.price}`}
                            onEndEditing={() => console.log('end')}
                          />
                        </View>

    ))}
                    </View>
                  </Card>
  ))}
              </ScrollView>
              <View
                style={estimateStyles.estimateAddPriceView}
              />

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
  {this.state.prices.map((item, index) =>  {
                     const textIndex = `text${index}`
                     const priceIndex = `price${index}`
                      return (
                         <View>
                        <TextInput
                          style={estimateStyles.priceDescription}
                          multiline
                          placeholder="Work Description"
                          onChangeText={text => this.setState({ [textIndex]: text })}
                          value={this.state[textIndex]}
                        />
                        <TextInput
                          style={estimateStyles.pricePrice}
                          keyboardType={'numeric'}
                          placeholder="Dollar Amount"
                          onKeyPress={this.handleKeyDown}
                          onChangeText={price => this.setState({ [priceIndex]: price })}
                          value={this.state[priceIndex]}
                          onEndEditing={() => console.log('end')}
                        />
                      </View>
                      )

                    }

                    )}

                  <Button
                    buttonStyle={estimateStyles.estimateAddPriceButton}
                    title={'Add Alternative Price'}
                    onPress={this.addPricetoState}
                  />
                  <Button
                    buttonStyle={estimateStyles.estimateAddPriceButton}
                    title={'Submit'}
                    onPress={this.addPricetoEstimate}
                  />

*/
