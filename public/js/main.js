/**
 * Created by Mihir.Desai on 6/11/2015.
 */
/*
d3.csv('js/data.csv',function(data){
   console.log(data);
});
*/


var data = [
    {itemGroup : '123456' , item : '123456' , periodKey : '201502' , totalUnits: 50 , totalAmount : 250},
    {itemGroup : '123457' , item : '123457' , periodKey : '201502' , totalUnits: 20 , totalAmount : 100},
    {itemGroup : '123458' , item : '123458' , periodKey : '201502' , totalUnits: 10 , totalAmount : 50},
    {itemGroup : '123459' , item : '123459' , periodKey : '201502' , totalUnits: 10 , totalAmount : 50},
    {itemGroup : '123460' , item : '123460' , periodKey : '201502' , totalUnits: 150 , totalAmount : 750},
    {itemGroup : '123456' , item : '123456' , periodKey : '201503' , totalUnits: 50 , totalAmount : 250},
    {itemGroup : '123457' , item : '123457' , periodKey : '201504' , totalUnits: 20 , totalAmount : 100},
    {itemGroup : '123458' , item : '123458' , periodKey : '201505' , totalUnits: 10 , totalAmount : 50},
    {itemGroup : '123459' , item : '123459' , periodKey : '201506' , totalUnits: 10 , totalAmount : 50},
    {itemGroup : '123460' , item : '123460' , periodKey : '201507' , totalUnits: 150 , totalAmount : 750}
];


var linedata = [
    {itemGroup : '123456' , item : '123456' , periodKey : '2015/01/01' , totalUnits: 50 , totalAmount : 250},
    {itemGroup : '123457' , item : '123457' , periodKey : '2015/01/02' , totalUnits: 20 , totalAmount : 120},
    {itemGroup : '123458' , item : '123458' , periodKey : '2015/01/03' , totalUnits: 10 , totalAmount : 10},
    {itemGroup : '123459' , item : '123459' , periodKey : '2015/01/04' , totalUnits: 10 , totalAmount : 30},
    {itemGroup : '123460' , item : '123460' , periodKey : '2015/01/05' , totalUnits: 150 , totalAmount : 350},
    {itemGroup : '123456' , item : '123456' , periodKey : '2015/01/06' , totalUnits: 50 , totalAmount : 150},
    {itemGroup : '123457' , item : '123457' , periodKey : '2015/01/07' , totalUnits: 20 , totalAmount : 140},
    {itemGroup : '123458' , item : '123458' , periodKey : '2015/01/08' , totalUnits: 10 , totalAmount : 30},
    {itemGroup : '123459' , item : '123459' , periodKey : '2015/01/09' , totalUnits: 10 , totalAmount : 20},
    {itemGroup : '123460' , item : '123460' , periodKey : '2015/01/10' , totalUnits: 150 , totalAmount : 150},
    {itemGroup : '123456' , item : '123456' , periodKey : '2015/01/11' , totalUnits: 50 , totalAmount : 450},
    {itemGroup : '123457' , item : '123457' , periodKey : '2015/01/12' , totalUnits: 20 , totalAmount : 300},
    {itemGroup : '123458' , item : '123458' , periodKey : '2015/01/13' , totalUnits: 10 , totalAmount : 230},
    {itemGroup : '123459' , item : '123459' , periodKey : '2015/01/14' , totalUnits: 10 , totalAmount : 120},
    {itemGroup : '123460' , item : '123460' , periodKey : '2015/01/15' , totalUnits: 150 , totalAmount : 250},
    {itemGroup : '123456' , item : '123456' , periodKey : '2015/01/16' , totalUnits: 50 , totalAmount : 105},
    {itemGroup : '123457' , item : '123457' , periodKey : '2015/01/17' , totalUnits: 20 , totalAmount : 123},
    {itemGroup : '123458' , item : '123458' , periodKey : '2015/01/18' , totalUnits: 10 , totalAmount : 149},
    {itemGroup : '123459' , item : '123459' , periodKey : '2015/01/19' , totalUnits: 10 , totalAmount : 30},
    {itemGroup : '123460' , item : '123460' , periodKey : '2015/01/20' , totalUnits: 150 , totalAmount : 250},
    {itemGroup : '123456' , item : '123456' , periodKey : '2015/01/21' , totalUnits: 50 , totalAmount : 50},
    {itemGroup : '123457' , item : '123457' , periodKey : '2015/01/22' , totalUnits: 20 , totalAmount : 400},
    {itemGroup : '123458' , item : '123458' , periodKey : '2015/01/23' , totalUnits: 10 , totalAmount : 30},
    {itemGroup : '123459' , item : '123459' , periodKey : '2015/01/24' , totalUnits: 10 , totalAmount : 70},
    {itemGroup : '123460' , item : '123460' , periodKey : '2015/01/25' , totalUnits: 150 , totalAmount : 90},
    {itemGroup : '123456' , item : '123456' , periodKey : '2015/01/26' , totalUnits: 50 , totalAmount : 50},
    {itemGroup : '123457' , item : '123457' , periodKey : '2015/01/27' , totalUnits: 20 , totalAmount : 190},
    {itemGroup : '123458' , item : '123458' , periodKey : '2015/01/28' , totalUnits: 10 , totalAmount : 160},
    {itemGroup : '123459' , item : '123459' , periodKey : '2015/01/29' , totalUnits: 10 , totalAmount : 50},
    {itemGroup : '123460' , item : '123460' , periodKey : '2015/01/30' , totalUnits: 150 , totalAmount : 750}
];

