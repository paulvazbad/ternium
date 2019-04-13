import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import { logOut } from "../redux/actions/auth";
import { connect } from "react-redux";

class Timeout extends React.Component {
  constructor(props) {
    super(props);
    const initDate = new Date();
    this.maxTime = this.props.time * 60 * 1000;
    this.state = {
      time: initDate,
      maxTimeOut: this.maxTime,
      open: false,
      timeLeft: 60 || this.props.timeAlert
    };
  }

  Transition = props => {
    return <Slide direction="up" {...props} />;
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.updateActive);
    console.log(this.props);
    console.log(this.state.initDate);
    this.setState({
      interval: setInterval(this.checkTime, this.maxTime / 2)
    });
    console.log("MOunted timeout");
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    clearInterval(this.state.timeLeftInterval);
    document.removeEventListener("mousedown", this.updateActive);
  }

  checkTime = () => {
    const currenD = new Date();
    const difference = currenD.getTime() - this.state.time.getTime();
    console.log(this.state.time);
    console.log(currenD);
    console.log("Difference" + difference);
    console.log("maxTimeOut" + this.state.maxTimeOut);
    if (difference >= this.state.maxTimeOut) {
      clearInterval(this.state.interval);
      console.log("Open Dialog");
      this.setState({
        open: true,
        timeLeftInterval: setInterval(this.checkExit, 1000)
      });
    }
  };
  updateActive = () => {
    this.setState({
      time: new Date()
    });
  };

  checkExit = () => {
    console.log(this.state.timeLeft);
    if (this.state.timeLeft <= 0) {
      console.log("exit");
      this.handleClose();
      this.props.logOut();
    } else {
      this.setState({ timeLeft: this.state.timeLeft - 1 });
    }
  };

  handleClose = () => {
    clearInterval(this.state.timeLeftInterval);
    this.setState({
      time: new Date(),
      open: false,
      timeLeft: 60,
      interval: setInterval(this.checkTime, this.maxTime / 2)
    });
  };

  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={this.Transition}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Hey, ¿Sigues ahí?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tiempo Restante: {this.state.timeLeft} segundos
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Si
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Timeout);
