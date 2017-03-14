import React from 'react';
import { Modal, View, Image, Dimensions, ScrollView } from 'react-native';
import { Container, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Icon, Text, Card, Button, CheckBox } from 'react-native-elements';
import Swiper from 'react-native-swiper';

import { MasterStyleSheet } from '../../style/MainStyles';

import EstimatePriceModal from './estimatePriceModal';
import PhotoGalleryEstimates from '../photoGallery/photoGalleryEstimates';
import CustomGenericsModal from './customGenericsModal';


const window = Dimensions.get('window');

class MyEstimateModal extends React.Component {
  constructor() {
    super();
    this.state = {
      pricingModal: false,
      galleryModal: false,
      customModal: false,
      priceText: false,
      obc: false,
      nbc: false,
      concrete: false,
      retaining: false,
      newcap: false,
      newcrown: false,
      roof: false,
      sills: false,
      pargeex: false,
      coping: false,
      flashing: false,
      waterproofing: false,
      tuckpoint: false,
      flagstone: false,
      banas: false,
      fwarranty: false,
      pwarranty: false,
      custom: false,
      customText: '',

    };
  }

  selectPhoto = (index) => {
    this.props.selectSurveyPhotos({
      variables: {
        custid: this.props.customer.id,
        index,
      },
    });
  };

  updateCustomInput = (customText) => {
    this.setState({ customText });
  };

