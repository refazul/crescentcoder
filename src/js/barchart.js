import React, { useEffect } from 'react';
import * as d3 from 'd3';

const Barchart = (props) => {
    const w = 400, h = 250;
    const padding = 4;
    useEffect(() => {
        d3.select('#d3').selectAll('svg').remove();

        const data = props.data;
        console.log(data.map(function (d) { return { original: d, normalized: h * (d - Math.min.apply(null, data)) / (Math.max.apply(null, data) - Math.min.apply(null, data)) } }).map(d => d.normalized));
        let svg = d3.select('#d3')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

        svg.selectAll('rect')
            .data(data.map(function (d) { return { original: d, normalized: h * (d - Math.min.apply(null, data)) / (Math.max.apply(null, data) - Math.min.apply(null, data)) } }))
            .enter()
            .append('rect')
            .attr("x", (d, i) => i * (w / data.length))
            .attr("y", d => h - d.normalized)
            .attr('width', w / data.length - padding)
            .attr('height', d => d.normalized)
            .attr('fill', 'green');

        svg.selectAll('text')
            .data(data.map(function (d) { return { original: d, normalized: h * (d - Math.min.apply(null, data)) / (Math.max.apply(null, data) - Math.min.apply(null, data)) } }))
            .enter()
            .append('text')
            .text((d) => d.original)
            .attr("x", (d, i) => i * (w / data.length) + (w / data.length - padding) / 2)
            .attr("y", (d) => h - d.normalized + 20)
    }, [props.data]);
    return (
        <div id='d3'></div>
    )
}

export default Barchart;