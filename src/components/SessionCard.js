import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import GasTag from './GasTag'

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "white",
        width: "80%",
        margin: "auto",
        padding: 10,
        borderRadius: 15,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 1,
        fontSize: 20,
    },
});

function Dashboard(props) {
    const { classes } = props;


    const gasComponent = props.gasInfo.map(gas => <GasTag id={gas.id} name={gas.name} lectura={gas.lectura} />)


    return (
        <div className={classes.root}>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h2" style={{ color: "black" }}>
                        {props.employee}
                    </Typography>
                </Grid>
                {gasComponent}
            </Grid>
        </div>
    );
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);