import React from "react";
import ReactDOM from "react-dom";
import {
  Select,
  OutlinedInput,
  MenuItem,
  FormControl,
  InputLabel
} from "@material-ui/core";

class NewSessionForm extends React.Component {
  state = {
    selectedWorker: 0,
    workers: [
      { id: 0, name: "Eduardo Angulo" },
      { id: 1, name: "Pedro Paramo" },

    ],
    labelWidth:0
  };
  getWorkers = (cant) =>{
    let works = [];
    
    for(var i=0;i<cant;i++){
        let worker = "Worker "+(Math.random()*100);
        works.push({id:i,name:worker});
    }
    return works;
  }
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      workers: this.getWorkers(6)
    });
  }
  renderMenuItems = () => {
    return this.state.workers.map((worker, index) => (
      <MenuItem key={index} value={worker.id} >
        {worker.name}
      </MenuItem>
    ));
  };
  handleChange = name => event => {
      console.log(name + event.target.value);
    this.setState({ [name]: event.target.value });
  };
  render() {
    return (
      <form style={{ display: "flex", wrap: "nowrap"}}>
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
      </form>
    );
  }
}
export default NewSessionForm;
