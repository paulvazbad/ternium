import React, { Component } from "react";
import { connect } from "react-redux";
import { logIn } from "../redux/actions/auth";
import { withRouter } from "react-router-dom";
import { DASHBOARD } from "../constants/routes";

class LoginPage extends Component {
  componentDidMount() {
    //Checkc if redirect to dashboard needed
    //get cookie
    console.log("Creating Login Page");
    console.log(this.props.auth);
    if (this.props.auth.username) {
      this.props.history.push(DASHBOARD);
    }
  }
  redirectOnLogIn = () => {
    this.props.logIn();
    this.props.history.push(DASHBOARD);
  };
  render() {
    return (
      <div>
        <p>Login page</p>
        <button onClick={() => this.redirectOnLogIn()}>LogIN</button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = dispatch => {
  return {
    logIn: () => {
      dispatch(logIn());
    }
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage)
);
