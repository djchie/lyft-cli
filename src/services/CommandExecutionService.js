'use es6';

import program from 'commander';

import LyftService from './LyftService';

// import DistanceUnit from '../data/DistanceUnit';
import RideEstimateQuery from '../data/RideEstimateQuery';

import RideTypesTableBuilder from './tables/builders/RideTypesTableBuilder';


import PriceEstimatesTableBuilder from './tables/builders/PriceEstimatesTableBuilder';
import TimeEstimatesTableBuilder from './tables/builders/TimeEstimatesTableBuilder';

export default class CommandExecutionService {
  constructor() {
    this.lyftService = new LyftService();
  }

  executeRideTypes(address) {
    if (typeof address !== 'string') {
      throw new TypeError('address should be a string');
    }

    return this.lyftService.getRideTypes(address)
      .then((rideTypesResponse) => {
        return RideTypesTableBuilder.build(rideTypesResponse);
      });
  }

  executeDriverEta(address) {
    if (typeof address !== 'string') {
      throw new TypeError('address should be a string');
    }

    return this.lyftService.getDriverEta(address)
      .then((driverEtaResponse) => {
        console.log(driverEtaResponse);
        // return TimeEstimatesTableBuilder.build(estimates);
      });
  }

  executeRideEstimates(startAddress, endAddress) {
    if (typeof startAddress !== 'string') {
      throw new TypeError('start address should be a string');
    }

    if (typeof endAddress !== 'string') {
      throw new TypeError('end address should be a string');
    }

    const addresses = RideEstimateQuery.from(startAddress, endAddress);
    
    return this.lyftService.getRideEstimates(addresses)
      .then((rideEstimatesResponse) => {
        console.log(rideEstimatesResponse);
        // return PriceEstimatesTableBuilder.build(rideEstimates)
      });
  }

  executeNearbyDrivers(address) {
    if (typeof address !== 'string') {
      throw new TypeError('address should be a string');
    }

    return this.lyftService.getNearbyDrivers(address)
      .then((nearbyDriversResponse) => {
        console.log(nearbyDriversResponse);
        // return NearbyDriversTableBuilder.build(nearbyDrivers);
      });
  }

}
