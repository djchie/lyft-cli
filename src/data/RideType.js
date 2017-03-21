'use es6';

import {Record} from 'immutable';

let defaults = {
  displayName: '',
  seats: 0,
};

export default class RideType extends Record(defaults){
};
