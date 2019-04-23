import React from "react";
import Button from "@material-ui/core/Button";

import HistoryData from "../components/HistoryData";
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
      HistoryData: HistoryData
    };
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
    console.log(selection);
    
  };
  preFilter = (filter) => {
    let preFilteredList = HistoryData.filter(element => {
        console.log("filter inside "+filter)
      if (filter === "Alertas") {
        return element.type === "alert";
      } else if(filter === "Monitoreo") {
        return !(element.type === "alert");
      }
      else{
          return true;
      }
    });
    console.log(this.state);
    console.log(preFilteredList);
    this.setState({HistoryData:preFilteredList});
  };
  onSearch = filteredList => {
    this.setState({ HistoryData: filteredList });
  };
  renderHistory = () =>
    this.state.HistoryData.map(hd => (
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
          searchList={HistoryData}
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

export default HistoryPage;
