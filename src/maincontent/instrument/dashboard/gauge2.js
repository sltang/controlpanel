
import React, { PureComponent } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300}, {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
export const COLORS = ['#FFBB28', '#0088FE', '#00C49F', '#FF0000'];//orange (MaintananceDue 6), blue (running 4), green (idle 1), red (error 2), purple (prerun 3), yellow (not ready 5)

export const STATES = { 'NotConnected': '#565656', 'Idle': '#00C49F', 'Error': '#FF0000', 'PreRun': '#800080', 'Running': '#0088FE', 'NotReady': '#FFFF00', 'MaintananceDue': '#FFBB28', 'Sleep': '#A52A2A' }
const GREY_COLORS = ['#565656', '#565656', '#565656', '#565656', '#565656'];


const color = d3.scaleOrdinal().range(['#0088FE', '#00C49F', '#FFBB28', '#FF8042']);

const width = 200;
const height = 100;

const styles = theme => ({
    container: {
        display: 'flex',
        position: 'relative',
        /*width:'172px', */
        /*height:'80px',*/
        justifyContent: 'center'
    },
    label: {
        position: 'absolute', top: '65%', left: '42%', fontSize: '10px',
    },
    total: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute', top: '65%', left: '45%', fontSize: '10px',
        alignItems: 'center'
    }
})


class Gauge2 extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onPieEnter = event => {

    }

    isNoData = (data) => {
        return data.filter(d => d.value > 0).length === 0
    }

    componentDidMount() {

        const { id } = this.props;

        const svg = d3.select('#gauge-'+id).append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width/2 + ',' + height + ')');

        var pieGenerator = d3.pie()
            .startAngle(-0.5 * Math.PI)
            .endAngle(0.5 * Math.PI);

        var data = [10, 40, 30, 20];

        // Create an arc generator with configuration
        var arcGenerator = d3.arc()
            .innerRadius(40)
            .outerRadius(80);

        var arcData = pieGenerator(data);

        // Create a path element and set its d attribute
        svg
            .selectAll('path')
            .data(arcData)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', (d) => { return color(d.index) })
            .attr('stroke', 'white')
    }



    render() {
        const { classes, id } = this.props;
        //console.log(data)
        // let isNoData = this.isNoData(data)
        // let colors = isNoData ? GREY_COLORS : COLORS
        // let mydata = []        
        // if (isNoData) {
        //     this.props.data.forEach(s => mydata.push(s))
        //     mydata.push({value:100, name:'not connected'})
        // } else {
        //     mydata = this.props.data
        // }
        return (
            <div id={'gauge-'+id} className={classes.container}>
                <div className={classes.total}>
                    <div>{7}</div>
                    <div>Total</div>
                </div>
            </div>
        );

    }
}

Gauge2.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Gauge2);