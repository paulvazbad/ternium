import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "../redux/actions/auth";
import Typography from '@material-ui/core/Typography';

import Dashboard from "../components/dashboard"
import Search from "../components/Search"

class DashboardPage extends Component {
 
  render() {
      return (
          <div>
              <div style={{paddingLeft: "10%"}}>
              <Typography variant="h3" component="h2" style={{ color: "orange" }}>
                  Equipo
            </Typography>
              <br />
              <Typography variant="h4" component="h2" style={{ color: "black" }}>
                  Lugar
            </Typography>
            </div>
            <Search />
            <br />
          <div>
              <Dashboard/>
              </div>
          </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
