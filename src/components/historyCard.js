import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'

import historyData from '/historyData'
import HistoryDataTag from '/historyDataTag'

const styles = theme => ({
  card: {
    display: 'flex',
    borderColor:"#787878",
    borderStyle:"solid",
    borderWidth: 1,
    maxHeight: 100,
    padding: 0,
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
  const date = historyData.map(hd => <HistoryDataTag upper={hd.date} lower={hd.begin_time + "-" + hd.end_time}/>);
  const place = historyData.map(hd => <HistoryDataTag upper={hd.area} lower={hd.place}/>); 
  const type = historyData.map(hd => <HistoryDataTag detected={hd.detected} type={hd.type}/>);
  const img = historyData.map(hd => <HistoryDataTag img="go" type={hd.type}/>);

  
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {date[0]}
            {place[0]}
            {type[0]}
            {img[0]}
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
