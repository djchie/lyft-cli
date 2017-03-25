'use es6';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiImmutable from 'chai-immutable';
import {
  List,
} from 'immutable';

import Coordinate from '../src/data/Coordinate';
import Location from '../src/data/Location';
import RideEstimateQuery from '../src/data/RideEstimateQuery';
import LyftService from '../src/services/LyftService';

chai.use(chaiAsPromised);
chai.use(chaiImmutable);
chai.should();

let expect = chai.expect;

describe('Test Lyft Service', () => {
  // let service = new LyftService();
  let address = '52 russ street san francisco ca';
  let address2 = '625 market street san francisco ca';
  let rideEstimateQuery = new RideEstimateQuery({
    startAddress: address,
    endAddress: address2,
  });

  let expectedName = '52 Russ St, San Francisco, CA 94103, USA';
  let expectedLatitude = 37.7791096;
  let expectedLongitude = -122.4087096;
  let expectedCoordinate = new Coordinate({
    latitude: expectedLatitude,
    longitude: expectedLongitude,
  });
  let expectedLocation = new Location({
    name: expectedName,
    coordinate: expectedCoordinate,
  });

  let expectedEndName = '625 Market St, San Francisco, CA 94105, USA';
  let expectedEndLatitude = 37.78863510000001;
  let expectedEndLongitude = -122.4016922;
  let expectedEndCoordinate = new Coordinate({
    latitude: expectedEndLatitude,
    longitude: expectedEndLongitude,
  });
  let expectedEndLocation = new Location({
    name: expectedEndName,
    coordinate: expectedEndCoordinate,
  });

  // it('tests ride types fulfillment', () => {
  //   return service.getRideTypes(address).should.be.fulfilled;
  // })

  // it('tests ride types fetching', () => {
  //   return service.getRideTypes(address)
  //     .then((rideTypes) => {
  //       expect(rideTypes.location).to.eql(expectedLocation);
  //     });
  // });

  // it('tests driver etas fulfillment', () => {
  //   return service.getDriverEtas(address).should.be.fulfilled;
  // })

  // it('tests driver etas fetching', () => {
  //   return service.getDriverEtas(address)
  //     .then((driverEtas) => {
  //       expect(driverEtas.location).to.eql(expectedLocation);
  //     });
  // });

  // it('tests ride estimates fulfillment', () => {
  //   return service.getRideEstimates(rideEstimateQuery).should.be.fulfilled;
  // })

  // it('tests ride estimates fetching', () => {
  //   return service.getRideEstimates(rideEstimateQuery)
  //     .then((rideEstimates) => {
  //       expect(rideEstimates.start).to.eql(expectedLocation);
  //       expect(rideEstimates.end).to.eql(expectedEndLocation);
  //     });
  // });

  // it('tests nearby drivers fulfillment', () => {
  //   return service.getNearbyDrivers(address).should.be.fulfilled;
  // })

  // it('tests nearby drivers fetching', () => {
  //   return service.getNearbyDrivers(address)
  //     .then((nearbyDrivers) => {
  //       expect(nearbyDrivers.location).to.eql(expectedLocation);
  //     });
  // });
});
