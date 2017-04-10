import React from 'react';
import { connect } from 'react-redux';

import PricingDetails from './PricingDetails';

const _PricingContainer = ({ ...props }) => (
  <PricingDetails
    id={props.currentCustomer}
  />
);

const mapStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});

const PricingContainer = connect(mapStateToProps, null)(_PricingContainer);

export default PricingContainer;
