/**
 * Created by Mihir.Desai on 6/16/2015.
 */


d3.custom.VerticalBarChart = function module(params) {
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
             var height = h - margin.top - margin.bottom, width = w - margin.left - margin.right;

            /* var xVerticalBarScale =
                 d3.scale.ordinal().domain(_data.map(function(entry){
                     return entry.itemGroup + " / " + entry.periodKey;
                 })).rangeRoundBands([0,width],0.1);*/
             var xVerticalBarScale =
                 d3.scale.ordinal().domain(_data.map(function(entry){
                     return entry.itemGroup + " / " + entry.periodKey;
                 })).rangeBands([0,width]);

             var yVerticalBarScale =  d3.scale.linear().domain([0,d3.max(_data,function(d){
                 return d.totalAmount;
             })])
                 .range([height,0]);

             var xAxis = d3.svg.axis()
                 .scale(xVerticalBarScale)
                 .orient("bottom");
             var yAxis = d3.svg.axis()
                 .scale(yVerticalBarScale)
                 .orient("left");
             var yGridLines = d3.svg.axis()
                 .scale(yVerticalBarScale)
                 .tickSize(-width,0,0)
                 .tickFormat("")
                 .orient("left");

           /*  var barW = width / _data.length ;*/

             if(!svg) {
                 svg = d3.select(this).append('svg').attr('class','svg').attr('height',h).attr("width",w);
                 var container = svg.append("g")
                     .classed("container-group",true);
                 container.append("g").classed("x axis",true);
                 container.append("g").classed("y axis",true);
                 container.append("g").classed("gridline",true);
                 container.append("g").classed("chart-group",true);
             }

             svg.transition().attr({width : w,height : h});
             svg.select('.container-group').attr("transform","translate("+margin.left+","+margin.top+")");

             // X Axis
             svg.select('.x.axis')
                 .transition()
                 .ease(ease)
                 .attr("transform","translate("+ 0 +","+height+")")
                 .call(xAxis)
                 .selectAll('text')
                 .style('text-anchor','end')
                 .attr("dx",-8)
                 .attr("dy",-4)
                 .attr("transform","translate(0,0) rotate(-45)");

             /*svg.select('x axis')
                 .attr("transform","translate("+ 0 +","+height+")")
                 .call(xAxis)
                 .selectAll('text')
                 .style('text-anchor','end')
                 .attr("dx",-8)
                 .attr("dy",-4)
                 .attr("transform","translate(0,0) rotate(-45)");*/

             // Y Axis
             svg.select('.y.axis')
                 .transition()
                 .duration(duration)
                 .ease(ease)
                 .delay(delay)
                 .attr("transform","translate("+ 0 +","+0+")")
                 .call(yAxis);
             //GridLines
             svg.select('.gridline')
                 .transition()
                 .duration(duration)
                 .ease(ease)
                 .delay(delay)
                 .attr("transform","translate(0,0)")
                 .call(yGridLines);
          /*   var gapSize = xVerticalBarScale.rangeBand()/100 * gap;
             var barW = xVerticalBarScale.rangeBand() - gapSize;*/


             // enter
             var bars = svg.select(".chart-group")
                 .selectAll('.bar')
                 .data(_data);
             var vbarLabel = svg.select(".chart-group")
                 .selectAll('.vbar-label')
                 .data(_data);

             bars.enter()
                 .append('rect')
                 .classed("bar",true)
                 .on("mouseover",dispatch.customHover)
                 .on("mouseout",dispatch.customMouseOut);

             vbarLabel.enter()
                 .append('text')
                 .classed('vbar-label',true);
             //update
             svg.select(".chart-group")
                 .selectAll('.bar')
                 .transition()
                 .duration(duration)
                 .ease(ease)
                 .delay(delay)
                 .attr("x",function(d,i){
                    return xVerticalBarScale(d.itemGroup + " / " + d.periodKey);
                 })
                 .attr("y",function(d,i){
                     return yVerticalBarScale(d.totalAmount);
                 })
                 .attr("width",function(d,i){
                     return xVerticalBarScale.rangeBand();
                     /*return barW;*/
                 })
                 .attr("height",function(d,i){
                     return height - yVerticalBarScale(d.totalAmount);
                 })
                 .style("fill",function(d,i){
                     // return linearColorScale(i);
                     // return ordinalColorScale(i);
                     return colors(i);
                 });

             /*svg.select(".chart-group")
                 .selectAll('.bar')
                 .on("mouseover",dispatch.customHover);*/

             svg.select(".chart-group")
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
                 });

             //exit

             bars.exit().remove();

             vbarLabel.exit().remove();

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


