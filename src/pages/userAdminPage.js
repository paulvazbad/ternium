import React from "react";
import { connect } from "react-redux";
import {getUsers} from "../redux/actions/user";
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
    minWidth: 700
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

const expansionpanel = {
  textAlign: "left",
  width: "100%"
};

class userAdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: userData,
      modalOpen: false
    };
  }

  addUser = () => {
    this.setState({ modalOpen: true });
  };
  componentWillMount(){
    this.props.getUsers()
  }
  renderUsers = () => {
    const { classes } = this.props;
    return this.props.users.map((user, index) => (
      <ExpansionPanel style={expansionpanel} key={user.username + index}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography style={styles.heading} variant="h6">
            {user.name}
          </Typography>
          <Typography style={styles.heading} variant="subtitle1">
            {user.rol}
          </Typography>
          <Typography style={styles.heading} variant="subtitle1">
            {user.area}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <EditUserCard
            username={user.username}
            area={user.area}
            nombre={user.name}
            puesto={
              user.rol === "SA"
                ? "Supervisor de Area"
                : user.rol === "SS"
                ? "Supervisor de Seguridad"
                : "Super Usuario"
            }
            userpassword={""}
            index={index}
            newUserCard={false}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));
  };
  onSearch = filteredList => {
    this.setState({ userData: filteredList });
  };
  handleClose = () => {
    this.setState({ modalOpen: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div style={styles.main}>
          <NewUserModal
            open={this.state.modalOpen}
            handleClose={this.handleClose}
          />
          <Typography variant="h5">User Administration</Typography>
          <Search
            style={styles.search}
            searchList={userData}
            onSearch={this.onSearch}
            placeholder="Buscar usuarios"
          />
          <Paper style={styles.paper}>{this.renderUsers()}</Paper>
        </div>
        <Fab
          style={styles.fab}
          color="primary"
          onClick={this.addUser}
          aria-label="Add"
        >
          <Add />
        </Fab>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  users:state.user.users
});
const mapDispatchToProps = dispatch => {
  return {
    getUsers: ()=>{
      dispatch(getUsers())
    }

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userAdminPage);