import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { logOut } from "../redux/actions/auth";
import { connect } from "react-redux";
import mini_logo from '../assests/Mini-Logo.jpeg'

const styles = () => ({
  appBar: {
    flexGrow: 1,
    width: "100%"
  }
});
class Navbar extends Component {
  redirectOnLogOut = () => {
    this.props.logOut();
    return(<Redirect to={"/"}/>)
  };

  render() {
    return (
      <AppBar
        color="blue"
        position="absolute"
        className={this.props.className}
      >
        <Toolbar>
          {this.props.auth.username && this.props.auth.rol!=="SU"  && (
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerToggle}
              className={this.props.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img src={mini_logo} alt="Logo" style={{width:30,height:30, marginRight:10}}/>
          <Typography
            variant="title"
            color="inherit"
            className={this.props.grow}
            noWrap
          >

            Ternium

          </Typography>

          {
            this.props.auth.username &&
            <Button color="inherit" onClick={() => this.redirectOnLogOut()}>
              Exit
            </Button>
          }
        </Toolbar>
      </AppBar>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    }
  };
};
export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(Navbar)
);
