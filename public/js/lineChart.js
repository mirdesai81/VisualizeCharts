/**
 * Created by Mihir.Desai on 6/18/2015.
 */

d3.custom.LineChart = function module(params) {
    var margin = {
        top : 40,
        bottom : 120,
        left : 80,
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

            console.log(dateParser("2015/01/01"));


            var height = h - margin.top - margin.bottom, width = w - margin.left - margin.right;

            /* var xVerticalBarScale =
             d3.scale.ordinal().domain(_data.map(function(entry){
             return entry.itemGroup + " / " + entry.periodKey;
             })).rangeRoundBands([0,width],0.1);*/
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
                });

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
            var trendLine = svg.select('.chart-group')
                .selectAll(".trendline")
                .data([_data]);

            trendLine.enter()
                .append('path')
                .classed('trendline',true);

            var circle = svg.select(".chart-group")
                .selectAll('.point')
                .data(_data);
          /*  var vbarLabel = svg.select(".chart-group")
                .selectAll('.vbar-label')
                .data(_data);
*/



            circle.enter()
                .append('circle')
                .classed("point",true)
                .attr("r",2)
                .on("mouseover",dispatch.customHover)
                .on("mouseout",dispatch.customMouseOut);

           /* vbarLabel.enter()
                .append('text')
                .classed('vbar-label',true);*/
            //update

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

           /* svg.select(".chart-group")
                .selectAll('.vbar-label')
                .transition()
                .duration(duration)
                .ease(ease)
                .delay(delay)
                .attr("x",function(d,i){
                    return xVerticalBarScale(d.itemGroup + " / " + d.periodKey) + (xVerticalBarScale.rangeBand()/2) ;
                })
                .attr("dx",0)
                .attr("y",function(d,i){
                    return yVerticalBarScale(d.totalAmount);
                })
                .attr("dy",20)
                .text(function(d,i){
                    return d.totalAmount;
                });*/

            //exit
            trendLine.exit().remove();
            circle.exit().remove();

           /* vbarLabel.exit().remove();

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
                    .text("Item Group / Period Key");
            }
*/
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
    console.log(d);
}).on('customMouseOut',function(d,i){
    d3.select(this).style("fill",function(){return colors(i)});
});



d3.select('section.content')
    .datum(linedata)
    .call(chart);
