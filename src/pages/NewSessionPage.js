import React from "react";
import {
  Typography,
  Step,
  Stepper,
  StepLabel,
  Button,
  Paper,
  Grid
} from "@material-ui/core";
import { DASHBOARD } from "../constants/routes";
import NewSessionForm from "../components/NewSessionForm";
import Loading from "../components/Loading";
import Grow from "@material-ui/core/Grow";
import { connect } from "react-redux";
import { newSession } from "../redux/actions/session";

class NewSessionPage extends React.Component {
  state = {
    activeStep: 0,
    width: 0,
    orientation: "horizontal",
    selectedDevice: null,
    selectedWorker: null,
    buttonText:"Next",
    notSent:true
  };
  componentWillMount() {
     
    this.updateWindowSize();
    window.addEventListener("resize", this.updateWindowSize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowSize);
  }
  componentDidUpdate(prevProps, prevState) {
     
    var activeStep = this.state.activeStep;
     
     
     
    if (!this.props.loading && activeStep === 1) {
       
      
      this.setState({ activeStep: this.state.activeStep + 1 });
    }
    else if(!this.props.succesful && activeStep===2 && prevState.buttonText!=="Retry"){
       
      this.setState({buttonText:"Retry"});
    }
    
  }
  updateWindowSize = () => {
    this.setState({ width: window.innerWidth });

    if (window.innerWidth < 750) {
      this.setState({ orientation: "vertical" });
    } else {
      this.setState({ orientation: "horizontal" });
    }
  };

  step0 = (
    <Grow in={true}>
      <div>
        <Typography style={{ padding: "2%" }}>
          Introduce la información del wearable y del usuario
        </Typography>
        <NewSessionForm setParent={formObj => this.checkButton(formObj)} />
      </div>
    </Grow>
  );

  step1 = <Loading withIcon={true} redirect={"TBD"} />;

  checkButton = formObj => {
    this.setState({ ...formObj });
     
  };
  getStepContent = step => {
    switch (step) {
      case 0:
        return this.step0;
      case 1:
        
        return this.step1;
      case 2:
        if(this.props.succesful){
          return "Conexion Exitosa!"
        } 
        else{
          return "Conexion Fallida"
        }
        ;
      default:
        return "Unknown step";
    }
  };
  getSteps = () => {
    return [
      "Registra el wearable",
      "Realizando conexión",
      "Resultado de la conexión"
    ];
  };
  handleNext = steps => () => {
     
    if(this.state.activeStep !== 1 && this.state.notSent){
      this.props.newSession(
        this.state.selectedDevice,
        this.state.selectedWorker,
        this.props.username
      );
      this.setState({notSent:false});
    }
    if (this.state.activeStep === steps.length - 1) {
       
       
      //this.setState({activeStep:0});
      if(this.props.succesful){
        this.props.history.push(DASHBOARD);
      }
      else{
        this.setState({ activeStep: 1, buttonText:"Next", notSent:true  });
      }
    }
    else{
      this.setState({ activeStep: this.state.activeStep + 1, buttonText:"Next" });
    }
    
  };

  render() {
    const { activeStep, selectedDevice, selectedWorker } = this.state;
    const steps = this.getSteps();
     
     
    return (
      <Paper style={{ width: "80%", flex: 1, margin: "auto" }}>
        <Stepper activeStep={activeStep} orientation={this.state.orientation}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Grid
          container
          direction="column"
          justify="flex-start"
          spacing={16}
          alignItems="center"
        >
          <Grid item>{this.getStepContent(activeStep)}</Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleNext(steps)}
              disabled={
                activeStep === 0 &&
                (selectedDevice === "" ||
                  selectedWorker === "" ||
                  selectedDevice === null ||
                  selectedWorker === null)
              }
            >
              {this.state.buttonText}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newSession: (deviceID, workerID, username) => {
      dispatch(newSession(deviceID, workerID, username));
    }
  };
};
const mapStateToProps = (state) =>{
  return({
    succesful: state.session.succesful,
    loading: state.session.loading,
    username: state.auth.username
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewSessionPage);
