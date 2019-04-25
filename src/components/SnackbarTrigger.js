import React from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
class SnackbarTrigger extends React.Component {
  renderSnackBars = () => {
    return this.props.failedConnections.map((value, index) =>
      toast.error("🦄 Wow so easy!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true
      })
    );
  };
  render() {
    return (
      <div>
        {this.renderSnackBars()}
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    failedConnections: state.session.failedConnections
  };
};
export default connect(
  mapStateToProps,
  null
)(SnackbarTrigger);