  render() {
    if (!this.props.finishedSurvey) {
      return (
        <Text> No Survey </Text>
      );
    }
    return (
      <Modal
        animationType={'slide'}
        visible={this.props.modal}
        style={MasterStyleSheet.modalView}
      >
        <Icon
          name={'chevron-left'}
          iconStyle={MasterStyleSheet.modalIcon}
          onPress={this.props.close}
          size={38}
          color={'blue'}
        />
        <Container>
          <Content>
            <Grid>
              <Col
                size={60}
                style={MasterStyleSheet.EstimateModalColLeft}
              >
                <View
                  style={MasterStyleSheet.surveyResultPhotosView}
                >
                  <Swiper
                    showsButtons
                    style={MasterStyleSheet.EstimateMainSwipe}
                    width={window.width / 2}
                  >
                    { this.props.finishedSurvey.map((survey, idx) => (
                      <View
                        key={idx}
                      >
                        <Text
                          h3
                        >{survey.heading}</Text>
                        <Swiper
                          width={window.width / 2}
                          height={window.height / 2}
                        >
                          {survey.photos.map((photo, idx) => (
                            <View
                              style={MasterStyleSheet.surveyResultInsideView}
                            >
                              <Image
                                style={MasterStyleSheet.surveyResultPhotos}
                                source={{ uri: photo.url }}
                              />
                            </View>
          ))}
                        </Swiper>
                        <ScrollView
                          contentContainerStyle={MasterStyleSheet.surveyResultsNotesView}
                        >
                          { survey.notes.map((note, idx) => (
                            <View key={idx}>
                              <Text h4> {note.description}</Text>
                              <Text h5> {note.text}</Text>
                            </View>
                ))}
                        </ScrollView>
                      </View>
        ))}
                  </Swiper>
                </View>
              </Col>
              <Col
                size={40}
                style={MasterStyleSheet.EstimateModalColRight}
              >
                <View
                  style={MasterStyleSheet.surveyResultPricingView}
                >
                  <Card
                    title={'3LP Estimate'}
                    containerStyle={MasterStyleSheet.EstimatePreviewCard}
                  >
                    <Grid>
                      <Col
                        size={75}
                        style={{ height: 200, borderColor: 'black', borderWidth: 1, borderRightWidth: 0.5 }}
                      >
                        <Text> Description</Text>
                        { this.props.estimate.prices ? this.props.estimate.prices.map(price => (
                          <Text> {price.description}</Text>
                          ),
                        ) : null}
                      </Col>
                      <Col
                        size={25}
                        style={{ height: 200, borderColor: 'black', borderWidth: 1, borderLeftWidth: 0.5 }}
                      >
                        <Text> Price</Text>
                        { this.props.estimate.prices ? this.props.estimate.prices.map(price => (
                          <Text> {price.price}</Text>
                          ),
                        ) : null}
                      </Col>
                    </Grid>
                    <View
                      style={MasterStyleSheet.EstimateGenerics}
                    >
                      <Text> Generics </Text>
                      <ScrollView>
                        <CheckBox
                          title={'Ontario Building Code (OBC)—— Sidewalk/ garage pad /slab'}
                          onPress={() => this.setState({ obc: !this.state.obc })}
                          checked={this.state.obc}

                        />
                        <CheckBox
                          title={'National Building Code (NBC) —— Sidewalk/ garage pad /slab'}
                          onPress={() => this.setState({ nbc: !this.state.nbc })}
                          checked={this.state.nbc}
                        />
                        <CheckBox
                          title={'Concrete steps / landing / treads / risers'}
                          onPress={() => this.setState({ concrete: !this.state.concrete })}
                          checked={this.state.concrete}
                        />
                        <CheckBox
                          title={'Retaining walk outs (NBC)'}
                          onPress={() => this.setState({ retaining: !this.state.retaining })}
                          checked={this.state.retaining}
                        />
                        <CheckBox
                          title={'Chimney'}
                          onPress={() => this.setState({ newcap: !this.state.newcap })}
                          checked={this.state.newcap}
                        />
                        <CheckBox
                          title={'Window sills'}
                          onPress={() => this.setState({ sills: !this.state.sills })}
                          checked={this.state.sills}
                        />
                        <CheckBox
                          title={'Parge concrete exterior foundation'}
                          onPress={() => this.setState({ pargeex: !this.state.pargeex })}
                          checked={this.state.pargeex}
                        />
                        <CheckBox
                          title={'Coping Stone'}
                          onPress={() => this.setState({ coping: !this.state.coping })}
                          checked={this.state.coping}
                        />
                        <CheckBox
                          title={'Flashing/weeper/plugged weepers'}
                          onPress={() => this.setState({ flashing: !this.state.flashing })}
                          checked={this.state.flashing}
                        />
                        <CheckBox
                          title={'Exterior Waterproofing'}
                          onPress={() => this.setState({ waterproofing: !this.state.waterproofing })}
                          checked={this.state.waterproofing}
                        />
                        <CheckBox
                          title={'Tuckpointing'}
                          onPress={() => this.setState({ tuckpoint: !this.state.tuckpoint })}
                          checked={this.state.tuckpoint}
                        />
                        <CheckBox
                          title={'Flagstone'}
                          onPress={() => this.setState({ flagstone: !this.state.flagstone })}
                          checked={this.state.flagstone}
                        />
                        <CheckBox
                          title={'India Banas Stone'}
                          onPress={() => this.setState({ banas: !this.state.banas })}
                          checked={this.state.banas}
                        />
                        <CheckBox
                          title={'Flagstone Warrany'}
                          onPress={() => this.setState({ fwarranty: !this.state.fwarranty })}
                          checked={this.state.fwarranty}
                        />
                        <CheckBox
                          title={'Custom'}
                          onPress={() => this.setState({ customModal: !this.state.customModal })}
                          checked={this.state.customModal}
                        />

                      </ScrollView>
                    </View>
                  </Card>
                  <View
                  style={MasterStyleSheet.addEstimateButtonRow1}
                  >
                  <Button
                    icon={{ name: 'attach-money' }}
                    backgroundColor="#03A9F4"
                    title="Add Price"
                    onPress={() => this.setState({ pricingModal: true })}
                  />
                  <Button
                    icon={{ name: 'info' }}
                    backgroundColor="#03A9F4"
                    title="Ask Surveyor"
                  />
                  </View>
                  <Button
                    buttonStyle={MasterStyleSheet.addEstimateButton}
                    icon={{ name: 'help' }}
                    backgroundColor="#03A9F4"
                    title="Ask Dave"
                  />

                  <Button
                    buttonStyle={MasterStyleSheet.addEstimateButton}
                    icon={{ name: 'attach-money' }}
                    backgroundColor="#03A9F4"
                    title="Send to Office"
                  />
                  <Button
                    buttonStyle={MasterStyleSheet.addEstimateButton}
                    icon={{ name: 'attach-money' }}
                    backgroundColor="#03A9F4"
                    title="Onsite"
                  />
                  <Button
                    buttonStyle={MasterStyleSheet.addEstimateButton}
                    icon={{ name: 'email' }}
                    backgroundColor="#03A9F4"
                    onPress={() => this.setState({ galleryModal: true })}
                    title="Select Photos"
                  />
                  <Button
                    buttonStyle={MasterStyleSheet.addEstimateButton}
                    icon={{ name: 'email' }}
                    backgroundColor="#03A9F4"
                    title="Preview"
                    onPress={() => this.props.sendEstimate(this.state)}
                  />
                  <Button
                    buttonStyle={MasterStyleSheet.addEstimateButton}
                    icon={{ name: 'email' }}
                    backgroundColor="#03A9F4"
                    title="Send"
                  />
                </View>
              </Col>

            </Grid>
          </Content>
        </Container>
        <PhotoGalleryEstimates
          open={this.state.galleryModal}
          close={() => this.setState({ galleryModal: false })}
          photos={this.props.customer.survey.photos}
          selectPhoto={this.selectPhoto}
        />
        <EstimatePriceModal
          addPrice={this.props.addPrice}
          customer={this.props.customer}
          estimate={this.props.estimate}
          open={this.state.pricingModal}
          close={() => this.setState({ pricingModal: false })}
        />
        <CustomGenericsModal
          open={this.state.customModal}
          close={() => this.setState({ customModal: false })}
          updateCustomInput={this.updateCustomInput}
          value={this.state.customText}

        />
      </Modal>
    );
  }
}

export default MyEstimateModal;
