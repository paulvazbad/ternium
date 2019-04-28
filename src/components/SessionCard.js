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
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    width: "80%",
    margin: "auto",
    padding: 10,
    borderRadius: 15
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  pos: {
    marginBottom: 1,
    fontSize: 20
  }
});

function Dashboard(props) {
  const { classes } = props;

  const gasComponent = props.gasInfo.map((gas, index) => (
    <GasTag
      id={gas.id}
      name={gas.name}
      lectura={gas.lectura}
      key={gas.id + index}
    />
  ));

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" style={{ color: "black" }}>
            {props.employee} <Chip icon={<Router />}label={props.deviceId} className={classes.chip}   color="secondary"/>
          </Typography>
        </Grid>
        {gasComponent}
        <MapView/>
        <GasPlotter bufferInfo={props.bufferInfo}/>
      </Grid>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
