'use es6';

import {expect} from 'chai';

import {List, Map} from 'immutable';

import Coordinate from '../src/data/Coordinate';
import Location from '../src/data/Location';
import RideType from '../src/data/RideType';
import RideTypes from '../src/data/RideTypes';
import RideTypesTableBuilder from '../src/services/tables/builders/RideTypesTableBuilder';

describe('Test Ride Types Table Builder', () => {
  let location = new Location({
    name: 'home\'s where the heart is',
    coordinate: new Coordinate()
  });
  let rideTypesResponse = List.of(
    new RideType({
      displayName: 'derrick',
      seats: 4,
    }),
    new RideType({
      displayName: 'jiwei',
      seats: 6,
    }),
    new RideType({
      displayName: 'chie',
      seats: 2,
    })
  );
  let rideTypes = new RideTypes({
    location: location,
    rideTypes: rideTypesResponse,
  });

  it('tests table creation', () => {
    let expectedTableString = '\u001b[90m┌─────────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m 📍 home\'s where the heart is \u001b[90m│\u001b[39m\n\u001b[90m├─────────────────\u001b[39m\u001b[90m┬───────────┤\u001b[39m\n\u001b[90m│\u001b[39m        🚗        \u001b[90m│\u001b[39m     💺     \u001b[90m│\u001b[39m\n\u001b[90m├─────────────────\u001b[39m\u001b[90m┼───────────┤\u001b[39m\n\u001b[90m│\u001b[39m chie            \u001b[90m│\u001b[39m     2     \u001b[90m│\u001b[39m\n\u001b[90m├─────────────────\u001b[39m\u001b[90m┼───────────┤\u001b[39m\n\u001b[90m│\u001b[39m derrick         \u001b[90m│\u001b[39m     4     \u001b[90m│\u001b[39m\n\u001b[90m├─────────────────\u001b[39m\u001b[90m┼───────────┤\u001b[39m\n\u001b[90m│\u001b[39m jiwei           \u001b[90m│\u001b[39m     6     \u001b[90m│\u001b[39m\n\u001b[90m└─────────────────\u001b[39m\u001b[90m┴───────────┘\u001b[39m';
    let tableString = RideTypesTableBuilder.build(rideTypes);
    console.log(expectedTableString);
    console.log(tableString);
    expect(tableString).to.eql(expectedTableString);
  });
});
