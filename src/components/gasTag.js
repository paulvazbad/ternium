import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
    const colors = ["#D8D7D6", "#F25F24", "#4F4C4C", "#FF994E", "#EB8C78", "#FFB46A"]
    const textColors = ["#4F4C4C", "white", "white", "white", "white", "white"]

    var cardStyle = {
        backgroundColor: colors[(props.id - 1) % 6],
    }

    var text = {
        color: textColors[(props.id - 1) % 6],
    }

    return (
        <Card className={classes.card} style={cardStyle}>
            <CardContent>
                <Typography className={classes.pos} style={text}>
            {props.name}
        </Typography>
                <Typography variant="h4" component="h2" style={text}>
            {props.lectura}
        </Typography>
            </CardContent>
        </Card>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);