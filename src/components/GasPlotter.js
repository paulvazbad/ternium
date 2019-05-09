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
    marginBottom: 0,
    position:"relative",
    padding:2,
  },
  pos: {
    marginBottom: 1,
    fontSize: 20
  }
};
class GasPlotter extends React.Component {
  renderLines = () => {
    // 
    const bufferInfo = this.props.bufferInfo;
    const gasLines=[];
    for (var property in bufferInfo) {
      if (bufferInfo.hasOwnProperty(property)) {
        var lineData = bufferInfo[property].map((value, index) => {
          return { x: index, y: value };
        });
        // 
        gasLines.push(<LineSeries data={lineData} />)
        
      }
      
    }
    // 
      return gasLines;
  };
  render() {
    console.log(this.props.bufferInfo);
    const { classes } = this.props;
    var cardStyle = {
      backgroundColor: "white",
      position:"relative",
      padding:"2px"
      //border: "3px solid " + safe,
    };
   
    return (
        <Card className={classes.card} style={cardStyle}>
          <CardContent>
            <XYPlot height={200} width={400} yDomain={[0, 1000]}>
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
