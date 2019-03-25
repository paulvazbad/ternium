import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//import Navbar from "./components/Navbar";
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

class App extends Component {
  render() {
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
}

export default App;
