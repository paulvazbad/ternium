
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
      angleRad = -(Math.PI/2 + Math.atan(yDis / xDis));
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
  
  const getTotalAngle = (initialAngle,angle) =>{
      if(initialAngle<0){
          if(angle>0){
              return angle + initialAngle;
          }
          else{
              return Math.abs(initialAngle - angle);
          }
      }else{
          if(angle>0){
              return Math.abs(initialAngle - angle);
          }
          else{
            console.log("INitial angle: "+ initialAngle);
            console.log("currentAngle"+angle);
              return initialAngle + Math.abs(angle);
          }
      }
  }
  const WindingNumber = (Polygon, lat, long) => {
  
    if (Polygon.length < 4) {
      console.log("The polygon is not really a polygon");
      return false;
    }
    var initialAngle = 0;
    var index = 0;
    var totalAngle=0;
    for (const point of Polygon) {
      if (point.length === 2) {
        console.log("Index "+index)
        var angle = getAngle(point[0], point[1], lat, long);
        console.log("Angle between points" + angle);
        if (index === 0) {
          initialAngle = angle;
        }
        totalAngle = Math.max(getTotalAngle(initialAngle,angle),totalAngle);
        
        console.log("TotalAngleSoFar: " + totalAngle);
      } else {
        console.log("The polygon is not made of 2-dimensional points");
        return false;
      }
      index = index + 1;
    }
    return false;
  };
  const REDI = [
    [5, -5],
    [5, 5],
    [-5, -5],
    [-5, 5],
    [5, -5]
  
  ];
  
  WindingNumber(REDI,0,0);