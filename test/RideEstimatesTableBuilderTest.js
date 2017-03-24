'use es6';

import {expect} from 'chai';

import {List, Map} from 'immutable';

import Coordinate from '../src/data/Coordinate';
import Distance from '../src/data/Distance';
import DistanceUnit from '../src/data/DistanceUnit';
import Duration from '../src/data/Duration';
import Location from '../src/data/Location';
import RideEstimate from '../src/data/RideEstimate';
import RideEstimates from '../src/data/RideEstimates';
import RideEstimatesTableBuilder from '../src/services/tables/builders/RideEstimatesTableBuilder';
import PriceRange from '../src/data/PriceRange';
import TimeUnit from '../src/data/TimeUnit';

describe('Test Ride Estimates Table Builder', () => {
  let start = new Location({
    name: 'start location name',
    coordinate: new Coordinate()
  });
  let end = new Location({
    name: 'end location name',
    coordinate: new Coordinate()
  });
  let costEstimatesResponse = List.of(
    new RideEstimate({
      displayName: 'derrick',
      estimatedDistance: new Distance({
        value: 1,
        unit: DistanceUnit.MILE
      }),
      priceRange: new PriceRange({
        min: 200,
        max: 300,
        currencyCode: 'USD',
      }),
      estimatedDuration: new Duration({
        length: 4,
        unit: TimeUnit.SECOND
      }),
      primetimePercentage: 0,
      isValidEstimate: true,
    }),
    new RideEstimate({
      displayName: 'jiwei',
      estimatedDistance: new Distance({
        value: 5,
        unit: DistanceUnit.MILE
      }),
      priceRange: new PriceRange({
        min: 600,
        max: 700,
        currencyCode: 'GBP',
      }),
      estimatedDuration: new Duration({
        length: 8,
        unit: TimeUnit.SECOND
      }),
      primetimePercentage: 25,
      isValidEstimate: true,
    }),
    new RideEstimate({
      displayName: 'chie',
      estimatedDistance: new Distance({
        value: 9,
        unit: DistanceUnit.MILE
      }),
      priceRange: new PriceRange({
        min: 1000,
        max: 1100,
        currencyCode: 'EUR',
      }),
      estimatedDuration: new Duration({
        length: 12,
        unit: TimeUnit.SECOND
      }),
      primetimePercentage: 100,
      isValidEstimate: true,
    }),
  );

  let rideEstimates = new RideEstimates({
    start: start,
    end: end,
    costEstimates: costEstimatesResponse,
  });

  it('tests table creation', () => {
    let expectedTableString = '\u001b[90m┌─────────\u001b[39m\u001b[90m┬───────────\u001b[39m\u001b[90m┬───────\u001b[39m\u001b[90m┬─────────\u001b[39m\u001b[90m┬──────────────┐\u001b[39m\n\u001b[90m│\u001b[39m    🚗    \u001b[90m│\u001b[39m     💸     \u001b[90m│\u001b[39m   🔃   \u001b[90m│\u001b[39m    ⏳    \u001b[90m│\u001b[39m 💥 Primetime💥 \u001b[90m│\u001b[39m\n\u001b[90m├─────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼──────────────┤\u001b[39m\n\u001b[90m│\u001b[39m chie    \u001b[90m│\u001b[39m €10 - €11 \u001b[90m│\u001b[39m 9 mi. \u001b[90m│\u001b[39m 12 sec. \u001b[90m│\u001b[39m    100% 😩    \u001b[90m│\u001b[39m\n\u001b[90m├─────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼──────────────┤\u001b[39m\n\u001b[90m│\u001b[39m derrick \u001b[90m│\u001b[39m $2 - $3   \u001b[90m│\u001b[39m 1 mi. \u001b[90m│\u001b[39m 4 sec.  \u001b[90m│\u001b[39m     0% 🙂     \u001b[90m│\u001b[39m\n\u001b[90m├─────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼───────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼──────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jiwei   \u001b[90m│\u001b[39m £6 - £7   \u001b[90m│\u001b[39m 5 mi. \u001b[90m│\u001b[39m 8 sec.  \u001b[90m│\u001b[39m    25% 😕     \u001b[90m│\u001b[39m\n\u001b[90m├─────────\u001b[39m\u001b[90m┼───────────┴───────┴─────────┴──────────────┤\u001b[39m\n\u001b[90m│\u001b[39m    📍    \u001b[90m│\u001b[39m start location name                        \u001b[90m│\u001b[39m\n\u001b[90m├─────────\u001b[39m\u001b[90m┼────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m    🔚    \u001b[90m│\u001b[39m end location name                          \u001b[90m│\u001b[39m\n\u001b[90m└─────────\u001b[39m\u001b[90m┴────────────────────────────────────────────┘\u001b[39m';
    let tableString = RideEstimatesTableBuilder.build(rideEstimates);
    console.log(expectedTableString);
    console.log(tableString);
    expect(tableString).to.equal(expectedTableString);
  });
});