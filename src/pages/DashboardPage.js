import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "../redux/actions/auth";

import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";
import SessionCard from "../components/SessionCard";
import Search from "../components/Search";
import GasInfo from "../components/gasData";
import bufferInfo from "../components/bufferInfo";
import CircularProgress from "@material-ui/core/CircularProgress";
import { endSession } from "../redux/actions/session";
import SearchRealTime from '../components/SearchRealTime';

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    width: "80%",
    margin: "auto",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center"
  }
};

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.stat={};
    this.state={
      GasInfo:[],
      filter:""
    }
  }
  renderGasComponent = () => {
    var GasInfo = this.Search();
    if (GasInfo.length > 0) {
      return GasInfo.map((gas, index) => {
        if (gas.alertaBoton || gas.alertaCaida || gas.alertaMetrica !== "") {
          var errorMsg = "";
          if (gas.alertaBoton) {
            errorMsg = "Alerta en: " + gas.staff.name + " por boton de panico";
          } else if (gas.alertaCaida) {
            errorMsg = "Alerta en " + gas.staff.name + " por caida";
          } else {
            errorMsg =
              "Alerta en " + gas.staff.name + " por " + gas.alertaMetrica;
          }
          if (!this.stat[gas.mac]) {
            toast.error(errorMsg, {
              position: "bottom-right",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true
            });
            this.stat[gas.mac] = true;
          }
        } else {
          this.stat[gas.mac] = false;
        }
        var updatedSeconds = (Date.now() - Date.parse(gas.updatedAt)) / 1000;
        console.log(updatedSeconds);
        var disconnected = updatedSeconds >= 10;
        console.log(disconnected);
        console.log(gas);
        return (
          <SessionCard
            gasInfo={gas.data}
            deviceId={gas.mac}
            employee={gas.staff.name}
            key={gas.staff.name + index}
            sessionId={gas._id}
            endSession={sessionId => this.props.endSession(sessionId)}
            disconnected={disconnected}
            location={[gas.gps.longitud, gas.gps.latitud]}
          />
        );
      });
    } else if (this.props.loading) {
      return (
        <div style={styles.root}>
          <CircularProgress size={100} style={{ marginLeft: "45%" }} />
        </div>
      );
    } else {
      return (
        <div style={styles.root}>
          <Typography variant="subtitle1" align="center">
            No active sessions to display
          </Typography>
        </div>
      );
    }
  };
  Search = () =>{
    let newList = [];
    if ( this.state.filter !== "") {
      //checks
      if (this.props.currentSessions) {
        newList = this.props.currentSessions.filter(item => {
          for (var property in item) {
            if (item.hasOwnProperty(property)) {
              let itemData = item[property];
              if (typeof itemData === "string") {
                itemData = itemData.toLowerCase();
                let searchData =  this.state.filter.toLowerCase();
                if (itemData.includes(searchData)) {
                  return true;
                }
              } else if (
                typeof itemData === "number" &&
                itemData.toString().includes( this.state.filter)
              ) {
                return true;
              }
            }
          }
          return false;
        });
      }

      return(newList);
      //then query to backend
    } else {
      return(this.props.currentSessions);
      //set list to original one
    }
  }
 
  onChange = (text) =>{
    this.setState({filter:text});
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
        {this.props.currentSessions.length > 0 && (
          <SearchRealTime onChange={this.onChange}
          />
        )}
        <br />
        <div>{this.renderGasComponent()}</div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentSessions: state.session.currentSessions,
  loading: state.session.loading,
  auth: state.auth
});
const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    },
    endSession: sessionId => {
      dispatch(endSession(sessionId));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
