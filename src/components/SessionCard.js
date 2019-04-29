import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import GasPlotter from './GasPlotter.js';
import GasTag from "./GasTag";
import Chip from '@material-ui/core/Chip';
import Router from "@material-ui/icons/Router";
import Avatar from '@material-ui/core/Avatar';
import MapView from './MapView.js'
import { attribute } from "postcss-selector-parser";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    width: "80%",
    margin: "auto",
    padding: 10,
    borderRadius: 15,
    justifyContent:"center",
    alignItems:"center"
  },
  pos: {
    marginBottom: 1,
    fontSize: 20
  }
});

function Dashboard(props) {
    const { classes } = props;


    const gasComponent = () =>{
       
       
      let gasses = []
      let index = 0;
        for (var property in props.gasInfo) {
          if (props.gasInfo.hasOwnProperty(property)) {
            index++;
             
            if(property !== "_id"){
              gasses.push(<GasTag
                id={index}
                name={property}
                lectura={props.gasInfo[property]}
                key={Math.random() }
            />)
            }
          
      }
    }
     
    return gasses;

      
}
    

    var sizes = [5, 7]

    return (
    <div className={classes.root}>
        <Grid container spacing={8}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" style={{ color: "black" }}>
            {props.employee} <Chip icon={<Router />}label={props.deviceId} className={classes.chip}   color="secondary"/>
          </Typography>
        </Grid>
        {gasComponent()}
        <Grid item xs={sizes[0]} >
            <MapView />
        </Grid>
        <Grid item xs={sizes[1]} >
            <GasPlotter bufferInfo={props.bufferInfo}/>
        </Grid>
        </Grid>
    </div>
    );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
