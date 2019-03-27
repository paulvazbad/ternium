import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "../redux/actions/auth";

class DashboardPage extends Component {
  redirectOnLogOut = () => {
    this.props.logOut();
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <p>Dashboard</p>
        <button onClick={() => this.redirectOnLogOut()}>LogOut</button>
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
