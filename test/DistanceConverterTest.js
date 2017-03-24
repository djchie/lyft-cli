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
    it('tests miles unit identifier', () => {
      expect(DistanceConverter.getUnitConversionIdentifier(DistanceUnit.MILE)).to.equal('mi');
    });
    it('tests kilometers unit identifier', () => {
      expect(DistanceConverter.getUnitConversionIdentifier(DistanceUnit.KILOMETER)).to.equal('m');
    });
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
    it('tests miles to miles conversion', () => {
      expect(DistanceConverter.convert(distanceInMiles, DistanceUnit.MILE)).to.eql(distanceInMiles);
    });
    it('tests miles to kilometers conversion', () => {
      expect(DistanceConverter.convert(distanceInMiles, DistanceUnit.KILOMETER)).to.eql(distanceInKilometers);
    });
  });
});
