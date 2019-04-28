import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis
} from "react-vis";
import continuousColorLegend from "react-vis/dist/legends/continuous-color-legend";

const styles = {
  card: {
    width: "100%",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    margin: 2,
    marginBottom: 0
  },
  pos: {
    marginBottom: 1,
    fontSize: 20
  }
};
class GasPlotter extends React.Component {
  renderLines = () => {
    //console.log(this.props.bufferInfo);
    const bufferInfo = this.props.bufferInfo;
    const gasLines=[]
    for (var property in bufferInfo) {
      if (bufferInfo.hasOwnProperty(property)) {
        var lineData = bufferInfo[property].map((value, index) => {
          return { x: index, y: value };
        });
        //console.log("property"+property+" ");
        gasLines.push(<LineSeries data={lineData} />)
        
      }
      
    }
    console.log(gasLines);
      return gasLines;
  };
  render() {
    const { classes } = this.props;
    var cardStyle = {
      backgroundColor: "white"
      //border: "3px solid " + safe,
    };
    const data = [
      { x: 0, y: 7 },
      { x: 1, y: 5 },
      { x: 2, y: 4 },
      { x: 3, y: 7 },
      { x: 4, y: 5 },
      { x: 5, y: 4 },
      { x: 6, y: 6 },
      { x: 7, y: 5 },
      { x: 8, y: 5 },
      { x: 9, y: 4 }
    ];
    return (
        <Card className={classes.card} style={cardStyle}>
          <CardContent>
            <XYPlot height={200} width={600} yDomain={[0, 10]}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              {this.renderLines()}
            </XYPlot>
          </CardContent>
        </Card>
    );
  }
}

export default withStyles(styles)(GasPlotter);
