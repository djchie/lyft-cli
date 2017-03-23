'use es6';

import emoji from 'node-emoji';
import {
  List,
  Map
} from 'immutable';
import Table from 'cli-table2';

import CostEstimateFormatter from '../formatters/CostEstimateFormatter';
// import Utilities from '../../../Utilities';

export default class RideEstimatesTableBuilder {
  static build(rideEstimates) {
    let table = RideEstimatesTableBuilder.buildInitialTable();

    let costEstimateRows = rideEstimates.costEstimates.map(costEstimate => {
      return RideEstimatesTableBuilder.buildCostEstimateRow(costEstimate);
    });

    costEstimateRows = costEstimateRows.sort(RideEstimatesTableBuilder.sortByDisplayName);

    costEstimateRows.forEach((costEstimateRow) => {
      table.push(costEstimateRow);
    });

    table.push(RideEstimatesTableBuilder.buildLocationRow(rideEstimates.start.name, false));
    table.push(RideEstimatesTableBuilder.buildLocationRow(rideEstimates.end.name, true));

    return table.toString();
  }

  static getTableHeaders() {
    return List.of(
      emoji.get('red_car'),
      emoji.get('money_with_wings'),
      emoji.get('arrows_clockwise'),
      emoji.get('hourglass_flowing_sand'),
      `${emoji.get('boom')} Primetime${emoji.get('boom')}`
    );
  }

  static buildInitialTable() {
    let table = new Table();
    let formattedHeaders = List(RideEstimatesTableBuilder.getTableHeaders()
                              .map(header => Map({ content: header, hAlign: 'center' })));
    table.push(formattedHeaders.toJS());
    return table;
  }

  static buildCostEstimateRow(costEstimate) {
    // TODO: Check for costEstimate.isValidEstimate
    return [
      costEstimate.displayName,
      CostEstimateFormatter.formatRange(costEstimate.priceRange),
      CostEstimateFormatter.formatDistance(costEstimate.estimatedDistance),
      CostEstimateFormatter.formatDuration(costEstimate.estimatedDuration),
      RideEstimatesTableBuilder.buildPrimetimePercentageSymbol(costEstimate.primetimePercentage).toJS(),
    ];
  }

  static buildPrimetimePercentageSymbol(primetimePercentage) {
    let primetime = `${primetimePercentage}%`;

    if (primetimePercentage === 0) {
      primetime = `${primetime} ${emoji.get('slightly_smiling_face')}`;
    } else if (primetimePercentage <= 25) {
      primetime = `${primetime} ${emoji.get('confused')}`;
    } else if (primetimePercentage <= 50) {
      primetime = `${primetime} ${emoji.get('slightly_frowning_face')}`;
    } else if (primetimePercentage <= 75) {
      primetime = `${primetime} ${emoji.get('cry')}`;
    } else {
      primetime = `${primetime} ${emoji.get('weary')}`;
    }

    return Map({
      content: primetime,
      hAlign: 'center',
    });
   }

  static buildLocationRow(name, isEnd) {
    let symbol = isEnd
      ? emoji.get('end')
      : emoji.get('round_pushpin');
    return [
      {
        colSpan: 1,
        content: symbol,
        hAlign: 'center'
      },
      {
        colSpan: 4,
        content: name
      },
    ]
  }

  static sortByDisplayName(costEstimate1, costEstimate2) {
    const displayName1 = costEstimate1[0].toLowerCase();
    const displayName2 = costEstimate2[0].toLowerCase();

    if (displayName1 < displayName2) {
      return -1;
    }
    if (displayName1 > displayName2) {
      return 1;
    }

    return 0;
  }
}