d3.custom.HorizontalBarChart = function module(params) {
    var margin = {
        top : 40,
        bottom : 80,
        left : 140,
        right : 40

    };
    var w = 1140, h = 650;
    var svg;
    var dispatch = d3.dispatch('customHover','customMouseOut');
    var ease = "bounce";
    var initialized = true;
    var delay = 500;
    var duration = 500;

  function exports(_selection) {
     _selection.each(function(_data){

         var height = h - margin.top - margin.bottom, width = w - margin.left - margin.right;
      /*   var xScale = d3.scale.ordinal().domain(_data.map(function(d){return d.totalAmount;})).rangeBands([0,width]);
         var yScale = d3.scale.linear().domain([0,_data.length]).range([height,0]);*/

         var yScale = d3.scale.ordinal().domain(_data.map(function(d){return d.itemGroup + " / " + d.periodKey;})).rangeBands([0,height]);
         var xScale = d3.scale.linear().domain([0,d3.max(data,function(d){return d.totalAmount;})]).range([0,width]);

         var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
         var yAxis = d3.svg.axis().scale(yScale).orient('left');
         var yGridLines = d3.svg.axis()
             .scale(xScale)
             .tickSize(-height,0,0)
             .tickFormat("")
             .orient("bottom");
        if(!svg) {
            svg = d3.select(this).append('svg').attr({width: w , height : h});
            var container = svg.append('g').classed('container-group',true);
            container.append('g').classed('x axis',true);
            container.append('g').classed('y axis',true);
            container.append('g').classed('gridline',true);
            container.append('g').classed('chart-group',true);
            container.append('g').classed('xAxisLegend',true);
            container.append('g').classed('yAxisLegend',true);
        }



         // SVG transition
         svg.transition().attr({width : w,height : h});

         //container group translate
         svg.select('.container-group').attr("transform","translate("+margin.left+","+margin.top+")");

         // X Axis
         svg.select('.x.axis')
             .transition()
             .duration(duration)
             .ease(ease)
             .delay(delay)
             .attr("transform","translate("+ 0 +","+height+")")
             .call(xAxis);

         // Y Axis
         svg.select('.y.axis')
             .transition()
             .duration(duration)
             .ease(ease)
             .delay(delay)
             .attr("transform","translate("+ 0 +","+0+")")
             .call(yAxis)
             .selectAll('text')
             .style('text-anchor','end')
             .attr("dx",-8)
             .attr("dy",-4)
             .attr("transform","translate(0,0) rotate(-45)");

         //GridLines
         svg.select('.gridline')
             .transition()
             .duration(duration)
             .ease(ease)
             .delay(delay)
             .attr("transform","translate("+0+","+height+")")
             .call(yGridLines);

         // enter
         var bars = svg.select(".chart-group")
             .selectAll('.bar')
             .data(_data);

         var barLabel = svg.select(".chart-group")
             .selectAll('.bar-label')
             .data(_data);

         bars.enter()
             .append('rect')
             .classed("bar",true);

         barLabel
             .enter()
             .append('text')
             .classed('bar-label',true);
         //update
         svg.select(".chart-group")
             .selectAll('.bar')
             .transition()
             .duration(duration)
             .ease(ease)
             .delay(delay)
             .attr("x",0)
             .attr("y",function(d,i){
                 return yScale(d.itemGroup + " / " + d.periodKey);
             })
             .attr("width",function(d,i){
                 return xScale(d.totalAmount);
                 /*return barW;*/
             })
             .attr("height",function(d,i){

                 return yScale.rangeBand() - 1;
             })
             .style("fill",function(d,i){
                 // return linearColorScale(i);
                 // return ordinalColorScale(i);
                 return colors(i);
             });

         svg.select(".chart-group")
             .selectAll('.bar')
             .on("mouseover",dispatch.customHover);

         svg.select(".chart-group")
             .selectAll('.bar-label')
             .transition()
             .duration(duration)
             .ease(ease)
             .delay(delay)
             .attr("x",function(d,i){
                 //  return xVerticalBarScale(d.itemGroup + " / " + d.periodKey) + (xVerticalBarScale.rangeBand()/2) ;
                 return xScale(d.totalAmount);
             })
             .attr("dx",0)
             .attr("y",function(d,i){
                 return yScale(d.itemGroup + " / " + d.periodKey);
             })
             .attr("dy",function(d,i){
                 return yScale.rangeBand()/1.5;
             })
             .text(function(d,i){
                 return d.totalAmount;
             });


         //exit
         bars.exit().remove();
         barLabel.exit().remove();


         if(initialized) {
             svg.select(".chart-group").append('text')
                 .attr('text-anchor',"middle")
                 .transition()
                 .duration(duration)
                 .ease(ease)
                 .delay(delay)
                 .attr("transform","translate("+(0 - margin.left + 20)+","+height/2+")rotate(-90)")
                 .text("Item Group / Period Key");
             svg.select(".chart-group").append('text')
                 .attr('text-anchor',"middle")
                 .transition()
                 .duration(duration)
                 .ease(ease)
                 .delay(delay)
                 .attr("transform","translate("+(width/2)+","+(height + margin.bottom - 10)+")")
                 .text("Total Amount");
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







/*var chart = d3.custom.VerticalBarChart().on('customHover',function(d,i){
    d3.select(this).style("fill","#000");
    console.log(d);
}).on('customMouseOut',function(d,i){
    d3.select(this).style("fill",function(){return colors(i)});
});*/



/*
d3.select('section.content')
    .datum(data)
    .call(chart);
*/

/*var controls = d3.select('section.content').append('div').attr('id','controls').classed('container',true);

var sort_btn = controls.append('button').html('Sort data: ascending').attr('state','0').classed('btn btn-primary',true);

sort_btn.on("click",function(){
    var self = d3.select(this);
    var state = +self.attr('state');
    var text = "Sort data: ";

    var ascending = function(a,b) {
      return a.totalAmount - b.totalAmount;
    };

    var descending = function(a,b) {
        return b.totalAmount - a.totalAmount;
    };

    if(state === 0) {
        state = 1;
        text += "descending";
        data.sort(ascending);

    } else {
        state = 0;
        text += "ascending";
        data.sort(descending);

    }
    self.attr('state',state);
    self.html(text);
    chart.initialized(false);
    d3.select('section.content')
        .datum(data)
        .call(chart);

});*/

/*
var hChart = d3.custom.HorizontalBarChart();

d3.select('section.content2').datum(data).call(hChart);*/
