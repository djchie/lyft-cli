'use es6';

import {List, Record} from 'immutable';

import Location from './Location';

let defaults = {
  location: new Location(),
  nearbyDrivers: List()
};

export default class NearbyDrivers extends Record(defaults) {
}
