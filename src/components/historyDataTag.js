import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import imagen from "./images/large.jpg";
const styles = {
  card: {
    maxWidth: 160,
    minHeight: 40,
    maxHeight: 80,
    //backgroundColor: "lightsalmon",
    display: "inline-block",
    textAlign: "left",
  },
};

function SimpleCard(props) {
  const { classes } = props;

  if (props.img) {
    if (props.type !== "alert") {
      var s;
      if (props.type === "warning") {
        s = "images/1.jpg";
      } else if (props.type === "bad") {
        s = "images/2.jpg";
      } else {
        s = "images/3.jpg";
      }
      return (
        <Card className={classes.card}>
          <CardContent>
            <img id="iconos" src={imagen} alt=":C" style={{width: "100%"}}/>
          </CardContent>
        </Card>
          
      );
    } else {
      return null;
    }
  }

  if (!props.detected) {
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.upper}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.lower}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (props.type === "alert") {
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="subtitle1" component="h2">
            Alerta:
            <br />
            {props.detected}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="subtitle1" color="textSecondary">
          Gases detectados: {props.detected}
        </Typography>
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
