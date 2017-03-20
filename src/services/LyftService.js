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
          });
      });
  }

  getDriverEta(address) {
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
            return response;
          });
          // .then(estimates => new TimeEstimates({
          //   location: location,
          //   estimates: TimeEstimatesTranslator.translate(estimates)
          // }));
      });
  }

  getRideEstimates(addresses) {
    let startLocation = this.geocodeService.getLocations(addresses.startAddress)
      .then((locations) => {
        return LyftService.getFirstLocation(locations)
      });

    let endLocation = this.geocodeService.getLocations(addresses.endAddress)
      .then((locations) => {
        return LyftService.getFirstLocation(locations)
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

        const lyftQuery = Object.assign({
          rideType: 'lyft',
        }, query);

        const lyftLineQuery = Object.assign({
          rideType: 'lyft_line',
        }, query);

        const lyftPlusQuery = Object.assign({
          rideType: 'lyft_plus',
        }, query);

        let lyftRideEstimates = this.lyftApi.getRideEstimates(lyftQuery)
          .then((response) => {
            return response;
          });

        let lyftLineRideEstimates = this.lyftApi.getRideEstimates(lyftLineQuery)
          .then((response) => {
            return response;
          });

        let lyftPlusRideEstimates = this.lyftApi.getRideEstimates(lyftPlusQuery)
          .then((response) => {
            return response;
          });

        return Promise.all([
          lyftRideEstimates,
          lyftLineRideEstimates,
          lyftPlusRideEstimates
        ])
          .then((responses) => {
            return responses;
            // return new PriceEstimates({
            //   start: values[0],
            //   end: values[1],
            //   estimates: PriceEstimatesTranslator.translate(response, query.distanceUnit),
            // });
          });
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
          });
      });
  }

  static getFirstLocation(locations) {
    if (locations.isEmpty()) {
      throw new RangeError('no locations for address');
    }

    return locations.first();
  }
}
