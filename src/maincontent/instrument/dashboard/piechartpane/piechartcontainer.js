import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PieChart from './piechart'
import PieChartLegend from './piechartlegend'

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    side:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    label:{
        paddingLeft: '20%',
    }

})

class DashBoardPieChart extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {classes, handleArcClick, groupBy, data} = this.props

        if (data !== undefined) {
            return (
                <div className={classes.root}>
                    <div className={classes.label}>{data.length} {groupBy}(s)</div>
                    <div className={classes.side}>
                        <PieChart groupBy={groupBy} data={data} handleArcClick={handleArcClick}/> 
                        <PieChartLegend data={data} groupBy={groupBy} handleArcClick={handleArcClick}/>            
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

DashBoardPieChart.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DashBoardPieChart);