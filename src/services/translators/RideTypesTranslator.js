'use es6';

import {List} from 'immutable';

import RideType from '../../data/RideType';

export default class RideTypesTranslator {
  static translate(response) {

    if (!('ride_types' in response)) {
      throw new ReferenceError('expected ride_types field');
    }

    const rideTypes = response.ride_types;

    if (!Array.isArray(rideTypes)) {
      throw new TypeError('expected ride_types to be an array');
    }

    return List(rideTypes.map((rideType) => {
      return RideTypesTranslator.translateRideType(rideType);
    }));
  }

  static translateRideType(rideType) {
    // if (!('ride_type' in rideType)) {
    //   throw new ReferenceError('expected ride_type field');
    // }

    if (!('ride_type' in rideType)) {
      throw new ReferenceError('expected ride_type field');
    }

    if (!('seats' in rideType)) {
      throw new ReferenceError('expected seats field');
    }

    const type = rideType.ride_type;

    if (typeof type !== 'string') {
      throw new TypeError('expected ride_type to be a string');
    }

    const seats = rideType.seats;

    if (!Number.isInteger(seats)) {
      throw new TypeError('expected seats to be an integer');
    }

    return new RideType({
      rideType: type,
      seats: seats,
    });
  }
}
