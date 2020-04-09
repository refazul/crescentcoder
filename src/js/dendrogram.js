import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// This is https://observablehq.com/@d3/tidy-tree?collection=@d3/d3-hierarchy
// Not https://observablehq.com/@d3/cluster-dendrogram?collection=@d3/d3-hierarchy

const Dendrogram = (props) => {
    const domref = useRef(null);
    const width = 640;
    function tree(data) {
        const root = d3.hierarchy(data);
        root.dx = 10;
        root.dy = width / (root.height + 1);
        return d3.tree()
            .nodeSize([root.dx, root.dy])
            (root);
    }
    useEffect(() => {
        d3.select(domref.current).selectAll('svg').remove();

        const data = props.data;
        const root = tree(data);
        
        let x0 = Infinity;
        let x1 = -x0;
        root.each(d => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        const svg = d3.select(domref.current)
            .append('svg')
            .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2])

        const g = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 5)
            .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`)

        const link = g.append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5)
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x))

        const node = g.append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("transform", d => `translate(${d.y},${d.x})`)

        node.append("circle")
            .attr("fill", d => d.children ? "#555" : "#999")
            .attr("r", 2.5)

        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d.children ? -6 : 6)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.name)
            .clone(true).lower()
            .attr("stroke", "white")
    }, [props.data]);
    return (
        <div ref={domref}></div>
    )
}

export default Dendrogram;