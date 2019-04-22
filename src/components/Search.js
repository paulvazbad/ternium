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
  constructor(props){
    super(props);
  }
  onChange = (e,searchList) => {
    if (e.target.value !== ""){
      //checks
      let newList = [];
     newList =  searchList.filter((item)=>{
        for(var property in item){
          if(item.hasOwnProperty(property)){
            let itemData = item[property].toLowerCase();
            let searchData = e.target.value.toLowerCase();
            if(itemData.includes(searchData)){
              return true;
            }
          }
        }
        return false;
      })
      console.log(newList);
      //then query to backend
    }
    else{
      console.log(searchList);
      //set list to original one
    }
  };

  render() {
    const {searchList} = this.props;
    console.log(searchList);
    return (
      <Paper style={styles.root} elevation={1}>
        <IconButton style={styles.iconButton} color="primary" aria-label="Menu">
          <AddIcon />
        </IconButton>
        <InputBase
          style={styles.input}
          placeholder="Buscar usuarios"
          onChange={(event) => this.onChange(event,searchList)}
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
  onSearch: PropTypes.func
};
export default Search;
