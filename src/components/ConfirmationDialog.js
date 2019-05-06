import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";

class ConfirmationDialog extends React.Component {

    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      

    render(){
        return(
        <Dialog
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{`Seguro que deseas borrar a ${this.props.name}?`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
               {this.props.children}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={() =>{
                this.props.handleClose()
                this.props.handleDelete()
              }} color="primary" autoFocus>
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>)
    }

}
export default ConfirmationDialog