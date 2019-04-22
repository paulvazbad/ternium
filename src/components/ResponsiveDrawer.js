import React from 'react';
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Add from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import { NavLink } from 'react-router-dom'
import { NEWSESSION } from '../constants/routes';

class ResponsiveDrawer extends React.Component{ 
      componentWillMount(){
        console.log(this.props.drawer);
      }
      componentWillUpdate(){
        console.log(this.props);
      }
render(){
  const drawerRender = ( <div>
    <div className={this.props.classes.toolbar} />
    <Divider />
    <List>{
        this.props.drawer && this.props.drawer.map((element, index) => (
          <ListItem button component={NavLink} to={element.route} key={element.name}>
            <ListItemIcon>
              {element.icon}
            </ListItemIcon>
            <ListItemText primary={element.name} />
          </ListItem>
        ))
      }            
    </List>
    <Divider />
    <List>
      {this.props.monitoreo && (
        <ListItem button component={NavLink} to={NEWSESSION} key={"Iniciar Monitoreo"}>
          <ListItemIcon>
           <Add/>
          </ListItemIcon>
          <ListItemText primary={"Iniciar Monitoreo"} />
        </ListItem>
      )}
    </List>
  </div>);
    return(
        <nav className={this.props.classes.drawer}>
            <Hidden implementation="css">
              <Drawer
                container={this.props.container}
                variant="temporary"
                open={this.props.mobileOpen}
                onClose={this.props.handleDrawerToggle}
                classes={{
                  paper: this.props.classes.drawerPaper
                }}
              >
               {drawerRender}
              </Drawer>
            
            </Hidden>
            <Hidden mdDown implementation="css">
              <Drawer
                classes={{
                  paper: this.props.classes.drawerPaper
                }}
                variant="permanent"
                open
              >
               {drawerRender} 
              </Drawer>
            
            </Hidden>
          </nav>
    )
}
}

export default ResponsiveDrawer;