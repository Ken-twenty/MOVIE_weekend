/**
 * Created by Administrator on 2016/9/5.
 */
(function (angualr) {
    'use strict';
    //1.首页模块
    var app = angular.module('moviecat.home_page',['ngRoute']);

    //2.配置路由
    app.config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/home_page',{
            templateUrl : './home_page/home_page.html'
            //路径是从主模块开始计算的
        });
    }]);
})(angular);