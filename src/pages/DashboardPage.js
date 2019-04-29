import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "../redux/actions/auth";
import { getActiveSessions } from "../redux/actions/session";

import Typography from "@material-ui/core/Typography";

import SessionCard from "../components/SessionCard";
import Search from "../components/Search";
import GasInfo from "../components/gasData";
import bufferInfo from "../components/bufferInfo";
import CircularProgress from "@material-ui/core/CircularProgress";


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
      GasInfo: GasInfo
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
      />
    )));
  }
  else{
    return( 
    <div style={styles.root}>
    <CircularProgress size={100} style={{marginLeft:"45%"}}/>
    </div>
    );
  }
}
    
  onSearch = filteredList => {
    this.setState({ GasInfo: filteredList });
  };
  //Make a new component to fetch this info
  componentDidMount() {
    this.Interval = setInterval(()=>{
      this.props.getActiveSessions(this.props.auth.username);
      console.log(this.props.currentSessions.length);
    },3000)
  }
  componentWillUnmount() {
    clearInterval(this.Interval);
  }
  render() {
    console.log(this.props.currentSessions);
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
          searchList={GasInfo}
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
  auth: state.auth
});
const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    },
    getActiveSessions: (username) =>{
      dispatch(getActiveSessions(username));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
