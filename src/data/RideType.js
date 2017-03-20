'use es6';

import {Record} from 'immutable';

let defaults = {
  rideType: '',
  seats: 0,
};

export default class RideType extends Record(defaults){
};
