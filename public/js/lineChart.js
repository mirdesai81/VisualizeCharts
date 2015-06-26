/**
 * Created by Mihir.Desai on 6/18/2015.
 */

d3.custom.LineChart = function module(params) {
    var margin = {
        top : 40,
        bottom : 60,
        left : 60,
        right : 40

    };
    var w = 1140, h = 550;
    var svg;
    var dispatch = d3.dispatch('customHover','customMouseOut');
    var ease = "bounce";
    var duration = 500;
    var delay = 500;
    var initialized = true;

    function exports(_selection) {
        _selection.each(function(_data){
            var dateParser = d3.time.format("%Y/%m/%d").parse;
            var height = h - margin.top - margin.bottom, width = w - margin.left - margin.right;

            var xScale =
                d3.time.scale().domain(d3.extent(_data,function(d){
                    return dateParser(d.periodKey);
                })).range([0,width]);

            var yScale =  d3.scale.linear().domain([0,d3.max(_data,function(d){
                return d.totalAmount;
            })])
                .range([height,0]);

            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(d3.time.days,7)
                .tickFormat(d3.time.format("%m/%d"));
            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(5);

            var line = d3.svg.line()
                .x(function(d){
                   return xScale(dateParser(d.periodKey));
                })
                .y(function(d){
                   return yScale(d.totalAmount);
                }).interpolate("cardinal");

            var area = d3.svg.area()
                .x(function(d){
                    return xScale(dateParser(d.periodKey));
                })
                .y0(height)
                .y1(function(d){
                    return yScale(d.totalAmount);
                }).interpolate("cardinal");

            if(!svg) {
                svg = d3.select(this).append('svg').attr('class','svg').attr('height',h).attr("width",w);
                var container = svg.append("g")
                    .classed("container-group",true);
                container.append("g").classed("x axis",true);
                container.append("g").classed("y axis",true);

                container.append("g").classed("chart-group",true);
            }

            svg.transition().attr({width : w,height : h});
            svg.select('.container-group').attr("transform","translate("+margin.left+","+margin.top+")");

            // X Axis
            svg.select('.x.axis')
                .transition()
                .ease(ease)
                .attr("transform","translate("+ 0 +","+height+")")
                .call(xAxis);


            // Y Axis
            svg.select('.y.axis')
                .transition()
                .duration(duration)
                .ease(ease)
                .delay(delay)
                .attr("transform","translate("+ 0 +","+0+")")
                .call(yAxis);
            //GridLines
          /*  svg.select('.gridline')
                .transition()
                .duration(duration)
                .ease(ease)
                .delay(delay)
                .attr("transform","translate(0,0)")
                .call(yGridLines);*/

            // enter
            //area to shade
            var areaPath = svg.select('.chart-group')
                .selectAll(".area")
                .data([_data]);

            areaPath.enter()
                .append('path')
                .classed('area',true);

            //line path
            var trendLine = svg.select('.chart-group')
                .selectAll(".trendline")
                .data([_data]);

            trendLine.enter()
                .append('path')
                .classed('trendline',true);

            //circle
            var circle = svg.select(".chart-group")
                .selectAll('.point')
                .data(_data);

            circle.enter()
                .append('circle')
                .classed("point",true)
                .attr("r",2)
                .on("mouseover",dispatch.customHover)
                .on("mouseout",dispatch.customMouseOut);

            //line label
            var lineLabel = svg.select(".chart-group")
                .selectAll('.line-label')
                .data(_data);

            lineLabel.enter()
                .append('text')
                .classed('line-label',true);
            //update
            svg.select(".chart-group")
                .selectAll('.area')
                .attr("d",function(d){
                    return area(d);
                });

            svg.select(".chart-group")
                .selectAll('.trendline')
                .attr("d",function(d){
                    return line(d);
                });

            svg.select(".chart-group")
                .selectAll('.point')
                .transition()
                .duration(duration)
                .ease(ease)
                .delay(delay)
                .attr("cx",function(d,i){
                    return xScale(dateParser(d.periodKey));
                })
                .attr("cy",function(d,i){
                    return yScale(d.totalAmount);
                })
                .style("fill",function(d,i){
                    // return linearColorScale(i);
                    // return ordinalColorScale(i);
                    return colors(i);
                });

            svg.select(".chart-group")
                .selectAll('.line-label')
                .transition()
                .duration(duration)
                .ease(ease)
                .delay(delay)
                .attr("x",function(d,i){
                    return  xScale(dateParser(d.periodKey)) ;
                })
                .attr("dx",4)
                .attr("y",function(d,i){
                    return yScale(d.totalAmount);
                })
                .attr("dy",-5)
                .text(function(d,i){
                    return d.totalAmount;
                });

            //exit
            trendLine.exit().remove();
            circle.exit().remove();
            lineLabel.exit().remove();
            areaPath.exit().remove();


            if(initialized) {
                svg.select(".chart-group").append('text')
                    .attr('text-anchor',"middle")
                    .transition()
                    .duration(duration)
                    .ease(ease)
                    .delay(delay)
                    .attr("transform","translate("+(0 - margin.left + 20)+","+height/2+")rotate(-90)")
                    .text("Total Amount");
                svg.select(".chart-group").append('text')
                    .attr('text-anchor',"middle")
                    .transition()
                    .duration(duration)
                    .ease(ease)
                    .delay(delay)
                    .attr("transform","translate("+(width/2)+","+(height + margin.bottom - 10)+")")
                    .text("Period Key");
            }

        });
    }

    exports.width = function(_x) {
        if(!arguments.length) return width;
        width = parseInt(_x);
        return this;
    };

    exports.height = function(_x) {
        if(!arguments.length) return height;
        height = parseInt(_x);
        return this;
    };

    exports.ease = function(_x) {
        if(!arguments.length) return ease;
        ease = parseInt(_x);
        return this;
    };

    exports.initialized = function(_x) {
        if(!arguments.length) return initialized;
        initialized = _x;
        return this;
    };

    d3.rebind(exports, dispatch, "on");

    return exports;
};


var chart = d3.custom.LineChart().on('customHover',function(d,i){
    d3.select(this).style("fill","#000");
}).on('customMouseOut',function(d,i){
    d3.select(this).style("fill",function(){return colors(i)});
});



d3.select('section.content')
    .datum(linedata)
    .call(chart);
