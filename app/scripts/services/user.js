'use strict';
angular.module('crmApp').provider('user', function() {
    var acUser = {
        get: function(){
             var userStr = sessionStorage.getItem('user');
            if (!userStr) location.href = "#/login";
            return JSON.parse(userStr);
        },
        set: function(obj){
            sessionStorage.setItem('user', JSON.stringify(obj));
        }
    };
    this.$get = [function() {
        var userStr = sessionStorage.getItem('user');
        if (!userStr) location.href = "#/login";
        return acUser;
    }];
    this.set = function(obj) {
        sessionStorage.setItem('user', JSON.stringify(obj));
    }
});

