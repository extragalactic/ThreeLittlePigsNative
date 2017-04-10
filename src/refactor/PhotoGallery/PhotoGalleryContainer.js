import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import PhotoGalleryDetails from './PhotoGalleryDetails';

const _PhotoGalleryContainer = ({ ...props }) => (
  <PhotoGalleryDetails
    id={props.currentCustomer}
  />

  );

const mapStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});

const PhotoGalleryContainer = compose(
  connect(mapStateToProps, null),
)(_PhotoGalleryContainer);

export default PhotoGalleryContainer;
