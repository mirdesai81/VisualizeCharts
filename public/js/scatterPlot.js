/**
 * Created by Mihir.Desai on 6/16/2015.
 */
d3.custom.ScatterPlot = function module(params) {
    var w = 1140, h = 650;
    var svg;
   /* var dispatch = d3.dispatch('customMouseOver','customMouseOut');*/
    var ease = "bounce";
    var initialized = true;
    var delay = 500;
    var duration = 500;
    var margin = {
        top  : 120,
        right  : 40,
        bottom  : 80,
        left  : 100
    };

    var exports = function(_selection) {
        _selection.each(function(_data) {
            var width = w - margin.left - margin.right;
            var height = h - margin.top - margin.bottom;
            var xScale =  d3.scale.linear()
                .domain(d3.extent(_data,function(d){return d.age;}))
                .range([0,width]);

            var yScale = d3.scale.linear()
                .domain([1,5])
                .range([height,0]);
            var tickValues = [18,25,32,39,46,53,60,67,74];
            var xAxis = d3.svg.axis()
                .scale(xScale)
                .tickValues(tickValues)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .ticks(5)
                .tickFormat(function(d){
                    return d.toFixed(1);
                })
                .tickSize(20)
                .orient("left");
            var gridLines = d3.svg.axis()
                .scale(yScale)
                .tickSize(-width,0,0)
                .tickFormat("")
                .orient("left");
            var xGridLines = d3.svg.axis()
                .scale(xScale)
                .tickSize(-height,height)
                .tickFormat("")
                .tickValues(tickValues)
                .orient("bottom");

            var responseScale = d3.scale.linear()
                .domain(d3.extent(_data,function(d){
                   return d.responses;
                }))
                .range([4,15]);
            // create gridline group before axis group for axis visibility above gridline
            if(!svg) {
                svg = d3.select(this).append('svg').classed('svg',true).attr({width: w , height : h});
                var container = svg.append('g').classed('container-group',true);

                container.append('g').classed('x gridline',true);
                container.append('g').classed('y gridline',true);
                container.append('g').classed('x axis',true);
                container.append('g').classed('y axis',true);
                container.append('g').classed('chart-group',true);
                svg.append('g').classed('xAxisLegend',true);
                svg.append('g').classed('yAxisLegend',true);
                svg.append('g').classed('chart-header',true);
            }

            svg.transition().attr({width:w,height:h});

            svg.select('.container-group')
                .attr("transform","translate("+margin.left+","+margin.top+")");
            svg.select(".y.gridline")
                .transition()
                .duration(duration)
                .ease(ease)
                .delay(delay)
                .attr("transform","translate(0,0)")
                .call(gridLines);
            svg.select(".x.gridline")
                .transition()
                .duration(duration)
                .ease(ease)
                .delay(delay)
                .attr("transform","translate(0,"+height+")")
                .call(xGridLines);

            svg.select('.x.axis')
                .transition()
                .duration(duration)
                .ease(ease)
                .delay(delay)
                .attr("transform","translate("+0+","+height+")")
                .call(xAxis);

            svg.select('.y.axis')
                .transition()
                .duration(duration)
                .ease(ease)
                .delay(delay)
                .attr("transform","translate(0,0)")
                .call(yAxis);

             svg.select('.yAxisLegend')
                 .append('text')
                 .attr("transform","translate("+(margin.left-60)+","+(height/2 + margin.top)+") rotate(-90)")
                 .classed('yaxis-label',true)
                 .text("Rating (1=Low,5=High)");

            svg.select('.xAxisLegend')
                .append('text')
                .attr("transform","translate("+(margin.left+width/2)+","+(height+margin.top+60)+")")
                .classed('yaxis-label',true)
                .text("Age");

            svg.select(".chart-header").append("text")
                .attr("transform","translate("+(margin.left+width/2)+","+(margin.top-60)+")")
                .classed("chart-header-label",true);
            /*svg.select()*/
            var donuts = d3.keys(_data[0]).filter(function(d){
                return d !== 'age' && d !== 'responses';
            });

            // enter for <g>
            svg.select(".chart-group").
                selectAll('.donut')
                .data(donuts)
                .enter()
                .append('g')
                .attr("class",function(d){
                    return d;
                })
                .classed("donut",true);

            //update for <g>
            svg.select(".chart-group")
                .selectAll('.donut')
                .style("fill",function(d,i){
                    return colors(i);
                })
                .on("mouseover", function(d,i){d3.select(this).transition().style("opacity",1);})
                .on("mouseout",function(d,i){d3.select(this).transition().style("opacity",0.2);});

            donuts.forEach(function(donut,i){
               var g = svg.select(".chart-group").selectAll("g."+donut);
               var arr = _data.map(function(d){
                  return {
                     key : donut,
                     value : d[donut],
                     age : d.age,
                     responses : d.responses
                  };
               });

                 //enter
                 var point = g.selectAll('.responses').data(arr);

                 point.enter().append('circle').classed("responses",true);
                 //update
                 g.selectAll('.responses')
                 .transition()
                 .duration(duration)
                 .ease(ease)
                 .delay(delay)
                 .attr('r',function(d){
                 return responseScale(d.responses);
                 })
                 .attr("cx",function(d,i){
                 return xScale(d.age);
                 })
                 .attr("cy",function(d,i){
                    return yScale(d.value);
                 });

                g.selectAll('.responses')
                 .on("mouseover", function(d,i){d3.select('.chart-header-label').text("Donut : "+ d.key+" ,Rating : "+ d.value+" ,Age : "+ d.age+" ,Responses : "+ d.responses)})
                 .on("mouseout",function(d,i){d3.select('.chart-header-label').text("")});
                 //exit
                 point.exit().remove();
            });


        });
    };

    exports.width = function(_x) {
        if(!arguments.length) return w;
        w = parseInt(_x);
        return this;
    };

    exports.height = function(_x) {
        if(!arguments.length) return h;
        h = parseInt(_x);
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

   /* d3.rebind(exports, dispatch, "on");*/
    return exports;
};

var chart = d3.custom.ScatterPlot();



d3.select('section.content')
    .datum(scatterplotdata)
    .call(chart);

