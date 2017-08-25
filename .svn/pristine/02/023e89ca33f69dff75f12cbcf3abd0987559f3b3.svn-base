'use strict';

/**
 * @ngdoc function
 * @name crmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the crmApp
 */
angular.module('crmApp').controller('LoginCtrl', ['$scope', '$state', '$http','menu', function($scope, $state, $http,menu) {
    $scope.login = function() {
        var user = $scope.userName;
        var psd = $scope.password;
        if(!(user && psd)){
            alert('请输入用户名和密码!');
            return;
        }
        $http.post("/api/security/login", {
            UserName: user,
            PassWord: psd
        }).success(function(acUser) {
            if (acUser.status === false) {
                //alert(acUser.message);
                return;
            }

            sessionStorage.setItem('user', JSON.stringify(acUser.data));

            //$location.path('main');

            menu.getSections();
            $state.go("main");
        }).error(function(){
            //$location.path('main');
        });
    };
}]);
