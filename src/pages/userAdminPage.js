import React from "react";
import { connect } from "react-redux";
import {getUsers, errorNotified} from "../redux/actions/user";
import { Typography, Paper, Fab } from "@material-ui/core/";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Search from "../components/Search";
import Add from "@material-ui/icons/Add";
import EditUserCard from "../components/EditUserCard";
import CircularProgress from "@material-ui/core/CircularProgress";
//import userData from "../components/userData";
import NewUserModal from "../components/NewUserModal";
import { toast } from "react-toastify";
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
      userData: [],
      modalOpen: false,
      isLoading:false
    };
    // Binds our scroll event handler
  }

  addUser = () => {
    this.setState({ modalOpen: true });
  };
  componentWillMount(){
    this.props.getUsers()
  }

  
  componentDidUpdate(){
    if(this.props.error){
      toast.error(this.props.error, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true
      })
      this.props.errorNotified()
    }
  }
  renderUsers = () => {
    const { classes } = this.props;
    if(this.state.userData.length>0){
      return this.state.userData.map((user, index) => (
        <ExpansionPanel style={expansionpanel} key={user.username + index}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={styles.heading} variant="h6">
              {user.name}
            </Typography>
            <Typography style={styles.heading} variant="subtitle1">
              {user.rol === "SA"
                  ? "Supervisor de Area"
                  : user.rol === "SS"
                  ? "Supervisor de Seguridad"
                  : "Super Usuario"}
            </Typography>
            <Typography style={styles.heading} variant="subtitle1">
              {user.area}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <EditUserCard
              username={user.username}
              area={user.area}
              name={user.name}
              rol={
                user.rol
              }
              userpassword={""}
              index={index}
              newUserCard={false}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ));
    }
    else if (this.props.loading) {
      return (
        <div style={styles.root}>
          <CircularProgress size={100} />
        </div>
      );
    } else {
      return (
        <div style={styles.root}>
          <Typography variant="subtitle1" align="center">
            No users to display
          </Typography>
        </div>
      );
    }
    
  };
  onSearch = filteredList => {
    console.log(filteredList);
    this.setState({ userData: filteredList });
  };
  handleClose = () => {
    this.setState({ modalOpen: false });
  };
  render() {
    const { classes } = this.props;
    console.log(this.props.users)
    return (
      <div>
        <div style={styles.main}>
          <NewUserModal
            open={this.state.modalOpen}
            handleClose={this.handleClose}
          />
          <Typography variant="h5">User Administration</Typography>
          {this.props.users.length>0&&<Search
            style={styles.search}
            searchList={this.props.users}
            onSearch={this.onSearch}
            placeholder="Buscar usuarios"
          />}
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
  users:state.user.users,
  error:state.user.error,
  loading:state.user.loading
});
const mapDispatchToProps = dispatch => {
  return {
    getUsers: ()=>{
      dispatch(getUsers())
    },
    errorNotified: () =>{
      dispatch(errorNotified())
    }

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userAdminPage);