import React from "react";
import { Typography, Paper } from "@material-ui/core/";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = {
  main: {
    textAlign: "center",
    flex: 1
  },
  paper: {
    width: "80%",
    flex: 1,
    margin: "auto",
    marginTop: "2%"
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
  },
};

class userAdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [1, 2, 3, 4]
    };
  }

  renderUsers = () => {
    return this.state.users.map((user,index) => (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography style={styles.heading} variant="title">Usuario {index}</Typography>
          <Typography style={styles.heading} variant="subtitle1">Supervisor de Seguridad</Typography>
          <Typography style={styles.heading} variant="subtitle1">Aceria</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
           Tarjeta de edicion
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));
  };
  render() {
    return (
      <div>
        <div style={styles.main}>
          <Typography variant="h5">User Administration</Typography>
          <Paper style={styles.paper}>{this.renderUsers()}</Paper>
        </div>
      </div>
    );
  }
}

export default userAdminPage;
