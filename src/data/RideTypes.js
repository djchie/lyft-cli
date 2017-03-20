'use es6';

import {List, Record} from 'immutable';

import Location from './Location';

let defaults = {
  location: new Location(),
  rideTypes: List()
};

export default class RideTypes extends Record(defaults) {
}
