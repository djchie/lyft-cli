'use es6'

import emoji from 'node-emoji';
import {
  List,Map
} from 'immutable';
import Table from 'cli-table2';

// import DistanceCalculator from '../../calculators/DistanceCalculator';

import DriverEtaFormatter from '../formatters/DriverEtaFormatter';

export default class DriverEtasTableBuilder {
  static build(driverEtas) {
    let table = DriverEtasTableBuilder.buildInitialTable(driverEtas.location.name);

    driverEtas.driverEtas.forEach((driverEta) => {
      table.push(DriverEtasTableBuilder.buildDriverEtaRow(driverEta));
    });

    return table.toString();
  }

  static getTableHeaders() {
    return List.of(
      emoji.get('red_car'),
      emoji.get('timer_clock')
    );
  }

  static buildInitialTable(locationName) {
    let table = new Table();
    table.push([{
      colSpan: 2,
      content: `${emoji.get('round_pushpin')} ${locationName}`,
      hAlign: 'center'
    }]);
    let formattedHeaders = List(DriverEtasTableBuilder.getTableHeaders()
                              .map(header => Map({ content: header, hAlign: 'center' })));
    table.push(formattedHeaders.toJS());
    return table;
  }

  static buildDriverEtaRow(driverEta) {
    return [
      driverEta.displayName,
      DriverEtaFormatter.formatDuration(driverEta.etaSeconds),
    ];
  }
}
