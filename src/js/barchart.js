import React, { useEffect } from 'react';
import * as d3 from 'd3';

const Barchart = (props) => {
    const w = 400, h = 250;
    const padding = 4;
    useEffect(() => {
        d3.select('#d3').selectAll('svg').remove();

        const data = props.data;
        let svg = d3.select('#d3')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr("x", (d, i) => i * (w / data.length))
            .attr("y", d => h - d)
            .attr('width', w / data.length - padding)
            .attr('height', d => d)
            .attr('fill', 'green');

        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text((d) => d)
            .attr("x", (d, i) => i * (w / data.length) + (w / data.length - padding) / 2)
            .attr("y", (d) => h - d + 20)
    }, [props.data]);
    return (
        <div id='d3'></div>
    )
}

export default Barchart;