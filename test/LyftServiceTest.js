'use es6';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiImmutable from 'chai-immutable';
import {
  List,
} from 'immutable';

import RideEstimateQuery from '../src/data/RideEstimateQuery';
import LyftService from '../src/services/LyftService';
import DistanceUnit from '../src/data/DistanceUnit';

chai.use(chaiAsPromised);
chai.use(chaiImmutable);
chai.should();

describe('Test Lyft Service', function() {
  let service = new LyftService();
  let address = '52 russ street san francisco ca';
  let address2 = '625 market street san francisco ca';
  let rideEstimateQuery = new RideEstimateQuery({
    startAddress: address,
    endAddress: address2,
    distanceUnit: DistanceUnit.MILE
  });

  it('tests ride types fulfillment', () => {
    return service.getRideTypes(address).should.be.fulfilled;
  })

  it('tests ride types fetching', () => {
    return service.getRideTypes(address)
      .then((results) => {
        console.log(results);
      });
  });

  it('tests driver etas fulfillment', () => {
    return service.getDriverEtas(address).should.be.fulfilled;
  })

  it('tests driver etas fetching', () => {
    return service.getDriverEtas(address)
      .then((results) => {
        console.log(results);
      });
  });

  it('tests ride estimates fulfillment', () => {
    return service.getRideEstimates(rideEstimateQuery).should.be.fulfilled;
  })

  it('tests ride estimates fetching', () => {
    return service.getRideEstimates(rideEstimateQuery)
      .then((results) => {
        console.log(results);
      });
  });

  it('tests nearby drivers fulfillment', () => {
    return service.getNearbyDrivers(address).should.be.fulfilled;
  })

  it('tests nearby drivers fetching', () => {
    return service.getNearbyDrivers(address)
      .then((results) => {
        console.log(results);
      });
  });
});
