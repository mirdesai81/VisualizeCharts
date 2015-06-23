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



