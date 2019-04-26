import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {
    card: {
        width: "100%",
        display: 'flex',
        alignItems: "center",
        justifyContent:"center",
        margin: 2,
        marginBottom: 0,
        height:"100%"
    },
    pos: {
        marginBottom: 1,
        fontSize: 20,
    },
};

function GasTag(props) {

    const { classes } = props;
    const sizes = [6, 3, 3, 3, 3, 6]
    const limits = [1, 50, 5, 20]
    const suffix = ["% LEL", " ppm", "%", "%", "", ""]

    var safe = "#5DAE55"
    const red = "#DC4545"
    const yellow = "#FFB200"
    var lectura = props.lectura + suffix[props.id]

    if (props.lectura >= limits[props.id % 4]) {
        if (props.lectura <= limits[props.id % 4]*(1.1)) {safe = yellow}
        else {safe = red}
    }

    var cardStyle = {
        backgroundColor: safe,
        //border: "3px solid " + safe,
    }

    

    var text = {
        color: "white",
        fontSize: "200%",
    }

    return (
        <Grid item xs={sizes[props.id]%7}>
            <Card className={classes.card} style={cardStyle}>
                <CardContent>
                    <Typography className={classes.pos} style={{color: "white"}}>
                        {props.name}
                    </Typography>
                    <Typography variant="h4" component="h2" style={text}>
                        {lectura}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default withStyles(styles)(GasTag);