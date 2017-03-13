'use es6';

import GoogleMapsClient from '@google/maps';

import Coordinate from '../data/Coordinate';
import GeocodeTranslator from './translators/GeocodeTranslator';

export default class GeocodeService {
  constructor() {
    this.googleMapsClient = GoogleMapsClient.createClient({
      key: process.env.GOOGLE_GEOCODE_API_KEY,
    });
  }

  getData(address) {
    return new Promise((resolve, reject) => {
      this.googleMapsClient.geocode({
        address: address,
      }, (error, data) => {
        if (error !== null) {
          return reject(err);
        }

        resolve(data.json);
      });
    });
  }

  getLocations(address) {
    return this.getData(address)
      .then((response) => (
        return GeocodeTranslator.translate(response);
      });
  }
}