var scatterplotdata = [
    {glazed: 3.14, jelly: 4.43, powdered: 2.43, sprinkles: 3.86, age: 18, responses: 7},
    {glazed: 3.00, jelly: 3.67, powdered: 2.67, sprinkles: 4.00, age: 19, responses: 3},
    {glazed: 2.00, jelly: 4.00, powdered: 2.33, sprinkles: 4.33, age: 20, responses: 3},
    {glazed: 3.50, jelly: 4.50, powdered: 1.00, sprinkles: 3.50, age: 21, responses: 2},
    {glazed: 2.83, jelly: 3.50, powdered: 1.83, sprinkles: 4.50, age: 22, responses: 6},
    {glazed: 3.25, jelly: 4.75, powdered: 2.25, sprinkles: 3.50, age: 23, responses: 4},
    {glazed: 1.50, jelly: 4.00, powdered: 2.50, sprinkles: 4.00, age: 25, responses: 2},
    {glazed: 1.67, jelly: 3.00, powdered: 1.33, sprinkles: 4.00, age: 26, responses: 3},
    {glazed: 2.50, jelly: 4.00, powdered: 1.00, sprinkles: 4.50, age: 27, responses: 2},
    {glazed: 3.00, jelly: 4.33, powdered: 1.33, sprinkles: 4.33, age: 28, responses: 3},
    {glazed: 5.00, jelly: 4.00, powdered: 1.00, sprinkles: 4.00, age: 29, responses: 1},
    {glazed: 5.00, jelly: 5.00, powdered: 2.00, sprinkles: 5.00, age: 30, responses: 1},
    {glazed: 1.50, jelly: 4.50, powdered: 3.00, sprinkles: 4.75, age: 31, responses: 4},
    {glazed: 3.67, jelly: 3.33, powdered: 1.67, sprinkles: 4.67, age: 32, responses: 3},
    {glazed: 2.00, jelly: 4.50, powdered: 1.00, sprinkles: 5.00, age: 33, responses: 2},
    {glazed: 2.75, jelly: 3.75, powdered: 2.50, sprinkles: 4.50, age: 34, responses: 4},
    {glazed: 4.00, jelly: 3.00, powdered: 2.75, sprinkles: 4.25, age: 35, responses: 4},
    {glazed: 1.50, jelly: 3.00, powdered: 4.00, sprinkles: 4.00, age: 36, responses: 2},
    {glazed: 3.00, jelly: 3.00, powdered: 3.50, sprinkles: 4.00, age: 37, responses: 2},
    {glazed: 4.00, jelly: 2.00, powdered: 3.33, sprinkles: 4.67, age: 39, responses: 3},
    {glazed: 3.50, jelly: 3.00, powdered: 4.00, sprinkles: 4.50, age: 40, responses: 2},
    {glazed: 2.75, jelly: 2.75, powdered: 4.00, sprinkles: 4.25, age: 41, responses: 4},
    {glazed: 2.25, jelly: 2.50, powdered: 1.75, sprinkles: 4.25, age: 42, responses: 4},
    {glazed: 1.00, jelly: 2.00, powdered: 1.00, sprinkles: 5.00, age: 43, responses: 1},
    {glazed: 2.00, jelly: 3.00, powdered: 3.67, sprinkles: 3.33, age: 44, responses: 3},
    {glazed: 3.33, jelly: 2.33, powdered: 3.33, sprinkles: 3.33, age: 46, responses: 3},
    {glazed: 2.25, jelly: 4.00, powdered: 2.75, sprinkles: 3.00, age: 47, responses: 4},
    {glazed: 3.75, jelly: 2.00, powdered: 3.00, sprinkles: 2.75, age: 48, responses: 4},
    {glazed: 2.75, jelly: 2.00, powdered: 3.75, sprinkles: 3.25, age: 49, responses: 4},
    {glazed: 2.67, jelly: 2.67, powdered: 1.67, sprinkles: 3.67, age: 51, responses: 3},
    {glazed: 2.50, jelly: 2.50, powdered: 4.00, sprinkles: 3.00, age: 52, responses: 2},
    {glazed: 3.00, jelly: 3.67, powdered: 4.67, sprinkles: 2.67, age: 53, responses: 3},
    {glazed: 5.00, jelly: 5.00, powdered: 5.00, sprinkles: 3.50, age: 54, responses: 2},
    {glazed: 2.33, jelly: 1.67, powdered: 2.33, sprinkles: 3.33, age: 55, responses: 3},
    {glazed: 3.00, jelly: 2.00, powdered: 3.00, sprinkles: 3.00, age: 56, responses: 1},
    {glazed: 2.00, jelly: 2.00, powdered: 2.00, sprinkles: 4.00, age: 57, responses: 1},
    {glazed: 1.25, jelly: 2.00, powdered: 3.00, sprinkles: 1.75, age: 59, responses: 4},
    {glazed: 2.50, jelly: 2.50, powdered: 4.00, sprinkles: 2.50, age: 60, responses: 2},
    {glazed: 2.33, jelly: 2.33, powdered: 2.67, sprinkles: 3.00, age: 61, responses: 3},
    {glazed: 2.25, jelly: 2.50, powdered: 3.75, sprinkles: 3.00, age: 62, responses: 4},
    {glazed: 1.50, jelly: 3.00, powdered: 3.00, sprinkles: 2.00, age: 63, responses: 2},
    {glazed: 2.00, jelly: 3.00, powdered: 3.40, sprinkles: 2.40, age: 64, responses: 5},
    {glazed: 2.00, jelly: 1.00, powdered: 4.50, sprinkles: 2.00, age: 65, responses: 2},
    {glazed: 2.00, jelly: 1.67, powdered: 4.00, sprinkles: 1.67, age: 66, responses: 3},
    {glazed: 1.50, jelly: 1.75, powdered: 3.75, sprinkles: 2.25, age: 67, responses: 4},
    {glazed: 2.00, jelly: 2.50, powdered: 4.25, sprinkles: 2.00, age: 68, responses: 4},
    {glazed: 3.00, jelly: 2.00, powdered: 3.00, sprinkles: 3.00, age: 70, responses: 1},
    {glazed: 2.33, jelly: 2.67, powdered: 4.33, sprinkles: 2.33, age: 71, responses: 3},
    {glazed: 3.00, jelly: 2.50, powdered: 3.75, sprinkles: 2.00, age: 72, responses: 4},
    {glazed: 2.00, jelly: 2.50, powdered: 4.50, sprinkles: 2.50, age: 73, responses: 2},
    {glazed: 3.00, jelly: 2.00, powdered: 4.00, sprinkles: 1.50, age: 74, responses: 2}
];

d3.custom = {};




/*function drawCircle(){
    svg.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr("cx",function(d,i){
            return ( i * 50)+30;
        })
        .attr("cy",height/2)
        .attr("r",function(d){
            return d;
        })
        .attr("class","circle")
        .attr("stroke-width",function(d){
            return d/2;
        });
}*/

function colors(n) {
    var colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
    return colors[n % colors.length];
}



