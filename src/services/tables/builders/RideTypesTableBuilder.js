'use es6'

import emoji from 'node-emoji';
import {
  List,Map} from 'immutable';
import Table from 'cli-table2';

export default class RideTypesTableBuilder {
  static build(rideTypes) {
    const table = RideTypesTableBuilder.buildInitialTable(rideTypes.location.name);

    let rideTypeRows = rideTypes.rideTypes.map((rideType) => {
      return RideTypesTableBuilder.buildRideTypeRow(rideType);
    });

    rideTypeRows = rideTypeRows.sort(RideTypesTableBuilder.sortByDisplayName);

    rideTypeRows.forEach((rideTypeRow) => {
      table.push(rideTypeRow);
    });

    return table.toString();
  }

  static getTableHeaders() {
    return List.of(
      emoji.get('red_car'),
      emoji.get('seat')
    );
  }

  static buildInitialTable(locationName) {
    const table = new Table();
    table.push([{
      colSpan: 2,
      content: `${emoji.get('round_pushpin')} ${locationName}`,
      hAlign: 'center'
    }]);
    const formattedHeaders = List(RideTypesTableBuilder.getTableHeaders()
                              .map(header => Map({ content: header, hAlign: 'center' })));
    table.push(formattedHeaders.toJS());
    return table;
  }

  static buildRideTypeRow(rideType) {
    return [
      rideType.displayName,
      RideTypesTableBuilder.buildSeats(rideType.seats).toJS(),
    ];
  }

  static buildSeats(seats) {
    return Map({
      content: seats,
      hAlign: 'center',
    });
  }

  static sortByDisplayName(rideType1, rideType2) {
    const displayName1 = rideType1[0].toLowerCase();
    const displayName2 = rideType2[0].toLowerCase();

    if (displayName1 < displayName2) {
      return -1;
    }
    if (displayName1 > displayName2) {
      return 1;
    }

    return 0;
  }
}
