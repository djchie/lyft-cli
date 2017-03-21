'use es6';

import {List} from 'immutable';

import Distance from '../../data/Distance';
import DistanceUnit from '../../data/DistanceUnit';
import NearbyDriver from '../../data/NearbyDriver';

import DistanceCalculator from '../calculators/DistanceCalculator';

export default class NearbyDriversTranslator {
  static translate(response, location) {
    if (!('nearby_drivers' in response)) {
      throw new ReferenceError('expected nearby_drivers field');
    }

    const nearbyDrivers = response.nearby_drivers;

    if (!Array.isArray(nearbyDrivers)) {
      throw new TypeError('expected nearby_drivers to be an array');
    }

    return List(nearbyDrivers.map((nearbyDriver) => {
      return NearbyDriversTranslator.translateNearbyDriver(nearbyDriver, location.coordinate);
    }));
  }

  static translateNearbyDriver(nearbyDriver, coordinate) {
    if (!('ride_type' in nearbyDriver)) {
      throw new ReferenceError('expected ride_type field');
    }

    if (!('drivers' in nearbyDriver)) {
      throw new ReferenceError('expected drivers field');
    }

    const rideType = nearbyDriver.ride_type;

    if (typeof rideType !== 'string') {
      throw new TypeError('expected ride_type to be a string');
    }

    const drivers = nearbyDriver.drivers;

    if (!Array.isArray(drivers)) {
      throw new TypeError('expected drivers to be an array');
    }

    let closestDistance = new Distance({
      value: Infinity,
      unit: DistanceUnit.MILE,
    });

    drivers.forEach((driver) => {
      if (!('locations' in driver)) {
        throw new ReferenceError('expected locations field');
      }

      const locations = driver.locations;

      if (!Array.isArray(locations)) {
        throw new TypeError('expected locations to be an array');
      }

      locations.forEach((location) => {

        if (!('lat' in location)) {
          throw new ReferenceError('expected lat field');
        }

        if (!('lng' in location)) {
          throw new ReferenceError('expected lng field');
        }

        const distance = DistanceCalculator.calculateDistance(coordinate, {
          latitude: location.lat,
          longitude: location.lng,
        });

        if (distance.value < closestDistance.value) {
          closestDistance = distance;
        }
      });

    });

    return new NearbyDriver({
      rideType: rideType,
      distance: closestDistance,
    });
  }
}
