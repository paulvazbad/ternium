import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "../redux/actions/auth";

class DashboardPage extends Component {
 
  render() {
    return (
        <p>Dashboard</p>
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
