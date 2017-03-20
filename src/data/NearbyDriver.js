'use es6';

import {Record} from 'immutable';

import Distance from './Distance';

let defaults = {
  rideType: '',
  distance: new Distance(),
};

export default class NearbyDriver extends Record(defaults){
};
