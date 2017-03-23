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

    let nearbyDriverRows = nearbyDrivers.nearbyDrivers.map((nearbyDriver) => {
      return NearbyDriversTableBuilder.buildNearbyDriverRow(nearbyDriver);
    });

    nearbyDriverRows = nearbyDriverRows.sort(NearbyDriversTableBuilder.sortByRideType);

    nearbyDriverRows.forEach((nearbyDriverRow) => {
      table.push(nearbyDriverRow);
    });

    return table.toString();
  }

  static getTableHeaders() {
    return List.of(
      emoji.get('red_car'),
      emoji.get('straight_ruler')
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

  static sortByRideType(nearbyDriver1, nearbyDriver2) {
    const displayName1 = nearbyDriver1[0].toLowerCase();
    const displayName2 = nearbyDriver2[0].toLowerCase();

    if (displayName1 < displayName2) {
      return -1;
    }
    if (displayName1 > displayName2) {
      return 1;
    }

    return 0;
  }
}
