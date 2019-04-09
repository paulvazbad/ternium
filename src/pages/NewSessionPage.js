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

class NewSessionPage extends React.Component {
  state = {
    activeStep: 0,
    width: 0,
    orientation: "horizontal"
  };
  componentWillMount() {
    this.updateWindowSize();
    window.addEventListener("resize", this.updateWindowSize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowSize);
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
        <NewSessionForm />
      </div>
    </Grow>
  );

  step1 = <Loading withIcon={true} redirect={"TBD"} />;
  getStepContent = step => {
    switch (step) {
      case 0:
        return this.step0;
      case 1:
        return this.step1;
      case 2:
        return "Conexión exitosa!";
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
    console.log(this.state.activeStep);
    if (this.state.activeStep === steps.length - 1) {
      console.log(steps.length);
      console.log(this.state.activeStep);
      //this.setState({activeStep:0});
      this.props.history.push(DASHBOARD);
    }
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  render() {
    const { activeStep } = this.state;
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
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
              {activeStep !==1}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default NewSessionPage;
