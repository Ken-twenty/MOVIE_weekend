/**
 * Created by Administrator on 2016/9/6.
 */
(function (angular) {
    var app = angular.module('moviecat.kenJsonp',[]);

    app.service('jsonpService',['$window',function ($window) {
        this.jsonp = function (url, obj, fn) {
            //一、
            //拼接url
            var queryString = '';
            for (var key in obj) {
                queryString += key + '=' + obj[key]  + '&';//最后一个参数多出的&不会产生错误(当没有callback)
            }

            //callback
            //回调函数名不能写死，否则会被后来调用的覆盖  //crossDomain();crossDomain();
            var funcName = 'ken' + $window.Math.random().toString().substr(2);
            queryString += 'callback=' + funcName;

            //最终的url
            url += '?' + queryString;

            //创建一个方法用来回调
            $window[funcName] = function (arg) {
                fn(arg);
            };

            //二、
            //创建script标签，设置src属性
            var element = $window.document.createElement('script');
            element.src = url;
            $window.document.body.appendChild(element);
        };
    }]);
})(angular);