/**
 * Created by Administrator on 2016/9/6.
 */
(function (angular) {
    'use strict';

    //电影详情页模块
    var app = angular.module('moviecat.details',['ngRoute','moviecat.kenJsonp']);

    //路由配置
    app.config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/details/:id',{
            templateUrl : 'details/details.html',
            controller : 'detailsController'
        })
    }]);

    //创建控制器
    app.controller('detailsController',[
        '$scope',
        '$routeParams',
        'jsonpService',
        function ($scope,$routeParams,jsonpService) {
            jsonpService.jsonp('http://api.douban.com/v2/movie/subject/' + $routeParams.id,
                {},
            function (data) {
                $scope.data = data;
                console.log($scope.data);
                $scope.$apply();
            });
    }])
})(angular);