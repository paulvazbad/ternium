import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "../redux/actions/auth";

import Dashboard from "../components/dashboard"

class DashboardPage extends Component {
 
  render() {
      return (
          <div>
              <Dashboard/>
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
