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

class NewSessionForm extends React.Component {
  state = {
    selectedWorker: "",
    selectedDevice: "",
    workers: [
      { id: 0, name: "Eduardo Angulo" },
      { id: 1, name: "Pedro Paramo" }
    ],
    labelWidth: 0,
    requiredWorker: "",
    requiredDevice: ""
  };
  getWorkers = cant => {
    let works = [];

    for (var i = 0; i < cant; i++) {
      let worker = "Worker " + Math.random() * 100;
      works.push({ id: i, name: worker });
    }
    return works;
  };
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      workers: this.getWorkers(6)
    });
  }
  renderMenuItems = () => {
    return this.state.workers.map((worker, index) => (
      <MenuItem key={index} value={worker.id}>
        {worker.name}
      </MenuItem>
    ));
  };
  handleChange = name => event => {
    console.log(this.state.selectedWorker);
    console.log(name + event.target.value);
    console.log(event.target.value);
    this.setState({ [name]: event.target.value });
    let colorName = name==="selectedWorker"? "requiredWorker": "requiredDevice";
    if (event.target.value !== "") {
      console.log("YEET");
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
              {this.renderMenuItems()}
            </Select>
          </FormControl>
        </div>

        <div style={{ display: "flex", wrap: "nowrap" }}>
          <Router style={{ fontSize: "3em", padding: "1%", ...requiredDevice  }} />
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
              {this.renderMenuItems()}
            </Select>
          </FormControl>
        </div>
      </form>
    );
  }
}
export default NewSessionForm;
