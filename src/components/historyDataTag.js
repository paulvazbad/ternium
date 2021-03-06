import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SVGIcon from "./images/svgicon"

var spanStyle = {
    display: "inline-block",
    textAlign: "left",
    minWidth: 180,
    //maxWidth: 180,
    minHeight: 40,
    maxHeight: 80,
    paddingRight: 30,
    paddingTop: 0,
};

const gases = [
    {
        name: "Gas Natural",
        prefix: " ppm"
    },
    {
        name: "CO2",
        prefix: " ppm"
    },
    {
        name: "Explosivo (H)",
        prefix: " ppm"
    },
    {
        name: "Temperatura",
        prefix: " C"
    }
];

function SimpleCard(upper, lower) {
    return (
        <span style={spanStyle}>
            <Typography variant="h5" component="h2">
                {upper}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {lower}
            </Typography>
        </span>
    );
}

function ComplexCard(upper, min, prom, max) {
    return (
        <span style={spanStyle}>
            <Typography variant="h5" component="h2">
                {upper}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                Min: {min}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                Prom: {prom}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                Max: {max}
            </Typography>
        </span>
    );
}

class HistoryDataTag extends React.Component {

    render() {
        //////////////////////////////////////Despliegue de SS de gases en alerta
        if (this.props.data) {
            return this.props.data.map((cardData, key) => {
                return SimpleCard(gases[key].name, cardData.toFixed(3) + gases[key].prefix)
            }) 
        }

        //////////////////////////////////////Despliegue de min/med/max de gases en alerta
        if (this.props.gasData) {
            console.log(this.props.gasData)

            return this.props.gasData.map((cardData, key) => {
                //return SimpleCard(gases[key].name, cardData.Min + "-" + cardData.Prom + "-" + cardData.Max + gases[key].prefix)
                return ComplexCard(gases[key].name, cardData.Min.toFixed(3) + gases[key].prefix, cardData.Prom.toFixed(3) + gases[key].prefix, cardData.Max.toFixed(3) + gases[key].prefix)
                })       
        }

        //////////////////////////////////////Datos varios
        if (this.props.upper) {
            return SimpleCard(this.props.upper, this.props.lower)
        }

        //////////////////////////////////////Despliegue de type
        if (this.props.type) {
            var lower = "Nivel de "
            if (this.props.type === "Metrica") {

                lower += gases[this.props.gas] 
            } else if (this.props.type === "Caida") {
                lower = "deteccion de caida/desbalance de usuario"
            } else {
                lower = "boton de panico"
            }
            return (
                <span style={spanStyle}>
                    <Typography variant="subtitle1" color="textSecondary">
                        Alerta generada por:
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {lower}
                    </Typography>
                </span>
                );
        }

        return null
    }
}

export default (HistoryDataTag);