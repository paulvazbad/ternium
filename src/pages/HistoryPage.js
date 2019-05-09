import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { getPastSessions } from "../redux/actions/session";
import historyData from "../components/historyData";
import HistoryCard from "../components/HistoryCard";
import Search from "../components/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

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
        historyData: this.props.historyData,
        loading: false,
        quantity: 10
    };

    window.onscroll = () => {
      // Bails early if:
      // * there's an error
      // * it's already loading
      if (this.props.error || this.state.loading ||  this.props.historyData) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1
      ) {
        alert("yeet");
        this.setState({ loading: true });
        this.props.getPastSessions(this.state.quantity);
        this.setState({ quantity: this.state.quantity + 10 });
      }
    };
  }
  componentWillMount() {
    this.props.getPastSessions(this.state.quantity);
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
  preFilter = filter => {
    let preFilteredList = this.props.historyData.filter(element => {
      if (filter === "Alertas") {
        return element.type === "alert";
      } else if (filter === "Monitoreo") {
        return !(element.type === "alert");
      } else {
        return true;
      }
    });

    this.setState({ historyData: preFilteredList });
  };
  preFilterS = (filter, data) => {
    let preFilteredList = data.filter(element => {
      if (filter === "Alertas") {
        return element.type === "alert";
      } else if (filter === "Monitoreo") {
        return !(element.type === "alert");
      } else {
        return true;
      }
    });
    return preFilteredList;
  };

  onSearch = filteredList => {
    var allfilters = this.preFilterS(this.state.filter, filteredList);
    this.setState({ historyData: allfilters, loading: false });
    };


    renderHistory = () => {
        if (this.state.loading) {
            this.setState({ loading: false });
        }
        
        if (this.state.historyData.length>0) {

            return this.state.historyData.map((cardData) => {
                if (cardData.type !== "history") {
                    return (
                        <HistoryCard
                            date={cardData.date}
                            data={cardData.data}
                            type={cardData.type}
                            sensor={cardData.sensor}
                            place={cardData.gps}
                            staff={cardData.staff}
                        />)
                } else {
                    return (
                        <HistoryCard
                            idate={cardData.initialDate}
                            edate={cardData.endDate}
                            gases={cardData.Data}
                            place={cardData.GPS}
                            staff={cardData.staff}
                        />
                    )
                }
            })

            return ("loading...")
        }
    };

  render() {
    if(this.props.historyData.length>0){
      return (
        <div styles={{ margin: "auto" }}>
        <Typography
          variant="h4"
          component="h4"
          align="center"
          style={{ color: "orange" }}
        >
          {"Historial"}
        </Typography>
          <Search
            placeholder={"Buscar sesiones pasadas e incidentes"}
            onSearch={this.onSearch}
            searchList={this.props.historyData}
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
    else if(this.props.loading){
     return( <div style={styles.root}>
          <CircularProgress size={100} style={{ marginLeft: "45%" }} />
        </div>);
    }
    else{
      return(<div style={styles.root}>
        <Typography variant="subtitle1" align="center">
          No active sessions to display
        </Typography>
      </div>)
    }
    
  }
}

const mapStateToProps = state => {
  return {
    historyData: state.session.pastSessions,
    loading: state.session.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPastSessions: cant => {
      dispatch(getPastSessions(cant));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryPage);
