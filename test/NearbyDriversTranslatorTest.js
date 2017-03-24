'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {
  List,
} from 'immutable';

import Coordinate from '../src/data/Coordinate';
import Location from '../src/data/Location';
import Distance from '../src/data/Distance';
import DistanceUnit from '../src/data/DistanceUnit';
import NearbyDriver from '../src/data/NearbyDriver';
import NearbyDriversTranslator from '../src/services/translators/NearbyDriversTranslator';

chai.use(chaiImmutable);
let expect = chai.expect;

describe('Test Nearby Drivers Translator', () => {
  let rideType = 'derrick';
  let driver1 = {
    locations: [
      {
        lat: 100,
        lng: 100,
      },
      {
        lat: 105,
        lng: 90,
      },
    ],
  };
  let driver2 = {
    locations: [
      {
        lat: 103,
        lng: 101,
      },
      {
        lat: 105,
        lng: 98,
      },
    ],
  };
  let drivers = [
    driver1,
    driver2,
  ];
  let nearbyDriver = {
    'ride_type': rideType,
    'drivers': drivers,
  };
  let coordinate = new Coordinate({
    latitude: 99,
    longitude: 99,
  });
  let location = new Location({
    name: 'chie',
    coordinate: coordinate,
  });
  let expectedNearbyDriver = new NearbyDriver({
    rideType: rideType,
    distance: new Distance({
      value: 70.02213617201771,
      unit: DistanceUnit.MILE,
    }),
  });
  let mockResponse = {
    'nearby_drivers': [
      nearbyDriver,
      nearbyDriver,
    ],
  };
  let expectedNearbyDrivers = List.of(expectedNearbyDriver, expectedNearbyDriver);

  it('should translate nearby driver', () => {
    expect(NearbyDriversTranslator.translateNearbyDriver(nearbyDriver, coordinate)).to.eql(expectedNearbyDriver);
  });

  it('should throw when attempting to translate nearby driver', () => {
    let incorrectlyFormattedNearbyDriver = {};

    expect(() => NearbyDriversTranslator.translateNearbyDriver(incorrectlyFormattedNearbyDriver)).to.throw(ReferenceError);

    incorrectlyFormattedNearbyDriver['ride_type'] = 1;

    expect(() => NearbyDriversTranslator.translateNearbyDriver(incorrectlyFormattedNearbyDriver)).to.throw(ReferenceError);

    incorrectlyFormattedNearbyDriver['drivers'] = 'foo';

    expect(() => NearbyDriversTranslator.translateNearbyDriver(incorrectlyFormattedNearbyDriver)).to.throw(TypeError);

    incorrectlyFormattedNearbyDriver['ride_type'] = rideType;
    incorrectlyFormattedNearbyDriver['drivers'] = [{}];

    expect(() => NearbyDriversTranslator.translateNearbyDriver(incorrectlyFormattedNearbyDriver)).to.throw(ReferenceError);

    incorrectlyFormattedNearbyDriver['drivers'] = [{
      locations: 1234,
    }];

    expect(() => NearbyDriversTranslator.translateNearbyDriver(incorrectlyFormattedNearbyDriver)).to.throw(TypeError);

    incorrectlyFormattedNearbyDriver['drivers'] = [{
      locations: [{}],
    }];

    expect(() => NearbyDriversTranslator.translateNearbyDriver(incorrectlyFormattedNearbyDriver)).to.throw(ReferenceError);

    incorrectlyFormattedNearbyDriver['drivers'] = [{
      locations: [{
        lat: 120,
      }],
    }];

    expect(() => NearbyDriversTranslator.translateNearbyDriver(incorrectlyFormattedNearbyDriver)).to.throw(ReferenceError);
  });

  it('should translate nearby drivers', () => {
    expect(NearbyDriversTranslator.translate(mockResponse, location)).to.eql(expectedNearbyDrivers);
  });

  it('should throw when attempting to translate nearby drivers', () => {
    let incorrectlyFormattedResponse = {};

    expect(() => NearbyDriversTranslator.translate(incorrectlyFormattedResponse, location)).to.throw(ReferenceError);

    incorrectlyFormattedResponse['nearby_drivers'] = 1;

    expect(() => NearbyDriversTranslator.translate(incorrectlyFormattedResponse, location)).to.throw(TypeError);
  });
});
