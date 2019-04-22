import React from "react";
import { Typography, Paper, Fab } from "@material-ui/core/";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Search from "../components/Search";
import Add from "@material-ui/icons/Add";

import EditUserCard from "../components/EditUserCard"
import userData from "../components/userData"

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
    top: "0%",
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
        return (userData.map(user=>
            <ExpansionPanel style={{textAlign: "left"}}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={styles.heading} variant="title">
                        {user.nombre}
          </Typography>
                    <Typography style={styles.heading} variant="subtitle1">
                        {user.puesto}
          </Typography>
                    <Typography style={styles.heading} variant="subtitle1">
                        {user.area}
          </Typography>
        </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <EditUserCard id={user.id} area={user.area} lugar={user.lugar} nombre={user.nombre} puesto={user.puesto} />
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
