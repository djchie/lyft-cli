'use es6';

import {expect} from 'chai';

import {List, Map} from 'immutable';

import Coordinate from '../src/data/Coordinate';
import Location from '../src/data/Location';
import Distance from '../src/data/Distance';
import DistanceUnit from '../src/data/DistanceUnit';
import NearbyDriver from '../src/data/NearbyDriver';
import NearbyDrivers from '../src/data/NearbyDrivers';
import NearbyDriversTableBuilder from '../src/services/tables/builders/NearbyDriversTableBuilder';

describe('Test Nearby Drivers Table Builder', () => {
  let location = new Location({
    name: 'home\'s where the heart is',
    coordinate: new Coordinate()
  });
  let nearbyDriversResponse = List.of(
    new NearbyDriver({
      rideType: 'derrick',
      distance: new Distance({
        value:  5,
        unit: DistanceUnit.MILE,
      }),
    }),
    new NearbyDriver({
      rideType: 'jiwei',
      distance: new Distance({
        value:  7,
        unit: DistanceUnit.MILE,
      }),
    }),
    new NearbyDriver({
      rideType: 'chie',
      distance: new Distance({
        value:  1,
        unit: DistanceUnit.MILE,
      }),
    })
  );
  let nearbyDrivers = new NearbyDrivers({
    location: location,
    nearbyDrivers: nearbyDriversResponse,
  });

  it('tests table creation', () => {
    let expectedTableString = '\u001b[90m┌─────────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m 📍 home\'s where the heart is \u001b[90m│\u001b[39m\n\u001b[90m├───────────────\u001b[39m\u001b[90m┬─────────────┤\u001b[39m\n\u001b[90m│\u001b[39m       🚗       \u001b[90m│\u001b[39m      📏      \u001b[90m│\u001b[39m\n\u001b[90m├───────────────\u001b[39m\u001b[90m┼─────────────┤\u001b[39m\n\u001b[90m│\u001b[39m Chie          \u001b[90m│\u001b[39m    1 mi.    \u001b[90m│\u001b[39m\n\u001b[90m├───────────────\u001b[39m\u001b[90m┼─────────────┤\u001b[39m\n\u001b[90m│\u001b[39m Derrick       \u001b[90m│\u001b[39m    5 mi.    \u001b[90m│\u001b[39m\n\u001b[90m├───────────────\u001b[39m\u001b[90m┼─────────────┤\u001b[39m\n\u001b[90m│\u001b[39m Jiwei         \u001b[90m│\u001b[39m    7 mi.    \u001b[90m│\u001b[39m\n\u001b[90m└───────────────\u001b[39m\u001b[90m┴─────────────┘\u001b[39m';
    let tableString = NearbyDriversTableBuilder.build(nearbyDrivers);
    console.log(expectedTableString);
    console.log(tableString);
    expect(tableString).to.eql(expectedTableString);
  });
});
