import React from "react";
import { Typography, Paper, Fab } from "@material-ui/core/";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Search from "../components/Search";
import Add from "@material-ui/icons/Add";

import EditUserCard from "../components/EditUserCard";
import userData from "../components/userData";
import NewUserModal from "../components/NewUserModal";

const styles = {
  main: {
    textAlign: "center",
    flex: 1,
    minHeight: 200,
    minWidth: 700,
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
    top: "80%",
    right: "15%",
    bottom: "15%",
    left: "auto",
    position: "fixed"
  }
};

class userAdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: userData,
      modalOpen:false
    };
  }

  addUser = () => {
     
    this.setState({modalOpen:true});
  };

  renderUsers = () => {
    return this.state.userData.map((user,index) => (
      <ExpansionPanel style={{ textAlign: "left" }} key={user.id+index}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography style={styles.heading} variant="h6">
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
          <EditUserCard
            username={user.username}
            area={user.area}
            lugar={user.lugar}
            nombre={user.nombre}
            puesto={user.puesto}
            userpassword={user.userpassword}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));
  };
  onSearch = (filteredList) =>{
    this.setState({userData:filteredList});
  }
  handleClose = () =>{
    this.setState({modalOpen:false});
  }
  render() {
    return (
      <div>
        <div style={styles.main}>
          <NewUserModal open={this.state.modalOpen} handleClose={this.handleClose}/>
          <Typography variant="h5">User Administration</Typography>
          <Search style={styles.search} searchList={userData} onSearch={this.onSearch} placeholder="Buscar usuarios"/>
          <Paper style={styles.paper}>{this.renderUsers()}</Paper>
        </div>
        <Fab style={styles.fab} color="primary" onClick={this.addUser} aria-label="Add">
          <Add />
        </Fab>
      </div>
    );
  }
}

export default userAdminPage;
