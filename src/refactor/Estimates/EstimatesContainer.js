import React from 'react';
import { View, Image, Dimensions, ScrollView, AlertIOS, TouchableHighlight, ActivityIndicatorIOS } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { Text, Card, Button, CheckBox, ListItem } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { graphql, compose } from 'react-apollo';
import Swipeout from 'react-native-swipeout';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { generatePDF } from '../../graphql/mutations';
import { getFinishedSurvey } from '../../graphql/queries';
import { MasterStyleSheet } from '../../style/MainStyles';
import ZoomViewModal from '../../components/photoGallery/zoomViewModal';
import EstimatePriceModal from '../../components/Modals/estimatePriceModal';
import PhotoGalleryEstimates from '../../components/photoGallery/photoGalleryEstimates';
import CustomGenericsModal from '../../components/Modals/customGenericsModal';
import EstimatePreviewModal from '../../components/Modals/estimatePreviewModal';
import generics from '../../components/Estimates/generics';
import { estimateStyles } from '../Style/estimateStyle';


const window = Dimensions.get('window');

class _EstimatesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      pricingModal: false,
      galleryModal: false,
      customModal: false,
      estimatePreviewModal: false,
      priceText: false,
      watertest: false,
      concreteSteps: false,
      concreteCare: false,
      refacingSlices: false,
      refacingComplete: false,
      coping: false,
      flagstone: false,
      flashing: false,
      fwarranty: false,
      obc: false,
      nbc: false,
      chimney: false,
      pargeex: false,
      pwarranty: false,
      retaining: false,
      roof: false,
      sills: false,
      tuckpoint: false,
      custom: false,
      waterproofing: false,
      disclaimerA: false,
      disclaimerS: false,
      tuckpointUniform: false,
      surveyInvite: false,
      surveyInviteDave: false,
      customerClean: false,
      additionalWork: false,
      warrantyAsStated: false,
      existingConcrete: false,
      customText: '',
      zoomModal: false,
      currentSelection: '',
      loadingButton: false,

    };
  }
  previewEstimate = (generic) => {
    this.setState({ loadingButton: true });
    const gen = {
      watertest: this.state.watertest,
      concreteSteps: this.state.concreteSteps,
      concreteCare: this.state.concreteCare,
      refacingSlices: this.state.refacingSlices,
      refacingComplete: this.state.refacingComplete,
      coping: this.state.coping,
      flagstone: this.state.flagstone,
      flashing: this.state.flashing,
      fwarranty: this.state.fwarranty,
      chimney: this.state.chimney,
      obc: this.state.obc,
      nbc: this.state.nbc,
      pargeex: this.state.pargeex,
      pwarranty: this.state.pwarranty,
      retaining: this.state.retaining,
      roof: this.state.roof,
      sills: this.state.sills,
      tuckpoint: this.state.tuckpoint,
      custom: this.state.custom,
      waterproofing: this.state.waterproofing,
      disclaimerA: this.state.disclaimerA,
      disclaimerS: this.state.disclaimerS,
      tuckpointUniform: this.state.tuckpointUniform,
      surveyInvite: this.state.surveyInvite,
      surveyInviteDave: this.state.surveyInviteDave,
      customerClean: this.state.customerClean,
      additionalWork: this.state.additionalWork,
      warrantyAsStated: this.state.warrantyAsStated,
      existingConcrete: this.state.existingConcrete,
    };
    this.props.generatePDF({
      variables: {
        custid: this.props.currentCustomer,
        generics: gen,
        text: this.state.customText,
        preview: true,
      },
    })
    .then((confirm) => {
      if (confirm.data.generatePDFEstimate) {
        setTimeout(() => {
          this.setState({
            estimatePreviewModal: true,
            loadingButton: false,
          });
        }, 15000);
      }
    });
  };

  sendEstimate = () => {
    const gen = {
      watertest: this.state.watertest,
      concreteSteps: this.state.concreteSteps,
      concreteCare: this.state.concreteCare,
      refacingSlices: this.state.refacingSlices,
      refacingComplete: this.state.refacingComplete,
      coping: this.state.coping,
      flagstone: this.state.flagstone,
      flashing: this.state.flashing,
      fwarranty: this.state.fwarranty,
      obc: this.state.obc,
      nbc: this.state.nbc,
      chimney: this.state.chimney,
      pargeex: this.state.pargeex,
      pwarranty: this.state.pwarranty,
      retaining: this.state.retaining,
      roof: this.state.roof,
      sills: this.state.sills,
      tuckpoint: this.state.tuckpoint,
      custom: this.state.custom,
      waterproofing: this.state.waterproofing,
      disclaimerA: this.state.disclaimerA,
      disclaimerS: this.state.disclaimerS,
      tuckpointUniform: this.state.tuckpointUniform,
      surveyInvite: this.state.surveyInvite,
      surveyInviteDave: this.state.surveyInviteDave,
      customerClean: this.state.customerClean,
      additionalWork: this.state.additionalWork,
      warrantyAsStated: this.state.warrantyAsStated,
      existingConcrete: this.state.existingConcrete,
    };
    AlertIOS.alert(
      'Are you sure?',
       'Estimate will be sent to customer',
      [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Send to Customer',
          onPress: () => this.props.generatePDF({
            variables: {
              custid: this.props.currentCustomer,
              generics: gen,
              text: this.state.customText,
              preview: false,
            },
          }).then((res) => {
             // console.log(res)
          }),
        },
      ],
    );
  }

  selectImage = (image) => {
    this.setState({
      currentSelection: image,
      zoomModal: true,
    });
  }

  selectPhoto = (index) => {
    this.props.selectSurveyPhotos({
      variables: {
        custid: this.props.currentCustomer,
        index,
      },
    });
  };

  updateCustomInput = (customText) => {
    this.setState({ customText, custom: true });
  };
  render() {
    if (!this.props.data.getFinishedSurveyQuery) {
      return (
        <Text> No Survey </Text>
      );
    }
    return (
      <View>
        <Grid>
          <Col
            size={50}
            style={MasterStyleSheet.EstimateModalColLeft}
          >
            <View
              style={estimateStyles.surveyResultPhotosView}
            >
              <Swiper
                showsButtons
                style={MasterStyleSheet.EstimateMainSwipe}
                width={window.width / 2}
              >
                { this.props.data.getFinishedSurveyQuery.map((survey, idx) => (
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
                          key={idx}
                          style={MasterStyleSheet.surveyResultInsideView}
                        >
                          <TouchableHighlight
                            onPress={() => this.selectImage(photo.url)}
                          >
                            <Image
                              style={MasterStyleSheet.surveyResultPhotos}
                              source={{ uri: photo.url }}
                            />
                          </TouchableHighlight>
                        </View>
          ))}
                    </Swiper>
                    <ScrollView
                      contentContainerStyle={MasterStyleSheet.surveyResultsNotesView}
                    >
                      { survey.notes.map((note, idx) => (
                        <View key={idx}>
                          <Text h3> {note.description}</Text>
                          <Text h4> {note.text}</Text>
                        </View>
                ))}
                    </ScrollView>
                  </View>
        ))}
              </Swiper>
            </View>
          </Col>
          <Col
            size={45}
            style={MasterStyleSheet.EstimateModalColRight}
          >
            <View
              style={MasterStyleSheet.surveyResultPricingView}
            >
              <Card
                title={'3LP Estimate'}
                containerStyle={MasterStyleSheet.EstimatePreviewCard}
              >
                <View
                  style={MasterStyleSheet.EstimateGenerics}
                >
                  <ScrollView>
                    { generics.map(generic => (
                      <CheckBox
                        title={generic.des}
                        onPress={() => this.setState({ [generic.prop]: !this.state[generic.prop] })}
                        checked={this.state[generic.prop]}
                        containerStyle={MasterStyleSheet.checkBox}
                      />
                     ))}
                    <ListItem
                      raised
                      containerStyle={MasterStyleSheet.customText}
                      title="Custom Text"
                      onPress={() => this.setState({ customModal: true })}
                    />
                  </ScrollView>
                  <View
                    style={MasterStyleSheet.addEstimateButtonRow1}
                  >
                    <Button
                      raised
                      buttonStyle={MasterStyleSheet.addEstimateButton}
                      title="Price"
                      onPress={() => Actions.pricingContainer()}
                    />
                    <Button
                      raised
                      buttonStyle={MasterStyleSheet.addEstimateButton}
                      onPress={() => Actions.photoGalleryContainer()}
                      title="Photos"
                    />
                  </View>
                  <View
                    style={MasterStyleSheet.addEstimateButtonRow1}
                  >
                    <Button
                      raised
                      buttonStyle={MasterStyleSheet.addEstimateButton}
                      title={'Preview'}
                      disabled={this.state.loadingButton}
                      onPress={() => this.previewEstimate(this.state)}
                    />
                    <Button
                      raised
                      buttonStyle={MasterStyleSheet.addEstimateButton}
                      title="Send"
                      onPress={this.sendEstimate}
                    />
                  </View>
                </View>
              </Card>
            </View>
          </Col>
        </Grid>
        <PhotoGalleryEstimates
          user={this.props.user}
          customer={this.props.data.customer}
          open={this.state.galleryModal}
          close={() => this.setState({ galleryModal: false })}
          photos={this.props.data.customer.survey.photos}
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
        <EstimatePreviewModal
          open={this.state.estimatePreviewModal}
          close={() => this.setState({ estimatePreviewModal: false })}
          customer={this.props.data.customer}
        />
        <ZoomViewModal
          open={this.state.zoomModal}
          close={() => { this.setState({ zoomModal: false }); }}
          photo={this.state.currentSelection}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});

const EstimatesContainer = compose(
    graphql(generatePDF, { name: 'generatePDF' }),
    connect(mapStateToProps, null),
    graphql(getFinishedSurvey, {
      options: ({ id }) => ({ variables: { id }, pollInterval: 2000 }),
    }),
)(_EstimatesContainer);

export default EstimatesContainer;

