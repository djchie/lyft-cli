'use es6';

import program from 'commander';

import LyftService from './LyftService';

// import DistanceUnit from '../data/DistanceUnit';
import RideEstimateQuery from '../data/RideEstimateQuery';

import RideTypesTableBuilder from './tables/builders/RideTypesTableBuilder';
import NearbyDriversTableBuilder from './tables/builders/NearbyDriversTableBuilder';
import DriverEtasTableBuilder from './tables/builders/DriverEtasTableBuilder';
import RideEstimatesTableBuilder from './tables/builders/RideEstimatesTableBuilder';

export default class CommandExecutionService {
  constructor() {
    this.lyftService = new LyftService();
  }

  executeRideTypes(address) {
    if (typeof address !== 'string') {
      throw new TypeError('address should be a string');
    }

    return this.lyftService.getRideTypes(address)
      .then((rideTypes) => {
        return RideTypesTableBuilder.build(rideTypes);
      });
  }

  executeDriverEtas(address) {
    if (typeof address !== 'string') {
      throw new TypeError('address should be a string');
    }

    return this.lyftService.getDriverEtas(address)
      .then((driverEtas) => {
        return DriverEtasTableBuilder.build(driverEtas);
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
      .then((rideEstimates) => {
        return RideEstimatesTableBuilder.build(rideEstimates);
      });
  }

  executeNearbyDrivers(address) {
    if (typeof address !== 'string') {
      throw new TypeError('address should be a string');
    }

    return this.lyftService.getNearbyDrivers(address)
      .then((nearbyDrivers) => {
        return NearbyDriversTableBuilder.build(nearbyDrivers);
      });
  }

}
