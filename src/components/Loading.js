import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Router from "@material-ui/icons/Router";
import Fab from "@material-ui/core/Fab";

const styles = {
  IconProgress: {
    color: "#4caf50",
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  fabProgress: {
    position: "absolute",
    top: "8%",
    left: "10%",
    zIndex: 0,
    width: 85,
    height: 85
  }
};

class Loading extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loaded:false
        }
    }
  render() {
    return (
      <div style={{ position: "relative" }}>
        {this.props.withIcon && (
          <Fab style={styles.fabProgress}>
            <Router style={{ fontSize: "3.5em"}} />
          </Fab>
        )}
        <CircularProgress size={100} styles={styles.IconProgress} />
      </div>
    );
  }
}
export default Loading;
