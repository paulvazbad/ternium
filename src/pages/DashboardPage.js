import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "../redux/actions/auth";
import Typography from "@material-ui/core/Typography";

import SessionCard from "../components/SessionCard";
import Search from "../components/Search";
import GasInfo from "../components/gasData";

class DashboardPage extends Component {
  constructor(props){
    super(props);
    this.state={
      GasInfo:GasInfo
    }
  }
  renderGasComponent = () => this.state.GasInfo.map((gas, index) => (
    <SessionCard
      gasInfo={gas.gases}
      employee={gas.employee}
      key={gas.employee + index}
    />
  ));
  onSearch = (filteredList) =>{
    this.setState({GasInfo:filteredList});
  }
  render() {
    return (
      <div>
        <div style={{ paddingLeft: "10%" }}>
          <Typography variant="h3" component="h2" style={{ color: "orange" }}>
            Equipo
          </Typography>
          <br />
          <Typography variant="h4" component="h2" style={{ color: "black" }}>
            Lugar
          </Typography>
        </div>
        <Search placeholder={"Buscar sesiones activas"} searchList={GasInfo} onSearch={this.onSearch}/>
        <br />
        <div>{this.renderGasComponent()}</div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
