import React, { Fragment } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import ResponsiveDrawer from "./ResponsiveDrawer.js";
import Dashboard from "@material-ui/icons/Dashboard";
import History from "@material-ui/icons/History";
import { DASHBOARD, HISTORY } from "../constants/routes";
const drawerWidth = 220;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class Layout extends React.Component {
  state = {
    mobileOpen: false,
    drawer: null
  };
  handleDrawerToggle = () => {
     
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  componentDidUpdate(){
  }
  render() {
    const { classes, children, auth } = this.props;
    let drawer = [{}];
    if (auth.rol !== "SU" && auth.rol) {
      drawer = [
        {
          name: "Dashboard",
          icon: <Dashboard />,
          route: DASHBOARD
        },
        {
          name: "Historial",
          icon: <History />,
          route: HISTORY
        }
      ];
    }
    return (
      <Fragment>
        <div className={classes.root}>
          <CssBaseline />
          <Navbar
            className={classes.appBar}
            menuButton={classes.menuButton}
            handleDrawerToggle={this.handleDrawerToggle}
            auth = {auth}
            grow= {classes.grow}
          />
          {auth.rol !== "SU" && auth.username && (
            <ResponsiveDrawer
              classes={classes}
              drawer={drawer}
              monitoreo={auth.rol === "SA"}
              registerWork={auth.rol ==="SA"}
              handleDrawerToggle={this.handleDrawerToggle}
              mobileOpen={this.state.mobileOpen}
            />
          )}
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
      </Fragment>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Layout);
