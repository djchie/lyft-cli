'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {
  List,
} from 'immutable';

import Location from '../src/data/Location';
import Duration from '../src/data/Duration';
import TimeUnit from '../src/data/TimeUnit';
import Distance from '../src/data/Distance';
import DistanceUnit from '../src/data/DistanceUnit';
import PriceRange from '../src/data/PriceRange';
import RideEstimate from '../src/data/RideEstimate';
import RideEstimatesTranslator from '../src/services/translators/RideEstimatesTranslator';

chai.use(chaiImmutable);
let expect = chai.expect;

describe('Test Ride Estimates Translator', () => {
  let displayName = 'derrick';
  let estimatedDurationSeconds = 120;
  let estimatedDistanceMiles = 20;
  let isValidEstimate = true;
  let primetimePercentage = '25%';
  let estimatedCostCentsMin = 650;
  let estimatedCostCentsMax = 950;
  let currency = 'USD';

  let costEstimate = {
    estimated_duration_seconds: estimatedDurationSeconds, 
    estimated_distance_miles: estimatedDistanceMiles, 
    estimated_cost_cents_max: estimatedCostCentsMax, 
    primetime_percentage: primetimePercentage, 
    is_valid_estimate: isValidEstimate, 
    currency: currency, 
    estimated_cost_cents_min: estimatedCostCentsMin, 
    display_name: displayName, 
  }

  let expectedRideEstimate = new RideEstimate({
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
  let mockResponse = {
    'cost_estimates': [
      costEstimate,
      costEstimate,
    ],
  };
  let expectedRideEstimates = List.of(expectedRideEstimate, expectedRideEstimate);

  it('should translate cost estimate', () => {
    expect(RideEstimatesTranslator.translateCostEstimate(costEstimate)).to.eql(expectedRideEstimate);
  });

  it('should throw when attempting to translate cost estimate', () => {
    let incorrectlyFormattedCostEstimate = {};

    expect(() => RideEstimatesTranslator.translateCostEstimate(incorrectlyFormattedCostEstimate)).to.throw(ReferenceError);

    incorrectlyFormattedCostEstimate['estimated_duration_seconds'] = 'foo';

    expect(() => RideEstimatesTranslator.translateCostEstimate(incorrectlyFormattedCostEstimate)).to.throw(ReferenceError);

    incorrectlyFormattedCostEstimate['estimated_distance_miles'] = 'bar';

    expect(() => RideEstimatesTranslator.translateCostEstimate(incorrectlyFormattedCostEstimate)).to.throw(ReferenceError);

    incorrectlyFormattedCostEstimate['estimated_cost_cents_max'] = 'derrick';

    expect(() => RideEstimatesTranslator.translateCostEstimate(incorrectlyFormattedCostEstimate)).to.throw(ReferenceError);

    incorrectlyFormattedCostEstimate['primetime_percentage'] = 25;

    expect(() => RideEstimatesTranslator.translateCostEstimate(incorrectlyFormattedCostEstimate)).to.throw(ReferenceError);

    incorrectlyFormattedCostEstimate['is_valid_estimate'] = 'yes';

    expect(() => RideEstimatesTranslator.translateCostEstimate(incorrectlyFormattedCostEstimate)).to.throw(ReferenceError);

    incorrectlyFormattedCostEstimate['currency'] = 'FU';

    expect(() => RideEstimatesTranslator.translateCostEstimate(incorrectlyFormattedCostEstimate)).to.throw(ReferenceError);

    incorrectlyFormattedCostEstimate['estimated_cost_cents_min'] = '100';

    expect(() => RideEstimatesTranslator.translateCostEstimate(incorrectlyFormattedCostEstimate)).to.throw(ReferenceError);

    incorrectlyFormattedCostEstimate['display_name'] = 1234;

    expect(() => RideEstimatesTranslator.translateCostEstimate(incorrectlyFormattedCostEstimate)).to.throw(TypeError);
  });

  it('should translate cost estimates', () => {
    expect(RideEstimatesTranslator.translate(mockResponse)).to.eql(expectedRideEstimates);
  });

  it('should throw when attempting to translate cost estimates', () => {
    let incorrectlyFormattedResponse = {};

    expect(() => RideEstimatesTranslator.translate(incorrectlyFormattedResponse)).to.throw(ReferenceError);

    incorrectlyFormattedResponse['cost_estimates'] = 1;

    expect(() => RideEstimatesTranslator.translate(incorrectlyFormattedResponse)).to.throw(TypeError);
  });
});
