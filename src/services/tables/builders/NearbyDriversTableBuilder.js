'use es6'

import emoji from 'node-emoji';
import {
  List,Map} from 'immutable';
import Table from 'cli-table2';

import DistanceCalculator from '../../calculators/DistanceCalculator';

export default class NearbyDriversTableBuilder {
  static build(nearbyDriversResponse) {
    let table = NearbyDriversTableBuilder.buildInitialTable(nearbyDriversResponse.location.name);

    console.log(nearbyDriversResponse.nearbyDrivers);

    nearbyDriversResponse.nearbyDrivers.forEach((NearbyDriver) => {
      table.push(NearbyDriversTableBuilder.buildNearbyDriverRow(NearbyDriver, nearbyDriversResponse.location.coordinate));
    });

    return table.toString();
  }

  static getTableHeaders() {
    return List.of(
      emoji.get('red_car'),
      emoji.get('triangular_ruler')
    );
  }

  static buildInitialTable(locationName) {
    let table = new Table();
    table.push([{
      colSpan: 2,
      content: `${emoji.get('round_pushpin')} ${locationName}`,
      hAlign: 'center'
    }]);
    let formattedHeaders = List(NearbyDriversTableBuilder.getTableHeaders()
                              .map(header => Map({ content: header, hAlign: 'center' })));
    table.push(formattedHeaders.toJS());
    return table;
  }

  static buildNearbyDriverRow(nearbyDriver, coordinate) {

    // Need to find the nearest driver from nearbyDriver.drivers

    let closestDistance = Infinity;

    console.log(coordinate);
    console.log(nearbyDriver.ride_type);

    nearbyDriver.drivers.forEach((driverLocations) => {
      driverLocations.locations.forEach((location) => {
        console.log(location);
        const distance = DistanceCalculator.calculateDistance(coordinate, {
          latitude: location.lat,
          longitude: location.lng,
        });

        if (distance < closestDistance) {
          closestDistance = distance;
        }

        console.log(closestDistance);
      });

    });

    console.log(closestDistance);

    return [
      nearbyDriver.ride_type,
      new Distance(),
    ];
  }
}
