const getAngle = (yPoly, xPoly, x, y) => {
  var xDis, yDis;
  var angleRad;
  xDis = Math.abs(xPoly - x);
  yDis = Math.abs(yPoly - y);
  if (yPoly > y && xPoly < x) {
    //Segundo cuadrante
    angleRad = Math.PI - Math.atan(yDis / xDis);
    //Angulo total es PI - (tan-1(op/ad))
  } else if (yPoly < y && xPoly < x) {
    //Tercer Cuadrante
    angleRad = -(Math.PI / 2 + Math.atan(yDis / xDis));
    //Angulo total es PI + (tan-1(op/ad))
  } else if (yPoly < y && xPoly > x) {
    //Cuarto Cuadrante
    angleRad = -Math.atan(yDis / xDis);
    //Angulo total es 2PI - (tan-1(op/ad))
  } else {
    angleRad = Math.atan(yDis / xDis);
  }
  var angleDeg = (angleRad * 180) / Math.PI;
  return angleDeg;
};

const getTotalAngle = (initialAngle, angle) => {
    //Calculates the max angle covered by the polygon points from the pov of the origin point
  if (initialAngle < 0) {
    if (angle > 0) {
      return angle + initialAngle;
    } else {
      return Math.abs(initialAngle - angle);
    }
  } else {
    if (angle > 0) {
      return Math.abs(initialAngle - angle);
    } else {
      console.log("INitial angle: " + initialAngle);
      console.log("currentAngle" + angle);
      return initialAngle + Math.abs(angle);
    }
  }
};
const getMissingPiece = (LastAngle, InitialAngle) => {
    //Gets the angle between  the max and the min angle
  var diff = Math.abs(LastAngle - InitialAngle);
  console.log("Difference" + diff);
  return Math.min(diff, 360 - diff);
};

const WindingNumber = (Polygon, lat, long) => {
  if (Polygon.length < 4) {
    console.log("The polygon is not really a polygon");
    return false;
  }
  var initialAngle = 0;
  var totalAngle = 0;
  var minAngle = 99999;
  var maxAngle = 0;
  var lastAngle = 0;
  console.log(Polygon.length);
  for (var i = 0; i < Polygon.length; i++) {
    var point = Polygon[i];

    if (point.length === 2) {
      console.log("------Index " + i + "-----------");
      var angle = getAngle(point[0], point[1], lat, long);
      minAngle = angle < minAngle ? angle : minAngle;
      maxAngle = angle>maxAngle ? angle: maxAngle;
      console.log("Angle between points" + angle);
      if (i === 0) {
        initialAngle = angle;
      } else if (i === Polygon.length - 1) {
        console.log("Missing Piece");
        lastAngle = angle;
        totalAngle = Math.max(getTotalAngle(initialAngle, angle), totalAngle);
        totalAngle = totalAngle + getMissingPiece(maxAngle, minAngle);
      } else {
        totalAngle = Math.max(getTotalAngle(initialAngle, angle), totalAngle);
      }
      console.log("TotalAngleSoFar: " + totalAngle);
    } else {
      console.log("The polygon is not made of 2-dimensional points");
      return false;
    }
  }

  return false;
};
//TEST POINTS

const REDI = [[0.1, 0.1], [0.1, 1], [1, 1], [1, 1]];


//TEST
WindingNumber(REDI, 0, 0);
