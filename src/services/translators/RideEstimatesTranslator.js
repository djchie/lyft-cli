'use es6';

import {List} from 'immutable';

import Distance from '../../data/Distance';
import DistanceUnit from '../../data/DistanceUnit';
import Duration from '../../data/Duration';
import TimeUnit from '../../data/TimeUnit';
import PriceRange from '../../data/PriceRange';
import RideEstimate from '../../data/RideEstimate';

export default class RideEstimatesTranslator {
  static translate(response) {
    if (!('cost_estimates' in response)) {
      throw new ReferenceError('expected cost_estimates field');
    }

    const costEstimates = response.cost_estimates;

    if (!Array.isArray(costEstimates)) {
      throw new TypeError('expected cost_estimates to be an array');
    }

    return List(costEstimates.map((costEstimate) => {
      return RideEstimatesTranslator.translateCostEstimate(costEstimate);
    }));
  }

  static translateCostEstimate(costEstimate) {

    if (!('estimated_duration_seconds' in costEstimate)) {
      throw new ReferenceError('expected estimated_duration_seconds field');
    }

    if (!('estimated_distance_miles' in costEstimate)) {
      throw new ReferenceError('expected estimated_distance_miles field');
    }

    
    if (!('estimated_cost_cents_max' in costEstimate)) {
      throw new ReferenceError('expected estimated_cost_cents_max field');
    }

    if (!('primetime_percentage' in costEstimate)) {
      throw new ReferenceError('expected primetime_percentage field');
    }

    if (!('is_valid_estimate' in costEstimate)) {
      throw new ReferenceError('expected is_valid_estimate field');
    }

    if (!('currency' in costEstimate)) {
      throw new ReferenceError('expected currency field');
    }

    if (!('estimated_cost_cents_min' in costEstimate)) {
      throw new ReferenceError('expected estimated_cost_cents_min field');
    }

    if (!('display_name' in costEstimate)) {
      throw new ReferenceError('expected display_name field');
    }

    const estimatedDurationSeconds = costEstimate.estimated_duration_seconds;

    if (!Number.isInteger(estimatedDurationSeconds)) {
      throw new TypeError('expected estimated_duration_seconds to be an integer');
    }

    const estimatedDistanceMiles = costEstimate.estimated_distance_miles;

    if (typeof(estimatedDistanceMiles) !== 'number') {
      throw new TypeError('expected estimated_distance_miles to be a number');
    }

    const estimatedCostCentsMax = costEstimate.estimated_cost_cents_max;

    if (!Number.isInteger(estimatedCostCentsMax)) {
      throw new TypeError('expected estimated_cost_cents_max to be an integer');
    }

    const primetimePercentage = costEstimate.primetime_percentage;

    if (typeof(primetimePercentage) !== 'string') {
      throw new TypeError('expected primetime_percentage to be a string');
    }

    const isValidEstimate = costEstimate.is_valid_estimate;

    if (!typeof(isValidEstimate) === 'boolean') {
      throw new TypeError('expected is_valid_estimate to be an boolean');
    }

    const currency = costEstimate.currency;

    if (typeof(currency) !== 'string') {
      throw new TypeError('expected currency to be a string');
    }

    const estimatedCostCentsMin = costEstimate.estimated_cost_cents_min;

    if (!Number.isInteger(estimatedCostCentsMin)) {
      throw new TypeError('expected estimated_cost_cents_min to be an integer');
    }

    const displayName = costEstimate.display_name;

    if (typeof(displayName) !== 'string') {
      throw new TypeError('expected display_name to be a string');
    }

    return new RideEstimate({
      displayName: displayName,
      estimatedDuration: new Duration({
        length: estimatedDurationSeconds,
        unit: TimeUnit.SECOND,
      }),
      estimatedDistance: new Distance({
        value: estimatedDistanceMiles,
        unit: DistanceUnit.MILE,
      }),
      isValidEstimate: isValidEstimate,
      primetimePercentage: parseInt(primetimePercentage),
      priceRange: new PriceRange({
        min: estimatedCostCentsMin,
        max: estimatedCostCentsMax,
        currencyCode: currency,
      }),
    });
  }
}
