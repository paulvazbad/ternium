import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Ballot from "@material-ui/icons/Ballot";
import Person from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import  Save  from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

import WorkerCard from "../components/WorkerCard"


const styles = theme => ({
  card: {
    display: "flex",
    width: "50%",
    padding: 5,
    paddingTop: 5,
    marginTop:5,
    margin: "auto"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto",
    display: "inline-block",
    paddingTop: 15
  }
});

const stylesS = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "auto",
    marginTop: "2%"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10,
    color: "primary"
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
};

const AddWorkerForm = props => {
  var buttonStyle1 = {
    width: "10%",
    backgroundColor: "#FF8000",
  };
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={8}
      style={{
        paddingTop: 5,
        padding: 10
      }}
    >
      <Grid item  xs={3}>
        <Paper style={stylesS.root} elevation={1}>
          <IconButton
            style={stylesS.iconButton}
            color="primary"
            aria-label="Menu"
          >
            <Person />
          </IconButton>
          <InputBase
            style={stylesS.input}
            placeholder={"Nombre"}
            onChange={event => this.props.onChange(event.target.value)}
          />
          <IconButton style={stylesS.iconButton} aria-label="Search" />
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper style={stylesS.root} elevation={1}>
          <IconButton
            style={stylesS.iconButton}
            color="primary"
            aria-label="Menu"
          >
            <Ballot />
          </IconButton>
          <InputBase
            style={stylesS.input}
            placeholder={"ID"}
            onChange={event => this.props.onChange(event.target.value)}
          />
          <IconButton style={stylesS.iconButton} aria-label="Search" />
        </Paper>
      </Grid>
      <Grid item align="right">
            <Button
              variant="contained"
              color="primary"
              style={buttonStyle1} //change
            >
            <Save/>
            </Button>
          </Grid>
    </Grid>
  );
};

class MyTeam extends React.Component {
  renderWorkers = () => {
    const { classes, workerList } = this.props;
    console.log(this.props.workerList);
    if (workerList.length > 0) {
      return workerList.map(element => {
        return (
          <div style={{ minWidth: 130 }}>
            <Paper className={classes.card}>
                <div className={classes.details} style={{ width: "100%", padding: "5%"}}>
                    <WorkerCard nombre={element.name} registrationId={element.registrationId}/>
                </div>
            </Paper>
            <br />
          </div>
        );
      });
    }
  };

  render() {
    return (
      <div>
        <Typography
          variant="h4"
          component="h4"
          align="center"
          style={{ color: "orange" }}
        >
          {"Mi Equipo"}
        </Typography>
        <div style={{ textAlign: "center",}}>
          <AddWorkerForm />
        </div>

        {this.renderWorkers()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  workerList: state.auth.team
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null
  )(MyTeam)
);
