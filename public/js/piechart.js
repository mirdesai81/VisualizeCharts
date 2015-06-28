/**
 * Created by Mihir.Desai on 6/26/2015.
 */
/**
 * Created by Mihir.Desai on 6/18/2015.
 */

d3.custom.PieChart = function module(params) {
  /*  var margin = {
        top : 40,
        bottom : 60,
        left : 60,
        right : 40

    };*/
    var w = 1140, h = 550;
    var svg;
    var dispatch = d3.dispatch('customHover','customMouseOut');
    var ease = "linear";
    var duration = 500;
    var delay = 500;
    var initialized = true;
    var innerRadius = 0;

    function exports(_selection) {
        _selection.each(function(_data){


            var radius = 130;
            var margin = 10;
            innerRadius = radius/2;
           /* var height = h - margin.top - margin.bottom, width = w - margin.left - margin.right;
*/
            var height = (radius + margin) * 2, width = (radius + margin) * 2;
            var donutTypes = d3.keys(_data[0]).filter(function(d){
                return d != 'age' && d != 'responses';
            });

            console.log(donutTypes);

            // Define a pie layout: the pie angle encodes the responses.
            var pie = d3.layout.pie()
                .value(function(d) { console.log(d); return d.value; })
                .sort(function(a, b) { return b.value - a.value; });

            // Define an arc generator. Note the radius is specified here, not the layout.
            var arc = d3.svg.arc()
                .innerRadius(radius / 2)
                .outerRadius(radius);



            var data = [];
            donutTypes.forEach(function(donut,i){
               d3.map(_data,function(d,i){
                  data.push({
                     key : donut,
                     value : d[donut],
                     age: d.age,
                     responses : d.responses
                  });
               });
            });
            console.log(data);
            // Nest the donuts data by age.
            var donuts = d3.nest()
                .key(function(d) { return d.key; })
                .entries(data);
            console.log(donuts);
            // Insert an svg element (with margin) for each airport in our dataset. A
            // child g element translates the origin to the pie center.
            var svg = d3.select(this).selectAll("div")
                .data(donuts)
                .enter().append("div") // http://code.google.com/p/chromium/issues/detail?id=98951
                .style("display", "inline-block")
                .style("width", (radius + margin) * 2 + "px")
                .style("height", (radius + margin) * 2 + "px")
                .append("svg:svg")
                .classed("svg",true)
                .attr("width", (radius + margin) * 2)
                .attr("height", (radius + margin) * 2)
                .append("svg:g")
                .attr("transform", "translate(" + (radius + margin) + "," + (radius + margin) + ")");

            // Add a label for the donuts. The `key` comes from the nest operator.
            svg.append("svg:text")
                .classed("pie-label",true)
                .attr("dy", ".35em")
                .text(function(d) { return d.key; });

            // Pass the nested per-airport values to the pie layout. The layout computes
            // the angles for each arc. Another g element will hold the arc and its label.
            var g = svg.selectAll("g")
                .data(function(d) { return pie(d.values); })
                .enter().append("svg:g");

            // Add a colored arc path, with a mouseover title showing the count.
            g.append("svg:path")
                .attr("d", arc)
                .style("fill", function(d,i) { return colors(i); })
                .append("svg:title")
                .text(function(d) { return d.data.age + " : " + d.data.responses + " : " + d.data.value; });

            // Add a label to the larger arcs, translated to the arc centroid and rotated.
            g.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")
                .classed("pie-chart-label",true)
                .attr("dy", ".35em")
                .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
                .text(function(d) { return d.data.age; });

            // Computes the label angle of an arc, converting from radians to degrees.
            function angle(d) {
                var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
                return a > 90 ? a - 180 : a;
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


var chart = d3.custom.PieChart();



d3.select('section.content')
    .datum(piedata)
    .call(chart);

