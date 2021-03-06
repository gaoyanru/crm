'use strict';

/**
 * @ngdoc overview
 * @name crmApp
 * @description
 * # crmApp
 *
 * Main module of the application.
 */

var crmApp = angular
    .module('crmApp', [
        'ngAnimate',
        'ngMessages',
        'ngRoute',
        'ui.router',
        'ui.bootstrap',
        'angularFileUpload',
        'ngLocale',
        'fixed.table.header',
        'ngMaterial',
        'chart.js'
    ]);

crmApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'userProvider', '$mdThemingProvider', '$mdAriaProvider', function($stateProvider, $urlRouterProvider, $httpProvider, user, $mdThemingProvider, $mdAriaProvider) {
        //https://crm.pilipa.cn/api/security/currsession
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('main', {
                url: '/main',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                title: '爱康鼎客户管理系统'
            }).state('main.dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'Dashboard',
                title: '爱康鼎客户管理系统'
            }).state('main.cus_pub', {
                url: '/customers/pub',
                templateUrl: 'views/customer_pub.html',
                controller: 'Customer_pub'
            }).state('main.cus_my', {
                url: '/customers/my',
                templateUrl: 'views/customer_my.html',
                controller: 'Customer_my'
            }).state('main.cus_signed', {
                url: '/customers/signed',
                templateUrl: 'views/customer_signed.html',
                controller: 'Customer_signed'
            }).state('main.cus_settings', {
                url: '/customers/setting',
                templateUrl: 'views/customer_setting.html',
                controller: 'Customer_setting'
            }).state('main.order_addAgent', {
                url: '/orders/OrderAddAgent/:orderid',
                templateUrl: 'views/order_addAgent.html',
                controller: 'OrderAddAgent'
            }).state('main.order_complete', {
                url: '/orders/ordercomplete',
                templateUrl: 'views/order_complete.html',
                controller: 'Order_complete'
            }).state('main.order_list', {
                url: '/orders/orderlist',
                templateUrl: 'views/order_list.html',
                controller: 'Order_list'
            }).state('main.order_remind', {
                url: '/orders/orderremind',
                templateUrl: 'views/order_remind.html',
                controller: 'Order_remind'
            }).state('main.order_change', {
                url: '/orders/order_change',
                templateUrl: 'views/order_change.html',
                controller: 'Order_change'
            }).state('main.order_statement', {
                url: '/orders/statement',
                templateUrl: 'views/order_statement.html',
                controller: 'Order_statement'
            }).state('main.order_outworker', {
                url: '/orders/outworker',
                templateUrl: 'views/order_outworker.html',
                controller: 'Order_outworker'
            }).state('main.company_sub', {
                url: '/company/sub',
                templateUrl: 'views/company_sublist.html',
                controller: 'Company_sub'
            }).state('main.statis_cus', {
                url: '/statis/statis_cus',
                templateUrl: 'views/statis_cus.html',
                controller: 'Statis_cus'
            }).state('main.statis_top', {
                url: '/statis/statis_top',
                templateUrl: 'views/statis_top.html',
                controller: 'Statis_top'
            }).state('main.static_order', {
                url: '/statis/static_order',
                templateUrl: 'views/statis_order.html',
                controller: 'Statis_order'
            }).state('main.users', {
                url: '/statis/user_users',
                templateUrl: 'views/user_users.html',
                controller: 'User_users'
            }).state('main.user_my', {
                url: '/statis/user_my',
                templateUrl: 'views/user_my.html',
                controller: 'User_my'
            }).state('main.site_ps', {
                url: '/statis/site_ps',
                templateUrl: 'views/site_ps.html',
                controller: 'Site_ps'
            }).state('main.statis_mate', {
                url: '/statis/statis_mate',
                templateUrl: 'views/statis_mate.html',
                controller: 'Statis_mate'
            }).state('main.statis_tend', {
                url: '/statis/statis_tend',
                templateUrl: 'views/statis_tend.html',
                controller: 'Statis_tend'
            }).state('main.statis_today', {
                url: '/statis/statis_today',
                templateUrl: 'views/statis_today.html',
                controller: 'Statis_today'
            }).state('main.user_group', {
                url: '/user/group',
                templateUrl: 'views/user_group.html',
                controller: 'User_group'
            }).state('main.statis_signed', {
                url: '/user/statis_signed',
                templateUrl: 'views/statis_signed.html',
                controller: 'Statis_signed'
            }).state('main.outwork_dict', {
                url: '/user/outwork_dict',
                templateUrl: 'views/outwork_dict.html',
                controller: 'Outwork_dict'
            }).state("main.go_task_config", {
                url: '/orders/go_task_config',
                templateUrl: 'views/go_task_config.html',
                controller: 'Gotaskconfig'
            }).state("main.contract_manage", {
                url: '/orders/contract_manage',
                templateUrl: 'views/contract_manage.html',
                controller: 'Contract_manage'
            }).state("main.signed_manage", {
                url: '/customers/signed_manage',
                templateUrl: 'views/signed_manage.html',
                controller: 'Signed_manage'
            }).state("main.finance_manage_contract", {
                url: '/finance_manage_contract',
                templateUrl: 'views/finance_manageContract.html',
                controller: 'Finance_manageContract'
            }).state("main.outwork_manage", {
                url: '/orders/outwork_manage',
                templateUrl: 'views/outwork_manage.html',
                controller: 'OutworkManage'
            }).state("main.accounting_manage", {
                url: '/orders/accounting_manage',
                templateUrl: 'views/accounting_manage.html',
                controller: 'AccountingManage'
            }).state("main.contract_end_manage", {
                url: '/orders/contract_end_manage',
                templateUrl: 'views/contract_end_manage.html',
                controller: 'ContractEndManage'
            });


        $urlRouterProvider
            .when('/main/user', '/login')
            .otherwise('/login');


        $httpProvider.defaults.transformResponse.push(function(response, header, status) { //请求成功
            if (angular.isString(response)) {
                return response;
            }
            if (status == 401) {
                location.href = "#login"
                return;
            }
            if (response.status) { // response.status： true , false
                return response;
            } else {
                alert(response.message);
                //console.error(response.message);
            }
            return response;
        });

        $mdThemingProvider.theme('default').primaryPalette('blue-grey');
        $httpProvider.interceptors.push(['$q', '$rootScope', function($q, $rootScope) {
            var ajaxCount = 0
            return {
                'request': function(config) {
                    ajaxCount++;
                    $rootScope.isLoading = true;
                    return config;
                },

                'response': function(response) {
                    ajaxCount--;
                    if (ajaxCount === 0)
                        $rootScope.isLoading = false;
                    return response;
                },
                'responseError': function(rejection) {
                    ajaxCount--;
                    if (ajaxCount === 0)
                        $rootScope.isLoading = false;
                    return $q.reject(rejection);
                }
            };
        }]);

        $mdAriaProvider.disableWarnings();
    }])
    .run(['$rootScope', '$state', '$http', '$locale', function($rootScope, $state, $http, $locale) {
        // $rootScope.$on('$stateChangeStart', function(event, toState) {

        //     if (toState.name === "main.users") {
        //         event.preventDefault();
        //         $state.go('main.users.usersList');
        //     }
        // });
        // dicts.init($http);

    }]);

Date.prototype.toISOString = function() {
    return [this.getFullYear(), this.getMonth() + 1, this.getDate() < 10 ? '0' + this.getDate() : this.getDate()].join('-');
};