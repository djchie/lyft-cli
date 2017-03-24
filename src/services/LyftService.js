'use es6';

import {
  List,
} from 'immutable';
import Lyft from 'lyft-node';
import dotenv from 'dotenv';

import GeocodeService from './GeocodeService';

import RideTypes from '../data/RideTypes';
import RideTypesTranslator from './translators/RideTypesTranslator';

import NearbyDrivers from '../data/NearbyDrivers';
import NearbyDriversTranslator from './translators/NearbyDriversTranslator';

import DriverEtas from '../data/DriverEtas';
import DriverEtasTranslator from './translators/DriverEtasTranslator';

import RideEstimates from '../data/RideEstimates';
import RideEstimatesTranslator from './translators/RideEstimatesTranslator';

dotenv.load();

export default class LyftService {
  constructor() {
    this.lyftApi = new Lyft(
      process.env.LYFT_CLIENT_ID,
      process.env.LYFT_CLIENT_SECRET
    );
    this.geocodeService = new GeocodeService();
  }

  getRideTypes(address) {
    return this.geocodeService.getLocation(address)
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
          });
      })
      .catch((error) => {
        throw error;
      });
  }

  getDriverEtas(address) {
    return this.geocodeService.getLocation(address)
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
    let startLocation = this.geocodeService.getLocation(addresses.startAddress)
      .then((location) => {
        return location;
      })
      .catch((error) => {
        throw error;
      });

    let endLocation = this.geocodeService.getLocation(addresses.endAddress)
      .then((location) => {
        return location;
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
    return this.geocodeService.getLocation(address)
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
      });
  }
}
