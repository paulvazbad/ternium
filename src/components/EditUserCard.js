import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { deleteUser, editUser, newUser } from "../redux/actions/user";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";

import save from "./images/save";

const styles = theme => ({
  root: {
    marginTop: "0%",
    overflowX: "auto"
  }
});

const areas = [
  {
    value: "Aceria",
    label: "Aceria"
  },
  {
    value: "REDI",
    label: "REDI"
  },
  {
    value: "ALCO",
    label: "ALCO"
  }
];

const lugares = [
  {
    value: "Molino Caliente 2",
    label: "Molino Caliente 2"
  },
  {
    value: "Patio PEGI",
    label: "Patio PEGI"
  }
];

class EditUserCard extends React.Component {
  state = {
    enableSave: false,
    showPassword: false,

    name: this.props.name,
    area: this.props.area,
    puesto: this.props.puesto,
    username: this.props.username,
    password: "",

    formInfo: null
  };

  handleSave = () => {
    const forminfo = {
      name: this.state.name,
      area: this.state.area,
      rol: this.state.puesto,
      username: this.state.username,
      password: this.state.password
    };

    this.setState(state => ({ formInfo: this.forminfo }));
    if (this.props.newUserCard) {
      this.props.newUser(forminfo);
    } else {
      this.props.editUser(forminfo);
    }

    //this.props.handleSave(this.state.formInfo);
  };

  handleDelete = () => {
    const forminfo = {
      name: this.state.name,
      area: this.state.area,
      rol: this.state.puesto,
      username: this.state.username,
      password: this.state.password
    };
    this.props.deleteUser(forminfo, this.props.index);
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    this.setState(state => ({ enableSave: true }));
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;

    var buttonColor = this.state.enableSave ? "#FF8000" : "gray";

    var buttonStyle1 = {
      width: "10%",
      marginLeft: "30%",
      marginRight: 10,
      textAlign: "right",
      backgroundColor: buttonColor
    };
    return (
      <form>
      <Grid container spacing={24}>
        <Grid item xs={3} align="left">
          <TextField
            label="Nombre"
            className={classes.textField}
            defaultValue={this.props.name}
            margin="normal"
            onChange={this.handleChange("name")}
          />
        </Grid>
        <Grid item xs={3} align="left">
          <TextField
            label="Username"
            className={classes.textField}
            defaultValue={this.props.username}
            onChange={this.handleChange("username")}
            InputProps={
              {
                //readOnly: true,
              }
            }
            margin="normal"
          />
        </Grid>
        <Grid item xs={3} align="left">
          <InputLabel htmlFor="adornment-password" style={{ fontSize: "12px" }}>
            Password
          </InputLabel>
          <Input
            type={this.state.showPassword ? "text" : "password"}
            value={this.state.password}
            onChange={this.handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={3} align="right">
          <Button
            variant="contained"
            color="primary"
            disabled={!this.state.enableSave}
            style={buttonStyle1}
            onClick={this.handleSave} //change
          >
            {save()}
          </Button>
        </Grid>
        <Grid item xs={3} align="left">
          <TextField
            select
            label="Area"
            value={this.state.area}
            onChange={this.handleChange("area")}
            InputProps={{
              readOnly: this.state.readOnly
            }}
          >
            {areas.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3} align="left">
          <TextField
            label="Puesto"
            className={classes.textField}
            defaultValue={this.props.puesto}
            onChange={this.handleChange("puesto")}
            InputProps={{
              readOnly: this.state.readOnly
            }}
            margin="normal"
          />
        </Grid>
        <Grid item xs={3} align="left" />
        {!this.props.newUserCard && (
          <Grid
            item
            xs={3}
            align="right"
            onClick={() => {
              this.handleDelete();
            }}
          >
            <IconButton
              style={{ marginRight: "7%" }}
              className={classes.button}
              aria-label="Delete"
              fontSize="large"
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
      </form>
    );
  }
}

EditUserCard.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch => {
  return {
    editUser: userInfo => {
      dispatch(editUser(userInfo));
    },
    deleteUser: (userInfo, index) => {
      dispatch(deleteUser(userInfo, index));
    },
    newUser: userInfo => {
      dispatch(newUser(userInfo));
    }
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(EditUserCard)
);
