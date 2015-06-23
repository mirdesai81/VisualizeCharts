/**
 * Created by Mihir.Desai on 6/16/2015.
 */
var drawScatterChart = function(params) {
    var $data = params.data;
    var xHorizontalBarScale =
        d3.scale.linear().domain([0,d3.max($data,function(d){
            return d.totalAmount;
        })])
            .range([0,width]);

    var yHorizontalBarScale = d3.scale.ordinal().domain($data.map(function(entry){
        return entry.itemGroup + " / " + entry.periodKey;
    })).rangeBands([0,height]);


    var xAxis = d3.svg.axis()
        .scale(xHorizontalBarScale)
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(yHorizontalBarScale)
        .orient("left");

    this.selectAll('.circle')
        .data($data)
        .enter()
        .append('circle')
        .classed("circle",true)
        .attr("cy",function(d,i){
            return yHorizontalBarScale(d.itemGroup + " / " + d.periodKey) + yHorizontalBarScale.rangeBand()/1.5 - 10;
        })
        .attr("cx",function(d,i){
            return xHorizontalBarScale(d.totalAmount);
        })
        .attr("r",function(d,i){
            return 5;
        })
        .style("fill",function(d,i){
            // return linearColorScale(i);
            // return ordinalColorScale(i);
            return colors(i);
        });

    this.selectAll('.circle-label')
        .data($data)
        .enter()
        .append('text')
        .classed('circle-label',true)
        .attr("x",function(d,i){
            return xHorizontalBarScale(d.totalAmount);
        })
        .attr("dx",0)
        .attr("y",function(d,i){
            return yHorizontalBarScale(d.itemGroup + " / " + d.periodKey);
        })
        .attr("dy",function(d,i){
            return yHorizontalBarScale.rangeBand()/1.5 - 15 ;
        })
        .text(function(d,i){
            return d.totalAmount;
        });
    // X Axis
    this.append("g")
        .classed("x axis",true)
        .attr("transform","translate("+ 0 +","+height+")")
        .call(xAxis);

    // Y Axis
    this.append("g")
        .classed("y axis",true)
        .attr("transform","translate("+ 0 +","+0+")")
        .call(yAxis);

};

