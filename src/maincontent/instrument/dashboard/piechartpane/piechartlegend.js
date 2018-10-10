import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'start',
      width:'150px',
      maxHeight:'180px',
      overflowY:' auto'
    },
    item: {
        width:'150px'
    }
})

class PieChartLegend extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {classes, handleArcClick, data, groupBy} = this.props
        if (data !== undefined) {
            return (
                <div className={classes.container}>
                    {data.sort((d1, d2) => {return d1.name < d2.name? -1: 1}).map((d, index) => {
                        return <div className={classes.item} key={index} onClick={e => handleArcClick(groupBy, d.name)}>{d.value + ' ' + d.name}</div>
                    })}
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

PieChartLegend.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PieChartLegend);