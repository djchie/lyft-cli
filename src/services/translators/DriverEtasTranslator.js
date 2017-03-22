'use es6';

import {List} from 'immutable';

import Duration from '../../data/Duration';
import TimeUnit from '../../data/TimeUnit';
import DriverEta from '../../data/DriverEta';

export default class DriverEtasTranslator {
  static translate(response) {
    if (!('eta_estimates' in response)) {
      throw new ReferenceError('expected eta_estimates field');
    }

    const etaEstimates = response.eta_estimates;

    if (!Array.isArray(etaEstimates)) {
      throw new TypeError('expected eta_estimates to be an array');
    }

    return List(etaEstimates.map((etaEstimate) => {
      return DriverEtasTranslator.translateEtaEstimate(etaEstimate);
    }));
  }

  static translateEtaEstimate(etaEstimate) {
    if (!('display_name' in etaEstimate)) {
      throw new ReferenceError('expected display_name field');
    }

    if (!('eta_seconds' in etaEstimate)) {
      throw new ReferenceError('expected eta_seconds field');
    }

    if (!('is_valid_estimate' in etaEstimate)) {
      throw new ReferenceError('expected is_valid_estimate field');
    }

    const displayName = etaEstimate.display_name;

    if (typeof displayName !== 'string') {
      throw new TypeError('expected display_name to be a string');
    }

    const etaSeconds = etaEstimate.eta_seconds;

    if (!Number.isInteger(etaSeconds)) {
      throw new TypeError('expected eta_seconds to be an integer');
    }

    const isValidEstimate = etaEstimate.is_valid_estimate;

    if (!typeof(isValidEstimate) === 'boolean') {
      throw new TypeError('expected is_valid_estimate to be an boolean');
    }

    return new DriverEta({
      displayName: displayName,
      etaSeconds: new Duration({
        length: etaSeconds,
        unit: TimeUnit.SECOND,
      }),
      isValidEstimate: isValidEstimate,
    });
  }
}
