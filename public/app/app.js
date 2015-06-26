/**
 * Created by Mihir.Desai on 6/11/2015.
 */
angular.module('app', ['ngResource' , 'ngRoute']);

angular.module('app').config(function($routeProvider , $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl : '/partials/barchart/barchart'
        })
        .when('/lineChart',{
            templateUrl:'/partials/linechart/linechart'
        })
        .when('/scatterPlot',{
            templateUrl:'/partials/scatterplot/scatterplot'
        })
        .otherwise({redirectTo:'/'});
});
