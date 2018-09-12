import React, { Component, Fragment } from 'react';
import PieChartContainer from './piechartcontainer'

class DashBoardPieChart extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {handleArcClick, locations, states, types} = this.props

        if (states !== undefined) {
            return (
                <Fragment>
                    <PieChartContainer groupBy={'location'} data={locations} handleArcClick={handleArcClick}/>
                    <PieChartContainer groupBy={'type'} data={types} handleArcClick={handleArcClick}/>
                    <PieChartContainer groupBy={'status'} data={states} handleArcClick={handleArcClick}/>
                </Fragment>
            )
        } else {
            return <div></div>
        }
    }
}

export default DashBoardPieChart