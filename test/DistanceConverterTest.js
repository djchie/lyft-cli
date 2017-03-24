'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import Distance from '../src/data/Distance';
import DistanceUnit from '../src/data/DistanceUnit';

import DistanceConverter from '../src/services/converters/DistanceConverter';

chai.use(chaiImmutable);

let expect = chai.expect;


describe('Test Distance Converter', () => {
  it('Unit identifier test', () => {
    expect(DistanceConverter.getUnitConversionIdentifier(DistanceUnit.MILE)).to.equal('mi');
    expect(DistanceConverter.getUnitConversionIdentifier(DistanceUnit.KILOMETER)).to.equal('m');
  });

  const distance = 1.234;
  const kilometerDistance = 1.9858335873209383;
  const distanceInMiles = new Distance({
    value: distance,
    unit: DistanceUnit.MILE
  });
  const distanceInKilometers = new Distance({
    value: kilometerDistance,
    unit: DistanceUnit.KILOMETER
  });

  it('Distance conversion test', () => {
    expect(DistanceConverter.convert(distanceInMiles, DistanceUnit.MILE)).to.eql(distanceInMiles);
    expect(DistanceConverter.convert(distanceInMiles, DistanceUnit.KILOMETER)).to.eql(distanceInKilometers);
  });
});
