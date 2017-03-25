'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import RideEstimateQuery from '../src/data/RideEstimateQuery';
import DistanceUnit from '../src/data/DistanceUnit';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Test Ride Estimate Query', () => {
  const startAddress = 'foo';
  const endAddress = 'bar';

  it('Should return ride estimate query', () => {
    const expectedQuery = new RideEstimateQuery({
      startAddress: startAddress,
      endAddress: endAddress,
    });
    const calculatedQuery = RideEstimateQuery.from(startAddress, endAddress);
    expect(calculatedQuery).to.eql(expectedQuery);
  });
});
