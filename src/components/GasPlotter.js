import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineMarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  DiscreteColorLegend
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
    position: "relative",
    height: "100%",
    padding: 10
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
    const gasLines = [];
    var legends = [];
    for (var property in bufferInfo) {
      if (bufferInfo.hasOwnProperty(property)) {
        if (property !== "_id") {
          var lineData = bufferInfo[property].map((value, index) => {
            return { x: index, y: value };
          });
          legends.push(property);
          console.log(lineData);
          gasLines.push(<LineMarkSeries data={lineData} />);
        }
      }
    }
    //
    console.log(legends);

    return [
      ...gasLines,
      <DiscreteColorLegend orientation="horizontal" items={legends} />
    ];
  };
  render() {
    console.log(this.props.bufferInfo);
    const { classes } = this.props;
    var cardStyle = {
      backgroundColor: "white",
      position: "relative"
      //border: "3px solid " + safe,
    };
    var graph = window.innerWidth < 800 ? 300 : 450;
    console.log(graph);
    return (
      <Card className={classes.card} style={cardStyle}>
        <CardContent>
          <XYPlot height={250} width={graph} yDomain={[0, 100]}>
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
