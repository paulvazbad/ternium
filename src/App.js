import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {connect } from "react-redux";
//import Navbar from "./components/Navbar";
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { loadUser } from "./redux/actions/auth";

class App extends Component {
  componentWillMount(){
    this.props.loadUser();
  }
   notLoaded = (<p>Loading</p>);
  render() {
    if(this.props.auth.loaded){
      return (
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/' component={LoginPage}/>
            </Switch>
          </div>
        </BrowserRouter>
      );
    }
    else{
      return(this.notLoaded);
    } 
  }
}
const mapDispatchToProps = (dispatch) => {
  return(
      {
          loadUser: () => dispatch(loadUser())
      }
  );
}
const mapStateToProps = (state) => ({
  auth:state.auth
});
export default connect (mapStateToProps,mapDispatchToProps)(App);
