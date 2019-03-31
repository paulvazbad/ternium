import React, { Component } from "react";
import { connect } from "react-redux";
import { logIn } from "../redux/actions/auth";
import { withRouter } from "react-router-dom";
import { Button} from "@material-ui/core/";
import { DASHBOARD } from "../constants/routes";
import { TextField, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

class LoginPage extends Component {
  state={
    username:null,
    password:null
  };

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
    this.props.logIn(this.state);
  };
  componentDidUpdate() {
    if (this.props.auth.username) {
      this.props.history.push(DASHBOARD);
    }
  }
  handleChange = name => event => {
  this.setState({[name]:event.target.value});
  };
  render() {
    return (
      <form>
        <Grid container direction="column" justify="flex-start" spacing={16} alignItems="center">
        <div style={{width: "60%", textAlign:"center"}}>
        <Grid item>
        <Typography style={{paddingTop:20}}variant="title">Sign In</Typography>
        </Grid>
          <Grid item>
           
            <TextField
          id="username"
          label="Username"
          placeholder="ex: A00819877"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={this.handleChange("username")}
        />
        </Grid>
        <Grid item>
            
            <TextField
          id="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={this.handleChange("password")}
        />
        </Grid >
        <Grid item>
            <Button variant="contained" size="large" color="primary" style={{
              width:"50%",
              justify:"center"
            }} onClick={() => this.redirectOnLogIn()}
             >LogIN</Button  >
             {this.props.auth.failed && <p color="#FF0000">Invalid Credentials</p>}
        </Grid>    
            </div>
        </Grid>
        
        </form>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = dispatch => {
  return {
    logIn: (userInfo) => {
      dispatch(logIn(userInfo));
    }
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage)
);
