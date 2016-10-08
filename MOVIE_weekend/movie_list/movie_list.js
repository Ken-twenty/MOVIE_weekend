/**
 * Created by Administrator on 2016/9/5.
 */
(function (angular) {
    'use strict';
    //1.正在热映module
    var app = angular.module('moviecat.movie_list',['ngRoute','moviecat.kenJsonp']);

    app.config(['$routeProvider',function ($routeProvider) {
        //使用路由参数表示第几页
        $routeProvider.when('/:route/:page?',{//可空
            templateUrl : 'movie_list/movie_list.html',
            controller : 'movie_listController',
            othersWise : '/home_page'
        });
    }]);

    app.controller('movie_listController',[
        '$scope',
        '$http',
        '$routeParams',
        '$route',
        'jsonpService',
        function ($scope,$http,$routeParams,$route,jsonpService) {
        // console.log($routeParams);
        //模拟ajax获取回来的数据
        //$scope.data =

        // $http.get('./movie_list/coming_soon.json')
        //     .then(function (response) {
        //         //console.log(response);
        //         $scope.data = response.data;
        //     });

        //另一种API
        // $http({method : 'GET',url : './movie_list/coming_soon.json'}).then(function (response) {
        //             console.log(response);
        //             $scope.data = response.data;
        //         })

        //jsonp方法

        // $http.jsonp('http://api.douban.com/v2/movie/movie_list?callback=JSON_CALLBACK')
        //     .then(function (response) {
        //         console.log(response);
        //     });

        //angular.callbacks恰好违反了豆瓣的回调函数命名规则(.)

            // console.log($routeParams);//获取到的page会是一个字符串
            var count = 5;//设置每次获取的电影数
            //var page = ($routeParams.page || 1) - 0;//表示从第几页开始显示（类型转换）(默认第一页)
            $scope.page = ($routeParams.page || '1') - 0;//暴露到数据模型
            var start = ($scope.page - 1) * count;
            /**
             * p1:0 ,1 ,2 ,3 ,4   0
             * p2:5 ,6 ,7 ,8 ,9   5
             * p3:10,11,12,13,14  10
             */



            //调用自己封装的jsonp
            jsonpService.jsonp(
                // 'http://api.douban.com/v2/movie/movie_list',
                'http://api.douban.com/v2/movie/' + $routeParams.route,
                {count : count,start : start,q : $routeParams.q},//服务器会忽略多余的参数
                function (data) {
                    // console.log(data);
                    $scope.data = data;
                    //如果在异步请求中操作了数据模型，需要调用这个api（ajax,setTimeout,setInterval）
                    //在$http中内部也是这么操作的

                    var totalPage = Math.ceil($scope.data.total / count);//拿到数据后算出总页数
                    $scope.totalPage = totalPage;//暴露

                    $scope.$apply();//这个摆最后！！
                }
            );

            //通过按钮获取上/下一页
            $scope.getPage = function (arg) {
                var newPage = $scope.page + arg;
                if(newPage > $scope.totalPage || newPage < 1) return;
                $route.updateParams({page : newPage});
            }
    }]);
})(angular);