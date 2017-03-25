'use es6';

import GoogleMapsClient from '@google/maps';
import CurrentLocation from 'current-location';
import dotenv from 'dotenv';

import Coordinate from '../data/Coordinate';
import GeocodeTranslator from './translators/GeocodeTranslator';
import CurrentLocationTranslator from './translators/CurrentLocationTranslator';

const env = dotenv.config({path: __dirname + '/../../.env'});

export default class GeocodeService {
  constructor() {
    this.googleMapsClient = GoogleMapsClient.createClient({
      key: env.GOOGLE_GEOCODE_API_KEY,
    });
  }

  getCurrentLocationData() {
    return new Promise((resolve, reject) => {
      CurrentLocation((error, data) => {
        if (error !== null) {
          return reject(error);
        }

        resolve(data);
      });
    });
  }

  getReverseGeocodeAddressData(coordinate) {
    return new Promise((resolve, reject) => {
      this.googleMapsClient.reverseGeocode({
        latlng: [coordinate.latitude, coordinate.longitude],
      }, (error, data) => {
        if (error !== null) {
          return reject(error);
        }

        resolve(data.json);
      });
    });
  }

  getGeocodeCoordinatesData(address) {
    return new Promise((resolve, reject) => {
      this.googleMapsClient.geocode({
        address: address,
      }, (error, data) => {
        if (error !== null) {
          return reject(error);
        }

        resolve(data.json);
      });
    });
  }

  getLocation(address) {
    if (!address) {
      return this.getCurrentLocationData()
        .then((response) => {
          return CurrentLocationTranslator.translate(response);
        })
        // Uncomment below for showing current location address
        // .then((coordinate) => {
        //   return this.getReverseGeocodeAddressData(coordinate)
        // })
        // .then((response) => {
        //   return GeocodeTranslator.translate(response);
        // })
        // .then((locations) => {
        //   return GeocodeService.getFirstLocation(locations);
        // })
        .catch((error) => {
          throw error;
        });
    }

    return this.getGeocodeCoordinatesData(address)
      .then((response) => {
        return GeocodeTranslator.translate(response);
      })
      .then((locations) => {
        return GeocodeService.getFirstLocation(locations);
      })
      .catch((error) => {
        throw error;
      });
  }

  static getFirstLocation(locations) {
    if (locations.isEmpty()) {
      throw new RangeError('no locations for address');
    }

    return locations.first();
  }
}
