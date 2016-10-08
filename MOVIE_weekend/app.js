(function (angular) {
    "use strict";

    // start your ride
    var app = angular.module('moviecat',[
        'ngRoute',
        'moviecat.home_page',
        'moviecat.details',//规则是先引用先匹配
        'moviecat.movie_list',
        'moviecat.autoFocus'
        // 'moviecat.coming_soon',
        // 'moviecat.top250'
    ]);

    //创建控制器
    app.controller('mainController',[
        '$scope',
        '$location',
        '$route',
        function ($scope,$location,$route) {
        //搜索数据
        $scope.query = '';
        $scope.search = function () {
            $route.updateParams({route : 'search',page : '1',q : $scope.query});//修改路由参数(bug!!)
        };
    }]);

    app.config(['$routeProvider',function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo : '/home_page'
        });
    }]);
})(angular);