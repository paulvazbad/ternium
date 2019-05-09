import React from "react";
import QrReader from "react-qr-reader";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import {
  setSelectedDevice,
  newDevice,
  errorNotified
} from "../redux/actions/user";
import { toast } from "react-toastify";
const QRDetectedStyle = {
  marginBottom: 1,
  fontSize: 20,
  color: "#303742",
  textAlign: "center"
};

class QR extends React.Component {
  state = {
    result: "No result"
  };

  handleScan = data => {
    if (data) {
      console.log(data);
      var patt = /([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})/;
      var result = patt.test(data);

      if (result) {
        if (data !== this.state.result) {
          this.setState({
            result: data
          });
          this.props.newDevice(data);
          console.log("ya");
          this.props.setSelectedDevice(data);
        }
      } else {
        this.setState({
          result: "Not a valid device sticker"
        });
      }
    }
  };
  handleError = err => {
    console.error(err);
  };
  render() {
    if (this.props.error) {
      toast.warn(this.props.error, {
        position: "bottom-right",
        autoClose: 30000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true
      });
      this.props.errorNotified();
    }
    return (
      <div style={{ margin: "auto" }}>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "50%", margin: "auto" }}
        />
        <Typography style={QRDetectedStyle}>{this.state.result}</Typography>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedDevice: id => {
      dispatch(setSelectedDevice(id));
    },
    newDevice: id => {
      dispatch(newDevice(id));
    },
    errorNotified: () => {
      dispatch(errorNotified());
    }
  };
};

const mapStateToProps = state => ({
  error: state.user.error
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QR);
