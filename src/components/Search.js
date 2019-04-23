import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "80%",
    margin: "auto",
    marginTop: "2%"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10,
    color: "primary"
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
};

class Search extends React.Component {
  onChange = (e, searchList) => {
    let newList = [];
    if (e.target.value !== "") {
      //checks
      newList = searchList.filter(item => {
        for (var property in item) {
          if (item.hasOwnProperty(property)) {
            let itemData = item[property];
            if (typeof itemData === "string") {
              itemData = itemData.toLowerCase();
              let searchData = e.target.value.toLowerCase();
              if (itemData.includes(searchData)) {
                console.log("found word");
                return true;
              }
            } else if (
              typeof itemData === "number" &&
              parseInt(e.target.value) === itemData
            ) {
              console.log("FOUnd number");
              return true;
            }
          }
        }
        return false;
      });
      this.props.onSearch(newList);
      //then query to backend
    } else {
      this.props.onSearch(searchList);
      //set list to original one
    }
  };

  render() {
    const { searchList, placeholder } = this.props;
    return (
      <Paper style={styles.root} elevation={1}>
        <IconButton style={styles.iconButton} color="primary" aria-label="Menu">
          <AddIcon />
        </IconButton>
        <InputBase
          style={styles.input}
          placeholder={placeholder}
          onChange={event => this.onChange(event, searchList)}
        />
        <IconButton style={styles.iconButton} aria-label="Search">
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
}
Search.propTypes = {
  searchList: PropTypes.array,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string
};
export default Search;
