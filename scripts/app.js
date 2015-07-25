/// <reference path="angular.js" />
var app = angular.module("MagicShowcase", ["ngRoute"]);

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.defaults.cache = true;
}]);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
        when('/:id', {
            templateUrl: 'views/card-list.html',
            controller: 'MainCtrl'
        }).
        when('/cards', {
            templateUrl: 'partials/cards.html',
            controller: 'CardsController'
        }).
        when('/cards/category/:category', {
            templateUrl: 'partials/cards.html',
            controller: 'CardsController'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);

app.service("dataService", function ($http) {
    var service = {};

    service.getData = function (id) {
        return $http.jsonp("https://script.google.com/macros/s/AKfycbxaxYVSm08e7dPlpguV4_CGTGEvzmmNj3ZbCf9VDjuiPqX_0ZI/exec?callback=JSON_CALLBACK&id=" + id);
    }

    return service;
});

app.directive("card", function () {
    return {
        restrict: "E",
        templateUrl: "views/card.html",
        scope: {
            card: '='
        }
    };
});

app.controller("MainCtrl", function ($scope, $routeParams, dataService) {
    $scope.data = {};
    
    dataService.getData($routeParams.id)
        .success(function (data) {
            $scope.data = data;
        });
});
