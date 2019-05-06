import React from "react";
import QrReader from "react-qr-reader";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { setSelectedDevice } from "../redux/actions/user";
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
      console.log(data)
      var patt = /([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})/;
      var result = patt.test(data);
      if (result) {
        this.setState({
          result: data
        });
        this.props.setSelectedDevice(data);
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
    return (
      <div style={{ margin: "auto" }}>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
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
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(QR);
