import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import L from "leaflet";
import ReactDOM from "react-dom";
import  {MC2, Aceria} from "../utils/GeoFences.js"
import Router from "@material-ui/icons/Router";

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
  state={
    zone:null
  }
  componentDidMount() {
    // create map
    this.map = L.map(ReactDOM.findDOMNode(this), {
        center: this.props.location || [25.7217, -100.3008],
        zoom: 15,
        zoomControl:false,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });
   L.polygon(MC2,{color:"purple", stroke:false}).addTo(this.map);
   L.polygon(Aceria,{color:"blue", stroke:false}).addTo(this.map);
  //L.marker([25.7205,-100.3018]).addTo(this.map);
  //var myIcon = L.divIcon();
//L.marker([25.7205,-100.3018], {icon: myIcon}).addTo(this.map);
  }
  componentWillUnmount() {
    this.map.remove();
  }
  determineZone = () =>{
    let loc = this.props.location;
    if(loc){
      if(loc.length>1){
        let lat = loc[0];
        let long = loc[1];
      }
    }
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
