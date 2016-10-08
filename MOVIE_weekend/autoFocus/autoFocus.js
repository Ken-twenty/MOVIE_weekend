/**
 * Created by Administrator on 2016/9/6.
 */
(function (angular) {
    'use strict';

    //创建模块
    var app = angular.module('moviecat.autoFocus',[]);

    //创建自定义指令
    app.directive('autoFocus',['$location',function ($location) {
        return {
            // templateUrl : '',
            // restrict : '',
            // transclude : '',//配合ng-transclude
            // scope
            link : function (scope, element, attribute) {
                //注册点击事件，让被点击的元素获取样式，然后他的兄弟元素失去样式
                // element.on('click',function () {
                //     element.parent().children().removeClass('active');
                //     element.addClass('active');
                // });

                scope.location = $location;
                scope.$watch('location.url()',function (now, old) {
                    //判断锚点值是否包含了a标签的href属性
                    var hash = element.children()[0].hash.substr(1);
                    //判断是否包含
                    //判断一个元素是否已另一个元素开始(endsWith)
                    if (now.startsWith(hash)) {
                        element.parent().children().removeClass('active');
                        element.addClass('active');
                    }
                });
            }
        }
    }])
})(angular);