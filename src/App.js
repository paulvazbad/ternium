import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
//import Navbar from "./components/Navbar";
import { DashboardPage, LoginPage, HistoryPage, NewSessionPage, MyTeamPage } from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";
import { loadUser } from "./redux/actions/auth";
import { DASHBOARD, HISTORY, NEWSESSION, USER_ADMIN, ADMINWORKERS } from "./constants/routes";
import Layout from "./components/Layout";
import {
  createMuiTheme,
  MuiThemeProvider,
  withTheme
} from "@material-ui/core/styles";
import userAdminPage from "./pages/userAdminPage";
import Timeout from "./components/Timeout";
import SnackbarTrigger from "./components/SnackbarTrigger";
import SessionFetcher from "./components/SessionFetcher";
import Loading from "./components/Loading.js";
//import {styles} from './styles/MainStyles';
const theme = createMuiTheme({
  palette: {
    primary: { main: "#F25C29" }, // Purple and green play nicely together.
    secondary: { main: "#37323E" } // This is just green.A700 as hex.
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  componentWillMount() {
    this.props.loadUser();
  }

  notLoaded = (
    <div style={{ display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop:"20%",
      marginLeft:"45%"}}>
      <Loading withIcon={false} redirect={"TBD"} />
    </div>
  );
  render() {
    if (this.props.auth.loaded) {
      return (
        <MuiThemeProvider theme={theme}>
          <BrowserRouter basename="/app/">
            {this.props.auth.username && <Timeout time={10} />}
            {this.props.auth.username && <SnackbarTrigger />}
            {(this.props.auth.rol === "SA" || this.props.auth.rol === "SS") && (
              <SessionFetcher />
            )}
            <Layout auth={this.props.auth}>
              <Switch>
                <Route exact path="/" component={LoginPage} />
                <ProtectedRoute
                  exact
                  path={DASHBOARD}
                  component={DashboardPage}
                  rol={["SA", "SS"]}
                />
                <ProtectedRoute
                  exact
                  path={HISTORY}
                  component={HistoryPage}
                  rol={["SA", "SS"]}
                />
                <ProtectedRoute
                  exact
                  path={NEWSESSION}
                  component={NewSessionPage}
                  rol={["SA"]}
                />
                <ProtectedRoute
                  exact
                  path={USER_ADMIN}
                  component={userAdminPage}
                  rol={["SU"]}
                />
                <ProtectedRoute
                  exact
                  path={ADMINWORKERS}
                  component={MyTeamPage}
                  rol={["SA"]}
                />
              </Switch>
            </Layout>
          </BrowserRouter>
        </MuiThemeProvider>
      );
    } else {
      return this.notLoaded;
    }
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(loadUser())
  };
};
const mapStateToProps = state => ({
  auth: state.auth,
  currentSessions: state.session.currentSessions
});
export default withTheme()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
