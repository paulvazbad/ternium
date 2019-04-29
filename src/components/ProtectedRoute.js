import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    let { Component, ...rest } = this.props;
    this.component = Component;
    this.rest = rest;
  }

  render() {
    if (this.props.auth.rol && (this.props.rol.indexOf(this.props.auth.rol)>=0)) {
       
       
       
       
      return (
        <Route {...this.props} />
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
