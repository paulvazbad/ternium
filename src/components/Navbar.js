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

const styles = () => ({
  appBar: {
    flexGrow: 1,
    width: "100%"
  }
});
class Navbar extends Component {
  redirectOnLogOut = () => {
    this.props.logOut();
    return(<Redirect to={"/pero"}/>)
  };

  render() {
    return (
      <AppBar
        color="blue"
        position="absolute"
        className={this.props.className}
      >
        <Toolbar>
          {this.props.auth.username && (
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerToggle}
              className={this.props.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
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
