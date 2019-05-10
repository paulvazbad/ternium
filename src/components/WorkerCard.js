import React from 'react';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

var spanStyle = {
    //display: "inline-block",
    //textAlign: "center",
    //maxWidth: 180,
    //minHeight: 20,
    //paddingRight: 25,
    paddingTop: 0,
    paddingBottom: 0,
};

class WorkerCard extends React.Component{

    handleDelete = () => {
        console.log(this.props.index);
        this.props.deleteWorker(this.props.registrationId, this.props.index);
    };

    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={5} align="left">
                        <Typography variant="h5" component="h2" style={spanStyle}>
                            {this.props.nombre}
                        </Typography>
                    </Grid>
                    <Grid item xs={5} align="left">
                        <Typography variant="h5" component="h2" style={spanStyle}>
                            {this.props.registrationId}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} align="left" style={spanStyle}>
                       { /*<IconButton
                            aria-label="Delete"
                            fontSize="large"
                        >
                            <DeleteIcon onClick={this.handleDelete}/>
                        </IconButton
                        >*/}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default (WorkerCard);
