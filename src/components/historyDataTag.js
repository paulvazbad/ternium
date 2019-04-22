import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SVGIcon from "./images/svgicon"

var spanStyle = {
    display: "inline-block",
    textAlign: "left",
    minWidth: 160,
    maxWidth: 160,
    minHeight: 40,
    maxHeight: 80,
    paddingRight: 30,
    paddingTop: 0,
};

function SimpleCard(props) {
    const { classes } = props;

    if (props.img) {
        return (
            <span>
                <SVGIcon id={props.type} />
            </span>
        );
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
