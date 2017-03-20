'use es6';

import Distance from '../../data/Distance';
import DistanceUnit from '../../data/DistanceUnit';

export default class DistanceCalculator {

  // http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
  static calculateDistance(start, end) {

    console.log('start');
    console.log(start);
    console.log('end');
    console.log(end);

    var R = 6371; // Radius of the earth in km
    var dLat = DistanceCalculator.deg2rad(start.latitude - end.latitude);  // deg2rad below
    var dLng = DistanceCalculator.deg2rad(start.longitude - end.longitude); 
    var a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(DistanceCalculator.deg2rad(start.longitude)) * Math.cos(DistanceCalculator.deg2rad(start.latitude)) * 
      Math.sin(dLng / 2) * Math.sin(dLng / 2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    var d = R * c; // Distance in km

    return new Distance({
      value: d,
      unit: DistanceUnit.KILOMETER,
    });
  }

  static deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}
