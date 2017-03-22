'use es6';

import {Record} from 'immutable';

let defaults = {
  displayName: '',
  etaSeconds: 0,
  isValidEstimate: false,
};

export default class DriverEta extends Record(defaults){
};
