import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import HistoryDataTag from './historyDataTag'

const styles = theme => ({
  card: {
    display: 'flex',
    borderColor:"#787878",
    borderStyle:"solid",
    borderWidth: 1,
    maxHeight: 100,
    maxWidth: "70%",
    padding: 0,
    margin: 20,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
});

function MediaControlCard(props) {
    const { classes, theme } = props;
    const date = <HistoryDataTag upper={props.date} lower={props.btime + "-" + props.etime}/>;
    const place = <HistoryDataTag upper={props.area} lower={props.place}/>; 
    const type = <HistoryDataTag detected={props.detected} type={props.type}/>;
    const img = <HistoryDataTag img="go" type={props.type} />;
    return (
    <Card className={classes.card}>
        <div className={classes.details}>
        <CardContent className={classes.content}>
           <Typography component="h5" variant="h5">
                        {date}
                        {place}
                        {type}
                        {img}
           </Typography>
        </CardContent>
        </div>
    </Card>
    );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);