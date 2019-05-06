import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import L from "leaflet";
import ReactDOM from "react-dom";
import { MC2, Aceria, REDI } from "../utils/GeoFences.js";
import pointInPolygon from "../utils/PIP.js";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    width: "100%",
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    marginBottom: 0,
    height: "100%",
    position: "relative"
  },
  pos: {
    marginBottom: 1,
    fontSize: 20,
    position: "relative"
  },
  map: {
    position: "relative",
    
  }
};

class MapView extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props && nextProps) {
      if (nextProps.location.length > 1 && this.props.location.length > 1) {
        var difLat = nextProps.location[0] !== this.props.location[0];
        var difLong = nextProps.location[1] !== this.props.location[1];
        return difLat || difLong || !this.marker;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  componentDidMount() {
    // create map
    if (!this.props.disconnected) {
      this.map = L.map(ReactDOM.findDOMNode(this), {
        center: this.props.location || [25.7217, -100.3008],
        zoom: 15,
        zoomControl: false,
        layers: [
          L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
        ]
      });
      L.polygon(MC2, { color: "purple", stroke: false }).addTo(this.map);
      L.polygon(Aceria, { color: "blue", stroke: false }).addTo(this.map);
      L.polygon(REDI, { color: "orange", stroke: false }).addTo(this.map);
      //var myIcon = L.divIcon();
    } else {
    }
  }
  componentWillUnmount() {
    if(this.map){
      this.map.remove();
    }
    
  }

  determineZone = location => {
    if (location) {
      //L.marker(location).addTo(this.map);
      if (pointInPolygon(MC2, location[0], location[1])) {
        this.zone = "Molino Caliente 2";
      } else if (pointInPolygon(Aceria, location[0], location[1])) {
        this.zone = "Aceria";
      } else {
        this.zone = null;
      }
    }
  };

  render() {
    const { location } = this.props;
    if (this.map) {
      this.determineZone(location);
      this.marker = L.marker(location).addTo(this.map);
      if (this.zone) {
        this.marker = this.marker.bindPopup(this.zone).openPopup();
      }
    }
    return (
      <Card style={styles.card}>
        <CardContent style={{ position: "relative" }}>
          {!this.props.disconnected && (
            <div id="map" style={{ position: "relative" }} height={200} />
          )}
          {this.props.disconnected && (
            <div style={{ position: "relative" }} height={200}>
              <Typography
                variant="h6"
                component="h2"
                style={{ color: "black", }}
                align="center"
              >
               Mapa no disponible en desconexion
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}

export default MapView;