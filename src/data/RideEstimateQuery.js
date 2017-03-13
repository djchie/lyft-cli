'use es6';

import {
  Record,
} from 'immutable';

const defaults = {
  startAddress: '',
  endAddress: '',
};

export default class RideEstimateQuery extends Record(defaults) {
  static from(startAddress, endAddress) {
    return new RideEstimateQuery({
      startAddress: startAddress,
      endAddress: endAddress,
    });
  }
}
