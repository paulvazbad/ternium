import React from "react";
import ReactDOM from "react-dom";
import {
  Select,
  OutlinedInput,
  MenuItem,
  FormControl,
  InputLabel
} from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import Router from "@material-ui/icons/Router";
import { connect } from "react-redux";
import {
  fetchWorkers,
  setSelectedDevice,
  setSelectedWorker,
  fetchDevices
} from "../redux/actions/user";

class NewSessionForm extends React.Component {
  state = {
    labelWidth: 0,
    requiredWorker: "",
    requiredDevice: "",
    selectedDevice: "",
    selectedWorker: ""
  };

  componentWillMount() {
    if (!this.props.workers) {
      this.props.fetchWorkers();
    }

    this.props.fetchDevices();
  }
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }
  renderMenuItems = renderType => {
    if (renderType === "workers") {
      return this.props.workers.map((worker, index) => (
        <MenuItem key={index} value={worker.id}>
          {worker.name}
        </MenuItem>
      ));
    } else {
      return this.props.devices.map((device, index) => (
        <MenuItem key={index} value={device.id}>
          {device.name}
        </MenuItem>
      ));
    }
  };
  handleChange = name => event => {
    console.log(this.state.selectedWorker);
    console.log(name + event.target.value);
    console.log(event.target.value);
    this.props.setParent({[event.target.name]:event.target.value});
    if (name === "selectedWorker") {
      this.props.setSelectedWorker(event.target.value);
      this.setState({ selectedWorker: event.target.value });
    } else {
      this.props.setSelectedDevice(event.target.value);
      this.setState({ selectedDevice: event.target.value });
    }
    let colorName =
      name === "selectedWorker" ? "requiredWorker" : "requiredDevice";
    if (event.target.value !== "") {
      this.setState({ [colorName]: { color: "#4caf50" } });
    } else {
      this.setState({ [colorName]: { color: "" } });
    }
  };
  render() {
    const { requiredWorker, requiredDevice } = this.state;
    return (
      <form style={{ padding: "2%" }}>
        <div style={{ display: "flex", wrap: "nowrap", paddingBottom: "5%" }}>
          <Person
            style={{ fontSize: "3em", padding: "1%", ...requiredWorker }}
          />
          <FormControl variant="outlined" fullWidth={true}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
              Trabajador
            </InputLabel>

            <Select
              value={this.state.selectedWorker}
              onChange={this.handleChange("selectedWorker")}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="selectedWorker"
                  id="outlined-age-simple"
                />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.workers && this.renderMenuItems("workers")}
            </Select>
          </FormControl>
        </div>

        <div style={{ display: "flex", wrap: "nowrap" }}>
          <Router
            style={{ fontSize: "3em", padding: "1%", ...requiredDevice }}
          />
          <FormControl variant="outlined" fullWidth={true}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="selectedDevice"
            >
              Wearable
            </InputLabel>
            <Select
              value={this.state.selectedDevice}
              onChange={this.handleChange("selectedDevice")}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="selectedDevice"
                  id="selectedDevice"
                />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.devices && this.renderMenuItems("devices")}
            </Select>
          </FormControl>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchWorkers: () => {
      dispatch(fetchWorkers());
    },
    fetchDevices: () => {
      dispatch(fetchDevices());
    },
    setSelectedWorker: id => {
      dispatch(setSelectedWorker(id));
    },
    setSelectedDevice: id => {
      dispatch(setSelectedDevice(id));
    }
  };
};
const mapStateToProps = state => {
  return {
    workers: state.user.workers,
    devices: state.user.devices
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewSessionForm);
