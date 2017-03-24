'use es6';

import {expect} from 'chai';

import {List, Map} from 'immutable';

import Coordinate from '../src/data/Coordinate';
import Location from '../src/data/Location';
import Duration from '../src/data/Duration';
import TimeUnit from '../src/data/TimeUnit';
import DriverEta from '../src/data/DriverEta';
import DriverEtas from '../src/data/DriverEtas';
import DriverEtasTableBuilder from '../src/services/tables/builders/DriverEtasTableBuilder';

describe('Test Driver Etas Table Builder', () => {
  let location = new Location({
    name: 'home\'s where the heart is',
    coordinate: new Coordinate()
  });
  let driverEtasResponse = List.of(
    new DriverEta({
      displayName: 'derrick',
      etaSeconds: new Duration({
        length:  500,
        unit: TimeUnit.SECOND,
      }),
      isValidEstimate: true,
    }),
    new DriverEta({
      displayName: 'jiwei',
      etaSeconds: new Duration({
        length:  700,
        unit: TimeUnit.SECOND,
      }),
      isValidEstimate: true,
    }),
    new DriverEta({
      displayName: 'chie',
      etaSeconds: new Duration({
        length:  100,
        unit: TimeUnit.SECOND,
      }),
      isValidEstimate: true,
    })
  );
  let driverEtas = new DriverEtas({
    location: location,
    driverEtas: driverEtasResponse,
  });

  it('tests table creation', () => {
    let expectedTableString = '\u001b[90m┌─────────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m 📍 home\'s where the heart is \u001b[90m│\u001b[39m\n\u001b[90m├──────────\u001b[39m\u001b[90m┬──────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m    🚗     \u001b[90m│\u001b[39m        ⏲         \u001b[90m│\u001b[39m\n\u001b[90m├──────────\u001b[39m\u001b[90m┼──────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m chie     \u001b[90m│\u001b[39m  1 min. 40 sec.  \u001b[90m│\u001b[39m\n\u001b[90m├──────────\u001b[39m\u001b[90m┼──────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m derrick  \u001b[90m│\u001b[39m  8 min. 20 sec.  \u001b[90m│\u001b[39m\n\u001b[90m├──────────\u001b[39m\u001b[90m┼──────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jiwei    \u001b[90m│\u001b[39m 11 min. 40 sec.  \u001b[90m│\u001b[39m\n\u001b[90m└──────────\u001b[39m\u001b[90m┴──────────────────┘\u001b[39m';
    let tableString = DriverEtasTableBuilder.build(driverEtas);
    console.log(expectedTableString);
    console.log(tableString);
    expect(tableString).to.eql(expectedTableString);
  });
});
