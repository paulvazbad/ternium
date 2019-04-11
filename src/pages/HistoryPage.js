import React, { Component } from "react";

import HistoryData from '../components/historyData'
import HistoryCard from '../components/historyCard'

class HistoryPage extends React.Component {
    componentDidMount() {
        //alert("Hey");
    }
    render() {
        const cardData = HistoryData.map(hd => <HistoryCard date={hd.date} btime={hd.begin_time} etime={hd.end_time} area={hd.area} place={hd.place} detected={hd.detected} type={hd.type}/>);
        return (
        <div>
                {cardData}
        </div>
        );
    }
}

export default HistoryPage;