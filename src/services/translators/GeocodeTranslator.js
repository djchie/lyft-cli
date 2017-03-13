'use es6';

import {
  List,
} from 'immutable';

import Coordinate from '../../data/Coordinate';
import Location from '../../data/Location';
import Utilities from '../../Utilities';

export default class GeocodeTranslator {
  static translate(json) {
    if (!('status' in json)) {
      throw new ReferenceError('expected status field');
    }

    if (json['status'] !== 'OK') {
      throw new TypeError('unexpected status value');
    }

    if (!('results' in json)) {
      throw new ReferenceError('expected results field');
    }

    let results = json['results'];
    if (!Array.isArray(results)) {
      throw new TypeError('expected array of results');
    }

    return List(results.map(result => GeocodeTranslator.translateLocation(result)));
  }

  static translateLocation(json) {
    if (!('formatted_address' in json)) {
      throw new ReferenceError('expected formatted address field');
    }

    let formattedAddress = json['formatted_address'];

    if (!('geometry' in json)) {
      throw new ReferenceError('expected geometry field');
    }

    let geometry = json['geometry'];

    if (!('location' in geometry)) {
      throw new ReferenceError('expected location field in geometry field');
    }

    let location = geometry['location'];

    if (!('lat' in location)) {
      throw new ReferenceError('expected lat field in location field');
    }

    if (!('lng' in location)) {
      throw new ReferenceError('expected lng field in location field');
    }

    let latitude = location['lat'];
    let longitude = location['lng'];

    if (typeof formattedAddress !== 'string') {
      throw new TypeError('expected address to be a string');
    }

    if (!Utilities.isFloat(latitude)) {
      throw new TypeError('expected latitude to be a float');
    }

    if (!Utilities.isFloat(longitude)) {
      throw new TypeError('expected longitude to be a float');
    }

    return new Location({
      name: formattedAddress,
      coordinate: new Coordinate({
        latitude: latitude,
        longitude: longitude,
      })
    });
  }
}
