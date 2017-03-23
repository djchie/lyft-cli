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

    let driverEtaRows = driverEtas.driverEtas.map((driverEta) => {
      return DriverEtasTableBuilder.buildDriverEtaRow(driverEta);
    });

    driverEtaRows = driverEtaRows.sort(DriverEtasTableBuilder.sortByDisplayName);

    driverEtaRows.forEach((driverEtaRow) => {
      table.push(driverEtaRow);
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

  static sortByDisplayName(driverEta1, driverEta2) {
    const displayName1 = driverEta1[0].toLowerCase();
    const displayName2 = driverEta2[0].toLowerCase();

    if (displayName1 < displayName2) {
      return -1;
    }
    if (displayName1 > displayName2) {
      return 1;
    }

    return 0;
  }
}
