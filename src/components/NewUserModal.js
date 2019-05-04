import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditUserCard from "./EditUserCard";
class NewUserModal extends React.Component {
  constructor(props) {
    super(props);
  }
  exit = () =>{
       
      this.props.handleClose();

  }
  render() {
     
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Crear nuevo usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Llena todos los campos con la información del nuevo usuario.
          </DialogContentText>
          <EditUserCard
          username={""}
          area={""}
          name={""}
          rol={
            ""
          }
          userpassword={""}
          index={0}
          newUserCard={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.exit} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

NewUserModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };
export default NewUserModal;
