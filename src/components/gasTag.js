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
        display: 'inline-block',
        textAlign: "center",
        margin: 2,
        marginBottom: 0,
    },
    pos: {
        marginBottom: 1,
        fontSize: 20,
    },
};

function SimpleCard(props) {

    const { classes } = props;
    const colors = ["#D8D7D6", "#EB8C78", "#C2B79F", "#FFCE66", "#FF914A", "#FFB46A"]
    const sizes = [3, 6, 3, 2, 3, 3, 4]

    const red = "#BF1F1F"

    var safe = "green"
    var lectura = ""

    if (props.id %7 === 1) {    //ox�geno
        lectura = props.lectura + "%"
        if (props.lectura < 19.5) {
            safe = red
        } else if (props.lectura < 23.5) {
            safe = "green"
        } else {
            safe = red
        }
    } else if (props.id %7 === 2) {    //explosivo
        lectura = props.lectura + "% LEL"
        if (props.lectura < 1) {
            safe = "green"
        } else {
            safe = red
        }
    } else if (props.id %7 === 3) {    //CO
        lectura = props.lectura + " ppm"
        if (props.lectura < 50) {
            safe = "green"
        } else {
            safe = red
        }
    } else if (props.id %7 === 4) {    //Nitro
        lectura = props.lectura + " ppm"
    } else if (props.id%7 === 5) {    //H2S
        lectura = props.lectura + " ppm"
        if (props.lectura < 10) {
            safe = "green"
        } else {
            safe = red
        }
    } else if (props.id%7 === 6) {    //Gas Natural
        lectura = props.lectura + "%"
    } else {
        lectura = "all gases"
    }

    var cardStyle = {
        backgroundColor: colors[(props.id - 1) % 6],
        //border: "3px solid " + safe,
    }

    var text = {
        color: safe,
        fontSize: "200%",
    }

    return (
        <Grid item xs={sizes[props.id - 1]}>
            <Card className={classes.card} style={cardStyle}>
                <CardContent>
                    <Typography className={classes.pos} style={{ color: safe }}>
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

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);