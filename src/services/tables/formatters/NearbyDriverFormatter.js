'use es6';

import DistanceUnit from '../../../data/DistanceUnit';
import DistanceConverter from '../../converters/DistanceConverter';
import DurationConverter from '../../converters/DurationConverter';

export default class NearbyDriverFormatter {

  static formatRideType(rideType) {
    rideType = rideType.split('_');
    rideType.forEach((word, index, array) => {
      array[index] = word.charAt(0).toUpperCase() + word.slice(1);
    });
    return rideType.join(' ');
  }

  static formatDistance(distance) {
    // 2 decimal places
    const roundedDistanceValue = Math.round(distance.value * 100) / 100;
    return `${roundedDistanceValue} ${NearbyDriverFormatter.getDistanceUnitAbbreviation(distance.unit)}.`;
  }

  static getDistanceUnitAbbreviation(unit) {
    switch (unit) {
      case DistanceUnit.MILE: {
        return 'mi';
      }

      case DistanceUnit.KILOMETER: {
        return 'km';
      }

      default: {
        throw new TypeError('Unexpected distance unit');
      }
    }
  }
}
