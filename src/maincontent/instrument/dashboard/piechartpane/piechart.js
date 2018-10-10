import React, { PureComponent } from 'react';
import * as d3 from 'd3';

const width = 200,                        
height= 200,                            
radius = 100;

export const STATES = {'Error':'#FF0000', 'Idle':'#00C49F', 'MaintananceDue':'#FFBB28', 'Not Connected':'#565656', 'NotReady':'#FFFF00', 'PreRun':'#800080', 'Running':'#0088FE', 'Sleep':'#A52A2A'}

const color = d3.scaleOrdinal().range(['#0088FE', '#00C49F', '#FFBB28', '#FF8042']);    //builtin range of colors

class PieChart extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const {groupBy, data, handleArcClick}= this.props
        this.renderChart(groupBy, data, handleArcClick)
    }

    componentDidUpdate() {        
        const {groupBy, data, handleArcClick}= this.props
        d3.select('#pie-'+groupBy).select('svg').remove();
        this.renderChart(groupBy, data, handleArcClick)
    }
    
    renderChart(groupBy, data, handleArcClick) {        

        const arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        const labelArc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        const pie = d3.pie()
            .sort(null)
            .value((d) => { return d.value });

        const svg = d3.select('#pie-'+groupBy).append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');

        const g = svg.selectAll('.arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc')
            .on("click", (d) => clicked(groupBy, ''))

        const g2 = svg.selectAll('.arc2')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc');
                
        
        g.append('path')
            .attr('d', arc)
            .style('fill', (d) => { 
                if (groupBy === 'status') {
                    return STATES[d.data.name]
                } else {
                    return color(d.data.name)
                }})
            .attr('stroke', 'white')
        
        g2.append('text')
            .attr("text-anchor", "middle")
            .attr('transform', (d) => { return 'translate(' + labelArc.centroid(d) + ')' })
            .attr('dy', 0)
            .attr('y', 0)
            .text((d) => {
                return d.data.name +'\n' + d.data.value;
            })
            .style("fill", "#383838")
            .style("font-size", "11px")
            .style('cursor', 'pointer')
            .call(wrap, 75)
            .on("click", (d) => clicked(groupBy, d.data.name))

        function clicked(groupBy, name) {
            if (handleArcClick !== undefined) {
                handleArcClick(groupBy, name)
            }
        }

        function wrap(text, width) {
            text.each(function() {
                let text = d3.select(this)
                let parts = text.text().split(/\n/)
                let words = parts[0].split(/\s+/).reverse()
                let word = words.pop()
                let line = []
                let lineNumber = 0
                let lineHeight = 0.9//1.1, // ems
                let y = text.attr("y")
                let dy = parseFloat(text.attr("dy"))
                let tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
                while (word !== undefined) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    }
                    word = words.pop()
                }
                text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(parts[1]);
            });
        }
    }

    render() {
        const {groupBy}= this.props
        return (
            <div id={'pie-'+groupBy}></div>
        )
    }
}

export default PieChart