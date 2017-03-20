'use es6'

import emoji from 'node-emoji';
import {
  List,Map} from 'immutable';
import Table from 'cli-table2';

export default class RideTypesTableBuilder {
  static build(rideTypes) {
    const table = RideTypesTableBuilder.buildInitialTable(rideTypes.location.name);

    rideTypes.rideTypes.forEach((rideType) => {
      table.push(RideTypesTableBuilder.buildRideTypeRow(rideType));
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
    console.log(rideType);
    return [
      rideType.rideType,
      rideType.seats,
    ];
  }
}
