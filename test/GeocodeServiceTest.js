'use es6';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiImmutable from 'chai-immutable';
import {List} from 'immutable';

import Coordinate from '../src/data/Coordinate';
import GeocodeService from '../src/services/GeocodeService';
import Location from '../src/data/Location';

import geocodeFile from './data/geocode';
import reverseGeocodeFile from './data/reverse-geocode';

chai.use(chaiAsPromised);
chai.use(chaiImmutable);
chai.should();

describe('Test Geocode Service', () => {
  // let service = new GeocodeService();
  let address = '52 russ street san francisco ca';
  let coordinate = {
    latitude: 33.792858,
    longitude: -118.021032,
  };
  let location = new Location({
    name: '52 Russ St, San Francisco, CA 94103, USA',
    coordinate: new Coordinate({
      latitude: 37.7791096,
      longitude: -122.4087096,
    })
  });

  // it('tests geocode coordinates data fetching', () => {
  //   return service.getGeocodeCoordinatesData(address).should.eventually.eql(geocodeFile);
  // });

  // it('tests reverse geocode address data fetching', () => {
  //   return service.getReverseGeocodeAddressData(coordinate).should.eventually.eql(reverseGeocodeFile);
  // });

  // it('tests location fetching', () => {
  //   return service.getLocation(address).should.eventually.eql(location);
  // });
});
