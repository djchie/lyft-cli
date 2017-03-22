'use es6';

import DurationConverter from '../../converters/DurationConverter';
import TimeUnit from '../../../data/TimeUnit';
import Utilities from '../../../Utilities';

export default class DriverEtaFormatter {

  static formatDuration(duration) {
    console.log(duration);
    // TODO @jbradley Utilities currently formats time in seconds - build better formatting logic
    // const durationInSeconds = DurationConverter.convert(duration, TimeUnit.SECOND);
    // return Utilities.generateFormattedTime(durationInSeconds.length);
    return Utilities.generateFormattedTime(duration.length);
  }

}
