import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "../redux/actions/auth";


import Typography from "@material-ui/core/Typography";

import SessionCard from "../components/SessionCard";
import Search from "../components/Search";
import GasInfo from "../components/gasData";
import bufferInfo from "../components/bufferInfo";
import CircularProgress from "@material-ui/core/CircularProgress";
import { endSession } from "../redux/actions/session";

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    width: "80%",
    margin: "auto",
    padding: 10,
    borderRadius: 15,
    justifyContent:"center"
  }
}

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GasInfo: []
    };
  }
  renderGasComponent = () =>{ 
  if(this.props.currentSessions.length>0){
    return (this.props.currentSessions.map((gas, index) => (
      <SessionCard
        gasInfo={gas.data}
        deviceId={gas.mac}
        employee={gas.staff.name}
        key={gas.staff.name + index}
        bufferInfo={bufferInfo}
        sessionId = {gas._id}
        endSession={(sessionId) => this.props.endSession(sessionId)}
      />
    )));
  }
  else if(this.props.loading){
    return( 
    <div style={styles.root}>
    <CircularProgress size={100} style={{marginLeft:"45%"}}/>
    </div>
    );
  }
  else{
    return <div style={styles.root} ><Typography variant="subtitle1" align="center">No active sessions to display</Typography></div>
  }
}
    
  onSearch = filteredList => {
    this.setState({ GasInfo: filteredList });
  }; 
  componentWillUnmount() {
    clearInterval(this.Interval);
  }
  render() {
     
    return (
      <div>
        <div style={{ paddingLeft: "10%" }}>
          <Typography variant="h3" component="h2" style={{ color: "orange" }}>
            {this.props.auth.area}
          </Typography>
          <br />
          <Typography variant="h4" component="h2" style={{ color: "black" }}>
            {this.props.auth.rol}
          </Typography>
        </div>
        <Search
          placeholder={"Buscar sesiones activas"}
          searchList={this.props.currentSessions}
          onSearch={this.onSearch}
        />
        <br />
        <div>{this.renderGasComponent() }</div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentSessions: state.session.currentSessions,
  loading:state.session.loading,
  auth: state.auth
});
const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    },
    endSession: (sessionId) =>{
      dispatch(endSession(sessionId));
    }
    
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
