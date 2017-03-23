'use es6';

import {Record} from 'immutable';

let defaults = {
  min: 0,
  max: 0,
  currencyCode: 'USD'
};

export default class PriceRange extends Record(defaults){
};
