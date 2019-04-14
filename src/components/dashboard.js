import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import GasInfo from './gasInfo'
import GasTag from './gasTag'

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
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

function Dashboard(props) {
    const { classes } = props;
    const gasComponent = GasInfo.map(gas => <GasTag id={gas.id} name={gas.name} lectura={gas.lectura} />);

    return (
        <div className={classes.root}>
            <Grid container spacing={8}>
                <Grid item xs={3}>
                    {gasComponent[0]}
                </Grid>
                <Grid item xs={6}>
                    {gasComponent[1]}
                </Grid>
                <Grid item xs={3}>
                    {gasComponent[2]}
                </Grid>
                <Grid item xs={3}>
                    {gasComponent[3]}
                </Grid>
                <Grid item xs={2}>
                    {gasComponent[4]}
                </Grid>
                <Grid item xs={3}>
                    {gasComponent[5]}
                </Grid>
                <Grid item xs={4}>
                    {gasComponent[6]}
                </Grid>
            </Grid>
        </div>
    );
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);