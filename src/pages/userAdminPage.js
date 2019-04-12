import React from "react";
import { Typography, Paper, Fab } from "@material-ui/core/";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Search from "../components/Search";
import Add from "@material-ui/icons/Add";
const styles = {
  main: {
    textAlign: "center",
    flex: 1,
    minHeight: 200
  },
  paper: {
    width: "80%",
    flex: 1,
    margin: "auto",
    marginTop: "2%"
  },
  search: {},
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0
  },
  fab: {
    margin: 0,
    top: "auto",
    right: "10%",
    bottom: "15%",
    left: "auto",
    position: "fixed"
  }
};

class userAdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  }

  addUser = () => {
    console.log("add user");
  };

  renderUsers = () => {
    return this.state.users.map((user, index) => (
      <ExpansionPanel key={index}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography style={styles.heading} variant="title">
            Usuario {index}
          </Typography>
          <Typography style={styles.heading} variant="subtitle1">
            Supervisor de Seguridad
          </Typography>
          <Typography style={styles.heading} variant="subtitle1">
            Aceria
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>Tarjeta de edicion</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));
  };
  render() {
    return (
      <div>
        <div style={styles.main}>
          <Typography variant="h5">User Administration</Typography>
          <Search style={styles.search} />
          <Paper style={styles.paper}>{this.renderUsers()}</Paper>
        </div>
        <Fab style={styles.fab} color="primary" onClick={this.AddUser}>
          <Add />
        </Fab>
      </div>
    );
  }
}

export default userAdminPage;
