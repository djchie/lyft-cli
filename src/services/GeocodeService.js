'use es6';

import GoogleMapsClient from '@google/maps';
import CurrentLocation from 'current-location';

import Coordinate from '../data/Coordinate';
import GeocodeTranslator from './translators/GeocodeTranslator';
import CurrentLocationTranslator from './translators/CurrentLocationTranslator';

export default class GeocodeService {
  constructor() {
    this.googleMapsClient = GoogleMapsClient.createClient({
      key: process.env.GOOGLE_GEOCODE_API_KEY,
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
          console.log(error);
          return reject(error);
        }

        resolve(data.json, coordinate);
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
        .then((coordinate) => {
          return this.getReverseGeocodeAddressData(coordinate)
        })
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
