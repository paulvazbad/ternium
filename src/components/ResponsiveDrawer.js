import React from 'react';
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dashboard from "@material-ui/icons/Dashboard";
import History from "@material-ui/icons/History";
import Divider from "@material-ui/core/Divider";

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
          <ListItem button key={element.name}>
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
        <ListItem button key={"Iniciar Monitoreo"}>
          <ListItemIcon>
           <History/>
          </ListItemIcon>
          <ListItemText primary={"Iniciar Monitoreo"} />
        </ListItem>
      )}
    </List>
  </div>);
    return(
        <nav className={this.props.classes.drawer}>
            <Hidden smUp implementation="css">
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
            <Hidden xsDown implementation="css">
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