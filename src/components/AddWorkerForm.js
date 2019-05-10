import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { newWorker } from "../redux/actions/auth";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Ballot from "@material-ui/icons/Ballot";
import Person from "@material-ui/icons/Person";
import Save from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

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

class AddWorkerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      registrationId: null
    };
  }
  onChange = (e, id) => {
    this.setState({ [id]: e.target.value });
  };

  render() {
    var buttonStyle1 = {
      width: "10%"
    };
    const {name, registrationId} = this.state;
    return (
      <form>
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
          <Grid item xs={3}>
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
                id="name"
                onChange={e => this.onChange(e,"name")}
                required
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
                id="registrationId"
                onChange={e => this.onChange(e,"registrationId")}
                required
              />
              <IconButton style={stylesS.iconButton} aria-label="Search" />
            </Paper>
          </Grid>
          <Grid item align="right">
            <Button
              variant="contained"
              color="primary"
              style={buttonStyle1} //change
              disabled ={name === "" ||
              registrationId === "" ||
              name === null ||
              registrationId === null}
              onClick={() => {
                console.log(this.state);
                this.props.addWorker(
                  this.state.name,
                  this.state.registrationId
                );
              }}
            >
              <Save />
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  workerList: state.auth.team
});
const mapDispatchToProps = dispatch => ({
  addWorker: (name, registrationId) => dispatch(newWorker(name, registrationId))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddWorkerForm);
