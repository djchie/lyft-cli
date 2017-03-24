'use es6';

import {
  List,
} from 'immutable';

import Coordinate from '../../data/Coordinate';
import Location from '../../data/Location';
import Utilities from '../../Utilities';

export default class CurrentLocationTranslator {
  static translate(json) {

    if (!('latitude' in json)) {
      throw new ReferenceError('expected latitude field');
    }

    const latitude = json['latitude'];

    if (typeof(latitude) !== 'number') {
      throw new TypeError('expected latitude to be a number');
    }

    if (!('longitude' in json)) {
      throw new ReferenceError('expected longitude field');
    }

    const longitude = json['longitude'];
    
    if (typeof(longitude) !== 'number') {
      throw new TypeError('expected longitude to be a number');
    }

    // Uncomment below for showing current location address
    // return new Coordinate({
    //   latitude: latitude,
    //   longitude: longitude,
    // });

    return new Location({
      name: 'Current Location',
      coordinate: new Coordinate({
        latitude: latitude,
        longitude: longitude,
      })
    });
  }
}
