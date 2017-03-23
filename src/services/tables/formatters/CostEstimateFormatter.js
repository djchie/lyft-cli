'use es6';

import CurrencySymbol from 'currency-symbol-map';

import DistanceUnit from '../../../data/DistanceUnit';
import DistanceConverter from '../../converters/DistanceConverter';
import DurationConverter from '../../converters/DurationConverter';
import Utilities from '../../../Utilities';

export default class CostEstimateFormatter {

  static formatRange(range) {
    const currencySymbol = CurrencySymbol(range.currencyCode);
    return `${currencySymbol}${range.min / 100} - ${currencySymbol}${range.max / 100}`;
  }

  static formatDistance(distance) {
    // 2 decimal places
    const roundedDistanceValue = Math.round(distance.value * 100) / 100;
    return `${roundedDistanceValue} ${CostEstimateFormatter.getDistanceUnitAbbreviation(distance.unit)}.`;
  }

  static formatDuration(duration) {
    // TODO @jbradley Utilities currently formats time in seconds - build better formatting logic
    // const durationInSeconds = DurationConverter.convert(duration, TimeUnit.SECOND);
    // return Utilities.generateFormattedTime(durationInSeconds.length);
    console.log(duration);
    return Utilities.generateFormattedTime(duration.length);
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
