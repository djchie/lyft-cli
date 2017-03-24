'use es6';

import {Record} from 'immutable';

import Distance from './Distance';
import Duration from './Duration';
import PriceRange from './PriceRange';

let defaults = {
  displayName: '',
  estimatedDistance: new Distance(),
  priceRange: new PriceRange(),
  estimatedDuration: new Duration(),
  isValidEstimate: false,
  primetimePercentage: 0,
};

export default class RideEstimate extends Record(defaults) {
}
