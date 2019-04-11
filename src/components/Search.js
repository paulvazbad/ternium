import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";

const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width:"80%",
    margin:"auto",
    marginTop: "2%",
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10,
    color:"primary"
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
};

class Search extends React.Component {
  render() {
    return (
      <Paper style={styles.root} elevation={1}>
        <IconButton style={styles.iconButton} color="primary" aria-label="Menu">
          <AddIcon />
        </IconButton>
        <InputBase style={styles.input} placeholder="Buscar usuarios" />
        <IconButton style={styles.iconButton} aria-label="Search">
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
}

export default Search;
