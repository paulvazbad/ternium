import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import { withStyles } from "@material-ui/core/styles";
const styles = () => ({
  appBar: {
    flexGrow: 1,
    width: "100%"
  }
});
class Navbar extends Component {
  renderOptions = () => {
    const { rol, username } = this.props.auth;
    switch (rol) {
      case "SS":
      case "SA":
        return (
          <Button component={Link} to={routes.DASHBOARD}>
            Dashboard
          </Button>
        );
      case "SU":
      default:
    }
  };
  render() {
    return (
      <AppBar
        color="primary"
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
          <Typography variant="title" color="inherit" noWrap>
            Ternium Gas Viewer
          </Typography>
          {this.props.rol && this.renderOptions}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar);
