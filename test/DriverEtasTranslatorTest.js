'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {
  List,
} from 'immutable';

import TimeUnit from '../src/data/TimeUnit';
import Duration from '../src/data/Duration';
import DriverEta from '../src/data/DriverEta';
import DriverEtasTranslator from '../src/services/translators/DriverEtasTranslator';

chai.use(chaiImmutable);
let expect = chai.expect;

describe('Test Driver Etas Translator', () => {
  let displayName = 'derrick';
  let etaSeconds = 120;
  let isValidEstimate = true;
  let etaEstimate = {
    'display_name': displayName,
    'eta_seconds': etaSeconds,
    'is_valid_estimate': isValidEstimate,
  };
  let expectedDriverEta = new DriverEta({
    displayName: displayName,
    etaSeconds: new Duration({
      length: etaSeconds,
      unit: TimeUnit.SECOND,
    }),
    isValidEstimate: isValidEstimate,
  });
  let mockResponse = {
    'eta_estimates': [
      etaEstimate,
      etaEstimate,
    ],
  };
  let expectedDriverEtas = List.of(expectedDriverEta, expectedDriverEta);

  it('should translate eta estimate', () => {
    expect(DriverEtasTranslator.translateEtaEstimate(etaEstimate)).to.eql(expectedDriverEta);
  });

  it('should throw when attempting to translate eta estimate', () => {
    let incorrectlyFormattedEtaEstimate = {};

    expect(() => DriverEtasTranslator.translateEtaEstimate(incorrectlyFormattedEtaEstimate)).to.throw(ReferenceError);

    incorrectlyFormattedEtaEstimate['display_name'] = 1;
    expect(() => DriverEtasTranslator.translateEtaEstimate(incorrectlyFormattedEtaEstimate)).to.throw(ReferenceError);

    incorrectlyFormattedEtaEstimate['eta_seconds'] = 'foo';

    expect(() => DriverEtasTranslator.translateEtaEstimate(incorrectlyFormattedEtaEstimate)).to.throw(ReferenceError);

    incorrectlyFormattedEtaEstimate['is_valid_estimate'] = 'bar';

    expect(() => DriverEtasTranslator.translateEtaEstimate(incorrectlyFormattedEtaEstimate)).to.throw(TypeError);
  });

  it('should translate eta estimates', () => {
    expect(DriverEtasTranslator.translate(mockResponse)).to.eql(expectedDriverEtas);
  });

  it('should throw when attempting to translate eta estimates', () => {
    let incorrectlyFormattedResponse = {};

    expect(() => DriverEtasTranslator.translate(incorrectlyFormattedResponse)).to.throw(ReferenceError);

    incorrectlyFormattedResponse['eta_estimates'] = 1;

    expect(() => DriverEtasTranslator.translate(incorrectlyFormattedResponse)).to.throw(TypeError);
  });
});
