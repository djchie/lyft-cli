'use es6';

import {
  List,
} from 'immutable';
import Lyft from 'lyft-node';

import GeocodeService from './GeocodeService';

import RideTypes from '../data/RideTypes';
import RideTypesTranslator from './translators/RideTypesTranslator';

import NearbyDrivers from '../data/NearbyDrivers';
import NearbyDriversTranslator from './translators/NearbyDriversTranslator';

import DriverEtas from '../data/DriverEtas';
import DriverEtasTranslator from './translators/DriverEtasTranslator';

import RideEstimates from '../data/RideEstimates';
import RideEstimatesTranslator from './translators/RideEstimatesTranslator';

import PriceEstimates from '../data/PriceEstimates';
import PriceEstimatesTranslator from './translators/PriceEstimatesTranslator';
import TimeEstimates from '../data/TimeEstimates';
import TimeEstimatesTranslator from './translators/TimeEstimatesTranslator';

export default class LyftService {
  constructor() {
    this.lyftApi = new Lyft(
      process.env.LYFT_CLIENT_ID,
      process.env.LYFT_CLIENT_SECRET
    );
    this.geocodeService = new GeocodeService();
  }

  getRideTypes(address) {
    return this.geocodeService.getLocations(address)
      .then((locations) => {
        return LyftService.getFirstLocation(locations);
      })
      .then((location) => {
        const query = {
          start: {
            latitude: location.coordinate.latitude,
            longitude: location.coordinate.longitude,
          },
        };

        return this.lyftApi.getRideTypes(query)
          .then((response) => {
            return new RideTypes({
              location: location,
              rideTypes: RideTypesTranslator.translate(response),
            });
          })
          .catch((error) => {
            throw error;
          });;
      })
      .catch((error) => {
        throw error;
      });
  }

  getDriverEtas(address) {
    return this.geocodeService.getLocations(address)
      .then((locations) => {
        return LyftService.getFirstLocation(locations)
      })
      .then((location) => {
        const query = {
          start: {
            latitude: location.coordinate.latitude,
            longitude: location.coordinate.longitude,
          },
        };

        return this.lyftApi.getDriverEta(query)
          .then((response) => {
            return new DriverEtas({
              location: location,
              driverEtas: DriverEtasTranslator.translate(response),
            });
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw error;
      });
  }

  getRideEstimates(addresses) {
    let startLocation = this.geocodeService.getLocations(addresses.startAddress)
      .then((locations) => {
        return LyftService.getFirstLocation(locations)
      })
      .catch((error) => {
        throw error;
      });

    let endLocation = this.geocodeService.getLocations(addresses.endAddress)
      .then((locations) => {
        return LyftService.getFirstLocation(locations)
      })
      .catch((error) => {
        throw error;
      });

    return Promise.all([startLocation, endLocation])
      .then((locations) => {
        const query = {
          start: {
            latitude: locations[0].coordinate.latitude,
            longitude: locations[0].coordinate.longitude,
          },
          end: {
            latitude: locations[1].coordinate.latitude,
            longitude: locations[1].coordinate.longitude,
          },
        };

        return this.lyftApi.getRideEstimates(query)
          .then((response) => {
            return new RideEstimates({
              start: locations[0],
              end: locations[1],
              costEstimates: RideEstimatesTranslator.translate(response),
            })
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw error;
      });
  }

  getNearbyDrivers(address) {
    return this.geocodeService.getLocations(address)
      .then((locations) => {
        return LyftService.getFirstLocation(locations);
      })
      .then((location) => {
        const query = {
          start: {
            latitude: location.coordinate.latitude,
            longitude: location.coordinate.longitude,
          },
        };

        return this.lyftApi.getNearbyDrivers(query)
          .then((response) => {
            return new NearbyDrivers({
              location: location,
              nearbyDrivers: NearbyDriversTranslator.translate(response, location),
            });
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw error;
      });;
  }

  static getFirstLocation(locations) {
    if (locations.isEmpty()) {
      throw new RangeError('no locations for address');
    }

    return locations.first();
  }
}
