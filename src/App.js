import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {connect } from "react-redux";
//import Navbar from "./components/Navbar";
import {DashboardPage, LoginPage} from "./pages";
import ProtectedRoute from './components/ProtectedRoute';
import { loadUser } from "./redux/actions/auth";
import { DASHBOARD } from "./constants/routes";
import Layout from './components/Layout';
//import {styles} from './styles/MainStyles'; 

class App extends Component {
  componentWillMount(){
    this.props.loadUser();
    
  }

   notLoaded = (<p>Loading stored session</p>);
  render() {
    if(this.props.auth.loaded){
      return (
        <BrowserRouter>
        <Layout auth={this.props.auth}>
            <Switch>
              <Route exact path='/' component={LoginPage}/>
              <ProtectedRoute exact path={DASHBOARD} component={DashboardPage}/>
            </Switch>
        </Layout>
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
export default (connect (mapStateToProps,mapDispatchToProps)(App));
