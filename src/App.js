import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {connect } from "react-redux";
//import Navbar from "./components/Navbar";
import {DashboardPage, LoginPage, HistoryPage,NewSessionPage} from "./pages";
import ProtectedRoute from './components/ProtectedRoute';
import { loadUser } from "./redux/actions/auth";
import { DASHBOARD, HISTORY, NEWSESSION, USER_ADMIN } from "./constants/routes";
import Layout from './components/Layout';
import { createMuiTheme, MuiThemeProvider, withTheme } from '@material-ui/core/styles';
import userAdminPage from "./pages/userAdminPage";
import Timeout from './components/Timeout'

//import {styles} from './styles/MainStyles'; 
const theme = createMuiTheme({
  palette: {
    primary: { main: "#F25C29" }, // Purple and green play nicely together.
    secondary: { main: '#37323E' }, // This is just green.A700 as hex.
  },
  typography: {
    useNextVariants: true,
  }
});

class App extends Component {
  componentWillMount(){
    this.props.loadUser();
    
  }

   notLoaded = (<p>Loading stored session</p>);
  render() {
    if(this.props.auth.loaded){
      return (
        <MuiThemeProvider theme={theme}>
        <BrowserRouter>
      {this.props.auth.username && <Timeout time={10}/> }
        <Layout auth={this.props.auth}>
            <Switch>  
              <Route exact path='/' component={LoginPage}/>
              <ProtectedRoute exact path={DASHBOARD} component={DashboardPage} rol={["SA","SS"]}/>
              <ProtectedRoute exact path={HISTORY} component={HistoryPage} rol={["SA","SS"]}/>
              <ProtectedRoute exact path={NEWSESSION} component={NewSessionPage} rol={["SA"]}/>
              <ProtectedRoute exact path={USER_ADMIN} component={userAdminPage} rol={["SU"]}/>
            </Switch>
        </Layout>
        </BrowserRouter>
        </MuiThemeProvider>
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
export default withTheme()(connect (mapStateToProps,mapDispatchToProps)(App));
