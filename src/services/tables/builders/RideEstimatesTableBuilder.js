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

    rideEstimates.costEstimates.forEach(costEstimate => {
      table.push(RideEstimatesTableBuilder.buildCostEstimateRow(costEstimate));
    });

    table.push(RideEstimatesTableBuilder.buildLocationRow(rideEstimates.start.name, false));
    table.push(RideEstimatesTableBuilder.buildLocationRow(rideEstimates.end.name, true));

    return table.toString();
  }

  static getTableHeaders() {
    return List.of(
      emoji.get('oncoming_automobile'),
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
    console.log(costEstimate);

    console.log(CostEstimateFormatter.formatRange(costEstimate.priceRange));
    console.log(CostEstimateFormatter.formatDistance(costEstimate.estimatedDistance));
    console.log(CostEstimateFormatter.formatDuration(costEstimate.estimatedDuration));

    return [
      costEstimate.displayName,
      CostEstimateFormatter.formatRange(costEstimate.priceRange),
      CostEstimateFormatter.formatDistance(costEstimate.estimatedDistance),
      CostEstimateFormatter.formatDuration(costEstimate.estimatedDuration),
      RideEstimatesTableBuilder.buildPrimetimePercentageSymbol(costEstimate.primetimePercentage),
    ];
  }

  static buildPrimetimePercentageSymbol(primetimePercentage) {
    // TODO: Show different emojis based off of different percentages
    let primetime = `${primetimePercentage}%`;

    if (primetimePercentage === 0) {
      primetime = `${primetime} ${emoji.get('slightly_smiling_face')}`;
    } else if (primetimePercentage <= 25) {
      primetime = `${primetime} ${emoji.get('confused')}`;
    } else if (primetimePercentage <= 35) {
      primetime = `${primetime} ${emoji.get('slightly_frowning_face')}`;
    } else if (primetimePercentage <= 50) {
      primetime = `${primetime} ${emoji.get('cry')}`;
    } else {
      primetime = `${primetime} ${emoji.get('weary')}`;
    }

    return primetime;
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
}
