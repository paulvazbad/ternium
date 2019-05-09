import React from "react";
import { getActiveSessions } from "../redux/actions/session";
import { connect } from "react-redux";
class SessionFetcher extends React.Component {
  componentDidMount() {
    this.Interval = setInterval(() => {
      this.props.getActiveSessions(this.props.auth.username);
    }, 1000);
    console.log("Interval set ");
  }
  componentWillMount(){
    console.log("Mounting SessionFetcher")
  }
  componentWillUnmount(){
      clearInterval(this.Interval);
  }
  render() {
    return <div />;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getActiveSessions: username => dispatch(getActiveSessions(username))
  };
};
const mapStateToProps = state => ({
  auth: state.auth,
  currentSessions: state.session.currentSessions
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionFetcher);
