import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import HistoryData from '../components/historyData'
import HistoryCard from '../components/HistoryCard'
import Search from "../components/Search"

const styles = theme => ({
    button: {
        width: "10%",
       margin: "auto",
    },
    input: {
        display: 'none',
    },
});

var buttonStyle1 = {
    width: "20%",
    marginLeft: "30%",
    marginRight: 10,
}

class HistoryPage extends React.Component {
    render() {
        const cardData = HistoryData.map(hd => <HistoryCard date={hd.date} btime={hd.begin_time} etime={hd.end_time} area={hd.area} place={hd.place} detected={hd.detected} type={hd.type}/>);
        return (
            <div styles={{ margin: "auto" }}>
                <Search />
                <br />
                <div>
                <Button variant="contained" color="primary" style={buttonStyle1}>
                        Monitoreo
                </Button>
                    <Button variant="contained" color="primary" style={{ width: "20%" }}>
                        Alertas
                </Button>
                </div>
                <br/>
                {cardData}
            </div>
        );
    }
}

export default HistoryPage;