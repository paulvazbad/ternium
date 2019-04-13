import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import good from "./images/1.svg";
import bad from "./images/2.png";
import warning from "./images/3.png";

var spanStyle = {
    display: "inline-block",
    textAlign: "left",
    maxWidth: 160,
    minHeight: 40,
    maxHeight: 80,
    paddingRight: 30,
    paddingTop: 0,
};

function SimpleCard(props) {
    const { classes } = props;

    if (props.img) {
    if (props.type !== "alert") {
        var s;
        if (props.type === "warning") {
        s = warning;
        } else if (props.type === "bad") {
        s = bad;
        } else {
        s = good;
        }
        return (
            <span>
            <img id="iconos" src={s} alt=":C" style={{ width: "7%"}} />
            </span>
        );
    } else {
        return null;
    }
    }

    if (!props.detected) {
    return (
        <span style={spanStyle}>
            <Typography variant="h5" component="h2">
            {props.upper}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
            {props.lower}
            </Typography>
        </span>
    );
    }

    if (props.type === "alert") {
    return (
        <span style={spanStyle}>
            <Typography variant="subtitle1" component="h2">
            Alerta:
            <br />
            {props.detected}
            </Typography>
        </span>
    );
    }
    return (
        <Typography variant="subtitle1" color="textSecondary" style={spanStyle}>
            Gases detectados: {props.detected}
        </Typography>
    );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (SimpleCard);
