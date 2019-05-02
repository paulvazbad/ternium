export default function pointInPolygon(Polygon, y, x) {
    var i;
    var j = Polygon.length - 1;
    var oddNodes = false;
    let polyY =[], polyX=[];
    for (i = 0; i < Polygon.length; i++) {
      polyY.push(Polygon[i][0]);
      polyX.push(Polygon[i][1]);
    }
  
  
    for (i = 0; i < Polygon.length; i++) {
      if (
        ((polyY[i] < y && polyY[j] >= y) || (polyY[j] < y && polyY[i] >= y)) &&
        (polyX[i] <= x || polyX[j] <= x)
      ) {
        if (
          polyX[i] +
            ((y - polyY[i]) / (polyY[j] - polyY[i])) * (polyX[j] - polyX[i]) <
          x
        ) {
          oddNodes = !oddNodes;
        }
      }
      j = i;
    }
      //console.log(oddNodes);
    return oddNodes;
  }
  
  
  /*pointInPolygon([
    [25.72169, -100.30377],
    [25.72237, -100.30369],
    [25.7223, -100.30211],
    [25.72144, -100.30213],
  
  ],25.721796,-100.30168); */