'use es6'

import emoji from 'node-emoji';
import {List,Map} from 'immutable';
import Table from 'cli-table2';

import Utilities from '../../../Utilities';

export default class RideTypesTableBuilder {
  static build(rideTypesResponse) {
    let table = RideTypesTableBuilder.buildInitialTable(rideTypesResponse.location.name);

    rideTypesResponse.rideTypes.forEach((rideType) => {
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
    let table = new Table();
    table.push([{
      colSpan: 2,
      content: `${emoji.get('round_pushpin')} ${locationName}`,
      hAlign: 'center'
    }]);
    let formattedHeaders = List(RideTypesTableBuilder.getTableHeaders()
                              .map(header => Map({ content: header, hAlign: 'center' })));
    table.push(formattedHeaders.toJS());
    return table;
  }

  static buildRideTypeRow(rideType) {
    return [
      rideType.display_name,
      rideType.seats,
    ];
  }
}
