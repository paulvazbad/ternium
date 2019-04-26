import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis
} from "react-vis";

const styles = {
  card: {
    width: "100%",
    display: "flex",
    textAlign: "center",
    justifyContent:"center",
    margin: 2,
    marginBottom: 0
  },
  pos: {
    marginBottom: 1,
    fontSize: 20
  }
};
class GasPlotter extends React.Component {
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
      <Grid item xs={6}>
        <Card className={classes.card} style={cardStyle}>
          <CardContent>
            <XYPlot height={200} width={600} yDomain={[0,10]} >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <LineSeries data={data} />
            </XYPlot>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(GasPlotter);
