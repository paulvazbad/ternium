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
import Typography from "@material-ui/core/Typography";

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
    marginBottom:15,
    position:"relative"
  },
  pos: {
    marginBottom: 1,
    fontSize: 20
  },
  chip:{
    margin:"3px"
  },
  layer:{
    backgroundColor:"white",
    position: "absolute",
    display:"flex",
    opacity: 0.8,
    bottom: "0",
    right: "0",
    width: "100%",
    height: "85.87%",
    justifyContent:"center",
    alignItems:"center",
    zIndex:1
  }
});

class Dashboard extends React.Component {
   constructor(props){
     super(props);
     this.bufferInfo={};
     for (var property in props.gasInfo) {
      if (props.gasInfo.hasOwnProperty(property)) {
        this.bufferInfo[property]=[];
      }
    }

   }


     gasComponent = () =>{
      const { classes } = this.props;
      let gasses = []
      var props = this.props;
      var index = 0;
        for (var property in props.gasInfo) {
          if (props.gasInfo.hasOwnProperty(property)) {  
            if(property !== "_id"){
              this.bufferInfo[property].push(props.gasInfo[property]);
              
              gasses.push(<GasTag
                id={index}
                name={property}
                lectura={props.gasInfo[property]}
                key={Math.random() }
            />)
            index++;
            }
          
      }
    }
     
    return gasses;

      
}
    
render(){
    var sizes = [5, 7]
    const { classes } = this.props;
    var props = this.props;
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
        {props.disconnected && <div className={classes.layer}>
        <Typography variant="h4" component="h2" style={{ color: "black", opacity:1}}align="center">
        Desconectado
        </Typography>
        </div>}
        {this.gasComponent()}
        <Grid item xs={sizes[0]} >
            <MapView location={[25.72197,-100.30275]} disconnected={props.disconnected}/>
        </Grid>
        <Grid item xs={sizes[1]} >
            <GasPlotter bufferInfo={this.bufferInfo}/>
        </Grid>
        </Grid>
    </div>
    );
}
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
