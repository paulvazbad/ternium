import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import HistoryDataTag from './HistoryDataTag'

const styles = theme => ({
    card: {
        display: 'flex',
        borderColor:"#787878",
        borderStyle:"solid",
        borderWidth: 1,
        minWidth: "60%",
        maxWidth: "80%",
        padding: 0,
        paddingTop: 0,
        margin: "auto",
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        display: 'inline-block',
        paddingTop: 15,
    },
});

function HistoryCard(props) {
    //console.log(props.gases);
    const { classes } = props;

    var backgroudColorCard = {
        backgroundColor: (props.type) ? "#EE836C" : "white"
    }

    var infoInCard;
    var gasCards;

    if (props.type) {                               //////////////////Alertas
        const limits = [1000, 1000, 100, 40]
        var gasOOR = -1;
        if (props.type === "Metrica") {
            gasOOR = (props.data.GasNatural >= limits[0]) ? 0 : (props.data.CO >= limits[1]) ? 1 : (props.data.Hidrogeno >= limits[2]) ? 2 : 3
        }

        const date = <HistoryDataTag upper={props.date.substring(0, 10)} lower={props.date.substring(11, 16)} />;
        const worker = <HistoryDataTag upper={props.staff.name} lower={props.staff.registrationId} />;
        const place = <HistoryDataTag upper={"latitud: " + props.place.latitud} lower={"longitud: " + props.place.longitud} />;
        const gasData = <HistoryDataTag data={[props.data.GasNatural, props.data.CO, props.data.Hidrogeno, props.data.Temperatura]} />
        const type = <HistoryDataTag type={props.type} gas={gasOOR} />

        infoInCard = { date, worker, place, type }
        gasCards = gasData

    } else {                                           ///////////////Historial
        const date = <HistoryDataTag upper={props.idate.substring(0, 10)} lower={props.idate.substring(11, 16) + "-" + props.edate.substring(11, 16)} />;
        const worker = <HistoryDataTag upper={props.staff.name} lower={props.staff.registrationId} />;
        const place = <HistoryDataTag upper={"latitud:" + props.place.latitud} lower={"longitud:" + props.place.longitud} />;
        const gasData = <HistoryDataTag gasData={[props.gases.GasNatural, props.gases.CO, props.gases.Hidrogeno, props.gases.Temperatura]} />

        infoInCard = [date, worker, place]
        gasCards = gasData
    }


    return (
        <div>
            <Card className={classes.card} style={backgroudColorCard}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                            {infoInCard}
                            <br />
                            {gasCards}
                    </CardContent>
                </div>
            </Card>
            <br />
        </div>
    );
}

HistoryCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(HistoryCard);