import D3blackbox from "d3blackbox";
import * as d3 from "d3";

const MyDataviz = D3blackbox(function(anchor, props, state) {
    var data = [{year:2011,value:45},{year:2012,value:48},{year:2013,value:45},{year:2014,value:43}]
    var svg = d3.select(anchor.current),
    margin = 200,
    width = props.width*0.75,
    height = props.height*0.75


var xScale = d3.scaleBand().range([0, width]).padding(0.4),
    yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + 10 + "," + 10 + ")");


var arr = data.map(function(d) { return d.year; });
xScale.domain(arr);
yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

g.append("g")
 .attr("transform", "translate(0," + height + ")")
 .call(d3.axisBottom(xScale));

g.append("g")
 .call(d3.axisLeft(yScale).tickFormat(function(d){
     return "$" + d;
 }).ticks(10));


g.selectAll(".bar")
 .data(data)
 .enter().append("rect")
 .attr("class", "bar")
 .attr("x", function(d) { return xScale(d.year); })
 .attr("y", function(d) { return yScale(d.value); })
 .attr("width", xScale.bandwidth())
 .attr("height", function(d) { return height - yScale(d.value); })
 .attr('fill','green');
});

export default MyDataviz;

