'use es6'

import emoji from 'node-emoji';
import {
  List,Map
} from 'immutable';
import Table from 'cli-table2';

import DistanceCalculator from '../../calculators/DistanceCalculator';

import NearbyDriverFormatter from '../formatters/NearbyDriverFormatter';

export default class NearbyDriversTableBuilder {
  static build(nearbyDrivers) {
    let table = NearbyDriversTableBuilder.buildInitialTable(nearbyDrivers.location.name);

    nearbyDrivers.nearbyDrivers.forEach((nearbyDriver) => {
      table.push(NearbyDriversTableBuilder.buildNearbyDriverRow(nearbyDriver));
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

  static buildNearbyDriverRow(nearbyDriver) {
    return [
      NearbyDriverFormatter.formatRideType(nearbyDriver.rideType),
      NearbyDriverFormatter.formatDistance(nearbyDriver.distance),
    ];
  }
}
