'use es6';

import {List, Record} from 'immutable';

import Location from './Location';

let defaults = {
  start: new Location(),
  end: new Location(),
  costEstimates: List()
};

export default class RideEstimates extends Record(defaults) {
}
