'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import Duration from '../src/data/Duration';
import TimeUnit from '../src/data/TimeUnit';

import DurationConverter from '../src/services/converters/DurationConverter';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Test Duration Converter', () => {
  it('Unit identifier test', () => {
    expect(DurationConverter.getUnitConversionIdentifier(TimeUnit.SECOND)).to.equal('s');
    expect(DurationConverter.getUnitConversionIdentifier(TimeUnit.MINUTE)).to.equal('min');
  });

  const length = 60
  const minuteDuration = 1;
  const durationInSeconds = new Duration({
    length: length,
    unit: TimeUnit.SECOND
  });
  const durationInMinutes = new Duration({
    length: minuteDuration,
    unit: TimeUnit.MINUTE
  });

  it('Duration conversion test', () => {
    expect(DurationConverter.convert(durationInSeconds, TimeUnit.SECOND)).to.eql(durationInSeconds);
    expect(DurationConverter.convert(durationInSeconds, TimeUnit.MINUTE)).to.eql(durationInMinutes);
  });
});
