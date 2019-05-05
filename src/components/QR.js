import React, { Component } from "react";
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
      this.setState({
        result: data
      });
      this.props.setSelectedDevice(data)
    }
  };
  handleError = err => {
    console.error(err);
  };
  render() {
    const { classes } = this.props;
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
