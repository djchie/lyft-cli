'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {List} from 'immutable';

import Coordinate from '../src/data/Coordinate';
import CurrentLocationTranslator from '../src/services/translators/CurrentLocationTranslator';
import Location from '../src/data/Location';

import geocodeFile from './data/geocode';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Test Current Location Translator', () => {
  let latitude = 1.2;
  let longitude = 2.3;
  let locationJson = {
    latitude: latitude,
    longitude: longitude,
  };

  it('tests current location translation', () => {
    let expectedLocation = new Location({
      name: 'Current Location',
      coordinate: new Coordinate({
        latitude: latitude,
        longitude: longitude,
      }),
    });
    expect(CurrentLocationTranslator.translate(locationJson)).to.eql(expectedLocation);
  });

  it('tests current location translation error cases', () => {
    let json = {};

    expect(() => CurrentLocationTranslator.translate(json)).to.throw(ReferenceError);

    json['latitude'] = 1.234;

    expect(() => CurrentLocationTranslator.translate(json)).to.throw(ReferenceError);

    json['longitude'] = 1.234;
  });

  it('tests full current location translation error cases', () => {
    let json = {};

    expect(() => CurrentLocationTranslator.translate(json)).to.throw(ReferenceError);

    json['latitude'] = 'derrick';

    expect(() => CurrentLocationTranslator.translate(json)).to.throw(TypeError);

    json['latitude'] = 1.234;

    expect(() => CurrentLocationTranslator.translate(json)).to.throw(ReferenceError);

    json['longitude'] = 'chie';

    expect(() => CurrentLocationTranslator.translate(json)).to.throw(TypeError);
  });
});
