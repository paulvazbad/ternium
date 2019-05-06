import React from "react";
import Button from "@material-ui/core/Button";
import {connect} from 'react-redux';
import { getPastSessions } from "../redux/actions/session";
import historyData from "../components/historyData";
import HistoryCard from "../components/HistoryCard";
import Search from "../components/Search";

const styles = theme => ({
  button: {
    width: "10%",
    margin: "auto"
  },
  input: {
    display: "none"
  }
});

var buttonStyle1 = {
  width: "20%",
  marginLeft: "30%",
  marginRight: 10
};

class HistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: null,
      historyData: historyData
    };
  }
  componentWillMount(){
    this.props.getPastSessions(10);
  }
  setFilter = selection => {
    if (this.state.filter) {
      if (this.state.filter !== selection) {
        this.setState({ filter: selection });
        this.preFilter(selection);
      } else {
        this.setState({ filter: null });
        this.preFilter(null);
      }
    } else {
      this.setState({ filter: selection });
      this.preFilter(selection);
    }
     
    
  };
  preFilter = (filter) => {
    let preFilteredList = historyData.filter(element => {
         
      if (filter === "Alertas") {
        return element.type === "alert";
      } else if(filter === "Monitoreo") {
        return !(element.type === "alert");
      }
      else{
          return true;
      }
    });
     
     
    this.setState({historyData:preFilteredList});
  };
  preFilterS = (filter,data) => {
    let preFilteredList = data.filter(element => {
         
      if (filter === "Alertas") {
        return element.type === "alert";
      } else if(filter === "Monitoreo") {
        return !(element.type === "alert");
      }
      else{
          return true;
      }
    });
    return preFilteredList;
    
  };


  onSearch = filteredList => {
    var allfilters = this.preFilterS(this.state.filter,filteredList);
    this.setState({ historyData: allfilters });
  };

  renderHistory = () =>
    this.state.historyData.map(hd => (
      <HistoryCard
        date={hd.date}
        btime={hd.begin_time}
        etime={hd.end_time}
        area={hd.area}
        place={hd.place}
        detected={hd.detected}
        type={hd.type}
      />
    ));
  render() {
    return (
      <div styles={{ margin: "auto" }}>
        <Search
          placeholder={"Buscar sesiones pasadas e incidentes"}
          onSearch={this.onSearch}
          searchList={historyData}
        />
        <br />
        <div>
          <Button
            variant="contained"
            color={this.state.filter === "Monitoreo" ? "primary" : "secondary"}
            style={buttonStyle1}
            onClick={() => this.setFilter("Monitoreo")}
          >
            Monitoreo
          </Button>
          <Button
            variant="contained"
            color={this.state.filter === "Alertas" ? "primary" : "secondary"}
            style={{ width: "20%" }}
            onClick={() => this.setFilter("Alertas")}
          >
            Alertas
          </Button>
        </div>
        <br />
        {this.renderHistory()}
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return({
    historyData: state.session.pastSessions
  })
}

const mapDispatchToProps = dispatch => {
  return {
    getPastSessions: (cant) => {
      dispatch(getPastSessions(cant));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryPage);