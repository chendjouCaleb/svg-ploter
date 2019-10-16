import * as d3 from "d3";
import { text } from "d3";

let height = 400, width = 500, padding = 20;
export function drawScatter() {
    let data = [];
    let numDataPoints = 50;
    let xRange = Math.random() * 1000;
    let yRange = Math.random() * 1000;
    for (let i = 0; i < numDataPoints; i++) {
            let newNumber1 = Math.floor(Math.random() * xRange);
            let newNumber2 = Math.floor(Math.random() * yRange);
            data.push([newNumber1, newNumber2]);
    }

    let xMax=d3.max(data, d => d[0]);
    let yMax=d3.max(data, d => d[1]);

    let xScale = d3.scaleLinear()
                    .domain([0, xMax])
                    .range([padding, width - padding]);

    let yScale = d3.scaleLinear()
                    .domain([0, yMax])
                    .range([height - padding, padding]);

    let rScale = d3.scaleLinear()
                    .domain([0, yMax])
                    .range([2, 5]);

    let aScale = d3.scaleSqrt()
                    .domain([0, yMax])
                    .range([0, 10]);
                    
    let xAxis = d3.axisBottom(xScale);
    xAxis.ticks(5)
    
    let yAxis = d3.axisLeft(yScale)
        .scale(yScale)
        .ticks(5);
    
    let svg = d3.select("#scatter-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis)
    
    
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        //.attr("transform", "translate(0," + (height - padding) + ")")
        .call(yAxis)

    

    let circles = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d,i) => xScale(d[0]))
    .attr("cy", d => yScale(d[1]))
    .attr("r", d => rScale(d[1]))
    .attr("fill", "#A4262C");

    let texts = svg.selectAll("text")
    texts.data(data)
    .enter()
    .append("text")
    .text(d => `${d[0]}, ${d[1]}`)
    .attr("x", (d,i) => xScale(d[0]))
    .attr("y", d => yScale(d[1]))
    .attr("text-anchor", "middle")
	.attr("font-family", "segoe UI")
	.attr("font-size", "12px")
	.attr("fill", "#797673");
}
