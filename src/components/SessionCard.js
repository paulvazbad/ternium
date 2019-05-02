import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GasPlotter from './GasPlotter.js';
import GasTag from "./GasTag";
import Chip from '@material-ui/core/Chip';
import Router from "@material-ui/icons/Router";
import MapView from './MapView.js'
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    width: "80%",
    margin: "auto",
    padding: 10,
    borderRadius: 15,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:15
  },
  pos: {
    marginBottom: 1,
    fontSize: 20
  },
  chip:{
    margin:"3px"
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
            <Chip icon={<PersonIcon />}label={props.employee} className={classes.chip}   color="primary"/>
            <Chip icon={<Router />}label={props.deviceId} className={classes.chip}   color="secondary"/>
          <IconButton style={{marginLeft:"2"}} aria-label="Delete" onClick={() => props.endSession(props.sessionId)}>
        <CloseIcon />
      </IconButton>

        </Grid>
        {gasComponent()}
        <Grid item xs={sizes[0]} >
            <MapView location={[25.72197,-100.30275]} />
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
