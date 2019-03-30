import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    let { Component, ...rest } = this.props;
    this.component = Component;
    this.rest = rest;
    console.log(this.props);
  }
  render() {
    if (this.props.auth.username) {
      console.log("ALLOWED");
      return (
        <Route {...this.rest} render={props => <Component {...props} />} />
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProtectedRoute);
