'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {
  List,
} from 'immutable';

import RideType from '../src/data/RideType';
import RideTypesTranslator from '../src/services/translators/RideTypesTranslator';

chai.use(chaiImmutable);
let expect = chai.expect;

describe('Test Ride Types Translator', () => {
  let displayName = 'derrick';
  let seats = 3;
  let rideType = {
    'display_name': displayName,
    'seats': seats,
  };
  let expectedRideType = new RideType({
    displayName: displayName,
    seats: seats,
  });
  let mockResponse = {
    'ride_types': [
      rideType,
      rideType,
    ],
  };
  let expectedRideTypes = List.of(expectedRideType, expectedRideType);

  it('should translate ride type', () => {
    expect(RideTypesTranslator.translateRideType(rideType)).to.eql(expectedRideType);
  });

  it('should throw when attempting to translate ride type', () => {
    let incorrectlyFormattedRideType = {};

    expect(() => RideTypesTranslator.translateRideType(incorrectlyFormattedRideType)).to.throw(ReferenceError);

    incorrectlyFormattedRideType['display_name'] = 1;

    expect(() => RideTypesTranslator.translateRideType(incorrectlyFormattedRideType)).to.throw(ReferenceError);

    incorrectlyFormattedRideType['seats'] = 'foo';

    expect(() => RideTypesTranslator.translateRideType(incorrectlyFormattedRideType)).to.throw(TypeError);
  });

  it('should translate ride types', () => {
    expect(RideTypesTranslator.translate(mockResponse)).to.eql(expectedRideTypes);
  });

  it('should throw when attempting to translate ride types', () => {
    let incorrectlyFormattedResponse = {};

    expect(() => RideTypesTranslator.translate(incorrectlyFormattedResponse)).to.throw(ReferenceError);

    incorrectlyFormattedResponse['ride_types'] = 1;

    expect(() => RideTypesTranslator.translate(incorrectlyFormattedResponse)).to.throw(TypeError);
  });
});
