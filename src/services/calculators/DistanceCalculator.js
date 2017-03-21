'use es6';

import Distance from '../../data/Distance';
import DistanceUnit from '../../data/DistanceUnit';

export default class DistanceCalculator {

  // http://www.geodatasource.com/developers/javascript
  static calculateDistance(start, end, unit=DistanceUnit.MILE) {

    var radlat1 = Math.PI * start.latitude / 180;
    var radlat2 = Math.PI * end.latitude / 180;
    var theta = start.longitude - end.longitude;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit==="KILOMETER") {
      dist *= 1.609344
    }
    
    return new Distance({
      value: dist,
      unit: unit,
    });
  }
}
