'use es6';

import {List, Record} from 'immutable';

import Location from './Location';

let defaults = {
  location: new Location(),
  driverEtas: List()
};

export default class DriverEtas extends Record(defaults) {
}
