import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import L from "leaflet";
import ReactDOM from "react-dom";

const styles = {
    card: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: 2,
      marginBottom: 0,
      height: "100%"
    },
    pos: {
      marginBottom: 1,
      fontSize: 20
    }
  };

class MapView extends React.Component {
  componentDidMount() {
    // create map
    this.map = L.map(ReactDOM.findDOMNode(this), {
        center: [25.7205,-100.3018],
        zoom: 15,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });
  }
  componentWillUnmount() {
    this.map.remove();
  }
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card} >
      <CardContent>
      <div id="map"  height={200}/>
      </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(MapView);
