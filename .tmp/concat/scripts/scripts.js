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
                if (!response.message) {
                  return response;
                } else {
                  alert(response.message);
                }
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


'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "\u4e0a\u5348",
      "\u4e0b\u5348"
    ],
    "DAY": [
      "\u661f\u671f\u65e5",
      "\u661f\u671f\u4e00",
      "\u661f\u671f\u4e8c",
      "\u661f\u671f\u4e09",
      "\u661f\u671f\u56db",
      "\u661f\u671f\u4e94",
      "\u661f\u671f\u516d"
    ],
    "ERANAMES": [
      "\u516c\u5143\u524d",
      "\u516c\u5143"
    ],
    "ERAS": [
      "\u516c\u5143\u524d",
      "\u516c\u5143"
    ],
    "FIRSTDAYOFWEEK": 6,
    "MONTH": [
      "\u4e00\u6708",
      "\u4e8c\u6708",
      "\u4e09\u6708",
      "\u56db\u6708",
      "\u4e94\u6708",
      "\u516d\u6708",
      "\u4e03\u6708",
      "\u516b\u6708",
      "\u4e5d\u6708",
      "\u5341\u6708",
      "\u5341\u4e00\u6708",
      "\u5341\u4e8c\u6708"
    ],
    "SHORTDAY": [
      "\u65e5",
      "\u4e00",
      "\u4e8c",
      "\u4e09",
      "\u56db",
      "\u4e94",
      "\u516d"
    ],
    "SHORTMONTH": [
      "1\u6708",
      "2\u6708",
      "3\u6708",
      "4\u6708",
      "5\u6708",
      "6\u6708",
      "7\u6708",
      "8\u6708",
      "9\u6708",
      "10\u6708",
      "11\u6708",
      "12\u6708"
    ],
    "STANDALONEMONTH": [
      "\u4e00\u6708",
      "\u4e8c\u6708",
      "\u4e09\u6708",
      "\u56db\u6708",
      "\u4e94\u6708",
      "\u516d\u6708",
      "\u4e03\u6708",
      "\u516b\u6708",
      "\u4e5d\u6708",
      "\u5341\u6708",
      "\u5341\u4e00\u6708",
      "\u5341\u4e8c\u6708"
    ],
    "WEEKENDRANGE": [
      5,
      6
    ],
    "fullDate": "y\u5e74M\u6708d\u65e5EEEE",
    "longDate": "y\u5e74M\u6708d\u65e5",
    "medium": "y\u5e74M\u6708d\u65e5 ah:mm:ss",
    "mediumDate": "y\u5e74M\u6708d\u65e5",
    "mediumTime": "ah:mm:ss",
    "short": "y/M/d ah:mm",
    "shortDate": "y/M/d",
    "shortTime": "ah:mm"
  },
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "\u00a5",
    "DECIMAL_SEP": ".",
    "GROUP_SEP": ",",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "-\u00a4",
        "negSuf": "",
        "posPre": "\u00a4",
        "posSuf": ""
      }
    ]
  },
  "id": "zh-cn",
  "localeID": "zh_CN",
  "pluralCat": function(n, opt_precision) {  return PLURAL_CATEGORY.OTHER;}
});
}]);

angular.module('crmApp').factory('server', ['$http', function($http) {

    return {
        getMyCustomer: function(params){
        	return $http.get("/api/Customer?"+$.param(params));
        },
        saveCustomer: function(data,verify){
        	if(!data.Id){
        		return $http.post('/api/customer?verify='+verify,data);
        	}
        },
        getCustomerDetail:function(id){
            return $http.get('/api/customerdetail/'+id);
        },
        saveCompany: function(data,verify){
            if(!data.Id){
                return $http.post('/api/subsidiary?verify='+verify,data);
            }
        },
        getSalers: function(){
            return $http.get('/api/contract/sales');
        },
        deleteCustomer: function(id){
            return $http.delete('/api/opencustomer/'+id);
        },
        getIndustry: function(){
            return $http.get('/api/industry');
        },
        getCustomerType: function(){
            return $http.get('/api/cuscategory');
        },
        http: $http
    };
 }]);

angular.module('crmApp').factory('menu', ['user', function(user) {


    var menu = {
        selectSection: function(section) {
            section.opened = true;
        },
        toggleSelectSection: function(section) {
            section.opened = !section.opened;
        },
        isSectionSelected: function(section) {
            return section.opened;
        },

        selectPage: function(page) {
            if (self.currentPage) self.currentPage.selected = false;
            page.selected = true;
            self.currentPage = page;
        },
        isPageSelected: function(page) {
            return page.selected;
        },
        getSections: function() {
            var u = user.get();
            if(!u) return;
            var menus = JSON.parse(u.FunctionList);
            var sections = [];
            _.each(menus.sort(sortFn), function(item) {
                var section = {};
                section.name = item.FunctionName;
                section.icon = item.Icon;
                section.type = 'toggle';
                section.pages = [];
                _.each(item.children.sort(sortFn), function(obj) {
                    var page = {};
                    page.name = obj.FunctionName;
                    page.router = obj.FunctionUrl;
                    page.type = 'link';
                    section.pages.push(page);
                });
                sections.push(section);
            });
            this.sections = sections;

            function sortFn(a, b) {
                return a.Rank > b.Rank;
            };
        }

    };
    menu.getSections();
    return menu;
}]);

angular.module('crmApp').factory('Excel',["$window", function($window){
    var uri='data:application/vnd.ms-excel;base64,',
        template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
        format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
    return {
        tableToExcel:function(tableId,worksheetName){
            var table=$(tableId),
                ctx={worksheet:worksheetName,table:table.html()},
                href=uri+base64(format(template,ctx));
            return href;
        }
    };
}])

'use strict';

/**
 * @ngdoc function
 * @name crmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the crmApp
 */
angular.module('crmApp').controller('MainCtrl', ['$scope', '$http', '$state', '$stateParams', 'user', 'menu', '$timeout',
    function($scope, $http, $state, $stateParams, user, menu, $timeout) {
        $scope.user = user.get();
        var navTreeModel = angular.fromJson($scope.user.FunctionList);
        // nav tree node selected
        $scope.routerChange = function(node) {
            $scope.selectedNavTree = node;
            if (node.url) {
                var params = node.params || {};
                $state.go(node.url, params, { inherit: false });
            }
        };

        //更改密码
        $scope.updatePswd = function() {
            var updateModal = $uibModal.open({
                templateUrl: 'views/updatePswd.html',
                controller: 'UpdatePswdCtrl'
            });

            updateModal.result.then(function(updateNode) {

            }, function() {
                console.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.logout = function() {
            $http.get('/api/security/logout').then(function() {
                //sessionStorage.removeItem('user');
                sessionStorage.clear();
                location.href = "#/login";
            });
        };
        $scope.logoutZY = function() {
            $http.put('/api/subsidiary/exit').success(function(res) {
                $http.get('/api/user').success(function(res) {
                    user.set(res.data[0]);
                    menu.getSections();
                    $state.go('main');
                    location.reload();
                });
            });
        }
        this.isOpen = isOpen;
        this.isSelected = isSelected;
        this.toggleOpen = toggleOpen;
        this.selectPage = selectPage;
        $scope.menu = menu;
        var pageRouter = $state.current.name;
        if(pageRouter ==="main"){
            $state.go('main.dashboard')
        }
        var page = _.find(menu.sections, function(section) {
            var page = _.find(section.pages, { router: pageRouter });
            if (page) {
                selectPage(page);
            }
            return !!page;
        });
        if (!page) {
            $scope.title = $state.current.title;
        }
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if (toState.title) $scope.title = toState.title;
        });

        function path() {
            return $location.path();
        }

        function isSelected(page) {
            return menu.isPageSelected(page);
        }

        function isOpen(section) {
            return menu.isSectionSelected(section);
        }

        function toggleOpen(section) {
            menu.toggleSelectSection(section);
        }

        function selectPage(page) {
            $scope.title = page.name;
            menu.selectPage(page)
        }
    }
]);

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

angular.module('crmApp').directive('menuLink', function() {
  return {
    scope: {
      section: '='
    },
    templateUrl: 'views/menu-link.tmpl.html',
    link: function($scope, $element) {
      var controller = $element.parent().controller();
      $scope.isSelected = function() {
        return controller.isSelected($scope.section);
      };
      $scope.selectPage = function(page) {
        controller.selectPage(page);
      };
    }
  };
}).directive('menuToggle', ['$mdUtil', '$animateCss', '$$rAF', function($mdUtil, $animateCss, $$rAF) {
  return {
    scope: {
      section: '='
    },
    templateUrl: 'views/menu-toggle.tmpl.html',
    link: function($scope, $element) {
      var controller = $element.parent().controller();
      $scope.renderContent = false;

      $scope.isOpen = function() {
        return controller.isOpen($scope.section);
      };

      $scope.toggle = function() {
        controller.toggleOpen($scope.section);
      };

      var parentNode = $element[0].parentNode.parentNode.parentNode;
      if(parentNode.classList.contains('parent-list-item')) {
        var heading = parentNode.querySelector('h2');
        $element[0].firstChild.setAttribute('aria-describedby', heading.id);
      }
    }
  };
}]);
angular.module('crmApp').directive('dateFormat', ['$filter',function($filter) {  
    var dateFilter = $filter('date');  
    return {  
        require: 'ngModel',  
        link: function(scope, elm, attrs, ctrl) {  
  
            function formatter(value) {  
                return dateFilter(value, 'yyyy-MM-dd'); //format  
            }  
  
            // function parser() {  
            //     return ctrl.$modelValue;  
            // }  
  
            ctrl.$formatters.push(formatter);  
            // ctrl.$parsers.unshift(parser);  
  
        }  
    };  
}]);  
angular.module('crmApp').directive('picView', ['$uibModal', function($uibModal) {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attrs, ctrls) {
            var src = attrs.ngSrc;
            scope.src = src;
            element.find('img').viewer({
                navbar: false,
                title:false,
                built: function() {
                    var container = $(this).next();
                    var that= this;
                    container.find('.viewer-canvas').on('click',function(e){
                        if(e.target.tagName.toUpperCase() !=="IMG")
                        $(that).viewer('hide');
                    });
                    $('body').append(container);

                }
            });
            scope.$watch(function(){
                return attrs.ngSrc;
            },function(newval,oldval){
                if(newval!==oldval){
                    scope.src = newval;
                }
            });
        },
        template: '<div class="picView"><img src="{{src}}" alt="" class="img-thumbnail"></div>'
    };
}]);

'use strict';

angular.module('crmApp').filter('filterRole', function() {
    var filterRole = function(role) {
        var roleMap = '';
        switch (role) {
            case 1:
                roleMap = '系统管理员';
                break;
            case 2:
                roleMap = '总经理';
                break;
            case 3:
                roleMap = '财务总监';
                break;
            case 4:
                roleMap = '销售总监';
                break;
            case 5:
                roleMap = '业务员';
                break;
            default:
                roleMap = '其他';
        }

        return roleMap;
    };

    return filterRole;
}).filter('filterInvoiceProperty', function() {
    var filterStatus = function(status) {
        var statusMap = '';
        switch (+status) {
            case 1:
                statusMap = '公司';
                break;
            case 2:
                statusMap = '个人';
                break;
        }

        return statusMap;
    };

    return filterStatus;
}).filter('psType', function() {
    var filterStatus = function(status) {
        var statusMap = '';
        switch (+status) {
            case 1:
                statusMap = '公司核名';
                break;
            case 2:
                statusMap = '产品服务';
                break;
            case 3:
                statusMap = '贷帐公司';
            case 4:
                statusMap = '孵化器';
            case 5:
                statusMap = '渠道';
                break;
        }

        return statusMap;
    };

    return filterStatus;
}).filter('filterInvoiceCategory', function() {
    var filterStatus = function(status) {
        var statusMap = '';
        switch (+status) {
            case 1:
                statusMap = '专票';
                break;
            case 2:
                statusMap = '普票';
                break;
        }

        return statusMap;
    };

    return filterStatus;
});

angular.module('crmApp').filter('filterInvoice', function() {
    var filterInvoice = function(status) {
        var invoiceMap = '';
        switch (status) {
            case 1:
                invoiceMap = '非预借发票';
                break;
        }

        return invoiceMap;
    };

    return filterInvoice;
});



angular.module('crmApp').filter('filterProp', function() {
    var filterProp = function(cate) {
        var propMap = '';
        switch (cate) {
            case 1:
                propMap = '公司';
                break;
            case 2:
                propMap = '个人';
                break;
        }

        return propMap;
    };

    return filterProp;
});
angular.module('crmApp').filter('filterAddValue', function() {
    var filterProp = function(cate) {
        var propMap = {
            1: '小规模',
            2: '一般纳税人'
        };
        return propMap[cate];
    };

    return filterProp;
}).filter('tDateTime', function() {
    var filter = function(param) {
        if (param.substr(0, 4) == "0001") return '';
        return param ? param.replace('T', ' ') : '';
    };

    return filter;
}).filter('tDate', function() {
    var filter = function(param) {
        if (!param) return null;
        if (param.substring(0, 4) == '0001') {
            return null;
        }
        return param ? param.substring(0, 10) : '';
    };

    return filter;
}).filter('fPayType', function() {
    var filter = function(param) {
        var propMap = {
            1: '半年付',
            2: '年付',
            3: '季付',
            4: '零税(半年)'
        };
        return propMap[param];
    };

    return filter;
}).filter('nospace', function() {
    return function(value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
}).filter('cusTypeName', function() {
    return function(value, custypes) {
        var item = _.find(custypes, { CustomerTypeId: value });
        return item ? item.Name : '';
    }
}).filter('groupMember', function() {
    return function(users, groupId) {
        if (!groupId) return users;
        var item = _.filter(users, { DepartmentId: groupId });
        return item;
    }
}).filter('orderCategory', function() {
    var propMap = {
        1: '记账',
        2: '注册+记账',
    };
    return function(value) {
        return propMap[value];
    }
}).filter('fDate', function() {
    var filter = function(val) {
        if (!val) {
            console.error('time error');
            return null;
        }
        if (val.substring(0, 4) == '0001') {
            return null;
        }
        return new Date(val);
    };

    return filter;
}).filter('otStatus', function() {
    var propMap = {
        1: '进行中',
        2: '已完成',
        3: '未开始'
    };
    return function(value) {
        return propMap[value];
    }
}).filter('fYseNo', function() {
    return function(value) {
        return value ? '是' : '否';
    }
}).filter('fOtType', function() {
    return function(value) {
        var propMap = {
            1: '税务',
            2: '工商',
            3: '其他'
        };
        return propMap[value];
    }
}).filter('outWorkStatus', function() {
    var filterStatus = function(status) {
        var statusMap = '';
        switch (+status) {
            case 1:
                statusMap = '待分配';
                break;
            case 2:
                statusMap = '待处理';
                break;
            case 3:
                statusMap = '进行中';
                break;
            case 4:
                statusMap = '已取消';
                break;
            case 5:
                statusMap = '已完成';
                break;
        }

        return statusMap;
    };

    return filterStatus;
}).filter('Contractstatus', function() {
    var contractStatus = function(status) {
        var str = ''
        switch (+status) {
            case 1:
                str = '待审核'
                break;
            case 2:
                str = '已审核'
                break;
            case 3:
                str = '已驳回'
                break;
            case 4:
                str = '终止'
                break;
        }
        return str
    }
    return contractStatus
}).filter('FinanceStatus', function() {
    var financeStatus = function(status) {
        var str = ''
        switch (+status) {
            case 1:
                str = '待审核'
                break;
            case 2:
                str = '已审核'
                break;
            case 3:
                str = '已驳回'
                break;
        }
        return str
    }
    return financeStatus
}).filter('ContractType', function() {
    var contracttype = function(status) {
        var str = ''
        switch (+status) {
            case 1:
                str = '新增'
                break;
            case 2:
                str = '续费'
                break;
        }
        return str
    }
    return contracttype
}).filter('CustomerMarkStyle', function() {
    var customerMarkStyle = function(status) {
        var str = ''
        switch (+status) {
            case 1:
                str = '低'
                break;
            case 2:
                str = '中'
                break;
            case 3:
                str = '高'
                break;
        }
        return str
    }
    return customerMarkStyle
}).filter('CompanyType', function() {
    var companyType = function(status) {
        var str = ''
        switch (+status) {
            case 0:
              str = '空'
              break;
            case 1:
                str = '小规模'
                break;
            case 2:
                str = '一般纳税人'
                break;
        }
        return str
    }
    return companyType
}).filter('formateDate', function() {
  var date = function (date) {
  return date.slice(0, 10)
  }
  return date
}).filter('PayType', function() {
  var payType = function (status) {
    var str = ''
    switch (+status) {
      case 1:
        str = '银行卡转账'
        break;
      case 2:
        str = '拉卡拉'
        break;
      case 3:
        str = '微信'
        break;
      case 4:
        str = '支付宝'
        break;
      case 5:
        str = '现金'
        break;
    }
    return str
  }
  return payType
}).filter('handdleAmount', function() {
  var amount = function (amount) {
  return '￥' + amount
  }
  return amount
}).filter('mainTaskStatus', function() {
    var status = function(status) {
        var str = ''
        switch (+status) {
            case 1:
                str = '待分配'
                break;
            case 2:
                str = '待处理'
                break;
            case 3:
                str = '进行时'
                break;
            case 4:
                str = '已完成'
                break;
            case 5:
                str = '已取消'
                break;
        }
        return str
    }
    return status
}).filter('ComStatus', function() {
    var status = function(status) {
        var str = ''
        switch (+status) {
            case 1:
                str = '待分配'
                break;
            case 2:
                str = '未开始'
                break;
            case 3:
                str = '外勤服务'
                break;
            case 4:
                str = '外勤会计服务'
                break;
            case 5:
                str = '会计服务'
                break;
            case 6:
                str = '挂起'
                break;
            case 7:
                str = '结束'
                break;
        }
        return str
    }
    return status
}).filter('partTax', function() {
    var status = function(status) {
        var str = ''
        switch (+status) {
            case 1:
                str = '国税报道'
                break;
            case 2:
                str = '地税报道'
                break;
        }
        return str
    }
    return status
}).filter('MainoutworkStatus', function() {
    var mainoutworkStatus = function(status) {
        var str = ''
        switch (+status) {
            case 1:
                str = '待分配'
                break;
            case 2:
                str = '待处理'
                break;
            case 3:
                str = '进行时'
                break;
            case 4:
                str = '已取消'
                break;
            case 5:
                str = '已完成'
                break;
        }
        return str
    }
    return mainoutworkStatus
}).filter('ChildoutworkStatus', function() {
    var childoutworkStatus = function(status) {
        var str = ''
        switch (+status) {
            case 1:
                str = '待分配'
                break;
            case 2:
                str = '待处理'
                break;
            case 3:
                str = '进行中'
                break;
            case 4:
                str = '已取消'
                break;
            case 5:
                str = '已完成'
                break;
        }
        return str
    }
    return childoutworkStatus
}).filter('HanddleOperation', function() {
    var handdleOperation = function(status) {
        var str = ''
        switch (+status) {
            case 1:
                str = '标记'
                break;
            case 2:
                str = '挂起'
                break;
        }
        return str
    }
    return handdleOperation
}).filter('NewAgentStatus', function() { // 报税状态agent
    var newAgentStatus = function(status) {
        var str = ''
        switch (+status) {
            case 1:
                str = '未开始'
                break;
            case 2:
                str = '挂起'
                break;
            case 3:
                str = '服务中'
                break;
        }
        return str
    }
    return newAgentStatus
}).filter('NewServiceStatus', function() { // 服务状态公司
    var newServiceStatus = function(status) {
        var str = ''
        switch (+status) {
            case 1:
                str = '待分配'
                break;
            case 2:
                str = '未开始'
                break;
            case 3:
                str = '外勤服务'
                break;
            case 4:
                str = '外勤会计服务'
                break;
            case 5:
                str = '会计服务'
                break;
            case 7:
                str = '结束'
                break;
            case 8:
                str = '中止'
                break;
        }
        return str
    }
    return newServiceStatus
}).filter('NewCheckStatus', function() { // 审核状态 会计和外勤 合同状态
    var newCheckStatus = function(status) {
        var str = ''
        switch (+status) {
            case 1:
                str = '待审核'
                break;
            case 2:
                str = '已审核'
                break;
            case 3:
                str = '已驳回'
                break;
            case 4:
                str = '外勤提交'
                break;
            case 5:
                str = '部分审核'
                break;
            case 6:
                str = '已提交'
                break;
            case 7:
                str = '已结束'
                break;
            case 8:
                str = '已中止'
                break;
        }
        return str
    }
    return newCheckStatus
})

angular.module('crmApp').controller('Customer_my', ['$scope', 'server', '$state', '$mdDialog', 'user', '$mdToast', '$q', 'FileUploader', '$timeout',
    function($scope, server, $state, $mdDialog, user, $mdToast, $q, FileUploader, $timeout) {
        $scope.user = user.get();
        $scope.open = function(item) {
            var tplUrl;
            if (item) {
                tplUrl = 'views/customer_view.html';
            } else {
                tplUrl = 'views/customer_addCustomer.html';
            }
            $mdDialog.show({
                    controller: 'Customer_view',
                    templateUrl: tplUrl,
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: {
                        customer: item || {},
                        getNextId: $scope.getNextId
                    },
                    // preserveScope: true,
                    // scope: $scope
                })
                .then(function(answer) {
                    resFn(answer);
                }, function() {

                });

            function resFn(answer) {
                refreshData();
            }
        };
        $scope.getNextId = function(item) {
            var deferred = $q.defer();

            var c = _.find($scope.customers, { Id: item.Id });
            var index = _.indexOf($scope.customers, c) + 1;
            if (index < $scope.customers.length) {
                deferred.resolve($scope.customers[index].Id);
            } else {
                $scope.paginator.currentPage += 1;
                refreshData().then(function(id) {
                    deferred.resolve(id);
                });
            }

            return deferred.promise;
        };

        server.getCustomerType().success(function(res) {
            $scope.ctypes = res.data.sort(ctypeSortFn);
        });

        function ctypeSortFn(a, b) {
            return parseInt(a.Name) < parseInt(b.Name);
        }


        $scope.search = {
            cusType: 0,
            userid: 0
        };
        $scope.delete = function(item) {
            if (!confirm("确认要删除客户吗？")) return;
            server.deleteCustomer(item.Id).then(function(res) {
                if (res.status) refreshData();
            });
        };

        //skipHide: true,
        $scope.forward = function(item) {
            $mdDialog.show({
                    controller: 'Customer_forword',
                    templateUrl: 'views/customer_forward.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: { customer: item || {} }
                })
                .then(function(answer) {
                    refreshData();
                }, function() {

                });
        }
        $scope.toPub = function(customer) {
            if (!confirm("确认要将客户转入公海吗？")) return;
            server.http.put('/api/custranstoocean?customerId=' + customer.Id).then(function(res) {
                if (res.status) refreshData();
            });
        };
        $scope.toPubAll = function() {
            var ids = _.map(_.filter($scope.customers, { selected: true }), 'Id');
            server.http.post('/api/customerocean', ids).then(function(res) {
                refreshData();
            });
        };
        $scope.selectAll = function() {
            _.each($scope.customers, function(item) {
                item.selected = true;
            });
        }
        $scope.clear = function() {
            _.each($scope.customers, function(item) {
                item.selected = false;
            });
        }
        $scope.toOthersAll = function() {
            var ids = _.map(_.filter($scope.customers, { selected: true }), 'Id');
            $mdDialog.show({
                    controller: 'Customer_forword',
                    templateUrl: 'views/customer_forward.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: { customer: ids || [] }
                })
                .then(function(answer) {
                    refreshData();
                }, function() {

                });
        }
        $scope.closeTool = function() {
            $scope.batIsOpen = false;
        }
        $scope.getFromPub = function(id) {
            server.http.put('/api/grabcustomers?CustomerSourceId=' + id).success(function(res) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('操作成功！')
                    .position('top center')
                    .hideDelay(1000)
                );
                refreshData();
            });
        }
        $scope.paginator = {
            total: 0,
            currentPage: 1,
            perPage: 10,
            previousText: '上一页',
            nextText: '下一页',
            lastText: '最后一页',
            firstText: '首页'
        };


        $scope.pageChanged = function() {
            refreshData();
        };

        //set current page
        $scope.setCurrentPage = function() {
            $scope.paginator.currentPage = $scope.currentPage;
            refreshData();
        };
        $scope.searchItem = {
            companyName: '',
            SalesId: 0,
            phone: '',
            CustomerTypeId: 0,
            tagIds: 0,
            DepartmentId: 0,
            CustomerSourceId: 0
        };

        $scope.searchFn = function() {
            $scope.searchItem.companyName = $scope.search.companyName;
            $scope.searchItem.phone = $scope.search.phone;
            $scope.searchItem.CustomerTypeId = $scope.search.cusType;
            if (angular.isArray($scope.search.tagId)) {
                $scope.searchItem.tagIds = _.map($scope.search.tagId, 'Id').join(',')
            } else {
                $scope.searchItem.tagIds = '';
            }

            $scope.searchItem.DepartmentId = $scope.search.DepartmentId || 0;
            $scope.searchItem.SalesId = $scope.search.userid || 0;
            $scope.searchItem.CustomerSourceId = $scope.search.CustomerSourceId || 0;
            $scope.searchItem.firsttracktime = $scope.search.firsttracktime ? $scope.search.firsttracktime.toISOString() : '';
            $scope.searchItem.lasttracktime = $scope.search.lasttracktime ? $scope.search.lasttracktime.toISOString() : '';
            refreshData($scope.searchItem);
        }

        $scope.checkBQ = function() {
            console.log($scope.search.tagId, '$scope.search.tagId')
            if ($scope.search.tagId.indexOf(0) > -1 && $scope.search.tagId.length > 1) {
                _.pull($scope.search.tagId, 0);
            }
        };
        $scope.tagSelect = function(tag) {
            console.log(tag, 'tag')
            if (!angular.isArray($scope.search.tagId)) {
                return;
            }
            if ($scope.search.tagId.indexOf(tag) > -1) {

            } else {
                _.remove($scope.search.tagId, function(item) {
                    return item.TagType === tag.TagType;
                });
            }

        };

        function refreshData() {
            var deferred = $q.defer();

            var data = angular.extend({
                offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
                limit: $scope.paginator.perPage
            }, $scope.searchItem, data);
            if (data.tagIds === 0) data.tagIds = '';
            server.getMyCustomer(data).success(function(res) {
                $scope.paginator.total = res.data.total;
                $scope.customers = res.data.list;
                deferred.resolve($scope.customers[0].Id);
            });
            return deferred.promise;
        }
        refreshData();
        $scope.verifyGroup = function() {
            if ($scope.search.DepartmentId == 0) return;
            var dptId = $scope.search.DepartmentId;
            var user = _.find($scope.users, { UserId: $scope.search.userid });
            if (!user) {
                $scope.search.userid = 0;
                return;
            }
            if (user.DepartmentId != dptId) {
                $scope.search.userid = 0;
                return;
            }

        }
        server.http.get('/api/tag').success(function(res) {
            console.log(res.data, '初始tag')
            $scope.tags = res.data;
            $scope.tagGroup = _.groupBy($scope.tags, 'TagType');
            console.log($scope.tagGroup, 'tagGroup')
        });
        server.getSalers().success(function(res) {
            $scope.users = res.data;
        });
        server.http.get("/api/departments").success(function(res) {
            $scope.groups = res.data;
        });
        server.http.get('/api/customersource').success(function(res) {
            if (res.status) {
                $scope.sourceTypes = res.data;
            }
        });

        $scope.uploader2 = new FileUploader({
            url: '/api/files/4',
            autoUpload: true
        });
        $scope.uploader2.onBeforeUploadItem = function(item, progress) {
            $mdDialog.show({
                controller: ['$scope', '$interval', function(self, $interval) {
                    self.loadingText = '导入中...'

                }],
                templateUrl: 'views/common_loading.html',
                clickOutsideToClose: false,
                fullscreen: true,
                locals: { customer: item || {} }
            });
        };

        $scope.uploader2.onCompleteItem = function(fileItem, response, status, headers) {
            if (response.hasError) {
                alert(response.message);
                location.reload();
                return;
            }
            $mdDialog.hide();
            $timeout(function() {
                if (response.data.length > 0) {
                    alert(response.data.join('\n'));
                    location.reload();
                } else {
                    alert("全部导入成功！");
                    location.reload();
                }
            }, 500);
        };
        $scope.uploader2.onErrorItem = function() {
            alert('上传失败!')
        };

        // FILTERS
        $scope.uploader2.filters.push({
            name: 'customFilter',
            fn: verifyImage
        });

        function verifyImage(item, options) {
            var reg = /^.*\.(?:xls|xlsx)$/;
            if (!reg.test(item.name)) {
                alert('请选择Excel文件');
                return false;
            }
            return true;
        }
        $scope.upFile = function(id, e) {
            $scope.uploader2.url = '/api/files/4?customSourceId=' + id + '&saleId=' + $scope.user.UserId;
            $(e.target).parents('.dropdown-menu').find('input[type="file"]').click();
        }

    }
]).controller("Customer_view", ['$scope', 'server', '$mdDialog', '$mdToast', 'customer', 'user', 'getNextId',
    function($scope, server, $mdDialog, $mdToast, customer, user, getNextId) {
        $scope.postData = {};
        $scope.customer = { Id: customer.Id };
        $scope.opt = {};
        $scope.notPub = true;
        server.getCustomerType().success(function(res) {
            $scope.ctypes = res.data.sort(ctypeSortFn);
        });
        server.http.get('/api/mycity').success(function(res){
          $scope.city =res.data[0];
        });
        function ctypeSortFn(a, b) {
            return parseInt(a.Name) < parseInt(b.Name);
        }
        server.http.get('/api/customersource').success(function(res) {
            if (res.status) {
                $scope.sourceTypes = res.data;
            }
        });
        var u = user.get();
        $scope.title = customer.CompanyName || "新增客户";
        if (customer.Id) {
            getCustomerDetail(customer.Id);
        }
        $scope.next = function(item) {
            angular.element('div[ng-controller="Customer_track"]').scope().save();

            server.http.put('/api/customer/' + customer.Id + '?verify=0', $scope.postData).success(function(res) {
                if (res && angular.isObject(res.data)) {
                    var data = res.data;
                    var customers = JSON.parse(data.name);
                    $mdDialog.show({
                            controller: 'Customer_warning',
                            templateUrl: 'views/customer_warning.html',
                            clickOutsideToClose: true,
                            fullscreen: true,
                            skipHide: true,
                            locals: { customers: customers }
                        })
                        .then(function(answer) {
                            server.http.put('/api/customer/' + customer.Id + '?verify=1', $scope.postData).success(function(res) {
                                if (res.status) {
                                    getNextId(item).then(function(id) {
                                        $scope.customer.Id = id;
                                        getCustomerDetail(id);
                                    });
                                }

                            });
                        }, function() {

                        });
                } else {
                    if (res.status) {
                        getNextId(item).then(function(id) {
                            $scope.customer.Id = id;
                            getCustomerDetail(id);
                        });
                    }
                }
            });


        }
        $scope.toPub = function(item) {
            if (!confirm("确认要将客户转入公海吗？")) return;
            server.http.put('/api/custranstoocean?customerId=' + $scope.customer.Id).then(function(res) {
                if (res.status) {
                    getNextId(item).then(function(id) {
                        $scope.customer.Id = id;
                        getCustomerDetail(id);
                    });
                }
            });
        }

        function getCustomerDetail(id) {
            server.getCustomerDetail(id).success(function(res) {
                if (res.status) {
                    $scope.postData = res.data;
                    $scope.title = $scope.postData.CompanyName;
                    customer = res.data;
                    refreshTag();
                }
            });


        }
        $scope.ok = function(ev) {
            if (!customer.Id) {
                if($scope.city) $scope.postData.CityCode = $scope.city.Code;
                server.saveCustomer($scope.postData, 0).success(function(res) {
                    if (res && angular.isObject(res.data)) {
                        var data = res.data;
                        if (data.errorcode == 1) {
                            $mdToast.show(
                                $mdToast.simple()
                                .textContent(res.data.name)
                                .position('top center')
                                .hideDelay(2000)
                            );
                        } else {
                            var customers = JSON.parse(data.name);
                            $mdDialog.show({
                                    controller: 'Customer_warning',
                                    templateUrl: 'views/customer_warning.html',
                                    clickOutsideToClose: true,
                                    fullscreen: true,
                                    skipHide: true,
                                    locals: { customers: customers }
                                })
                                .then(function(answer) {
                                    server.saveCustomer($scope.postData, 1).success(function(res) {
                                        if (res.status) $mdDialog.hide();
                                    });
                                }, function() {

                                });

                        }
                    } else {
                        $mdDialog.hide($scope.postData);
                    }
                });
            } else {
                server.http.put('/api/customer/' + customer.Id, $scope.postData).success(function(res) {
                    if (res.status) {
                        $mdToast.show(
                            $mdToast.simple()
                            .textContent('修改成功！')
                            .position('top center')
                            .hideDelay(2000)
                        );
                        $mdDialog.hide($scope.postData);
                    }
                });
            }

        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        }
        $scope.addTag = function(tag) {
            var data = {
                CustomerId: customer.Id,
                TagId: tag.Id,
                SalesId: u.UserId
            }
            var index = _.indexOf($scope.tags[tag.TagType].tags, tag);
            if ($scope.tags[tag.TagType].selected === index) return;
            $scope.tags[tag.TagType].selected = index;


            var l = _.find($scope.custags, { TagType: tag.TagType });
            if (l) {
                server.http.delete('/api/customertag/' + l.Id).success(function() {
                    _addTag();
                });
                return;
            }

            _addTag();

            function _addTag() {
                server.http.post('/api/customertag', data).success(function() {
                    refreshTag();
                });
            }

        }
        $scope.deleteTag = function(tag) {
            if (tagDict) {
                var t = _.find(tagDict, { Id: tag.TagId });
                $scope.tags[t.TagType].selected = -1;
            }

            server.http.delete('/api/customertag/' + tag.Id);
        }
        $scope.track = function(item) {

            $mdDialog.show({
                    controller: 'Customer_track',
                    templateUrl: 'views/customer_track.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                    skipHide: true,
                    locals: { customer: item || {} }
                })
                .then(function(answer) {
                    //refreshData();
                }, function() {

                });
        }
        var tagDict;

        function refreshTag() {
            server.http.get('/api/customertag/' + customer.Id).success(function(res) {
                $scope.custags = res.data;
                if (!$scope.tags) {
                    getTagDict();
                }
            });
        }

        function getTagDict() {
            server.http.get('/api/tag').success(function(res) {
                var tagGroups = {};
                var curTags = $scope.custags;
                tagDict = res.data;
                _.each(res.data, function(item) {
                    var temp = _.find(curTags, function(t) {
                        return item.Id === t.TagId;
                    });

                    if (tagGroups[item.TagType]) {
                        tagGroups[item.TagType].tags.push(item);
                    } else {
                        tagGroups[item.TagType] = {
                            selected: -1,
                            tags: [item]
                        };
                    }

                    if (temp) { //如果有
                        tagGroups[item.TagType].selected = tagGroups[item.TagType].tags.length - 1;
                    }

                });
                $scope.tags = tagGroups;
            });
        }
    }
]).controller("Customer_forword", ['$scope', 'server', '$mdDialog', '$mdToast', 'customer', function($scope, server, $mdDialog, $mdToast, customer) {

    server.getSalers().success(function(res) {
        $scope.salers = res.data;
    });

    $scope.ok = function(ev) {
        if (angular.isArray(customer)) {
            server.http.put('/api/transcustomer/' + $scope.saler, customer).success(function(res) {
                if (res.status) $mdDialog.hide();
            });
        } else {
            server.http.put('/api/customer/' + customer.Id + '/' + $scope.saler).success(function(res) {
                if (res.status) $mdDialog.hide();
            });
        }

    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    }
}]).controller("Customer_track", ['$scope', '$filter', 'server', '$mdDialog', '$mdToast', 'user', function($scope, $filter, server, $mdDialog, $mdToast, user) {
    var customer = $scope.customer; //parent scope
    var u = user.get();
    $scope.track = {};
    $scope.title = customer.CompanyName;

    $scope.save = function() {
        if (!$scope.track.content) return;
        var data = {
            CustomId: customer.Id,
            Description: $scope.track.content,
            TrackDate: $filter('date')($scope.TrackDate, 'yyyy-MM-dd')
        };
        server.http.post('/api/customertrack', data).success(function() {
            $scope.track.content = "";
            refresh();
        });
    };


    $scope.cancel = function() {
        $mdDialog.cancel()
    };

    function refresh() {
        server.http.get('/api/customertrack/' + customer.Id).success(function(res) {
            $scope.tracks = res.data;
        });
    }

    $scope.$watch('customer.Id', function(newVal, oldVal) {
        if (newVal) {
            refresh();
        }
    });


}]).controller("Customer_remind", ['$scope', '$filter', 'server', '$mdDialog', '$mdToast', 'user', function($scope, $filter, server, $mdDialog, $mdToast, user) {
    var customer = $scope.customer; //parent scope
    var u = user.get();
    $scope.title = customer.CompanyName;
    $scope.today = new Date();
    $scope.remind = {};


    function getRemind() {
        server.http.get('/api/nexttrackremind/' + customer.Id).success(function(res) {
            $scope.reminds = res.data;
        });
    }
    $scope.$watch('customer.Id', function(newVal, oldVal) {
        if (newVal) {
            getRemind();
        }
    });

    $scope.addRemind = function() {
        var r = _.find($scope.reminds, function(item) {
            return $filter('date')($scope.remind.remindDate, 'yyyy-MM-dd') == item.NextTrackTime.substr(0, 10);
        });
        if (r) {
            $scope.remind.remindDate = null;
            return;
        }
        var data = {
            SalesId: u.UserId,
            CustomerId: customer.Id,
            NextTrackTime: $scope.remind.remindDate
        }
        server.http.post('/api/nexttrackremind', data).success(function() {
            getRemind();
            $scope.remind.remindDate = null;
        });
    }
    $scope.deleteRemind = function(item) {
        server.http.delete('/api/nexttrackremind/' + item.Id);
    }
    $scope.cancel = function() {
        $mdDialog.cancel()
    };


}]).controller("Customer_warning", ['$scope', '$mdDialog', 'customers', function($scope, $mdDialog, customers) {

    $scope.customers = customers;

    $scope.ok = function(item) {
        $mdDialog.hide();
    }
    $scope.cancel = function() {
        $mdDialog.cancel()
    };


}]);

angular.module('crmApp').controller('Customer_pub', ['$scope', 'server', '$state', '$mdDialog', 'FileUploader', '$timeout', '$mdToast', 'user', '$q',
  function($scope, server, $state, $mdDialog, FileUploader, $timeout, $mdToast, user, $q) {
    $scope.title = $state.current.title;
    $scope.user = user.get();

    $scope.open = function(item) {
      var tplUrl;
      if (item) {
        tplUrl = 'views/customer_view.html';
      } else {
        tplUrl = 'views/customer_addCustomer.html';
      }
      $mdDialog.show({
          controller: 'Customer_viewpub',
          templateUrl: tplUrl,
          clickOutsideToClose: true,
          fullscreen: true,
          locals: {
            customer: item || {},
            getNextId: $scope.getNextId
          },
          // preserveScope: true,
          // scope: $scope
        })
        .then(function(answer) {
          resFn(answer);
        }, function() {

        });

      function resFn(answer) {
        refreshData();
      }

    };
    $scope.getNextId = function(item) {
      var deferred = $q.defer();

      var c = _.find($scope.customers, { Id: item.Id });
      var index = _.indexOf($scope.customers, c) + 1;
      if (index < $scope.customers.length) {
        deferred.resolve($scope.customers[index].Id);
      } else {
        $scope.paginator.currentPage += 1;
        refreshData().then(function(id) {
          deferred.resolve(id);
        });
      }

      return deferred.promise;
    };
    $scope.delete = function(item) {
      if (!confirm("确认要删除客户吗？")) return;
      server.deleteCustomer(item.Id).success(function(res) {
        if (res.status) refreshData();
      });
    };

    $scope.forward = function(item) {
      server.http.put('/api/opencustomer/' + item.Id + '/6').success(function(res) {
        if (res.status) {
          $mdToast.show(
            $mdToast.simple()
            .textContent('操作成功！')
            .position('top center')
            .hideDelay(1000)
          );
          refreshData();
        }
      });
    }

    $scope.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 10,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
    };

    $scope.searchParams = {
      limit: 10,
      offset: 0,
      start: '',
      end: '',
      status: 0,
      cusname: '',
      cid: ''
    };
    $scope.pageChanged = function() {
      refreshData();
    };

    //set current page
    $scope.setCurrentPage = function() {
      $scope.paginator.currentPage = $scope.currentPage;
      refreshData();
    };
    $scope.searchItem = {
      companyName: '',
      Mobile: '',
      HisCusTypeId: 0
    };
    server.http.get('/api/cuscategory').success(function(res) {
      if (res.status) $scope.ctypes = res.data.sort(ctypeSortFn);
    });

    function ctypeSortFn(a, b) {
      return parseInt(a.Name) < parseInt(b.Name);
    }
    $scope.search = {
      cusType: 0
    };
    $scope.search = function() {
      $scope.searchItem.companyName = $scope.search.companyName;
      $scope.searchItem.Mobile = $scope.search.phone;
      $scope.searchItem.HisCusTypeId = $scope.search.cusType;
      refreshData($scope.searchItem);
    }

    function refreshData() {
      var data = angular.extend({
        offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
        limit: $scope.paginator.perPage
      }, $scope.searchItem, data);
      server.http.get('/api/opencustomer?' + $.param(data)).success(function(res) {
        $scope.paginator.total = res.data.total;
        $scope.customers = res.data.list;
      });
    }
    refreshData();

    server.http.get('/api/customersource').success(function(res) {
      if (res.status) {
        $scope.sourceTypes = res.data;
      }
    });


  }
]).controller("Customer_viewpub", ['$scope', 'server', '$mdDialog', '$mdToast', 'customer', 'getNextId',
  function($scope, server, $mdDialog, $mdToast, customer, getNextId) {
    $scope.postData = { CustomerTypeId: 5 };
    $scope.isPub = true; //是否是公海
    $scope.customer = { Id: customer.Id };
    server.getCustomerType().success(function(res) {
      $scope.ctypes = res.data;
    });
    server.http.get('/api/customersource').success(function(res) {
        if (res.status) {
            $scope.sourceTypes = res.data;
        }
    });
    $scope.title = customer.CompanyName || "新增客户";

    function getCustomerDetail(id) {
      if (!id) return;
      server.getCustomerDetail(id).success(function(res) {
        if (res.status) {
          $scope.postData = _.extend($scope.postData, res.data);
          $scope.title = $scope.postData.CompanyName;
        }
      });
      refreshTag();
    }
    getCustomerDetail(customer.Id);
    $scope.next = function(item) {
      angular.element('div[ng-controller="Customer_track"]').scope().save();
      if (!customer.Id) {
        server.saveCustomer($scope.postData, 0).success(function(res) {
          if (res && res.data.errorcode) {
            if (res.data.errorcode == 1) {
              $mdToast.show(
                $mdToast.simple()
                .textContent(res.data.name)
                .position('top center')
                .hideDelay(2000)
              );
            } else {
              if (confirm('手机号码与"' + res.data.name + '"公司的重复，请确定是否继续提交！')) {
                server.saveCustomer($scope.postData, 0).success(function(res) {
                  getNextId(item).then(function(id) {
                    $scope.customer.Id = id;
                    getCustomerDetail(id);
                  });
                })
              };
            }
          } else {
            getNextId(item).then(function(id) {
              $scope.customer.Id = id;
              getCustomerDetail(id);
            });
          }
        });
      } else {
        server.http.put('/api/customer/' + customer.Id, $scope.postData).success(function(res) {
          if (res.status) {
            getNextId(item).then(function(id) {
              $scope.customer.Id = id;
              getCustomerDetail(id);
            });
          }
        });
      }

    }
    $scope.ok = function(ev) {
      if (!customer.Id) {
        server.saveCustomer($scope.postData, 0).success(function(res) {
          if (res && res.data.errorcode) {
            if (res.data.errorcode == 1) {
              $mdToast.show(
                $mdToast.simple()
                .textContent(res.data.name)
                .position('top center')
                .hideDelay(2000)
              );
            } else {
              if (confirm('手机号码与"' + res.data.name + '"公司的重复，请确定是否继续提交！')) {
                server.saveCustomer($scope.postData, 0).success(function(res) {
                  if (res.status) $mdDialog.hide($scope.postData);
                })
              };
            }
          } else {
            $mdDialog.hide($scope.postData);
          }
        });
      } else {
        server.http.put('/api/customer/' + customer.Id, $scope.postData).success(function(res) {
          if (res.status) {
            $mdToast.show(
              $mdToast.simple()
              .textContent('修改成功！')
              .position('top center')
              .hideDelay(2000)
            );
            $mdDialog.hide();
          }
        });
      }

    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    }


    function refreshTag() {
      if (!customer.Id) return;
      server.http.get('/api/customertag/' + customer.Id).success(function(res) {
        $scope.custags = res.data;
      });
    }
  }
]).controller("Customer_rob", ['$scope', 'server', '$mdDialog', '$mdToast', 'customer', function($scope, server, $mdDialog, $mdToast, customer) {

  server.getCustomerType().success(function(res) {
    $scope.ctypes = res.data;
  });
  var isRefresh = false;
  $scope.ok = function(ev) {
    server.http.put('/api/opencustomer/' + customer.Id + '/' + $scope.cusType).success(function(res) {
      isRefresh = true;
      if (res.status) {
        $mdToast.show(
          $mdToast.simple()
          .textContent('操作成功！')
          .position('top center')
          .hideDelay(1000)
        );
        $mdDialog.hide();
      }
    });
  };
  $scope.cancel = function() {
    if (isRefresh)
      $mdDialog.hide();
    else
      $mdDialog.cancel();
  }
}]);

angular.module('crmApp').controller('OrderAddAgent', ['$scope', '$state', 'server', '$filter', 'FileUploader', '$mdDialog', '$mdToast', '$timeout', 'user', '$uibModal',
    function ($scope, $state, server, $filter, FileUploader, $mdDialog, $mdToast, $timeout, user, $uibModal) {
        $scope.user = user.get();
        server.http.get('/api/mycity').success(function (res) {
            $scope.city = res.data[0];
        });
        if ($scope.orderid) {
            server.http.get('/api/contractdetail/' + $scope.orderid).success(function (res) {
                if (res.status) {

                    $scope.cStep = 2;
                    if ($scope.isRemind) {
                        $scope.postData.Customer = res.data.Customer;
                        $scope.postData.Category = 1;

                    } else {
                        $scope.postData = res.data;
                        $scope.postData.ContractDate = $filter('fDate')($scope.postData.ContractDate);
                        $scope.postData.ServiceStart = $filter('fDate')($scope.postData.ServiceStart);
                        $scope.postData.ServiceEnd = $filter('fDate')($scope.postData.ServiceEnd);
                        //if ($scope.postData.ServiceEnd.substring(0, 4) == '0001') $scope.postData.ServiceEnd = '';
                    }
                    var postData = $scope.postData;

                    if ($scope.isChange) {
                        postData.FreChangeOrderId = postData.OrderId;
                        delete postData.OrderId;
                        postData.Customer.AddedValue = 2;
                        postData.ServiceStart = null;
                        postData.Amount = '';
                        changePrice();
                    }
                    postData.Customer.RegisterDate = $filter('fDate')(postData.Customer.RegisterDate);
                    postData.Customer.BusnissDeadline = $filter('fDate')(postData.Customer.BusnissDeadline);
                    postData.Customer.NoDeadLine = !!postData.Customer.NoDeadLine;

                    if ($scope.isRemind) {
                        $scope.otherData = {
                            ServiceContent: "记账报税"
                        };
                    } else if ($scope.isChange) {
                        $scope.otherData = {
                            ServiceContent: "产品变更"
                        };
                    } else {
                        $scope.otherData = $scope.postData.StatementInfo;
                    }

                    if ($scope.postData.ServiceEnd)
                        $scope.maxDate = new Date($scope.postData.ServiceEnd);
                    if (postData.IsChange) {
                        postData.Customer.AddedValue = 1;
                    }
                }
            });
        }
        if ($scope.$parent && $scope.$parent.orderForm) {
            $scope.orderForm = $scope.$parent.orderForm;
        }
        $scope.postData = {
            Customer: {}
        };
        $scope.otherData = {
            ServiceContent: "记账报税"
        };
        $scope.timeoption = {
            timezone: 'UTC'
        }
        var tempData;
        server.getSalers().success(function (res) {
            $scope.salers = res.data;
            setSaler();
        });
        server.getIndustry().success(function (res) {
            $scope.industries = res.data;
        });
        server.http.get('/api/paymodes').success(function (res) {
            $scope.paymodes = res.data;
        });

        function setSaler() {
            if (!$scope.salers) return;
            if (!$scope.postData.SalesId) return;
            var saler = _.find($scope.salers, {
                UserId: $scope.postData.SalesId
            });
            if (!saler) {
                $scope.salers.push({
                    UserId: $scope.postData.SalesId,
                    RealName: $scope.postData.SalesName,
                    disabled: true
                });
            }
        }
        $scope.selectSalers = function () {
            if ($scope.cStep > 0) return;
            if (!$scope.orderid) $scope.cStep = 0;
        }
        $scope.selectTypeStep = function (type) {
            if ($scope.orderid) return;
            $scope.cStep = 1;
        }
        $scope.getAmount = function () { //其他服务总金额
            $scope.otherData.AccountsTax = +$scope.postData.Amount;
            var postData = _.pick($scope.otherData, 'AccountsTax', 'ServiceCharge', 'TaxPayment', 'AnnualReport', 'Register', 'OpenBank', 'NationLocalTax', 'Prints', 'AddressCost', 'Change');
            var all = 0;
            _.each(postData, function (value) {
                all += +(value || 0);
            });
            return all;
        }

        $scope.selectCustomer = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/Order_cusSelect.html',
                controller: 'Order_cusSelect',
                size: 'lg',
            });
            modalInstance.result.then(function (result) {
                $scope.postData.Customer = result;
                if (result.AreaCode) {
                    $scope.areaSele = result.AreaCode;
                }
            }, function () {

            });
        }
        $scope.selectCustomerStep = function (type) {
            if (type == 1) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/Order_cusSelect.html',
                    controller: 'Order_cusSelect',
                    size: 'lg',
                });
                modalInstance.result.then(function (customer) {
                    $scope.postData.Customer = customer;
                    $scope.postData.Customer.RegisterDate = $filter('fDate')($scope.postData.Customer.RegisterDate);
                    $scope.postData.Customer.BusnissDeadline = $filter('fDate')($scope.postData.Customer.BusnissDeadline);
                    $scope.postData.Customer.NoDeadLine = !!$scope.postData.Customer.NoDeadLine;
                    $scope.cStep = 2;
                }, function () {

                });

            } else {
                var cate = $scope.postData.Category;
                if (tempData) {
                    tempData.SalesId = $scope.postData.SalesId;
                    $scope.postData = tempData;
                }
                $scope.postData.Category = cate;
                $scope.cStep = 2;
            }
            tempData = angular.copy($scope.postData);
        }

        server.http.get('/api/gift').success(function (res) {
            $scope.gifts = res.data;
        });

        var uploadUrl = 'https://pilipa.oss-cn-beijing.aliyuncs.com';

        server.http.get('/api/signkey').success(function (res) {
            delete res.data.Filename;
            delete res.data.key;
            delete res.data.callback;
            delete res.data.expire;
            delete res.data.Host;
            $scope.signkey = res.data;
        });

        $scope.uploader1 = new FileUploader({
            url: uploadUrl,
            autoUpload: true
        });
        $scope.uploader1.onCompleteItem = function (fileItem, response, status, headers) {
            $scope.postData.Customer.PersonCardPath =  uploadUrl + '/' + $scope._key1;
        };
        $scope.uploader1.onBeforeUploadItem = function (item) {
            bindFormData(item, 1, 1);
        };
        $scope.uploader1.onErrorItem = function () {
            alert('上传失败!')
        };
        $scope.uploader1.filters.push({
            name: 'customFilter',
            fn: verifyImage
        });

        $scope.uploader2 = new FileUploader({
            url: uploadUrl,
            autoUpload: true
        });
        $scope.uploader2.onCompleteItem = function (fileItem, response, status, headers) {
            $scope.postData.Customer.BusinessLicense = uploadUrl + '/' + $scope._key2;
        };
        $scope.uploader2.onBeforeUploadItem = function (item) {
            bindFormData(item, 2, 2);
        };
        $scope.uploader2.onErrorItem = function () {
            alert('上传失败!')
        };
        $scope.uploader2.filters.push({
            name: 'customFilter',
            fn: verifyImage
        });

        function bindFormData(item, up, type) {
            var key = buildKey(type, item.file.name);
            item.formData.push({
                key: key
            });
            _.each($scope.signkey, function (value, key) {
                var temp = {};
                temp[key] = value;
                item.formData.push(temp);
            });
            $scope['_key' + up] = key;
        }

        function buildKey(type, fileName) {
            var randomFilename = "";

            var get_suffix = function (filename) {
                var suffix = '';
                var pos = filename.lastIndexOf('.');

                if (pos != -1) {
                    suffix = filename.substring(pos)
                }
                return suffix;
            };
            var random_string = function (len) {
                len = len || 32;
                var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                var maxPos = chars.length;
                var pwd = '';
                for (var i = 0; i < len; i++) {
                    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            };

            var suffix = get_suffix(fileName);
            var typMap = {
                1: 'FileUploads/Order/CardID/',
                2: 'FileUploads/Order/BusinessLicense/',
                3: 'FileUploads/Order/Contract/',
                4: 'FileUploads/Agent/'
            }
            var nowstr = $filter('date')(new Date(), 'yyyyMM');
            var g_object_name = typMap[type] + nowstr + '/' + random_string(10) + suffix;
            return g_object_name;
        }

        $scope.save = function () {
            $scope.saving = true;
            if ($scope.city) $scope.postData.Customer.CityCode = $scope.city.Code;
            if ($scope.postData.GiftTypeId) {
                var gift = _.find($scope.gifts, function (item) {
                    return item.Id === +$scope.postData.GiftTypeId;
                });
                $scope.postData.GiftTypeId = gift.Id;
                $scope.postData.GiftTypeName = gift.GiftTypeName;
            }
            if ($scope.postData.Customer.NoDeadLine)
                $scope.postData.Customer.NoDeadLine = 1;
            else
                $scope.postData.Customer.NoDeadLine = 0;

            if ($scope.postData.ServiceStart)
                $scope.postData.ServiceStart = $filter('date')($scope.postData.ServiceStart, 'yyyy-MM');
            if ($scope.postData.Category == 1 || $scope.postData.Status == 2 || $scope.supp) {
                if ((!$scope.postData.Customer.BusnissDeadline) && (!$scope.postData.Customer.NoDeadLine)) {
                    alert('请输入完整营业期限！');
                    $scope.saving = false;
                    return;
                }
            }
            if ($scope.postData.Category == 2 && !$scope.postData.Customer.PersonCardPath) {
                alert('请上传法人身份证!');
                $scope.saving = false;
                return;
            }
            // if (($scope.postData.Category == 1 || $scope.supp) && !$scope.postData.Customer.BusinessLicense) {
            //     alert('请上传营业执照!');
            //     return;
            // }
            if ($scope.postData.IsChange) {
                $scope.postData.Customer.AddedValue = 2;
            }
            var postData = $scope.postData;
            var otherData = $scope.otherData;

            otherData.PayId = postData.PayId;
            otherData.SalesId = postData.SalesId;
            otherData.SumAccount = $scope.getAmount();
            if (!otherData.ServiceContent) otherData.ServiceContent = '记帐报税';
            $scope.postData.StatementInfo = otherData;

            if ($scope.postData.OrderId) {
                if ($scope.supp) {
                    server.http.put('/api/supplementaryinfo', $scope.postData).success(function (res) {
                        afterResult(res);
                    });
                } else {
                    server.http.put('/api/contract/' + $scope.postData.OrderId, $scope.postData).success(function (res) {
                        afterResult(res);
                    });
                }

            } else {
                if ($scope.isChange) {
                    server.http.post('/api/signacontract', $scope.postData).success(function (res) {
                        afterResult(res, true);
                    });
                    return;
                }
                server.http.post('/api/contract', $scope.postData).success(function (res) {
                    afterResult(res, true);
                });
            }

        }

        function afterResult(res, isOuter) {
            $scope.saving = false;
            if (res.status) {

                if ($scope.ok) $scope.ok();
                if (isOuter) {
                    if (!$scope.postData.Customer.Id)
                        $scope.postData.Customer.Id = res.data.CustomerId;
                    var confirm = $mdDialog.confirm()
                        .title('您需要添加外勤任务吗?')
                        .textContent('')
                        .ok('添加')
                        .cancel('不添加');

                    $mdDialog.show(confirm).then(function () {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'views/order_outworker_add.html',
                            controller: 'Order_outworker_add',
                            backdrop: 'static',
                            size: 'hg',
                            resolve: {
                                customer: function(){
                                  return $scope.postData.Customer;
                                }
                            }
                        });
                        modalInstance.result.then(function (result) {
                            jumpToList();
                        }, function () {
                            jumpToList();
                        });
                    }, function () {
                        jumpToList();
                    });

                } else {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('保存成功！')
                        .position('top center')
                        .hideDelay(2000)
                    );
                    jumpToList();
                }
            }

            function jumpToList() {
                $timeout(function () {
                    $state.go('main.order_list');
                }, 10);
            }
        }

        // function otherServiceSave(res) {
        //     var postData = $scope.postData;
        //     var otherData = $scope.otherData;
        //     otherData.AccountsTax = postData.Amount;
        //     otherData.CustomerId = res.data.CustomerId;
        //     otherData.PayId = postData.PayId;
        //     otherData.SalesId = postData.SalesId;
        //     otherData.SumAccount = $scope.getAmount();
        //     otherData.BillTime = postData.ContractDate;
        //     if (otherData.SumAccount > 0) {
        //         server.http.post('/api/statement', otherData).success(function(res) {
        //             afterResult(res);
        //         });
        //     }

        // }

        $scope.getPrice = function () {
            if (!$scope.postData.Customer.AddedValue) return;
            if (!$scope.postData.PayType) return;
            var param = {
                AddedValue: $scope.postData.Customer.AddedValue,
                PayType: $scope.postData.PayType
            }
            server.http.get('/api/order/price?' + $.param(param)).success(function (res) {
                $scope.postData.Amount = res.data;
            });
        }
        $scope.setChangePrice = function () {
            var postData = $scope.postData;
            if (!postData.ServiceStart) return;
            if (!postData.ServiceEnd) return;
            var end = new Date(postData.ServiceEnd);
            var start = new Date(postData.ServiceStart);
            var month = 1 + ((end.getYear() - start.getYear()) * 12 + end.getMonth() - start.getMonth());
            postData.Amount = +(($scope.cjPrice * month).toFixed(2));
        }
        $scope.maxDate = new Date('2029-12-31');


        $scope.setEndDate = function () {
            if (!$scope.postData.PayType) return;
            if (!$scope.postData.ServiceStart) return;
            if ($scope.isChange) {
                $scope.setChangePrice();
                return;
            }

            var dmap = {
                1: 5,
                2: 11,
                3: 2,
                4: 5,
                5: 12,
                6: 12
            }; // 付款方式
            var addMonth = dmap[$scope.postData.PayType];
            if ($scope.postData.GiftTypeId) {
                var gift = _.find($scope.gifts, function (item) {
                    return item.Id === +$scope.postData.GiftTypeId;
                });
                addMonth = addMonth + gift.MonthNum;
            }

            var date = new Date($scope.postData.ServiceStart);
            var enddate = new Date(date.setMonth(date.getMonth() + addMonth));

            $scope.postData.ServiceEnd = $filter('date')(enddate, 'yyyy-MM');
        }


        function verifyImage(item, options) {
            var reg = /^.*\.(?:png|jpg|bmp|gif|jpeg)$/;
            if (!reg.test(item.name)) {
                alert('请选择图片');
                return false;
            }
            return true;
        }

        function changePrice() {

            var xgmPrice, ybnPrice;
            server.http.get('/api/order/price?' + $.param({
                AddedValue: 1,
                PayType: 1
            })).success(function (res) {
                xgmPrice = (res.data / 6).toFixed(2);
                setChangePrice();
            });
            server.http.get('/api/order/price?' + $.param({
                AddedValue: 2,
                PayType: 1
            })).success(function (res) {
                ybnPrice = (res.data / 6).toFixed(2);
                setChangePrice();
            });

            function setChangePrice() {
                if (!xgmPrice) return;
                if (!ybnPrice) return;
                $scope.cjPrice = (ybnPrice - xgmPrice).toFixed(2);
            }
        }
    }
]).controller("Order_cusSelect", ['$scope', 'server', '$mdDialog', '$mdToast', function ($scope, server, $mdDialog, $mdToast) {



    $scope.search = {
        CompanyName: ''
    };


    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    };

    $scope.searchParams = {
        limit: 10,
        offset: 0,
        start: '',
        end: '',
        status: 0,
        cusname: '',
        cid: ''
    };
    $scope.pageChanged = function () {
        refreshData();
    };

    //set current page
    $scope.setCurrentPage = function () {
        $scope.paginator.currentPage = $scope.currentPage;
        refreshData();
    };
    $scope.searchItem = {
        companyname: ''
    };
    $scope.search = function () {
        $scope.searchItem.companyname = $scope.search.CompanyName;
        refreshData();
    }

    function refreshData() {
        var data = angular.extend({
            offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
            limit: $scope.paginator.perPage
        }, $scope.searchItem);
        server.http.get('/api/order/customer?' + $.param(data)).success(function (res) {
            $scope.paginator.total = res.data.total;
            $scope.customers = res.data.list;
        });
    }
    refreshData();


    $scope.select = function (item) {
        $mdDialog.hide(item);
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    }
}]);

angular.module('crmApp').controller('Dashboard', ['$scope', '$state', 'user', 'menu', 'server', '$filter', '$mdDialog', '$q',
  function($scope, $state, user, menu, server, $filter, $mdDialog, $q) {
    $scope.sections = menu.sections;
    $scope.user = user.get();
    $scope.rmd = {};
    $scope.rmd.DQdate = new Date();
    $scope.getRemind = function() {
      server.http.get('/api/nexttrackremind?DQdate=' + $scope.rmd.DQdate.toISOString()).success(function(res) {
        //var today = $filter('date')(new Date(), 'yyyy-MM-dd');
        $scope.reminds = res.data;
      });
    };
    if ($scope.user.IsCenter) {
      if ($scope.user.RoleId === 4) {
        $state.go('main.site_ps');
      } else {
        server.http.get('/api/subsidiary').success(function(res) {
          $scope.companies = res.data.list;
        });
      }

    } else {
      $scope.timeoption = {
        timezone: 'UTC'
      }
      
      $scope.getRemind();
      if ($scope.user.RoleId == 11 || $scope.user.RoleId == 7 || $scope.user.RoleId == 9) {
        ranking();
      }
    }
    
    $scope.showNext = true;
    $scope.open = function(item) {
      var customer = angular.copy(item);
      customer.Id = customer.CustomerId;
      $mdDialog.show({
          controller: 'Customer_view',
          templateUrl: 'views/customer_view.html',
          clickOutsideToClose: true,
          fullscreen: true,
          locals: { customer: customer || {}, getNextId: $scope.getNextId }
        })
        .then(function(answer) {
          refreshData();
        }, function() {

        });
    };
    $scope.getNextId = function(item) {
      var deferred = $q.defer();

      var c = _.find($scope.reminds, { CustomerId: item.Id });
      var index = _.indexOf($scope.reminds, c) + 1;
      if (index < $scope.reminds.length) {
        deferred.resolve($scope.reminds[index].CustomerId);
      } else {
        alert('没有下一个了。');
        deferred.reject();
      }

      return deferred.promise;

    }

    $scope.track = function(item) {
      var customer = angular.copy(item);
      customer.Id = customer.CustomerId;
      $mdDialog.show({
          controller: 'Customer_track',
          templateUrl: 'views/customer_track.html',
          clickOutsideToClose: true,
          fullscreen: true,
          locals: { customer: customer || {} }
        })
        .then(function(answer) {
          refreshData();
        }, function() {

        });
    }
    $scope.forward = function(item) {
      var customer = angular.copy(item);
      customer.Id = customer.CustomerId;
      $mdDialog.show({
          controller: 'Customer_forword',
          templateUrl: 'views/customer_forward.html',
          clickOutsideToClose: true,
          fullscreen: true,
          locals: { customer: customer || {} }
        })
        .then(function(answer) {
          refreshData();
        }, function() {

        });
    }
    $scope.toPub = function(customer) {
      if (!confirm("确认要将客户转入公海吗？")) return;
      server.http.put('/api/custranstoocean?customerId=' + customer.CustomerId).success(function(res) {
        if (res.status) refreshData();
      });
    };


    $scope.enter = function(item) {
      server.http.put('/api/subsidiary/entrance?SubsidiaryId=' + item.SubsidiaryId).success(function(res) {
        server.http.get('/api/users/functionlist').success(function(res) {
          var menu = [];
          var last;
          _.each(res.data, function(item) {
            if (item.FunctionLevel == 1) {
              menu.push(item);
              item.children = [];
              last = item;
            } else {
              last.children.push(item)
            }
          });
          user.FunctionList = JSON.stringify(menu);
          user.IsCenter = 0;
          user.se = 1;
          user.set(user);
          location.reload();

        });
      });
    }


    function ranking() {
      var now = new Date();
      var endstr = $filter('date')(now, 'yyyy-MM-dd');
      var y = now.getFullYear();
      var m = now.getMonth();
      var yearStart = new Date(y + '-1-1');

      var halfStart;
      if (m > 5) {
        halfStart = new Date(y + '-7-1');
      }
      var quarterStart = new Date(y + '-' + (Math.floor(m / 3) * 3 + 1) + '-1');
      var monthStart = new Date()
      monthStart.setDate(1);
      server.http.get('/api/allsalestop?startDate=' + $filter('date')(yearStart, 'yyyy-MM-dd') + '&endDate=' + endstr).success(function(res) {
        $scope.year = res.data;
        if (!halfStart) $scope.halfyear = res.data;
      });
      if (halfStart) {
        server.http.get('/api/allsalestop?startDate=' + $filter('date')(halfStart, 'yyyy-MM-dd') + '&endDate=' + endstr).success(function(res) {
          $scope.halfyear = res.data;
        });
      }
      server.http.get('/api/allsalestop?startDate=' + $filter('date')(quarterStart, 'yyyy-MM-dd') + '&endDate=' + endstr).success(function(res) {
        $scope.quarter = res.data;
      });
      server.http.get('/api/allsalestop?startDate=' + $filter('date')(monthStart, 'yyyy-MM-dd') + '&endDate=' + endstr).success(function(res) {
        $scope.month = res.data;
      });

    }
  }
]);


(function() {
    angular.module('crmApp').controller('Company_sub', ['$scope', 'server', '$state', '$mdDialog', function($scope, server, $state, $mdDialog) {
        $scope.title = $state.current.title;
        $scope.open = function(item) {
            $mdDialog.show({
                    controller: 'Company_view',
                    templateUrl: 'views/company_add.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: { customer: item || {} }
                })
                .then(function(answer) {
                    refreshData();
                }, function() {

                });
        };
        $scope.delete = function(item) {
            server.delete(item.CustomerId);
        };
        $scope.track = function(item) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/customer_track.html',
                controller: 'CustomerTrack',
                size: "lg",
                resolve: {
                    customer: function() {
                        return item;
                    }
                },
                backdrop: 'static'
            });

            modalInstance.result.then(function(result) {
                refreshData();
            }, function() {
                refreshData();
            });
        }
        $scope.forward = function(item) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/customer_forword.html',
                controller: 'CustomerForward',
                size: "lg",
                resolve: {
                    customer: function() {
                        return item;
                    }
                },
                backdrop: 'static'
            });

            modalInstance.result.then(function(result) {
                refreshData();
            }, function() {

            });
        }



        function refreshData() {
           server.http.get('/api/subsidiary').success(function(res){
                $scope.companies = res.data.list;
           });
        }
        refreshData();


    }]).controller("Company_view", ['$scope', 'server', '$mdDialog', '$mdToast', '$http', 'customer', function($scope, server, $mdDialog, $mdToast, $http, customer) {
        $scope.postData = {};
        $scope.title = customer.CompanyName || "新增公司";
        if (customer.SubsidiaryId) {
            $scope.postData = _.extend($scope.postData, customer);
        }
        $http.get('/api/city').success(function(res){
          $scope.cities = res.data;
        });
        $scope.ok = function(ev) {
            if (!customer.SubsidiaryId) {
                $scope.postData.PassWord = '111111'
                server.saveCompany($scope.postData, 0).success(function(res) {
                    if (res && res.data.errorcode) {
                        if (res.data.errorcode == 1) {
                            $mdToast.show(
                                $mdToast.simple()
                                .textContent(res.data.name)
                                .position('top center')
                                .hideDelay(2000)
                            );
                        } else {
                            if (confirm('手机号码与"' + res.data.name + '"公司的重复，请确定是否继续提交！')) {
                                server.saveCustomer($scope.postData, 0).success(function(res) {
                                    if (res.status) $mdDialog.hide();
                                })
                            };
                        }
                    } else {
                        $mdDialog.hide();
                    }
                });
            } else {
                $http.put('/api/subsidiary/' + customer.SubsidiaryId, $scope.postData).success(function(res) {
                    if (res.status) {
                        $mdToast.show(
                            $mdToast.simple()
                            .textContent('修改成功！')
                            .position('top center')
                            .hideDelay(2000)
                        );
                        $mdDialog.hide();
                    }
                });
            }

        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        }
    }]);
})(angular);

angular.module('crmApp').controller('Customer_setting', ['$scope', 'server', '$timeout', function($scope, server, $timeout) {

    $scope.save = function() {
        //$scope.settings.ChannelId = channel.ChannelId;
        server.http.put('/api/cuscategory', $scope.settings).success(function() {
            alert('保存成功！');
        });
    };
    server.getCustomerType().success(function(res) {
        $scope.settings = res.data.sort(ctypeSortFn);
    });

    function ctypeSortFn(a, b) {
        return parseInt(a.Name) < parseInt(b.Name);
    }

}]);

(function() {
    angular.module('crmApp').controller('Customer_signed', ['$scope', 'server', '$state', '$mdDialog', '$q', 'user', function($scope, server, $state, $mdDialog, $q, user) {
        $scope.title = $state.current.title;
        $scope.user = user.get();
        $scope.open = function(item) {
            var tplUrl;
            if (item) {
                tplUrl = 'views/customer_view.html';
            } else {
                tplUrl = 'views/customer_addCustomer.html';
            }
            $mdDialog.show({
                    controller: 'Customer_view',
                    templateUrl: tplUrl,
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: {
                        customer: item || {},
                        getNextId: $scope.getNextId
                    }
                })
                .then(function(answer) {
                    resFn(answer);
                }, function() {

                });

            function resFn(answer) {
                refreshData();
            }
        };
        $scope.service = function(item) {
            $mdDialog.show({
                    controller: 'Customer_viewService',
                    templateUrl: 'views/customer_viewservice.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: {
                        customer: item || {},
                        getNextId: $scope.getNextId
                    }
                })
                .then(function(answer) {
                    resFn(answer);
                }, function() {

                });
        }
        $scope.getNextId = function(item) {
            var deferred = $q.defer();

            var c = _.find($scope.customers, { Id: item.Id });
            var index = _.indexOf($scope.customers, c) + 1;
            if (index < $scope.customers.length) {
                deferred.resolve($scope.customers[index].Id);
            } else {
                $scope.paginator.currentPage += 1;
                refreshData().then(function(id) {
                    deferred.resolve(id);
                });
            }

            return deferred.promise;
        };
        $scope.others = function(item) {
            $mdDialog.show({
                    controller: 'Order_statement_add',
                    templateUrl: 'views/order_statement_add.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: { customer: item }
                })
                .then(function(answer) {

                }, function() {

                });
        };
        $scope.toOthersAll = function() {
            var ids = _.map(_.filter($scope.customers, { selected: true }), 'Id');
            $mdDialog.show({
                    controller: 'Customer_forword',
                    templateUrl: 'views/customer_forward.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: { customer: ids || [] }
                })
                .then(function(answer) {
                    refreshData();
                }, function() {

                });
        }
        $scope.closeTool = function() {
            $scope.batIsOpen = false;
        }
        $scope.xufei = function(item) {
            server.http.get('/api/orderbycusid?customerid=' + item.Id).success(function(res) {
                var order = _.last(res.data);
                $mdDialog.show({
                        controller: 'Order_remind_order',
                        templateUrl: 'views/order_view.html',
                        clickOutsideToClose: true,
                        fullscreen: true,
                        // locals: { orderid: item.}
                        locals: { orderid: order.OrderId }
                    })
                    .then(function(answer) {
                        refreshData();
                    }, function() {

                    });
            });

        }
        $scope.paginator = {
            total: 0,
            currentPage: 1,
            perPage: 10,
            previousText: '上一页',
            nextText: '下一页',
            lastText: '最后一页',
            firstText: '首页'
        };

        $scope.search = {
            companyName: '',
            phone: ''
        };
        $scope.pageChanged = function() {
            refreshData();
        };

        //set current page
        $scope.setCurrentPage = function() {
            $scope.paginator.currentPage = $scope.currentPage;
            refreshData();
        };
        $scope.searchItem = {
            companyName: '',
            Mobile: '',
            salesId: 0
        };
        $scope.search = function() {
            $scope.searchItem.companyName = $scope.search.companyName;
            $scope.searchItem.Mobile = $scope.search.phone;
            $scope.searchItem.salesId = $scope.search.salesId || 0;
            refreshData($scope.searchItem);
        }

        function refreshData() {
            var data = angular.extend({
                offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
                limit: $scope.paginator.perPage
            }, $scope.searchItem, data);
            server.http.get('/api/customer/bill?' + $.param(data)).success(function(res) {
                $scope.paginator.total = res.data.total;
                $scope.customers = res.data.list;
            });
        }
        server.getSalers().success(function(res) {
            $scope.users = res.data;
        });
        refreshData();


    }]).controller("Customer_viewService", ['$scope', '$filter', 'server', '$mdDialog', 'customer', function($scope, $filter, server, $mdDialog, customer) {

        server.http.get('/api/statementbycusid?customerid=' + customer.Id).success(function(res) {
            $scope.statements = res.data;
        });
        server.http.get('/api/maintaskbyid?customerid=' + customer.Id).success(function(res) {
            $scope.outworkers = res.data;
        });
        server.http.get('/api/orderbycusid?customerid=' + customer.Id).success(function(res) {
            $scope.orders = res.data;
        });
        $scope.cancel = function() {
            $mdDialog.cancel()
        };

        $scope.detail = function(item) {
            var tplUrl;

            $mdDialog.show({
                    controller: 'Order_outworker_detail',
                    templateUrl: 'views/order_outworker_detail.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                    skipHide: true,
                    locals: {
                        taskId: item.Id,
                    }

                })
                .then(function(answer) {
                    resFn(answer);
                }, function() {

                });

            function resFn(answer) {
                //refreshData();
            }
        };
        $scope.open = function(item) {
            $mdDialog.show({
                    controller: 'Order_view',
                    templateUrl: 'views/order_view.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                    skipHide: true,
                    locals: { orderid: item.OrderId }
                })
                .then(function(answer) {
                    refreshData();
                }, function() {

                });
        };
        $scope.openOri = function(OrderId) {
            $mdDialog.show({
                    controller: 'Order_view',
                    templateUrl: 'views/order_view.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                    skipHide: true,
                    locals: { orderid: OrderId }
                })
                .then(function(answer) {
                    refreshData();
                }, function() {

                });
        }

    }]);
})(angular);

angular.module('crmApp').controller('Order_list', ['$scope', 'server', '$mdDialog', function($scope, server, $mdDialog) {

    $scope.open = function(item) {
        $mdDialog.show({
                controller: 'Order_view',
                templateUrl: 'views/order_view.html',
                clickOutsideToClose: true,
                fullscreen: true,
                locals: { orderid: item.OrderId }
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    };

    $scope.search = {
        companyname: 0,
        starttime:'',
        endtime:'',
        PayType: '0',
        AddedValue: '0'
    };
    $scope.delete = function(item) {
        if (!confirm("确认要删除客户吗？")) return;
        server.http.delete('/api/contract/' + item.OrderId).success(function(res) {
            if (res.status) refreshData();
        });
    };
    $scope.openOri = function(OrderId) {
        $mdDialog.show({
                controller: 'Order_view',
                templateUrl: 'views/order_view.html',
                clickOutsideToClose: true,
                fullscreen: true,
                locals: { orderid: OrderId }
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    }
    $scope.track = function(item) {
        $mdDialog.show({
                controller: 'Customer_track',
                templateUrl: 'views/customer_track.html',
                clickOutsideToClose: true,
                fullscreen: true,
                locals: { customer: item || {} }
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    }
    $scope.forward = function(item) {
        $mdDialog.show({
                controller: 'Customer_forword',
                templateUrl: 'views/customer_forward.html',
                clickOutsideToClose: true,
                fullscreen: true,
                locals: { customer: item || {} }
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    }

    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    };


    $scope.pageChanged = function() {
        refreshData();
    };

    //set current page
    $scope.setCurrentPage = function() {
        $scope.paginator.currentPage = $scope.currentPage;
        refreshData();
    };
    $scope.searchItem = {
        companyname: '',
        starttime:'',
        endtime:'',
        paytype: '0',
        addedvalue: '0'
    };
    $scope.search = function() {
        $scope.searchItem.companyname = $scope.search.companyName;
        $scope.searchItem.starttime = $scope.search.startdate && $scope.search.startdate.toISOString()|| '';
        $scope.searchItem.endtime = $scope.search.enddate&& $scope.search.enddate.toISOString() || '';
        $scope.searchItem.paytype = $scope.search.PayType;
        $scope.searchItem.addedvalue = $scope.search.AddedValue;
        refreshData($scope.searchItem);
    }

    function refreshData() {
        var data = angular.extend({
            offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
            limit: $scope.paginator.perPage
        }, $scope.searchItem, data);
        server.http.get('/api/contract?' + $.param(data)).success(function(res) {
            $scope.paginator.total = res.data.total;
            $scope.customers = res.data.list;
        });
    }
    refreshData();


}]).controller("Order_view", ['$scope', '$filter', 'server', '$mdDialog', 'orderid', function($scope, $filter, server, $mdDialog, orderid) {

    $scope.orderid = orderid;

    $scope.cancel = function() {
        $mdDialog.cancel()
    };
    $scope.ok = function() {
        $mdDialog.hide();
    }

}]);

angular.module('crmApp').controller('Order_remind', ['$scope', 'server', '$mdDialog', function($scope, server, $mdDialog) {

    $scope.open = function(item) {
        $mdDialog.show({
                controller: 'Order_remind_order',
                templateUrl: 'views/order_view.html',
                clickOutsideToClose: true,
                fullscreen: true,
                // locals: { orderid: item.}
                locals: { orderid: item.OrderId}
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    };

    $scope.search = {
        month: 1
    };
    
    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    };

    $scope.searchParams = {
        limit: 10,
        offset: 0,
        start: '',
        end: '',
        status: 0,
        cusname: '',
        cid: ''
    };
    $scope.pageChanged = function() {
        refreshData();
    };

    //set current page
    $scope.setCurrentPage = function() {
        $scope.paginator.currentPage = $scope.currentPage;
        refreshData();
    };
    $scope.searchItem = {
        monthcount: 1,
    };
    $scope.search = function() {
        $scope.searchItem.monthcount = $scope.search.month;
        refreshData($scope.searchItem);
    }

    function refreshData() {
        var data = angular.extend({
            offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
            limit: $scope.paginator.perPage
        }, $scope.searchItem, data);
        server.http.get('/api/signacontract?' + $.param(data)).success(function(res) {
            $scope.paginator.total = res.data.total;
            $scope.customers = res.data.list;
        });
    }
    refreshData();


}]).controller("Order_remind_order", ['$scope', '$filter', 'server', '$mdDialog', 'orderid', function($scope, $filter, server, $mdDialog, orderid) {

    $scope.orderid = orderid;
    $scope.isRemind = true;

    $scope.cancel = function() {
        $mdDialog.cancel()
    };
    $scope.ok = function(){
        $mdDialog.hide();
    }

}]);

angular.module('crmApp').controller('Order_change', ['$scope', 'server', '$mdDialog', function($scope, server, $mdDialog) {

    $scope.open = function(item) {
        $mdDialog.show({
                controller: 'Order_change_order',
                templateUrl: 'views/order_view.html',
                clickOutsideToClose: true,
                fullscreen: true,
                locals: { orderid: item.OrderId}
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    };

    $scope.search = {
        companyname: 0
    };
    $scope.delete = function(item) {
        if (!confirm("确认要删除客户吗？")) return;
        server.http.delete('/api/contract/197').success(function(res) {
            if (res.status) refreshData();
        });
    };
    $scope.track = function(item) {
        $mdDialog.show({
                controller: 'Customer_track',
                templateUrl: 'views/customer_track.html',
                clickOutsideToClose: true,
                fullscreen: true,
                locals: { customer: item || {} }
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    }
    $scope.forward = function(item) {
        $mdDialog.show({
                controller: 'Customer_forword',
                templateUrl: 'views/customer_forward.html',
                clickOutsideToClose: true,
                fullscreen: true,
                locals: { customer: item || {} }
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    }

    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    };

    $scope.searchParams = {
        limit: 10,
        offset: 0,
        start: '',
        end: '',
        status: 0,
        cusname: '',
        cid: ''
    };
    $scope.pageChanged = function() {
        refreshData();
    };

    //set current page
    $scope.setCurrentPage = function() {
        $scope.paginator.currentPage = $scope.currentPage;
        refreshData();
    };
    $scope.searchItem = {
        cusname: '',
    };
    $scope.search = function() {
        $scope.searchItem.cusname = $scope.search.companyName;
        refreshData($scope.searchItem);
    }

    function refreshData() {
        var data = angular.extend({
            offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
            limit: $scope.paginator.perPage
        }, $scope.searchItem, data);
        server.http.get('/api/signacontract/my?' + $.param(data)).success(function(res) {
            $scope.paginator.total = res.data.total;
            $scope.customers = res.data.list;
        });
    }
    refreshData();


}]).controller("Order_change_order", ['$scope', '$filter', 'server', '$mdDialog', 'orderid', function($scope, $filter, server, $mdDialog, orderid) {

    $scope.orderid = orderid;
    $scope.isChange = true;

    $scope.cancel = function() {
        $mdDialog.cancel()
    };
    $scope.ok = function(){
        $mdDialog.hide();
    }

}]);

angular.module('crmApp').controller('Order_complete', ['$scope', 'server', '$mdDialog', function($scope, server, $mdDialog) {

    $scope.open = function(item) {
        $mdDialog.show({
                controller: 'Order_supplement',
                templateUrl: 'views/order_view.html',
                clickOutsideToClose: true,
                fullscreen: true,
                locals: { orderid: item.OrderId}
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    };

    $scope.search = {
        companyname: 0
    };
    $scope.delete = function(item) {
        if (!confirm("确认要删除客户吗？")) return;
        server.http.delete('/api/contract/'+item.OrderId).success(function(res) {
            if (res.status) refreshData();
        });
    };
    $scope.track = function(item) {
        $mdDialog.show({
                controller: 'Customer_track',
                templateUrl: 'views/customer_track.html',
                clickOutsideToClose: true,
                fullscreen: true,
                locals: { customer: item || {} }
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    }
    $scope.forward = function(item) {
        $mdDialog.show({
                controller: 'Customer_forword',
                templateUrl: 'views/customer_forward.html',
                clickOutsideToClose: true,
                fullscreen: true,
                locals: { customer: item || {} }
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    }

    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    };

    $scope.searchParams = {
        limit: 10,
        offset: 0,
        start: '',
        end: '',
        status: 0,
        cusname: '',
        cid: ''
    };
    $scope.pageChanged = function() {
        refreshData();
    };

    //set current page
    $scope.setCurrentPage = function() {
        $scope.paginator.currentPage = $scope.currentPage;
        refreshData();
    };
    $scope.searchItem = {
        cusname: '',
    };
    $scope.search = function() {
        $scope.searchItem.cusname = $scope.search.companyName;
        refreshData($scope.searchItem);
    }

    function refreshData() {
        var data = angular.extend({
            offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
            limit: $scope.paginator.perPage
        }, $scope.searchItem, data);
        server.http.get('/api/orderszj/my?' + $.param(data)).success(function(res) {
            $scope.paginator.total = res.data.total;
            $scope.customers = res.data.list;
        });
    }
    refreshData();


}]).controller("Order_supplement", ['$scope', '$filter', 'server', '$mdDialog', 'orderid', function($scope, $filter, server, $mdDialog, orderid) {

    $scope.orderid = orderid;
    $scope.supp = true; //记账补充
    $scope.cancel = function() {
        $mdDialog.cancel()
    };
    $scope.ok = function(){
        $mdDialog.hide();
    }

}]);

angular.module('crmApp').controller('Order_statement', ['$scope', 'server', '$state', '$mdDialog', function($scope, server, $state, $mdDialog) {

    $scope.add = function(item) {
        $mdDialog.show({
                controller: 'Order_statement_add',
                templateUrl: 'views/order_statement_add.html',
                clickOutsideToClose: true,
                fullscreen: true,
                locals:{customer:{}}
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    };
    $scope.delete = function(item) {
        if (!confirm("确认要删除吗？")) return;
        server.http.delete('/api/statement/'+item.Id).success(function(res) {
            if (res.status) refreshData();
        });
    };



    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    };

    $scope.search = {
        companyName: '',
        phone: ''
    };
    $scope.pageChanged = function() {
        refreshData();
    };

    //set current page
    $scope.setCurrentPage = function() {
        $scope.paginator.currentPage = $scope.currentPage;
        refreshData();
    };
    $scope.searchItem = {
        startmonth: '',
        EndMonth: ''
    };
    $scope.search = function() {
        if($scope.search.start)
            $scope.searchItem.startmonth = $scope.search.start.toISOString();
        if($scope.search.end)
            $scope.searchItem.EndMonth = $scope.search.end.toISOString();
        refreshData($scope.searchItem);
    }

    function refreshData() {
        var data = angular.extend({
            offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
            limit: $scope.paginator.perPage
        }, $scope.searchItem);
        server.http.get('/api/statement?' + $.param(data)).success(function(res) {
            $scope.paginator.total = res.data.total;
            $scope.customers = res.data.list;
        });
    }
    refreshData();


}]).controller("Order_statement_add", ['$scope', 'server', '$mdDialog','customer','$uibModal', function($scope, server, $mdDialog,customer,$uibModal) {
    $scope.postData = {};
    server.getSalers().success(function(res) {
        $scope.salers = res.data;
    });
    $scope.customer = customer;
    if(customer.Id){
        $scope.postData.CustomerId = customer.Id;
        $scope.postData.CustomerName = customer.CompanyName;
    }

    $scope.select = function(item) {
      var modalInstance = $uibModal.open({
          templateUrl: 'views/Order_cusSelect.html',
          controller: 'Order_cusSelect',
          size: 'lg',
          appendTo: angular.element('.order_statement_add').parent()
      });
      modalInstance.result.then(function (customer) {
        $scope.postData.CustomerId = customer.Id;
        $scope.postData.CustomerName = customer.CompanyName;
      }, function () {

      });

    }

    server.http.get('/api/paymodes').success(function(res) {
        $scope.paymodes = res.data;
    });
    server.getSalers().success(function(res) {
        $scope.salers = res.data;
    });
    $scope.getAmount = function(){
        var postData = _.pick($scope.postData,'ServiceCharge','TaxPayment','AnnualReport','Register','OpenBank','NationLocalTax','Prints','AddressCost','Change');
        var all = 0;
        _.each(postData,function(value){
            all += (value||0);
        });
        return all;
    }
    $scope.ok = function(ev) {
        $scope.postData.SumAccount = $scope.getAmount();
        server.http.post('/api/statement',$scope.postData).success(function(res) {
            if (res.status) $mdDialog.hide();
        });
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    }
}]);

angular.module('crmApp').controller('Order_outworker', ['$scope', '$http', '$state', '$uibModal', 'user', '$q',
    function($scope, $http, $state, $uibModal, user, $q) {
        $scope.user = user.get();
        // console.log($scope.user)
        $scope.open = function(item) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/order_outworker_add.html',
                controller: 'Order_outworker_add',
                backdrop: 'static',
                size: 'hg',
                resolve: {
                    customer: {}
                }
            });
            modalInstance.result.then(function(result) {
                refreshData();
            }, function() {

            });
        };
        $scope.detail = function(item) {

            var modalInstance = $uibModal.open({
                templateUrl: 'views/order_outworker_detail.html',
                controller: 'Order_outworkerDetail',
                size: 'hg',
                resolve: {
                    taskId: function() {
                        return item.Id
                    }
                }
            });
            modalInstance.result.then(function(result) {
                refreshData();
            }, function() {

            });
        };

        $scope.taskStatus = {
            1: "待分配",
            2: "待处理",
            3: "进行中",
            4: "已取消",
            5: "已完成"
        };
        if ($scope.user.Category !== 2 && $scope.user.Category !== 8) {
            delete $scope.taskStatus["1"];
        }
        $scope.search = {
            sequenceNo: "",
            companyname: "",
            connector: "",
            taskname: "",
            childtaskname: "",
            currOutworker: "",
            starttime: "",
            endtime: "",
            areacode: "",
            salesId: "0",
            taskstatus: "",
            servicestatus: ""
        };
        $scope.delete = function(item) {
            if (!confirm("确认要取消任务吗？")) return;
            $http.put('api/maintask/cancelstatus/' + item.Id).success(function(res) {
                if (res.status) refreshData();
            });
        };
        //日期
        $scope.clear = function() { //清空
            $scope.dt = null;
        };

        $scope.changeDate = function() {

            var d1 = angular.element($("#date1"))[0].value
            var d2 = angular.element($("#date2"))[0].value
            if (d2) {
                var _d1 = d1.replace(/-/ig, "")
                var _d2 = d2.replace(/-/ig, "")
                if ((_d2 - _d1) < 0) {
                    angular.element($("#date1"))[0].value = d2
                }
            }
            $scope.search.starttime = d1
            $scope.search.endtime = d2
        }
        $scope.paginator = {
            total: 0,
            currentPage: 1,
            perPage: 15,
            previousText: '上一页',
            nextText: '下一页',
            lastText: '最后一页',
            firstText: '首页'
        };

        $scope.searchItem = {
            sequenceNo: "",
            companyname: "",
            connector: "",
            taskname: "",
            childtaskname: "",
            outworkId: "0",
            starttime: "",
            endtime: "",
            areacode: "",
            salesId: "0",
            taskstatus: "",
            servicestatus: ""
        };
        $scope.pageChanged = function() {
            refreshData();
        };

        //set current page
        $scope.setCurrentPage = function() {
            $scope.currentPage = Math.abs(Math.floor($scope.currentPage)) || 1;
            $scope.paginator.currentPage = $scope.currentPage;
            refreshData();
        };

        //日期
        $scope.clear = function() { //清空
            $scope.dt = null;
        };
        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        }
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        }
        $scope.changeDate = function() {

            var d1 = angular.element($("#date1"))[0].value
            var d2 = angular.element($("#date2"))[0].value
            if (d2) {
                var _d1 = d1.replace(/-/ig, "")
                var _d2 = d2.replace(/-/ig, "")
                if ((_d2 - _d1) < 0) {
                    angular.element($("#date1"))[0].value = d2
                }
            }
            $scope.search.starttime = d1
            $scope.search.endtime = d2
        }
        $scope.searchFn = function() {
            $scope.searchItem.companyname = $scope.search.companyname;
            $scope.searchItem.sequenceNo = $scope.search.sequenceNo;
            $scope.searchItem.connector = $scope.search.connector; //???
            $scope.searchItem.taskname = $scope.search.taskname;
            $scope.searchItem.childtaskname = $scope.search.childtaskname;
            $scope.searchItem.starttime = $scope.search.starttime;
            $scope.searchItem.endtime = $scope.search.endtime;
            $scope.searchItem.areacode = $scope.search.areacode
            $scope.searchItem.salesId = $scope.search.salesId || 0;
            $scope.searchItem.outworkId = $scope.search.currOutworker || 0;
            $scope.searchItem.taskstatus = $scope.search.taskstatus
            $scope.searchItem.servicestatus = $scope.search.servicestatus
            refreshData($scope.searchItem);
        }

        function refreshData() {
            // var deferred = $q.defer();
            var searchIt;
            searchIt = $scope.searchItem
            var data = angular.extend({
                offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
                limit: $scope.paginator.perPage
            }, searchIt, data);
            // maintask？ Id = & companyname = & connector = & taskname = & childtaskname = & starttime = & endtime = & areacode = & salesId = 0 & outworkId = 0 & taskstatus = & offset = 0 & limit = 15
            $http.get('api/maintask?' + $.param(data)).success(function(res) {
                $scope.paginator.total = res.data.total;
                $scope.customers = res.data.list;
            });
            // return deferred.promise;
        }
        refreshData();
        $http.get("/api/contract/sales").success(function(res) {
            $scope.users = res.data;
        });
        $http.get('api/outworkers').success(function(res) {
            $scope.outworkers = res.data.list;
        });
        $http.get('/api/commontask').success(function(res) {

                $scope.Tasks = formatData(res.data);
            })
            // $scope.taskchange = function () {
            //     if (!$scope.search.taskname) {
            //         return
            //     }
            //     var subTask = _.find($scope.Tasks, function (chr) {
            //         return chr.CommonTaskId == $scope.search.taskname
            //     })
            //     $scope.search.childtaskname = ""
            //     $scope.outTasks = subTask.TaskList;
            // }
            // $http.get('/api/outertasksub?taskname=&BusinessType=&status=0&offset=0&limit=100000').success(function(res) {
        $scope.outTasks = []
            // })
        $http.get('/api/code/area').success(function(res) {
            $scope.areas = res.data
        })
        $http.get('/api/outertasksub?offset=0&limit=9999').success(function(res) {
            $scope.outTasks = _.filter(res.data.list, {
                Status: 1
            });
        });

        function formatData(data) {
            var result = [];
            var last = {};
            _.each(data, function(item) {
                if (last.CommonTaskId !== item.CommonTaskId) {
                    last = _.pick(item, 'CommonTaskName', 'Status', 'CommonTaskId', 'CommonWeight');
                    last.TaskList = [_.pick(item, 'TaskName', 'OuterTaskId', 'Weight')];
                    result.push(last);
                } else {
                    last.TaskList.push(_.pick(item, 'TaskName', 'OuterTaskId', 'Weight'));
                }
            });
            return result;

        }

    }
]).controller("Order_outworker_add", ['$scope', '$http', '$uibModal', '$uibModalInstance', 'customer', 'user',
    function($scope, $http, $uibModal, $uibModalInstance, customer, UserServe) {
        var user = UserServe.get();
        $http.get('/api/mycity').success(function(res) {
            $scope.city = res.data[0];
        });
        $http.get('/api/commontask').success(function(res) {
            $scope.tasksArr = formatData(_.filter(res.data, {
                Status: 1
            }));

        });
        $scope.open1 = false;
        $scope.open2 = false;
        $scope.checkTB = function(tbItem) {
            if (tbItem.checked) {
                _.each($scope.tasksArr, function(item) {
                    if (tbItem.CommonTaskId !== item.CommonTaskId) item.checked = false;
                });
            }
        }
        $scope.tbIsDisable = function() {
            return !!_.chain($scope.tasks).pluck('list').flatten().find({
                selected: true
            }).value();
        }
        $scope.otherIsDisable = function() {
            return !!_.find($scope.tasksArr, {
                checked: true
            });
        }

        function formatData(data) {
            var result = [];
            var last = {};
            _.each(data, function(item) {
                if (last.CommonTaskId !== item.CommonTaskId) {
                    last = _.pick(item, 'CommonTaskName', 'Status', 'CommonTaskId', 'CommonWeight');
                    last.TaskList = [_.pick(item, 'TaskName', 'OuterTaskId', 'Weight')];
                    result.push(last);
                } else {
                    last.TaskList.push(_.pick(item, 'TaskName', 'OuterTaskId', 'Weight'));
                }
            });
            return result;

        }

        


        $scope.postData = {};
        $scope.postData.areaSele = 0;
        if (customer.Id) {
            $scope.cus_selected = true;
            $scope.postData.Customer = customer;
        }
        $scope.title = "添加外勤任务";

        $scope.ok = function(ev) {
            if (!$scope.postData.Customer) {
                alert('请选择公司！');
                return;
            }
            //tongban
            var tb = _.find($scope.tasksArr, {
                checked: true
            });
            var data = {
                CustomerId: $scope.postData.Customer.Id,
                AreaCode: $scope.postData.areaSele,
                Remark: $scope.postData.Remark
            };
            var isOthers = false;
            if (tb) { //
                data.CommonTaskId = tb.CommonTaskId;
                data.ChildTasks = _.map(tb.TaskList, function(item) {
                    var t = _.chain($scope.tasks).pluck('list').flatten().find({
                        Id: item.OuterTaskId
                    }).value();
                    var temp = _.pick(t, 'TaskName', 'Price', 'Weight', 'Remark');
                    temp.TaskId = item.OuterTaskId;
                    temp.Weight = item.Weight;
                    temp.CustomerId = data.CustomerId;
                    return temp;
                });
                data.MainTaskName = tb.CommonTaskName;
            } else {
                isOthers = true;
                var subTasks = _.chain($scope.tasks).pluck('list').flatten().filter({
                    selected: true
                }).map(function(item) {
                    // delete item.selected;
                    //item.MainTaskId =
                    return item;
                }).value();
                data.ChildTasks = _.map(subTasks, function(item) {
                    var temp = _.pick(item, 'TaskName', 'Price', 'Weight', 'Remark', 'selected');
                    temp.TaskId = item.Id;
                    temp.CustomerId = data.CustomerId;
                    return temp;
                });
                data.MainTaskName = "其他";
                if (data.ChildTasks.length === 0) {
                    alert('请选择任务！');
                    return;
                }
            }

            if (!$scope.postData.areaSele) {
                alert('请选择区域！');
                return;
            }
            if (isOthers) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/outwork_weight_setting.html',
                    controller: 'outworkWeightSetting',
                    size: 'lg',
                    backdrop: 'static',
                    resolve: {
                        tasks: function() {
                            return data.ChildTasks;
                        }
                    }
                });

                modalInstance.result.then(function(result) {
                    reSelect(result);
                    var tasks = _.map(_.filter(result, { selected: true }), function(t) {
                        t.Weight = t._weight;
                        delete t.selected;
                        return t;
                    });
                    data.ChildTasks = tasks;
                    submit()
                }, function(result) {
                    reSelect(result);
                });

                function reSelect(result) {
                    _.chain($scope.tasks).pluck('list').flatten().filter(function(t) {
                        var temp = _.find(result, { TaskId: t.Id });
                        if (temp) {
                            t.selected = temp.selected;
                        }
                        return !!temp;
                    }).value();
                }

            } else {
                submit()
            }

            function submit() {
                $http.post('/api/maintask', data).success(function(res) {
                    if (res.status) {
                        // alert('添加成功!');
                        $uibModalInstance.close();
                    }
                });
            }


        };
        $http.get('/api/outertasksub?taskname=&BusinessType=&status=0&offset=0&limit=10000').success(function(res) {
            var data = _.map(_.groupBy(_.filter(res.data.list, {
                Status: 1
            }), 'BusinessType'), function(val, key) {
                var item = {
                    list: val
                };
                if (key == 1) {
                    item.Name = '税务';
                } else if (key == 2) {
                    item.Name = '工商';
                } else {
                    item.Name = '其他';
                }
                return item;
            });

            $scope.tasks = data;
        });
        $http.get("/api/code/area").success(function(res) {
            $scope.areaArr = res.data
        })
        $scope.tbIsDisable = function() {
            return !!_.chain($scope.tasks).pluck('list').flatten().find({
                selected: true
            }).value();
        }
        $scope.otherIsDisable = function() {
            return !!_.find($scope.tasksArr, {
                checked: true
            });
        }
        $scope.cancel = function() {
            $uibModalInstance.dismiss()
        };
        $scope.selectCustomer = function() {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/Order_cusSelect.html',
                controller: 'Order_cusSelect',
                size: 'lg',
            });
            modalInstance.result.then(function(result) {
                $scope.postData.Customer = result;
                if (result.AreaCode) {
                    $scope.postData.areaSele = result.AreaCode;
                }
            }, function() {

            });
        }


    }
]).controller("Order_outworkerDetail", ['$scope', '$http', '$uibModalInstance', 'taskId', '$mdDialog', 'user', '$uibModal',
    function($scope, $http, $uibModalInstance, taskId, $mdDialog, user, $uibModal) {
        $scope.ifSub = false
        $scope.customers = [];
        $scope.user = user.get();
        $scope.forwards = {
            forwardUserId: '0',
            isSelectAll: false
        };
        var count = 0

        function refreshData() {
            count++;
            $http.get('/api/maintask/' + taskId).success(function(res) {
                $scope.customers = res.data;
            });
        }
        $http.get('/api/outworkers').success(function(res) {
            $scope.outworkers = res.data.list;
        });
        $scope.cancel = function() {
            if (($scope.user.Category === 8 || $scope.user.Category === 2) && !_.every($scope.customers, function(t) {
                    return t.Status > 1
                })) {
                if (confirm('还有任务未分配，确认关闭？')) {
                    close();
                    return;
                }
                return;
            }
            close();
        };

        function close() {
            if (count > 0) {
                $uibModalInstance.close();
            } else {
                $uibModalInstance.dismiss();
            }
        }
        $scope.forward = function(item) {
            $mdDialog.show({
                    controller: 'OutworkForward',
                    templateUrl: 'views/customer_forward.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                })
                .then(function(result) {
                    $http.put('/api/childtask/trans?ids=' + item.Id + '&outworkerId=' + result).success(function(res) {
                        if (res.status) {
                            refreshData();
                        }
                    });
                }, function() {

                });

        };
        $scope.forwardAll = function() {
            var ids = _.map(_.filter($scope.customers, function(t) {
                return t.Status <= 3 && t.selected;
            }), function(item) {
                return item.Id
            }).join(',');
            if (ids.length === 0) {
                $scope.forwards.isSelectAll = false;
                $scope.forwards.forwardUserId = '0';
                return;
            }

            $http.put('/api/childtask/trans?ids=' + ids + '&outworkerId=' + $scope.forwards.forwardUserId).success(function(res) {
                if (res.status) {
                    refreshData();
                    $scope.forwards.isSelectAll = false;
                    $scope.forwards.forwardUserId = '0';
                }
            });

        }
        $scope.statusChange = function(item, status, str) {
            if (!confirm('确认要“' + str + '”?')) return;
            $http.put('/api/childtask/' + item.Id + '/' + status).success(function() {

                refreshData();

            })
        };
        $scope.editCompany = function(item) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/companyEdit.html',
                controller: 'CompanyEdit',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    companyId: function() {
                        return item.CustomerId;
                    }
                }
            });

            modalInstance.result.then(function(result) {
                $http.put('/api/childtask/trans?ids=' + item.Id + '&outworkerId=' + result).success(function(res) {
                    if (res.status) {
                        refreshData();
                    }
                });
            }, function() {

            });
        }
        $scope.selectAll = function() {
            if ($scope.forwards.isSelectAll) {
                _.each($scope.customers, function(item) {
                    if (item.Status <= 3) item.selected = true;
                });
            } else {
                _.each($scope.customers, function(item) {
                    item.selected = false;
                });
            }
        };
        refreshData();

    }
]).controller("Order_cusSelect", ['$scope', '$http', '$uibModalInstance', function($scope, $http, $uibModalInstance) {



    $scope.search = {
        CompanyName: ''
    };


    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    };

    $scope.searchParams = {
        limit: 10,
        offset: 0,
        start: '',
        end: '',
        status: 0,
        cusname: '',
        cid: ''
    };
    $scope.pageChanged = function() {
        refreshData();
    };

    //set current page
    $scope.setCurrentPage = function() {
        $scope.paginator.currentPage = $scope.currentPage;
        refreshData();
    };
    $scope.searchItem = {
        companyname: ''
    };
    $scope.search = function() {
        $scope.searchItem.companyname = $scope.search.CompanyName;
        refreshData();
    }

    function refreshData() {
        var data = angular.extend({
            offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
            limit: $scope.paginator.perPage
        }, $scope.searchItem);
        $http.get('/api/order/customer?' + $.param(data)).success(function(res) {
            $scope.paginator.total = res.data.total;
            $scope.customers = res.data.list;
        });
    }
    refreshData();


    $scope.select = function(item) {
        $uibModalInstance.close(item);
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss();
    }
}]).controller('CompanyEdit', ['$scope', '$uibModalInstance', '$http', 'companyId', 'FileUploader', '$filter', function($scope, $uibModalInstance, $http, companyId, FileUploader, $filter) {
    $http.get("/api/industry").success(function(data) {
        $scope.industries = data.data;
    });
    $http.get('/api/mycity').success(function(res) {
        $scope.city = res.data[0];
    });
    if ($scope.city) {
        $scope.postData.CityCode = $scope.city.Code;
    }
    // $http.get("/api/citybychannel").success(function (data) {
    //     $scope.cities = data.data;
    //     if (!$scope.postData.CityCode) {
    //         $scope.postData.CityCode = $scope.cities[0].CityCode;
    //     }
    // });
    $http.get('/api/code/area').success(function(res) {
        $scope.areas = res.data
    });
    $scope.postData = {};
    $http.get('/api/customerdetail/' + companyId).success(function(res) {
        var result = res.data;
        if (result.BusnissDeadline && result.BusnissDeadline.substr(0, 4) === '0001') {
            result.BusnissDeadline = "";
        } else {
            result.BusnissDeadline = new Date(result.BusnissDeadline);
        }
        if (result.RegisterDate && result.RegisterDate.substr(0, 4) === '0001') {
            result.RegisterDate = "";
        } else {
            result.RegisterDate = new Date(result.RegisterDate);
        }
        result.AddedValue = "" + result.AddedValue;
        result.IndustryId = "" + result.IndustryId;
        $scope.postData = result;
    });
    $scope.ok = function(item) {
        var postData = $scope.postData;
        if (postData.RegisterDate) postData.RegisterDate = $filter('date')($scope.postData.RegisterDate, 'yyyy-MM-dd');
        if (postData.NoDeadLine) {
            postData.BusnissDeadline = '';
            postData.NoDeadLine = 1;
        } else {
            postData.NoDeadLine = 0;
        }
        $http.put('/api/customer/' + companyId + '?verify=1', $scope.postData).success(function(res) {
            if (res.status) {
                alert('保存成功!');
                $uibModalInstance.dismiss('cancel');
            }
        })
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    var uploadUrl = 'https://pilipa.oss-cn-beijing.aliyuncs.com';

    $http.get('/api/signkey').success(function(res) {
        delete res.data.Filename;
        delete res.data.key;
        delete res.data.callback;
        delete res.data.expire;
        delete res.data.Host;
        $scope.signkey = res.data;
    });
    $scope.uploader2 = new FileUploader({
        url: uploadUrl,
        autoUpload: true
    });
    $scope.uploader2.onCompleteItem = function(fileItem, response, status, headers) {
        $scope.postData.BusinessLicense = uploadUrl + '/' + $scope._key2;
    };
    $scope.uploader2.onBeforeUploadItem = function(item) {
        bindFormData(item, 2, 2);
    };
    $scope.uploader2.onErrorItem = function() {
        alert('上传失败!')
    };

    function bindFormData(item, up, type) {
        var key = buildKey(type, item.file.name);
        item.formData.push({
            key: key
        });
        _.each($scope.signkey, function(value, key) {
            var temp = {};
            temp[key] = value;
            item.formData.push(temp);
        });
        $scope['_key' + up] = key;
    }

    function buildKey(type, fileName) {
        var randomFilename = "";

        var get_suffix = function(filename) {
            var suffix = '';
            var pos = filename.lastIndexOf('.');

            if (pos != -1) {
                suffix = filename.substring(pos)
            }
            return suffix;
        };
        var random_string = function(len) {
            len = len || 32;
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            var maxPos = chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        };

        var suffix = get_suffix(fileName);
        var typMap = {
            1: 'FileUploads/Order/CardID/',
            2: 'FileUploads/Order/BusinessLicense/',
            3: 'FileUploads/Order/Contract/',
            4: 'FileUploads/Agent/'
        }
        var nowstr = $filter('date')(new Date(), 'yyyy-MM');
        var g_object_name = typMap[type] + nowstr + '/' + random_string(10) + suffix;
        return g_object_name;
    }


}]).controller('OutworkForward', ['$scope', '$mdDialog', '$http', 'user', 'server', function($scope, $mdDialog, $http, user, server) {
    $http.get('/api/outworkers').success(function(res) {
        $scope.salers = res.data.list;
    });
    $scope.label = "外勤";
    $scope.title = "转接任务";
    $scope.ok = function(ev) {
        if (!$scope.saler) {
            alert('请选择外勤人员!');
            return;
        }
        $mdDialog.hide($scope.saler)

    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    }
}]).controller("outworkWeightSetting", ['$scope', '$http', '$uibModalInstance', 'tasks',
    function($scope, $http, $uibModalInstance, tasks) {
        $scope.Tasks = tasks;
        $scope.toInt = function(num, e) {
            return Math.floor(Math.abs(num)) || ''
        }
        $scope.delete = function(item) {
            if (!confirm("确认要删除？")) return;
            item.selected = false;
        }
        $scope.cancel = function() {
            $uibModalInstance.dismiss($scope.Tasks);
        };
        $scope.ok = function() {
            var t = _.filter($scope.Tasks, { selected: true });
            var _arr = _.uniq(t, function(t) {
                return t._weight;
            });
            if (_arr.length < t.length) {
                alert('权重不能重复！');
            } else {
                $uibModalInstance.close($scope.Tasks);
            }
        }
    }
]);

'use strict';
/**
 * @ngdoc function
 * @name crmApp.controller:AddOrderCtrl
 * @description
 * # AddOrderCtrl
 * Controller of the crmApp
 */
angular.module('crmApp').controller('Gotaskconfig', ['$scope', '$http', 'user', '$uibModal',
    function ($scope, $http, User, $uibModal) {
        $scope.user = User.get()

        refreshData()

        function refreshData() {
            $http.get('/api/commontask').success(function (res) {
                $scope.weights = _.uniq(_.pluck(res.data, 'CommonWeight'));
                $scope.tasksArr = formatData(res.data);
            });
        }

        function formatData(data) {
            var result = [];
            var last = {};
            _.each(data, function (item) {
                if (last.CommonTaskId !== item.CommonTaskId) {
                    last = _.pick(item, 'CommonTaskName', 'Status', 'CommonTaskId', 'CommonWeight');
                    last.TaskList = [_.pick(item, 'TaskName', 'OuterTaskId', 'Weight')];
                    result.push(last);
                } else {
                    last.TaskList.push(_.pick(item, 'TaskName', 'OuterTaskId', 'Weight'));
                }
            });
            return result;

        }
        $scope.add = function (item, $event, name) {
            $event.stopPropagation();
            $event.preventDefault();


            var modalInstance = $uibModal.open({
                templateUrl: 'views/go_task_config_view.html',
                controller: 'Gotaskconfig_add',
                size: 'lg',
                resolve: {
                    increased: function () {
                        return {
                            name: name,
                            weights: $scope.weights,
                            task: item || {}
                        }
                    }
                }
            });
            modalInstance.result.then(function (result) {
                refreshData();
            }, function () {

            });
        }
        $scope.ifuse = function ($event, item) {
            $event.stopPropagation();
            $event.preventDefault();
            if (item.Status == 1) {
                $http.put("/api/commontask/commontaskisstop?isstop=" + 2 + "&id=" + item.CommonTaskId).success(function (res) {
                    refreshData()
                })
            } else {
                $http.put("/api/commontask/commontaskisstop?isstop=" + 1 + "&id=" + item.CommonTaskId).success(function (res) {
                    refreshData()
                })
            }
        }

    }
]).controller('Gotaskconfig_add', ['$scope', '$http', '$uibModalInstance', '$uibModal', "increased", "user",
    function ($scope, $http, $uibModalInstance, $uibModal, increased, user) {
        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        }
        $scope.title = increased.name;
        $scope.Math = Math;
        $scope.task = {
            Id: increased.task.CommonTaskId,
            CommonTaskName: increased.task.CommonTaskName,
            TaskList: increased.task.TaskList,
            Status: increased.task.Status,
            Weight: increased.task.CommonWeight
        };
        var orgWeight = $scope.task.Weight;
        $http.get('/api/outertasksub?taskname=&BusinessType=&status=0&offset=0&limit=10000').success(function (res) {
            $scope.Tasks = _.filter(res.data.list, {
                Status: 1
            });
            _.each(increased.task.TaskList, function (item) {
                var temp = _.find($scope.Tasks, {
                    Id: item.OuterTaskId
                });
                if (temp) {
                    temp._weight = item.Weight;
                    temp.checked = true;
                }
            });
        })

        $scope.checkWeight = function (n) {
            var subtasks = _.filter($scope.Tasks, {
                checked: true
            });
            var _arr = _.uniq(subtasks, function (t) {
                return t.Weight;
            });
            if (_arr.length < subtasks.length) {
                alert('请注意，权重不能重复!');
            }
        }
        $scope.ok = function () {
            var data = $scope.task;
            var subtasks = _.filter($scope.Tasks, {
                checked: true
            });
            subtasks = _.map(subtasks, function (t) {
                if (!$scope.task.Id) {
                    return {
                        Weight: t._weight,
                        OuterTaskId: t.Id
                    }
                } else {
                    return {
                        CommonTaskId: data.Id,
                        Weight: t._weight,
                        OuterTaskId: t.Id
                    }
                }

            });
            data.OutWorkerTasks = subtasks
            delete data.TaskList;
            //判断权重是否重复
            var w = $scope.task.Weight;
            var ws = increased.weights;
            if(w!==orgWeight && ws.indexOf(w)>-1){
               alert('通办任务权重不能重复！')
               return;
            }

            var _arr = _.uniq(subtasks, function (t) {
                return t.Weight;
            });
            if (_arr.length == subtasks.length) {
                if (!$scope.task.Id) {
                    $http.post("/api/commontask", data).success(function (res) {
                        $uibModalInstance.close();
                    })
                } else {
                    $http.put("/api/commontask", data).success(function (res) {
                        $uibModalInstance.close();
                    })
                }
            } else {
                alert("子任务权重不能重复！")
                return
            }

            // console.log(data);



        }


    }
])

angular.module('crmApp').controller('Outwork_dict', ['$scope', '$http', '$state', '$uibModal', 'user', function ($scope, $http, $state, $uibModal, user) {
    $scope.user = user.get();
    $scope.searchData = {}
    $scope.open = function (item) {
        // console.log(item)
        var modalInstance = $uibModal.open({
            templateUrl: 'views/outwork_dict_view.html',
            controller: 'Outwork_dict_view',
            resolve: {
                customer: item || {Price:0}
            }
        });
        modalInstance.result.then(function (result) {
            refreshData();
        }, function () {

        });
    };
    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 15,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    };
    $scope.pageChanged = function () {
        refreshData();
    }
    $scope.setCurrentPage = function () {
        $scope.currentPage = Math.abs(Math.floor($scope.currentPage)) || 1;
        $scope.paginator.currentPage = $scope.currentPage;
        refreshData();
    };
    $scope.searchItem = {
        TaskName: '',
        BusinessType: '',
        Status: '0'
    };
    $scope.search = {
        TaskName: '',
        BusinessType: '',
        Status: "0"
    };
    $scope.searchFn = function () {
        $scope.searchItem.TaskName = $scope.search.TaskName;
        $scope.searchItem.BusinessType = $scope.search.BusinessType;
        $scope.searchItem.Status = $scope.search.Status;
        refreshData();
    }
    $scope.delete = function (item) {
        if (!confirm('您确定要删除？')) return;
        $http.delete('/api/outworkers/' + item.Id).success(function (res) {
            if (res.status) refreshData();
        });
    };


    function refreshData() {
        var data = angular.extend({
            offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
            limit: $scope.paginator.perPage
        }, $scope.searchItem);
        $http.get('/api/outertasksub?' + $.param(data)).success(function (res) {
            $scope.paginator.total = res.data.total;
            $scope.outworkers = res.data.list;
        });
    }
    refreshData();
    $scope.stopOrnot = function (status, id) {
        if (confirm("确定更改吗？")) {
            var _status
            if (status == 1) {
                _status = 2
            } else {
                _status = 1
            }
            $http.put('/api/outertask/taskisstop?isstop=' + _status + '&id=' + id, {}).success(function (res) {
                refreshData()
            });
        } else {
            return
        }

    }

    //分页
    // $scope.pageChanged = function() {
    //     console.log(this)
    //     $http.get('/api/outertasksub?taskname=&BusinessType=&status=0&offset='+((this.bigCurrentPage-1)*10)+'&limit=10').success(function(res) {
    //         $scope.outworkers = res.data;
    //     });
    // }
    // $scope.maxSize = 10
    // $scope.numPages = 1
    // $scope.bigCurrentPage = 1

    //获取时间
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "/";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
            " " + date.getHours() + seperator2 + date.getMinutes() +
            seperator2 + date.getSeconds();
        return currentdate;
    }
    $scope.ifuse = "启用"

}]).controller("Outwork_dict_view", ['$scope', '$http', '$uibModalInstance', 'customer', function ($scope, $http, $uibModalInstance, customer) {
    $scope.postData = _.clone(customer) || {};
    $scope.postData.ifuse = {
        use: $scope.postData.Status || 1
    }
    var pages = [];

    $scope.title = $scope.postData.TaskName || "新增任务";
    $scope.checkPrice = function () {
        $scope.postData.Price < 0 ? $scope.postData.Price = 0 : void(0);
    }
    $scope.ok = function (ev) {
        var postData = angular.copy($scope.postData);
        var _postData = {}
        if (postData.Price < 0) {
            alert('服务费用不能为负！');
            return;
        }

        _postData.TaskName = postData.TaskName ? postData.TaskName : ""
        _postData.BusinessType = postData.BusinessType ? postData.BusinessType : ""
        _postData.Price = postData.Price ? postData.Price : 0
        _postData.Status = postData.ifuse.use
        _postData.Id = customer.Id
        // console.log(customer)
        if (!customer.Id) {
            $http.post('/api/outertask', _postData).success(function (res) {
                if (res.status) {
                    alert('保存成功！');
                    $uibModalInstance.close();
                }
            });
        } else {
            _postData.CreateBy = customer.CreateBy
            _postData.CreateDate = customer.CreateDate
            // console.log(_postData)
            $http.put('/api/outertask', _postData).success(function (res) {
                if (res.status) {
                    alert('保存成功！');
                    $uibModalInstance.close();
                }
            });
        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    }
}]);

angular.module('crmApp').controller('Statis_cus', ['$scope', 'server', '$state', '$mdDialog', 'user', function($scope, server, $state, $mdDialog, user) {
    $scope.user = user.get();
    $scope.open = function(custype, item) {
        $mdDialog.show({
                controller: 'Statis_cus_detail',
                templateUrl: 'views/statis_cus_detail.html',
                clickOutsideToClose: true,
                fullscreen: true,

                locals: { custype: custype, userid: item.UserId }
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    };
    $scope.chartOptions = {};


    function refreshData() {
        var url;
        if (!$scope.user.IsCenter) {
            url = "/api/customerforsubsidiary"
        } else {
            url = "/api/customerforcenter";
        }
        server.http.get(url).success(function(res) {
            $scope.customers = res.data;
            $scope.total = _.reduce($scope.customers, function(result, n, key) {
                result.AType += n.AType;
                result.BType += n.BType;
                result.CType += n.CType;
                result.DType += n.DType;
                result.EType += n.EType;
                result.FType += n.FType;
                result.BillType += n.BillType;
                return result;
            }, {
                AType: 0,
                BType: 0,
                CType: 0,
                DType: 0,
                EType: 0,
                FType: 0,
                BillType: 0
            });
        });
    }
    refreshData();


}]).controller('Statis_cus_detail', ['$scope', 'server', '$mdDialog', 'custype', 'userid','$q', function($scope, server, $mdDialog, custype, userid,$q) {

    $scope.track = function(item) {
        var tplUrl = 'views/customer_view.html';
        $mdDialog.show({
                controller: 'Customer_viewpub',
                templateUrl: tplUrl,
                clickOutsideToClose: true,
                fullscreen: true,
                skipHide:true,
                locals: {
                    customer: item || {},
                    getNextId: $scope.getNextId
                },
                // preserveScope: true,
                // scope: $scope
            })
            .then(function(answer) {
                resFn(answer);
            }, function() {

            });

        function resFn(answer) {
            refreshData();
        }
        // $mdDialog.show({
        //         controller: 'Customer_track',
        //         templateUrl: 'views/customer_track.html',
        //         clickOutsideToClose: true,
        //         fullscreen: true,
        //         skipHide: true,
        //         locals: { customer: item || {} }
        //     })
        //     .then(function(answer) {
        //         refreshData();
        //     }, function() {

        //     });
    }

    $scope.getNextId = function(item) {
        var deferred = $q.defer();

        var c = _.find($scope.customers, { Id: item.Id });
        var index = _.indexOf($scope.customers, c) + 1;
        if (index < $scope.customers.length) {
            deferred.resolve($scope.customers[index].Id);
        } else {
            $scope.paginator.currentPage += 1;
            refreshData().then(function(id) {
                deferred.resolve(id);
            });
        }

        return deferred.promise;
    };

    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    };


    $scope.pageChanged = function() {
        refreshData();
    };

    //set current page
    $scope.setCurrentPage = function() {
        $scope.paginator.currentPage = $scope.currentPage;
        refreshData();
    };
    $scope.searchItem = {
        custype: custype,
        userid: userid
    };


    function refreshData() {
        var data = angular.extend({
            offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
            limit: $scope.paginator.perPage
        }, $scope.searchItem);
        server.http.get('/api/customerbycustype?' + $.param(data)).success(function(res) {
            $scope.paginator.total = res.data.total;
            $scope.customers = res.data.list;
        });
    }
    refreshData();
    $scope.cancel = function() {
        $mdDialog.cancel();
    }

}]);

angular.module('crmApp').controller('Statis_order', ['$scope', 'server', 'user', '$mdDialog', '$filter', function($scope, server, user, $mdDialog, $filter) {
    $scope.user = user.get();
    $scope.open = function(item) {
        $mdDialog.show({
                controller: 'Customer_view',
                templateUrl: 'views/customer_addCustomer.html',
                clickOutsideToClose: true,
                fullscreen: true,
                locals: { customer: item || {} }
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    };

    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 1000,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    };


    $scope.pageChanged = function() {
        refreshData();
    };

    //set current page
    $scope.setCurrentPage = function() {
        $scope.paginator.currentPage = $scope.currentPage;
        refreshData();
    };
    $scope.searchItem = {
        SalesId: '',
        startdate: null,
        enddate: null
    };
    $scope.search = {
        SalesId: 0
    };
    server.getSalers().success(function(res) {
        if ($scope.user.IsGroupLeader) {
            $scope.salers = _.filter(res.data, { DepartmentId: $scope.user.DepartmentId });
        } else {
            $scope.salers = res.data;
        }

    });
    $scope.search = function() {
        $scope.searchItem.startdate = $filter('date')($scope.search.startdate, 'yyyy-MM-dd');
        $scope.searchItem.enddate = $filter('date')($scope.search.enddate, 'yyyy-MM-dd');
        $scope.searchItem.SalesId = $scope.search.SalesId;
        refreshData();
    }

    function refreshData() {
        var data = angular.extend({
            offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
            limit: $scope.paginator.perPage
        }, $scope.searchItem);
        var url;
        if ($scope.user.IsCenter) {
            url = '/api/orderforcenter?';
        } else {
            url = '/api/orderforsubsidiary?';
        }
        server.http.get(url + $.param(data)).success(function(res) {
            $scope.paginator.total = res.data.total;
            $scope.customers = res.data.list;
            $scope.total = _.reduce($scope.customers, function(result, n, key) {

                _.each(_.keys(n), function(k) {
                    if (k != "SalesName") {
                        result[k] = (result[k] || 0) + n[k];
                    }
                });
                return result;
            }, {});
            // => { 
        });
    }
    refreshData();


}]);

angular.module('crmApp').controller('User_users', ['$scope', 'server', '$state', '$mdDialog', 'user', function($scope, server, $state, $mdDialog, user) {
    $scope.user = user.get();
    $scope.open = function(item) {
        $mdDialog.show({
                controller: 'User_view',
                templateUrl: 'views/user_view.html',
                clickOutsideToClose: true,
                fullscreen: true,
                locals: { customer: item || {} }
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    };
    $scope.delete = function(item) {
        if (!confirm('您确定要删除？')) return;
        server.http.delete('/api/user/' + item.UserId).success(function(res) {
            if (res.status) refreshData();
        });
    };

    function refreshData() {
        var data = {
            SubsidiaryId: $scope.user.SubsidiaryId,
            userName: ''
        }
        server.http.get('/api/users?' + $.param(data)).success(function(res) {
            $scope.customers = res.data;
        });
    }
    refreshData();


}]).controller("User_view", ['$scope', 'server', '$mdDialog', '$mdToast', 'customer', function($scope, server, $mdDialog, $mdToast, customer) {
    $scope.postData = {};
    server.http.get('/api/roles').success(function(res) {
        $scope.roles = res.data;
    });
    var pages = [];
    server.http.get('/api/users/functionlist').success(function(res) {

        var menus = [];
        var parent;

        _.each(res.data, function(item) {
            var temp = {};
            temp.name = item.FunctionName;
            temp.Id = item.FunctionId;
            temp.Rank = item.Rank;
            if (item.FunctionLevel == 1) {
                parent = temp;
                parent.children = [];
                menus.push(temp);
            } else {
                parent.children.push(temp);
                pages.push(temp);
            }
        });
        var sections = [];
        _.each(menus.sort(sortFn), function(item) {
            var section = _.pick(item, 'name', 'Id');
            section.pages = [];
            _.each(item.children.sort(sortFn), function(obj) {
                var page = _.pick(obj, 'name', 'Id');
                section.pages.push(page);
            });
            sections.push(section);
        });
        $scope.functionlist = sections;

        function sortFn(a, b) {
            return a.Rank > b.Rank;
        };

        if (customer.UserId) {
            $scope.postData = _.extend($scope.postData, customer);
            var flist = JSON.parse($scope.postData.FunctionList);
            $scope.postData.functions = [];
            _.each(flist, function(item) {
                _.each(item.children, function(page) {
                    var temp = _.find(pages, function(t) {
                        return page.FunctionId == t.Id;
                    });
                    if (temp) $scope.postData.functions.push(temp);
                });
            });
        }
    });
    $scope.changeRole = function() {
        var roleid = $scope.postData.RoleId;
        var role = _.find($scope.roles, function(r) {
            return r.RoleId == roleid;
        });
        if (role) {
            $scope.postData.functions = [];
            var flist = role.FunctionList.split(',');
            $scope.postData.functions = _.filter(pages, function(t) {
                return flist.indexOf(t.Id) >= 0;
            });

        }
    }

    $scope.title = customer.UserName || "新增用户";

    $scope.getSelectedText = function() {
        if (!$scope.postData.functions) return '';
        if ($scope.postData.functions.length > 1) {
            return $scope.postData.functions[0].name + ' 等' + $scope.postData.functions.length + '项';
        } else {
            return $scope.postData.functions[0].name;
        }
    }
    $scope.ok = function(ev) {
        var postData = angular.copy($scope.postData);
        postData.FunctionList = _.map(postData.functions, function(item) {
            return item.Id
        });
        var parr = _.chain(postData.FunctionList).map(function(item) {
            return item.substr(0, 2);
        }).uniq();
        postData.FunctionList = parr.union(postData.FunctionList).value().join(',');
        delete postData.functions;
        if (!customer.UserId) {
            server.http.post('/api/user', postData).success(function(res) {
                if (res.status) {
                    $mdDialog.hide();
                }
            });
        } else {
            server.http.put('/api/user/' + customer.UserId, postData).success(function(res) {
                if (res.status) {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('修改成功！')
                        .position('top center')
                        .hideDelay(2000)
                    );
                    $mdDialog.hide();
                }
            });
        }

    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    }
}]).controller("User_my", ['$scope', 'server', '$mdToast', function($scope, server, $mdToast) {
    $scope.postData = {};

    server.http.get('/api/user').success(function(res) {
        $scope.postData = res.data[0];
    });
    $scope.ok = function(ev) {
        var postData = angular.copy($scope.postData);
        var flist = JSON.parse(postData.FunctionList);
        var temp = [];
        _.each(flist, function(item) {
            temp.push(item.FunctionId);
            _.each(item.children, function(d) {
                temp.push(d.FunctionId);
            });
        });
        postData.FunctionList = temp.join(',');
        server.http.put('/api/user/' + postData.UserId, postData).success(function(res) {
            if (res.status) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('修改成功！')
                    .position('top center')
                    .hideDelay(2000)
                );
                $mdDialog.hide();
            }
        });


    };
    $scope.psdData = {};
    $scope.changePsd = function(ev) {
        var postData = angular.copy($scope.psdData);
        if(postData.New != postData.New2){
            alert('新密码不一致！');
            return;
        }
        server.http.put('/api/user/pwd/reset', postData).success(function(res) {
            if (res.status) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('修改成功！')
                    .position('top center')
                    .hideDelay(2000)
                );
                $mdDialog.hide();
            }
        });


    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    }
}]);

angular.module('crmApp').controller('Site_ps', ['$scope', 'server', function($scope, server) {


    /*
     * paginator
     * */
    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        userName: '',
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    };

    $scope.pageChanged = function() {
        refreshData();
    };
    $scope.setCurrentPage = function() {
        $scope.paginator.currentPage = $scope.currentPage;
        $scope.pageChanged();
    };

    $scope.searchParams = _.extend({}, $scope.search);
    $scope.searchFn = function() {
        $scope.searchParams = _.extend({}, $scope.search);
        refreshData();
    }

    function refreshData() {
        var url;
        var params = {
            limit: $scope.paginator.perPage,
            offset: $scope.paginator.perPage * ($scope.paginator.currentPage - 1),
            TypeId: $scope.typeId
        }
        server.http.get('/api/website?' + $.param(params)).success(function(res) {
            $scope.paginator.total = res.data.total;
            $scope.data = res.data.list;
        });
    }
    refreshData();

    

}]);

angular.module('crmApp').controller('Statis_mate', ['$scope', 'server',
    function($scope, server) {
        $scope.search = {};
        $scope.search.end = new Date();
        $scope.search.start = new Date();
        $scope.search.start.setMonth($scope.search.start.getMonth() - 1);
        $scope.searchFn = function() {
            var params = {
                startDate: $scope.search.start.toISOString(),
                endDate: $scope.search.end.toISOString()
            }
            server.http.get('/api/reportsource?' + $.param(params)).success(function(res) {
                $scope.data1 = res.data;
                var labels = _.map(res.data, 'Marking');
                var data = _.map(res.data, 'Num');
                $scope.chart1Options.data = data;
                $scope.chart1Options.labels = labels;
                $scope.total = _.reduce($scope.data1, function(result, n, key) {
                    //result += n.Num
                    return result +n.Num;
                }, 0);
                getDetail(res.data[0]);
            });

        }
        $scope.searchFn();

        function getDetail(source) {
            $scope.total2 = source.Num;
            var params = {
                sourceid: source.Id,
                startDate: $scope.search.start.toISOString(),
                endDate: $scope.search.end.toISOString()
            }
            server.http.get('/api/customerbysource?' + $.param(params)).success(function(res) {
                //$scope.chart2Options.options.title.text = source.Marking;
                var data = res.data[0];
                $scope.chart2Options.labels = ['签单', 'A类', 'B类', 'C类', 'D类','E类', 'F类', '公海'];
                $scope.chart2Options.data = [data.BillType, data.AType, data.BType, data.CType, data.DType,data.EType,data.FType, data.GType];
                $scope.chart2Options.title = source.Marking;
            });
        }

        $scope.chart1Options = {
            labels: [],
            data: [],
            options: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            onClick: function(arg) {
                var source = $scope.data1[arg[0]._index];
                getDetail(source);
                //$scope.$apply();
            }
        }

        $scope.chart2Options = {
            data: [],
            labels: [],
            series: 'asdf'
        }
    }
]);

angular.module('crmApp').controller('Statis_tend', ['$scope', 'server',
    function($scope, server) {
        $scope.search = {};
        $scope.search.end = new Date();
        $scope.search.start = new Date();
        $scope.search.start.setMonth($scope.search.start.getMonth() - 1);
        $scope.searchFn = function() {
            var params = {
                startDate: $scope.search.start.toISOString(),
                endDate: $scope.search.end.toISOString()
            }
            server.http.get('/api/salesordertop?' + $.param(params)).success(function(res) {
                $scope.data1 = res.data;
                var labels = _.map(res.data, 'RealName');
                var data = _.map(res.data, 'Num');
                $scope.chart1Options.data = data;
                $scope.chart1Options.labels = labels;

                $scope.total = _.reduce($scope.data1, function(result, n, key) {
                    //result += n.Num
                    return result +n.Num;
                }, 0);

                getDetail(res.data[0]);
            });

        }
        $scope.searchFn();

        function getDetail(source) {
            $scope.total2 = source.Num;
            var params = {
                salesid: source.SalesId,
                startDate: $scope.search.start.toISOString(),
                endDate: $scope.search.end.toISOString()
            }
            server.http.get('/api/tendencychart?' + $.param(params)).success(function(res) {
                //$scope.chart2Options.options.title.text = source.Marking;
                var data = res.data[0];
                $scope.chart2Options.labels = _.map(res.data, 'OrderDate');
                $scope.chart2Options.data = [_.map(res.data, 'OrderNum')];
                $scope.chart2Options.title = source.RealName;
            });
        }

        $scope.chart1Options = {
            labels: [],
            data: [],
            options: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            onClick: function(arg) {
                if(!arg[0]._index) return;
                var source = $scope.data1[arg[0]._index];
                getDetail(source);
                //$scope.$apply();
            }
        }

        $scope.chart2Options = {
            data: [],
            labels: [],
            series: ['签单数量']
        }
    }
]);

angular.module('crmApp').controller('Statis_top', ['$scope', 'server', '$state', '$mdDialog', 'user', function($scope, server, $state, $mdDialog, user) {
    $scope.user = user.get();
    $scope.chartOptions = {};


    function refreshData() {
        //var url;
        // if (!$scope.user.IsCenter) {
        //     url = "/api/customerforsubsidiary"
        // } else {
        //     url = "/api/customerforcenter";
        // }
        server.http.get("/api/customerforsubsidiary").success(function(res) {
            var companyNames = _.uniq(_.map(res.data, 'CompanyName'));
            var t60 = $scope.typeCList = [];
            var t80 = $scope.typeBList = [];
            _.each(companyNames, function(n) {
                var cdata = _.chain(res.data).filter({ CompanyName: n });
                var temp = {
                    CompanyName: n,
                    salers: cdata.map(function(item) {
                        return {
                            RealName: item.RealName,
                            Num: item.CType
                        }
                    }).sortByOrder(['Num'],['desc']).value(),
                    total: cdata.reduce(function(total, n) {
                        if (_.isObject(total)) {
                            return total.CType + n.CType;
                        } else {
                            return total + n.CType;
                        }

                    }).value()
                }
                if (_.isObject(temp.total)) {
                    temp.total = temp.total.CType
                }

                t60.push(temp);

                var temp2 = {
                    CompanyName: n,
                    salers: cdata.map(function(item) {
                        return {
                            RealName: item.RealName,
                            Num: item.BType
                        };
                    }).sortByOrder(['Num'],['desc']).value(),
                    total: cdata.reduce(function(total, n) {
                        if (_.isObject(total)) {
                            return total.BType + n.BType;
                        } else {
                            return total + n.BType;
                        }

                    }).value()
                }
                if (_.isObject(temp2.total)) {
                    temp2.total = temp2.total.BType
                }

                t80.push(temp2);
            });

        });

        server.http.get("/api/currentmonthorder").success(function(res) {
            var companyNames = _.uniq(_.map(res.data, 'CompanyName'));
            var ts = $scope.typeSList = [];

            _.each(companyNames, function(n) {
                var cdata = _.chain(res.data).filter({ CompanyName: n });
                var temp = {
                    CompanyName: n,
                    salers: cdata.map(function(item) {
                        return {
                            RealName: item.RealName,
                            Num: item.OrderNum
                        }
                    }).sortByOrder(['Num'],['desc']).value(),
                    total: cdata.reduce(function(total, n) {
                        if (_.isObject(total)) {
                            return total.OrderNum + n.OrderNum;
                        } else {
                            return total + n.OrderNum;
                        }

                    }).value()
                }
                if (_.isObject(temp.total)) {
                    temp.total = temp.total.OrderNum
                }
                _.sortByOrder(temp.salers,['Num'],['desc']);
                ts.push(temp);
            });
        });

        server.http.get("/api/cusnumbygroup").success(function(res) {
            var companies = $scope.companies = [];
            var companyNames = _.uniq(_.map(res.data, 'SubsidiaryName'));
            _.each(companyNames, function(n) {
                var cdata = _.chain(res.data).filter({ SubsidiaryName: n });
                var total = {
                    at: 0,
                    bt: 0,
                    ct: 0,
                    st: 0
                };
                _.each(cdata.value(),function(t) {
                    total.bt += t.BType;
                    total.ct += t.CType;
                    total.at += t.AType;
                });
                var temp = {
                    CompanyName: n,
                    CList: cdata.map(function(item) {
                        return {
                            DepartmentName: item.DepartmentName,
                            Num: item.CType
                        }
                    }).sortByOrder(['Num'],['desc']).value(),
                    BList: cdata.map(function(item) {
                        return {
                            DepartmentName: item.DepartmentName,
                            Num: item.BType
                        }
                    }).sortByOrder(['Num'],['desc']).value(),
                    AList: cdata.map(function(item) {
                        return {
                            DepartmentName: item.DepartmentName,
                            Num: item.AType
                        }
                    }).sortByOrder(['Num'],['desc']).value(),
                    total: total
                };

                companies.push(temp);
            });
            server.http.get('/api/currmonthbygroup').success(function(res) {
                var companyNames = _.uniq(_.map(res.data, 'SubsidiaryName'));
                _.each(companyNames, function(n) {
                    var cdata = _.chain(res.data).filter({ SubsidiaryName: n });
                    var temp = _.find(companies, { CompanyName: n });
                    if (!temp) {
                        temp = {
                            CompanyName: n,
                            CList: [],
                            BList: [],
                            AList: [],
                            total: { at: 0, bt: 0, ct: 0, st: 0 }
                        };
                    }
                    temp.SList = cdata.map(function(item) {
                        return {
                            DepartmentName: item.DepartmentName,
                            Num: item.OrderNum
                        }
                    }).sortByOrder(['Num'],['desc']).value();
                    _.each(cdata.value(),function(t) {
                        temp.total.st += t.OrderNum;
                    });
                });
            });


        });

    }
    refreshData();
}]);

angular.module('crmApp').controller('Statis_today', ['$scope', 'server', '$state', '$mdDialog', 'user', function($scope, server, $state, $mdDialog, user) {

    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    };

    $scope.searchItem = {
        DepartmentId: 0
    };
    $scope.pageChanged = function() {
        refreshData();
    };

    //set current page
    $scope.setCurrentPage = function() {
        $scope.paginator.currentPage = $scope.currentPage;
        refreshData();
    };
    $scope.search = { DepartmentId: 0 };

    $scope.searchFn = function() {

        $scope.searchItem.DepartmentId = $scope.search.DepartmentId;
        refreshData($scope.searchItem);
    }

    function refreshData() {

        var data = angular.extend({
            offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
            limit: $scope.paginator.perPage
        }, $scope.searchItem);
        server.http.get('/api/newcustomer?' + $.param(data)).success(function(res) {
            $scope.paginator.total = res.data.total;
            $scope.customers = res.data.list;
        });
    }
    refreshData();

    server.http.get("/api/departments").success(function(res) {
        $scope.groups = res.data;
    });
}]);

angular.module('crmApp').controller('Statis_signed', ['$scope', 'server',
    function($scope, server) {
        $scope.search = {};
        $scope.search.end = new Date();
        $scope.search.start = new Date();
        $scope.search.start.setMonth($scope.search.start.getMonth() - 1);
        $scope.searchFn = function() {
            var params = {
                starttime: $scope.search.start.toISOString(),
                endtime: $scope.search.end.toISOString()
            }
            server.http.get('/api/customernumbytag?' + $.param(params)).success(function(res) {
                //console.log(res);
                $scope.data1 = res.data;
                var labels = _.map(res.data, 'TagName');
                var data = _.map(res.data, 'CusNum');
                $scope.chart1Options.data = data;
                $scope.chart1Options.labels = labels;
                $scope.total = _.reduce($scope.data1, function(result, n, key) {
                    //result += n.Num
                    return result +n.CusNum;
                }, 0);
                //getDetail(res.data[0]);
            });

            server.http.get('/api/customernumbysource?' + $.param(params)).success(function(res) {
                //console.log(res);
                var labels = _.map(res.data, 'Marking');
                var data = _.map(res.data, 'CusNum');
                $scope.chart2Options.data = data;
                $scope.chart2Options.labels = labels;
                $scope.total2 = _.reduce(res.data, function(result, n, key) {
                    //result += n.Num
                    return result +n.CusNum;
                }, 0);
                //getDetail(res.data[0]);
            });


        }
        $scope.searchFn();

        function getDetail(source) {
            $scope.total2 = source.Num;
            var params = {
                sourceid: source.Id,
                startDate: $scope.search.start.toISOString(),
                endDate: $scope.search.end.toISOString()
            }
            server.http.get('/api/customerbysource?' + $.param(params)).success(function(res) {
                //$scope.chart2Options.options.title.text = source.Marking;
                var data = res.data[0];
                $scope.chart2Options.labels = ['签单', 'A类', 'B类', 'C类', 'D类','E类', 'F类', '公海'];
                $scope.chart2Options.data = [data.BillType, data.AType, data.BType, data.CType, data.DType,data.EType,data.FType, data.GType];
                $scope.chart2Options.title = source.Marking;
            });
        }

        $scope.chart1Options = {
            labels: [],
            data: [],
            options: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            onClick: function(arg) {
                var source = $scope.data1[arg[0]._index];
                getDetail(source);
                //$scope.$apply();
            }
        }

        $scope.chart2Options = {
            data: [],
            labels: [],
            series: ''
        }
    }
]);

angular.module("crmApp").controller("User_group", ["$scope", "server", "$state", "$mdDialog", "user", "$mdToast", function(a, b, c, d, e, f) {
    function g(c) {
        b.http.get("/api/groups?groupId=" + c.DepartmentId).success(function(b) {
            a.members = b.data
        })
    }

    function h() {
        b.http.get("/api/departments").success(function(b) {
            a.groups = b.data,
                a.active(a.groups[0])
        })
    }
    a.user = e.get(),
        a.add = function() {
            d.show({
                controller: "User_group_addGroup",
                templateUrl: "views/user_group_addgroup.html",
                clickOutsideToClose: !0,
                fullscreen: !0
            }).then(function(a) {
                h()
            }, function() {})
        },
        a["delete"] = function(a) {
            confirm("确定要删除？") && b.http["delete"]("/api/departments/" + a).success(function(a) {
                h()
            })
        },
        a.active = function(b) {
            var c = _.find(a.groups, {
                active: !0
            });
            c && (c.active = !1),
                b.active = !0,
                a.seletedDept = b,
                g(b)
        },
        a.addMember = function(b) {
            d.show({
                controller: "User_group_addMember",
                templateUrl: "views/user_group_addMember.html",
                clickOutsideToClose: !0,
                fullscreen: !0,
                locals: {
                    members: a.members,
                    dptId: a.seletedDept.DepartmentId
                }
            }).then(function(b) {
                g(a.seletedDept)
            }, function() {})
        },
        a.deleteMember = function(c) {
            confirm("确定要移除成员？") && b.http.put("/api/delgroup?userid=" + c.UserId).success(function() {
                g(a.seletedDept)
            })
        },
        a.setLeader = function(c) {
            b.http.put("/api/groupleaders?userid=" + c.UserId + "&departmentid=" + a.seletedDept.DepartmentId).success(function(b) {
                g(a.seletedDept)
            })
        },
        h()
}]).controller("User_group_addGroup", ["$scope", "server", "$mdDialog", function(a, b, c) {
    a.ok = function(d) {
            var e = {
                DepartmentName: a.name,
                ParentID: 0
            };
            b.http.post("/api/departments", e).success(function(a) {
                c.hide()
            })
        },
        a.cancel = function() {
            c.cancel()
        }
}]).controller("User_group_addMember", ["$scope", "server", "user", "$mdDialog", "members", "dptId", function(a, b, c, d, e, f) {
    function g() {
        var c = {
            SubsidiaryId: a.user.SubsidiaryId,
            userName: ""
        };
        b.http.get("/api/users?" + $.param(c)).success(function(b) {
            _.each(b.data, function(a) {
                    _.find(e, {
                        UserId: a.UserId
                    }) && (a.hide = !0)
                }),
                a.users = b.data
        })
    }
    a.user = c.get(),
        g(),
        a.ok = function(c) {
            b.http.post("/api/addgroups?departmentid=" + f, a.selecteds).success(function(a) {
                d.hide()
            })
        },
        a.cancel = function() {
            d.cancel()
        }
}]);

angular.module('crmApp').controller('User_outworker', ['$scope', 'server', '$state', '$mdDialog', 'user', function($scope, server, $state, $mdDialog, user) {
    $scope.user = user.get();
    $scope.open = function(item) {
        $mdDialog.show({
                controller: 'User_outwroker_view',
                templateUrl: 'views/user_outworker_view.html',
                clickOutsideToClose: true,
                fullscreen: true,
                locals: { customer: item || {} }
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    };
    $scope.delete = function(item) {
        if(!confirm('您确定要删除？')) return;
        server.http.delete('/api/outworkers/'+item.Id).success(function(res){
            if(res.status) refreshData();
        });
    };

    function refreshData() {
        server.http.get('/api/outworkers').success(function(res) {
            $scope.outworkers= res.data.list;
        });
    }
    refreshData();


}]).controller("User_outwroker_view", ['$scope', 'server', '$mdDialog', '$mdToast', 'customer', function($scope, server, $mdDialog, $mdToast, customer) {
    $scope.postData = customer || {};

    var pages = [];

    $scope.title = customer.Name || "新增外勤";

    $scope.ok = function(ev) {
        var postData = angular.copy($scope.postData);
        if (!customer.Id) {
            server.http.post('/api/outworkers', postData).success(function(res) {
                if (res.status) {
                    $mdDialog.hide();
                }
            });
        } else {
            server.http.put('/api/outworkers/' + customer.Id, postData).success(function(res) {
                if (res.status) {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('修改成功！')
                        .position('top center')
                        .hideDelay(2000)
                    );
                    $mdDialog.hide();
                }
            });
        }

    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    }
}]);

angular.module('crmApp').controller('Contract_manage', ['$scope', '$http', '$state', '$uibModal', 'user', '$q',
  function ($scope, $http, $state, $uibModal, user, $q) {
    $scope.user = user.get()
    $scope.Category = $scope.user.Category
    $scope.IsCenter = $scope.user.IsCenter
    $scope.itemDetail = {}
    $scope.ContractStatus = { // 合同状态
      1: "待审核",
      2: "已审核",
      3: "已驳回",
      8: "中止合同"
    }
    $scope.ContractType = { // 合同类型
      1: "新增",
      2: "续费"
    }
    $scope.FinanceStatus = { // 财务审核
      1: "待审核",
      2: "已审核",
      3: "已驳回"
    }
    $scope.contracts = [] // 合同列表
    $scope.search = {
      contractNo: '',
      companyname: '',
      contact: '',
      saleName: '',
      contractStatus: '0',
      contractType: '0',
      financeStatus : '0',
      starttime: '',
      endtime: ''
    }
    // 分页
    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 15,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    }
    $scope.pageChanged = function () {
        refreshData()
    }
    $scope.setCurrentPage = function () {
        $scope.currentPage = Math.abs(Math.floor($scope.currentPage)) || 1
        $scope.paginator.currentPage = $scope.currentPage
        refreshData()
    }
    // 获取项目下拉选项
    function getProjectItem() {
      $http.get('api/contract/getmainitemlist').success(function(res) {
        // console.log(res, 'res')
        $scope.projectItems = res.data
      })
    }
    getProjectItem()
    // 新增合同
    $scope.open = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/order_contract_add.html',
        controller: 'Order_contract_add',
        backdrop: 'static',
        size: 'hg',
        resolve: {
            contract: {}
        }
      })
      modalInstance.result.then(function (result) {
        refreshData()
      }, function () {

      })
    }
    // 合同查看
    $scope.detail = function(item) {
      // console.log(item, '查看详情本行数据')
      $http.get('/api/contractdetail/' + item.OrderId).success(function(res) {
        // console.log(res)
        $scope.itemDetail = res.data
        var modalInstance = $uibModal.open({
          templateUrl: 'views/order_contract_detail.html',
          controller: 'Order_contract_detail',
          size: 'hg',
          resolve: {
              contractItem: function() {
                return $scope.itemDetail
              },
              projectItems: function() {
                return $scope.projectItems
              }
          }
        })
        modalInstance.result.then(function (result) {
          refreshData()
        }, function () {

        })
      })
    }
    // 合同删除
    $scope.delete = function(item) {
      if (!confirm("确认要删除此条记录吗？")) return
      $http.delete('api/contract/' + item.OrderId).success(function (res) {
        if (res.status) refreshData()
      })
    }
    // 查询条件
    $scope.searchFn = function () {
      // console.log($scope.search)
      refreshData()
    }
    // 合同列表
    function refreshData() {
      var searchIt;
      searchIt = $scope.search
      var data = angular.extend({
          offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
          limit: $scope.paginator.perPage
      }, searchIt, data);
      // console.log(data, '查询参数')
      $http.get('api/contract?' + $.param(data)).success(function(res) {
        // console.log(res, 'res')
        $scope.paginator.total = res.data.total
        $scope.contracts = res.data.list
      })
    }
    refreshData()
    //日期
    $scope.clear = function () {
        $scope.dt = null;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.popup2 = {
        opened: false
    };
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    }
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    }
    $scope.changeDate = function () {
      var d1 = angular.element($("#date1"))[0].value
      var d2 = angular.element($("#date2"))[0].value
      if (d2) {
          var _d1 = d1.replace(/-/ig, "")
          var _d2 = d2.replace(/-/ig, "")
          if ((_d2 - _d1) < 0) {
              angular.element($("#date1"))[0].value = d2
          }
      }
      $scope.search.starttime = d1
      $scope.search.endtime = d2
    }
  }
]).controller('Order_contract_add', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'FileUploader', '$filter', 'user',
  function ($scope, $http, $uibModal, $uibModalInstance, FileUploader, $filter, UserServe) {
    var user = UserServe.get()
    // console.log('user')
    $scope.Math = Math
    $scope.postData = {}
    $scope.areaSele = 0 // 选择用户列表
    $scope.canChange = true // 是否可编辑客户基本信息
    $scope.rlist = [{}]
    $scope.paylist = [{}]
    $scope.money = {}
    $scope.customer = {}
    $scope.PayImagePath = ''
    $scope.uploader1 = []
    $scope.imgIndex = 0
    $scope.projectItems = []

    $scope.contractType = { // 合同类型
      1: "新增",
      2: "续费"
    }

    $scope.payTypes = {
      1: '银行卡转账',
      2: '拉卡拉',
      3: '微信',
      4: '支付宝',
      5: '现金'
    }
    function getProjectItem() { // 获取项目下拉选项
      $http.get('api/contract/getmainitemlist').success(function(res) {
        // console.log(res, 'res')
        $scope.projectItems = res.data
      })
    }
    getProjectItem()

    $scope.getcurProject = function (rg) {
      // console.log(rg.MainItemId)
      rg.contractprojectChildren = {}
      for (var i in $scope.projectItems) {
        if (rg.MainItemId == $scope.projectItems[i].Id) {
          rg.contractprojectChildren = $scope.projectItems[i].Children
        }
      }
    }

    $scope.getAmount = function (rg) {
      // console.log(rg.Amount)
      rg.Amount = +($scope.Math.abs(rg.Amount)).toFixed(2)
    }
    $scope.geteveryAmount = function(rlist) {
      // console.log(rlist)
      var arr = [0, 0, 0, 0]
      for (var i in rlist) {
        if (rlist[i].MainItemId === '1') {
          $scope.chargeAmount = arr[0] += rlist[i].Amount || 0
        } else if (rlist[i].MainItemId === '2') {
          $scope.financeAmount = arr[1] += rlist[i].Amount || 0
        } else if (rlist[i].MainItemId === '3') {
          $scope.outworkAmount = arr[2] += rlist[i].Amount || 0
        } else if (rlist[i].MainItemId === '4') {
          $scope.collectionAmount = arr[3] += rlist[i].Amount || 0
        }
      }
      return arr
    }

    $scope.reduce = function(rlist) {
      return rlist.reduce(function(r,t){
        return r + (t.Amount||0);},0) || 0
    }
    // 图片上唇
    var uploadUrl = 'https://pilipa.oss-cn-beijing.aliyuncs.com'
    $http.get('/api/signkey').success(function (res) {
        delete res.data.Filename
        delete res.data.key
        delete res.data.callback
        delete res.data.expire
        delete res.data.Host
        $scope.signkey = res.data
    })
    $scope.imgClick = function (index) {
      $scope.imgIndex = index
    }
    $scope.addClick= function (index) {
      $scope.uploader1.push(addFileUploadInstance ())
    }
    $scope.uploader1[0] = addFileUploadInstance()
    function addFileUploadInstance () {
      var uploader1 = {}
      uploader1 = new FileUploader({
          autoUpload: true,
          url: uploadUrl
      })
      uploader1.onErrorItem = uploadError
      uploader1.onCompleteItem = function (fileItem, response, status, headers) {
          // $scope.imgs.push(uploadUrl + '/' + item.key)
          // console.log(arguments)
          $scope.PayImagePath = uploadUrl + '/' + $scope._key1
          $scope.paylist[$scope.imgIndex].PayImagePath = $scope.PayImagePath
      }

      uploader1.onErrorItem = function () {
          alert('上传失败')
      }
      uploader1.onBeforeUploadItem = function (item) {
        //item.formData = [];
        // debugger
        var key = buildKey(1, item.file.name);
        item.formData.push({
            key: key
        });
        _.each($scope.signkey, function (value, key) {
            var temp = {};
            temp[key] = value;
            item.formData.push(temp);
        });
        $scope._key1 = key;
      };
      uploader1.filters.push({
        name: 'customFilter',
        fn: function(item, options) {
            var reg = /^.*\.(?:png|jpg|bmp|gif|jpeg)$/;
            if (!reg.test(item.name.toLowerCase())) {
                alert('请选择图片')
                return false
            }
            return true
        }
      })
      return uploader1;
    }
    function buildKey(type, fileName) {
      var randomFilename = ""
      var get_suffix = function (filename) {
        var suffix = ''
        var pos = filename.lastIndexOf('.')

        if (pos != -1) {
            suffix = filename.substring(pos)
        }
        return suffix
      }
      var random_string = function (len) {
        len = len || 32
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        var maxPos = chars.length
        var pwd = ''
        for (var i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
      }
      var suffix = get_suffix(fileName)
      var typMap = 'FileUploads/pay/'
      var nowstr = $filter('date')(new Date(), 'yyyyMM')
      var g_object_name = typMap + nowstr + '/' + random_string(10) + suffix
      return g_object_name
    }
    function uploadError(item) {
      alert('上传失败!')
    }
    $scope.ok = function (ev) {
      if (!$scope.customer.CompanyName) {
        alert('请选择甲方！')
        return
      }
      if (!$scope.customer.Connector) {
        alert('请填写联系人！')
        return
      }
      if (!$scope.customer.Mobile) {
        alert('请填写联系人电话！')
        return
      }
      if (!$scope.postData.ContractNo) {
        alert('请填写合同编号！')
        return
      }
      if (!$scope.postData.OrderType) {
        alert('请选择合同类型！')
        return
      }
      if (!$scope.postData.ContractDate) {
        alert('请填写签订日期！')
        return
      }
      // 验证项目
      // console.log($scope.rlist, '$scope.rlist')
      for (var i in $scope.rlist) {
        if (!$scope.rlist[i].MainItemId) {
          alert('请选择项目！')
          return
        } else if (!$scope.rlist[i].ChildItemId && ($scope.rlist[i].MainItemId !=3)) {
          alert('请选择子项目！')
          return
        } else if ($scope.rlist[i].Amount < 0) {
          alert('项目费用必须是大于0的数！')
          return
        }
      }
      var res = _.filter($scope.rlist, {MainItemId: '1'})
      // console.log(res.length, 'res')
      if (res.length > 1) {
        alert('记账报税只能选一条')
        return
      }
      // console.log(res)
      // 验证支付方式
      for (var i in $scope.paylist) {
        if (!$scope.paylist[i].PayTypeId) {
          alert('请选择支付方式！')
          return
        } else if (!$scope.paylist[i].PayAccountNo && ($scope.paylist[i].PayTypeId != 5)) {
          alert('请填写支付方账号！')
          return
        } else if (!$scope.paylist[i].PayTime) {
          alert('请选择支付时间！')
          return
        } else if (!$scope.paylist[i].PayImagePath && ($scope.paylist[i].PayTypeId != 5)) {
          alert('请上传支付凭证！')
          return
        }
      }

      var a = $scope.chargeAmount || 0
      var b = $scope.financeAmount || 0
      var c = $scope.outworkAmount || 0
      var d = $scope.collectionAmount || 0
      // console.log(a, b, c, d)
      $scope.postData.Amount = a + b + c + d
      // console.log($scope.postData.Amount)
      var RealName = user.RealName
      console.log($scope.postData.Remark)
      if ($scope.postData.Remark) {
        if (/[{}]/.test($scope.postData.Remark)) {
          $scope.postData.Remark = $scope.postData.Remark
        } else {
          $scope.postData.Remark = $scope.postData.Remark  + '{' + RealName + '}'
        }
      }
      // 出现提交多余字段传给后台情况 所以重新赋值下 及 把用户CustomerId传给后台
      $scope.postData.CompanyName = $scope.customer.CompanyName || ''
      $scope.postData.Connector = $scope.customer.Connector || ''
      $scope.postData.Mobile = $scope.customer.Mobile || ''
      $scope.postData.SaleName = $scope.customer.SaleName || ''
      $scope.postData.SalesId =  $scope.customer.SalesId || ''
      $scope.postData.CustomerId = $scope.customer.Id
      // 新建合同时候 需要传递合同 OrderId为0
      $scope.postData.OrderId = 0
      // 需要项目列表和支付列表添加两个字段 "Id":0,"OrderId":0 业务需要
      for (var i in $scope.rlist) {
        $scope.rlist[i].Id = 0
        $scope.rlist[i].OrderId = 0
        if(!$scope.rlist[i].Amount) {
          $scope.rlist[i].Amount = 0
        }
      }
      for (var i in $scope.paylist) {
        $scope.paylist[i].Id = 0
        $scope.paylist[i].OrderId = 0
      }
      // 提交给后台的时候 需要转化rlist paylist字段名是所需的
      $scope.postData.details = $scope.rlist
      $scope.postData.PayInfoList = $scope.paylist
      // console.log($scope.postData)
      $http.post('/api/contract', $scope.postData).success(function(res) {
        // console.log(res)
        if (res.status) {
          alert('合同新建成功')
          $uibModalInstance.close();
        }
      })
    }
    $scope.cancel = function () {
      $uibModalInstance.dismiss()
    }
    // 选择用户列表
    $scope.selectCustomer = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/Order_cusSelect.html',
        controller: 'Order_cusSelect',
        size: 'lg',
      })
      modalInstance.result.then(function (result) {
        $scope.customer = result // 选择完的用户赋值给列表需要显示的地方
        // console.log(result, '读取用户数据')
        $scope.canChange = false
        if (result.AreaCode) {
          $scope.areaSele = result.AreaCode
        }
      }, function () {

      })
    }
    //
    $scope.delete = function (index) {
        $scope.rlist.splice(index, 1);
    }
    $scope.delete2 = function (index) {
        $scope.uploader1.splice(index, 1);
        $scope.paylist.splice(index, 1);
    }
    //日期
    $scope.clear = function () { //清空
        $scope.dt = null;
    }
    $scope.popup1 = {
        opened: false
    }
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    }
  }
]).controller('Order_contract_detail', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'FileUploader','$filter', 'user', 'contractItem', 'projectItems',
  function ($scope, $http, $uibModal, $uibModalInstance, FileUploader, $filter, UserServe, contractItem, projectItems) {
    // console.log(contractItem, 'contractItem')
    // console.log(projectItems, 'projectItems')
    var user = UserServe.get()
    $scope.user = UserServe.get()
    $scope.canChange = true // 是否可编辑
    // $scope.isEdit = false
    $scope.canSave = false // 编辑按钮是否可以点
    $scope.rlist = [{}]
    $scope.paylist = [{}]
    $scope.postDetail = {}
    $scope.PayImagePath = ''
    $scope.uploader1 = []
    $scope.imgIndex = 0
    $scope.canCheck = false // 可以审核
    $scope.canStop = false // 可以终止
    $scope.rlistMoney = {}
    $scope.remark = ''
    $scope.projectItems = projectItems
    $scope.getAmount = function (rg) {
      // console.log(rg.Amount)
      rg.Amount = +($scope.Math.abs(rg.Amount)).toFixed(2)
    }

    contractItem.ContractDate = new Date(contractItem.ContractDate)
    $scope.postDetail = contractItem
    $scope.postDetail.OrderType = $scope.postDetail.OrderType + ''
    // 处理项目list
    for (var i in $scope.postDetail.Details) {
      $scope.postDetail.Details[i].MainItemId = $scope.postDetail.Details[i].MainItemId + ''
      $scope.postDetail.Details[i].ChildItemId = $scope.postDetail.Details[i].ChildItemId + ''
      var contractprojectChildOptions = []
      for (var j in $scope.projectItems) {
        // console.log($scope.postDetail.Details[i].MainItemId == $scope.projectItems[j].Id)
        if ($scope.postDetail.Details[i].MainItemId == $scope.projectItems[j].Id) {
          $scope.postDetail.Details[i].contractprojectChildOptions = $scope.projectItems[j].Children
        }
      }
    }
    $scope.rlist = $scope.postDetail.Details

    // console.log( $scope.postDetail.Details)
    // console.log($scope.rlist)

    // 处理支付方式list
    for (var i in $scope.postDetail.PayInfoList) {
      $scope.postDetail.PayInfoList[i].PayTypeId = $scope.postDetail.PayInfoList[i].PayTypeId + ''
      $scope.postDetail.PayInfoList[i].PayTime = new Date($scope.postDetail.PayInfoList[i].PayTime)
    }
    $scope.paylist = $scope.postDetail.PayInfoList

    $scope.payTypes = {
      1: '银行卡转账',
      2: '拉卡拉',
      3: '微信',
      4: '支付宝',
      5: '现金'
    }
    $scope.contractType = { // 合同类型
      1: "新增",
      2: "续费"
    }

    // 过滤成正整数
    $scope.Math = Math
    // 修改当前项目对应子项目
    $scope.getcurProject = function (index) {
      // console.log($scope.rlist[index], 'item')
      $scope.rlist[index].ChildItemId = ''
      var contractprojectChildOptions = {}
      for (var i in $scope.projectItems) {
        if ($scope.rlist[index].MainItemId == $scope.projectItems[i].Id) {
          contractprojectChildOptions = $scope.projectItems[i].Children
        }
      }
      $scope.rlist[index].contractprojectChildOptions = contractprojectChildOptions
    }
    // 计算各项费用
    $scope.geteveryAmount = function(rlist) {
      // console.log(rlist)
      var arr = [0, 0, 0, 0]
      for (var i in rlist) {
        if (rlist[i].MainItemId === '1') {
          arr[0] += rlist[i].Amount || 0
        } else if (rlist[i].MainItemId === '2') {
          arr[1] += rlist[i].Amount || 0
        } else if (rlist[i].MainItemId === '3') {
          arr[2] += rlist[i].Amount || 0
        } else if (rlist[i].MainItemId === '4') {
          arr[3] += rlist[i].Amount || 0
        }
      }
      return arr
    }
    $scope.reduce = function(rlist) {
      return rlist.reduce(function(r,t){
        return r + (t.Amount||0);},0) || 0
    }
    // 支付list图片上传处理
    $scope.canCompile = function() {
      $scope.paylist.forEach(function(){
          $scope.uploader1[arguments[1]] = addFileUploadInstance()
      })
      // $scope.isEdit = true
      $scope.canChange = false
      $scope.canSave = true
    }

    $scope.delete = function (index) {
        $scope.rlist.splice(index, 1);
    }
    $scope.cancel = function () {
      $uibModalInstance.dismiss()
    }
    // 图片上唇
    var uploadUrl = 'https://pilipa.oss-cn-beijing.aliyuncs.com'
    $http.get('/api/signkey').success(function (res) {
        delete res.data.Filename
        delete res.data.key
        delete res.data.callback
        delete res.data.expire
        delete res.data.Host
        $scope.signkey = res.data
    })
    $scope.imgClick = function (index) {
      $scope.imgIndex = index
    }
    $scope.addClick= function (index) {
      $scope.uploader1.push(addFileUploadInstance ())
    }
    $scope.uploader1[0] = addFileUploadInstance()
    function addFileUploadInstance () {
      var uploader1 = {}
      uploader1 = new FileUploader({
          autoUpload: true,
          url: uploadUrl
      })
      uploader1.onErrorItem = uploadError
      uploader1.onCompleteItem = function (fileItem, response, status, headers) {
          // $scope.imgs.push(uploadUrl + '/' + item.key)
          // console.log(arguments)
          $scope.PayImagePath = uploadUrl + '/' + $scope._key1
          $scope.paylist[$scope.imgIndex].PayImagePath = $scope.PayImagePath
      }

      uploader1.onErrorItem = function () {
          alert('上传失败')
      }
      uploader1.onBeforeUploadItem = function (item) {
        //item.formData = [];
        // debugger
        var key = buildKey(1, item.file.name);
        item.formData.push({
            key: key
        });
        _.each($scope.signkey, function (value, key) {
            var temp = {};
            temp[key] = value;
            item.formData.push(temp);
        });
        $scope._key1 = key;
      };
      uploader1.filters.push({
        name: 'customFilter',
        fn: function(item, options) {
            var reg = /^.*\.(?:png|jpg|bmp|gif|jpeg)$/;
            if (!reg.test(item.name.toLowerCase())) {
                alert('请选择图片')
                return false
            }
            return true
        }
      })
      return uploader1;
    }
    function buildKey(type, fileName) {
      var randomFilename = ""
      var get_suffix = function (filename) {
        var suffix = ''
        var pos = filename.lastIndexOf('.')

        if (pos != -1) {
            suffix = filename.substring(pos)
        }
        return suffix
      }
      var random_string = function (len) {
        len = len || 32
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        var maxPos = chars.length
        var pwd = ''
        for (var i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
      }
      var suffix = get_suffix(fileName)
      var typMap = 'FileUploads/pay/'
      var nowstr = $filter('date')(new Date(), 'yyyyMM')
      var g_object_name = typMap + nowstr + '/' + random_string(10) + suffix
      return g_object_name
    }
    function uploadError(item) {
      alert('上传失败!')
    }
    $scope.delete2 = function (index) {
        $scope.uploader1.splice(index, 1);
        $scope.paylist.splice(index, 1);
    }
    // $scope.add0 = function (m) {
    //   return m<10?'0'+m:m
    // }
    //
    // $scope.formateDate = function (time) {
    //   time = new Date(time);
    //   var y = time.getFullYear();
    //   var m = time.getMonth()+1;
    //   var d = time.getDate();
    //   return y+'-'+$scope.add0(m)+'-'+$scope.add0(d)
    // }
    $scope.check = function () { // 审单人员审核
      // 点击审核发送请求 成功后弹框关闭 刷新数据列表 合同状态变成已审核 财务状态变成待审核
      // console.log($scope.postDetail.OrderId)
      var post = {}
      post.contractId = $scope.postDetail.OrderId
      post.remark = ''
      post.auditVal = 0
      var url = '/api/contract/audit'
      $http.put(url, post).success(function(res) {
        // console.log(res)
        if(res.status) {
          $uibModalInstance.close()
        }
      })
    }
    $scope.refuse = function () { // 审单人员驳回
      // 点击驳回 弹框写原因后发送请求 此时有原因把原因拼接到备注里 然后整体全部数据发给后台 返回成功后 合同状态变成已驳回 财务状态无
      var modalInstance = $uibModal.open({
          templateUrl: 'views/contract_refuse.html',
          controller: 'ContractRefuse1',
          size: "lg",
          resolve: {
              contractMsg: function() {
                  return $scope.postDetail
              }
          },
          backdrop: 'static'
      })
      modalInstance.result.then(function(result) {
          $uibModalInstance.close()
      }, function() {

      });
    }
    $scope.stop = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/contract_refuse.html',
        controller: 'ContractStop',
        size: "lg",
        resolve: {
          contractMsg: function() {
            return $scope.postDetail
          },
          title: function() {
            return '中止合同'
          }
        },
        backdrop: 'static'
      })
      modalInstance.result.then(function(result) {
        $uibModalInstance.close()
        // $scope.postDetail.isCheck = true
        // $scope.postDetail.financestatus = 3
      }, function() {

      });
    }
    $scope.ok = function (ev) {
      if (!$scope.postDetail.CompanyName) {
        alert('请填写甲方名字！')
        return
      }
      if (!$scope.postDetail.Connector) {
        alert('请填写联系人！')
        return
      }
      if (!$scope.postDetail.Mobile) {
        alert('请填写联系人电话！')
        return
      }
      if (!$scope.postDetail.ContractNo) {
        alert('请填写合同编号！')
        return
      }
      if (!$scope.postDetail.OrderType) {
        alert('请选择合同类型！')
        return
      }
      if (!$scope.postDetail.ContractDate) {
        alert('请填写签订日期！')
        return
      }
      // 验证项目
      for (var i in $scope.rlist) {
        if (!$scope.rlist[i].MainItemId) {
          alert('请选择项目！')
          return
        } else if (!$scope.rlist[i].ChildItemId && ($scope.rlist[i].MainItemId !=3)) {
          alert('请选择子项目！')
          return
        } else if ($scope.rlist[i].Amount < 0) {
          alert('项目费用必须是大于0的数！')
          return
        }
      }
      var res = _.filter($scope.rlist, {MainItemId: '1'})
      // console.log(res.length, 'res')
      if (res.length > 1) {
        alert('记账报税只能选一条')
        return
      }
      // 验证支付方式
      for (var i in $scope.paylist) {
        if (!$scope.paylist[i].PayTypeId) {
          alert('请选择支付方式！')
          return
        } else if (!$scope.paylist[i].PayAccountNo && ($scope.paylist[i].PayTypeId != 5)) {
          alert('请填写支付方账号！')
          return
        } else if (!$scope.paylist[i].PayTime) {
          alert('请选择支付时间！')
          return
        } else if (!$scope.paylist[i].PayImagePath && ($scope.paylist[i].PayTypeId != 5)) {
          alert('请上传支付凭证！')
          return
        }
      }

      // 时间
      // if ($scope.postDetail.signTime) {
      //   $scope.postDetail.signTime = $scope.formateDate($scope.postDetail.signTime)
      // }
      // for (let i in $scope.paylist) {
      //   $scope.paylist[i].time = $scope.formateDate($scope.paylist[i].time)
      // }

      // 开始计算修改时候总金额
      var arr = [0, 0, 0, 0]
      for (var i in $scope.rlist) {
        if ($scope.rlist[i].MainItemId === '1') {
          $scope.chargeAmount = arr[0] += $scope.rlist[i].Amount || 0
        } else if ($scope.rlist[i].MainItemId === '2') {
          $scope.financeAmount = arr[1] += $scope.rlist[i].Amount || 0
        } else if ($scope.rlist[i].MainItemId === '3') {
          $scope.outworkAmount = arr[2] += $scope.rlist[i].Amount || 0
        } else if ($scope.rlist[i].MainItemId === '4') {
          $scope.collectionAmount = arr[3] += $scope.rlist[i].Amount || 0
        }
      }
      var a = $scope.chargeAmount || 0
      var b = $scope.financeAmount || 0
      var c = $scope.outworkAmount || 0
      var d = $scope.collectionAmount || 0
      // console.log(a, b, c, d)
      $scope.postDetail.Amount = a + b + c + d
      // console.log($scope.postDetail.Amount)
      // 结束计算修改时候总金额

      // 备注打标签
      var RealName = user.RealName
      if ($scope.remark) {
        var remark
        remark = $scope.postDetail.Remark + $scope.remark  + '{' + RealName + '}'
        $scope.postDetail.Remark = remark
      } else {
        $scope.postDetail.Remark = $scope.postDetail.Remark
      }
      // console.log($scope.remark, RealName)

      // 需要为新增的项目列表和支付列表添加两个字段 "Id":0,"OrderId":0 业务需要
      for (var i in $scope.rlist) {
        if (!$scope.rlist[i].Id) {
          $scope.rlist[i].Id = 0
          $scope.rlist[i].OrderId = 0
        }
        if(!$scope.rlist[i].Amount) {
          $scope.rlist[i].Amount = 0
        }
      }
      for (var i in $scope.paylist) {
        if (!$scope.paylist[i].Id) {
          $scope.paylist[i].Id = 0
          $scope.paylist[i].OrderId = 0
        }
      }
      // 提交给后台的时候 需要转化rlist paylist字段名是所需的
      $scope.postDetail.Details = $scope.rlist
      $scope.postDetail.PayInfoList = $scope.paylist
      // 业务需要 ReceiveAmount =1
      // $scope.postDetail.ReceiveAmount = 1
      // console.log($scope.postDetail)
      var url = '/api/contract/' + $scope.postDetail.OrderId
      $http.put(url, $scope.postDetail).success(function(res) {
        // console.log(res)
        if (res.status) {
          alert('合同修改成功')
          $uibModalInstance.close();
          // $uibModalInstance.dismiss('cancel');
        }
      })
    }
    //日期
    $scope.clear = function () { //清空
        $scope.dt = null;
    }
    $scope.popup1 = {
        opened: false
    }
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    }
  }
]).controller('ContractRefuse1', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'user', function($scope, $http, $uibModalInstance, contract, users) {
  var users = users.get()
  // console.log(users)
  // console.log(contract, 'contract')
  $scope.postData = contract
  $scope.Remark = ''
  $scope.save = function() {
    var RealName = users.RealName
    if ($scope.Remark) {
      $scope.postData.Remark = $scope.postData.Remark + $scope.Remark + '{' + RealName + '}'
    }
    var post = {}
    post.contractId = $scope.postData.OrderId
    post.Remark = $scope.postData.Remark
    post.auditVal = 1
    // console.log(post)
    $http.put('/api/contract/audit', post).success(function(res) {
      // console.log(res)
        if (res.status) {
            $uibModalInstance.close();
        }
    })
  }
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  }
}]).controller("Order_cusSelect", ['$scope', '$http', '$uibModalInstance', function ($scope, $http, $uibModalInstance) {
    $scope.search = {
      CompanyName: ''
    }
    $scope.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 10,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
    }
    $scope.searchParams = {
      limit: 10,
      offset: 0,
      start: '',
      end: '',
      status: 0,
      cusname: '',
      cid: ''
    }
    $scope.pageChanged = function () {
      refreshData()
    }
    //set current page
    $scope.setCurrentPage = function () {
      $scope.paginator.currentPage = $scope.currentPage;
      refreshData()
    }
    $scope.searchItem = {
      companyname: ''
    };
    $scope.search = function () {
      $scope.searchItem.companyname = $scope.search.CompanyName;
      refreshData()
    }

    function refreshData() {
      var data = angular.extend({
        offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
        limit: $scope.paginator.perPage
      }, $scope.searchItem)
      $http.get('/api/order/customer?' + $.param(data)).success(function (res) {
        $scope.paginator.total = res.data.total
        $scope.customers = res.data.list
      })
    }
    refreshData()

    $scope.select = function (item) {
      $uibModalInstance.close(item);
    }
    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    }
}]).controller('ContractStop', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'title', 'user', function($scope, $http, $uibModalInstance, contract, title, users) {
  var users = users.get()
  // console.log(users)
  // console.log(contract, 'contract')
  $scope.postData = contract
  $scope.title = title
  $scope.Remark = ''
  $scope.save = function() {
    if ($scope.Remark) {
      var RealName = users.RealName
      $scope.postData.Remark = $scope.postData.Remark + $scope.Remark + '{' + RealName + '}'
    }
    var post = {}
    post.OrderId = $scope.postData.OrderId
    post.CustomerId = $scope.postData.CustomerId
    post.Remark = $scope.postData.Remark
    $http.put('/api/endcontract', post).success(function(res) {
      // console.log(res)
      if (!res.status && res.errorcode == '-2') {
        alert('该合同已中止')
        $uibModalInstance.close();
      } else if (res.status) {
        $uibModalInstance.close();
      }
    })
  }
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  }
}])

angular.module('crmApp').controller('Signed_manage', ['$scope', '$http', '$state', 'Excel', '$uibModal', 'user', '$q', function($scope, $http, $state, Excel, $uibModal, user, $q) {
  $scope.user = user.get()
  $scope.customers = [] // 签约客户列表数据
  $scope.areas = [] // 所属区域列表
  $scope.markBg = {}

  $scope.companyStatus = { // 服务状态
    1: "待分配",
    2: "未开始",
    3: "外勤服务",
    4: "外勤会计服务",
    5: "会计服务",
    7: "结束",
    8: "中止"
  }
  $scope.outworkStatus = { // 外勤处理状态
    1: "待审核",
    2: "已审核",
    3: '已驳回'
  }
  $scope.accountStatus = { // 会计处理状态
    1: "待审核",
    2: "已审核",
    3: "已驳回",
    5: "部分审核"
  }
  $scope.companys = [] // 所属公司列表

  $scope.search = { // 查询条件
    sequenceNumber: '',
    contractNo: '',
    companyname: '',
    contact: '',
    saleName: '',
    serviceStatus: '0',
    areaCode: '',
    outworkStatus: '0',
    accountStatus: '0',
    starttime: '',
    endtime: ''
  }

  // 分页功能开始
  $scope.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 15,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
  }
  $scope.pageChanged = function () {
      refreshData()
  }
  $scope.setCurrentPage = function () {
      $scope.currentPage = Math.abs(Math.floor($scope.currentPage)) || 1
      $scope.paginator.currentPage = $scope.currentPage
      refreshData()
  }
  // 分页功能结束

  // 获取所属区域
  function getareasList() {
    $http.get('/api/code/area').success(function(res) {
      // console.log(res)
      if(res.status) {
        $scope.areas = res.data
      }
    })
  }
  getareasList()

  // 查询条件
  $scope.searchFn = function () {
    // console.log($scope.search)
    refreshData()
  }
  // 合同列表
  function refreshData() {
    var searchIt;
    searchIt = $scope.search
    var data = angular.extend({
        offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
        limit: $scope.paginator.perPage
    }, searchIt, data);
    // console.log(data, '查询参数')
    $http.get('api/signcustomerlist?' + $.param(data)).success(function(res) {
      // console.log(res, 'res')
      $scope.paginator.total = res.data.total
      $scope.customers = res.data.list
      for (var i in $scope.customers) {
        if ($scope.customers[i].RemarkSignId == 3) {
          $scope.markBg = {'background-color': 'red'}
        } else if ($scope.customers[i].RemarkSignId == 2) {
          $scope.markBg = {'background-color': 'blue'}
        } else if ($scope.customers[i].RemarkSignId == 1) {
          $scope.markBg = {'background-color': '#FFCC33'}
        }
        $scope.customers[i].markBg = $scope.markBg
      }
      // console.log($scope.customers)
    })

  }
  refreshData()

  // 挂起操作
  $scope.gq = function(item) {
    var modalInstance = $uibModal.open({
      templateUrl: 'views/contract_refuse.html',
      controller: 'MarkRefuse',
      resolve: {
        contractMsg: function() {
          return item
        },
        signFrom: function() {
          return false
        },
        title: function() {
          return ''
        }
      },
      backdrop: 'static'
    })
    modalInstance.result.then(function(result) {
      // 挂起后公司状态跟新为挂起
      refreshData()
      // item.companystatus = 6
    }, function() {

    });
  }
  // 取消挂起
  $scope.cancelgq = function(item) {
    var post = {}
    post.CompanyId = item.customerId
    post.SubsidiaryId = item.SubsidiaryId
    post.Description = ''
    $http.put('/api/order/expire/suspendcancel', post).success(function(res) {
      // console.log(res)
      if(res.status) {
        refreshData()
      }
    })
  }
  // 标记操作
  $scope.mark = function(item) {
    var modalInstance = $uibModal.open({
      templateUrl: 'views/contract_refuse.html',
      controller: 'MarkRefuse',
      resolve: {
        contractMsg: function() {
          return item
        },
        signFrom: function() {
          return true
        },
        title: function() {
          return '添加标签'
        }
      },
      backdrop: 'static'
    })
    modalInstance.result.then(function(result) {
      // 挂起后公司状态跟新为挂起
      refreshData()
      // item.companystatus = 6
    }, function() {

    });
  }
  // 取消标记
  $scope.cancelmark = function(item) {
    // 取消标记  点击发送请求 修改tagStatus值为空
    var customerId = item.customerId
    $http.put('/api/cancelcompanysign?customerId=' + customerId).success(function(res) {
      // console.log(res)
      if(res.status) {
        refreshData()
      }
    })
  }
  // 查看详情
  $scope.detail = function(item) {
    // 点击请求接口返回 tab1信息 然后顶部公共部分需要从列表带过去
    var customerId = item.customerId
    // var PartTax = item.PartTax
    // console.log(customerId, 'customerId')
    $http.get('/api/customerdetail/' + customerId).success(function(res) {
      // console.log(res)
      var data = res.data
      if(res.status) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/signed_detail.html',
          controller: 'SignedDetail1',
          size: 'hg',
          resolve: {
            contractMsg: function() { // tab1选项卡内容
              return data
            },
            item: function() { // 顶部公共信息带过去
              return item
            },
            areas: function() { // 所属区域下拉列表
              return $scope.areas
            }
          },
          backdrop: 'static'
        })
        modalInstance.result.then(function(result) {
          refreshData()
        }, function() {

        });
      }
    })
  }
  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
  }
  //日期
  $scope.clear = function () {
      $scope.dt = null;
  };
  $scope.popup1 = {
      opened: false
  };
  $scope.popup2 = {
      opened: false
  };
  $scope.open1 = function () {
      $scope.popup1.opened = true;
  }
  $scope.open2 = function () {
      $scope.popup2.opened = true;
  }
  $scope.changeDate = function () {
    var d1 = angular.element($("#date1"))[0].value
    var d2 = angular.element($("#date2"))[0].value
    if (d2) {
        var _d1 = d1.replace(/-/ig, "")
        var _d2 = d2.replace(/-/ig, "")
        if ((_d2 - _d1) < 0) {
            angular.element($("#date1"))[0].value = d2
        }
    }
    $scope.search.starttime = d1
    $scope.search.endtime = d2
  }
  // 日期功能结束
}]).controller('MarkRefuse', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'signFrom', 'title', 'user',
function($scope, $http, $uibModalInstance, contract, signFrom, title, users) {
  var users = users.get()
  // console.log(users)
  // console.log(signFrom, title, 'title')
  // console.log(contract, 'contract')
  $scope.postData = angular.copy(contract)
  $scope.Remark = ''
  $scope.sign = signFrom // 区分挂起还是标记  标记true 挂起false
  $scope.title = title
  $scope.tags = {
    1: '低',
    2: '中',
    3: '高'
  }
  // 挂起和标记公用一个页面 需要判断是挂起还是标记 发送不同请求
  $scope.save = function() {
    var post = {}
    if (!$scope.sign) { // 挂起
      console.log($scope.postData, '$scope.postData')
      post.CompanyId = $scope.postData.customerId
      post.ChannelId = $scope.postData.SubsidiaryId
      post.Description = $scope.Remark

      // console.log(post)
      var url = '/api/order/expire/suspend'
      $http.put(url, post).success(function(res) {
        // console.log(res)
        if(res.status) {
          $uibModalInstance.close()
        }
      })
    } else if ($scope.sign) { // 标记
      // if ($scope.Remark) {
      //   var RealName = users.RealName
      //   $scope.postData.Remark = $scope.postData.Remark + $scope.Remark + '{' + RealName + '}'
      // }
      if (!$scope.postData.RemarkSignId) {
        alert('请选择标记状态')
      } else {
        post.CustomerId = $scope.postData.customerId
        post.SignVal = $scope.postData.RemarkSignId
        post.Remark = $scope.Remark
        // console.log(post)
        var url = '/api/companySign'
        $http.put(url, post).success(function(res) {
          // console.log(res)
          if(res.status) {
            $uibModalInstance.close()
          }
        })
      }
    }
  }
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  }
}]).controller('SignedDetail1', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'FileUploader','$filter', 'contractMsg', 'item', 'areas', 'user', function($scope, $http, $uibModal, $uibModalInstance, FileUploader, $filter, contract, item, areas, users) {
  var users = users.get()
  // console.log(users)
  // console.log(contract, 'contract')
  $scope.isAccouting = false;
  $scope.title = '签约客户管理>查看';
  $scope.isEdit = true;
  $scope.postDetail = {} // tab1内容
  $scope.item = item // 顶部公共信息 列表带过来
  console.log($scope.item, '$scope.item')
  $scope.industries = [] // 所属行业列表
  $scope.areas = areas // 所属区域列表
  $scope.contractTab = [] // 合同信息lsit页卡2
  $scope.contractTab3 = [] // 合同信息lsit页卡3

  contract.BusnissDeadline = new Date(contract.BusnissDeadline)
  contract.RegisterDate = new Date(contract.RegisterDate)
  // contract.IndustryId = 1
  // contract.AreaCode = '110101'
  // contract.AddedValue = 1
  // console.log(contract.BusnissDeadline, contract.RegisterDate)
  if (new Date(contract.BusnissDeadline).getTime() < 0) {
    contract.BusnissDeadline = ''
  }
  if (new Date(contract.RegisterDate).getTime() < 0) {
    contract.RegisterDate = ''
  }
  contract.IndustryId = contract.IndustryId + ''
  // contract.BusnissDeadline = contract.BusnissDeadline + ''
  // if (contract.BusnissDeadline.substr(0, 4) == "0001") {
  //   contract.BusnissDeadline = ''
  // } else {
  //   contract.BusnissDeadline.replace('T', ' ')
  // }
  $scope.postDetail = contract

  // console.log($scope.item, '$scope.item')
  $scope.customerId = $scope.item.customerId
  // console.log($scope.customerId, 'customerId')

  // DisableCommitAccount提交会计 DisableOutWorkCommitAccount提交外勤 1禁止 0可以提交
  // console.log($scope.item.DisableCommitAccount, $scope.item.DisableOutWorkCommitAccount, '提交会计外勤')
  // 获取所属行业列表信息
  function getIndustries() {
    $http.get('/api/industry').success(function(res) {
      // console.log(res)
      if(res.status) {
        $scope.industries = res.data
      }
    })
  }
  getIndustries()
  // 合同详情 页卡2 3及页卡2 3详情 都用原来老接口
  function gettabmsg() {
    var OrderId = $scope.item.OrderId
    $http.get('/api/contractdetail/' + OrderId).success(function(res) {
      // console.log(res)
      $scope.itemDetail23 = res.data
    })
  }
  gettabmsg()

  $scope.postDataOut = {} // 提交外勤需要这些字段
  $scope.postDataOut.CustomerId = $scope.customerId
  $scope.postDataOut.AreaCode = $scope.postDetail.AreaCode
  $scope.postDataOut.OrderId = $scope.item.OrderId
  // console.log($scope.postDataOut, '$scope.postDataOut')
  // 审核提交会计
  $scope.submitAccount = function() {
    var post = {}
    post.orderId = $scope.itemDetail23.OrderId
    post.partTax = ''
    // 部分提交 会计驳回 外勤待审核 再次提交会计时候 只能选择部分 禁用全部
    var isOnlyPartChoose
    if ($scope.item.DisableCommitAccount == 0 && $scope.item.DisableOutWorkCommitAccount == 1) {
      isOnlyPartChoose = true
    } else {
      isOnlyPartChoose = false
    }

    var modalInstance = $uibModal.open({
      templateUrl: 'views/order_outworker_detail_sub.html',
      controller: 'SubmitAccount',
      size: '',
      resolve: {
        post: function() { // 提交会计传递参数
          return post
        },
        postDataOut: function() {
          return $scope.postDataOut
        },
        isOnlyPartChoose: function() {
          return isOnlyPartChoose
        },
        item: function() {
          return $scope.item
        }
      },
      backdrop: 'static'
    })
    modalInstance.result.then(function(result) {
      // 成功时关闭弹窗刷新页面
      $uibModalInstance.close()
      // 提交会计完成后操作 1.选择资料齐全提交 需要把两个按钮都禁止 2.部分提交需要弹窗选国地税报到外勤任务 如果不选需要禁止会计提交但是提交外勤可以点击 让他可以分配外勤任务 提交完成外勤任务后按钮不可点

    }, function() {

    });
  }
  // 审核提交外勤
  $scope.submitOutwork = function() {
    // 提交外勤完毕后按钮禁止
    var modalInstance = $uibModal.open({
        templateUrl: 'views/order_outworker_add.html',
        controller: 'Signed_outworker_add',
        backdrop: 'static',
        size: 'hg',
        resolve: {
            isShow: function () {
              return true
            },
            postDataOut: function () {
              return $scope.postDataOut
            },
            item: function() {
              return $scope.item
            }
        }
    });
    modalInstance.result.then(function(result) {
        // 成功时关闭弹窗刷新页面
        $uibModalInstance.close()
    }, function(result) {

    })
  }
  // 弹框关闭
  $scope.cancel = function() {
    $uibModalInstance.dismiss()
  }
  // 编辑tab1公司信息
  $scope.edit = function() {
    $scope.isEdit = false
  }
  // 编辑完成
  $scope.save = function() {
    // 保存提交后台信息 后变成不可编辑
    if (!$scope.postDetail.CompanyName) {
      alert ('请填写公司名称')
      return
    }
    if (!$scope.postDetail.Connector) {
      alert ('请填写公司联系人')
      return
    }
    if (!$scope.postDetail.Mobile) {
      alert ('请填写联系人电话')
      return
    }
    if (!$scope.postDetail.AreaCode) {
      alert ('请选择所属区域')
      return
    }
    console.log($scope.item)
    var OrderId = $scope.item.OrderId
    var url = '/api/Customer/' + OrderId + '?verify=1'
    if ($scope.postDetail.NoDeadLine) {
      $scope.postDetail.NoDeadLine = 1
    } else {
      $scope.postDetail.NoDeadLine = 0
    }
    // console.log($scope.postDetail, '保存提交')
    $http.put(url, $scope.postDetail).success(function(res) {
      // console.log(res)
      if(res.status) {
          $uibModalInstance.close()
      }
    })
  }
  // 图片上传
  var uploadUrl = 'https://pilipa.oss-cn-beijing.aliyuncs.com';
  $http.get('/api/signkey').success(function (res) {
      delete res.data.Filename;
      delete res.data.key;
      delete res.data.callback;
      delete res.data.expire;
      delete res.data.Host;
      $scope.signkey = res.data;
  })
  $scope.uploader1 = new FileUploader({
      url: uploadUrl,
      autoUpload: true
  })
  $scope.uploader2 = new FileUploader({
      autoUpload: true,
      url: uploadUrl
  })
  $scope.uploader1.onCompleteItem = function (fileItem, response, status, headers) {
      $scope.postDetail.PersonCardPath = uploadUrl + '/' + $scope._key1;
  }
  $scope.uploader2.onCompleteItem = function (fileItem, response, status, headers) {
      $scope.postDetail.BusinessLicense = uploadUrl + '/' + $scope._key2;
  }
  $scope.uploader1.onBeforeUploadItem = function (item) {
    var key = buildKey(1, item.file.name);
    item.formData.push({
        key: key
    });
    _.each($scope.signkey, function (value, key) {
        var temp = {};
        temp[key] = value;
        item.formData.push(temp);
    });
    $scope._key1 = key;
  }
  $scope.uploader2.onBeforeUploadItem = function (item) {
    var key = buildKey(2, item.file.name)
    item.formData.push({
        key: key
    })
    _.each($scope.signkey, function (value, key) {
        var temp = {}
        temp[key] = value
        item.formData.push(temp)
    });
    $scope._key2 = key
  }
  $scope.uploader1.onErrorItem = function () {
    alert('上传失败!')
  }
  $scope.uploader2.onErrorItem = function () {
    alert('上传失败!')
  }
  $scope.uploader1.filters.push({
    name: 'customFilter',
    fn: verifyImage
  })
  $scope.uploader2.filters.push({
    name: 'customFilter',
    fn: verifyImage
  })
  function buildKey(type, fileName) {
    var randomFilename = ""

    var get_suffix = function (filename) {
      var suffix = ''
      var pos = filename.lastIndexOf('.')

      if (pos != -1) {
          suffix = filename.substring(pos)
      }
      return suffix
    };
    var random_string = function (len) {
      len = len || 32
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var maxPos = chars.length;
      var pwd = ''
      for (var i = 0; i < len; i++) {
          pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    }

    var suffix = get_suffix(fileName);
    var typMap = {
      1: 'FileUploads/Order/CardID/',
      2: 'FileUploads/Order/Contract/'
    }
    var nowstr = $filter('date')(new Date(), 'yyyyMM')
    var g_object_name = typMap[type] + nowstr + '/' + random_string(10) + suffix
    return g_object_name
  }
  function verifyImage(item, options) {
    var reg = /^.*\.(?:png|jpg|bmp|gif|jpeg)$/
    if (!reg.test(item.name.toLowerCase())) {
        alert('请选择图片')
        return false
    }
    return true
  }
  //日期
  $scope.clear = function () { //清空
      $scope.dt = null;
  }
  $scope.popup1 = {
      opened: false
  }
  $scope.popup2 = {
      opened: false
  }
  $scope.open1 = function () {
      $scope.popup1.opened = true;
  }
  $scope.open2 = function () {
      $scope.popup2.opened = true;
  }

  // tab2页卡内容
  $scope.refreshData2 = function() {
    // 点击页卡请求当前页卡数据内容
    $scope.contractTab = $scope.itemDetail23
    var customerId = $scope.item.customerId
    var searchIt = {}
    searchIt.customerId = customerId
    var data = angular.extend({
        offset: ($scope.tab2.paginator.currentPage - 1) * $scope.tab2.paginator.perPage,
        limit: $scope.tab2.paginator.perPage
    }, searchIt, data);
    // console.log(data, '查询参数')
    $http.get('/api/contractlistbycustomerId?'+ $.param(data)).success(function(res){
      // console.log(res)
      if(res.status) {
        $scope.contractTab = res.data.list
        $scope.tab2.paginator.total = res.data.total
      }
    })
  }
  $scope.detailTab2 = function(item) {
    // 弹框查看
    // console.log(item, '点击本行item')
    var OrderId = item.OrderId
    $http.get('/api/contractdetail/' + OrderId).success(function(res) {
      $scope.itemDetail = res.data
      if (res.status) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/signed_tab2_detail.html',
          controller: 'Tab2Detail',
          size: 'lg',
          resolve: {
            contractItem: function() {
              return $scope.itemDetail
            }
          }
        })
        modalInstance.result.then(function (result) {
          $scope.refreshData2()
        }, function () {

        })
      }
    })
  }
  $scope.stop = function(item) {
    // 根据返回状态判断是否是在服务器内 服务器过了就不能终止合同
    var modalInstance = $uibModal.open({
      templateUrl: 'views/contract_refuse.html',
      controller: 'ContractRefuseSigned',
      size: "lg",
      resolve: {
        contractMsg: function() {
          return item
        },
        title: function() {
          return '中止合同'
        }
      },
      backdrop: 'static'
    })
    modalInstance.result.then(function(result) {
      $scope.refreshData2()
    }, function() {

    });
  }

  // tab2分页功能开始
  $scope.tab2 = {}
  $scope.tab2.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 10,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
  }
  $scope.tab2.pageChanged = function () {
      $scope.refreshData2()
  }
  $scope.tab2.setCurrentPage = function () {
      $scope.tab2.currentPage = Math.abs(Math.floor($scope.tab2.currentPage)) || 1
      $scope.tab2.paginator.currentPage = $scope.tab2.currentPage
      $scope.refreshData2()
  }
  // 分页功能结束

  // tab3页卡内容
  $scope.refreshData3 = function() {
    // 点击页卡请求当前页卡数据内容
    $scope.contractTab = $scope.itemDetail23
    var customerId = $scope.item.customerId
    var searchIt = {}
    searchIt.customerId = customerId
    var data = angular.extend({
        offset: ($scope.tab3.paginator.currentPage - 1) * $scope.tab3.paginator.perPage,
        limit: $scope.tab3.paginator.perPage
    }, searchIt, data);
    // console.log(data, '查询参数')
    $http.get('/api/servicefeedbycustomerId?'+ $.param(data)).success(function(res){
      // console.log(res)
      if(res.status) {
        $scope.contractTab3 = res.data.list
        $scope.tab3.paginator.total = res.data.total
      }
    })
  }
  $scope.detailTab3 = function(item) {
    // 弹框查看
    var OrderId = item.OrderId
    $http.get('/api/contractdetail/' + OrderId).success(function(res) {
      $scope.itemDetail3 = res.data
      if (res.status) {
        $http.get('api/contract/getmainitemlist').success(function(res) {
          // console.log(res, 'res')
          if (res.status) {
            $scope.projectItems = res.data
            var modalInstance = $uibModal.open({
              templateUrl: 'views/signed_tab3_detail.html',
              controller: 'Tab3Detail',
              size: 'hg',
              resolve: {
                contractItem: function() {
                  return $scope.itemDetail3
                },
                projectItems: function() {
                  return $scope.projectItems
                }
              }
            })
            modalInstance.result.then(function (result) {
              $scope.refreshData3()
            }, function () {

            })
          }
        })
      }
    })
  }

  // tab3分页功能开始
  $scope.tab3 = {}
  $scope.tab3.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 10,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
  }
  $scope.tab3.pageChanged = function () {
      $scope.refreshData3()
  }
  $scope.tab3.setCurrentPage = function () {
      $scope.tab3.currentPage = Math.abs(Math.floor($scope.tab3.currentPage)) || 1
      $scope.tab3.paginator.currentPage = $scope.tab3.currentPage
      $scope.refreshData3()
  }
  // 分页功能结束

  // tab4页卡内容
  $scope.refreshData4 = function() {
    // 点击页卡请求当前页卡数据内容
    // console.log($scope.postDetail, '$scope.postDetail')
    var customerId = $scope.customerId
    // var customerId = '1201043653'
    var url = '/api/maintask/listforCustomerId/' + customerId + '?'
    var data = angular.extend({
        offset: ($scope.tab4.paginator.currentPage - 1) * $scope.tab4.paginator.perPage,
        limit: $scope.tab4.paginator.perPage
    }, data);
    $http.get(url + $.param(data)).success(function(res) {
      // console.log(res)
      if (res.status) {
        $scope.contractTab4 = res.data.list
        $scope.tab4.paginator.total = res.data.total
      }
    })
  }
  $scope.detailTab4 = function(item) {
    // 弹框查看
    // console.log(item)
    var Id = item.Id
    // var Id = 193
    $http.get('api/maintask/' + Id).success(function(res) {
      // console.log(res, 'res')
      if (res.status) {
        $scope.outworkItems = res.data
        var modalInstance = $uibModal.open({
          templateUrl: 'views/signed_tab4_detail.html',
          controller: 'Tab4Detail',
          size: 'lg',
          resolve: {
            contractItem: function() {
              return $scope.outworkItems
            }
          }
        })
        modalInstance.result.then(function (result) {
          $scope.refreshData4()
        }, function () {

        })
      }
    })
  }

  // tab4分页功能开始
  $scope.tab4 = {}
  $scope.tab4.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 15,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
  }
  $scope.tab4.pageChanged = function () {
      $scope.refreshData4()
  }
  $scope.tab4.setCurrentPage = function () {
      $scope.tab4.currentPage = Math.abs(Math.floor($scope.tab4.currentPage)) || 1
      $scope.tab4.paginator.currentPage = $scope.tab4.currentPage
      $scope.refreshData4()
  }
  // 分页功能结束
  // tab5页卡内容
  $scope.refreshData5 = function() {
    // 点击页卡请求当前页卡数据内容
    var customerId = $scope.customerId
    // var customerId = '1201043653'
    var url = '/api/customer/remark/list/' + customerId + '?'
    var data = angular.extend({
        offset: ($scope.tab5.paginator.currentPage - 1) * $scope.tab5.paginator.perPage,
        limit: $scope.tab5.paginator.perPage
    }, data);
    $http.get(url + $.param(data)).success(function(res) {
      console.log(res)
      if (res.status) {
        $scope.contractTab5 = res.data.list
        $scope.tab5.paginator.total = res.data.total
      }
    })
  }
  $scope.detailTab5 = function(item) {
    // 弹框查看 1标记2挂起
    if (item.Operation == 1) {
      var signFrom = true
    } else if (item.Operation == 2) {
      signFrom = false
    }
    var modalInstance = $uibModal.open({
      templateUrl: 'views/contract_refuse.html',
      controller: 'MarkRefuseTab5',
      resolve: {
        contractMsg: function() {
          return item
        },
        signFrom: function() {
          return signFrom
        },
        title: function() {
          return '查看详情'
        },
        sign: function() {
          return true
        }
      },
      backdrop: 'static'
    })
    modalInstance.result.then(function(result) {
    }, function() {

    });
  }

  // tab5分页功能开始
  $scope.tab5 = {}
  $scope.tab5.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 10,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
  }
  $scope.tab5.pageChanged = function () {
      $scope.refreshData5()
  }
  $scope.tab5.setCurrentPage = function () {
      $scope.tab5.currentPage = Math.abs(Math.floor($scope.tab5.currentPage)) || 1
      $scope.tab5.paginator.currentPage = $scope.tab5.currentPage
      $scope.refreshData5()
  }
  // 分页功能结束

  // tab6页卡内容
    // tab6分页功能开始
    $scope.tab6 = {}
    $scope.tab6.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    }
    $scope.tab6.pageChanged = function () {
        $scope.refreshData6()
    }
    $scope.tab6.setCurrentPage = function () {
        $scope.tab6.currentPage = Math.abs(Math.floor($scope.tab6.currentPage)) || 1
        $scope.tab6.paginator.currentPage = $scope.tab6.currentPage
        $scope.refreshData6()
    }
    // 分页功能结束
  $scope.refreshData6 = function() {
    // 点击页卡请求当前页卡数据内容
    var customerId = $scope.item.customerId
    // var customerId = '111'
    var post = {}
    post.customerId = customerId
    var data = angular.extend({
        offset: ($scope.tab6.paginator.currentPage - 1) * $scope.tab6.paginator.perPage,
        limit: $scope.tab6.paginator.perPage
    }, post, data)
    $http.get('/api/customer/rz?' + $.param(data)).success(function(res) {
      // console.log(res)
      if (res.status) {
        $scope.contractTab6 = res.data.list
        $scope.tab6.paginator.total = res.data.total
        // console.log($scope.contractTab6)
      }
    })
  }

}]).controller('Tab2Detail',  ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'contractItem', function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, contractItem) {
  // console.log(contractItem, 'contractItem')
  $scope.paylist = [{}]
  $scope.postDetail = {}
  $scope.canChange = true
  $scope.postDetail = contractItem
  // $scope.postDetail.ContractDate = $scope.postDetail.ContractDate.slice(0, 10)
  // $scope.postDetail.ServiceStart = $scope.postDetail.ServiceStart.slice(0, 10)
  // $scope.postDetail.ServiceEnd = $scope.postDetail.ServiceEnd.slice(0, 10)
  // console.log($scope.postDetail.ContractDate)
  for (var i in $scope.postDetail.PayInfoList) {
    $scope.postDetail.PayInfoList[i].PayTypeId = $scope.postDetail.PayInfoList[i].PayTypeId + ''
    // $scope.postDetail.PayInfoList[i].PayTime = $scope.postDetail.PayInfoList[i].PayTime.slice(0, 10)
  }
  $scope.paylist = $scope.postDetail.PayInfoList

  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
  }
}]).controller('ContractRefuseSigned', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'title', 'user', function($scope, $http, $uibModalInstance, contract, title, users) {
  var users = users.get()
  // console.log(users)
  console.log(contract, 'contract')
  $scope.postData = contract
  $scope.title = title
  $scope.Remark = ''
  $scope.save = function() {
    if ($scope.Remark) {
      var RealName = users.RealName
      $scope.postData.Remark = $scope.postData.Remark + $scope.Remark + '{' + RealName + '}'
    }
    var post = {}
    post.OrderId = $scope.postData.OrderId
    post.CustomerId = $scope.postData.CustomerId
    post.Remark = $scope.postData.Remark
    $http.put('/api/endcontract', post).success(function(res) {
      // console.log(res)
      if (!res.status && res.errorcode == '-2') {
        alert('该合同已中止')
        $uibModalInstance.close();
      } else if (res.status) {
        $uibModalInstance.close();
      }
    })
  }
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  }
}]).controller('Tab3Detail',  ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'contractItem', 'projectItems', function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, contractItem, projectItems) {
  // console.log(contractItem, 'contractItem')
  $scope.canChange = true
  $scope.isChange = true
  $scope.canSave = false // 编辑和保存按钮切换
  $scope.rlist = [{}]
  $scope.postDetail = {}
  $scope.Math = Math
  $scope.getAmount = function (rg) {
    // console.log(rg.Amount)
    rg.ReceiveAmount = +($scope.Math.abs(rg.ReceiveAmount)).toFixed(2)
  }
  $scope.projectItems = projectItems
  $scope.postDetail = contractItem
  // 处理项目list
  for (var i in $scope.postDetail.Details) {
    $scope.postDetail.Details[i].MainItemId = $scope.postDetail.Details[i].MainItemId + ''
    $scope.postDetail.Details[i].ChildItemId = $scope.postDetail.Details[i].ChildItemId + ''
    var contractprojectChildOptions = []
    for (var j in $scope.projectItems) {
      // console.log($scope.postDetail.Details[i].MainItemId == $scope.projectItems[j].Id)
      if ($scope.postDetail.Details[i].MainItemId == $scope.projectItems[j].Id) {
        $scope.postDetail.Details[i].contractprojectChildOptions = $scope.projectItems[j].Children
      }
    }
  }
  $scope.rlist = $scope.postDetail.Details

  // 可编辑
  $scope.canCompile = function() {
    $scope.canChange = false
    $scope.canSave = true
  }
  // 保存提交修改
  $scope.ok = function() {
    $scope.postDetail.Details = $scope.rlist
    // console.log($scope.postDetail.Details)
    var url = '/api/receivefee/'
    $http.put(url, $scope.postDetail.Details).success(function(res) {
      // console.log(res)
      if (res.status) {
        $uibModalInstance.close();
      }
    })
  }
  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
  }
}]).controller('Tab4Detail',  ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'contractItem', function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, contractItem) {
  // console.log(contractItem, 'contractItem')

  $scope.customers = contractItem

  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
  }
}]).controller('MarkRefuseTab5', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'signFrom', 'title', 'sign', 'user',
function($scope, $http, $uibModalInstance, contract, signFrom, title, sign, users) {
  var users = users.get()
  // console.log(users)
  // console.log(signFrom, title, 'title')
  // console.log(contract, 'contract')
  // console.log(sign, 'sign')
  $scope.postData = contract
  $scope.Remark = ''
  $scope.sign = signFrom
  $scope.title = title
  $scope.isEdit = sign
  // $scope.postData.tagStatus = $scope.postData.Sign + ''// 标记高中低
  // console.log($scope.postData.tagStatus)
  $scope.Remark = $scope.postData.Content // 备注内容
  $scope.tags = {
    1: '低',
    2: '中',
    3: '高'
  }

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  }
}]).controller('SubmitAccount', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'postDataOut', 'isOnlyPartChoose', 'post', 'item', function($scope, $http, $uibModal, $uibModalInstance, postDataOut, isOnlyPartChoose, post, item) {
  // console.log(isOnlyPartChoose, 'isOnlyPartChoose')
  $scope.postDataOut = postDataOut
  $scope.postData = post
  $scope.title = '提交会计'
  // $scope.partT = '' // 存放提交给后台选择类型 0全部1国税2地税
  $scope.isChange = false // 判断选中状态是否可以改变

  console.log(item, 'item')
  $scope.PartTax = item.PartTax
  $scope.AccountantStatus = item.AccountantStatus
  $scope.OutWorkerStatus = item.OutWorkerStatus

  $scope.partT = $scope.PartTax // 驳回后再点开默认限制上次选中
  if ($scope.partT == 1 || $scope.partT == 2) {
    $scope._partT = true
  } else {
    $scope._partT = false
  }
  // 判断再次提交可点不可点
  if ($scope.PartTax != 0 && $scope.AccountantStatus == 3 && $scope.OutWorkerStatus != 3) {
    $scope.isSecondAccount = true
  } else {
    $scope.isSecondAccount = false
  }
  // 审单全部提交给会计后 会计驳回 再次提交时候部分和全部资料都可以选

  // 提交
  $scope.sub = function() {
    if ($scope.partT == null) {
      alert('请选择部分还是全部提交')
    } else {
      // if (isOnlyPartChoose && $scope.partT == 0) { // 部分审核 会计驳回 外勤待审核 只能选择部分提交
      //   alert('只能选择部分提交')
      //   return
      // }
      console.log($scope.partT, '$scope.partT')
      $http.put('/api/order/audit/toaccountant/' + $scope.postData.orderId + '/?partTax=' + $scope.partT ).success(function(res) {
        // console.log(res, 'res')
        if(res.status) {
          // console.log($scope.partT, '$scope.partT')
          if ($scope.partT == 0) { // 资料齐全 提交完成后两个按钮都是禁止点击 弹框关闭刷新页面
            // $uibModalInstance.close({partT:0})
            $uibModalInstance.close()
          } else if ($scope.AccountantStatus == 3 && $scope.OutWorkerStatus != 3) {
            $http.put('/api/order/audit/toaccountant/' + $scope.postData.orderId + '/?partTax=' + $scope.partT).success(function(res) {
              if(res.status) {
                $uibModalInstance.close()
              }
            })
          } else if ($scope.partT != 0) { // 国地税报告 提交完成弹出选择外勤任务的弹框
            var modalInstance = $uibModal.open({
                templateUrl: 'views/order_outworker_add.html',
                controller: 'Signed_outworker_add',
                backdrop: 'static',
                size: 'hg',
                resolve: {
                    isShow: function () {
                      return true
                    },
                    postDataOut: function() {
                      return $scope.postDataOut
                    },
                    item: function() {
                      return item
                    }
                }
            });
            modalInstance.result.then(function(result) {
              // console.log(result, '添加完外勤任务返回结果')
                $uibModalInstance.close() // 添加外勤任务成功后关闭外勤任务弹框 同事关闭之前两个弹窗 刷新页面
            }, function(result) {
              // console.log(result, '第二个弹框接收是否提交外勤') // 如果没有选择外勤任务 也是关闭弹窗 不过此时外勤任务按钮可点
              $uibModalInstance.close()
            })
          } else {
            $uibModalInstance.close()
          }
          // 根据选择国地税报到和外请任务确定按钮是否可点

        }
      })
    }
  }
  $scope.close = function() {
    $uibModalInstance.close()
  }
}]).controller("Signed_outworker_add", ['$scope', '$http', '$uibModal', '$uibModalInstance', 'isShow', 'postDataOut', 'item', 'user', function($scope, $http, $uibModal, $uibModalInstance, isShow, postDataOut, item, UserServe) {
  var user = UserServe.get()
  $scope.isShow = isShow // 是否显示选择公司 选择区域
  $scope.title = "添加外勤任务"
  $scope.postDataOut = postDataOut // 提交外勤任务传递参数
  console.log($scope.postDataOut, '$scope.postDataOut')

  if (item.OutWorkerStatus == 3) { // 已驳回请求接口
    $http.get('/api/maintaske/editbyorderid/' + item.OrderId).success(function(res) {
      if(res.status && res.data.length>0){
        $scope.currentData = res.data[0];
         $scope.postData.Remark = $scope.currentData.Remark
        $scope.renderData();
      }
    })
  }

  $http.get('/api/mycity').success(function(res) {
      $scope.city = res.data[0]
  });
  $http.get('/api/commontask').success(function(res) {
    $scope.tasksArr = formatData(_.filter(res.data, {
        Status: 1
    }));
    $scope.renderData();
  })
  $scope.open1 = false;
  $scope.open2 = false;
  $scope.checkTB = function(tbItem) {
    if (tbItem.checked) {
      _.each($scope.tasksArr, function(item) {
          if (tbItem.CommonTaskId !== item.CommonTaskId) item.checked = false;
      })
    }
  }
  $scope.tbIsDisable = function() {
    return !!_.chain($scope.tasks).pluck('list').flatten().find({
        selected: true
    }).value()
  }
  $scope.otherIsDisable = function() {
    return !!_.find($scope.tasksArr, {
        checked: true
    })
  }

  function formatData(data) {
    var result = []
    var last = {}
    _.each(data, function(item) {
        if (last.CommonTaskId !== item.CommonTaskId) {
            last = _.pick(item, 'CommonTaskName', 'Status', 'CommonTaskId', 'CommonWeight')
            last.TaskList = [_.pick(item, 'TaskName', 'OuterTaskId', 'Weight')]
            result.push(last)
        } else {
            last.TaskList.push(_.pick(item, 'TaskName', 'OuterTaskId', 'Weight'))
        }
    })
    return result
  }

  $scope.areaSele = 0
  $scope.postData = {}

  $scope.ok = function(ev) {
    var tb = _.find($scope.tasksArr, {
      checked: true
    });
    var data = {
      CustomerId: $scope.postDataOut.CustomerId,
      AreaCode: $scope.postDataOut.AreaCode,
      OrderId: $scope.postDataOut.OrderId,
      Remark: $scope.postData.Remark
    };
    var isOthers = false;
    if (tb) { //
      data.CommonTaskId = tb.CommonTaskId;
      data.ChildTasks = _.map(tb.TaskList, function(item) {
          var t = _.chain($scope.tasks).pluck('list').flatten().find({
              Id: item.OuterTaskId
          }).value();
          var temp = _.pick(t, 'TaskName', 'Price', 'Weight', 'Remark');
          temp.TaskId = item.OuterTaskId;
          temp.Weight = item.Weight;
          temp.CustomerId = data.CustomerId;
          return temp;
      });
      data.MainTaskName = tb.CommonTaskName;
    } else {
        isOthers = true;
        var subTasks = _.chain($scope.tasks).pluck('list').flatten().filter({
            selected: true
        }).map(function(item) {
            // delete item.selected;
            //item.MainTaskId =
            return item;
        }).value();
        data.ChildTasks = _.map(subTasks, function(item) {
            var temp = _.pick(item, 'TaskName', 'Price', 'Weight', 'Remark', 'selected');
            temp.TaskId = item.Id;
            temp.CustomerId = data.CustomerId;
            return temp;
        });
        data.MainTaskName = "其他";
        if (data.ChildTasks.length === 0) {
            alert('请选择任务！');
            return;
        }
      }
      if (isOthers) {
          var modalInstance = $uibModal.open({
              templateUrl: 'views/outwork_weight_setting.html',
              controller: 'outworkWeightSetting',
              size: 'lg',
              backdrop: 'static',
              resolve: {
                tasks: function() {
                    return data.ChildTasks;
                }
              }
          });

          modalInstance.result.then(function(result) {
            reSelect(result);
            var tasks = _.map(_.filter(result, { selected: true }), function(t) {
                t.Weight = t._weight;
                delete t.selected;
                return t;
            });
            data.ChildTasks = tasks;
            submit()
          }, function(result) {
              reSelect(result);
          });

          function reSelect(result) {
            _.chain($scope.tasks).pluck('list').flatten().filter(function(t) {
              var temp = _.find(result, { TaskId: t.Id });
              if (temp) {
                  t.selected = temp.selected;
              }
              return !!temp;
            }).value();
          }

      } else {
          submit()
      }

    function submit() {
      $http.post('/api/maintask', data).success(function(res) {
        if (res.status) {
          $uibModalInstance.close();
        }
      });
    }
  };
  $http.get('/api/outertasksub?taskname=&BusinessType=&status=0&offset=0&limit=10000').success(function(res) {
    var data = _.map(_.groupBy(_.filter(res.data.list, {
        Status: 1
    }), 'BusinessType'), function(val, key) {
        var item = {
            list: val
        };
        if (key == 1) {
            item.Name = '税务';
        } else if (key == 2) {
            item.Name = '工商';
        } else {
            item.Name = '其他';
        }
        return item;
    });

    $scope.tasks = data;
    $scope.renderData();
  });
    // $http.get("/api/code/area").success(function(res) {
    //     $scope.areaArr = res.data
    // })
    $scope.tbIsDisable = function() {
        return !!_.chain($scope.tasks).pluck('list').flatten().find({
            selected: true
        }).value();
    }
    $scope.otherIsDisable = function() {
        return !!_.find($scope.tasksArr, {
            checked: true
        });
    }
    $scope.cancel = function() {
      // 关闭弹框时候需要弹框提示 是否取消创建
      if (!confirm("确认要取消任务吗？")) return
      $uibModalInstance.dismiss()
    }
    $scope.renderData = function(){
      if($scope.rendered) return;
      if(!$scope.currentData) return;
      var data = $scope.currentData;
      // data.childrenId = '1343,1284,1285';
      if(data.CommonTaskId > 0){
        $scope.open1 = true;
        if(!$scope.tasksArr) return;
        _.find($scope.tasksArr, function(item){
          if(item.CommonTaskId == data.CommonTaskId){
            item.checked = true;
            return true;
          }
          return false;
        });
      }else{
        if(!$scope.tasks) return;
        $scope.open2 = true;
        var taskIds = data.childrenId.split(',');
        _.each($scope.tasks,function(tgroup){
          _.each(tgroup.list,function(t){
            if(taskIds.indexOf(t.Id + '') > -1){
              t.selected = true;
            }
          });
        });
      }
      $scope.rendered = true;
    }
  }
])

angular.module('crmApp').controller('Finance_manageContract', ['$scope', '$http', '$state', '$timeout', 'Excel', '$uibModal', 'user', '$q', function($scope, $http, $state, $timeout, Excel, $uibModal, user, $q) {
  $scope.user = user.get()
  $scope.contracts = [] // 合同列表数据
  $scope.contractStatus = { // 合同状态
    1: "待审核",
    2: "已审核",
    3: "已驳回",
    4: "中止合同"
  }
  $scope.contractType = { // 合同类型
    1: "新增",
    2: "续费"
  }
  $scope.accountStatus = { // 财务审核
    1: "待审核",
    2: "已审核",
    3: "已驳回"
  }
  $scope.companys = [] // 所属公司列表
  $scope.forwards = {
    isSelectAll: false
  }

  $scope.search = { // 查询条件
    companyname: '',
    contractNo: '',
    subsidairy: '0',
    contact: '',
    saleName: '',
    contractStatus: '0',
    contractType: '0',
    financeStatus: '0',
    starttime: '',
    endtime: ''
  }

  // 分页功能开始
  $scope.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 15,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
  }
  $scope.pageChanged = function () {
      refreshData()
  }
  $scope.setCurrentPage = function () {
      $scope.currentPage = Math.abs(Math.floor($scope.currentPage)) || 1
      $scope.paginator.currentPage = $scope.currentPage
      refreshData()
  }
  // 分页功能结束

  // 获取所属公司列表
  function getcompanysList() {
    $http.get('/api/subsidiary').success(function(res) {
      // console.log(res)
      $scope.companys = res.data.list
    })
  }
  getcompanysList()

  // 查询条件
  $scope.searchFn = function () {
    refreshData()
  }
  // 合同列表
  function refreshData() {
    var searchIt;
    searchIt = $scope.search
    var data = angular.extend({
        offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
        limit: $scope.paginator.perPage
    }, searchIt, data);
    // console.log(data, '查询参数')
    $http.get('api/contract/financelist?' + $.param(data)).success(function(res) {
      // console.log(res, 'res')
      $scope.paginator.total = res.data.total
      $scope.contracts = res.data.list
      for (var i in $scope.contracts) {
        $scope.contracts[i].isCheck = false
      }
      // console.log($scope.contracts, '$scope.contracts')
    })
  }
  refreshData()
  // 获取项目下拉选项
  function getProjectItem() {
    $http.get('api/contract/getmainitemlist').success(function(res) {
      // console.log(res, 'res')
      $scope.projectItems = res.data
    })
  }
  getProjectItem()
  // 查看 审核 驳回功能
  $scope.detail = function (item) {
    $http.get('/api/contractdetail/' + item.OrderId).success(function(res) {
      // console.log(res)
      $scope.itemDetail = res.data
      var modalInstance = $uibModal.open({
        templateUrl: 'views/finance_contract_detail.html',
        controller: 'Finance_contract_detail',
        size: 'hg',
        resolve: {
            contractItem: function() {
              return $scope.itemDetail
            },
            projectItems: function() {
              return $scope.projectItems
            }
        }
      })
      modalInstance.result.then(function (result) {
        refreshData()
      }, function () {

      })
    })
  }
  $scope.check = function (item) {
    // 发送请求 审核成功 财务状态变成已审核
    // console.log(item.OrderId)
    var post = {}
    post.contractId = item.OrderId
    post.remark = ''
    post.auditVal = 0
    $http.put('/api/contract/financeaudit', post).success(function(res) {
      // console.log(res)
      if(res.status) {
        refreshData()
      }
    })
    // item.accountstatus = 2
    // item.isCheck = true
  }
  $scope.refuse = function (item) {
    var modalInstance = $uibModal.open({
      templateUrl: 'views/contract_refuse.html',
      controller: 'ContractRefuse',
      size: "",
      resolve: {
        contractMsg: function() {
          return item
        }
      },
      backdrop: 'static'
    })
    modalInstance.result.then(function(result) {
      refreshData()
      // item.accountstatus = 3
      // item.isCheck = true
    }, function() {

    })
  }
  // 批量操作
  $scope.selectAll = function () {
    if ($scope.forwards.isSelectAll) {
        _.each($scope.contracts, function (item) {
          if (item.FinancialAudit == 1) item.selected = true;
        });
    } else {
        _.each($scope.contracts, function (item) {
          item.selected = false;
        });
    }
  }
  $scope.checkAll = function () {
    var ids = _.map(_.filter($scope.contracts, function (t) {
        return t.FinancialAudit == 1 && t.selected;
    }), function (item) {
        return item.OrderId
    });
    // console.log(ids, 'ids')
    if (ids.length === 0) {
        $scope.forwards.isSelectAll = false
        return
    }

    // 发送请求
    $http.put('/api/contract/financeauditlist', ids).success(function(res) {
      if (res.status) {
        refreshData()
        $scope.forwards.isSelectAll = false
      }
    })
    // $http.put('/api/childtask/trans?ids=' + ids + '&outworkerId=' + $scope.forwards.forwardUserId).success(function (res) {
    //   if (res.status) {
    //     refreshData();
    //     $scope.forwards.isSelectAll = false;
    //   }
    // })
  }

  // 导出excel表格
  $scope.toExcel = function() {
    var downItem = $scope.search
    $http.get('/api/financelistcount?' + $.param(downItem)).success(function(res) {
      // console.log(res)
      if (res.status) {
        var url = '/api/download/financelist?subsidairy=' + downItem.subsidairy + '&contractNo=' + downItem.contractNo + '&companyname=' + downItem.companyname + '&contact=' + downItem.contact + '&saleName=' + downItem.saleName + '&contractStatus=' + downItem.contractStatus + '&contractType=' + downItem.contractType + '&financeStatus=' + downItem.financeStatus + '&starttime=' + downItem.starttime + '&endtime=' + downItem.endtime
        window.open(url)
        // if (res.data > 700) {
        //   alert('总条数过多，请缩小查询范围')
        // } else {
        //   var url = '/api/download/financelist?subsidairy=' + downItem.subsidairy + '&contractNo=' + downItem.contractNo + '&companyname=' + downItem.companyname + '&contact=' + downItem.contact + '&saleName=' + downItem.saleName + '&contractStatus=' + downItem.contractStatus + '&contractType=' + downItem.contractType + '&financeStatus=' + downItem.financeStatus + '&starttime=' + downItem.starttime + '&endtime=' + downItem.endtime
        //   window.open(url)
        // }
      }
    })
      // console.log(downItem.subsidairy,
      // downItem.contractNo,
      // downItem.companyname,
      // downItem.contact,
      // downItem.saleName,
      // downItem.contractStatus,
      // downItem.contractType,
      // downItem.financeStatus,
      // downItem.starttime,
      // downItem.endtime)
      // subsidairy=&contractType=&financeStatus=&contractStatus=&contractNo=&companyname=&contact=&saleName=&starttime=&endtime=
      // var url = '/api/download/financelist?subsidairy=' + downItem.subsidairy + '&contractNo=' + downItem.contractNo + '&companyname=' + downItem.companyname + '&contact=' + downItem.contact + '&saleName=' + downItem.saleName + '&contractStatus=' + downItem.contractStatus + '&contractType' + downItem.contractType + '&financeStatus=' + downItem.financeStatus + '&starttime=' + downItem.starttime + '&endtime=' + downItem.endtime
      // var url = `/api/download/financelist?subsidairy=${downItem.subsidairy || 0}&contractNo=${downItem.contractNo || ''}&companyname=${downItem.companyname || ''}&contact=${downItem.contact || ''}&saleName=${downItem.saleName || ''}&contractStatus=${downItem.contractStatus || 0}&contractType=${downItem.contractType || 0}&financeStatus=${downItem.financeStatus || 0}&starttime=${downItem.starttime || ''}&endtime=${downItem.endtime || ''}`
      // console.log(url)
      // window.open(url)

  }

  //日期
  $scope.clear = function () {
      $scope.dt = null;
  };
  $scope.popup1 = {
      opened: false
  };
  $scope.popup2 = {
      opened: false
  };
  $scope.open1 = function () {
      $scope.popup1.opened = true;
  }
  $scope.open2 = function () {
      $scope.popup2.opened = true;
  }
  $scope.changeDate = function () {
    var d1 = angular.element($("#date1"))[0].value
    var d2 = angular.element($("#date2"))[0].value
    if (d2) {
        var _d1 = d1.replace(/-/ig, "")
        var _d2 = d2.replace(/-/ig, "")
        if ((_d2 - _d1) < 0) {
            angular.element($("#date1"))[0].value = d2
        }
    }
    $scope.search.starttime = d1
    $scope.search.endtime = d2
  }
  // 日期功能结束
}]).controller('Finance_contract_detail', ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'contractItem', 'projectItems',
function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, contractItem, projectItems) {
  // console.log(contractItem, 'contractItem')
  // console.log(projectItems, 'projectItems')
  var user = UserServe.get()
  $scope.user = UserServe.get()
  $scope.canChange = true
  $scope.rlist = [{}]
  $scope.paylist = [{}]
  $scope.postDetail = {}
  $scope.projectItems = projectItems

  contractItem.ContractDate = new Date(contractItem.ContractDate)
  $scope.postDetail = contractItem
  // 处理项目list
  for (var i in $scope.postDetail.Details) {
    $scope.postDetail.Details[i].MainItemId = $scope.postDetail.Details[i].MainItemId + ''
    $scope.postDetail.Details[i].ChildItemId = $scope.postDetail.Details[i].ChildItemId + ''
    var contractprojectChildOptions = []
    for (var j in $scope.projectItems) {
      // console.log($scope.postDetail.Details[i].MainItemId == $scope.projectItems[j].Id)
      if ($scope.postDetail.Details[i].MainItemId == $scope.projectItems[j].Id) {
        $scope.postDetail.Details[i].contractprojectChildOptions = $scope.projectItems[j].Children
      }
    }
  }
  $scope.rlist = $scope.postDetail.Details
  // 处理支付方式list
  for (var i in $scope.postDetail.PayInfoList) {
    $scope.postDetail.PayInfoList[i].PayTypeId = $scope.postDetail.PayInfoList[i].PayTypeId + ''
    $scope.postDetail.PayInfoList[i].PayTime = new Date($scope.postDetail.PayInfoList[i].PayTime)
  }
  $scope.paylist = $scope.postDetail.PayInfoList

  $scope.payTypes = {
    1: '银行卡转账',
    2: '拉卡拉',
    3: '微信',
    4: '支付宝',
    5: '现金'
  }
  $scope.contractType = { // 合同类型
    1: "新增",
    2: "续费"
  }
  $scope.check = function () { // 财务审核
    // 点击审核发送请求 成功后弹框关闭 刷新数据列表 财务状态变成已审核
    // console.log($scope.postDetail.OrderId)
    var post = {}
    post.contractId = $scope.postDetail.OrderId
    post.remark = ''
    post.auditVal = 0
    $http.put('/api/contract/financeaudit', post).success(function(res) {
      // console.log(res)
      if(res.status) {
        $uibModalInstance.close()
      }
    })
    // $http.post().success(function (res) {
    //   if (res.status) {
    //     $scope.postDetail.financestatus = 2
    //   }
    // })
    // $scope.postDetail.financestatus = 2
    // $scope.postDetail.isCheck = true
    // $uibModalInstance.dismiss('cancel')
  }
  $scope.refuse = function () { // 审单人员驳回
    // 点击驳回 弹框写原因后发送请求 此时有原因把原因拼接到备注里 然后整体全部数据发给后台 返回成功后 合同状态变成已驳回 财务状态无
    var modalInstance = $uibModal.open({
      templateUrl: 'views/contract_refuse.html',
      controller: 'ContractRefuse',
      size: "lg",
      resolve: {
        contractMsg: function() {
          return $scope.postDetail
        }
      },
      backdrop: 'static'
    })
    modalInstance.result.then(function(result) {
      $uibModalInstance.close()
      // $scope.postDetail.isCheck = true
      // $scope.postDetail.financestatus = 3
    }, function() {

    });
  }
  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
  }
}]).controller('ContractRefuse', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'user', function($scope, $http, $uibModalInstance, contract, users) {
  var users = users.get()
  // console.log(users)
  // console.log(contract, 'contract')
  $scope.postData = contract
  $scope.Remark = ''
  console.log($scope.postData.Remark, '$scope.postData.Remark')
  $scope.save = function() {
    if ($scope.Remark) {
      var RealName = users.RealName
      if ($scope.postData.Remark) {
        $scope.Remark = $scope.postData.Remark + $scope.Remark + '{' + RealName + '}'
      } else {
        $scope.Remark = $scope.Remark + '{' + RealName + '}'
      }
    }
    var post = {}
    post.contractId = $scope.postData.OrderId
    post.remark = $scope.Remark
    post.auditVal = 1
    $http.put('/api/contract/financeaudit', post).success(function(res) {
      // console.log(res)
      if (res.status) {
          $uibModalInstance.close();
      }
    })
  }
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  }
}])

angular.module('crmApp').controller('AccountingManage', ['$scope', '$http', '$state', '$uibModal', '$filter', 'user', '$q',
    function($scope, $http, $state, $uibModal, $filter, user, $q) {
      $scope.user = user.get();
      $scope.Category = $scope.user.Category
      $scope.areas = [] // 所属区域列表

      // 获取所属区域
      function getareasList() {
        $http.get('/api/code/area').success(function(res) {
          // console.log(res)
          if(res.status) {
            $scope.areas = res.data
          }
        })
      }
      getareasList()

      // 查看详情
      $scope.detail = function(item) {
        // 点击请求接口返回 tab1信息 然后顶部公共部分需要从列表带过去
        var customerId = item.CustomerId
        // var customerId = '100017'
        $http.get('/api/customerdetail/' + customerId).success(function(res) {
          // console.log(res)
          var data = res.data
          if(res.status) {
            var modalInstance = $uibModal.open({
              templateUrl: 'views/signed_detail.html',
              controller: 'AccoutDetail',
              size: 'hg',
              resolve: {
                contractMsg: function() { // tab1选项卡内容
                  return data
                },
                item: function() { // 顶部公共信息带过去
                  return item
                },
                areas: function() { // 所属区域下拉列表
                  return $scope.areas
                }
              },
              backdrop: 'static'
            })
            modalInstance.result.then(function(result) {
              refreshData()
            }, function() {

            });
          }
        })
      }

        $scope.search = {
            SequenceNo: "",
            companyName: "",
            connector: "",
            salesName: "",
            serviceStatus: "",
            accountantStatus: "",
            accountantTaskSource: "",
            contractNo: "",
            contractDateStart: "",
            contractDateEnd: ""
        };
        $scope.paginator = {
            total: 0,
            currentPage: 1,
            perPage: 15,
            previousText: '上一页',
            nextText: '下一页',
            lastText: '最后一页',
            firstText: '首页'
        };

        // $scope.searchItem = {
        //     SequenceNo: "",
        //     companyName: "",
        //     connector: "",
        //     salesName: "",
        //     serviceStatus: "",
        //     accountantStatus: "",
        //     accountantTaskSource: "",
        //     contractNo: "",
        //     contractDateStart: "",
        //     contractDateEnd: ""
        // };
        $scope.pageChanged = function() {
            refreshData();
        };

        //set current page
        $scope.setCurrentPage = function() {
            $scope.currentPage = Math.abs(Math.floor($scope.currentPage)) || 1;
            $scope.paginator.currentPage = $scope.currentPage;
            refreshData();
        };

        //日期
        $scope.clear = function() { //清空
            $scope.dt = null;
        };
        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        }
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        }
        // $scope.changeDate = function(d) {
        //     console.log(d)
        //     // console.log(d2)
        //     // var d1 = angular.element($("#date1"))[0].value
        //     // var d2 = angular.element($("#date2"))[0].value
        //     // if (d2) {
        //     //     var _d1 = d1.replace(/-/ig, "")
        //     //     var _d2 = d2.replace(/-/ig, "")
        //     //     if ((_d2 - _d1) < 0) {
        //     //         angular.element($("#date1"))[0].value = d2
        //     //     }
        //     // }
        //     $scope.search.contractDateStart = d
        //     $scope.search.contractDateEnd = d2
        // }
        $scope.searchFn = function() {
          refreshData()
        }

        function refreshData() {
            // var deferred = $q.defer();
            var searchIt;
            // console.log($scope.dt1)
            // console.log($scope.dt2)
            // $scope.serviceEndDate = $filter('date')(enddate, 'yyyy-MM');
            if ($scope.dt1 && $scope.dt2) {
              if ($scope.dt1.getTime() > $scope.dt2.getTime()) {
                $scope.dt1 = $scope.dt2
              }
              $scope.search.contractDateStart = $filter('date')($scope.dt1, 'yyyy-MM-dd')
              $scope.search.contractDateEnd =  $filter('date')($scope.dt2, 'yyyy-MM-dd')
            }
            searchIt = $scope.search
            var data = angular.extend({
                offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
                limit: $scope.paginator.perPage
            }, searchIt, data);
            // console.log(data, '查询参数')
            $http.get('api/order/audit/list?' + $.param(data)).success(function(res) {
                $scope.paginator.total = res.data.total;
                $scope.customers = res.data.list;
            });
            // return deferred.promise;
        }
        refreshData();
        // 会计审核 列表审核按钮
        $scope.autid = function(item) {
          var modalInstance = $uibModal.open({
              templateUrl: 'views/SetFirstPostMonth.html',
              controller: 'SetFirstPostMonth',
              size: '',
              resolve: {
                contractMsg: function() {
                  return item
                }
              },
              backdrop: 'static'
          });
          modalInstance.result.then(function(result) {
              refreshData();
          }, function() {

          });
        }
        $scope.autidSecond = function(item) {
          var OrderId = item.OrderId,
              AccountantTaskSource = item.AccountantTaskSource,
              PartTax = item.PartTax,
              ServiceStatus = item.ServiceStatus,
              ServiceStart = item.ServiceStart.replace('/', '-'),
              ServiceEnd = item.ServiceEnd.replace('/', '-');
              console.log(OrderId, AccountantTaskSource, PartTax, ServiceStatus, ServiceStart, ServiceEnd)
          $http.put('/api/order/audit/pass/' + OrderId + '?accountantTaskSource=' + AccountantTaskSource + '&partTax=' + PartTax + '&serviceStatus=' + ServiceStatus + '&serviceStartDate=' + ServiceStart + '&serviceEndDate=' + ServiceEnd).success(function(res){
            if (res.status) {
              alert('审核成功')
              refreshData();
            }
          })
        }
        $scope.rejected = function(item) {
            if (!confirm("确认驳回？")) return;
            $http.put('/api/order/audit/reject/' + item.OrderId).success(function(res) {
                if (res.status) refreshData()
            })
        }
    }
]).controller('SetFirstPostMonth', ['$scope', '$http', '$uibModalInstance', '$filter', 'contractMsg', '$mdDialog', 'user', '$uibModal', function($scope, $http, $uibModalInstance, $filter, contractMsg, $mdDialog, user, $uibModal) {
    var date = ''
    // 首报月如果填过就不需要再填 页面默认显示首报月
    $scope.serviceStartDate = ''
    $scope.serviceEndDate = ''
    var months = contractMsg.OrderMonths + contractMsg.GiftMonth
    // console.log(months)
    $scope.clear = function() { //清空
        $scope.dt = null;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.popup2 = {
        opened: false
    };
    $scope.open1 = function() {
        $scope.popup1.opened = true;
    }
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    }
    $scope.changeDate = function() {
      // console.log('计算服务结束日期')
      // $scope.serviceStartDate + months - 1
      // console.log(months)
      var getmonths = months - 1
      // console.log(getmonths)
      // console.log($scope.serviceStartDate, '$scope.serviceStartDate')
      var date = new Date($scope.serviceStartDate);
      var enddate = new Date(date.setMonth(date.getMonth() + getmonths));
      // console.log(date)
      // console.log(enddate)
      // $scope.serviceStartDate = enddate.getFullYear() + '-' + enddate.getMonth()
      // console.log($scope.serviceStartDate, '$scope.serviceStartDate')
      $scope.serviceEndDate = $filter('date')(enddate, 'yyyy-MM');
    }

    $scope.contractNo = contractMsg.ContractNo
    $scope.serveMonth = months + '个月'

    $scope.close = function(){
      $uibModalInstance.close();
    }
    $scope.sub = function(){
      if(!$scope.serviceStartDate){
        confirm('请选择首报月！')
        return
      }
      $scope.serviceStartDate = $filter('date')($scope.serviceStartDate, 'yyyy-MM');
      // console.log($scope.serviceStartDate, 'serviceStartDate')
      // console.log($scope.serviceEndDate, 'serviceEndDate')
      $http.put('/api/order/audit/pass/' + contractMsg.OrderId + '?accountantTaskSource=' + contractMsg.AccountantTaskSource + '&partTax=' + contractMsg.PartTax + '&serviceStatus=' + contractMsg.ServiceStatus + '&serviceStartDate=' + $scope.serviceStartDate + '&serviceEndDate=' + $scope.serviceEndDate).success(function(res){
        if (res.status) {
          $uibModalInstance.close();
        }
      })
    }
    $scope.dis = function(){
      return
    }
}]).controller('AccoutDetail', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'FileUploader','$filter', 'contractMsg', 'item', 'areas', 'user', function($scope, $http, $uibModal, $uibModalInstance, FileUploader, $filter, contract, item, areas, users) {
  $scope.user = users.get()
  // console.log(users)
  // console.log(contract, 'contract')
  $scope.title = '会计审核管理>查看'
  $scope.isAccouting = true
  $scope.isEdit = true
  $scope.postDetail = {} // tab1内容
  $scope.item = item // 顶部公共信息 列表带过来
  console.log($scope.item, '$scope.item')
  $scope.industries = [] // 所属行业列表
  $scope.areas = areas // 所属区域列表
  $scope.contractTab = [] // 合同信息lsit页卡2
  $scope.contractTab3 = [] // 合同信息lsit页卡3

  contract.BusnissDeadline = new Date(contract.BusnissDeadline)
  contract.RegisterDate = new Date(contract.RegisterDate)
  // contract.IndustryId = 1
  // contract.AreaCode = '110101'
  // contract.AddedValue = 1
  $scope.postDetail = contract
  // 提交会计 提交外勤是否可点
  $scope.isSubmitAccount = false
  $scope.isSubmitOutwork = false
  // 根据顶部公司信息里面的 会计审核状态和外勤审核状态 还有驳回来源 判断按钮是否可点

  if ($scope.item.OutWorkerStatus == 3) { // 外勤状态驳回 则都可点
    $scope.isSubmitAccount = false
    $scope.isSubmitOutwork = false
  }
  if ($scope.item.AccountantStatus == 2) {
    $scope.isSubmitAccount = false
    $scope.isSubmitOutwork = false
  }

  // 获取所属行业列表信息
  function getIndustries() {
    $http.get('/api/industry').success(function(res) {
      // console.log(res)
      if(res.status) {
        $scope.industries = res.data
      }
    })
  }
  getIndustries()
  // 合同详情 页卡2 3及页卡2 3详情 都用原来老接口
  function gettabmsg() {
    var OrderId = $scope.item.OrderId
    $http.get('/api/contractdetail/' + OrderId).success(function(res) {
      // console.log(res)
      $scope.itemDetail23 = res.data
    })
  }
  gettabmsg()

  // 会计审核
  $scope.AccountCheck = function() {
    var item = $scope.item
    var modalInstance = $uibModal.open({
        templateUrl: 'views/SetFirstPostMonth.html',
        controller: 'SetFirstPostMonth',
        size: '',
        resolve: {
          contractMsg: function() {
            return item
          }
        },
        backdrop: 'static'
    });
    modalInstance.result.then(function(result) {
        $uibModalInstance.close()
    }, function() {

    });
  }
  $scope.AccountCheckSecond = function() {
    var item = $scope.item
    var OrderId = item.OrderId,
        AccountantTaskSource = item.AccountantTaskSource,
        PartTax = item.PartTax,
        ServiceStatus = item.ServiceStatus,
        ServiceStart = item.ServiceStart.replace('/', '-'),
        ServiceEnd = item.ServiceEnd.replace('/', '-');
        console.log(OrderId, AccountantTaskSource, PartTax, ServiceStatus, ServiceStart, ServiceEnd)
    $http.put('/api/order/audit/pass/' + OrderId + '?accountantTaskSource=' + AccountantTaskSource + '&partTax=' + PartTax + '&serviceStatus=' + ServiceStatus + '&serviceStartDate=' + ServiceStart + '&serviceEndDate=' + ServiceEnd).success(function(res){
      if (res.status) {
        alert('审核成功')
        $uibModalInstance.close()
      }
    })
  }
  // 会计驳回
  $scope.rejected = function() {
    var OrderId = $scope.item.OrderId
    if (!confirm("确认驳回？")) return;
    $http.put('/api/order/audit/reject/' + OrderId).success(function(res) {
        if (res.status) {
          $uibModalInstance.close()
        }
    })
  }
  // 弹框关闭
  $scope.cancel = function() {
    $uibModalInstance.dismiss()
  }
  // 编辑tab1公司信息
  $scope.edit = function() {
    $scope.isEdit = false
  }
  // 编辑完成
  $scope.save = function() {
    // 保存提交后台信息 后变成不可编辑
    if (!$scope.postDetail.Connector) {
      alert ('请填写公司联系人')
      return
    }
    if (!$scope.postDetail.Mobile) {
      alert ('请联系人电话')
      return
    }
    var url = '/api/Customer/500?verify=1'
    if ($scope.postDetail.NoDeadLine) {
      $scope.postDetail.NoDeadLine = 1
    } else {
      $scope.postDetail.NoDeadLine = 0
    }
    // console.log($scope.postDetail, '保存提交')
    $http.put(url, $scope.postDetail).success(function(res) {
      // console.log(res)
      if(res.status) {
          $uibModalInstance.close()
      }
    })
  }
  // 图片上传
  var uploadUrl = 'https://pilipa.oss-cn-beijing.aliyuncs.com';
  $http.get('/api/signkey').success(function (res) {
      delete res.data.Filename;
      delete res.data.key;
      delete res.data.callback;
      delete res.data.expire;
      delete res.data.Host;
      $scope.signkey = res.data;
  })
  $scope.uploader1 = new FileUploader({
      url: uploadUrl,
      autoUpload: true
  })
  $scope.uploader2 = new FileUploader({
      autoUpload: true,
      url: uploadUrl
  })
  $scope.uploader1.onCompleteItem = function (fileItem, response, status, headers) {
      $scope.postDetail.PersonCardPath = uploadUrl + '/' + $scope._key1;
  }
  $scope.uploader2.onCompleteItem = function (fileItem, response, status, headers) {
      $scope.postDetail.BusinessLicense = uploadUrl + '/' + $scope._key2;
  }
  $scope.uploader1.onBeforeUploadItem = function (item) {
    var key = buildKey(1, item.file.name);
    item.formData.push({
        key: key
    });
    _.each($scope.signkey, function (value, key) {
        var temp = {};
        temp[key] = value;
        item.formData.push(temp);
    });
    $scope._key1 = key;
  }
  $scope.uploader2.onBeforeUploadItem = function (item) {
    var key = buildKey(2, item.file.name)
    item.formData.push({
        key: key
    })
    _.each($scope.signkey, function (value, key) {
        var temp = {}
        temp[key] = value
        item.formData.push(temp)
    });
    $scope._key2 = key
  }
  $scope.uploader1.onErrorItem = function () {
    alert('上传失败!')
  }
  $scope.uploader2.onErrorItem = function () {
    alert('上传失败!')
  }
  $scope.uploader1.filters.push({
    name: 'customFilter',
    fn: verifyImage
  })
  $scope.uploader2.filters.push({
    name: 'customFilter',
    fn: verifyImage
  })
  function buildKey(type, fileName) {
    var randomFilename = ""

    var get_suffix = function (filename) {
      var suffix = ''
      var pos = filename.lastIndexOf('.')

      if (pos != -1) {
          suffix = filename.substring(pos)
      }
      return suffix
    };
    var random_string = function (len) {
      len = len || 32
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var maxPos = chars.length;
      var pwd = ''
      for (var i = 0; i < len; i++) {
          pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    }

    var suffix = get_suffix(fileName);
    var typMap = {
      1: 'FileUploads/Order/CardID/',
      2: 'FileUploads/Order/Contract/'
    }
    var nowstr = $filter('date')(new Date(), 'yyyyMM')
    var g_object_name = typMap[type] + nowstr + '/' + random_string(10) + suffix
    return g_object_name
  }
  function verifyImage(item, options) {
    var reg = /^.*\.(?:png|jpg|bmp|gif|jpeg)$/
    if (!reg.test(item.name.toLowerCase())) {
        alert('请选择图片')
        return false
    }
    return true
  }
  //日期
  $scope.clear = function () { //清空
      $scope.dt = null;
  }
  $scope.popup1 = {
      opened: false
  }
  $scope.popup2 = {
      opened: false
  }
  $scope.open1 = function () {
      $scope.popup1.opened = true;
  }
  $scope.open2 = function () {
      $scope.popup2.opened = true;
  }

  // tab2页卡内容
  $scope.refreshData2 = function() {
    // 点击页卡请求当前页卡数据内容
    $scope.contractTab = $scope.itemDetail23
    var customerId = $scope.item.CustomerId
    var searchIt = {}
    searchIt.customerId = customerId
    var data = angular.extend({
        offset: ($scope.tab2.paginator.currentPage - 1) * $scope.tab2.paginator.perPage,
        limit: $scope.tab2.paginator.perPage
    }, searchIt, data);
    // console.log(data, '查询参数')
    $http.get('/api/contractlistbycustomerId?'+ $.param(data)).success(function(res){
      // console.log(res)
      if(res.status) {
        $scope.contractTab = res.data.list
        $scope.tab2.paginator.total = res.data.total
      }
    })
  }
    $scope.detailTab2 = function(item) {
      // 弹框查看
      var OrderId = item.OrderId
      $http.get('/api/contractdetail/' + OrderId).success(function(res) {
        $scope.itemDetail = res.data
        if (res.status) {
          var modalInstance = $uibModal.open({
            templateUrl: 'views/signed_tab2_detail.html',
            controller: 'Tab2DetailAccount',
            size: 'lg',
            resolve: {
              contractItem: function() {
                return $scope.itemDetail
              }
            }
          })
          modalInstance.result.then(function (result) {
            $scope.refreshData2()
          }, function () {

          })
        }
      })
    }

  // tab2分页功能开始
  $scope.tab2 = {}
  $scope.tab2.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 10,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
  }
  $scope.tab2.pageChanged = function () {
      $scope.refreshData2()
  }
  $scope.tab2.setCurrentPage = function () {
      $scope.tab2.currentPage = Math.abs(Math.floor($scope.tab2.currentPage)) || 1
      $scope.tab2.paginator.currentPage = $scope.tab2.currentPage
      $scope.refreshData2()
  }
  // 分页功能结束

  // tab3页卡内容
  $scope.refreshData3 = function() {
    // 点击页卡请求当前页卡数据内容
    $scope.contractTab = $scope.itemDetail23
    var customerId = $scope.item.CustomerId
    var searchIt = {}
    searchIt.customerId = customerId
    var data = angular.extend({
        offset: ($scope.tab3.paginator.currentPage - 1) * $scope.tab3.paginator.perPage,
        limit: $scope.tab3.paginator.perPage
    }, searchIt, data);
    // console.log(data, '查询参数')
    $http.get('/api/servicefeedbycustomerId?'+ $.param(data)).success(function(res){
      // console.log(res)
      if(res.status) {
        $scope.contractTab3 = res.data.list
        $scope.tab3.paginator.total = res.data.total
      }
    })
  }
  $scope.detailTab3 = function(item) {
    // 弹框查看
    var OrderId = item.OrderId
    $http.get('/api/contractdetail/' + OrderId).success(function(res) {
      $scope.itemDetail3 = res.data
      if (res.status) {
        $http.get('api/contract/getmainitemlist').success(function(res) {
          // console.log(res, 'res')
          if (res.status) {
            $scope.projectItems = res.data
            var modalInstance = $uibModal.open({
              templateUrl: 'views/signed_tab3_detail.html',
              controller: 'Tab3DetailAccount',
              size: 'hg',
              resolve: {
                contractItem: function() {
                  return $scope.itemDetail3
                },
                projectItems: function() {
                  return $scope.projectItems
                }
              }
            })
            modalInstance.result.then(function (result) {
              $scope.refreshData3()
            }, function () {

            })
          }
        })
      }
    })
  }

  // tab3分页功能开始
  $scope.tab3 = {}
  $scope.tab3.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 10,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
  }
  $scope.tab3.pageChanged = function () {
      $scope.refreshData3()
  }
  $scope.tab3.setCurrentPage = function () {
      $scope.tab3.currentPage = Math.abs(Math.floor($scope.tab3.currentPage)) || 1
      $scope.tab3.paginator.currentPage = $scope.tab3.currentPage
      $scope.refreshData3()
  }
  // 分页功能结束

  // tab4页卡内容
  $scope.refreshData4 = function() {
    // 点击页卡请求当前页卡数据内容
    var customerId = $scope.item.CustomerId
    var url = '/api/maintask/listforCustomerId/' + customerId + '?'
    var data = angular.extend({
        offset: ($scope.tab4.paginator.currentPage - 1) * $scope.tab4.paginator.perPage,
        limit: $scope.tab4.paginator.perPage
    }, data);
    $http.get(url + $.param(data)).success(function(res) {
      // console.log(res)
      if (res.status) {
        $scope.contractTab4 = res.data.list
        $scope.tab4.paginator.total = res.data.total
      }
    })
  }
  $scope.detailTab4 = function(item) {
    // 弹框查看
    var Id = item.Id
    $http.get('api/maintask/' + Id).success(function(res) {
      // console.log(res, 'res')
      if (res.status) {
        $scope.outworkItems = res.data
        var modalInstance = $uibModal.open({
          templateUrl: 'views/signed_tab4_detail.html',
          controller: 'Tab4DetailAccount',
          size: 'lg',
          resolve: {
            contractItem: function() {
              return $scope.outworkItems
            }
          }
        })
        modalInstance.result.then(function (result) {
          $scope.refreshData4()
        }, function () {

        })
      }
    })
  }

  // tab4分页功能开始
  $scope.tab4 = {}
  $scope.tab4.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 15,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
  }
  $scope.tab3.pageChanged = function () {
      $scope.refreshData4()
  }
  $scope.tab4.setCurrentPage = function () {
      $scope.tab4.currentPage = Math.abs(Math.floor($scope.tab4.currentPage)) || 1
      $scope.tab4.paginator.currentPage = $scope.tab4.currentPage
      $scope.refreshData4()
  }
  // 分页功能结束
  // tab5页卡内容
  $scope.refreshData5 = function() {
    // 点击页卡请求当前页卡数据内容
    var customerId = $scope.item.CustomerId
    var url = '/api/customer/remark/list/' + customerId + '?'
    var data = angular.extend({
        offset: ($scope.tab5.paginator.currentPage - 1) * $scope.tab5.paginator.perPage,
        limit: $scope.tab5.paginator.perPage
    }, data);
    $http.get(url + $.param(data)).success(function(res) {
      // console.log(res)
      if (res.status) {
        $scope.contractTab5 = res.data.list
        $scope.tab5.paginator.total = res.data.total
      }
    })
  }
  $scope.detailTab5 = function(item) {
    // 弹框查看 1标记2挂起
    if (item.Operation == 1) {
      var signFrom = true
    } else if (item.Operation == 2) {
      signFrom = false
    }
    var modalInstance = $uibModal.open({
      templateUrl: 'views/contract_refuse.html',
      controller: 'MarkRefuseTab5Account',
      resolve: {
        contractMsg: function() {
          return item
        },
        signFrom: function() {
          return signFrom
        },
        title: function() {
          return '查看详情'
        },
        sign: function() {
          return true
        }
      },
      backdrop: 'static'
    })
    modalInstance.result.then(function(result) {
    }, function() {

    });
  }

  // tab5分页功能开始
  $scope.tab5 = {}
  $scope.tab5.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 15,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
  }
  $scope.tab5.pageChanged = function () {
      $scope.refreshData5()
  }
  $scope.tab5.setCurrentPage = function () {
      $scope.tab5.currentPage = Math.abs(Math.floor($scope.tab5.currentPage)) || 1
      $scope.tab5.paginator.currentPage = $scope.tab5.currentPage
      $scope.refreshData5()
  }
  // 分页功能结束

  // tab6页卡内容
    // tab6分页功能开始
    $scope.tab6 = {}
    $scope.tab6.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    }
    $scope.tab6.pageChanged = function () {
        $scope.refreshData6()
    }
    $scope.tab6.setCurrentPage = function () {
        $scope.tab6.currentPage = Math.abs(Math.floor($scope.tab6.currentPage)) || 1
        $scope.tab6.paginator.currentPage = $scope.tab6.currentPage
        $scope.refreshData6()
    }
    // 分页功能结束
  $scope.refreshData6 = function() {
    // 点击页卡请求当前页卡数据内容
    var customerId = $scope.item.CustomerId
    var post = {}
    post.customerId = customerId
    var data = angular.extend({
        offset: ($scope.tab6.paginator.currentPage - 1) * $scope.tab6.paginator.perPage,
        limit: $scope.tab6.paginator.perPage
    }, post, data)
    $http.get('/api/customer/rz?' + $.param(data)).success(function(res) {
      // console.log(res)
      if (res.status) {
        $scope.contractTab6 = res.data.list
        $scope.tab6.paginator.total = res.data.total
        // console.log($scope.contractTab6)
      }
    })
  }

}]).controller('Tab2DetailAccount',  ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'contractItem', function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, contractItem) {
  // console.log(contractItem, 'contractItem')
  $scope.paylist = [{}]
  $scope.postDetail = {}
  $scope.canChange = true
  $scope.postDetail = contractItem
  $scope.postDetail.ContractDate = $scope.postDetail.ContractDate.slice(0, 10)
  $scope.postDetail.ServiceStart = $scope.postDetail.ServiceStart.slice(0, 10)
  $scope.postDetail.ServiceEnd = $scope.postDetail.ServiceEnd.slice(0, 10)
  // console.log($scope.postDetail.ContractDate)
  for (var i in $scope.postDetail.PayInfoList) {
    $scope.postDetail.PayInfoList[i].PayTypeId = $scope.postDetail.PayInfoList[i].PayTypeId + ''
    $scope.postDetail.PayInfoList[i].PayTime = $scope.postDetail.PayInfoList[i].PayTime.slice(0, 10)
  }
  $scope.paylist = $scope.postDetail.PayInfoList

  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
  }
}]).controller('Tab3DetailAccount',  ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'contractItem', 'projectItems', function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, contractItem, projectItems) {
  // console.log(contractItem, 'contractItem')
  $scope.canChange = true
  $scope.isChange = true
  $scope.isEdit = true // 会计审核时候不可编辑
  $scope.canSave = false // 编辑和保存按钮切换
  $scope.rlist = [{}]
  $scope.postDetail = {}

  $scope.projectItems = projectItems
  $scope.postDetail = contractItem
  // 处理项目list
  for (var i in $scope.postDetail.Details) {
    $scope.postDetail.Details[i].MainItemId = $scope.postDetail.Details[i].MainItemId + ''
    $scope.postDetail.Details[i].ChildItemId = $scope.postDetail.Details[i].ChildItemId + ''
    var contractprojectChildOptions = []
    for (var j in $scope.projectItems) {
      // console.log($scope.postDetail.Details[i].MainItemId == $scope.projectItems[j].Id)
      if ($scope.postDetail.Details[i].MainItemId == $scope.projectItems[j].Id) {
        $scope.postDetail.Details[i].contractprojectChildOptions = $scope.projectItems[j].Children
      }
    }
  }
  $scope.rlist = $scope.postDetail.Details

  // 可编辑
  $scope.canCompile = function() {
    $scope.canChange = false
    $scope.canSave = true
  }
  // 保存提交修改
  $scope.ok = function() {
    $scope.postDetail.Details = $scope.rlist
    // console.log($scope.postDetail.Details)
    var url = '/api/receivefee/'
    $http.put(url, $scope.postDetail.Details).success(function(res) {
      // console.log(res)
      if (res.status) {
        $uibModalInstance.close();
      }
    })
  }
  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
  }
}]).controller('Tab4DetailAccount',  ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'contractItem', function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, contractItem) {
  // console.log(contractItem, 'contractItem')

  $scope.customers = contractItem

  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
  }
}]).controller('MarkRefuseTab5Account', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'signFrom', 'title', 'sign', 'user',
function($scope, $http, $uibModalInstance, contract, signFrom, title, sign, users) {
  var users = users.get()
  // console.log(users)
  // console.log(signFrom, title, 'title')
  // console.log(contract, 'contract')
  // console.log(sign, 'sign')
  $scope.postData = contract
  $scope.Remark = ''
  $scope.sign = signFrom
  $scope.title = title
  $scope.isEdit = sign
  // $scope.postData.tagStatus = $scope.postData.Sign + ''// 标记高中低
  // console.log($scope.postData.tagStatus)
  $scope.Remark = $scope.postData.Content // 备注内容
  $scope.tags = {
    1: '低',
    2: '中',
    3: '高'
  }

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  }
}])

angular.module('crmApp').controller('OutworkManage', ['$scope', '$http', '$state', '$uibModal', 'user', '$q',
    function($scope, $http, $state, $uibModal, user, $q) {
        $scope.user = user.get();
        // console.log($scope.user)
        $scope.open = function(item) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/order_outworker_add.html',
                controller: 'Order_outworker_a',
                backdrop: 'static',
                size: 'hg',
                resolve: {
                    customer: {}
                }
            });
            modalInstance.result.then(function(result) {
                refreshData();
            }, function() {

            });
        };
        $scope.detail = function(item) {
          var modalInstance = $uibModal.open({
              templateUrl: 'views/order_outworker_detail.html',
              controller: 'Order_outworker_detail',
              size: 'hg',
              resolve: {
                item: function() {
                    return item
                }
              }
          });
          modalInstance.result.then(function(result) {
              refreshData();
          }, function() {

          });
        };

        $scope.taskStatus = { // 任务状态
            1: "待分配",
            2: "待处理",
            3: "进行中",
            4: "已完成",
            5: "已取消"
        };
        if ($scope.user.Category !== 2 && $scope.user.Category !== 8) {
            delete $scope.taskStatus["1"];
        }
        $scope.search = {
            sequenceNo: "",
            companyname: "",
            connector: "",
            taskname: "",
            childtaskname: "",
            outworkId: "",
            starttime: "",
            endtime: "",
            areacode: "",
            salesId: "0",
            taskstatus: "",
            servicestatus: ""
        };
        // 取消任务
        $scope.cancel = function(item) {
          if (!confirm("确认要取消任务吗？")) return
          $http.put('api/maintask/cancelstatus/' + item.Id).success(function(res) {
              if (res.status) refreshData()
          })
        }
        // 判断提交按钮是不是可点
        $scope.isSub = function(item) {
          // console.log(item, '列表数据')
          //  提交分三种情况
          //   1. 审单直接提交给外勤的时候 外勤审核状态OutWorkerStatus=2已审核 会计审核状态AccountantStatus是null的时候 提交时候可以选择资料齐全或者部分
          //   2. 审单分别提交给外勤和会计 审单提交给外勤后外勤要把剩下的部分提交给会计 外勤状态已审核OutWorkerStatus=2 会计审核状态部分审核 AccountantStatus=5 提交的时候只能选择资料齐全
          //   3. 审单提交给外勤 外勤部分提交给会计 外勤状态已审核OutWorkerStatus=2 会计审核状态已驳回AccountantStatus=3 来源是外勤提交的时候AccountantTaskSource 提交的时候选择资料齐全或者部分
          if (item.OutWorkerStatus == 2 && !item.AccountantStatus) {
            $scope.onlyInformationIsAll = false
            return false
          }
          if (item.OutWorkerStatus == 2 && item.AccountantStatus == 5) {
            $scope.onlyInformationIsAll = true // 这种情况的时候只能选择资料齐全提交会计
            return false
          }
          if (item.OutWorkerStatus == 6 && item.AccountantStatus == 5) {
            $scope.onlyInformationIsAll = true // 这种情况的时候只能选择资料齐全提交会计 外勤当月只跑完
            return false
          }
          if (item.AccountantStatus == 3 && item.AccountantTaskSource == '外勤') {
            if (item.ServiceStatus == 3) {
              $scope.onlyInformationIsAll = false
              return false
            }
            $scope.onlyInformationIsAll = true // 外勤二次提交的情况
            return false
          }
          $scope.onlyInformationIsAll = false
          return true
        }
        // 审核提交
        $scope.check = function(item) {
            if (!confirm("确认资料齐全？")) return;
            var PartTax
            if (!item.PartTax) {
                PartTax = 0
            } else {
                PartTax = item.PartTax
            }
            $http.put('api/maintask/audit/pass/' + item.OrderId + '?partTax=' + PartTax).success(function(res) {
                if (res.status) refreshData();
            });
        };
        $scope.reject = function(item) {
            if (!confirm("确认驳回？")) return;
            $http.put('api/maintask/audit/reject/' + item.OrderId).success(function(res) {
                if (res.status) refreshData();
            });
        };
        // 外勤提交给会计弹框选择资料齐全还是部分报税 注意情况2的时候只能选择资料齐全
        $scope.sub = function(item) {
          $scope.isSub(item);
          var modalInstance = $uibModal.open({
              templateUrl: 'views/outworker_sub.html',
              controller: 'Order_outworkerDetail_sub',
              size: '',
              resolve: {
                item: function() {
                    return item
                },
                onlyInformationIsAll: function() {
                  return $scope.onlyInformationIsAll
                }
              }
          });
          modalInstance.result.then(function(result) {
            refreshData();
          }, function() {

          });
        };
        //日期
        $scope.clear = function() { //清空
            $scope.dt = null;
        };

        $scope.changeDate = function() {

            var d1 = angular.element($("#date1"))[0].value
            var d2 = angular.element($("#date2"))[0].value
            if (d2) {
                var _d1 = d1.replace(/-/ig, "")
                var _d2 = d2.replace(/-/ig, "")
                if ((_d2 - _d1) < 0) {
                    angular.element($("#date1"))[0].value = d2
                }
            }
            $scope.search.starttime = d1
            $scope.search.endtime = d2
        }
        $scope.paginator = {
            total: 0,
            currentPage: 1,
            perPage: 15,
            previousText: '上一页',
            nextText: '下一页',
            lastText: '最后一页',
            firstText: '首页'
        };

        $scope.searchItem = {
            sequenceNo: "",
            companyname: "",
            connector: "",
            taskname: "",
            childtaskname: "",
            outworkId: "0",
            starttime: "",
            endtime: "",
            areacode: "",
            salesId: "0",
            taskstatus: "",
            servicestatus: ""
        };
        $scope.pageChanged = function() {
            refreshData();
        };

        //set current page
        $scope.setCurrentPage = function() {
            $scope.currentPage = Math.abs(Math.floor($scope.currentPage)) || 1;
            $scope.paginator.currentPage = $scope.currentPage;
            refreshData();
        };

        //日期
        $scope.clear = function() { //清空
            $scope.dt = null;
        };
        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        }
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        }
        $scope.changeDate = function() {

            var d1 = angular.element($("#date1"))[0].value
            var d2 = angular.element($("#date2"))[0].value
            if (d2) {
                var _d1 = d1.replace(/-/ig, "")
                var _d2 = d2.replace(/-/ig, "")
                if ((_d2 - _d1) < 0) {
                    angular.element($("#date1"))[0].value = d2
                }
            }
            $scope.search.starttime = d1
            $scope.search.endtime = d2
        }
        $scope.searchFn = function() {
            $scope.searchItem.companyname = $scope.search.companyname;
            $scope.searchItem.sequenceNo = $scope.search.sequenceNo;
            $scope.searchItem.connector = $scope.search.connector; //???
            $scope.searchItem.taskname = $scope.search.taskname;
            $scope.searchItem.childtaskname = $scope.search.childtaskname;
            $scope.searchItem.starttime = $scope.search.starttime;
            $scope.searchItem.endtime = $scope.search.endtime;
            $scope.searchItem.areacode = $scope.search.areacode
            $scope.searchItem.salesId = $scope.search.salesId;
            $scope.searchItem.outworkId = $scope.search.outworkId || 0;
            $scope.searchItem.taskstatus = $scope.search.taskstatus
            $scope.searchItem.servicestatus = $scope.search.servicestatus
            refreshData($scope.searchItem);
        }

        function refreshData() {
            // var deferred = $q.defer();
            var searchIt;
            searchIt = $scope.searchItem
            var data = angular.extend({
                offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
                limit: $scope.paginator.perPage
            }, searchIt, data);
            // maintask？ Id = & companyname = & connector = & taskname = & childtaskname = & starttime = & endtime = & areacode = & salesId = 0 & outworkId = 0 & taskstatus = & offset = 0 & limit = 15
            $http.get('api/maintask?' + $.param(data)).success(function(res) {
                $scope.paginator.total = res.data.total;
                $scope.customers = res.data.list;
            });
            // return deferred.promise;
        }
        refreshData();
        // 获取销售人员
        $http.get("/api/contract/sales").success(function(res) {
            $scope.users = res.data;
        });
        // 获取外勤人员
        $http.get('api/outworkers').success(function(res) {
            $scope.outworkers = res.data.list;
        });
        // 获取当前子任务
        $http.get('/api/commontask').success(function(res) {
            $scope.Tasks = formatData(res.data);
        })
            // $scope.taskchange = function () {
            //     if (!$scope.search.taskname) {
            //         return
            //     }
            //     var subTask = _.find($scope.Tasks, function (chr) {
            //         return chr.CommonTaskId == $scope.search.taskname
            //     })
            //     $scope.search.childtaskname = ""
            //     $scope.outTasks = subTask.TaskList;
            // }
            // $http.get('/api/outertasksub?taskname=&BusinessType=&status=0&offset=0&limit=100000').success(function(res) {
        $scope.outTasks = []
            // })
        $http.get('/api/code/area').success(function(res) {
            $scope.areas = res.data
        })
        $http.get('/api/outertasksub?offset=0&limit=9999').success(function(res) {
            $scope.outTasks = _.filter(res.data.list, {
                Status: 1
            });
        });

        function formatData(data) {
            var result = [];
            var last = {};
            _.each(data, function(item) {
                if (last.CommonTaskId !== item.CommonTaskId) {
                    last = _.pick(item, 'CommonTaskName', 'Status', 'CommonTaskId', 'CommonWeight');
                    last.TaskList = [_.pick(item, 'TaskName', 'OuterTaskId', 'Weight')];
                    result.push(last);
                } else {
                    last.TaskList.push(_.pick(item, 'TaskName', 'OuterTaskId', 'Weight'));
                }
            });
            return result;

        }

    }
]).controller("Order_outworker_a", ['$scope', '$http', '$uibModal', '$uibModalInstance', 'customer', 'user',
    function($scope, $http, $uibModal, $uibModalInstance, customer, UserServe) {
        var user = UserServe.get();
        $http.get('/api/mycity').success(function(res) {
            $scope.city = res.data[0];
        });
        $http.get('/api/commontask').success(function(res) {
            $scope.tasksArr = formatData(_.filter(res.data, {
                Status: 1
            }));

        });
        $scope.open1 = false;
        $scope.open2 = false;
        $scope.checkTB = function(tbItem) {
            if (tbItem.checked) {
                _.each($scope.tasksArr, function(item) {
                    if (tbItem.CommonTaskId !== item.CommonTaskId) item.checked = false;
                });
            }
        }
        $scope.tbIsDisable = function() {
            return !!_.chain($scope.tasks).pluck('list').flatten().find({
                selected: true
            }).value();
        }
        $scope.otherIsDisable = function() {
            return !!_.find($scope.tasksArr, {
                checked: true
            });
        }

        function formatData(data) {
            var result = [];
            var last = {};
            _.each(data, function(item) {
                if (last.CommonTaskId !== item.CommonTaskId) {
                    last = _.pick(item, 'CommonTaskName', 'Status', 'CommonTaskId', 'CommonWeight');
                    last.TaskList = [_.pick(item, 'TaskName', 'OuterTaskId', 'Weight')];
                    result.push(last);
                } else {
                    last.TaskList.push(_.pick(item, 'TaskName', 'OuterTaskId', 'Weight'));
                }
            });
            return result;

        }
        $scope.postData = {};
        $scope.postData.areaSele = 0;

        if (customer.Id) {
            $scope.cus_selected = true;
            $scope.postData.Customer = customer;
        }
        $scope.title = "添加外勤任务";

        $scope.ok = function(ev) {
            if (!$scope.postData.Customer) {
                alert('请选择公司！');
                return;
            }
            //tongban
            var tb = _.find($scope.tasksArr, {
                checked: true
            });
            var data = {
                CustomerId: $scope.postData.Customer.Id,
                AreaCode: $scope.postData.areaSele,
                Remark: $scope.postData.Remark
            };
            var isOthers = false;
            if (tb) { //
                data.CommonTaskId = tb.CommonTaskId;
                data.ChildTasks = _.map(tb.TaskList, function(item) {
                    var t = _.chain($scope.tasks).pluck('list').flatten().find({
                        Id: item.OuterTaskId
                    }).value();
                    var temp = _.pick(t, 'TaskName', 'Price', 'Weight', 'Remark');
                    temp.TaskId = item.OuterTaskId;
                    temp.Weight = item.Weight;
                    temp.CustomerId = data.CustomerId;
                    return temp;
                });
                data.MainTaskName = tb.CommonTaskName;
            } else {
                isOthers = true;
                var subTasks = _.chain($scope.tasks).pluck('list').flatten().filter({
                    selected: true
                }).map(function(item) {
                    // delete item.selected;
                    //item.MainTaskId =
                    return item;
                }).value();
                data.ChildTasks = _.map(subTasks, function(item) {
                    var temp = _.pick(item, 'TaskName', 'Price', 'Weight', 'Remark', 'selected');
                    temp.TaskId = item.Id;
                    temp.CustomerId = data.CustomerId;
                    return temp;
                });
                data.MainTaskName = "其他";
                if (data.ChildTasks.length === 0) {
                    alert('请选择任务！');
                    return;
                }
            }

            if (!$scope.postData.areaSele) {
                alert('请选择区域！');
                return;
            }
            if (isOthers) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/outwork_weight_setting.html',
                    controller: 'outworkWeightSetting',
                    size: 'lg',
                    backdrop: 'static',
                    resolve: {
                        tasks: function() {
                            return data.ChildTasks;
                        }
                    }
                });

                modalInstance.result.then(function(result) {
                    reSelect(result);
                    var tasks = _.map(_.filter(result, { selected: true }), function(t) {
                        t.Weight = t._weight;
                        delete t.selected;
                        return t;
                    });
                    data.ChildTasks = tasks;
                    submit()
                }, function(result) {
                    reSelect(result);
                });

                function reSelect(result) {
                    _.chain($scope.tasks).pluck('list').flatten().filter(function(t) {
                        var temp = _.find(result, { TaskId: t.Id });
                        if (temp) {
                            t.selected = temp.selected;
                        }
                        return !!temp;
                    }).value();
                }

            } else {
                submit()
            }

            function submit() {
                $http.post('/api/maintask', data).success(function(res) {
                    if (res.status) {
                        // alert('添加成功!');
                        $uibModalInstance.close();
                    }
                });
            }


        };
        $http.get('/api/outertasksub?taskname=&BusinessType=&status=0&offset=0&limit=10000').success(function(res) {
            var data = _.map(_.groupBy(_.filter(res.data.list, {
                Status: 1
            }), 'BusinessType'), function(val, key) {
                var item = {
                    list: val
                };
                if (key == 1) {
                    item.Name = '税务';
                } else if (key == 2) {
                    item.Name = '工商';
                } else {
                    item.Name = '其他';
                }
                return item;
            });

            $scope.tasks = data;
        });
        $http.get("/api/code/area").success(function(res) {
            $scope.areaArr = res.data
        })
        $scope.tbIsDisable = function() {
            return !!_.chain($scope.tasks).pluck('list').flatten().find({
                selected: true
            }).value();
        }
        $scope.otherIsDisable = function() {
            return !!_.find($scope.tasksArr, {
                checked: true
            });
        }
        $scope.cancel = function() {
            $uibModalInstance.dismiss()
        };
        $scope.selectCustomer = function() {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/Order_cusSelect.html',
                controller: 'Order_cusSelect',
                size: 'lg',
            });
            modalInstance.result.then(function(result) {
                $scope.postData.Customer = result;
                if (result.AreaCode) {
                    $scope.postData.areaSele = result.AreaCode;
                }
            }, function() {

            });
        }


    }
]).controller("Order_outworker_detail", ['$scope', '$http', '$uibModalInstance', 'item', '$mdDialog', 'user', '$uibModal',
    function($scope, $http, $uibModalInstance, item, $mdDialog, user, $uibModal) {
        $scope.user = user
        console.log(item, 'item')
        $scope.item = item
        $scope.isSub = function() {
          if ($scope.item.OutWorkerStatus == 2 && !$scope.item.AccountantStatus) {
            $scope.onlyInformationIsAll = false
            return false
          }
          if ($scope.item.OutWorkerStatus == 2 && $scope.item.AccountantStatus == 5) {
            $scope.onlyInformationIsAll = true // 这种情况的时候只能选择资料齐全提交会计
            return false
          }
          if (item.OutWorkerStatus == 6 && item.AccountantStatus == 5) {
            $scope.onlyInformationIsAll = true // 这种情况的时候只能选择资料齐全提交会计 外勤当月只跑完
            return false
          }
          if ($scope.item.AccountantStatus == 3 && $scope.item.AccountantTaskSource == '外勤') {
          // if (item.OutWorkerStatus == 2 && item.AccountantStatus == 3 && item.AccountantTaskSource == '外勤') {
            if ($scope.item.ServiceStatus == 3) {
              $scope.onlyInformationIsAll = false // 外勤二次提交的情况
              return false
            }
            $scope.onlyInformationIsAll = true // 外勤二次提交的情况
            return false
          }
          $scope.onlyInformationIsAll = false
          return true
        }

        var taskId = item.Id
        $scope.ifSub = true
        $scope.customers = [];
        $scope.user = user.get();
        $scope.forwards = {
            forwardUserId: '0',
            isSelectAll: false
        };
        // $scope.dynamicPopover = {
        //     content: item.Remark,
        //     title: '备注'
        // }
        var count = 0

        function refreshData() {
            count++;
            $http.get('/api/maintask/' + taskId).success(function(res) {
                $scope.customers = res.data;
            });
        }
        $http.get('/api/outworkers').success(function(res) {
            $scope.outworkers = res.data.list;
        });
        $scope.cancel = function() {
            if (($scope.user.Category === 8 || $scope.user.Category === 2) && !_.every($scope.customers, function(t) {
                    return t.Status > 1
                })) {
                if (confirm('还有任务未分配，确认关闭？')) {
                    close();
                    return;
                }
                return;
            }
            close();
        };
        // 查看详情时候的提交
        $scope.sub = function() {
          $scope.isSub()
          var modalInstance = $uibModal.open({
              templateUrl: 'views/outworker_sub.html',
              controller: 'Order_outworkerDetail_sub',
              size: '',
              resolve: {
                item: function() {
                    return item
                },
                onlyInformationIsAll: function() {
                  return $scope.onlyInformationIsAll
                }
              }
          });
          modalInstance.result.then(function(result) {
              close()
              refreshData();
          }, function() {

          });
        }

        function close() {
            if (count > 0) {
                $uibModalInstance.close();
            } else {
                $uibModalInstance.dismiss();
            }
        }
        $scope.forward = function(item) {
            $mdDialog.show({
                    controller: 'OutworkForward',
                    templateUrl: 'views/customer_forward.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                })
                .then(function(result) {
                    $http.put('/api/childtask/trans?ids=' + item.Id + '&outworkerId=' + result).success(function(res) {
                        if (res.status) {
                            refreshData();
                        }
                    });
                }, function() {

                });

        };
        $scope.forwardAll = function() {
            var ids = _.map(_.filter($scope.customers, function(t) {
                return t.Status <= 3 && t.selected;
            }), function(item) {
                return item.Id
            }).join(',');
            if (ids.length === 0) {
                $scope.forwards.isSelectAll = false;
                $scope.forwards.forwardUserId = '0';
                return;
            }

            $http.put('/api/childtask/trans?ids=' + ids + '&outworkerId=' + $scope.forwards.forwardUserId).success(function(res) {
                if (res.status) {
                    refreshData();
                    $scope.forwards.isSelectAll = false;
                    $scope.forwards.forwardUserId = '0';
                }
            });

        }
        $scope.statusChange = function(item, status, str) {
            if (!confirm('确认要“' + str + '”?')) return;
            $http.put('/api/childtask/' + item.Id + '/' + status).success(function() {

                refreshData();

            })
        };
        $scope.editCompany = function(item) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/companyEdit.html',
                controller: 'CompanyEdit',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    companyId: function() {
                        return item.CustomerId;
                    }
                }
            });

            modalInstance.result.then(function(result) {
                $http.put('/api/childtask/trans?ids=' + item.Id + '&outworkerId=' + result).success(function(res) {
                    if (res.status) {
                        refreshData();
                    }
                });
            }, function() {

            });
        }
        $scope.selectAll = function() {
            if ($scope.forwards.isSelectAll) {
                _.each($scope.customers, function(item) {
                    if (item.Status <= 3) item.selected = true;
                });
            } else {
                _.each($scope.customers, function(item) {
                    item.selected = false;
                });
            }
        };
        refreshData();

    }
]).controller("Order_cusSelect", ['$scope', '$http', '$uibModalInstance', function($scope, $http, $uibModalInstance) {



    $scope.search = {
        CompanyName: ''
    };


    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    };

    $scope.searchParams = {
        limit: 10,
        offset: 0,
        start: '',
        end: '',
        status: 0,
        cusname: '',
        cid: ''
    };
    $scope.pageChanged = function() {
        refreshData();
    };

    //set current page
    $scope.setCurrentPage = function() {
        $scope.paginator.currentPage = $scope.currentPage;
        refreshData();
    };
    $scope.searchItem = {
        companyname: ''
    };
    $scope.search = function() {
        $scope.searchItem.companyname = $scope.search.CompanyName;
        refreshData();
    }

    function refreshData() {
        var data = angular.extend({
            offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
            limit: $scope.paginator.perPage
        }, $scope.searchItem);
        $http.get('/api/order/customer?' + $.param(data)).success(function(res) {
            $scope.paginator.total = res.data.total;
            $scope.customers = res.data.list;
        });
    }
    refreshData();


    $scope.select = function(item) {
        $uibModalInstance.close(item);
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss();
    }
}]).controller('CompanyEdit', ['$scope', '$uibModalInstance', '$http', 'companyId', 'FileUploader', '$filter', function($scope, $uibModalInstance, $http, companyId, FileUploader, $filter) {
    $http.get("/api/industry").success(function(data) {
        $scope.industries = data.data;
    });
    $http.get('/api/mycity').success(function(res) {
        $scope.city = res.data[0];
    });
    if ($scope.city) {
        $scope.postData.CityCode = $scope.city.Code;
    }
    // $http.get("/api/citybychannel").success(function (data) {
    //     $scope.cities = data.data;
    //     if (!$scope.postData.CityCode) {
    //         $scope.postData.CityCode = $scope.cities[0].CityCode;
    //     }
    // });
    $http.get('/api/code/area').success(function(res) {
        $scope.areas = res.data
    });
    $scope.postData = {};
    $http.get('/api/customerdetail/' + companyId).success(function(res) {
        var result = res.data;
        if (result.BusnissDeadline && result.BusnissDeadline.substr(0, 4) === '0001') {
            result.BusnissDeadline = "";
        } else {
            result.BusnissDeadline = new Date(result.BusnissDeadline);
        }
        if (result.RegisterDate && result.RegisterDate.substr(0, 4) === '0001') {
            result.RegisterDate = "";
        } else {
            result.RegisterDate = new Date(result.RegisterDate);
        }
        result.AddedValue = "" + result.AddedValue;
        result.IndustryId = "" + result.IndustryId;
        $scope.postData = result;
    });
    $scope.ok = function(item) {
        var postData = $scope.postData;
        if (postData.RegisterDate) postData.RegisterDate = $filter('date')($scope.postData.RegisterDate, 'yyyy-MM-dd');
        if (postData.NoDeadLine) {
            postData.BusnissDeadline = '';
            postData.NoDeadLine = 1;
        } else {
            postData.NoDeadLine = 0;
        }
        $http.put('/api/customer/' + companyId + '?verify=1', $scope.postData).success(function(res) {
            if (res.status) {
                alert('保存成功!');
                $uibModalInstance.dismiss('cancel');
            }
        })
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    var uploadUrl = 'https://pilipa.oss-cn-beijing.aliyuncs.com';

    $http.get('/api/signkey').success(function(res) {
        delete res.data.Filename;
        delete res.data.key;
        delete res.data.callback;
        delete res.data.expire;
        delete res.data.Host;
        $scope.signkey = res.data;
    });
    $scope.uploader2 = new FileUploader({
        url: uploadUrl,
        autoUpload: true
    });
    $scope.uploader2.onCompleteItem = function(fileItem, response, status, headers) {
        $scope.postData.BusinessLicense = uploadUrl + '/' + $scope._key2;
    };
    $scope.uploader2.onBeforeUploadItem = function(item) {
        bindFormData(item, 2, 2);
    };
    $scope.uploader2.onErrorItem = function() {
        alert('上传失败!')
    };

    function bindFormData(item, up, type) {
        var key = buildKey(type, item.file.name);
        item.formData.push({
            key: key
        });
        _.each($scope.signkey, function(value, key) {
            var temp = {};
            temp[key] = value;
            item.formData.push(temp);
        });
        $scope['_key' + up] = key;
    }

    function buildKey(type, fileName) {
        var randomFilename = "";

        var get_suffix = function(filename) {
            var suffix = '';
            var pos = filename.lastIndexOf('.');

            if (pos != -1) {
                suffix = filename.substring(pos)
            }
            return suffix;
        };
        var random_string = function(len) {
            len = len || 32;
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            var maxPos = chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        };

        var suffix = get_suffix(fileName);
        var typMap = {
            1: 'FileUploads/Order/CardID/',
            2: 'FileUploads/Order/BusinessLicense/',
            3: 'FileUploads/Order/Contract/',
            4: 'FileUploads/Agent/'
        }
        var nowstr = $filter('date')(new Date(), 'yyyy-MM');
        var g_object_name = typMap[type] + nowstr + '/' + random_string(10) + suffix;
        return g_object_name;
    }


}]).controller('OutworkForward', ['$scope', '$mdDialog', '$http', 'user', 'server', function($scope, $mdDialog, $http, user, server) {
    $http.get('/api/outworkers').success(function(res) {
        $scope.salers = res.data.list;
    });
    $scope.label = "外勤";
    $scope.title = "转接任务";
    $scope.ok = function(ev) {
        if (!$scope.saler) {
            alert('请选择外勤人员!');
            return;
        }
        $mdDialog.hide($scope.saler)

    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    }
}]).controller("outworkWeightSetting", ['$scope', '$http', '$uibModalInstance', 'tasks',
    function($scope, $http, $uibModalInstance, tasks) {
        $scope.Tasks = tasks;
        $scope.toInt = function(num, e) {
            return Math.floor(Math.abs(num)) || ''
        }
        $scope.delete = function(item) {
            if (!confirm("确认要删除？")) return;
            item.selected = false;
        }
        $scope.cancel = function() {
            $uibModalInstance.dismiss($scope.Tasks);
        };
        $scope.ok = function() {
            var t = _.filter($scope.Tasks, { selected: true });
            var _arr = _.uniq(t, function(t) {
                return t._weight;
            });
            if (_arr.length < t.length) {
                alert('权重不能重复！');
            } else {
                $uibModalInstance.close($scope.Tasks);
            }
        }
    }
]).controller("Order_outworkerDetail_sub", ['$scope', '$http', '$uibModalInstance', 'onlyInformationIsAll', 'item',
    function($scope, $http, $uibModalInstance, onlyInformationIsAll, item) {
      console.log(onlyInformationIsAll, '是否只能选择资料齐全')
      $scope.title = '外勤提交会计'
      $scope.isSecondAccount = false
      $scope.close = function() {
        $uibModalInstance.close();
      }

      console.log(onlyInformationIsAll, 'onlyInformationIsAll')
      if (onlyInformationIsAll) { // true的时候只能点击资料齐全
        $scope.isSecondAccount = true
      }
      $scope.sub = function() {
        console.log(item.OrderId, $scope.partT, item.ServiceStatus, '提交数据')
        $http.put('/api/maintask/audit/submit/' + item.OrderId + '?partTax=' + $scope.partT + '&serviceStatus=' + item.ServiceStatus).success(function(res) {
            $scope.close()
        })
      }
      // 只有选择一个提交按钮才能点
      $scope.dis = function() {
        return $scope.partT === undefined ? true : false
      }
      // 只有选择是部分报税的时候 国税地税才能被选择
      $scope.part = item.PartTax == 1 || item.PartTax == 2
    }
]);

angular.module('crmApp').controller('ContractEndManage', ['$scope', '$http', '$state', 'Excel', '$uibModal', 'user', '$q', function($scope, $http, $state, Excel, $uibModal, user, $q) {
    $scope.user = user.get()
    $scope.contracts = [] // 到期合同列表
    $scope.areas = [] // 所属区域列表
    $scope.markBg = {}

    $scope.companyStatus = { // 服务状态
        // 1: "等待分配",
        2: "未开始",
        3: "外勤服务",
        4: "外勤会计服务",
        5: "会计服务",
        7: "结束",
        8: "中止"
    }

    $scope.companys = [] // 所属公司列表
    $scope.search = { // 查询条件
        SequenceNo: '',
        companyName: '',
        connector: '',
        salesName: '',
        serviceStatus: '',
        contractEndPeriod: '',
        contractDateStart: '',
        contractDateEnd: ''
    }

    // 分页功能开始
    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    }
    $scope.pageChanged = function() {
        refreshData()
    }
    $scope.setCurrentPage = function() {
      $scope.currentPage = Math.abs(Math.floor($scope.currentPage)) || 1
      $scope.paginator.currentPage = $scope.currentPage
      refreshData()
    }
        // 分页功能结束

    // 获取所属区域
    function getareasList() {
      $http.get('/api/code/area').success(function(res) {
        // console.log(res)
        if(res.status) {
          $scope.areas = res.data
        }
      })
    }
    getareasList()
     function getProjectItem() {
        $http.get('api/contract/getmainitemlist').success(function(res) {
        $scope.projectItems = res.data
        })
    }
    getProjectItem()
    // 查询条件
    $scope.searchFn = function() {
        // console.log($scope.search)
        refreshData()
    }
        // 合同列表
    function refreshData() {
        var searchIt;
        searchIt = $scope.search
        var data = angular.extend({
            offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
            limit: $scope.paginator.perPage
        }, searchIt, data);
        $http.get('api/order/expire/list?' + $.param(data)).success(function(res) {
            // console.log(res)
            $scope.paginator.total = res.data.total;
            $scope.contracts = res.data.list;
            for (var i in $scope.contracts) {
              if ($scope.contracts[i].RemarkSignId == 3) {
                $scope.markBg = {'background-color': 'red'}
              } else if ($scope.contracts[i].RemarkSignId == 2) {
                $scope.markBg = {'background-color': 'blue'}
              } else if ($scope.contracts[i].RemarkSignId == 1) {
                $scope.markBg = {'background-color': '#FFCC33'}
              }
              $scope.contracts[i].markBg = $scope.markBg
            }
            // console.log($scope.contracts)
        })
    }
    refreshData()
    // 挂起操作
    $scope.gq = function(item) {
      var modalInstance = $uibModal.open({
          templateUrl: 'views/contract_refuse.html',
          controller: 'MarkRefuseEnd',
          resolve: {
              contractMsg: function() {
                  return item
              },
              signFrom: function() {
                  return false
              },
              title: function() {
                  return ''
              }
          },
          backdrop: 'static'
      })
      modalInstance.result.then(function(result) {
          refreshData()
      }, function() {

      })
    }
    // 取消挂起
    $scope.cancelgq = function(item) {
      var post = {}
      post.CompanyId = item.CustomerId
      post.SubsidiaryId = item.SubsidiaryId
      post.Description = ''
      $http.put('/api/order/expire/suspendcancel', post).success(function(res) {
        // console.log(res)
        if(res.status) {
          refreshData()
        }
      })
    }
    // 标记操作
    $scope.mark = function(item) {
      var modalInstance = $uibModal.open({
          templateUrl: 'views/contract_refuse.html',
          controller: 'MarkRefuseEnd',
          resolve: {
              contractMsg: function() {
                  return item
              },
              signFrom: function() {
                  return true
              },
              title: function() {
                  return '添加标签'
              }
          },
          backdrop: 'static'
      })
      modalInstance.result.then(function(result) {
          refreshData()
      }, function() {

      });
    }
    // 取消标记
    $scope.cancelmark = function(item) {
      var customerId = item.CustomerId
      $http.put('/api/cancelcompanysign?customerId=' + customerId).success(function(res) {
        // console.log(res)
        if(res.status) {
          refreshData()
        }
      })
    }
    // 查看详情
    $scope.detail = function(item) {
      // 点击请求接口返回 tab1及公共顶部信息
      $http.get('api/contractdetail/' + item.OrderId).success(function(res) {
          if (res.status) {
              var data = res.data
              // data.dt = item.ContractDate.replace('T'," ").split(' ')[0]
              var modalInstance = $uibModal.open({
                  templateUrl: 'views/contract_end_manage_detail.html',
                  controller: 'SignedDetail',
                  size: 'hg',
                  resolve: {
                      item: function() {
                          return data
                      },
                      projectItems: function() {
                          return $scope.projectItems
                      }
                  },
                  backdrop: 'static'
              })
              modalInstance.result.then(function(result) {

              }, function() {

              });
          }
      })
    }
        // 弹窗关闭
    $scope.cancel = function() {
      $uibModalInstance.dismiss()
    }
        //日期
    $scope.clear = function() {
        $scope.dt = null;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.popup2 = {
        opened: false
    };
    $scope.open1 = function() {
        $scope.popup1.opened = true;
    }
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    }
    $scope.changeDate = function() {
      var d1 = angular.element($("#date1"))[0].value
      var d2 = angular.element($("#date2"))[0].value
      if (d2) {
          var _d1 = d1.replace(/-/ig, "")
          var _d2 = d2.replace(/-/ig, "")
          if ((_d2 - _d1) < 0) {
              angular.element($("#date1"))[0].value = d2
          }
      }
      $scope.search.contractDateStart = d1
      $scope.search.contractDateEnd = d2
  }
  // 日期功能结束
}]).controller('MarkRefuseEnd', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'signFrom', 'title', 'user', function($scope, $http, $uibModalInstance, contract, signFrom, title, users) {
  var users = users.get()
  // console.log(users)
  // console.log(signFrom, title, 'title')
  // console.log(contract, 'contract')
  $scope.postData = angular.copy(contract)
  $scope.Remark = ''
  $scope.sign = signFrom // 区分挂起还是标记  标记true 挂起false
  $scope.title = title
  // $scope.RemarkSignId = $scope.postData.RemarkSignId
  $scope.tags = {
    '1': '低',
    '2': '中',
    '3': '高'
  }
  // 挂起和标记公用一个页面 需要判断是挂起还是标记 发送不同请求
  $scope.save = function() {
    var post = {}
    if (!$scope.sign) { // 挂起杨城接口
      // console.log($scope.postData)
      post.CompanyId = $scope.postData.CustomerId
      post.ChannelId = $scope.postData.SubsidiaryId
      post.Description = $scope.Remark

      // console.log(post)
      var url = '/api/order/expire/suspend'
      $http.put(url, post).success(function(res) {
        // console.log(res)
        if(res.status) {
          $uibModalInstance.close()
        }
      })
    } else if ($scope.sign) { // 标记陈凯接口
      if ($scope.Remark) {
        var RealName = users.RealName
        $scope.postData.Remark = $scope.postData.Remark + $scope.Remark + '{' + RealName + '}'
      }
      // console.log($scope.postData.RemarkSignId)
      post.CustomerId = $scope.postData.CustomerId
      post.SignVal = $scope.postData.RemarkSignId
      post.Remark = $scope.postData.Remark
      var url = '/api/companySign'
      $http.put(url, post).success(function(res) {
        // console.log(res)
        if(res.status) {
          $uibModalInstance.close()
        }
      })
    }
  }
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  }
}]).controller('SignedDetail', ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'item','projectItems',
    function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, item,projectItems) {
        item.ContractDate = new Date(item.ContractDate)
        $scope.postDetail = item
        $scope.canChange = true
        $scope.payTypes = {
            1: '银行卡转账',
            2: '拉卡拉',
            3: '微信',
            4: '支付宝',
            5: '现金'
        }
        $scope.contractType = { // 合同类型
            1: "新增",
            2: "续费"
        }
        // $scope.dt = item.dt
        $scope.rlist = [{}]
        $scope.paylist = [{}]
        $scope.projectItems = projectItems
        for (var i in $scope.postDetail.Details) {
            $scope.postDetail.Details[i].MainItemId = $scope.postDetail.Details[i].MainItemId + ''
            $scope.postDetail.Details[i].ChildItemId = $scope.postDetail.Details[i].ChildItemId + ''
            var contractprojectChildOptions = []
            for (var j in $scope.projectItems) {
                // console.log($scope.postDetail.Details[i].MainItemId == $scope.projectItems[j].Id)
                if ($scope.postDetail.Details[i].MainItemId == $scope.projectItems[j].Id) {
                    $scope.postDetail.Details[i].contractprojectChildOptions = $scope.projectItems[j].Children
                }
            }
        }
        $scope.rlist = $scope.postDetail.Details
            // 处理支付方式list
        for (var i in $scope.postDetail.PayInfoList) {
            $scope.postDetail.PayInfoList[i].PayTypeId = $scope.postDetail.PayInfoList[i].PayTypeId + ''
            $scope.postDetail.PayInfoList[i].PayTime = new Date($scope.postDetail.PayInfoList[i].PayTime)
        }
        $scope.paylist = $scope.postDetail.PayInfoList

        // 弹窗关闭
        $scope.cancel = function() {
            $uibModalInstance.dismiss()
        }
    }
])

angular.module('crmApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/Order_cusSelect.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">选择客户</h3> </div> <div class=\"modal-body\"> <form class=\"form-inline\"> <div class=\"form-group\"> <label>公司名称/联系人</label>： <input flex ng-model=\"search.CompanyName\" class=\"form-control\"> </div> <button class=\"btn btn-primary\" type=\"button\" ng-disabled=\"cusform.$invalid\" ng-click=\"search()\">查询</button> </form> <table class=\"table table-striped table-hover table-bordered\" style=\"margin: 12px 0\"> <thead> <tr class=\"info\"> <th>公司名称</th> <th>联系人</th> <th>联系人电话</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td><a href=\"javascript:;\" ng-click=\"select(customer)\">{{::customer.Name ||customer.CompanyName}}</a></td> <td><a href=\"javascript:;\" ng-click=\"select(customer)\">{{::customer.Contacts|| customer.Connector}}</a></td> <td>{{::customer.Mobile}}</td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">关闭</button> </div>"
  );


  $templateCache.put('views/SetFirstPostMonth.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"close()\">&times;</span> <h3 class=\"modal-title\">设置首报月时间</h3> </div> <div class=\"modal-body\" style=\"min-height:200px\"> <div style=\"margin: 5px 10px 5px 10px;min-width:300px;overflow:hidden\"> <lable style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px;width:40%;text-align:right\">合同编号：</lable> <span style=\"display:inline-block;height:34px;line-height:34px\">{{contractNo}}</span> </div> <div style=\"margin: 5px 10px 5px 10px;min-width:300px;overflow:hidden\"> <lable style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px;width:40%;text-align:right\">服务月数：</lable> <span style=\"display:inline-block;height:34px;line-height:34px\">{{serveMonth}}</span> </div> <div style=\"margin: 5px 10px 5px 10px;min-width:300px;overflow:hidden\"> <lable style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px;width:40%;text-align:right\">请选择首报月：</lable> <div class=\"row\" style=\"display:inline-block;position:absolute;left:45%\"> <div style=\"width:60%\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"yyyy-MM\" ng-model=\"serviceStartDate\" is-open=\"popup1.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" alt-input-formats=\"altInputFormats\" ng-change=\"changeDate()\" id=\"date1\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open1()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> </div> <div style=\"margin: 5px 10px 5px 10px;min-width:300px;overflow:hidden\"> <lable style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px;width:40%;text-align:right\">服务结束月：</lable> <span style=\"display:inline-block;height:34px;line-height:34px\">{{serviceEndDate}}</span> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-warning\" type=\"button\" ng-click=\"sub()\" ng-disabled=\"dis()\">保存并提交</button> </div>"
  );


  $templateCache.put('views/accounting_manage.html',
    "<div class=\"recharge\"> <div class=\"well well-sm u-search\"> <form class=\"form-inline\" style=\"position:relative;padding-right:50px\"> <div class=\"form-group\" style=\"margin: 5px\"> <label>序列ID</label>： <input type=\"text\" ng-model=\"search.SequenceNo\" class=\"form-control\" style=\"width: 100px\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>公司名称</label>： <input type=\"text\" ng-model=\"search.companyName\" class=\"form-control\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>公司联系人</label>： <input type=\"text\" ng-model=\"search.connector\" class=\"form-control\" style=\"width: 100px\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>销售人员</label>： <input type=\"text\" ng-model=\"search.salesName\" class=\"form-control\" style=\"width: 100px\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>服务状态</label>： <select ng-model=\"search.serviceStatus\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <!-- <option value=\"1\" >等待分配</option> --> <option value=\"2\">未开始</option> <option value=\"3\">外勤服务</option> <option value=\"4\">外勤会计服务</option> <option value=\"5\">会计服务</option> <option value=\"7\">结束</option> <option value=\"8\">中止</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>会计审核状态</label>： <select ng-model=\"search.accountantStatus\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option value=\"1\">待审核</option> <option value=\"2\">已审核</option> <option value=\"3\">已驳回</option> <!-- <option value=\"4\" >外勤提交</option> --> <option value=\"5\">部分审核</option> <!-- <option value=\"6\" >已提交</option> --> </select> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>合同编号</label>： <input type=\"text\" ng-model=\"search.contractNo\" class=\"form-control\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>来源</label>： <select ng-model=\"search.accountantTaskSource\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option value=\"审单\">审单</option> <option value=\"外勤\">外勤</option> </select> </div> <!--日期--> <div class=\"form-group\" style=\"margin: 5px;min-width:300px;float:none\"> <lable style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">合同签订日期：</lable> <div class=\"row\" style=\"float:left;width:300px\"> <div class=\"col-md-6\" style=\"width: 48%;padding-right: 0\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"{{format}}\" ng-model=\"dt1\" is-open=\"popup1.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" alt-input-formats=\"altInputFormats\" ng-change=\"changeDate()\" id=\"date1\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open1()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> <span class=\"inner-date\">-</span> <div class=\"col-md-6\" style=\"width: 48%;padding: 0\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup ng-model=\"dt2\" is-open=\"popup2.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" ng-change=\"changeDate()\" id=\"date2\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open2()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> </div> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"searchFn()\" style=\"position:absolute;right:0;top:5px\">搜索</button> </form> </div> <div style=\"overflow-x: scroll\"> <table class=\"table table-striped table-hover table-bordered\" style=\"min-width:1750px\"> <thead> <tr class=\"info\"> <th style=\"width:100px\">序列ID</th> <th style=\"width:130px\">公司名称</th> <th style=\"width:100px\">所属区域</th> <th style=\"width:120px\">公司联系人</th> <th style=\"width:100px\">销售人员</th> <!----> <th style=\"width:100px\">合同编号</th> <th style=\"width:80px\">来源</th> <th style=\"width:100px\">报税状态</th> <th style=\"width:100px\">服务状态</th> <th style=\"width:130px\">会计审核状态</th> <th style=\"width:100px\">部分报税</th> <th style=\"width:130px\">合同签订日期</th> <th style=\"width:120px\">服务开始月</th> <th style=\"width:120px\">服务结束月</th> <!----> <th style=\"width:250px\">操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td style=\"text-align:center\">{{customer.SequenceNo}}</td> <td style=\"text-align:center\"><span class=\"nowrap\" title=\"{{customer.CompanyName}}\">{{customer.CompanyName}}</span></td> <td style=\"text-align:center\">{{customer.AreaName}}</td> <td style=\"text-align:center\">{{customer.Connector}}</td> <td style=\"text-align:center\">{{customer.SaleName}}</td> <td style=\"text-align:center\">{{customer.ContractNo}}</td> <td style=\"text-align:center\">{{customer.AccountantTaskSource}}</td> <td style=\"text-align:center\">{{customer.AgentStatus | NewAgentStatus}}</td> <td style=\"text-align:center\">{{customer.ServiceStatus | NewServiceStatus}}</td> <td style=\"text-align:center\">{{customer.AccountantStatus | NewCheckStatus}}</td> <td style=\"text-align:center\">{{customer.PartTax | partTax}}</td> <td style=\"text-align:center\">{{customer.ContractDate | tDate}}</td> <td style=\"text-align:center\">{{customer.ServiceStart | tDate}}</td> <td style=\"text-align:center\">{{customer.ServiceEnd | tDate}}</td> <td class=\"table-opt\" style=\"text-align:center\"> <button class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"detail(customer)\">查看详情</button> <!-- 审核驳回可点不可点情况\n" +
    "                        1. 来源外勤 AccountantTaskSource 且 服务状态ServiceStatus会计服务 会计审核状态AccountantStatus 已审核 禁用\n" +
    "                        2. 外勤提交审核 AccountantTaskSource部分报税PartTax 1 2 服务状态ServiceStatus外勤会计 会计审核状态 AccountantStatus部分审核 禁用\n" +
    "                        3. 外勤人员二次提交资料审核时  来源审单AccountantTaskSource 部分报税PartTax 1 2 禁用变成启用\n" +
    "                        会计二次审核后变成禁用 服务状态会计服务 会计审核已审核\n" +
    "                       --> <button ng-if=\"user.IsCenter == 0 && (Category == 10 || Category == 2) && !customer.ServiceStart\" class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"autid(customer)\" ng-disabled=\"customer.AccountantStatus != 1\">审核</button> <button ng-if=\"user.IsCenter == 0 && (Category == 10 || Category == 2) && customer.ServiceStart\" class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"autidSecond(customer)\" ng-disabled=\"customer.AccountantStatus != 1\">审核</button> <!-- 二次审核的时候不需要弹首报月的框 --> <button ng-if=\"user.IsCenter == 0 && (Category == 10 || Category == 2)\" class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"rejected(customer)\" ng-disabled=\"customer.AccountantStatus != 1\">驳回</button> </td> </tr> </tbody> </table> </div> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> &nbsp; <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" ng class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div> </div>"
  );


  $templateCache.put('views/common_loading.html',
    "<md-dialog aria-label=\"客户转出\" class=\"md-dialog-md\"> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1 md-padding\" style=\"overflow: hidden\"> <div class=\"text-center\">{{loadingText}}</div> <md-progress-linear md-mode=\"indeterminate\"></md-progress-linear> </md-dialog-content> </md-dialog>"
  );


  $templateCache.put('views/companyEdit.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">公司信息修改</h3> </div> <div class=\"modal-body\"> <table class=\"table table-bordered\"> <tbody> <tr> <th colspan=\"4\" style=\"text-align:left\"> <span class=\"t_header\">客户基本信息</span> </th> </tr> <tr> <td class=\"\">公司名称</td> <td> <input type=\"text\" ng-model=\"postData.CompanyName\"> </td> <td class=\"\">城市</td> <td> <span>{{city.Name}}</span> </td> </tr> <tr> <td>区域</td> <td> <select ng-model=\"postData.AreaCode\" ng-disabled=\"isReadOnly\"> <option ng-repeat=\"item in areas\" value=\"{{item.AreaCode}}\" ng-bind=\"item.AreaName\"></option> </select> </td> <td class=\"\">公司地址</td> <td> <input type=\"text\" ng-model=\"postData.Address\" ng-if=\"!isReadOnly\" maxlength=\"100\"> </td> </tr> <tr> <td class=\"\">公司性质</td> <td> <select ng-model=\"postData.AddedValue\" ng-disabled=\"isReadOnly\"> <option value=\"1\">小规模</option> <option value=\"2\">一般纳税人</option> </select> </td> <td class=\"\">所属行业</td> <td> <select ng-model=\"postData.IndustryId\" ng-disabled=\"isReadOnly\"> <option ng-repeat=\"item in industries\" value=\"{{item.IndustryId}}\" ng-bind=\"item.IndustryName\"></option> </select> </td> </tr> <tr> <td class=\"\">联系人</td> <td> <input type=\"text\" ng-model=\"postData.Connector\" ng-if=\"!isReadOnly\" maxlength=\"10\"> </td> <td class=\"\">手机</td> <td> <input type=\"text\" ng-model=\"postData.Mobile\" ng-if=\"!isReadOnly\" maxlength=\"11\"> </td> </tr> </tbody> </table> <table class=\"table table-bordered\"> <thead> <th colspan=\"4\" style=\"text-align:left\"> <span class=\"t_header\">营业执照信息</span> </th> </thead> <tbody> <tr> <td class=\"\">注册号</td> <td> <input type=\"text\" ng-model=\"postData.RegNO\" ng-if=\"!isReadOnly\" maxlength=\"20\"> </td> <td class=\"\">法人</td> <td> <input type=\"text\" ng-model=\"postData.LegalPerson\" ng-if=\"!isReadOnly\" maxlength=\"10\"> </td> </tr> <tr> <td class=\"\">国税登记号</td> <td> <input type=\"text\" ng-model=\"postData.NationalTaxNO\" ng-if=\"!isReadOnly\" maxlength=\"20\"> </td> <td class=\"\">地税登记号</td> <td> <input type=\"text\" ng-model=\"postData.LocalTaxNO\" ng-if=\"!isReadOnly\" maxlength=\"20\"> </td> </tr> <tr> <td class=\"\">营业期限</td> <td> <span class=\"date_sel\"> <input type=\"text\" uib-datepicker-popup ng-model=\"postData.RegisterDate\" is-open=\"dateIsOpened11\" datepicker-options=\"dateOptions\" close-text=\"关闭\" current-text=\"今天\" clear-text=\"清空\" ng-click=\"dateIsOpened11 = !dateIsOpened11\" ng-disabled=\"isReadOnly\"> <button type=\"button\" ng-click=\"dateIsOpened11 = !dateIsOpened11\" ng-show=\"!isReadOnly\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span>- <span class=\"date_sel\"> <input type=\"text\" uib-datepicker-popup ng-model=\"postData.BusnissDeadline\" is-open=\"dateIsOpened1\" datepicker-options=\"dateOptions\" close-text=\"关闭\" current-text=\"今天\" clear-text=\"清空\" ng-click=\"dateIsOpened1 = !dateIsOpened1\" ng-disabled=\"isReadOnly || postData.NoDeadLine\"> <button type=\"button\" ng-click=\"dateIsOpened1 = !dateIsOpened1\" ng-show=\"!isReadOnly\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> <input type=\"checkbox\" name=\"noLimitDate\" value=\"1\" ng-click=\"postData.NoDeadLine = !postData.NoDeadLine; \" ng-checked=\"postData.NoDeadLine == 1\"> 无期限  </td> <td class=\"\">注册资金</td> <td> <input type=\"text\" ng-model=\"postData.RegisteredCapital\" ng-if=\"!isReadOnly\" maxlength=\"15\"> </td> </tr> <tr> <td class=\"\">经营范围</td> <td> <textarea ng-model=\"postData.BusinessScope\" ng-if=\"!isReadOnly\" style=\"width:80%\" rows=\"5\"></textarea> </td> <td class=\"\">上传营业执照</td> <td> <img ng-src=\"{{postData.BusinessLicense}}\" ng-if=\"postData.BusinessLicense\" class=\"order-img\" alt=\"\" pic-view> <input type=\"file\" nv-file-select=\"\" uploader=\"uploader2\" ng-show=\"!isReadOnly\"> <div class=\"progress\" style=\"width:80%;margin-left:90px\" ng-if=\"uploader2.isUploading\"> <div class=\"progress-bar\" role=\"progressbar\" ng-style=\"{ 'width': uploader2.progress + '%' }\" style=\"width: 100%\"></div> </div> <span>上传的图片大小请不要超过1M。</span> </td> </tr> </tbody> </table> </div> <div class=\"modal-footer\"> <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">保存</button> <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">关闭</button> </div>"
  );


  $templateCache.put('views/company_add.html',
    "<md-dialog aria-label=\"公司\" class=\"md-dialog-lg\"> <form name=\"cusform\" novalidate> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>{{::title}}</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1 md-padding\" style=\"overflow: hidden\"> <md-grid-list md-cols=\"2\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">公司名称</span> <input flex ng-model=\"postData.CompanyName\" aria-label=\"CompanyName\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">城市</span> <md-select md-no-asterisk ng-model=\"postData.CityCode\" class=\"md-select\" required> <md-option ng-repeat=\"u in cities\" ng-value=\"u.Code\">{{u.Name}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">地址</span> <input required flex ng-model=\"postData.Address\" aria-label=\"Address\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">总经理账号</span> <input required flex ng-model=\"postData.UserName\"> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"user.RoleId<11\"> <md-input-container layout=\"row\"> <span class=\"md-label\">来源</span> <md-select md-no-asterisk ng-model=\"postData.CustomerSourceId\" class=\"md-select\"> <md-option ng-value=\"0\" ng-selected=\"true\">全部</md-option> <md-option ng-repeat=\"u in sourceTypes\" ng-value=\"u.Id\">{{u.Marking}}</md-option> </md-select> </md-input-container> </md-grid-tile> </md-grid-list> </md-dialog-content> <md-dialog-actions layout=\"row\" md-colors=\"::{background: 'default-primary-100'}\"> <span flex></span> <md-button class=\"md-raised md-primary\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok($event)\">保存</md-button> <md-button ng-click=\"cancel()\">取消</md-button> </md-dialog-actions> </form> </md-dialog>"
  );


  $templateCache.put('views/company_sublist.html',
    "<md-button class=\"md-raised md-primary\" ng-click=\"open()\">新增公司</md-button> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>公司名称</th> <th>地址</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"item in companies\"> <td><a href=\"javascript:;\" ng-click=\"open(customer)\">{{::item.CompanyName}}</a></td> <td>{{::item.Address}}</td> <td class=\"table-opt\"><a href=\"javascript:;\" ng-click=\"open(item)\">查看</a> </td> </tr> </tbody> </table>"
  );


  $templateCache.put('views/contract_end_manage.html',
    "<div class=\"recharge\"> <div class=\"well well-sm u-search clearfix\"> <form class=\"form-inline\" style=\"position:relative;padding-right:150px\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>序列ID</label>： <input type=\"text\" ng-model=\"search.SequenceNo\" class=\"form-control\" style=\"width: 120px\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>公司名称</label>： <input type=\"text\" ng-model=\"search.companyName\" class=\"form-control\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>公司联系人</label>： <input type=\"text\" ng-model=\"search.connector\" class=\"form-control\" style=\"width: 120px\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>销售人员</label>： <input type=\"text\" ng-model=\"search.salesName\" class=\"form-control\" style=\"width: 120px\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>服务状态</label>： <select ng-model=\"search.serviceStatus\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"(key,value) in companyStatus\" ng-value=\"key\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>合同结束期</label>： <select ng-model=\"search.contractEndPeriod\" class=\"form-control\"> <option value=\"0\" ng-selected=\"true\">请选择</option> <option value=\"1\">近一个月</option> <option value=\"2\">近两个月</option> <option value=\"3\">近三个月</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px;min-width:300px\"> <lable style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">合同签订日期：</lable> <div class=\"row\" style=\"float:left;width:300px\"> <div class=\"col-md-6\" style=\"width: 48%;padding-right: 0\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"{{format}}\" ng-model=\"dt1\" is-open=\"popup1.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" alt-input-formats=\"altInputFormats\" ng-change=\"changeDate()\" id=\"date1\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open1()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> <span class=\"inner-date\">-</span> <div class=\"col-md-6\" style=\"width: 48%;padding: 0\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup ng-model=\"dt2\" is-open=\"popup2.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" ng-change=\"changeDate()\" id=\"date2\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open2()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> </div> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"searchFn()\" style=\"position:absolute;right:20px;top:5px\">搜索</button> <!-- <button class=\"btn btn-primary pull-right\" ng-click=\"toExcel()\" style=\"position:absolute;right:20px;top:50px\">导出</button> --> </form> </div> <div style=\"overflow-x: scroll\"> <table class=\"table table-striped table-hover table-bordered\" style=\"min-width:1500px\"> <thead> <tr class=\"info\"> <th style=\"width:100px\">序列ID</th> <th style=\"width:130px\">公司名称</th> <th style=\"width:100px\">所属区域</th> <th style=\"width:100px\">公司联系人</th> <th style=\"width:120px\">当前合同编号</th> <th style=\"width:100px\">销售人员</th> <th style=\"width:130px\">合同签订日期</th> <th style=\"width:120px\">服务开始</th> <th style=\"width:120px\">服务结束</th> <th style=\"width:100px\">报税状态</th> <th style=\"width:120px\">服务状态</th> <th style=\"width:200px\">操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"contract in contracts\"> <td style=\"text-align:center;width: 140px;vertical-align: middle\"> <div ng-show=\"contract.RemarkSignId\" class=\"mark-style fl\" ng-style=\"{{contract.markBg}}\">{{contract.RemarkSignId | CustomerMarkStyle}}</div> <div class=\"fr\">{{contract.SequenceNo}}</div> </td> <td style=\"text-align:center\"><span class=\"nowrap\" title=\"{{contract.CompanyName}}\">{{contract.CompanyName}}</span></td> <td style=\"text-align:center\">{{contract.AreaName}}</td> <td style=\"text-align:center\">{{contract.Connector}}</td> <td style=\"text-align:center\">{{contract.ContractNo}}</td> <td style=\"text-align:center\">{{contract.SaleName}}</td> <td style=\"text-align:center\">{{contract.ContractDate|tDate}}</td> <td style=\"text-align:center\">{{contract.ServiceStart|tDate}}</td> <td style=\"text-align:center\">{{contract.ServiceEnd|tDate}}</td> <td style=\"text-align:center\">{{contract.AgentStatus | NewAgentStatus}}</td> <td style=\"text-align:center\">{{contract.ServiceStatus | NewServiceStatus}}</td> <td class=\"table-opt\" style=\"text-align:center;width:190px\"> <button class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"detail(contract)\">查看</button> <!-- 标记RemarkSignId>0可以标记 =0可以取消 --> <button ng-if=\"!contract.RemarkSignId\" class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"mark(contract)\">标记</button> <button ng-if=\"contract.RemarkSignId\" class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"cancelmark(contract)\">取消</button> <!-- 挂起：判断可挂起条件会计审核状态审核后 当前时间在服务结束时间之内 --> <button ng-if=\"!contract.RemarkSuspendId \" class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"gq(contract)\" ng-disabled=\"!contract.IfCancelHangup\">挂起</button> <!-- 挂起取消：当前时间在服务结束时间之内 --> <button ng-if=\"contract.RemarkSuspendId\" class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"cancelgq(contract)\" ng-disabled=\"!contract.IfCancelHangup\">取消</button> </td> </tr> </tbody> </table> </div> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> &nbsp; <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" ng class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div> </div>"
  );


  $templateCache.put('views/contract_end_manage_detail.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">合同查看</h3> </div> <div class=\"modal-body\"> <div class=\"contract-belong-info clearfix\"> <div class=\"title\"> <div class=\"fl belong-left\"> <span>合同归属信息</span> </div> <!-- <div class=\"fr belong-right\">\n" +
    "        <button class=\"btn\" type=\"button\" ng-disabled=\"postDetail.FinancialAudit != 1\" ng-click=\"check()\">财务审核</button>\n" +
    "        <button class=\"btn\" type=\"button\" ng-disabled=\"postDetail.FinancialAudit != 1\" ng-click=\"refuse()\">财务驳回</button>\n" +
    "      </div> --> </div> <form name=\"contractBelongform\" novalidate class=\"clearfix\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>所属公司</label>： <input flex ng-model=\"postDetail.SubsidiaryName\" required readonly class=\"input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>合同状态</label>： <input flex value=\"{{postDetail.OrderStatus|Contractstatus}}\" required readonly class=\"input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>财务状态</label>： <input flex value=\"{{postDetail.FinancialAudit|FinanceStatus}}\" required readonly class=\"input-border\"> </div> </form> </div> <div class=\"customer-info\"> <div class=\"title\">客户基本信息</div> <form name=\"customerform\" novalidate class=\"clearfix\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">甲方</label>： <input flex ng-model=\"postDetail.CompanyName\" required ng-disabled=\"canChange\" class=\"input-border\"> <!-- <span class=\"add-icon\" ng-click=\"selectCustomer()\">+</span> --> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">联系人</label>： <input flex ng-model=\"postDetail.Connector\" required ng-disabled=\"canChange\" class=\"input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">联系人电话</label>： <input flex ng-model=\"postDetail.Mobile\" required ng-disabled=\"canChange\" class=\"input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">所属销售</label>： <input flex ng-model=\"postDetail.SalesName\" required readonly class=\"input-border\"> </div> </form> </div> <div class=\"contract-info\"> <div class=\"title\">合同信息</div> <div class=\"content\"> <form name=\"contractform\" novalidate class=\"clearfix\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">合同编号</label>： <input flex ng-model=\"postDetail.ContractNo\" required ng-disabled=\"canChange\" class=\"input-width1 input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">合同类型</label>： <select ng-model=\"postDetail.OrderType\" class=\"input-border\" ng-disabled=\"canChange\"> <option value=\"\">请选择</option> <option ng-repeat=\"(key,value) in contractType\" value=\"key\" ng-selected=\"postDetail.OrderType == key\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>合同期限</label>： <input flex ng-model=\"postDetail.OrderMonths\" placeholder=\"个月\" ng-disabled=\"canChange\" type=\"number\" class=\"input-width input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>赠送礼包</label>： <input flex ng-model=\"postDetail.GiftMonth\" placeholder=\"个月\" ng-disabled=\"canChange\" type=\"number\" class=\"input-width input-border\"> </div> <div class=\"form-group col-md-4\" style=\"margin: 5px 10px 5px 10px;min-width:300px\"> <lable class=\"required\" style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">签订日期：</lable> <div class=\"col-md-8\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" ng-click=\"open1()\" ng-model=\"postDetail.ContractDate\" uib-datepicker-popup=\"yyyy-MM-dd\" ng-model=\"dt\" is-open=\"popup1.opened\" datepicker-options=\"dateOptions\" close-text=\"关闭\" alt-input-formats=\"altInputFormats\" style=\"padding:6px\" ng-disabled=\"canChange\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open1()\" ng-disabled=\"canChange\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <table class=\"table table-hover table-bordered\"> <thead> <tr class=\"info\"> <th>项目</th> <th>子项目</th> <th>费用</th> </tr> </thead> <tbody> <tr ng-repeat=\"rg in rlist\"> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <select ng-model=\"rg.MainItemId\" ng-change=\"getcurProject(rg, $index)\" class=\"input-border select-width\" ng-disabled=\"canChange\"> <option value=\"\">请选择</option> <option ng-repeat=\"item in projectItems\" value=\"{{item.Id}}\" ng-selected=\"rg.MainItemId == item.Id\">{{item.Name}}</option> </select> </td> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <select ng-model=\"rg.ChildItemId\" class=\"input-border select-width\" ng-disabled=\"canChange\"> <option value=\"\">请选择</option> <option ng-repeat=\"item in rg.contractprojectChildOptions\" value=\"{{item.Id}}\" ng-selected=\"rg.ChildItemId == item.Id\">{{item.Name}}</option> </select> </td> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <input class=\"select-width input-border\" type=\"number\" ng-model=\"rg.Amount\" ng-blur=\"getAmount(rg)\" ng-disabled=\"canChange\"> </td> </tr> <tr> <td colspan=\"4\" style=\"height:34px;line-height: 20px; padding: 6px 12px\" class=\"clearfix\"> <div class=\"amount fl\"> <span>记账报税费用：</span> <span class=\"contract-inputWidth\">{{postDetail.BookKeepFeed}}</span> </div> <div class=\"amount fl\"> <span>财务服务费用：</span> <span class=\"contract-inputWidth\">{{postDetail.FinanceServiceFeed}}</span> </div> <div class=\"amount fl\"> <span>外勤服务费用：</span> <span class=\"contract-inputWidth\">{{postDetail.OutWorkServiceFeed}}</span> </div> <div class=\"amount fl\"> <span>代收费用：</span> <span class=\"contract-inputWidth\">{{postDetail.AgentFeed}}</span> </div> <div class=\"amount fl\"> <span>合同总金额：</span> <span class=\"contract-inputWidth\" style=\"color: red\">{{postDetail.Amount}}</span> </div> </td> </tr> </tbody> </table> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>备注信息：</label> <textarea style=\"width:950px;color:#ccc\" cols=\"100\" rows=\"3\" ng-model=\"postDetail.Remark\" ng-disabled=\"canChange\"></textarea> </div> </form> </div> </div> <div class=\"pay-info\"> <div class=\"title\">支付信息</div> <div class=\"content\"> <form name=\"payform\" novalidate class=\"clearfix\"> <div class=\"item clearfix\" ng-repeat=\"(pindex, pl) in paylist\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">支付方式</label>： <select ng-model=\"pl.PayTypeId\" class=\"input-border\" ng-disabled=\"canChange\"> <option value=\"\">请选择</option> <option ng-repeat=\"(key,value) in payTypes\" value=\"{{key}}\" ng-selected=\"pl.PayTypeId == key\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">支付方账号</label>： <input flex ng-model=\"pl.PayAccountNo\" required class=\"input-border\" ng-disabled=\"canChange || pl.PayTypeId == 5\" style=\"width:200px\"> </div> <div class=\"form-group col-md-3\" style=\"margin: 5px 10px 5px 10px\"> <lable class=\"required\" style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">支付时间：</lable> <div class=\"col-md-8\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"yyyy/MM/dd\" ng-model=\"pl.PayTime\" is-open=\"pl.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" style=\"padding:6px\" ng-disabled=\"canChange || pl.PayTypeId == 5\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"pl.opened = true\" ng-disabled=\"canChange || pl.payType == 5\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px; display: flex; align-items: center\"> <label class=\"required img-bottom\">凭证</label>： <div ng-if=\"canChange\" style=\"display: inline-block\"> <img ng-src=\"{{pl.PayImagePath}}\" class=\"contract-img\" pic-view> </div> <div ng-if=\"!canChange\" style=\"display: inline-block\"> <img ng-src=\"{{pl.PayImagePath}}\" ng-if=\"pl.PayImagePath\" alt=\"\" pic-view class=\"contract-img-style\"> <div class=\"uploader-outter\"> <input ng-click=\"imgClick(pindex)\" class=\"uploader-img\" type=\"file\" nv-file-select=\"\" uploader=\"uploader1[pindex]\"> </div> <div class=\"progress\" style=\"width:80%;margin-left:90px\" ng-if=\"uploader1[pindex].isUploading\"> <div class=\"progress-bar\" role=\"progressbar\" ng-style=\"{ 'width': uploader1[pindex].progress + '%' }\" style=\"width: 100%\"></div> </div> </div> </div> </div> </form> </div> </div> </div>"
  );


  $templateCache.put('views/contract_manage.html',
    "<div class=\"recharge\"> <div class=\"well well-sm u-search clearfix\"> <form class=\"form-inline\" style=\"position:relative;padding-right:100px\"> <div class=\"form-group\" style=\"margin: 5px\"> <label>合同编号</label>： <input type=\"text\" ng-model=\"search.contractNo\" class=\"form-control\" style=\"width: 100px\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>甲方</label>： <input type=\"text\" ng-model=\"search.companyname\" class=\"form-control\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>联系人</label>： <input type=\"text\" ng-model=\"search.contact\" class=\"form-control\" style=\"width: 100px\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>销售人员</label>： <input type=\"text\" ng-model=\"search.saleName\" class=\"form-control\" style=\"width: 100px\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>合同状态</label>： <select ng-model=\"search.contractStatus\" class=\"form-control\"> <option value=\"0\">请选择</option> <option ng-repeat=\"(key,value) in ContractStatus\" ng-value=\"key\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>合同类型</label>： <select ng-model=\"search.contractType\" class=\"form-control\"> <option value=\"0\">请选择</option> <option ng-repeat=\"(key,value) in ContractType\" ng-value=\"key\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>财务审核状态</label>： <select ng-model=\"search.financeStatus \" class=\"form-control\"> <option value=\"0\">请选择</option> <option ng-repeat=\"(key,value) in FinanceStatus\" ng-value=\"key\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px;min-width:300px\"> <lable style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">合同签订日期：</lable> <div class=\"row\" style=\"float:left;width:300px\"> <div class=\"col-md-6\" style=\"width: 48%;padding-right: 0\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"{{format}}\" ng-model=\"dt1\" is-open=\"popup1.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" alt-input-formats=\"altInputFormats\" ng-change=\"changeDate()\" id=\"date1\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open1()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> <span class=\"inner-date\">-</span> <div class=\"col-md-6\" style=\"width: 48%;padding: 0\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup ng-model=\"dt2\" is-open=\"popup2.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" ng-change=\"changeDate()\" id=\"date2\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open2()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> </div> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"searchFn()\" style=\"position:absolute;right:20px;top:5px\">搜索</button> <!-- 只有提单人员有新增合同的权限 总经理 --> <button ng-if=\"(IsCenter == 0 && Category == 2) || (IsCenter == 0 && Category == 5)\" class=\"btn btn-primary pull-right\" ng-click=\"open()\" style=\"position:absolute;right:20px;top:50px\">新增</button> </form> </div> <div style=\"overflow-x: scroll\"> <table class=\"table table-striped table-hover table-bordered\" style=\"min-width:1300px\"> <thead> <tr class=\"info\"> <th style=\"width:100px\">合同编号</th> <th style=\"width:130px\">甲方</th> <th style=\"width:80px\">联系人</th> <th style=\"width:80px\">销售人员</th> <th style=\"width:100px\">合同类型</th> <th style=\"width:100px\">合同状态</th> <th style=\"width:120px\">合同签订日期</th> <th style=\"width:100px\">合同总金额</th> <th style=\"width:100px\">财务审核</th> <th style=\"width:100px\">最后操作人</th> <th style=\"width:180px\">最后修改日期</th> <th style=\"width:180px\">操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"contract in contracts\"> <td style=\"text-align:center\">{{contract.ContractNo}}</td> <td style=\"text-align:center\"><span class=\"nowrap\" title=\"{{contract.CompanyName}}\">{{contract.CompanyName}}</span></td> <td style=\"text-align:center\">{{contract.Connector}}</td> <td style=\"text-align:center\">{{contract.SaleName}}</td> <td style=\"text-align:center\">{{contract.OrderType | ContractType}}</td> <td style=\"text-align:center\">{{contract.OrderStatus | NewCheckStatus}}</td> <td style=\"text-align:center\">{{contract.ContractDate | formateDate}}</td> <td style=\"text-align:center\">{{contract.Amount}}</td> <td style=\"text-align:center\">{{contract.FinancialAuditStatus | NewCheckStatus}}</td> <td style=\"text-align:center\">{{contract.ModifyUserName}}</td> <td style=\"text-align:center\">{{contract.ModifyDate}}</td> <td class=\"table-opt\" style=\"text-align:center\"> <button class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"detail(contract)\">查看详情</button> <!-- 判断财务审核状态是已审核=2就不可以删除  只有提单员Category=5可以点击--> <button ng-if=\"(IsCenter == 0 && Category == 2) || (IsCenter == 0 && Category == 5)\" class=\"btn btn-link\" ng-click=\"delete(contract)\" ng-disabled=\"contract.FinancialAuditStatus == 2\">删除</button> </td> </tr> </tbody> </table> </div> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> &nbsp; <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" ng class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div> </div>"
  );


  $templateCache.put('views/contract_refuse.html',
    "<div ng-if=\"title\" class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">{{title}}</h3> </div> <div class=\"modal-body clearfix\"> <form name=\"refuseform\" novalidate class=\"form-inline\"> <div ng-show=\"sign\" class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>标签</label>： <select ng-model=\"postData.RemarkSignId\" class=\"form-control\" ng-disabled=\"isEdit\"> <option value=\"\">请选择</option> <option ng-repeat=\"(key,value) in tags\" ng-value=\"key\" ng-selected=\"postData.RemarkSignId == key\">{{value}}</option> </select> </div> <textarea cols=\"60\" rows=\"3\" ng-model=\"Remark\" placeholder=\"请填写原因\" ng-disabled=\"isEdit\" maxlength=\"150\"></textarea> </form> <div class=\"clearfix\" ng-if=\"isEdit\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>动作</label>： <span>{{postData.Operation | HanddleOperation}}</span> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>操作人</label>： <span>{{postData.RealName}}</span> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>操作时间</label>： <span>{{postData.OperationTime | tDate}}</span> </div> </div> </div> <div class=\"modal-footer\" ng-if=\"!isEdit\"> <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">取消</button> <button class=\"btn btn-primary\" type=\"button\" ng-click=\"save()\">确认</button> </div>"
  );


  $templateCache.put('views/customer_addCustomer.html',
    "<md-dialog aria-label=\"客户\" class=\"md-dialog-lg\"> <form name=\"cusform\" novalidate> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>{{::title}}</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1 md-padding cus-info\"> <md-grid-list md-cols=\"2\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">公司名称</span> <input flex ng-model=\"postData.CompanyName\" aria-label=\"CompanyName\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">联系人</span> <input required flex ng-model=\"postData.Connector\" aria-label=\"Connector\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">联系电话</span> <input required flex ng-model=\"postData.Mobile\" aria-label=\"Mobile\"> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"!isPub\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">意向度</span> <md-select md-no-asterisk ng-model=\"postData.CustomerTypeId\" required aria-label=\"CustomerType\" class=\"md-select\"> <md-option ng-repeat=\"type in ctypes\" ng-repeat=\"\" ng-value=\"type.CustomerTypeId\">{{type.Name}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">来源</span> <md-select md-no-asterisk ng-model=\"postData.CustomerSourceId\" class=\"md-select\"> <md-option ng-value=\"0\" ng-selected=\"true\">全部</md-option> <md-option ng-repeat=\"u in sourceTypes\" ng-value=\"u.Id\">{{u.Marking}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile md-colspan=\"2\" md-rowspan=\"2\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">备注</span> <textarea flex ng-model=\"postData.Mark\" maxlength=\"200\"></textarea> </md-input-container> </md-grid-tile> </md-grid-list> <md-chips ng-model=\"custags\" readonly md-removable=\"postData.CustomerTypeId != 5\" md-on-remove=\"deleteTag($chip)\"> <md-chip-template> <span>{{$chip.TagName}}</span> </md-chip-template> <span md-chip-remove>&times;</span> </md-chips> <div ng-if=\"postData.Id && postData.CustomerTypeId != 5\"> <md-button class=\"md-primary\" ng-disabled=\"cusform.$invalid\" ng-click=\"isOpen = !isOpen\">打标签 <i class=\"fa\" ng-class=\"{\\'fa-angle-double-down\\': !isOpen,\\'fa-angle-double-up\\': !!isOpen}\"></i></md-button> <div ng-show=\"isOpen\"> <div ng-repeat=\"(key, tagGroup) in tags\" class=\"tag-row\"> <span class=\"pull-left tag-type\">{{key}}</span> <md-chips ng-model=\"tagGroup.tags\" readonly md-removable=\"false\" md-can-click=\"true\" md-selected=\"tagGroup.selected\" md-on-select=\"addTag($chip,null,$index)\"> <md-chip-template> <span>{{$chip.TagName}}</span> </md-chip-template> </md-chips> </div> </div> </div> </md-dialog-content> <md-dialog-actions layout=\"row\" md-colors=\"::{background: 'default-primary-100'}\"> <span flex></span> <md-button class=\"md-raised md-primary\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok($event)\">保存</md-button> <md-button class=\"md-raised md-primary\" ng-if=\"showNext\" ng-click=\"next(postData)\">下一条</md-button> <md-button ng-click=\"cancel()\">取消</md-button> </md-dialog-actions> </form> </md-dialog>"
  );


  $templateCache.put('views/customer_forward.html',
    "<md-dialog aria-label=\"{{title||'客户转出'}}\" class=\"md-dialog-md\"> <form name=\"cusform\" novalidate> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>客户转出</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1 md-padding\" style=\"overflow: hidden\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">{{::label||'销售'}}</span> <md-select md-no-asterisk ng-model=\"saler\" required aria-label=\"saler\" class=\"md-select\"> <md-option ng-repeat=\"item in salers\" ng-repeat=\"\" ng-value=\"item.UserId\">{{item.RealName}}</md-option> </md-select> </md-input-container> </md-dialog-content> <md-dialog-actions layout=\"row\" md-colors=\"::{background: 'default-primary-100'}\"> <span flex></span> <md-button class=\"md-raised md-primary\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok($event)\">保存</md-button> <md-button ng-click=\"cancel()\">取消</md-button> </md-dialog-actions> </form> </md-dialog>"
  );


  $templateCache.put('views/customer_my.html',
    "<div class=\"o-search well well-sm\"> <form class=\"form-inline\"> <md-grid-list md-cols=\"3\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">公司名称</span> <input flex ng-model=\"search.companyName\" aria-label=\"CompanyName\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">联系电话</span> <input flex ng-model=\"search.phone\" aria-label=\"Mobile\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">意向度</span> <md-select md-no-asterisk ng-model=\"search.cusType\" aria-label=\"CustomerType\" class=\"md-select\"> <md-option ng-value=\"0\" ng-selected=\"true\">全部</md-option> <md-option ng-repeat=\"type in ctypes\" ng-repeat=\"\" ng-value=\"type.CustomerTypeId\">{{type.Name}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">标签</span> <md-select md-no-asterisk ng-model=\"search.tagId\" style=\"width:200px\" aria-label=\"CustomerType\" class=\"md-select\" multiple ng-change=\"checkBQ()\"> <md-option ng-value=\"0\" ng-selected=\"true\" ng-click=\"search.tagId = 0\">全部</md-option> <md-optgroup ng-repeat=\"(key,list) in tagGroup\" label=\"{{key}}\"> <md-option ng-repeat=\"tag in list\" ng-value=\"tag\" ng-click=\"tagSelect(tag)\">{{tag.TagName}}</md-option> </md-optgroup> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">来源</span> <md-select md-no-asterisk ng-model=\"search.CustomerSourceId\" class=\"md-select\"> <md-option ng-value=\"0\" ng-selected=\"true\">全部</md-option> <md-option ng-repeat=\"u in sourceTypes\" ng-value=\"u.Id\">{{u.Marking}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">首次跟踪</span> <md-datepicker ng-model=\"search.firsttracktime\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">最后跟踪</span> <md-datepicker ng-model=\"search.lasttracktime\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"user.RoleId<11\"> <md-input-container layout=\"row\"> <span class=\"md-label\">分组</span> <md-select md-no-asterisk ng-model=\"search.DepartmentId\" class=\"md-select\" ng-change=\"verifyGroup()\"> <md-option ng-value=\"0\" ng-selected=\"true\">全部</md-option> <md-option ng-repeat=\"g in groups\" ng-value=\"g.DepartmentId\">{{g.DepartmentName}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"user.RoleId<11\"> <md-input-container layout=\"row\"> <span class=\"md-label\">销售</span> <md-select md-no-asterisk ng-model=\"search.userid\" class=\"md-select\"> <md-option ng-value=\"0\" ng-selected=\"true\">全部</md-option> <md-option ng-repeat=\"u in users|groupMember:search.DepartmentId\" ng-value=\"u.UserId\">{{u.RealName}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile md-colspan=\"3\"> <div class=\"text-center\"> <md-input-container> <md-button class=\"md-raised md-primary\" ng-click=\"searchFn()\">查询</md-button> <md-button class=\"md-raised md-primary\" ng-click=\"open()\">新增客户</md-button> <!-- <div uib-dropdown style=\"display: inline-block;\">\r" +
    "\n" +
    "                            <md-button class=\"md-raised md-primary\" uib-dropdown-toggle>批量获取</md-button>\r" +
    "\n" +
    "                            <md-list class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" style=\"right: 0;left: auto;width: 140px; min-width: 140px\">\r" +
    "\n" +
    "                                <md-subheader class=\"md-no-sticky\">客户来源:</md-subheader>\r" +
    "\n" +
    "                                <md-list-item ng-repeat=\"st in sourceTypes\" ng-click=\"getFromPub(st.Id,$event)\">{{::st.Marking}}</md-list-item>\r" +
    "\n" +
    "                                <md-divider></md-divider>\r" +
    "\n" +
    "                        </div> --> </md-input-container> <div uib-dropdown is-open=\"status.isopen\" style=\"display: inline-block\"> <md-button class=\"md-raised md-primary\" uib-dropdown-toggle>批量导入</md-button> <md-list class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" style=\"right: 0;left: auto;width: 140px; min-width: 140px\"> <md-subheader class=\"md-no-sticky\">客户来源:</md-subheader> <md-list-item ng-repeat=\"st in sourceTypes\" ng-click=\"upFile(st.Id,$event)\">{{::st.Marking}}</md-list-item> <md-divider></md-divider> <input type=\"file\" nv-file-select=\"\" uploader=\"uploader2\" style=\"opacity: 0\"> </md-list> </div> </div> </md-grid-tile> </md-grid-list> </form> </div> <md-fab-toolbar md-open=\"batIsOpen\" count=\"100\" md-auto-close=\"false\" md-direction=\"'right'\"> <md-fab-trigger class=\"align-with-text\"> <md-button class=\"md-fab md-primary\"> <i class=\"fa fa-bars\" aria-hidden=\"true\"></i> </md-button> </md-fab-trigger> <md-toolbar> <md-fab-actions class=\"md-toolbar-tools\"> <md-button class=\"md-button\" ng-click=\"selectAll()\">全选</md-button> <md-button class=\"md-button\" ng-click=\"clear()\">清空</md-button> <md-button class=\"md-button\" ng-click=\"toPubAll()\"><i class=\"fa fa-share\" aria-hidden=\"true\"></i>批量转入公海</md-button> <md-button ng-if=\"user.RoleId<11\" class=\"md-button\" ng-click=\"toOthersAll()\"><i class=\"fa fa-share\" aria-hidden=\"true\"></i>批量转其他人</md-button> <md-button class=\"md-button\" ng-click=\"closeTool()\">关闭</md-button> </md-fab-actions> </md-toolbar> </md-fab-toolbar> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th style=\"width: 40px\" ng-show=\"batIsOpen\"></th> <th>公司名称</th> <th>联系人</th> <th>联系人电话</th> <th>意向度</th> <th>首次跟踪时间</th> <th>最后跟踪时间</th> <th>来源</th> <th>销售</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td ng-show=\"batIsOpen\"> <md-checkbox ng-model=\"customer.selected\" ng-true-value=\"true\" ng-false-value=\"false\" class=\"md-primary md-align-top-left\" flex> </md-checkbox> </td> <td><a href=\"javascript:;\" ng-click=\"open(customer)\">{{customer.CompanyName}}</a></td> <td>{{customer.Connector}}</td> <td>{{customer.Mobile}}</td> <td>{{customer.CustomerTypeName}}</td> <td>{{customer.FirstTrackTime|tDate}}</td> <td>{{customer.LastTrackTime|tDate}}</td> <td>{{customer.Marking}}</td> <td>{{::customer.SaleName}}</td> <td class=\"table-opt\"><a href=\"javascript:;\" ng-click=\"open(customer)\">查看</a> <a href=\"javascript:;\" ng-if=\"user.RoleId<10\" ng-click=\"forward(customer)\">客户转出</a> <a href=\"javascript:;\" ng-click=\"toPub(customer)\">转到公海</a> <!--                 <a href=\"javascript:;\" ng-click=\"delete(customer)\">删除</a> --></td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> &nbsp; <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> <input type=\"number\" ng-model=\"paginator.perPage\" required min=\"1\" class=\"form-control\" ng-blur=\"setCurrentPage();\" style=\"width:70px\"> <span class=\"u-pages\"> /页 </span> </div>"
  );


  $templateCache.put('views/customer_pub.html',
    "<div class=\"o-search well well-sm\"> <form class=\"form-inline\"> <md-grid-list md-cols=\"4\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">公司名称</span> <input flex ng-model=\"search.companyName\" aria-label=\"CompanyName\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">联系电话</span> <input required flex ng-model=\"search.phone\" aria-label=\"Mobile\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">意向度</span> <md-select md-no-asterisk ng-model=\"search.cusType\" required aria-label=\"CustomerType\" class=\"md-select\"> <md-option ng-value=\"0\" ng-selected=\"true\">全部</md-option> <md-option ng-repeat=\"type in ctypes\" ng-repeat=\"\" ng-value=\"type.CustomerTypeId\">{{type.Name}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container> <md-button class=\"md-raised md-primary\" ng-click=\"search()\">查询</md-button> <md-button class=\"md-raised md-primary\" ng-click=\"open()\">新增公海客户</md-button> </md-input-container> </md-grid-tile> </md-grid-list> </form> </div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>公司名称</th> <th>历史意向度</th> <th>联系人</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td><a href=\"javascript:;\" ng-click=\"open(customer)\">{{::customer.CompanyName}}</a></td> <td>{{::customer.cusTypeName}}</td> <td>{{::customer.Connector}}</td> <td class=\"table-opt\"> <a href=\"javascript:;\" ng-click=\"open(customer)\">查看</a> <a href=\"javascript:;\" ng-click=\"forward(customer)\">抢客户</a> <a href=\"javascript:;\" ng-if=\"user.RoleId<10\" ng-click=\"delete(customer)\">删除</a> </td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div>"
  );


  $templateCache.put('views/customer_rob.html',
    "<md-dialog aria-label=\"抢客户\" class=\"md-dialog-md\"> <form name=\"cusform\" novalidate> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>抢客户</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1 md-padding\" style=\"overflow: hidden\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">意向度</span> <md-select md-no-asterisk ng-model=\"cusType\" required aria-label=\"CustomerType\" class=\"md-select\"> <md-option ng-repeat=\"type in ctypes\" ng-repeat=\"\" ng-value=\"type.CustomerTypeId\">{{type.Name}}</md-option> </md-select> </md-input-container> </md-dialog-content> <md-dialog-actions layout=\"row\" md-colors=\"::{background: 'default-primary-100'}\"> <span flex></span> <md-button class=\"md-raised md-primary\" ng-disabled=\"!cusType\" ng-click=\"ok($event)\">保存</md-button> <md-button ng-click=\"cancel()\">取消</md-button> </md-dialog-actions> </form> </md-dialog>"
  );


  $templateCache.put('views/customer_setting.html',
    "<div class=\"col-md-8 md-padding\"> <div class=\"row form-group\" style=\"font-size: 1.2em\"> <div class=\"col-md-3\">意向度</div> <div class=\"col-md-3\">库容（/个）</div> <div class=\"col-md-3\">跟进期限（/天）</div> <div class=\"col-md-3\">最大保护期（/天）</div> </div> <div class=\"row form-group\" ng-repeat=\"setting in settings\"> <label class=\"col-md-3 control-label\">{{::setting.Name}}</label> <div class=\"col-md-3\"> <input type=\"text\" class=\"form-control\" ng-model=\"setting.Repertory\"> </div> <div class=\"col-md-3\"> <input type=\"text\" class=\"form-control\" ng-model=\"setting.NoTrackDate\"> </div> <div class=\"col-md-3\"> <input type=\"text\" class=\"form-control\" ng-model=\"setting.LongestData\"> </div> </div> <div class=\"text-center\"> <md-button class=\"md-raised md-primary\" ng-click=\"save()\">保存</md-button> </div> </div>"
  );


  $templateCache.put('views/customer_signed.html',
    "<div class=\"o-search well well-sm\"> <form class=\"form-inline\"> <md-grid-list md-cols=\"5\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">公司名称</span> <input flex ng-model=\"search.companyName\" aria-label=\"CompanyName\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">联系电话</span> <input required flex ng-model=\"search.phone\" aria-label=\"Mobile\"> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"user.RoleId<11\"> <md-input-container layout=\"row\"> <span class=\"md-label\">销售</span> <md-select md-no-asterisk ng-model=\"search.salesId\" class=\"md-select\"> <md-option ng-value=\"0\" ng-selected=\"true\">全部</md-option> <md-option ng-repeat=\"u in users\" ng-value=\"u.UserId\">{{u.RealName}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container> <md-button class=\"md-raised md-primary\" ng-click=\"search()\">查询</md-button> </md-input-container> </md-grid-tile> </md-grid-list> </form> </div> <md-fab-toolbar ng-show=\"user.RoleId<11\" md-open=\"batIsOpen\" count=\"100\" md-auto-close=\"false\" md-direction=\"'right'\"> <md-fab-trigger class=\"align-with-text\"> <md-button class=\"md-fab md-primary\"> <i class=\"fa fa-bars\" aria-hidden=\"true\"></i> </md-button> </md-fab-trigger> <md-toolbar> <md-fab-actions class=\"md-toolbar-tools\"> <md-button class=\"md-button\" ng-click=\"toOthersAll()\"><i class=\"fa fa-share\" aria-hidden=\"true\"></i>批量转其他人</md-button> <md-button class=\"md-button\" ng-click=\"closeTool()\">关闭</md-button> </md-fab-actions> </md-toolbar> </md-fab-toolbar> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th style=\"width: 40px\" ng-show=\"batIsOpen\"></th> <th>公司名称</th> <th>联系人</th> <th>联系人电话</th> <th>合同日期</th> <th>销售</th> <th>主管会计</th> <th>主管会计电话</th> <th>其他服务</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td ng-show=\"batIsOpen\"> <md-checkbox ng-model=\"customer.selected\" ng-true-value=\"true\" ng-false-value=\"false\" class=\"md-primary md-align-top-left\" flex> </md-checkbox> </td> <td>{{::customer.CompanyName}}</td> <td>{{::customer.Connector}}</td> <td>{{::customer.Mobile}}</td> <td>{{::customer.ContractDate|tDate}}</td> <td>{{::customer.SalesName}}</td> <td>{{::customer.AccountantName}}</td> <td>{{::customer.AccountantMobile}}</td> <td><a href=\"javascript:;\" ng-click=\"open(customer)\">查看公司</a> <a href=\"javascript:;\" ng-click=\"service(customer)\">服务内容</a> <a href=\"javascript:;\" ng-click=\"xufei(customer)\">续费</a> <a href=\"javascript:;\" ng-click=\"xufei(customer)\">挂起</a> </td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div>"
  );


  $templateCache.put('views/customer_totaltoc.html',
    "<div class=\"recharge\"> <h2 class=\"clearfix ng-binding\">客户统计</h2> <uib-tabset active=\"active\" style=\"margin-top: 6px\"> <uib-tab index=\"0\" heading=\"新增客户统计\"> <div style=\"padding: 6px 12px\"> <div class=\"well well-sm u-search\"> <form class=\"form-inline\"> <div class=\"form-group\"> <div class=\"input-group\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup ng-model=\"search1.starttime\" is-open=\"dateIsOpenedS\" datepicker-options=\"dateOptions1\" ng-required=\"true\" close-text=\"关闭\" current-text=\"今天\" clear-text=\"清空\" readonly ng-click=\"dateIsOpenedS = !dateIsOpenedS\" ng-change=\"startChange()\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"dateIsOpenedS = !dateIsOpenedS\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </div> — </div> <div class=\"form-group\"> <div class=\"input-group\"> <input class=\"form-control\" type=\"text\" uib-datepicker-popup ng-model=\"search1.endtime\" is-open=\"dateIsOpenedE\" datepicker-options=\"dateOptions2\" ng-required=\"true\" close-text=\"关闭\" current-text=\"今天\" clear-text=\"清空\" readonly ng-click=\"dateIsOpenedE = !dateIsOpenedE\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"dateIsOpenedE = !dateIsOpenedE\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </div> </div> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"tab1Search()\" style=\"margin-left:20px\">查询</button> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"dataExport1()\" style=\"margin-left:20px\">导出</button> </form> </div> <table class=\"table table-striped table-hover table-bordered\" id=\"table1\"> <thead> <tr class=\"info\"> <th>大区</th> <th>省</th> <th>市</th> <th>一级代理商</th> <th>二级代理商</th> <th>新增客户数量</th> <th>新增客户合同金额</th> </tr> </thead> <tbody> <tr ng-repeat=\"item in data1\"> <td>{{::item.PartitionName}}</td> <td>{{::item.ProvinceName}}</td> <td>{{::item.CityName}}</td> <td>{{::item.ChannelName1}}</td> <td>{{::item.ChannelName2}}</td> <td>{{::item.CustomerNum}}</td> <td>{{::item.ContractAmount}}</td> </tr> </tbody> <tfoot ng-if=\"data1.length != 0\"> <tr> <td colspan=\"5\">合计</td> <td>{{total1.SumCustomerNum}}</td> <td>{{total1.SumContractAmount||0}}</td> </tr> </tfoot> </table> </div> </uib-tab> <uib-tab index=\"1\" heading=\"到期未续费客户统计\"> <div style=\"padding: 6px 12px\"> <div class=\"well well-sm u-search\"> <form class=\"form-inline\"> <div class=\"form-group\"> <div class=\"input-group\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup ng-model=\"search2.starttime\" is-open=\"dateIsOpenedS\" datepicker-options=\"dateOptions1\" ng-required=\"true\" close-text=\"关闭\" current-text=\"今天\" clear-text=\"清空\" readonly ng-click=\"dateIsOpenedS = !dateIsOpenedS\" ng-change=\"startChange()\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"dateIsOpenedS = !dateIsOpenedS\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </div> — </div> <div class=\"form-group\"> <div class=\"input-group\"> <input class=\"form-control\" type=\"text\" uib-datepicker-popup ng-model=\"search2.endtime\" is-open=\"dateIsOpenedE\" datepicker-options=\"dateOptions2\" ng-required=\"true\" close-text=\"关闭\" current-text=\"今天\" clear-text=\"清空\" readonly ng-click=\"dateIsOpenedE = !dateIsOpenedE\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"dateIsOpenedE = !dateIsOpenedE\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </div> </div> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"tab2Search()\" style=\"margin-left:20px\">查询</button> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"dataExport2()\" style=\"margin-left:20px\">导出</button> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"export()\" style=\"margin-left:20px\">未续费明细下载</button> </form> </div> <table class=\"table table-striped table-hover table-bordered\" id=\"table2\"> <thead> <tr class=\"info\"> <th>大区</th> <th>省</th> <th>市</th> <th>一级代理商</th> <th>二级代理商</th> <th>未续费客户数量</th> </tr> </thead> <tbody> <tr ng-repeat=\"item in data2\"> <td>{{::item.PartitionName}}</td> <td>{{::item.ProvinceName}}</td> <td>{{::item.CityName}}</td> <td>{{::item.ChannelName1}}</td> <td>{{::item.ChannelName2}}</td> <td>{{::item.NotReFeeNum}}</td> </tr> </tbody> <tfoot ng-if=\"data2.length != 0\"> <tr> <td colspan=\"5\">合计</td> <td>{{total2.SumNotReFee}}</td> </tr> </tfoot> </table> </div> </uib-tab> </uib-tabset> </div>"
  );


  $templateCache.put('views/customer_track.html',
    "<md-dialog aria-label=\"跟踪\" class=\"md-dialog-lg\"> <form name=\"cusform\" novalidate> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>{{::title}}</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1 md-padding\"> <div class=\"trackblock\"> <div ng-repeat=\"track in tracks\" class=\"trackItem\"> <div class=\"pull-right saler\">{{::track.RealName}}</div> <div class=\"date\">{{::track.TrackDate|tDateTime}}</div> <!-- <div class=\"pull-right\" ng-if=\"user.UserId == track.SalesId && track.TrackDate.substr(0,10)==today\"><a href=\"javascript:;\" ng-click=\"delete(track)\"><i class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></i></a></div> --> <pre class=\"description\">{{::track.Description}}</pre> </div> <div ng-if=\"!tracks || tracks.length === 0\" class=\"trackItem\">暂无跟踪记录</div> </div> <div class=\"addtrack well-sm\" layout=\"column\" ng-if=\"!isPub\"> <!--  <md-input-container layout=\"row\">\r" +
    "\n" +
    "                    <span class=\"md-label md-required\">跟踪日期</span>\r" +
    "\n" +
    "                    <md-datepicker ng-model=\"TrackDate\" flex formater=\"yyyy-MM-dd\" md-max-date=\"maxDate\" md-placeholder=\"跟踪日期\" md-open-on-focus=\"true\"></md-datepicker>\r" +
    "\n" +
    "                </md-input-container> --> <div flex layout=\"row\" style=\"position: relative\"> <textarea flex ng-model=\"track.content\"></textarea> <md-button ng-click=\"save()\" class=\"md-raised md-primary save\">跟踪</md-button> </div> </div> <div class=\"addtrack well-sm tag-row\" ng-if=\"!isPub\"> <span class=\"pull-left tag-type\" style=\"margin-left: 9px\">提醒日期</span> <div style=\"position: relative\"> <md-chips ng-model=\"reminds\" readonly md-removable=\"true\" md-on-remove=\"deleteRemind($chip)\"> <md-chip-template> <span title=\"{{$chip.SalesName}}\">{{$chip.NextTrackTime|tDate}}</span> </md-chip-template> <span style=\"cursor: pointer\" md-chip-remove>&times;</span> </md-chips> <md-input-container layout=\"row\" style=\"margin: 0\"> <span class=\"md-label\">添加提醒</span> <md-datepicker ng-model=\"remind.remindDate\" flex formater=\"yyyy-MM-dd\" md-placeholder=\"提醒日期\" md-min-date=\"today\" md-open-on-focus=\"false\" ng-change=\"addRemind()\"></md-datepicker> </md-input-container> </div> </div> </md-dialog-content> <md-dialog-actions layout=\"row\" md-colors=\"::{background: 'default-primary-100'}\"> <span flex></span> <md-button ng-click=\"cancel()\">关闭</md-button> </md-dialog-actions> </form> </md-dialog>"
  );


  $templateCache.put('views/customer_view.html',
    "<md-dialog aria-label=\"客户\" class=\"md-dialog-lg\"> <form name=\"cusform\" novalidate> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>{{title}}</h2>&nbsp; <md-chips ng-model=\"custags\" class=\"title-chip\" readonly md-removable=\"postData.CustomerTypeId != 5\" md-on-remove=\"deleteTag($chip)\"> <md-chip-template> <span>{{$chip.TagName}}</span> </md-chip-template> <span md-chip-remove>&times;</span> </md-chips> <span flex></span> </div> </md-toolbar> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1\" style=\"padding: 8px 16px;position: relative\"> <div ng-show=\"opt.isOpen\" class=\"well-sm\" style=\"position: absolute;top: 2px;width: 96%;background: rgb(152, 148, 148);color: rgb(255, 255, 255); z-index: 99\"> </div> <div layout=\"row\"> <div flex=\"33\" style=\"padding: 12px; border-right: solid 1px #999\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">公司名称</span> <input flex ng-model=\"postData.CompanyName\" aria-label=\"CompanyName\"> </md-input-container> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">联系人</span> <input required flex ng-model=\"postData.Connector\" aria-label=\"Connector\"> </md-input-container> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">联系电话</span> <input required flex ng-model=\"postData.Mobile\" aria-label=\"Mobile\"> </md-input-container> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">意向度</span> <md-select md-no-asterisk ng-model=\"postData.CustomerTypeId\" required aria-label=\"CustomerType\" class=\"md-select\"> <md-option ng-repeat=\"type in ctypes\" ng-repeat=\"\" ng-value=\"type.CustomerTypeId\">{{type.Name}}</md-option> </md-select> </md-input-container> <md-input-container layout=\"row\"> <span class=\"md-label\">来源</span> <md-select md-no-asterisk ng-model=\"postData.CustomerSourceId\" class=\"md-select\" disabled> <md-option ng-value=\"0\" ng-selected=\"true\">全部</md-option> <md-option ng-repeat=\"u in sourceTypes\" ng-value=\"u.Id\">{{u.Marking}}</md-option> </md-select> </md-input-container> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">备注</span> <textarea flex ng-model=\"postData.Mark\" maxlength=\"200\"></textarea> </md-input-container> </div> <div flex style=\"padding: 12px\"> <md-content label=\"打标签\" ng-if=\"postData.CustomerTypeId !=5 || postData.Status == 2\"> <div>打标签</div> <div ng-repeat=\"(key, tagGroup) in tags\" class=\"tag-row\"> <span class=\"pull-left tag-type\">{{key}}</span> <md-chips ng-model=\"tagGroup.tags\" readonly md-removable=\"false\" md-can-click=\"true\" md-selected=\"tagGroup.selected\" md-on-select=\"addTag($chip,null,$index)\"> <md-chip-template> <span>{{$chip.TagName}}</span> </md-chip-template> <span md-chip-remove>&times;</span> </md-chips> </div> </md-content> <md-content label=\"跟踪记录\"> <div ng-controller=\"Customer_track\"> <div class=\"addtrack well-sm\" layout=\"column\" ng-if=\"!isPub\"> <div flex layout=\"row\" style=\"position: relative\"> <textarea flex ng-model=\"track.content\"></textarea> <!--              <md-button ng-click=\"save()\" class=\"md-raised md-primary save\">跟踪</md-button> --> </div> </div> <div class=\"trackblock\"> <div ng-repeat=\"track in tracks\" class=\"trackItem\"> <div class=\"pull-right saler\">{{::track.RealName}}</div> <div class=\"date\">{{::track.TrackDate|tDateTime}}</div> <!-- <div class=\"pull-right\" ng-if=\"user.UserId == track.SalesId && track.TrackDate.substr(0,10)==today\"><a href=\"javascript:;\" ng-click=\"delete(track)\"><i class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></i></a></div> --> <pre class=\"description\">{{::track.Description}}</pre> </div> <div ng-if=\"!tracks || tracks.length === 0\" class=\"trackItem\">暂无跟踪记录</div> </div> </div> </md-content> <md-content label=\"客户提醒\" ng-if=\"postData.CustomerTypeId !=5 || postData.Status == 2\"> <div ng-controller=\"Customer_remind\"> <div class=\"addtrack well-sm tag-row\" ng-if=\"!isPub\"> <span class=\"pull-left tag-type\" style=\"margin-left: 9px\">下次跟进日期</span> <div style=\"position: relative\"> <md-chips ng-model=\"reminds\" readonly md-removable=\"true\" md-on-remove=\"deleteRemind($chip)\"> <md-chip-template> <span title=\"{{$chip.SalesName}}\">{{$chip.NextTrackTime|tDate}}</span> </md-chip-template> <span md-chip-remove style=\"cursor: pointer\">&times;</span> </md-chips> <md-input-container layout=\"row\" style=\"margin: 0\"> <span class=\"md-label\">添加提醒</span> <md-datepicker ng-model=\"remind.remindDate\" flex formater=\"yyyy-MM-dd\" md-placeholder=\"提醒日期\" md-min-date=\"today\" md-open-on-focus=\"false\" ng-change=\"addRemind()\"></md-datepicker> </md-input-container> </div> </div> </div> </md-content> </div> </div> </md-dialog-content> <md-dialog-actions layout=\"row\" md-colors=\"::{background: 'default-primary-100'}\"> <span flex></span> <md-button ng-if=\"notPub && postData.Status <>2\" class=\"md-raised md-primary\" ng-click=\"toPub(postData)\">转公海&amp;下一条</md-button> <md-button class=\"md-raised md-primary\" ng-click=\"next(postData)\">保存&amp;下一条</md-button> <md-button ng-click=\"cancel()\">取消</md-button> </md-dialog-actions> </form> </md-dialog>"
  );


  $templateCache.put('views/customer_viewservice.html',
    "<md-dialog class=\"md-dialog-lg\"> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>服务内容</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1 md-padding\"> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>记账服务</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>公司名称</th> <th>订单类型</th> <th>合同日期</th> <th>礼包</th> <th>销售</th> <th>提单日期</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in orders\"> <td>{{::customer.CompanyName}}<span style=\"color:red\" ng-if=\"customer.IsChange\">(已变更)</span><span style=\"color:red\" ng-if=\"customer.FreChangeOrderId\">(产品变更)</span></td> <td>{{::customer.Category|orderCategory}}</td> <td>{{::customer.ContractDate|tDate}}</td> <td>{{::customer.GiftTypeName}}</td> <td>{{::customer.SalesName}}</td> <td>{{::customer.CreateDate|tDateTime}}</td> <td class=\"table-opt\"> <a ng-if=\"customer.FreChangeOrderId\" href=\"javascript:;\" ng-click=\"openOri(customer.FreChangeOrderId)\">查看原合同</a> <a ng-if=\"customer.Stauts !=1\" href=\"javascript:;\" ng-click=\"open(customer)\">查看/修改</a> <a ng-if=\"customer.Stauts ==1\" href=\"javascript:;\" ng-click=\"open(customer)\">补充</a> <!-- <a href=\"javascript:;\" ng-click=\"delete(customer)\">删除</a> --> </td> </tr> </tbody> </table> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>外勤任务</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>公司名称</th> <th>联系人</th> <th>联系人电话</th> <th>销售</th> <th>外勤</th> <th>状态</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in outworkers\"> <td>{{customer.CompanyName}}</td> <td>{{customer.Connector}}</td> <td>{{customer.Mobile}}</td> <td>{{customer.SalesName}}</td> <td>{{customer.OutWorkerName}}</td> <td>{{customer.Status|otStatus}}</td> <td class=\"table-opt\"><a href=\"javascript:;\" ng-click=\"detail(customer)\">查看详情</a> </td></tr> </tbody> </table> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>对账单</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>日期</th> <th>客户名称</th> <th>服务内容</th> <th>支付方式</th> <th>卡号</th> <th>员工</th> <th>收费总金额</th> <th>记账报税</th> <th>服务费</th> <th>汇缴</th> <th>年报</th> <th>注册</th> <th>银行开户</th> <th>国地税报道</th> <th>刻章</th> <th>地址费用</th> <th>变更</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in statements\"> <td>{{::customer.BillTime|tDate}}</td> <td>{{::customer.CompanyName}}</td> <td>{{::customer.ServiceContent}}</td> <td>{{::customer.PayName}}</td> <td>{{::customer.AccountNum}}</td> <td>{{::customer.SaleName}}</td> <td>{{::customer.SumAccount}}</td> <td>{{::customer.AccountsTax}}</td> <td>{{::customer.ServiceCharge}}</td> <td>{{::customer.TaxPayment}}</td> <td>{{::customer.AnnualReport}}</td> <td>{{::customer.Register}}</td> <td>{{::customer.OpenBank}}</td> <td>{{::customer.NationLocalTax}}</td> <td>{{::customer.Prints}}</td> <td>{{::customer.AddressCost}}</td> <td>{{::customer.Change}}</td> </tr> </tbody> </table> </md-dialog-content> <md-dialog-actions layout=\"row\" md-colors=\"::{background: 'default-primary-100'}\"> <span flex></span> <md-button ng-click=\"cancel()\">关闭</md-button> </md-dialog-actions> </md-dialog>"
  );


  $templateCache.put('views/customer_warning.html',
    "<md-dialog aria-label=\"公司\" class=\"md-dialog-lg\"> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>警告</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1 md-padding\" style=\"overflow: auto\"> <h2>您输入的客户手机号在系统中有重复记录如下：</h2> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th style=\"width: 40px\" ng-show=\"batIsOpen\"></th> <th>公司名称</th> <th>联系人电话</th> <th>销售</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td ng-show=\"batIsOpen\"> <md-checkbox ng-model=\"customer.selected\" ng-true-value=\"true\" ng-false-value=\"false\" class=\"md-primary md-align-top-left\" flex> </md-checkbox> </td> <td><a href=\"javascript:;\" ng-click=\"open(customer)\">{{customer.CompanyName}}</a></td> <td>{{customer.Mobile}}</td> <td>{{::customer.RealName}}</td> </tr> </tbody> </table> <pre style=\"color: red\">\r" +
    "\n" +
    "      请确认以上重复手机号码记录中的公司和您当前录入的公司是否相同。\r" +
    "\n" +
    "\r" +
    "\n" +
    "      比如：\r" +
    "\n" +
    "        北京爱康鼎科技有限公司和北京爱康鼎科技有限责任公司 \r" +
    "\n" +
    "        这种情况应该认为是相同公司。\r" +
    "\n" +
    "        疑似重复，无法确认的情况，请及时与其他销售同事沟通确认！\r" +
    "\n" +
    "        如果确认相同，说明已经有其他销售同事正在负责对接客户了。应该取消本次录入，否则会造成撞单问题。\r" +
    "\n" +
    "        如果确认不同，点击确认保存本次录入。\r" +
    "\n" +
    "\r" +
    "\n" +
    "      注意：撞单问题发生的处理办法，按公司销售部门规章制度执行。\r" +
    "\n" +
    "    </pre> </md-dialog-content> <md-dialog-actions layout=\"row\" md-colors=\"::{background: 'default-primary-100'}\"> <span flex></span> <md-button class=\"md-raised md-primary\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok($event)\">确定</md-button> <md-button ng-click=\"cancel()\">取消</md-button> </md-dialog-actions> </md-dialog>"
  );


  $templateCache.put('views/dashboard.html',
    "<md-grid-list md-cols-md=\"3\" md-cols=\"3\" md-gutter=\"1em\" md-row-height=\"300px\" ng-if=\"!user.IsCenter\"> <md-grid-tile md-colspan=\"2\"> <div style=\"width: 100%;height: 100%; overflow: auto\"> <div> <div style=\"padding-left:0\"> <md-input-container layout=\"row\" style=\"margin: 0\"> <span class=\"md-label\">跟踪提醒</span> <md-datepicker ng-model=\"rmd.DQdate\" ng-model-options=\"timeoption\" md-open-on-focus=\"true\" ng-change=\"getRemind()\"></md-datepicker> </md-input-container> </div> </div> <table class=\"table table-striped table-hover table-bordered\" ng-if=\"reminds.length>0\"> <thead> <tr> <th>公司名称</th> <th>联系人</th> <th>联系人电话</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in reminds\"> <td>{{::customer.CompanyName}}</td> <td>{{::customer.Connector}}</td> <td>{{::customer.Mobile}}</td> <td class=\"table-opt\"><a href=\"javascript:;\" ng-click=\"open(customer)\">查看</a> <!--                 <a href=\"javascript:;\" ng-click=\"delete(customer)\">删除</a> --> </td> </tr> </tbody> </table> <div class=\"text-center md-padding\" ng-if=\"reminds.length==0\" md-colors=\"::{background: 'default-primary-100'}\">暂无提醒</div> </div> <md-divider></md-divider> </md-grid-tile> <md-grid-tile ng-if=\"user.RoleId==11 || user.RoleId ==7 || user.RoleId ==9\"> <div style=\"width: 100%;height: 100%; overflow: auto\"> <md-toolbar class=\"site-content-toolbar\" style=\"height: 45px\"> <div class=\"md-toolbar-tools\" md-colors=\"::{background: 'default-primary-50'}\" style=\"padding-left:0\"> 签单全国排名 </div> </md-toolbar> <md-content class=\"md-padding\"> <ul class=\"list-group panming\"> <li class=\"list-group-item\">全年排名:<span class=\"badge\">{{year}}</span></li> <li class=\"list-group-item\">半年排名:<span class=\"badge\">{{halfyear}}</span></li> <li class=\"list-group-item\">季度排名:<span class=\"badge\">{{quarter}}</span></li> <li class=\"list-group-item\">当月排名:<span class=\"badge\">{{month}}</span></li> </ul> </md-content> </div> </md-grid-tile> </md-grid-list> <md-grid-list md-cols=\"3\" md-gutter=\"1em\" md-row-height=\"150px\" ng-if=\"user.IsCenter\"> <md-grid-tile ng-repeat=\"item in companies\"> <md-list flex class=\"md-dense\" md-colors=\"::{background: 'default-primary-50'}\" style=\"padding: 12px\"> <h4>{{item.CompanyName}}</h4> <h6>{{item.Address||'&nbsp;'}}</h6> <p class=\"text-center\"> <md-button class=\"md-raised md-primary\" ng-click=\"enter(item)\">进入</md-button> </p> <md-divider></md-divider> </md-list> </md-grid-tile> </md-grid-list>"
  );


  $templateCache.put('views/finance_contract_detail.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">合同查看</h3> </div> <div class=\"modal-body\"> <div class=\"contract-belong-info clearfix\"> <div class=\"title\"> <div class=\"fl belong-left\"> <span>合同归属信息</span> </div> <div class=\"fr belong-right\"> <button class=\"btn\" type=\"button\" ng-disabled=\"postDetail.FinancialAudit != 1\" ng-click=\"check()\">财务审核</button> <button class=\"btn\" type=\"button\" ng-disabled=\"postDetail.FinancialAudit != 1\" ng-click=\"refuse()\">财务驳回</button> </div> </div> <form name=\"contractBelongform\" novalidate class=\"clearfix\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>所属公司</label>： <input flex ng-model=\"postDetail.SubsidiaryName\" required readonly class=\"input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>合同状态</label>： <input flex value=\"{{postDetail.OrderStatus|Contractstatus}}\" required readonly class=\"input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>财务状态</label>： <input flex value=\"{{postDetail.FinancialAudit|FinanceStatus}}\" required readonly class=\"input-border\"> </div> </form> </div> <div class=\"customer-info\"> <div class=\"title\">客户基本信息</div> <form name=\"customerform\" novalidate class=\"clearfix\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">甲方</label>： <input flex ng-model=\"postDetail.CompanyName\" required ng-disabled=\"canChange\" class=\"input-border\"> <!-- <span class=\"add-icon\" ng-click=\"selectCustomer()\">+</span> --> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">联系人</label>： <input flex ng-model=\"postDetail.Connector\" required ng-disabled=\"canChange\" class=\"input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">联系人电话</label>： <input flex ng-model=\"postDetail.Mobile\" required ng-disabled=\"canChange\" class=\"input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">所属销售</label>： <input flex ng-model=\"postDetail.SalesName\" required readonly class=\"input-border\"> </div> </form> </div> <div class=\"contract-info\"> <div class=\"title\">合同信息</div> <div class=\"content\"> <form name=\"contractform\" novalidate class=\"clearfix\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">合同编号</label>： <input flex ng-model=\"postDetail.ContractNo\" required ng-disabled=\"canChange\" class=\"input-width1 input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">合同类型</label>： <select ng-model=\"postDetail.OrderType\" class=\"input-border\" ng-disabled=\"canChange\"> <option value=\"\">请选择</option> <option ng-repeat=\"(key,value) in contractType\" value=\"key\" ng-selected=\"postDetail.OrderType == key\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>合同期限</label>： <input flex ng-model=\"postDetail.OrderMonths\" placeholder=\"个月\" ng-disabled=\"canChange\" type=\"number\" class=\"input-width input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>赠送礼包</label>： <input flex ng-model=\"postDetail.GiftMonth\" placeholder=\"个月\" ng-disabled=\"canChange\" type=\"number\" class=\"input-width input-border\"> </div> <div class=\"form-group col-md-4\" style=\"margin: 5px 10px 5px 10px;min-width:300px\"> <lable class=\"required\" style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">签订日期：</lable> <div class=\"col-md-8\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" ng-click=\"open1()\" ng-model=\"postDetail.ContractDate\" uib-datepicker-popup=\"yyyy-MM-dd\" ng-model=\"dt\" is-open=\"popup1.opened\" datepicker-options=\"dateOptions\" close-text=\"关闭\" alt-input-formats=\"altInputFormats\" style=\"padding:6px\" ng-disabled=\"canChange\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open1()\" ng-disabled=\"canChange\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <table class=\"table table-hover table-bordered\"> <thead> <tr class=\"info\"> <th>项目</th> <th>子项目</th> <th>费用</th> </tr> </thead> <tbody> <tr ng-repeat=\"rg in rlist\"> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <select ng-model=\"rg.MainItemId\" ng-change=\"getcurProject(rg, $index)\" class=\"input-border select-width\" ng-disabled=\"canChange\"> <option value=\"\">请选择</option> <option ng-repeat=\"item in projectItems\" value=\"{{item.Id}}\" ng-selected=\"rg.MainItemId == item.Id\">{{item.Name}}</option> </select> </td> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <select ng-model=\"rg.ChildItemId\" class=\"input-border select-width\" ng-disabled=\"canChange\"> <option value=\"\">请选择</option> <option ng-repeat=\"item in rg.contractprojectChildOptions\" value=\"{{item.Id}}\" ng-selected=\"rg.ChildItemId == item.Id\">{{item.Name}}</option> </select> </td> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <input class=\"select-width input-border\" type=\"number\" ng-model=\"rg.Amount\" ng-blur=\"getAmount(rg)\" ng-disabled=\"canChange\"> </td> </tr> <tr> <td colspan=\"4\" style=\"height:34px;line-height: 20px; padding: 6px 12px\" class=\"clearfix\"> <div class=\"amount fl\"> <span>记账报税费用：</span> <span class=\"contract-inputWidth\">{{postDetail.BookKeepFeed}}</span> </div> <div class=\"amount fl\"> <span>财务服务费用：</span> <span class=\"contract-inputWidth\">{{postDetail.FinanceServiceFeed}}</span> </div> <div class=\"amount fl\"> <span>外勤服务费用：</span> <span class=\"contract-inputWidth\">{{postDetail.OutWorkServiceFeed}}</span> </div> <div class=\"amount fl\"> <span>代收费用：</span> <span class=\"contract-inputWidth\">{{postDetail.AgentFeed}}</span> </div> <div class=\"amount fl\"> <span>合同总金额：</span> <span class=\"contract-inputWidth\" style=\"color: red\">{{postDetail.Amount}}</span> </div> </td> </tr> </tbody> </table> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>备注信息：</label> <textarea style=\"width:950px;color:#ccc\" cols=\"100\" rows=\"3\" ng-model=\"postDetail.Remark\" ng-disabled=\"canChange\"></textarea> </div> </form> </div> </div> <div class=\"pay-info\"> <div class=\"title\">支付信息</div> <div class=\"content\"> <form name=\"payform\" novalidate class=\"clearfix\"> <div class=\"item clearfix\" ng-repeat=\"(pindex, pl) in paylist\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">支付方式</label>： <select ng-model=\"pl.PayTypeId\" class=\"input-border\" ng-disabled=\"canChange\"> <option value=\"\">请选择</option> <option ng-repeat=\"(key,value) in payTypes\" value=\"{{key}}\" ng-selected=\"pl.PayTypeId == key\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">支付方账号</label>： <input flex ng-model=\"pl.PayAccountNo\" required class=\"input-border\" ng-disabled=\"canChange || pl.PayTypeId == 5\" style=\"width:200px\"> </div> <div class=\"form-group col-md-3\" style=\"margin: 5px 10px 5px 10px\"> <lable class=\"required\" style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">支付时间：</lable> <div class=\"col-md-8\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"yyyy/MM/dd\" ng-model=\"pl.PayTime\" is-open=\"pl.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" style=\"padding:6px\" ng-disabled=\"canChange || pl.PayTypeId == 5\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"pl.opened = true\" ng-disabled=\"canChange || pl.payType == 5\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px; display: flex; align-items: center\"> <label class=\"required img-bottom\">凭证</label>： <div ng-if=\"canChange\" style=\"display: inline-block\"> <img ng-src=\"{{pl.PayImagePath}}\" class=\"contract-img\" pic-view> </div> <div ng-if=\"!canChange\" style=\"display: inline-block\"> <img ng-src=\"{{pl.PayImagePath}}\" ng-if=\"pl.PayImagePath\" alt=\"\" pic-view class=\"contract-img-style\"> <div class=\"uploader-outter\"> <input ng-click=\"imgClick(pindex)\" class=\"uploader-img\" type=\"file\" nv-file-select=\"\" uploader=\"uploader1[pindex]\"> </div> <div class=\"progress\" style=\"width:80%;margin-left:90px\" ng-if=\"uploader1[pindex].isUploading\"> <div class=\"progress-bar\" role=\"progressbar\" ng-style=\"{ 'width': uploader1[pindex].progress + '%' }\" style=\"width: 100%\"></div> </div> </div> </div> </div> </form> </div> </div> </div>"
  );


  $templateCache.put('views/finance_manageContract.html',
    "<div class=\"recharge\"> <div class=\"well well-sm u-search clearfix\"> <form class=\"form-inline\" style=\"position:relative;padding-right:100px\"> <div class=\"form-group\" style=\"margin: 5px\"> <label>所属公司</label>： <select class=\"form-control\" ng-model=\"search.subsidairy\"> <option value=\"0\">请选择</option> <option ng-repeat=\"item in companys\" ng-value=\"item.SubsidiaryId\">{{item.CompanyName}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>合同编号</label>： <input type=\"text\" ng-model=\"search.contractNo\" class=\"form-control\" style=\"width: 100px\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>甲方</label>： <input type=\"text\" ng-model=\"search.companyname\" class=\"form-control\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>联系人</label>： <input type=\"text\" ng-model=\"search.contact\" class=\"form-control\" style=\"width: 90px\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>销售人员</label>： <input type=\"text\" ng-model=\"search.saleName\" class=\"form-control\" style=\"width: 90px\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>合同状态</label>： <select ng-model=\"search.contractStatus\" class=\"form-control\"> <option value=\"0\">请选择</option> <option ng-repeat=\"(key,value) in contractStatus\" ng-value=\"key\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>合同类型</label>： <select ng-model=\"search.contractType\" class=\"form-control\"> <option value=\"0\">请选择</option> <option ng-repeat=\"(key,value) in contractType\" ng-value=\"key\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>财务审核状态</label>： <select ng-model=\"search.financeStatus\" class=\"form-control\"> <option value=\"0\">请选择</option> <option ng-repeat=\"(key,value) in accountStatus\" ng-value=\"key\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px;min-width:300px\"> <lable style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">合同签订日期：</lable> <div class=\"row\" style=\"float:left;width:300px\"> <div class=\"col-md-6\" style=\"width: 48%;padding-right: 0\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"{{format}}\" ng-model=\"dt1\" is-open=\"popup1.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" alt-input-formats=\"altInputFormats\" ng-change=\"changeDate()\" id=\"date1\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open1()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> <span class=\"inner-date\">-</span> <div class=\"col-md-6\" style=\"width: 48%;padding: 0\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup ng-model=\"dt2\" is-open=\"popup2.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" ng-change=\"changeDate()\" id=\"date2\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open2()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> </div> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"searchFn()\" style=\"position:absolute;right:20px;top:5px\">搜索</button> <button class=\"btn btn-primary pull-right\" ng-click=\"toExcel()\" style=\"position:absolute;right:20px;top:50px\">导出</button> </form> </div> <div js-height style=\"overflow-x: scroll\"> <table class=\"table table-striped table-hover table-bordered\" id=\"dataTable\" style=\"min-width:1500px\"> <thead> <tr class=\"info\"> <th>选择</th> <th>所属公司</th> <th>合同编号</th> <th>甲方</th> <th>联系人</th> <th>销售人员</th> <th>合同类型</th> <th>合同状态</th> <th>合同签订日期</th> <th>合同总金额</th> <th>财务审核</th> <th>最后操作人</th> <th>最后修改日期</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"contract in contracts\"> <td><input type=\"checkbox\" ng-model=\"contract.selected\" ng-disabled=\"contract.FinancialAudit != 1 \" style=\"vertical-align: top; width:16px;height:16px\"></td> <td style=\"text-align:center\"><span class=\"nowrap\" title=\"{{contract.SubsidiaryName}}\">{{contract.SubsidiaryName}}</span></td> <td style=\"text-align:center\">{{contract.ContractNo}}</td> <td style=\"text-align:center\"><span class=\"nowrap\" title=\"{{contract.CompanyName}}\">{{contract.CompanyName}}</span></td> <td style=\"text-align:center\">{{contract.Connector}}</td> <td style=\"text-align:center\">{{contract.SaleName}}</td> <td style=\"text-align:center\">{{contract.OrderType | ContractType}}</td> <td style=\"text-align:center\">{{contract.OrderStatus | Contractstatus}}</td> <td style=\"text-align:center\">{{contract.ContractDate | formateDate}}</td> <td style=\"text-align:center\">{{contract.Amount}}</td> <td style=\"text-align:center\">{{contract.FinancialAudit | NewCheckStatus}}</td> <td style=\"text-align:center\">{{contract.ModifyUserName}}</td> <td style=\"text-align:center\">{{contract.ModifyDate}}</td> <td class=\"table-opt\"> <button class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"detail(contract)\">查看</button> <button class=\"btn btn-link\" ng-disabled=\"contract.FinancialAudit != 1\" ng-click=\"check(contract)\">审核</button> <button class=\"btn btn-link\" ng-disabled=\"contract.FinancialAudit != 1\" ng-click=\"refuse(contract)\">驳回</button> </td> </tr> </tbody> </table> <div style=\"padding-left:10px;line-height: 23px\"> <lable> <input type=\"checkbox\" style=\"vertical-align: top; width:16px;height:16px\" ng-model=\"forwards.isSelectAll\" ng-change=\"selectAll()\"> 全选 </lable> <button style=\"padding:0 5px;border: 1px solid #ccc;background: #eee\" class=\"btn\" type=\"button\" ng-click=\"checkAll()\">批量审核</button> </div> </div> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> &nbsp; <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" ng class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div> </div>"
  );


  $templateCache.put('views/go_task_config.html',
    "<div class=\"recharge\"> <div class=\"well well-sm u-search clearfix\"> <button class=\"btn btn-primary pull-right\" ng-click=\"add('',$event,'新增通办任务')\" style=\"margin:12px 0\">&nbsp;&nbsp;&nbsp;新增&nbsp;&nbsp;&nbsp;</button> </div> <!--<div ng-repeat=\"item in tasks\">--> <div style=\"position:relative\" ng-repeat=\"item in tasksArr\"> <uib-accordion close-others=\"false\"> <div uib-accordion-group class=\"panel-default\" is-open=\"true\"> <uib-accordion-heading> {{item.CommonTaskName}}&nbsp; <div style=\"position:absolute;top:0;right:20px\"> <button class=\"btn btn-primary pull-right\" ng-click=\"ifuse($event,item)\" style=\"margin:5px 0;height:29px;line-height:16px\">&nbsp;&nbsp;&nbsp;{{item.Status==1?\"禁用\":\"启用\"}}&nbsp;&nbsp;&nbsp;</button> <button class=\"btn btn-primary pull-right\" ng-click=\"add(item,$event,'编辑任务')\" style=\"margin:5px 20px 0;height:29px;line-height:16px\">&nbsp;&nbsp;&nbsp;编辑&nbsp;&nbsp;&nbsp;</button> </div> </uib-accordion-heading> <label ng-repeat=\"_item in item.TaskList\" style=\"margin-right:20px\">{{$index+1}}.{{_item.TaskName}}</label> </div> </uib-accordion> </div> </div>"
  );


  $templateCache.put('views/go_task_config_view.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">{{::title}}</h3> </div> <div class=\"modal-body\"> <form name=\"cusform\" novalidate class=\"form-inline\"> <div class=\"clearfix\" style=\"width:80%\"> <div class=\"form-group col-md-6\" style=\"margin: 12px 0;float:left\"> <label for=\"\" class=\"required\">通办任务名称</label> <input type=\"text\" class=\"form-control\" ng-model=\"task.CommonTaskName\" maxlength=\"15\" required> </div> <div class=\"form-group col-md-6\" style=\"margin: 12px 0;float:left\"> <label for=\"\" class=\"required\">排序权重</label> <input class=\"form-control\" ng-model=\"task.Weight\" min=\"1\" max=\"99\" maxlength=\"2\" required style=\"width:80px\" ng-change=\"task.Weight = Math.floor(Math.abs(task.Weight)) || ''\"> </div> </div> </form> <div> <uib-accordion close-others=\"false\"> <!--<div uib-accordion-group class=\"panel-default\" is-open=\"true\">\n" +
    "                <uib-accordion-heading>\n" +
    "                    {{item.name}}\n" +
    "                    <div style=\"position:absolute;top:0;right:20px;\">\n" +
    "                        <button class=\"btn btn-primary pull-right\" ng-click=\"ifuse($event)\" style=\"margin:5px 0;height:29px;line-height:16px\">&nbsp;&nbsp;&nbsp;启用&nbsp;&nbsp;&nbsp;</button>\n" +
    "                        <button class=\"btn btn-primary pull-right\" ng-click=\"add('',$event,'编辑任务')\" style=\"margin:5px 20px 0;height:29px;line-height:16px;\">&nbsp;&nbsp;&nbsp;编辑&nbsp;&nbsp;&nbsp;</button>\n" +
    "                    </div>\n" +
    "                </uib-accordion-heading>\n" +
    "                <lable ng-repeat=\"_item in item.tasks\"><input type=\"checkbox\" name=\"\" checked value=\"{{_item}}\">{{$index+1}}.{{_item}}</lable>\n" +
    "            </div>--> <div uib-accordion-group class=\"panel-default\" is-open=\"open1\"> <uib-accordion-heading>税务任务 <i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': open1, 'glyphicon-chevron-right': !open1}\"></i></uib-accordion-heading> <label ng-repeat=\"item in Tasks|filter:{BusinessType:1}:true\" style=\"font-size:14px; min-width:200px;line-height:24px;display: inline-block; font-weight:400\"><input type=\"checkbox\" ng-model=\"item.checked\">{{item.TaskName}}</label> </div> <!--ifChecked(item.Id) ifAdd && item.Status==1 ng-model=\"item.checked\"--> <div uib-accordion-group class=\"panel-default\" is-open=\"open2\"> <uib-accordion-heading>工商任务 <i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': open2, 'glyphicon-chevron-right': !open2}\"></i></uib-accordion-heading> <label ng-repeat=\"item in Tasks|filter:{BusinessType:2}:true\" style=\"font-size:14px; min-width:200px;line-height:24px;display: inline-block;font-weight:400\"><input type=\"checkbox\" ng-model=\"item.checked\">{{item.TaskName}}</label> </div> <div uib-accordion-group class=\"panel-default\" is-open=\"open3\"> <uib-accordion-heading>其他任务 <i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': open3, 'glyphicon-chevron-right': !open3}\"></i></uib-accordion-heading> <label ng-repeat=\"item in Tasks|filter:{BusinessType:3}:true\" style=\"font-size:14px;min-width:200px;display: inline-block;line-height:24px;font-weight:400\"><input type=\"checkbox\" ng-model=\"item.checked\">{{item.TaskName}}</label> </div> </uib-accordion> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr> <th style=\"width:150px\">序号</th> <th style=\"width:350px\">子任务名称</th> <th style=\"width:150px\">权重</th> <th></th> </tr> </thead> <tbody> <tr ng-repeat=\"item in Tasks|filter:{checked:true} as result track by item.Id\"> <td>{{$index+1}}</td> <td>{{item.defaultValue || item.TaskName}}</td> <td><input type=\"number\" ng-model=\"item._weight\" ng-init=\"item._weight=item._weight||result.length\" min=\"1\" max=\"99\" maxlength=\"2\" ng-model-options=\"{allowInvalid:true}\" ng-change=\"task.Weight = Math.floor(Math.abs(task.Weight)) || ''\" min=\"1\"></td> <td> <a ng-click=\"item.checked=false\" style=\"cursor:pointer\">删除</a> </td> </tr> </tbody> </table> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-primary\" type=\"button\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok()\">确认</button> <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">取消</button> </div>"
  );


  $templateCache.put('views/login.html',
    "<div class=\"l-back\"></div> <div class=\"l-box\"> <div class=\"l-logo pull-left\"> </div> <div class=\"l-lbox pull-right\"> <div class=\"text-center l-header\"> <img src=\"images/LOGO.png\" alt=\"\"> </div> <form> <md-input-container class=\"md-block\"> <label>用户名</label> <input ng-model=\"userName\"> </md-input-container> <br> <md-input-container class=\"md-block\"> <label>密码</label> <input type=\"password\" ng-model=\"password\"> </md-input-container> <div class=\"text-center\" style=\"margin-top: 12px\"> <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"login()\">登录</button> </div> </form> </div> </div> <div style=\"position:absolute;bottom:50px;right:50px\"> <div class=\"text-center\" style=\"font-size: 14px;color: #fff;line-height: 2em\">外勤APP下载</div> <div><img src=\"images/qr.png\" alt=\"外勤APP下载\"></div> </div>"
  );


  $templateCache.put('views/main.html',
    "<md-toolbar class=\"md-whiteframe-glow-z1 site-content-toolbar\" style=\"height: 45px\"> <div class=\"md-toolbar-tools\" md-colors=\"::{background: 'default-primary-50'}\" style=\"padding-left:0\"> <a class=\"headerlogo\" ui-sref=\"main.dashboard\"></a> <span style=\"margin: 0 12px\">{{title}}</span> <div style=\"position: absolute; right: 12px;font-size: 16px; top:6px;line-height: 34px\"> <span>欢迎您，{{user.RealName}}</span> <span class=\"btn btn-link pull-right\" ng-if=\"user.se\" style=\"color: #fff; text-align: right\" ng-click=\"logoutZY()\"><i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i>退出直营</span> <span class=\"btn btn-link pull-right\" ng-click=\"logout()\"><i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i>退出</span> </div> </div> </md-toolbar> <md-content flex layout=\"row\"> <md-sidenav class=\"site-sidenav md-sidenav-left md-whiteframe-z2\" md-is-locked-open=\"true\" layout=\"column\"> <ul class=\"docs-menu\" flex> <li ng-repeat=\"section in menu.sections\" class=\"parent-list-item {{section.className || ''}}\" ng-class=\"{'parentActive' : isSectionSelected(section)}\"> <menu-toggle section=\"section\" ng-if=\"section.type === 'toggle' && !section.hidden\"></menu-toggle> </li> </ul> </md-sidenav> <md-content flex class=\"o-body\" ui-view flex style=\"overflow: auto; padding: 12px\"> </md-content> </md-content>"
  );


  $templateCache.put('views/menu-link.tmpl.html',
    "<md-button ng-class=\"{'active' : isSelected()}\" ui-sref=\"{{section.router}}\" ng-click=\"selectPage(section)\"> <span aria-hidden=\"true\" class=\"md-toggle-icon\"><i class=\"fa\"></i></span> {{section.name}} <span class=\"md-visually-hidden\" ng-if=\"isSelected()\"> current page </span> </md-button>"
  );


  $templateCache.put('views/menu-toggle.tmpl.html',
    "<md-button class=\"md-button-toggle\" ng-click=\"toggle()\" aria-expanded=\"{{isOpen()}}\"> <div flex layout=\"row\"> <span aria-hidden=\"true\" class=\"md-toggle-icon\"> <i class=\"{{section.icon}}\" aria-hidden=\"true\"></i> </span> {{section.name}} </div> </md-button> <ul id=\"docs-menu-{{section.name | nospace}}\" class=\"menu-toggle-list\"> <li ng-repeat=\"page in section.pages\"> <menu-link section=\"page\"></menu-link> </li> </ul>"
  );


  $templateCache.put('views/order_addAgent.html',
    "<form name=\"orderForm\"> <md-content layout=\"column\" class=\"order md-padding\"> <md-card> <md-toolbar md-scroll-shrink ng-if=\"true\"> <div class=\"md-toolbar-tools\"> <h4>选择销售</h4></div> </md-toolbar> <md-card-content class=\"md-inline-form\"> <md-input-container layout=\"row\" style=\"margin: 0\"> <span class=\"md-label md-required\">销售</span> <md-select ng-disabled=\"postData.Orderid||isChange\" md-no-asterisk ng-model=\"postData.SalesId\" required aria-label=\"saler\" class=\"md-select\" ng-change=\"selectSalers()\"> <md-option ng-repeat=\"item in salers\" ng-disabled=\"item.disabled\" ng-value=\"item.UserId\">{{item.RealName}}</md-option> </md-select> </md-input-container> </md-card-content> </md-card> <md-card ng-if=\"cStep >= 0\"> <md-toolbar md-scroll-shrink ng-if=\"true\"> <div class=\"md-toolbar-tools\"> <h4>订单类型</h4></div> </md-toolbar> <md-card-content class=\"md-inline-form\"> <md-radio-group ng-model=\"postData.Category\"> <md-radio-button ng-disabled=\"orderid\" value=\"1\" class=\"md-primary\" ng-click=\"selectTypeStep(1)\">记账报税</md-radio-button> <md-radio-button ng-disabled=\"orderid\" value=\"2\" class=\"md-primary\" ng-click=\"selectTypeStep(2)\">公司注册+记账报税</md-radio-button> </md-radio-group> </md-card-content> </md-card> <md-card ng-if=\"cStep == 1\"> <md-toolbar md-scroll-shrink ng-if=\"true\"> <div class=\"md-toolbar-tools\"> <h4>选择客户</h4></div> </md-toolbar> <md-card-content class=\"md-inline-form\"> <md-radio-group ng-model=\"cType\"> <md-radio-button ng-value=\"1\" class=\"md-primary\" ng-click=\"selectCustomerStep(1)\">已有客户(CRM/签单客户)</md-radio-button> <md-radio-button ng-value=\"2\" class=\"md-primary\" ng-click=\"selectCustomerStep(2)\">新增客户</md-radio-button> </md-radio-group> </md-card-content> </md-card> <md-card ng-if=\"cStep > 1\"> <md-toolbar md-scroll-shrink> <div class=\"md-toolbar-tools\"> <h4>客户基本信息</h4></div> </md-toolbar> <md-card-content> <md-grid-list md-cols=\"2\" md-cols-md=\"2\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">公司名称</span> <input required flex required ng-model=\"postData.Customer.CompanyName\" aria-label=\"CompanyName\" ng-readonly=\"isRemind||isChange\"> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"postData.Category==1 || supp || postData.Status==2\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">公司地址</span> <input required flex required ng-model=\"postData.Customer.Address\" aria-label=\"Address\"> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"postData.Category==1 || supp || postData.Status==2\"> <md-input-container> <span class=\"md-label md-required\">所属行业</span> <md-select md-no-asterisk required ng-model=\"postData.Customer.IndustryId\" class=\"md-select\" required aria-label=\"IndustryId\"> <md-option ng-repeat=\"ind in industries\" ng-value=\"ind.IndustryId\">{{::ind.IndustryName}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container> <span class=\"md-label md-required\">企业类型</span> <md-select md-no-asterisk ng-disabled=\"supp||isChange || postData.IsChange\" ng-model=\"postData.Customer.AddedValue\" class=\"md-select\" ng-change=\"getPrice()\" required aria-label=\"AddedValue\"> <md-option ng-value=\"1\">小规模</md-option> <md-option ng-value=\"2\">一般纳税人</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">联系人</span> <input required flex ng-model=\"postData.Customer.Connector\" aria-label=\"Connector\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">联系电话</span> <input required flex ng-model=\"postData.Customer.Mobile\" aria-label=\"Mobile\"> </md-input-container> </md-grid-tile> </md-grid-list> </md-card-content> </md-card> <md-card ng-if=\"cStep > 1\"> <md-toolbar md-scroll-shrink> <div class=\"md-toolbar-tools\"> <h4>营业执照信息</h4></div> </md-toolbar> <md-card-content> <md-grid-list md-cols=\"2\" md-cols-md=\"2\" md-row-height=\"52px\"> <md-grid-tile ng-if=\"postData.Category==1 || supp || postData.Status==2\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">注册号</span> <input required ng-readonly=\"isRemind||isChange\" flex required ng-model=\"postData.Customer.RegNO\" aria-label=\"RegNO\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">法人</span> <input required ng-readonly=\"isRemind||isChange\" maxlength=\"10\" flex required ng-model=\"postData.Customer.LegalPerson\" aria-label=\"LegalPerson\"> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"postData.Category==2 || supp\"> <md-input-container> <div layout=\"row\"> <span class=\"md-label md-required\">法人身份证</span> <img ng-src=\"{{postData.Customer.PersonCardPath}}\" class=\"order-img\" alt=\"\" ng-if=\"postData.Customer.PersonCardPath\" pic-view> <span class=\"file-select btn btn-default\" ng-if=\"!supp\">选择文件 <input type=\"file\" nv-file-select=\"\" uploader=\"uploader1\" ng-show=\"!isReadOnly\"> </span> </div> <div class=\"progress\" style=\"width:80%\" ng-if=\"uploader2.isUploading\"> <md-progress-linear md-mode=\"determinate\" value=\"{{uploader2.progress}}\"></md-progress-linear> </div> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"postData.Category==1 || supp || postData.Status==2\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">国税登记号</span> <input required flex ng-model=\"postData.Customer.NationalTaxNO\" aria-label=\"NationalTaxNO\"> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"postData.Category==1 || supp || postData.Status==2\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">地税登记号</span> <input required flex ng-model=\"postData.Customer.LocalTaxNO\" aria-label=\"LocalTaxNO\"> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"postData.Category==1 || supp || postData.Status==2\"> <div layout=\"row\" style=\"width: 100%\"> <div style=\"width: 300px\"> <md-input-container layout=\"row\" style=\"padding-right: 0\"> <span class=\"md-label md-required\">营业期限</span> <md-datepicker required ng-model=\"postData.Customer.RegisterDate\" ng-model-options=\"timeoption\" md-current-view=\"year\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> </div> <div style=\"width: 320px\"> <md-input-container layout=\"row\" style=\"padding-right: 0\"> <span class=\"md-label\" style=\"min-width: 0\">至</span> <md-datepicker ng-model=\"postData.Customer.BusnissDeadline\" ng-disabled=\"postData.Customer.NoDeadLine\" md-current-view=\"year\" md-open-on-focus=\"true\"></md-datepicker> <md-checkbox ng-model=\"postData.Customer.NoDeadLine\" style=\"top: 6px;left: 6px\">无期限</md-checkbox> </md-input-container> </div> </div> </md-grid-tile> <md-grid-tile ng-if=\"postData.Category==1 || supp || postData.Status==2\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">注册资金</span> <input required flex ng-model=\"postData.Customer.RegisteredCapital\" aria-label=\"RegisteredCapital\"> </md-input-container> </md-grid-tile> <md-grid-tile md-rowspan=\"2\" ng-if=\"postData.Category==1 || supp\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">经营范围</span> <textarea name=\"\" flex ng-model=\"postData.Customer.BusinessScope\"></textarea> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"postData.Category==1 || supp || postData.Status==2\"> <md-input-container> <div layout=\"row\"> <span class=\"md-label md-required\">营业执照</span> <img ng-src=\"{{postData.Customer.BusinessLicense}}\" class=\"order-img\" alt=\"\" ng-if=\"postData.Customer.BusinessLicense\" pic-view> <span class=\"file-select btn btn-default\">选择文件 <input type=\"file\" nv-file-select=\"\" uploader=\"uploader2\"> </span> </div> <div class=\"progress\" style=\"width:80%\" ng-if=\"uploader2.isUploading\"> <md-progress-linear md-mode=\"determinate\" value=\"{{uploader2.progress}}\"></md-progress-linear> </div> </md-input-container> </md-grid-tile> </md-grid-list> </md-card-content> </md-card> <md-card ng-if=\"cStep > 1\"> <md-toolbar md-scroll-shrink> <div class=\"md-toolbar-tools\"> <h4>合同信息</h4></div> </md-toolbar> <md-card-content> <md-grid-list md-cols=\"2\" md-cols-md=\"2\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">合同编号</span> <input required flex required ng-model=\"postData.ContractNo\" aria-label=\"ContractNo\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">付款方式</span> <md-select md-no-asterisk ng-model=\"postData.PayType\" ng-disabled=\"supp || isChange\" class=\"md-select\" ng-change=\"getPrice();setEndDate();\" required> <md-option ng-value=\"3\">季付</md-option> <md-option ng-value=\"1\">半年付</md-option> <md-option ng-value=\"2\">年付</md-option> <md-option ng-value=\"4\">零税(半年)</md-option> <md-option ng-value=\"5\">零税(全年)</md-option> <md-option ng-if=\"user.SubsidiaryId == 12\" ng-value=\"6\">机构零票全年</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">支付方式</span> <md-select md-no-asterisk ng-model=\"postData.PayId\" class=\"md-select\" required> <md-option ng-repeat=\"pay in paymodes\" ng-value=\"pay.Id\">{{::pay.PayName}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">卡号</span> <input flex ng-model=\"otherData.AccountNum\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">礼包</span> <md-select md-no-asterisk ng-model=\"postData.GiftTypeId\" ng-disabled=\"supp|| isChange\" class=\"md-select\" ng-change=\"setEndDate()\"> <md-option ng-value=\"0\">不使用礼包</md-option> <md-option ng-repeat=\"gift in gifts\" ng-value=\"gift.Id\">{{gift.GiftTypeName}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">签订日期</span> <md-datepicker required ng-model=\"postData.ContractDate\" ng-model-options=\"timeoption\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"postData.Category==1 || supp || postData.Status==2\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">服务开始时间</span> <md-datepicker required ng-model=\"postData.ServiceStart\" ng-model-options=\"timeoption\" md-open-on-focus=\"true\" md-current-view=\"year\" formater=\"yyyy-MM\" md-min-view=\"year\" aria-label=\"ServiceStart\" md-max-date=\"maxDate\" ng-change=\"setEndDate()\"></md-datepicker> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"postData.Category==1 || supp || postData.Status==2\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">服务结束时间</span> <md-datepicker required ng-model=\"postData.ServiceEnd\" ng-model-options=\"timeoption\" md-open-on-focus=\"true\" md-current-view=\"year\" formater=\"yyyy-MM\" md-min-view=\"year\"></md-datepicker> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">合同金额</span> <input required required ng-model=\"postData.Amount\" md-current-view=\"year\" md-min-view=\"year\" aria-label=\"Amount\"> </md-input-container> </md-grid-tile> <md-grid-tile md-rowspan=\"2\"> <md-input-container layout=\"row\"> <span class=\"md-label\">备注</span> <textarea name=\"\" flex ng-model=\"postData.Remark\"></textarea> </md-input-container> </md-grid-tile> </md-grid-list></md-card-content> </md-card> <md-card ng-if=\"cStep > 1\"> <md-toolbar md-scroll-shrink> <div class=\"md-toolbar-tools\"> <h4>其他服务费用及代收费用</h4></div> </md-toolbar> <md-card-content> <md-grid-list md-cols=\"3\" md-cols-md=\"3\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">服务内容</span> <input flex ng-model=\"otherData.ServiceContent\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">服务费</span> <input flex ng-model=\"otherData.ServiceCharge\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">总金额</span> <input flex readonly ng-value=\"getAmount()\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile md-colspan=\"3\"> <div class=\"md-toolbar-tools\"> 服务费 </div> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">汇缴</span> <input flex ng-model=\"otherData.TaxPayment\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">年报</span> <input flex ng-model=\"otherData.AnnualReport\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">注册</span> <input flex ng-model=\"otherData.Register\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">变更</span> <input flex ng-model=\"otherData.Changes\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile md-colspan=\"2\"> </md-grid-tile> <md-grid-tile md-colspan=\"3\"> <div class=\"text-center md-toolbar-tools\" flex> 代收费 </div> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">银行开户</span> <input flex ng-model=\"otherData.OpenBank\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">税控</span> <input flex ng-model=\"otherData.NationLocalTax\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">刻章</span> <input flex ng-model=\"otherData.Prints\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">地址费用</span> <input flex ng-model=\"otherData.AddressCost\" type=\"number\"> </md-input-container> </md-grid-tile> </md-grid-list></md-card-content> </md-card> <div class=\"text-center\" ng-if=\"cStep > 1\"> <md-button class=\"md-raised md-primary\" ng-disabled=\"orderForm.$invalid || saving\" ng-click=\"save($event)\">保存</md-button> </div> </md-content> </form>"
  );


  $templateCache.put('views/order_change.html',
    "<div class=\"o-search well well-sm\"> <form class=\"form-inline\"> <md-grid-list md-cols=\"5\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">公司名称</span> <input flex ng-model=\"search.companyName\" aria-label=\"CompanyName\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container> <md-button class=\"md-raised md-primary\" ng-click=\"search()\">查询</md-button> </md-input-container> </md-grid-tile> </md-grid-list> </form> </div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>公司名称</th> <th>合同日期</th> <th>服务结束时间</th> <th>销售</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td>{{::customer.CompanyName}}</td> <td>{{::customer.ContractDate|tDate}}</td> <td>{{::customer.ServiceEnd.substr(0,7)}}</td> <td>{{::customer.RealName}}</td> <td class=\"table-opt\"><a href=\"javascript:;\" ng-click=\"open(customer)\">变更</a> </td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div>"
  );


  $templateCache.put('views/order_complete.html',
    "<div class=\"o-search well well-sm\"> <form class=\"form-inline\"> <md-grid-list md-cols=\"5\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">公司名称</span> <input flex ng-model=\"search.companyName\" aria-label=\"CompanyName\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container> <md-button class=\"md-raised md-primary\" ng-click=\"search()\">查询</md-button> </md-input-container> </md-grid-tile> </md-grid-list> </form> </div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>公司名称</th> <th>合同日期</th> <th>礼包</th> <th>销售</th> <th>提单日期</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td>{{::customer.CompanyName}}</td> <td>{{::customer.ContractDate|tDate}}</td> <td>{{::customer.GiftTypeName}}</td> <td>{{::customer.SalesName}}</td> <td>{{::customer.CreateDate|tDateTime}}</td> <td class=\"table-opt\"> <a href=\"javascript:;\" ng-click=\"open(customer)\">查看</a> <a href=\"javascript:;\" ng-click=\"delete(customer)\">删除</a> </td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div>"
  );


  $templateCache.put('views/order_contract_add.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">合同新建</h3> </div> <div class=\"modal-body\"> <div class=\"customer-info\"> <div class=\"title\">客户基本信息</div> <form name=\"customerform\" novalidate class=\"clearfix\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">甲方</label>： <input flex ng-model=\"customer.CompanyName\" required ng-disabled=\"canChange\" class=\"input-border\"> <span class=\"add-icon\" ng-click=\"selectCustomer()\">+</span> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">联系人</label>： <input flex ng-model=\"customer.Connector\" required ng-disabled=\"canChange\" class=\"input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">联系人电话</label>： <input flex ng-model=\"customer.Mobile\" required aria-label=\"Mobile\" ng-disabled=\"canChange\" class=\"input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">所属销售</label>： <input flex ng-model=\"customer.SaleName\" required readonly class=\"input-border\"> </div> </form> </div> <div class=\"contract-info\"> <div class=\"title\">合同信息</div> <div class=\"content\"> <form name=\"contractform\" novalidate class=\"clearfix\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">合同编号</label>： <input flex ng-model=\"postData.ContractNo\" required class=\"input-width1 input-border\" maxlength=\"20\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">合同类型</label>： <select ng-model=\"postData.OrderType\" class=\"input-border\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"(key,value) in contractType\" ng-value=\"key\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>合同期限</label>： <input flex ng-model=\"postData.OrderMonths\" placeholder=\"个月\" type=\"number\" class=\"input-width input-border\" ng-change=\"postData.OrderMonths = Math.floor(Math.abs(postData.OrderMonths)) || ''\" ng-model-options=\"{updateOn: 'blur'}\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>赠送礼包</label>： <input flex ng-model=\"postData.GiftMonth\" placeholder=\"个月\" type=\"number\" class=\"input-width input-border\" ng-change=\"postData.GiftMonth = Math.floor(Math.abs(postData.GiftMonth)) || ''\" ng-model-options=\"{updateOn: 'blur'}\"> </div> <div class=\"form-group col-md-4\" style=\"margin: 5px 10px 5px 10px;min-width:300px\"> <lable class=\"required\" style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">签订日期：</lable> <div class=\"col-md-8\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"yyyy/MM/dd\" ng-model=\"postData.ContractDate\" is-open=\"popup1.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" alt-input-formats=\"altInputFormats\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open1()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <table class=\"table table-hover table-bordered\"> <thead> <tr class=\"info\"> <th>项目</th> <th>子项目</th> <th>费用</th> <th style=\"width:200px\">操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"rg in rlist\"> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <select ng-model=\"rg.MainItemId\" ng-change=\"getcurProject(rg)\" class=\"input-border select-width\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"item in projectItems\" value=\"{{item.Id}}\">{{item.Name}}</option> </select> </td> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <select ng-model=\"rg.ChildItemId\" class=\"input-border select-width\"> <option ng-if=\"rg.MainItemId != 3 \" value=\"\" ng-selected=\"true\">请选择</option> <option ng-if=\"rg.MainItemId == 3 \" value=\"\" ng-selected=\"true\">空</option> <option ng-repeat=\"item in rg.contractprojectChildren\" value=\"{{item.Id}}\">{{item.Name}}</option> </select> </td> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <input class=\"select-width input-border\" type=\"number\" placeholder=\"￥:0.00\" ng-model=\"rg.Amount\" ng-blur=\"getAmount(rg)\"> </td> <td class=\"opt\"> <span ng-if=\"$index+1 == rlist.length\" ng-click=\"rlist.push({})\" style=\"color: blue\">添加</span> <span ng-if=\"$index>0 || rlist.length>1\" ng-click=\"delete($index)\">删除</span> </td> </tr> <tr> <td colspan=\"4\" style=\"height:34px;line-height: 20px; padding: 6px 12px\" class=\"clearfix\"> <div class=\"amount fl\"> <span>记账报税费用：</span> <span class=\"contract-inputWidth\">{{geteveryAmount(rlist)[0]}}</span> </div> <div class=\"amount fl\"> <span>财务服务费用：</span> <span class=\"contract-inputWidth\">{{geteveryAmount(rlist)[1]}}</span> </div> <div class=\"amount fl\"> <span>外勤服务费用：</span> <span class=\"contract-inputWidth\">{{geteveryAmount(rlist)[2]}}</span> </div> <div class=\"amount fl\"> <span>代收费用：</span> <span class=\"contract-inputWidth\">{{geteveryAmount(rlist)[3]}}</span> </div> <div class=\"amount fl\"> <span>合同总金额：</span> <span class=\"contract-inputWidth\" style=\"color: red\">{{reduce(rlist)}}</span> </div> </td> </tr> </tbody> </table> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>备注信息：</label> <textarea style=\"width:950px\" cols=\"100\" rows=\"3\" ng-model=\"postData.Remark\" maxlength=\"150\"></textarea> </div> </form> </div> </div> <div class=\"pay-info\"> <div class=\"title\">支付信息</div> <div class=\"content\"> <form name=\"payform\" novalidate class=\"clearfix\"> <div class=\"item clearfix\" ng-repeat=\"(pindex, pl) in paylist\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">支付方式</label>： <select ng-model=\"pl.PayTypeId\" class=\"input-border\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"(key,value) in payTypes\" ng-value=\"key\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\" ng-show=\"pl.payType != 5\"> <label class=\"required\">支付方账号</label>： <input flex ng-model=\"pl.PayAccountNo\" required class=\"input-border\" style=\"width: 200px\" ng-disabled=\"pl.PayTypeId == 5\"> </div> <div class=\"form-group col-md-3\" style=\"margin: 5px 10px 5px 10px\" ng-show=\"pl.payType != 5\"> <lable class=\"required\" style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">支付时间：</lable> <div class=\"col-md-8\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"yyyy/MM/dd\" ng-model=\"pl.PayTime\" is-open=\"pl.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"pl.opened = true\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px; display: flex; align-items: center\"> <label class=\"required img-bottom\">凭证</label>： <div style=\"display: inline-block\"> <img ng-src=\"{{pl.PayImagePath}}\" ng-if=\"pl.PayImagePath\" alt=\"\" pic-view class=\"contract-img-style\"> <div class=\"uploader-outter\">+ <input ng-click=\"imgClick(pindex)\" class=\"uploader-img\" type=\"file\" nv-file-select=\"\" uploader=\"uploader1[pindex]\" ng-show=\"!isReadOnly\"> </div> <div class=\"progress\" style=\"width:80%;margin-left:90px\" ng-if=\"uploader1[pindex].isUploading\"> <div class=\"progress-bar\" role=\"progressbar\" ng-style=\"{ 'width': uploader1[pindex].progress + '%' }\" style=\"width: 100%\"></div> </div> </div> </div> <div class=\"form-group pay-style\" style=\"margin: 5px 10px 5px 10px\"> <span ng-if=\"$index+1 == paylist.length\" ng-click=\"addClick($index);paylist.push({})\" style=\"color: blue\">添加</span> <span ng-if=\"$index>0 || paylist.length>1\" ng-click=\"delete2($index)\">删除</span> </div> </div> </form> </div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-primary\" type=\"button\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok($event)\">保存并提交</button> </div>"
  );


  $templateCache.put('views/order_contract_detail.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">合同查看/编辑</h3> </div> <div class=\"modal-body\"> <div class=\"contract-belong-info clearfix\"> <div class=\"title\"> <div class=\"fl belong-left\"> <span>合同归属信息</span> </div> <!-- 审单人员有此三个按钮操作权限  财务审核通过后，审核人员有终止操作  Category=7--> <div ng-if=\"(user.IsCenter == 0 && user.Category == 7) || (user.IsCenter == 0 && user.Category == 2)\" class=\"fr belong-right\"> <button class=\"btn\" type=\"button\" ng-disabled=\"!(postDetail.OrderStatus == 1)\" ng-click=\"check()\">审核</button> <button class=\"btn\" type=\"button\" ng-disabled=\"!(postDetail.OrderStatus == 1)\" ng-click=\"refuse()\">驳回</button> <button class=\"btn\" type=\"button\" ng-disabled=\"(postDetail.FinancialAudit == 2 && postDetail.OrderStatus == 8 || postDetail.OrderStatus == 7) ||  postDetail.FinancialAudit != 2\" ng-click=\"stop()\">中止</button> </div> </div> <form name=\"contractBelongform\" novalidate class=\"clearfix\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>所属公司</label>： <input flex ng-model=\"postDetail.SubsidiaryName\" required readonly class=\"input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>合同状态</label>： <input flex value=\"{{postDetail.OrderStatus|NewCheckStatus}}\" required readonly class=\"input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>财务状态</label>： <input flex value=\"{{postDetail.FinancialAudit|NewCheckStatus}}\" required readonly class=\"input-border\"> </div> </form> </div> <div class=\"customer-info\"> <div class=\"title\">客户基本信息</div> <form name=\"customerform\" novalidate class=\"clearfix\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">甲方</label>： <input flex ng-model=\"postDetail.CompanyName\" required ng-disabled=\"canChange\" class=\"input-border\"> <!-- <span class=\"add-icon\" ng-click=\"selectCustomer()\">+</span> --> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">联系人</label>： <input flex ng-model=\"postDetail.Connector\" required ng-disabled=\"canChange\" class=\"input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">联系人电话</label>： <input flex ng-model=\"postDetail.Mobile\" required ng-disabled=\"canChange\" class=\"input-border\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">所属销售</label>： <input flex ng-model=\"postDetail.SalesName\" required readonly class=\"input-border\"> </div> </form> </div> <div class=\"contract-info\"> <div class=\"title\">合同信息</div> <div class=\"content\"> <form name=\"contractform\" novalidate class=\"clearfix\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">合同编号</label>： <input flex ng-model=\"postDetail.ContractNo\" required ng-disabled=\"canChange\" class=\"input-width1 input-border\" maxlength=\"20\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">合同类型</label>： <select ng-model=\"postDetail.OrderType\" class=\"input-border\" ng-disabled=\"canChange\"> <option value=\"\">请选择</option> <option ng-repeat=\"(key,value) in contractType\" value=\"{{key}}\" ng-selected=\"postDetail.OrderType == key\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>合同期限</label>： <input flex ng-model=\"postDetail.OrderMonths\" placeholder=\"个月\" ng-disabled=\"canChange\" type=\"number\" class=\"input-width input-border\" ng-change=\"postDetail.OrderMonths = Math.floor(Math.abs(postDetail.OrderMonths)) || ''\" ng-model-options=\"{updateOn: 'blur'}\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>赠送礼包</label>： <input flex ng-model=\"postDetail.GiftMonth\" placeholder=\"个月\" ng-disabled=\"canChange\" type=\"number\" class=\"input-width input-border\" ng-change=\"postDetail.GiftMonth = Math.floor(Math.abs(postDetail.GiftMonth)) || ''\" ng-model-options=\"{updateOn: 'blur'}\"> </div> <div class=\"form-group col-md-4\" style=\"margin: 5px 10px 5px 10px;min-width:300px\"> <lable class=\"required\" style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">签订日期：</lable> <div class=\"col-md-8\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" ng-click=\"open1()\" ng-model=\"postDetail.ContractDate\" uib-datepicker-popup=\"yyyy-MM-dd\" ng-model=\"dt\" is-open=\"popup1.opened\" datepicker-options=\"dateOptions\" close-text=\"关闭\" alt-input-formats=\"altInputFormats\" style=\"padding:6px\" ng-disabled=\"canChange\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open1()\" ng-disabled=\"canChange\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <table class=\"table table-hover table-bordered\"> <thead> <tr class=\"info\"> <th>项目</th> <th>子项目</th> <th>费用</th> <th ng-if=\"!canChange\" style=\"width:200px\">操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"rg in rlist\"> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <select ng-model=\"rg.MainItemId\" ng-change=\"getcurProject($index)\" class=\"input-border select-width\" ng-disabled=\"canChange\"> <option value=\"\">请选择</option> <option ng-repeat=\"item in projectItems\" value=\"{{item.Id}}\" ng-selected=\"rg.MainItemId == item.Id\">{{item.Name}}</option> </select> </td> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <select ng-model=\"rg.ChildItemId\" class=\"input-border select-width\" ng-disabled=\"canChange\"> <option value=\"\">请选择</option> <option ng-repeat=\"item in rg.contractprojectChildOptions\" value=\"{{item.Id}}\" ng-selected=\"rg.ChildItemId == item.Id\">{{item.Name}}</option> </select> </td> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <input class=\"select-width input-border\" type=\"number\" placeholder=\"￥:0.00\" ng-model=\"rg.Amount\" ng-blur=\"getAmount(rg)\" ng-disabled=\"canChange\"> </td> <td ng-if=\"!canChange\" class=\"opt\"> <span ng-if=\"$index+1 == rlist.length\" ng-click=\"rlist.push({})\" style=\"color: blue\">添加</span> <span ng-if=\"$index>0 || rlist.length>1\" ng-click=\"delete($index)\">删除</span> </td> </tr> <tr> <td colspan=\"4\" style=\"height:34px;line-height: 20px; padding: 6px 12px\" class=\"clearfix\"> <div class=\"amount fl\"> <span>记账报税费用：</span> <span ng-if=\"canChange\" class=\"contract-inputWidth\">{{postDetail.BookKeepFeed}}</span> <span ng-if=\"!canChange\" class=\"contract-inputWidth\">{{geteveryAmount(rlist)[0]}}</span> </div> <div class=\"amount fl\"> <span>财务服务费用：</span> <span ng-if=\"canChange\" class=\"contract-inputWidth\">{{postDetail.FinanceServiceFeed}}</span> <span ng-if=\"!canChange\" class=\"contract-inputWidth\">{{geteveryAmount(rlist)[1]}}</span> </div> <div class=\"amount fl\"> <span>外勤服务费用：</span> <span ng-if=\"canChange\" class=\"contract-inputWidth\">{{postDetail.OutWorkServiceFeed}}</span> <span ng-if=\"!canChange\" class=\"contract-inputWidth\">{{geteveryAmount(rlist)[2]}}</span> </div> <div class=\"amount fl\"> <span>代收费用：</span> <span ng-if=\"canChange\" class=\"contract-inputWidth\">{{postDetail.AgentFeed}}</span> <span ng-if=\"!canChange\" class=\"contract-inputWidth\">{{geteveryAmount(rlist)[3]}}</span> </div> <div class=\"amount fl\"> <span>合同总金额：</span> <span ng-if=\"canChange\" class=\"contract-inputWidth\">{{postDetail.Amount}}</span> <span ng-if=\"!canChange\" class=\"contract-inputWidth\" style=\"color: red\">{{reduce(rlist)}}</span> </div> </td> </tr> </tbody> </table> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>备注信息：</label> <div class=\"remark-style\"> <span>{{postDetail.Remark}}</span> <textarea class=\"textarea-style\" cols=\"100\" rows=\"3\" ng-model=\"remark\" ng-disabled=\"canChange\" maxlength=\"150\"></textarea> </div> </div> </form> </div> </div> <div class=\"pay-info\"> <div class=\"title\">支付信息</div> <div class=\"content\"> <form name=\"payform\" novalidate class=\"clearfix\"> <div class=\"item clearfix\" ng-repeat=\"(pindex, pl) in paylist\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">支付方式</label>： <select ng-model=\"pl.PayTypeId\" class=\"input-border\" ng-disabled=\"canChange\"> <option value=\"\">请选择</option> <option ng-repeat=\"(key,value) in payTypes\" value=\"{{key}}\" ng-selected=\"pl.PayTypeId == key\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">支付方账号</label>： <input flex ng-model=\"pl.PayAccountNo\" required class=\"input-border\" ng-disabled=\"canChange || pl.PayTypeId == 5\" style=\"width:200px\"> </div> <div class=\"form-group col-md-3\" style=\"margin: 5px 10px 5px 10px\"> <lable class=\"required\" style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">支付时间：</lable> <div class=\"col-md-8\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"yyyy/MM/dd\" ng-model=\"pl.PayTime\" is-open=\"pl.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" style=\"padding:6px\" ng-disabled=\"canChange\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"pl.opened = true\" ng-disabled=\"canChange\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px; display: flex; align-items: center\"> <label class=\"required img-bottom\">凭证</label>： <div ng-if=\"canChange\" style=\"display: inline-block\"> <img ng-src=\"{{pl.PayImagePath}}\" class=\"contract-img\" pic-view> </div> <div ng-if=\"!canChange\" style=\"display: inline-block\"> <img ng-src=\"{{pl.PayImagePath}}\" ng-if=\"pl.PayImagePath\" alt=\"\" pic-view class=\"contract-img-style\"> <div class=\"uploader-outter\">+ <input ng-click=\"imgClick(pindex)\" class=\"uploader-img\" type=\"file\" nv-file-select=\"\" uploader=\"uploader1[pindex]\"> </div> <div class=\"progress\" style=\"width:80%;margin-left:90px\" ng-if=\"uploader1[pindex].isUploading\"> <div class=\"progress-bar\" role=\"progressbar\" ng-style=\"{ 'width': uploader1[pindex].progress + '%' }\" style=\"width: 100%\"></div> </div> </div> </div> <div ng-if=\"!canChange\" class=\"form-group pay-style\" style=\"margin: 5px 10px 5px 10px\"> <span ng-if=\"$index+1 == paylist.length\" ng-click=\"addClick($index);paylist.push({})\" style=\"color: blue\">添加</span> <span ng-if=\"$index>0 || paylist.length>1\" ng-click=\"delete2($index)\">删除</span> </div> </div> </form> </div> </div> </div> <!-- 提单人员有修改和保存提交订单的权限  Category == 5 2总经理--> <div ng-if=\"(user.IsCenter == 0 && user.Category == 2) || (user.IsCenter == 0 && user.Category == 5)\" class=\"modal-footer\"> <!-- <div class=\"modal-footer\"> --> <button ng-if=\"(postDetail.OrderStatus == 1 && !canSave ) || (postDetail.OrderStatus == 3 && !canSave)\" class=\"btn btn-primary\" type=\"button\" ng-click=\"canCompile()\">编辑</button> <button ng-if=\"canSave\" class=\"btn btn-primary\" type=\"button\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok($event)\">保存并提交</button> </div>"
  );


  $templateCache.put('views/order_list.html',
    "<div class=\"o-search well well-sm\"> <form class=\"form-inline\"> <md-grid-list md-cols=\"5\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">开始日期</span> <md-datepicker ng-model=\"search.startdate\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">结束日期</span> <md-datepicker ng-model=\"search.enddate\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">公司名称</span> <input flex ng-model=\"search.companyName\" aria-label=\"CompanyName\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">付款方式</span> <md-select md-no-asterisk ng-model=\"search.PayType\" class=\"md-select\"> <md-option ng-value=\"0\" ng-selected=\"true\">全部</md-option> <md-option ng-value=\"3\">季付</md-option> <md-option ng-value=\"1\">半年付</md-option> <md-option ng-value=\"2\">年付</md-option> <md-option ng-value=\"4\">零税(半年)</md-option> <md-option ng-value=\"5\">零税(全年)</md-option> <md-option ng-if=\"user.SubsidiaryId == 12\" ng-value=\"6\">机构零票全年</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container> <span class=\"md-label\">企业类型</span> <md-select md-no-asterisk ng-model=\"search.AddedValue\" class=\"md-select\"> <md-option ng-value=\"0\" ng-selected=\"true\">全部</md-option> <md-option ng-value=\"1\">小规模</md-option> <md-option ng-value=\"2\">一般纳税人</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container> <md-button class=\"md-raised md-primary\" ng-click=\"search()\">查询</md-button> </md-input-container> </md-grid-tile> </md-grid-list> </form> </div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>公司名称</th> <th>订单类型</th> <th>合同日期</th> <th>礼包</th> <th>销售</th> <th>提单日期</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td>{{::customer.CompanyName}}<span style=\"color:red\" ng-if=\"customer.IsChange\">(已变更)</span><span style=\"color:red\" ng-if=\"customer.FreChangeOrderId\">(产品变更)</span></td> <td>{{::customer.Category|orderCategory}}</td> <td>{{::customer.ContractDate|tDate}}</td> <td>{{::customer.GiftTypeName}}</td> <td>{{::customer.SalesName}}</td> <td>{{::customer.CreateDate|tDateTime}}</td> <td class=\"table-opt\"> <a ng-if=\"customer.FreChangeOrderId\" href=\"javascript:;\" ng-click=\"openOri(customer.FreChangeOrderId)\">查看原合同</a> <a ng-if=\"customer.Stauts !=1\" href=\"javascript:;\" ng-click=\"open(customer)\">查看/修改</a> <a ng-if=\"customer.Stauts ==1\" href=\"javascript:;\" ng-click=\"open(customer)\">补充</a> <a href=\"javascript:;\" ng-click=\"delete(customer)\">删除</a> </td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div>"
  );


  $templateCache.put('views/order_outworker.html',
    "<div class=\"recharge\"> <div class=\"well well-sm u-search\"> <form class=\"form-inline\" style=\"position:relative;padding-right:150px\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>序列ID</label>： <input type=\"text\" ng-model=\"search.Id\" class=\"form-control\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>公司名称</label>： <input type=\"text\" ng-model=\"search.companyname\" class=\"form-control\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>公司联系人</label>： <input type=\"text\" ng-model=\"search.connector\" class=\"form-control\"> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>任务名称</label>： <select ng-model=\"search.taskname\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"task in Tasks\" ng-value=\"task.CommonTaskId\">{{task.CommonTaskName}}</option> <option ng-value=\"0\">其他</option> <!--需要改数据--> </select> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>当前子任务</label>： <select ng-model=\"search.childtaskname\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"outT in outTasks\" ng-value=\"outT.Id\">{{outT.TaskName}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>当前外勤人员</label>： <select ng-model=\"search.currOutworker\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"ot in outworkers\" ng-value=\"{{ot.UserId}}\">{{ot.RealName}}</option> <!--需要改数据--> </select> </div> <!--日期--> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px;min-width:300px\"> <lable style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">任务提交日期：</lable> <div class=\"row\" style=\"float:left\"> <div class=\"col-md-6\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"{{format}}\" ng-model=\"dt1\" is-open=\"popup1.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" alt-input-formats=\"altInputFormats\" ng-change=\"changeDate()\" id=\"date1\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open1()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> <div class=\"col-md-6\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup ng-model=\"dt2\" is-open=\"popup2.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" ng-change=\"changeDate()\" id=\"date2\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open2()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>所属区（县）</label>： <select ng-model=\"search.areacode\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"area in areas\" ng-value=\"area.AreaCode\">{{area.AreaName}}</option> <!--需要改数据--> </select> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>销售人员</label>： <select ng-model=\"search.salesId\" class=\"form-control\"> <option value=\"0\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"u in users\" ng-value=\"u.UserId\">{{u.RealName}}</option> <!--需要改--> </select> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>子任务状态</label>： <select ng-model=\"search.taskstatus\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"(key,value) in taskStatus\" ng-value=\"key\">{{value}}</option> <!--需要改--> </select> </div> <!--<div class=\"form-group\">\n" +
    "                <a href=\"\">导出Excel表格</a>\n" +
    "            </div>--> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"searchFn()\" style=\"position:absolute;right:20px;top:5px;width:110px\">搜索</button> <button class=\"btn btn-primary pull-right\" ng-click=\"open()\" style=\"position:absolute;right:20px;top:50px\" ng-if=\"user.Category ==2 || user.Category==8 || user.Category==5\">新增外勤任务</button> </form> </div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr class=\"info\"> <th>序列ID</th> <th>任务名称</th> <th>公司名称</th> <th>所属区域</th> <th>公司联系人</th> <th>销售人员</th> <!--<th>联系人电话</th>--> <th>当前子任务</th> <th>当前外勤人员</th> <th>提交任务时间</th> <th>子任务状态</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td style=\"text-align:center\">{{customer.Id}}</td> <td style=\"text-align:center\">{{customer.MainTaskName}}</td> <td style=\"text-align:center\">{{customer.CompanyName}}</td> <td style=\"text-align:center\">{{customer.AreaName}}</td> <td style=\"text-align:center\">{{customer.Connector}}</td> <td style=\"text-align:center\">{{customer.SalesName}}</td> <td style=\"text-align:center\">{{customer.childTaskName}}</td> <td style=\"text-align:center\">{{customer.OutWorkerName}}</td> <td style=\"text-align:center\">{{customer.SubmitTaskTime.replace(\"T\",\" \")}}</td> <td style=\"text-align:center\">{{customer.Status|outWorkStatus}}</td> <td class=\"table-opt\" style=\"text-align:center\"><button class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"detail(customer)\">查看详情</button> <button class=\"btn btn-link\" href=\"javascript:;\" ng-show=\"user.Category ==2 || user.Category==8\" ng-disabled=\"customer.Status>3\" ng-click=\"delete(customer)\">取消</button></td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> &nbsp; <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" ng class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div> </div>"
  );


  $templateCache.put('views/order_outworker_add.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">添加外勤任务</h3> </div> <div class=\"modal-body\"> <form name=\"cusform\" novalidate> <div class=\"well well-sm\" style=\"min-height: 200px\"> <uib-accordion close-others=\"true\"> <div uib-accordion-group class=\"panel-default\" close-others=\"true\" is-open=\"open1\" is-disabled=\"tbIsDisable()\"> <uib-accordion-heading> 通办任务 <i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': accordion.open1, 'glyphicon-chevron-right': !accordion.open1}\"></i> </uib-accordion-heading> <div ng-repeat=\"task in tasksArr\" style=\"width:100%;min-height:50px;margin:2px;background:#eee;max-height:280px\"> <p> <lable style=\"width:100%;font-size:16px\"><input type=\"checkbox\" name=\"commonTask\" ng-model=\"task.checked\" ng-change=\"checkTB(task)\" ng-value=\"true\">&nbsp;&nbsp;&nbsp;{{task.CommonTaskName}}</lable> </p> <ul style=\"padding-left:20px;min-height:40px;display: inline-block\"> <li style=\"float:left;margin-right:12px;height:18px;list-style:none\" ng-repeat=\"item in task.TaskList\"> {{$index+1}}.{{item.TaskName}} </li> </ul> </div> </div> <div uib-accordion-group class=\"panel-default\" close-others=\"true\" is-open=\"open2\" is-disabled=\"otherIsDisable()\"> <uib-accordion-heading> 其他 <i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': accordion.open2, 'glyphicon-chevron-right': !accordion.open2}\"></i> </uib-accordion-heading> <uib-accordion close-others=\"false\"> <div uib-accordion-group ng-repeat=\"tg in tasks\" class=\"panel-default\" is-open=\"true\"> <uib-accordion-heading> {{::tg.Name}}任务 </uib-accordion-heading> <label style=\"margin:6px 30px 6px 0;font-size:16px;display:inline-block\" ng-repeat=\"task in tg.list\"><input type=\"checkbox\" ng-model=\"task.selected\">{{::task.TaskName}}</label> </div> </uib-accordion> </div> </uib-accordion> </div> <div class=\"well well-sm u-search form-inline clearfix\"> <div ng-if=\"!isShow\" class=\"form-group col-md-12\"> <label class=\"required\">选择公司</label>： <input flex ng-value=\"postData.Customer.CompanyName || postData.Customer.Connector\" required ng-disabled=\"cus_selected\" aria-label=\"CompanyName\" ng-click=\"selectCustomer()\" readonly class=\"form-control\"> </div> <div ng-if=\"!isShow\" class=\"form-group col-md-12\" style=\"margin-top:20px\"> <label class=\"required\">选择区域</label>： <select ng-model=\"postData.areaSele\" class=\"form-control\" required value=\"0\" required> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"area in areaArr\" ng-value=\"area.AreaCode\">{{area.AreaName}}</option> </select> </div> <div class=\"form-group col-md-12\" style=\"margin: 12px 0\"> <label>备注</label>： <textarea name=\"\" flex ng-model=\"postData.Remark\" maxlength=\"400\" style=\"width: 100%;height: 100px\"></textarea> </div> </div> </form> </div> <div class=\"modal-footer\"> <button class=\"btn btn-primary\" type=\"button\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok($event)\">保存</button> <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">关闭</button> </div>  "
  );


  $templateCache.put('views/order_outworker_detail.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">任务详情</h3> <div ng-if=\"(user.IsCenter == 0 && user.Category == 8) || (user.IsCenter == 0 && user.Category == 2)\" ng-if=\"ifSub\" style=\"display:inline;float:right\"> <button ng-if=\"(user.IsCenter == 0 && user.Category == 8) || (user.IsCenter == 0 && user.Category == 2)\" class=\"btn btn-warning\" type=\"button\" ng-click=\"sub()\" ng-disabled=\"isSub(customer)\">提交会计</button> <div ng-if=\"item.Remark\" class=\"hover-remark\"></div> <!-- <button ng-if=\"item.Remark\" uib-popover=\"{{item.Remark}}\" popover-title=\"备注\" type=\"button\" class=\"btn btn-default\" >\n" +
    "          <span class=\"glyphicon glyphicon-envelope\" ></span>\n" +
    "        </button> --> </div> </div> <div class=\"modal-body\"> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr class=\"info\"> <!--<th style=\"width: 40px;\" ng-show=\"batIsOpen\"></th>--> <th ng-show=\"user.Category ==2 || user.Category==8\">选择</th> <th>序列ID</th> <th>子任务名称</th> <th>当前外勤人员</th> <th>开始时间</th> <th>完成时间</th> <th style=\"width:70px\">状态</th> <th style=\"width:230px\">操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers track by customer.TaskId\"> <td ng-show=\"user.Category ==2 || user.Category==8\"><input type=\"checkbox\" ng-model=\"customer.selected\" ng-disabled=\"customer.Status>3\" style=\"vertical-align: top; width:16px;height:16px\"></td> <td>{{customer.Id}}</td> <td>{{customer.TaskName}}</td> <td>{{customer.OutWorkerName}}</td> <td>{{customer.StartTime|tDateTime}}</td> <td>{{customer.EndTime|tDateTime}}</td> <td>{{customer.Status|outWorkStatus}}</td> <td><button class=\"btn btn-link\" ng-click=\"editCompany(customer)\" ng-if=\"user.Category ==2 || user.Category==8 || customer.OutWorkerId == user.UserId\" ng-disabled=\"(user.Category ==2 || user.Category==8)? false :customer.Status != 3\">编辑</button> <button class=\"btn btn-link\" ng-click=\"statusChange(customer,3,'确认资料')\" ng-if=\"user.Category ==2 || user.Category==8 || customer.OutWorkerId == user.UserId\" ng-disabled=\"customer.Status!==2\">确认资料</button> <button class=\"btn btn-link\" ng-click=\"statusChange(customer,5,'完成')\" ng-if=\"user.Category ==2 || user.Category==8 || customer.OutWorkerId == user.UserId\" ng-disabled=\"customer.Status!==3\">完成</button> <button class=\"btn btn-link\" ng-click=\"forward(customer)\" ng-if=\"user.Category ==2 || user.Category==8\" ng-disabled=\"customer.Status>3\">转接任务</button> <button class=\"btn btn-link\" ng-click=\"statusChange(customer,4,'取消任务')\" ng-if=\"user.Category ==2 || user.Category==8\" ng-disabled=\"customer.Status>3\">取消</button></td> </tr> </tbody> </table> <lable ng-if=\"user.Category ==2 || user.Category==8\"><input type=\"checkbox\" style=\"vertical-align: top; width:16px;height:16px\" ng-model=\"forwards.isSelectAll\" ng-change=\"selectAll()\">全选</lable> <select ng-change=\"forwardAll()\" ng-model=\"forwards.forwardUserId\" ng-if=\"user.Category ==2 || user.Category==8\"> <option selected value=\"0\">任务批量分配</option> <option ng-repeat=\"ot in outworkers\" value=\"{{::ot.UserId}}\">{{::ot.RealName}}</option> </select> </div> <div class=\"modal-footer\"> <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">关闭</button> </div>"
  );


  $templateCache.put('views/order_outworker_detail_sub.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"close()\">&times;</span> <!-- <h3 class=\"modal-title\">外勤提交会计</h3> --> <h3 class=\"modal-title\">{{title}}</h3> </div> <div class=\"modal-body\"> <label for=\"\" style=\"display:block\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type=\"radio\" name=\"art\" value=\"0\" ng-model=\"partT\" ng-click=\"_partT = false\" ng-disabled=\"isSecondAccount\"> <span style=\"display:inline-block;width:80%;height:80px;line-height:80px;padding-left:20px;border:1px dashed black\">资料齐全，提交会计审核</span> </label> <label for=\"\" style=\"display:block\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type=\"radio\" name=\"art\" value=\"\" ng-checked=\"_partT\" style=\"position:relative;top:-20px\" ng-disabled=\"isSecondAccount\"> <span style=\"display:inline-block;width:80%;height:85px;line-height:40px;padding-left:20px;border:1px dashed black;position: relative;\n" +
    "    left: -4px\">部分税务报道<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label for=\"\"> <input type=\"radio\" name=\"art_sub\" value=\"1\" ng-model=\"partT\" ng-click=\"_partT = true\" ng-disabled=\"isSecondAccount\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;国税报道完毕 </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label for=\"\"> <input type=\"radio\" name=\"art_sub\" value=\"2\" ng-model=\"partT\" ng-click=\"_partT = true\" ng-disabled=\"isSecondAccount\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地税报道完毕 </label> </span> </label> </div> <div class=\"modal-footer\"> <button class=\"btn btn-warning\" type=\"button\" ng-click=\"sub()\" ng-disabled=\"dis()\">提交</button> </div>"
  );


  $templateCache.put('views/order_remind.html',
    "<div class=\"o-search well well-sm\"> <form class=\"form-inline\"> <md-grid-list md-cols=\"5\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">到期期限</span> <md-select md-no-asterisk ng-model=\"search.month\" required aria-label=\"CustomerType\" class=\"md-select\"> <md-option ng-value=\"1\" selected>一个月内</md-option> <md-option ng-value=\"2\">两个月内</md-option> <md-option ng-value=\"3\">三个月内</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container> <md-button class=\"md-raised md-primary\" ng-click=\"search()\">查询</md-button> </md-input-container> </md-grid-tile> </md-grid-list> </form> </div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>公司名称</th> <th>联系人</th> <th>联系人电话</th> <th>销售</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td>{{::customer.CompanyName}}</td> <td>{{::customer.Connector}}</td> <td>{{::customer.Mobile}}</td> <td>{{::customer.SaleName}}</td> <td class=\"table-opt\"><a href=\"javascript:;\" ng-click=\"open(customer)\">续费</a> </td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div>"
  );


  $templateCache.put('views/order_statement.html',
    "<div class=\"o-search well well-sm\"> <form class=\"form-inline\"> <md-grid-list md-cols=\"1\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">时间范围</span> <md-datepicker ng-model=\"search.start\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> <md-input-container layout=\"row\"> <span style=\"line-height: 36px\">至</span> <md-datepicker ng-model=\"search.end\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> <md-input-container> <md-button class=\"md-raised md-primary\" ng-click=\"search()\">查询</md-button> <md-button class=\"md-raised md-primary\" ng-click=\"add()\">添加</md-button> </md-input-container> </md-grid-tile> </md-grid-list> </form> </div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>日期</th> <th>客户名称</th> <th>服务内容</th> <th>支付方式</th> <th>卡号</th> <th>员工</th> <th>收费总金额</th> <th>记账报税</th> <th>服务费</th> <th>汇缴</th> <th>年报</th> <th>注册</th> <th>银行开户</th> <th>国地税报道</th> <th>刻章</th> <th>地址费用</th> <th>变更</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td>{{::customer.BillTime|tDate}}</td> <td>{{::customer.CompanyName}}</td> <td>{{::customer.ServiceContent}}</td> <td>{{::customer.PayName}}</td> <td>{{::customer.AccountNum}}</td> <td>{{::customer.SaleName}}</td> <td>{{::customer.SumAccount}}</td> <td>{{::customer.AccountsTax}}</td> <td>{{::customer.ServiceCharge}}</td> <td>{{::customer.TaxPayment}}</td> <td>{{::customer.AnnualReport}}</td> <td>{{::customer.Register}}</td> <td>{{::customer.OpenBank}}</td> <td>{{::customer.NationLocalTax}}</td> <td>{{::customer.Prints}}</td> <td>{{::customer.AddressCost}}</td> <td>{{::customer.Change}}</td> <td><a href=\"javascript:;\" ng-if=\"!customer.AccountsTax\" ng-click=\"delete(customer)\">删除</a></td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div>"
  );


  $templateCache.put('views/order_statement_add.html',
    "<md-dialog class=\"md-dialog-lg order_statement_add\"> <form name=\"cusform\" novalidate> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>增加对账单</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1 md-padding\" style=\"overflow: auto\"> <md-grid-list md-cols=\"2\" md-cols-md=\"2\" md-row-height=\"52px\"> <md-grid-tile md-colspan=\"2\"> <md-input-container layout=\"row\"> <span class=\"md-label\">订单时间</span> <md-datepicker ng-model=\"postData.BillTime\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">客户</span> <input required ng-click=\"select()\" readonly ng-disabled=\"customer.Id\" flex ng-model=\"postData.CustomerName\"> </md-input-container> <md-button ng-click=\"select()\" class=\"md-primary md-raised\" ng-if=\"!customer.Id\">选择客户</md-button> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">销售</span> <md-select md-no-asterisk ng-model=\"postData.SalesId\" required class=\"md-select\"> <md-option ng-repeat=\"item in salers\" ng-value=\"item.UserId\">{{item.RealName}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">服务内容</span> <input required flex ng-model=\"postData.ServiceContent\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">收款方式</span> <md-select md-no-asterisk ng-model=\"postData.PayId\" class=\"md-select\" required> <md-option ng-repeat=\"pay in paymodes\" ng-value=\"pay.Id\">{{::pay.PayName}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">卡号</span> <input flex ng-model=\"postData.AccountNum\" type=\"text\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">服务费</span> <input flex ng-model=\"postData.ServiceCharge\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">汇缴</span> <input flex ng-model=\"postData.TaxPayment\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">年报</span> <input flex ng-model=\"postData.AnnualReport\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">注册</span> <input flex ng-model=\"postData.Register\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">银行开户</span> <input flex ng-model=\"postData.OpenBank\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">国地税报道</span> <input flex ng-model=\"postData.NationLocalTax\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">刻章</span> <input flex ng-model=\"postData.Prints\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">地址费用</span> <input flex ng-model=\"postData.AddressCost\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">变更</span> <input flex ng-model=\"postData.Change\" type=\"number\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">总金额</span> <input flex readonly ng-model=\"postData.SumAccount\" ng-value=\"getAmount()\" type=\"number\"> </md-input-container> </md-grid-tile> </md-grid-list></md-dialog-content> <md-dialog-actions layout=\"row\" md-colors=\"::{background: 'default-primary-100'}\"> <span flex></span> <md-button class=\"md-raised md-primary\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok($event)\">保存</md-button> <md-button ng-click=\"cancel()\">取消</md-button> </md-dialog-actions> </form> </md-dialog>"
  );


  $templateCache.put('views/order_view.html',
    "<md-dialog style=\"width: 100%\"> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>查看订单</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1 md-padding\" style=\"overflow: auto\"> <form name=\"orderForm\"> <div ng-include=\"'views/order_addAgent.html'\" ng-controller=\"OrderAddAgent\"></div> </form> </md-dialog-content> <md-dialog-actions layout=\"row\" md-colors=\"::{background: 'default-primary-100'}\"> <span flex></span> <md-button ng-click=\"cancel()\">取消</md-button> </md-dialog-actions> </md-dialog>"
  );


  $templateCache.put('views/outwork_dict.html',
    "<div class=\"recharge\"> <div class=\"well well-sm u-search clearfix\"> <div class=\"pull-left\" style=\"margin: 12px 0\"> <label for=\"subtask_search\">子任务名称 ：</label> <input type=\"text\" ng-model=\"search.TaskName\" id=\"subtask_search\"> </div> <div class=\"pull-left\" style=\"margin: 12px 10px 0\"> <label for=\"\">分类名称：</label> <select ng-model=\"search.BusinessType\" style=\"height:26px;width:80px\"> <option value=\"\" selected>请选择</option> <option value=\"1\" ng-selected=\"searchData.BusinessType =='1'\">税务任务</option> <option value=\"2\" ng-selected=\"searchData.BusinessType =='2'\">工商任务</option> <option value=\"3\" ng-selected=\"searchData.BusinessType =='3'\">其他任务</option> </select> </div> <div class=\"pull-left\" style=\"margin: 12px 10px 0\"> <label for=\"\">状态：</label> <select ng-model=\"search.Status\" style=\"height:26px;width:80px\"> <option value=\"0\" selected>请选择</option> <option value=\"1\">启用</option> <option value=\"2\">停用</option> </select> </div> <button class=\"btn btn-primary pull-right\" ng-click=\"open()\" style=\"margin:12px 20px 0\">&nbsp;&nbsp;&nbsp;新增&nbsp;&nbsp;&nbsp;</button> <button class=\"btn btn-primary pull-right\" ng-click=\"searchFn()\" style=\"margin:12px 0\">&nbsp;&nbsp;&nbsp;搜索&nbsp;&nbsp;&nbsp;</button> </div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr class=\"info\"> <th>序列ID</th> <th>子任务名称</th> <th>分类名称</th> <th>操作时间</th> <th>服务费用</th> <th>状态</th> <th>最后操作</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"outworker in outworkers\"> <td style=\"text-align:center\">{{outworker.Id}}</td> <td style=\"text-align:center\">{{outworker.TaskName}}</td> <td style=\"text-align:center\">{{outworker.BusinessType|fOtType}}</td> <td style=\"text-align:center\">{{outworker.ModifyDate.replace(\"T\",\" \")}}</td> <td style=\"text-align:center\">￥：{{outworker.Price.toFixed(2)}}</td> <td style=\"text-align:center\">{{outworker.Status==1?\"启用\":\"停用\"}}</td> <td style=\"text-align:center\">{{outworker.RealName}}</td> <td class=\"table-opt\" style=\"text-align:center\"> &nbsp;<a href=\"javascript:;\" ng-click=\"open(outworker)\">编辑</a>&nbsp;&nbsp;&nbsp; <a href=\"javascript:;\" ng-click=\"stopOrnot(outworker.Status,outworker.Id)\">{{outworker.Status==2?\"启用\":\"停用\"}}</a> </td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div> </div>"
  );


  $templateCache.put('views/outwork_dict_view.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">{{::title}}</h3> </div> <div class=\"modal-body\"> <form name=\"cusform\" novalidate class=\"form-inline\"> <div class=\"clearfix\" style=\"width:80%\"> <div class=\"form-group col-md-12\" style=\"margin: 12px 0\"> <label for=\"\" class=\"required\">任务名称</label> <input type=\"text\" class=\"form-control\" ng-model=\"postData.TaskName\" required style=\"width:300px\" maxlength=\"15\"> </div> <div class=\"form-group col-md-12\" style=\"margin: 12px 0\"> <label for=\"\" class=\"required\">分类名称</label> <select ng-model=\"postData.BusinessType\" class=\"form-control\" required style=\"width:200px\"> <option value=\"\">请选择</option> <option ng-value=\"1\" ng-selected=\"postData.BusinessType ==1\">税务任务</option> <option ng-value=\"2\" ng-selected=\"postData.BusinessType ==2\">工商任务</option> <option ng-value=\"3\" ng-selected=\"postData.BusinessType ==3\">其他任务</option> </select> </div> <div class=\"form-group col-md-12\" style=\"margin: 12px 0\"> <label for=\"\" class=\"required\">服务费用</label> <input type=\"number\" class=\"form-control\" ng-model=\"postData.Price\" required placeholder=\"0\" min=\"0\" ng-input=\"checkPrice()\"> </div> <div class=\"form-group col-md-12\" style=\"margin: 12px 0\"> 是否启用：<lable style=\"margin:0 30px;display:inline-block\"><input type=\"radio\" name=\"ifuse\" value=\"1\" ng-model=\"postData.ifuse.use\">启用</lable> <lable style=\"margin:0 30px;display:inline-block\"><input type=\"radio\" name=\"ifuse\" value=\"2\" ng-model=\"postData.ifuse.use\">停用</lable> </div> </div> </form> </div> <div class=\"modal-footer\"> <button class=\"btn btn-primary\" type=\"button\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok()\">保存</button> <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">关闭</button> </div>"
  );


  $templateCache.put('views/outwork_manage.html',
    "<div class=\"recharge\"> <div class=\"well well-sm u-search\" style=\"min-height: 146px\"> <form class=\"form-inline\" style=\"position:relative;padding-right:50px\"> <div class=\"form-group\" style=\"margin: 5px;float:none\"> <label>序列ID</label>： <input type=\"text\" ng-model=\"search.sequenceNo\" class=\"form-control\" style=\"width: 100px\"> </div> <div class=\"form-group\" style=\"margin: 5px;float:none\"> <label>公司名称</label>： <input type=\"text\" ng-model=\"search.companyname\" class=\"form-control\"> </div> <div class=\"form-group\" style=\"margin: 5px;float:none\"> <label>公司联系人</label>： <input type=\"text\" ng-model=\"search.connector\" class=\"form-control\" style=\"width: 100px\"> </div> <div class=\"form-group\" style=\"margin: 5px;float:none\"> <label>任务名称</label>： <select ng-model=\"search.taskname\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"task in Tasks\" ng-value=\"task.CommonTaskId\">{{task.CommonTaskName}}</option> <option ng-value=\"0\">其他</option> <!--需要改数据--> </select> </div> <div class=\"form-group\" style=\"margin: 5px;float:none\"> <label>当前子任务</label>： <select ng-model=\"search.childtaskname\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"outT in outTasks\" ng-value=\"outT.Id\">{{outT.TaskName}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px;float:none\"> <label>外勤人员</label>： <select ng-model=\"search.outworkId\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"ot in outworkers\" ng-value=\"{{ot.UserId}}\">{{ot.RealName}}</option> <!--需要改数据--> </select> </div> <div class=\"form-group\" style=\"margin: 5px;float:none\"> <label>服务状态</label>： <select ng-model=\"search.servicestatus\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option value=\"1\">等待分配</option> <option value=\"2\">未开始</option> <option value=\"3\">外勤服务</option> <option value=\"4\">外勤会计服务</option> <option value=\"5\">会计服务</option> <option value=\"7\">结束</option> <option value=\"8\">中止</option> <!--需要改数据--> </select> </div> <!--日期--> <div class=\"form-group\" style=\"margin: 5px;min-width:300px;float:none\"> <lable style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">任务提交日期：</lable> <div class=\"row\" style=\"float:left;width:300px\"> <div class=\"col-md-6\" style=\"width: 48%;padding-right: 0\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"{{format}}\" ng-model=\"dt1\" is-open=\"popup1.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" alt-input-formats=\"altInputFormats\" ng-change=\"changeDate()\" id=\"date1\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open1()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> <span class=\"inner-date\">-</span> <div class=\"col-md-6\" style=\"width: 48%;padding: 0\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup ng-model=\"dt2\" is-open=\"popup2.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" ng-change=\"changeDate()\" id=\"date2\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open2()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> </div> <div class=\"form-group\" style=\"margin: 5px 10px;float:none\"> <label>所属区（县）</label>： <select ng-model=\"search.areacode\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"area in areas\" ng-value=\"area.AreaCode\">{{area.AreaName}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px;float:none\"> <label>销售人员</label>： <select ng-model=\"search.salesId\" class=\"form-control\"> <option value=\"0\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"u in users\" value=\"{{u.UserId}}\">{{u.RealName}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px;float:none\"> <label>主任务状态</label>： <select ng-model=\"search.taskstatus\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"(key,value) in taskStatus\" ng-value=\"key\">{{value}}</option> </select> </div> <!--<div class=\"form-group\">\n" +
    "                <a href=\"\">导出Excel表格</a>\n" +
    "            </div>--> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"searchFn()\" style=\"position:absolute;right:0;top:5px\">搜索</button> <button class=\"btn btn-primary pull-right\" ng-click=\"open()\" style=\"position:absolute;right:0;top:50px\" ng-if=\"user.Category == 2 || user.Category== 8 || user.Category== 5\">新增</button> </form> </div> <div style=\"overflow-x: scroll\"> <table class=\"table table-striped table-hover table-bordered\" style=\"min-width:1750px\"> <thead> <tr class=\"info\"> <th>外勤序列ID</th> <th>公司名称</th> <!-- <th>任务名称</th> --> <th>所属区域</th> <th>公司联系人</th> <th>销售人员</th> <!----> <th>报税状态</th> <th>服务状态</th> <th>审核状态</th> <th>会计审核</th> <th>部分报税</th> <th>任务名称</th> <th>总任务状态</th> <!----> <th>当前子任务</th> <th>当前外勤人员</th> <th>提交任务时间</th> <th>子任务状态</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td style=\"text-align:center\">{{customer.SequenceNo}}</td> <!-- <td style=\"text-align:center\">{{customer.MainTaskName}}</td> --> <td style=\"text-align:center\"><span class=\"nowrap\" title=\"{{customer.CompanyName}}\">{{customer.CompanyName}}</span></td> <td style=\"text-align:center\">{{customer.AreaName}}</td> <td style=\"text-align:center\">{{customer.Connector}}</td> <td style=\"text-align:center\">{{customer.SalesName}}</td> <!----> <td style=\"text-align:center\">{{customer.AgentStatus | NewAgentStatus}}</td> <td style=\"text-align:center\">{{customer.ServiceStatus | NewServiceStatus}}</td> <td style=\"text-align:center\">{{customer.OutWorkerStatus | NewCheckStatus}}</td> <td style=\"text-align:center\">{{customer.AccountantStatus | NewCheckStatus}}</td> <td style=\"text-align:center\">{{customer.PartTax | partTax}}</td> <td style=\"text-align:center\">{{customer.MainTaskName}}</td> <td style=\"text-align:center\">{{customer.MainTaskStatus | mainTaskStatus}}</td> <!----> <td style=\"text-align:center\">{{customer.childTaskName}}</td> <td style=\"text-align:center\">{{customer.OutWorkerName}}</td> <td style=\"text-align:center\">{{customer.SubmitTaskTime | tDate}}</td> <td style=\"text-align:center\">{{customer.Status | outWorkStatus}}</td> <td class=\"table-opt\" style=\"text-align:center;padding:4px\"> <button class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"detail(customer)\" style=\"padding:1px\">查看</button> <!-- 外勤审核状态是1待审核的时候 可以点击审核或者是驳回 因为此处就涉及到 1待审核 2已审核 3已驳回 7已提交 四个状态--> <button ng-if=\"(user.IsCenter == 0 && user.Category == 8) || (user.IsCenter == 0 && user.Category == 2)\" class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"check(customer)\" style=\"padding:1px\" ng-disabled=\"customer.OutWorkerStatus != 1\">审核</button> <button ng-if=\"(user.IsCenter == 0 && user.Category == 8) || (user.IsCenter == 0 && user.Category == 2)\" class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"reject(customer)\" style=\"padding:1px\" ng-disabled=\"customer.OutWorkerStatus != 1\">驳回</button> <!-- 取消不涉及可点不可点 --> <button ng-show=\"user.Category ==2 || user.Category==8\" ng-disabled=\"customer.Status > 3\" class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"cancel(customer)\" style=\"padding:1px\">取消</button> <!-- 提交分三种情况\n" +
    "                    1. 审单直接提交给外勤的时候 外勤审核状态OutWorkerStatus=2已审核 会计审核状态AccountantStatus是null的时候 提交时候可以选择资料齐全或者部分\n" +
    "                    2. 审单分别提交给外勤和会计 审单提交给外勤后外勤要把剩下的部分提交给会计 外勤状态已审核OutWorkerStatus=2 会计审核状态部分审核 AccountantStatus=5 提交的时候只能选择资料齐全\n" +
    "                    3. 审单提交给外勤 外勤部分提交给会计 外勤状态已审核OutWorkerStatus=2 会计审核状态已驳回AccountantStatus=3 来源是外勤提交的时候 提交的时候选择资料齐全或者部分\n" +
    "                   --> <button ng-if=\"(user.IsCenter == 0 && user.Category == 8) || (user.IsCenter == 0 && user.Category == 2)\" class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"sub(customer)\" style=\"padding:1px\" ng-disabled=\"isSub(customer)\">提交</button> </td> </tr> </tbody> </table> </div> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> &nbsp; <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" ng class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div> </div>"
  );


  $templateCache.put('views/outwork_weight_setting.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">{{::title}}</h3> </div> <div class=\"modal-body\"> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr> <th style=\"width:150px\">序号</th> <th style=\"width:350px\">子任务名称</th> <th style=\"width:150px\">权重</th> <th></th> </tr> </thead> <tbody> <tr ng-repeat=\"item in Tasks|filter:{selected:true} as result track by item.TaskId\"> <td>{{$index+1}}</td> <td>{{item.TaskName}}</td> <td><input type=\"number\" ng-model=\"item._weight\" ng-init=\"item._weight=$index+1\" min=\"1\" max=\"99\" maxlength=\"2\" ng-model-options=\"{allowInvalid:true}\" ng-change=\"item._weight = toInt(item._weight)\" min=\"1\"></td> <td> <a ng-click=\"delete(item)\" style=\"cursor:pointer\">删除</a> </td> </tr> </tbody> </table> </div> <div class=\"modal-footer\"> <button class=\"btn btn-primary\" type=\"button\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok()\">确认</button> <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">取消</button> </div>"
  );


  $templateCache.put('views/outworker_sub.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"close()\">&times;</span> <!-- <h3 class=\"modal-title\">外勤提交会计</h3> --> <h3 class=\"modal-title\">{{title}}</h3> </div> <div class=\"modal-body\"> <label for=\"\" style=\"display:block\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type=\"radio\" name=\"art\" value=\"0\" ng-model=\"partT\" ng-click=\"_partT = false\"> <span style=\"display:inline-block;width:80%;height:80px;line-height:80px;padding-left:20px;border:1px dashed black\">资料齐全，提交会计审核</span> </label> <label for=\"\" style=\"display:block\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type=\"radio\" name=\"art\" value=\"\" ng-checked=\"_partT\" style=\"position:relative;top:-20px\" ng-disabled=\"isSecondAccount\"> <span style=\"display:inline-block;width:80%;height:85px;line-height:40px;padding-left:20px;border:1px dashed black;position: relative;\n" +
    "    left: -4px\">部分税务报道<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label for=\"\"> <input type=\"radio\" name=\"art_sub\" value=\"1\" ng-model=\"partT\" ng-click=\"_partT = true\" ng-disabled=\"isSecondAccount\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;国税报道完毕 </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label for=\"\"> <input type=\"radio\" name=\"art_sub\" value=\"2\" ng-model=\"partT\" ng-click=\"_partT = true\" ng-disabled=\"isSecondAccount\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地税报道完毕 </label> </span> </label> </div> <div class=\"modal-footer\"> <button class=\"btn btn-warning\" type=\"button\" ng-click=\"sub()\" ng-disabled=\"dis()\">提交</button> </div>"
  );


  $templateCache.put('views/signed_detail.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">{{title}}</h3> </div> <div class=\"modal-body\"> <div class=\"content-header clearfix\"> <form name=\"contractBelongform\" novalidate class=\"con-header-left fl\"> <div class=\"form-group ml5 ht\"> <label>序列ID</label>： <span class=\"detail-top\">{{item.SequenceNo}}</span> </div> <div class=\"form-group ml5 ht\"> <label>公司名称</label>： <span class=\"detail-top\">{{item.CompanyName}}</span> </div> <div class=\"form-group ml5 ht\"> <label>当前合同编号</label>： <span class=\"detail-top\">{{item.ContractNo}}</span> </div> <div class=\"form-group ml5 ht\"> <label>当前服务日期</label>： <span class=\"detail-top\">{{itemDetail23.ServiceStart | tDate}}</span> <span>-</span> <span class=\"detail-top\">{{itemDetail23.ServiceEnd | tDate}}</span> </div> <div class=\"form-group ml5 ht\"> <label>服务状态</label>： <span class=\"detail-top\">{{item.ServiceStatus | NewServiceStatus}}</span> </div> <div class=\"form-group ml5 ht\"> <label>外勤审核状态</label>： <span class=\"detail-top\">{{item.OutWorkerStatus | NewCheckStatus}}</span> </div> <div ng-show=\"isAccouting\" class=\"form-group ml5 ht\"> <label>部分报税</label>： <span class=\"detail-top\">{{item.PartTax | partTax}}</span> </div> <div class=\"form-group ml5 ht\"> <label>会计审核状态</label>： <span class=\"detail-top\">{{item.AccountantStatus | NewCheckStatus}}</span> </div> <div ng-show=\"isAccouting\" class=\"form-group ml5 ht\"> <label>来源</label>： <span class=\"detail-top\">{{item.AccountantTaskSource}}</span> </div> </form> <div ng-show=\"isAccouting\" class=\"con-header-right fr\" style=\"width:10%\"> <button ng-if=\"user.IsCenter == 0 && (user.Category == 10 || user.Category == 2) && !item.ServiceStart\" class=\"btn btn-primary mt10\" type=\"button\" ng-click=\"AccountCheck()\" ng-disabled=\"item.AccountantStatus != 1\">会计审核</button> <button ng-if=\"user.IsCenter == 0 && (user.Category == 10 || user.Category == 2) && item.ServiceStart\" class=\"btn btn-primary mt10\" type=\"button\" ng-click=\"AccountCheckSecond()\" ng-disabled=\"item.AccountantStatus != 1\">会计审核</button> <button ng-if=\"user.IsCenter == 0 && (user.Category == 10 || user.Category == 2)\" class=\"btn btn-primary\" type=\"button\" ng-click=\"rejected()\" ng-disabled=\"item.AccountantStatus != 1\">会计驳回</button> </div> <div ng-show=\"!isAccouting\" class=\"con-header-right fr\"> <button class=\"btn btn-primary mt10\" type=\"button\" ng-click=\"submitAccount()\" ng-disabled=\"item.DisableCommitAccount == 1 || itemDetail23.OrderStatus == 7 || itemDetail23.OrderStatus == 8\">审核提交会计</button> <button class=\"btn btn-primary\" type=\"button\" ng-click=\"submitOutwork()\" ng-disabled=\"item.DisableOutWorkCommitAccount == 1 || itemDetail23.OrderStatus == 7 || itemDetail23.OrderStatus == 8\">审核提交外勤</button> </div> </div> <div class=\"content-tab\"> <form name=\"outerForm\" class=\"tab-form-demo\"> <uib-tabset active=\"activeForm\"> <uib-tab index=\"0\" heading=\"公司信息\"> <div class=\"customer-info clearfix\"> <div class=\"title\" style=\"margin-bottom: 10px\"> <div class=\"fl belong-left\"> <span>客户基本信息</span> </div> <div ng-show=\"!isAccouting\" class=\"fr belong-right\"> <button ng-if=\"isEdit\" class=\"btn\" type=\"button\" ng-click=\"edit()\">编辑</button> <button ng-if=\"!isEdit\" class=\"btn\" type=\"button\" ng-click=\"save()\">完成</button> </div> </div> <form name=\"customerform\" novalidate class=\"clearfix\"> <div class=\"form-group ml5\"> <label class=\"required\">公司名称</label>： <input flex ng-model=\"postDetail.CompanyName\" required ng-disabled=\"isEdit\" class=\"input-border\" style=\"width:250px\"> </div> <div class=\"form-group ml5\"> <label class=\"required\">公司联系人</label>： <input flex ng-model=\"postDetail.Connector\" required ng-disabled=\"isEdit\" class=\"input-border\" style=\"width:100px\"> </div> <div class=\"form-group ml5\"> <label class=\"required\">联系人电话</label>： <input flex ng-model=\"postDetail.Mobile\" required ng-disabled=\"isEdit\" class=\"input-border\"> </div> <div class=\"form-group ml5\"> <label class=\"required\">所属销售</label>： <input flex ng-model=\"postDetail.SalesName\" required readonly class=\"input-border\"> </div> <div class=\"form-group ml5\"> <label>企业类型</label>： <span class=\"input-border companyTypeStyle\">{{postDetail.AddedValue | CompanyType}}</span> </div> <div class=\"form-group ml5\"> <label>所属行业</label>： <select ng-model=\"postDetail.IndustryId\" class=\"input-border\" ng-disabled=\"isEdit\" style=\"width:100px\"> <option value=\"0\">请选择</option> <option ng-repeat=\"item in industries\" value=\"{{item.IndustryId}}\" ng-selected=\"postDetail.IndustryId == item.IndustryId\">{{item.IndustryName}}</option> </select> </div> <div class=\"form-group ml5\"> <label class=\"required\">所属区域</label>： <select ng-model=\"postDetail.AreaCode\" class=\"input-border\" ng-disabled=\"isEdit\" style=\"width:100px\"> <option value=\"\">请选择</option> <option ng-repeat=\"item in areas\" value=\"{{item.AreaCode}}\" ng-selected=\"postDetail.AreaCode == item.AreaCode\">{{item.AreaName}}</option> </select> </div> <div class=\"form-group ml5\"> <label>公司地址</label>： <input flex ng-model=\"postDetail.Address\" required ng-disabled=\"isEdit\" class=\"input-border\" style=\"width:300px\"> </div> </form> </div> <div class=\"customer-info clearfix\"> <div class=\"title\" style=\"margin-bottom: 10px\">营业执照信息</div> <form name=\"companyform\" novalidate class=\"clearfix\"> <div class=\"form-group ml5\"> <label>法人姓名</label>： <input flex ng-model=\"postDetail.LegalPerson\" required ng-disabled=\"isEdit\" class=\"input-border\" maxlength=\"5\"> </div> <div class=\"form-group ml5 flex-style\"> <label>法人身份证</label>： <div style=\"display: inline-block\"> <img ng-src=\"{{postDetail.PersonCardPath}}\" ng-if=\"postDetail.PersonCardPath\" alt=\"\" pic-view class=\"contract-img-style\"> <div class=\"uploader-outter\">+ <input class=\"uploader-img\" type=\"file\" nv-file-select=\"\" uploader=\"uploader1\" ng-disabled=\"isEdit\"> </div> <div class=\"progress\" style=\"width:80%;margin-left:90px\" ng-if=\"uploader1.isUploading\"> <div class=\"progress-bar\" role=\"progressbar\" ng-style=\"{ 'width': uploader1.progress + '%' }\" style=\"width: 100%\"></div> </div> </div> </div> <div class=\"form-group ml5\"> <label>注册号</label>： <input flex ng-model=\"postDetail.RegNO\" required ng-disabled=\"isEdit\" class=\"input-border\" style=\"width: 180px\" maxlength=\"20\"> </div> <div class=\"form-group ml5 flex-style\"> <label>营业执照</label>： <div style=\"display: inline-block\"> <img ng-src=\"{{postDetail.BusinessLicense}}\" ng-if=\"postDetail.BusinessLicense\" alt=\"\" pic-view class=\"contract-img-style\"> <div class=\"uploader-outter\">+ <input class=\"uploader-img\" type=\"file\" nv-file-select=\"\" ng-disabled=\"isEdit\" uploader=\"uploader2\"> </div> <div class=\"progress\" style=\"width:80%;margin-left:90px\" ng-if=\"uploader2.isUploading\"> <div class=\"progress-bar\" role=\"progressbar\" ng-style=\"{ 'width': uploader2.progress + '%' }\" style=\"width: 100%\"></div> </div> </div> </div> <div class=\"form-group ml5\"> <label>国税登记号</label>： <input flex ng-model=\"postDetail.NationalTaxNO\" required ng-disabled=\"isEdit\" class=\"input-border\" style=\"width: 180px\" maxlength=\"20\"> </div> <div class=\"form-group ml5\"> <label>地税登记号</label>： <input flex ng-model=\"postDetail.LocalTaxNO\" required ng-disabled=\"isEdit\" class=\"input-border\" style=\"width: 180px\" maxlength=\"20\"> </div> <div class=\"form-group ml5\"> <label>注册资金</label>： <input flex ng-model=\"postDetail.RegisteredCapital\" required ng-disabled=\"isEdit\" class=\"input-border\" maxlength=\"20\"> </div> <div class=\"form-group ml5\"> <lable style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">营业期限：</lable> <div style=\"display: inline-block\"> <p class=\"input-group\" style=\"margin:0;width:150px\"> <input type=\"text\" class=\"form-control\" ng-click=\"open1()\" ng-model=\"postDetail.RegisterDate\" uib-datepicker-popup=\"yyyy-MM-dd\" ng-model=\"dt\" is-open=\"popup1.opened\" datepicker-options=\"dateOptions\" close-text=\"关闭\" alt-input-formats=\"altInputFormats\" style=\"padding:6px\" ng-disabled=\"isEdit\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open1()\" ng-disabled=\"isEdit\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> <div style=\"display: inline-block\"> <p class=\"input-group\" style=\"margin:0;width:150px\"> <input type=\"text\" class=\"form-control\" ng-click=\"open2()\" ng-model=\"postDetail.BusnissDeadline\" uib-datepicker-popup=\"yyyy-MM-dd\" ng-model=\"dt\" is-open=\"popup2.opened\" datepicker-options=\"dateOptions\" close-text=\"关闭\" alt-input-formats=\"altInputFormats\" style=\"padding:6px\" ng-disabled=\"isEdit || (postDetail.NoDeadLine == 1)\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open2()\" ng-disabled=\"isEdit || (postDetail.NoDeadLine == 1)\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> <!-- 无限期 postDetail.NoDeadLine == 0 有期限 ==1无期限 同时前面结束时间不可点击   --> <div style=\"display: inline-block\"> <label ng-hide=\"isEdit && (postDetail.NoDeadLine == 0)\"> <input type=\"checkbox\" name=\"noLimitDate\" ng-readonly=\"isReadOnly\" value=\"1\" ng-click=\"postDetail.NoDeadLine = !postDetail.NoDeadLine; \" ng-checked=\"postDetail.NoDeadLine == 1\" ng-disabled=\"isEdit\"> 无期限 </label> </div> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>经营范围：</label> <textarea cols=\"120\" rows=\"5\" ng-model=\"postDetail.BusinessScope\" ng-disabled=\"isEdit\" maxlength=\"300\"></textarea> </div> </form> </div> </uib-tab> <uib-tab index=\"1\" heading=\"合同信息\" select=\"refreshData2()\"> <div class=\"contract-info clearfix\"> <div class=\"title\" style=\"margin-bottom: 10px\">合同列表</div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr class=\"info\"> <th>合同编号</th> <th>合同类型</th> <th>签订日期</th> <th>服务期限</th> <th>服务开始时间</th> <th>服务结束时间</th> <th>合同总金额</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"contrac in contractTab\"> <td style=\"text-align:center\">{{contrac.ContractNo}}</td> <td style=\"text-align:center\">{{contrac.OrderType | ContractType}}</td> <td style=\"text-align:center\">{{contrac.ContractDate | tDate}}</td> <td style=\"text-align:center\">{{contrac.OrderMonths+contrac.GiftMonth}}</td> <td style=\"text-align:center\">{{contrac.ServiceStart | tDate}}</td> <td style=\"text-align:center\">{{contrac.ServiceEnd | tDate}}</td> <td style=\"text-align:center\">{{contrac.Amount}}</td> <td class=\"table-opt\" style=\"text-align:center;width:200px\"> <button class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"detailTab2(contrac)\">查看详情</button> <!-- 合同状态7 8 时候禁止点击终止合同 --> <button ng-show=\"!isAccouting\" class=\"btn btn-link\" ng-disabled=\"contrac.OrderStatus == 7 || contrac.OrderStatus == 8\" ng-click=\"stop(contrac)\">中止合同</button> <button ng-show=\"isAccouting\" ng-disabled=\"isAccouting\" class=\"btn btn-link\">中止合同</button> </td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"tab2.paginator.total\" items-per-page=\"tab2.paginator.perPage\" boundary-links=\"true\" ng-model=\"tab2.paginator.currentPage\" previous-text=\"{{::tab2.paginator.previousText}}\" next-text=\"{{::tab2.paginator.nextText}}\" first-text=\"{{::tab2.paginator.firstText}}\" last-text=\"{{::tab2.paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"tab2.paginator.numPages\" ng-change=\"tab2.pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{tab2.paginator.currentPage}}</span> / <span>{{tab2.paginator.numPages}}</span> &nbsp; <span>合计:{{tab2.paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"tab2.currentPage\" required min=\"1\" max=\"{{tab2.paginator.numPages}}\" ng class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"tab2.setCurrentPage()\">Go!</button> </span> </div> </form> </div> </div> </uib-tab> <uib-tab index=\"2\" heading=\"服务费及代收费\" select=\"refreshData3()\"> <div class=\"contract-info clearfix\"> <div class=\"title\" style=\"margin-bottom: 10px\">服务费及代收费列表</div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr class=\"info\"> <th>合同编号</th> <th>服务期限</th> <th>合同总金额</th> <th>记账报税费用</th> <th>财务服务费</th> <th>外勤服务费</th> <th>代收费用</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"contrac in contractTab3\"> <td style=\"text-align:center\">{{contrac.ContractNo}}</td> <td style=\"text-align:center\">{{contrac.OrderMonths}}</td> <td style=\"text-align:center\">{{contrac.AmounbookKeepFeedt | handdleAmount}}</td> <td style=\"text-align:center\">{{contrac.BookKeepFeed | handdleAmount}}</td> <td style=\"text-align:center\">{{contrac.FinanceServiceFeed | handdleAmount}}</td> <td style=\"text-align:center\">{{contrac.OutWorkServiceFeed | handdleAmount}}</td> <td style=\"text-align:center\">{{contrac.AgentFeed | handdleAmount}}</td> <td class=\"table-opt\" style=\"text-align:center;width:200px\"> <button class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"detailTab3(contrac)\">查看详情</button> </td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"tab3.paginator.total\" items-per-page=\"tab3.paginator.perPage\" boundary-links=\"true\" ng-model=\"tab3.paginator.currentPage\" previous-text=\"{{::tab3.paginator.previousText}}\" next-text=\"{{::tab3.paginator.nextText}}\" first-text=\"{{::tab3.paginator.firstText}}\" last-text=\"{{::tab3.paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"tab3.paginator.numPages\" ng-change=\"tab3.pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{tab3.paginator.currentPage}}</span> / <span>{{tab3.paginator.numPages}}</span> &nbsp; <span>合计:{{tab3.paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"tab3.currentPage\" required min=\"1\" max=\"{{tab3.paginator.numPages}}\" ng class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"tab3.setCurrentPage()\">Go!</button> </span> </div> </form> </div> </div> </uib-tab> <uib-tab index=\"3\" heading=\"外勤任务\" select=\"refreshData4()\"> <div class=\"contract-info clearfix\"> <div class=\"title\" style=\"margin-bottom: 10px\">外勤任务</div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr class=\"info\"> <th>序列ID</th> <th>任务名称</th> <th>主任务状态</th> <th>当前子任务</th> <th>当前子任务状态</th> <th>当前外勤人员</th> <th>任务提交时间</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"contrac in contractTab4\"> <td style=\"text-align:center\">{{contrac.Id}}</td> <td style=\"text-align:center\">{{contrac.MainTaskName}}</td> <td style=\"text-align:center\">{{contrac.MainTaskStatus | MainoutworkStatus}}</td> <td style=\"text-align:center\">{{contrac.childTaskName}}</td> <td style=\"text-align:center\">{{contrac.Status | ChildoutworkStatus}}</td> <td style=\"text-align:center\">{{contrac.OutWorkerName}}</td> <td style=\"text-align:center\">{{contrac.SubmitTaskTime | tDateTime}}</td> <td class=\"table-opt\" style=\"text-align:center;width:200px\"> <button class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"detailTab4(contrac)\">查看详情</button> </td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"tab4.paginator.total\" items-per-page=\"tab4.paginator.perPage\" boundary-links=\"true\" ng-model=\"tab4.paginator.currentPage\" previous-text=\"{{::tab4.paginator.previousText}}\" next-text=\"{{::tab4.paginator.nextText}}\" first-text=\"{{::tab4.paginator.firstText}}\" last-text=\"{{::tab4.paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"tab4.paginator.numPages\" ng-change=\"tab4.pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{tab4.paginator.currentPage}}</span> / <span>{{tab4.paginator.numPages}}</span> &nbsp; <span>合计:{{tab4.paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"tab4.currentPage\" required min=\"1\" max=\"{{tab4.paginator.numPages}}\" ng class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"tab4.setCurrentPage()\">Go!</button> </span> </div> </form> </div> </div> </uib-tab> <uib-tab index=\"4\" heading=\"备注信息\" select=\"refreshData5()\"> <div class=\"contract-info clearfix\"> <div class=\"title\" style=\"margin-bottom: 10px\">备注信息</div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr class=\"info\"> <th>序列号</th> <th>备注</th> <th>操作</th> <th>操作人</th> <th>操作时间</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"contrac in contractTab5\"> <td style=\"text-align:center\">{{contrac.Id}}</td> <td style=\"text-align:center\">{{contrac.Content}}</td> <td style=\"text-align:center\">{{contrac.Operation | HanddleOperation}}</td> <td style=\"text-align:center\">{{contrac.RealName}}</td> <td style=\"text-align:center\">{{contrac.OperationTime | tDate}}</td> <td class=\"table-opt\" style=\"text-align:center;width:200px\"> <button class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"detailTab5(contrac)\">查看详情</button> </td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"tab5.paginator.total\" items-per-page=\"tab5.paginator.perPage\" boundary-links=\"true\" ng-model=\"tab5.paginator.currentPage\" previous-text=\"{{::tab5.paginator.previousText}}\" next-text=\"{{::tab5.paginator.nextText}}\" first-text=\"{{::tab5.paginator.firstText}}\" last-text=\"{{::tab5.paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"tab5.paginator.numPages\" ng-change=\"tab5.pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{tab5.paginator.currentPage}}</span> / <span>{{tab5.paginator.numPages}}</span> &nbsp; <span>合计:{{tab5.paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"tab5.currentPage\" required min=\"1\" max=\"{{tab5.paginator.numPages}}\" ng class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"tab5.setCurrentPage()\">Go!</button> </span> </div> </form> </div> </div> </uib-tab> <uib-tab index=\"5\" heading=\"操作记录\" select=\"refreshData6()\"> <div class=\"contract-info clearfix\"> <div class=\"title\" style=\"margin-bottom: 10px\">操作记录</div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr class=\"info\"> <th>序列号</th> <th>操作内容</th> <th>操作人</th> <th>操作时间</th> </tr> </thead> <tbody> <tr ng-repeat=\"contrac in contractTab6\"> <td style=\"text-align:center\">{{contrac.Id}}</td> <td style=\"text-align:center\">{{contrac.Content}}</td> <td style=\"text-align:center\">{{contrac.RealName}}</td> <td style=\"text-align:center\">{{contrac.OperationTime | tDateTime}}</td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"tab6.paginator.total\" items-per-page=\"tab6.paginator.perPage\" boundary-links=\"true\" ng-model=\"tab6.paginator.currentPage\" previous-text=\"{{::tab6.paginator.previousText}}\" next-text=\"{{::tab6.paginator.nextText}}\" first-text=\"{{::tab6.paginator.firstText}}\" last-text=\"{{::tab6.paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"tab6.paginator.numPages\" ng-change=\"tab6.pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{tab6.paginator.currentPage}}</span> / <span>{{tab6.paginator.numPages}}</span> &nbsp; <span>合计:{{tab6.paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"tab6.currentPage\" required min=\"1\" max=\"{{tab6.paginator.numPages}}\" ng class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"tab6.setCurrentPage()\">Go!</button> </span> </div> </form> </div> </div> </uib-tab> </uib-tabset> </form> </div> </div>"
  );


  $templateCache.put('views/signed_manage.html',
    "<div class=\"recharge\"> <div class=\"well well-sm u-search clearfix\"> <form class=\"form-inline\" style=\"position:relative;padding-right:50px\"> <div class=\"form-group\" style=\"margin: 5px\"> <label>序列ID</label>： <input type=\"text\" ng-model=\"search.sequenceNumber\" class=\"form-control\" style=\"width: 100px\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>合同编号</label>： <input type=\"text\" ng-model=\"search.contractNo\" class=\"form-control\" style=\"width: 100px\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>公司名称</label>： <input type=\"text\" ng-model=\"search.companyname\" class=\"form-control\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>公司联系人</label>： <input type=\"text\" ng-model=\"search.contact\" class=\"form-control\" style=\"width: 100px\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>销售人员</label>： <input type=\"text\" ng-model=\"search.saleName\" class=\"form-control\" style=\"width: 100px\"> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>服务状态</label>： <select ng-model=\"search.serviceStatus\" class=\"form-control\"> <option value=\"0\">请选择</option> <option ng-repeat=\"(key,value) in companyStatus\" value=\"{{key}}\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>所属区域</label>： <select ng-model=\"search.areaCode\" class=\"form-control\"> <option value=\"\" ng-selected=\"true\">请选择</option> <option ng-repeat=\"item in areas\" value=\"{{item.AreaCode}}\">{{item.AreaName}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>外勤处理状态</label>： <select ng-model=\"search.outworkStatus\" class=\"form-control\"> <option value=\"0\">请选择</option> <option ng-repeat=\"(key,value) in outworkStatus\" value=\"{{key}}\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px\"> <label>会计处理状态</label>： <select ng-model=\"search.accountStatus\" class=\"form-control\"> <option value=\"0\">请选择</option> <option ng-repeat=\"(key,value) in accountStatus\" value=\"{{key}}\">{{value}}</option> </select> </div> <div class=\"form-group\" style=\"margin: 5px;min-width:300px\"> <lable style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">合同签订日期：</lable> <div class=\"row\" style=\"float:left;width:300px\"> <div class=\"col-md-6\" style=\"width: 48%;padding-right: 0\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"{{format}}\" ng-model=\"dt1\" is-open=\"popup1.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" alt-input-formats=\"altInputFormats\" ng-change=\"changeDate()\" id=\"date1\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open1()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> <span class=\"inner-date\">-</span> <div class=\"col-md-6\" style=\"width: 48%;padding: 0\"> <p class=\"input-group\" style=\"margin:0\"> <input type=\"text\" class=\"form-control\" uib-datepicker-popup ng-model=\"dt2\" is-open=\"popup2.opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" ng-change=\"changeDate()\" id=\"date2\" style=\"padding:6px\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open2()\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> </div> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"searchFn()\" style=\"position:absolute;right:0;top:5px\">搜索</button> <!-- <button class=\"btn btn-primary pull-right\" ng-click=\"toExcel()\" style=\"position:absolute;right:20px;top:50px\">导出</button> --> </form> </div> <div style=\"overflow-x: scroll\"> <table class=\"table table-striped table-hover table-bordered\" style=\"min-width:1400px\"> <thead> <tr class=\"info\"> <th style=\"width:140px\">序列ID</th> <th style=\"width:130px\">公司名称</th> <th style=\"width:80px\">所属区域</th> <th style=\"width:100px\">当前合同编号</th> <th style=\"width:100px\">公司联系人</th> <th style=\"width:80px\">销售人员</th> <th style=\"width:120px\">合同签订日期</th> <th style=\"width:100px\">报税状态</th> <th style=\"width:100px\">服务状态</th> <th style=\"width:110px\">外勤处理状态</th> <th style=\"width:110px\">会计处理状态</th> <th style=\"width:200px\">操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td style=\"text-align:center;width: 140px;vertical-align: middle;padding-left: 0px\"> <div ng-show=\"customer.RemarkSignId\" class=\"mark-style fl\" ng-style=\"{{customer.markBg}}\">{{customer.RemarkSignId | CustomerMarkStyle}}</div> <div class=\"fr\">{{customer.SequenceNo}}</div> </td> <td style=\"text-align:center\"><span class=\"nowrap\" title=\"{{customer.CompanyName}}\">{{customer.CompanyName}}</span></td> <td style=\"text-align:center\">{{customer.AreaName}}</td> <td style=\"text-align:center\">{{customer.ContractNo}}</td> <td style=\"text-align:center\">{{customer.Connector}}</td> <td style=\"text-align:center\">{{customer.SaleName}}</td> <td style=\"text-align:center\">{{customer.ContractDate}}</td> <td style=\"text-align:center\">{{customer.AgentStatus | NewAgentStatus}}</td> <td style=\"text-align:center\">{{customer.ServiceStatus | NewServiceStatus}}</td> <td style=\"text-align:center\">{{customer.OutWorkerStatus | NewCheckStatus}}</td> <td style=\"text-align:center\">{{customer.AccountantStatus | NewCheckStatus}}</td> <td class=\"table-opt\" style=\"text-align:center;width:200px\"> <button class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"detail(customer)\">查看</button> <!-- 点击标记 标记按钮不显示 显示取消 --> <button ng-if=\"!customer.RemarkSignId\" class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"mark(customer)\">标记</button> <button ng-if=\"customer.RemarkSignId\" class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"cancelmark(customer)\">取消</button> <!-- IfCancelHangup 1表示在服务器内且可以挂起或者取消  --> <!-- 挂起：RemarkSuspendId有值显示取消 没值显示挂起；ServiceStatus==2已审核可以点击挂起 1 3的时候不可以挂起--> <button ng-if=\"!customer.RemarkSuspendId \" class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"gq(customer)\" ng-disabled=\"customer.IfCancelHangup == 0\">挂起</button> <!-- 挂起取消：当前时间在服务结束时间之内 --> <button ng-if=\"customer.RemarkSuspendId\" class=\"btn btn-link\" href=\"javascript:;\" ng-click=\"cancelgq(customer)\" ng-disabled=\"customer.IfCancelHangup == 0\">取消</button> </td> </tr> </tbody> </table> </div> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> &nbsp; <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" ng class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div> </div>"
  );


  $templateCache.put('views/signed_tab2_detail.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">合同{{postDetail.ContractNo}}详情：</h3> </div> <div class=\"modal-body\"> <div class=\"contract-belong-info clearfix\"> <form name=\"contractBelongform\" novalidate class=\"clearfix\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">合同类型</label>： <span>{{postDetail.OrderType | ContractType}}</span> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>合同状态</label>： <span>{{postDetail.OrderStatus|Contractstatus}}</span> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>合同期限</label>： <span>{{postDetail.OrderMonths}}</span> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label>赠送礼包</label>： <span>{{postDetail.GiftMonth}}</span> </div> </form> </div> <div class=\"contract-belong-info clearfix\"> <div class=\"item clearfix\" ng-repeat=\"(pindex, pl) in paylist\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">支付方式</label>： <span>{{pl.PayTypeId | PayType}}</span> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">支付方账号</label>： <span>{{pl.PayAccountNo}}</span> </div> <div class=\"form-group col-md-3\" style=\"margin: 5px 10px 5px 10px\"> <lable class=\"required\" style=\"margin-bottom: 5px;font-weight: bold;float:left;line-height:34px;height:34px\">支付时间：</lable> <span>{{pl.PayTime | tDate}}</span> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px; display: flex; align-items: center\"> <label class=\"required img-bottom\">凭证</label>： <div ng-if=\"canChange\" style=\"display: inline-block\"> <img ng-src=\"{{pl.PayImagePath}}\" class=\"contract-img\" pic-view> </div> </div> </div> </div> <div class=\"contract-belong-info clearfix\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">签订日期：</label>： <span>{{postDetail.ContractDate | tDate}}</span> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">合同总金额：</label> <span>{{postDetail.Amount}}</span> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">服务开始时间：</label> <span>{{postDetail.ServiceStart | tDate}}</span> </div> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <label class=\"required\">服务结束时间：</label> <span>{{postDetail.ServiceEnd | tDate}}</span> </div> </div> <div class=\"contract-belong-info clearfix\" style=\"margin: 5px 10px 5px 10px\"> <label>备注信息：</label> <textarea cols=\"100\" rows=\"3\" ng-model=\"postDetail.Remark\" readonly></textarea> </div> </div>"
  );


  $templateCache.put('views/signed_tab3_detail.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">合同总金额：{{postDetail.Amount}} 元</h3> </div> <div class=\"modal-body\"> <div class=\"contract-belong-info clearfix\"> <form name=\"contractBelongform\" novalidate class=\"clearfix\"> <div class=\"form-group\" style=\"margin: 5px 10px 5px 10px\"> <div class=\"clearfix\" style=\"margin-bottom:10px\"> <div class=\"amount fl\"> <span>记账报税费用：</span> <span class=\"contract-inputWidth\">{{postDetail.BookKeepFeed}}</span> </div> <div class=\"amount fl\"> <span>财务服务费用：</span> <span class=\"contract-inputWidth\">{{postDetail.FinanceServiceFeed}}</span> </div> <div class=\"amount fl\"> <span>外勤服务费用：</span> <span class=\"contract-inputWidth\">{{postDetail.OutWorkServiceFeed}}</span> </div> <div class=\"amount fl\"> <span>代收费用：</span> <span class=\"contract-inputWidth\">{{postDetail.AgentFeed}}</span> </div> </div> <table class=\"table table-hover table-bordered\"> <thead> <tr class=\"info\"> <th>项目</th> <th>子项目</th> <th>费用</th> <th>领用金额</th> <th>领用人</th> <th>备注</th> </tr> </thead> <tbody> <tr ng-repeat=\"rg in rlist\"> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <select ng-model=\"rg.MainItemId\" ng-change=\"getcurProject(rg, $index)\" class=\"input-border select-width\" ng-disabled=\"isChange\"> <option value=\"\">请选择</option> <option ng-repeat=\"item in projectItems\" value=\"{{item.Id}}\" ng-selected=\"rg.MainItemId == item.Id\">{{item.Name}}</option> </select> </td> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <select ng-model=\"rg.ChildItemId\" class=\"input-border select-width\" ng-disabled=\"isChange\"> <option value=\"\">请选择</option> <option ng-repeat=\"item in rg.contractprojectChildOptions\" value=\"{{item.Id}}\" ng-selected=\"rg.ChildItemId == item.Id\">{{item.Name}}</option> </select> </td> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <input class=\"select-width input-border\" type=\"number\" ng-model=\"rg.Amount\" ng-blur=\"getAmount(rg)\" readonly> </td> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <input class=\"select-width input-border\" type=\"number\" ng-model=\"rg.ReceiveAmount\" ng-disabled=\"canChange\" ng-blur=\"getAmount(rg)\"> </td> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <input class=\"select-width input-border\" type=\"text\" ng-model=\"rg.ReceiveUser\" ng-disabled=\"canChange\"> </td> <td style=\"height:34px;line-height: 20px; padding: 6px 12px\"> <input class=\"select-width input-border\" type=\"text\" ng-model=\"rg.Remark\" ng-disabled=\"canChange\"> </td> </tr> </tbody> </table> <div class=\"modal-footer\"> <button ng-if=\"!canSave\" class=\"btn btn-primary\" type=\"button\" ng-click=\"canCompile()\" ng-disabled=\"isEdit\">编辑</button> <button ng-if=\"canSave\" class=\"btn btn-primary\" type=\"button\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok($event)\">保存并提交</button> </div> </div> </form> </div> </div>"
  );


  $templateCache.put('views/signed_tab4_detail.html',
    "<div class=\"modal-header\"> <span class=\"close\" ng-click=\"cancel()\">&times;</span> <h3 class=\"modal-title\">查看详情</h3> </div> <div class=\"modal-body\"> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr class=\"info\"> <th>序列ID</th> <th>子任务名称</th> <th>当前外勤人员</th> <th>开始时间</th> <th>完成时间</th> <th style=\"width:70px\">状态</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers track by customer.TaskId\"> <td>{{customer.Id}}</td> <td>{{customer.TaskName}}</td> <td>{{customer.OutWorkerName}}</td> <td>{{customer.StartTime|tDateTime}}</td> <td>{{customer.EndTime|tDateTime}}</td> <td>{{customer.Status|outWorkStatus}}</td> </tr> </tbody> </table> </div>"
  );


  $templateCache.put('views/site_ps.html',
    "<div class=\"o-search well well-sm\"> <form class=\"form-inline\"> <div class=\"form-group\"> <label class=\"control-label\" for=\"cusname\">类型</label>： <select class=\"form-control\" ng-model=\"typeId\"> <option value=\"1\">公司核名</option> <option value=\"2\">产品服务</option> <option value=\"3\">贷帐公司</option> <option value=\"4\">孵化器</option> <option value=\"5\">渠道</option> </select> </div> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"searchFn()\">查询</button> </form> </div> <table class=\"table table-striped table-bordered table-hover table-condensed\"> <thead> <th ng-repeat=\"head in headers\" ng-bind=\"head\"></th> <th>公司名称</th> <th>姓名</th> <th>联系电话</th> <th>留言</th> <th>类型</th> <th>留言时间</th> <!-- <th>动作</th> --> </thead> <tbody> <tr ng-repeat=\"row in data\"> <td>{{row.CompanyName}}</td> <td>{{row.Name}}</td> <td>{{row.Mobile}}</td> <td>{{row.Remark}}</td> <td>{{row.TypeId|psType}}</td> <td>{{row.CreateDate.replace('T',' ')}}</td> <!-- <td>\\r\\n                    <a href=\"javascript:;\" uib-tooltip=\"删除\" ng-click=\"delete(row)\"><i class=\"fa fa-pencil-square-o\"></i>删除</a>\\r\\n                </td> --> </tr> </tbody> </table> <div class=\"u-paginator form-inline\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div>"
  );


  $templateCache.put('views/statis_cus.html',
    "<table class=\"table table-striped table-hover table-bordered\" ng-if=\"!user.IsCenter\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>销售</th> <th>签约客户</th> <th>100%</th> <th>80%</th> <th>60%</th> <th>30%</th> <th>10%</th> <th>待筛选</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td>{{::customer.RealName}}</td> <td>{{::customer.BillType}}</td> <td><a href=\"javascript:;\" ng-click=\"open(1,customer)\">{{::customer.AType}}</a></td> <td><a href=\"javascript:;\" ng-click=\"open(2,customer)\">{{::customer.BType}}</a></td> <td><a href=\"javascript:;\" ng-click=\"open(7,customer)\">{{::customer.CType}}</a></td> <td><a href=\"javascript:;\" ng-click=\"open(3,customer)\">{{::customer.DType}}</a></td> <td><a href=\"javascript:;\" ng-click=\"open(4,customer)\">{{::customer.EType}}</a></td> <td><a href=\"javascript:;\" ng-click=\"open(6,customer)\">{{::customer.FType}}</a></td> </tr> <tr> <td>合计</td> <td>{{::total.BillType}}</td> <td>{{::total.AType}}</td> <td>{{::total.BType}}</td> <td>{{::total.CType}}</td> <td>{{::total.DType}}</td> <td>{{::total.EType}}</td> <td>{{::total.FType}}</td> </tr> </tbody> </table> <table class=\"table table-striped table-hover table-bordered\" ng-if=\"user.IsCenter\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>公司名称</th> <th>签约客户</th> <th>100%</th> <th>80%</th> <th>60%</th> <th>30%</th> <th>10%</th> <th>待筛选</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td>{{::customer.CompanyName}}</td> <td>{{::customer.BillType}}</td> <td>{{::customer.AType}}</td> <td>{{::customer.BType}}</td> <td>{{::customer.CType}}</td> <td>{{::customer.DType}}</td> <td>{{::total.EType}}</td> <td>{{::customer.FType}}</td> </tr> <tr> <td>合计</td> <td>{{::total.BillType}}</td> <td>{{::total.AType}}</td> <td>{{::total.BType}}</td> <td>{{::total.CType}}</td> <td>{{::total.DType}}</td> <td>{{::total.EType}}</td> <td>{{::total.FType}}</td> </tr> </tbody> </table>"
  );


  $templateCache.put('views/statis_cus_detail.html',
    "<md-dialog aria-label=\"客户列表\" class=\"md-dialog-lg\"> <form name=\"cusform\" novalidate> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>客户列表</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1 md-padding\" style=\"overflow: hidden\"> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>公司名称</th> <th>联系人</th> <th>联系人电话</th> <th></th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td><a href=\"javascript:;\" ng-click=\"track(customer)\">{{::customer.CompanyName}}</a></td> <td>{{::customer.Connector}}</td> <td>{{::customer.Mobile}}</td> <td><a href=\"javascript:;\" ng-click=\"track(customer)\">查看</a></td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> </div> </div> </md-dialog-content> <md-dialog-actions layout=\"row\" md-colors=\"::{background: 'default-primary-100'}\"> <span flex></span> <md-button ng-click=\"cancel()\">取消</md-button> </md-dialog-actions> </form> </md-dialog>"
  );


  $templateCache.put('views/statis_mate.html',
    "<div class=\"o-search well well-sm\"> <form class=\"form-inline\"> <md-grid-list md-cols=\"1\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">时间范围</span> <md-datepicker ng-model=\"search.start\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> <md-input-container layout=\"row\"> <span style=\"line-height: 36px\">至</span> <md-datepicker ng-model=\"search.end\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> <md-button class=\"md-raised md-primary\" ng-click=\"searchFn()\">查询</md-button> </md-grid-tile> </md-grid-list> </form> </div> <div style=\"width: 400px; float: left\"> <canvas id=\"pie\" class=\"chart chart-pie\" chart-data=\"chart1Options.data\" chart-labels=\"chart1Options.labels\" chart-options=\"chart1Options.options\" chart-click=\"chart1Options.onClick\"> </canvas> <div class=\"text-center\">合计：{{total}}</div> </div> <div style=\"width: 800px; height: 400px; float: left\"> <div class=\"text-center\">{{chart2Options.title}}</div> <canvas id=\"bar\" class=\"chart chart-bar\" chart-data=\"chart2Options.data\" chart-labels=\"chart2Options.labels\" chart-series=\"chart2Options.series\"> </canvas> <div class=\"text-center\">合计：{{total2}}</div> </div>"
  );


  $templateCache.put('views/statis_order.html',
    "<div class=\"o-search well well-sm\"> <form class=\"form-inline\"> <md-grid-list md-cols=\"5\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">开始日期</span> <md-datepicker ng-model=\"search.startdate\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">结束日期</span> <md-datepicker ng-model=\"search.enddate\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"!user.IsCenter\"> <md-input-container layout=\"row\"> <span class=\"md-label\">销售</span> <md-select md-no-asterisk ng-model=\"search.SalesId\" aria-label=\"saler\" class=\"md-select\"> <md-option ng-value=\"''\" selected>全部</md-option> <md-option ng-repeat=\"item in salers\" ng-value=\"item.UserId\">{{item.RealName}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container> <md-button class=\"md-raised md-primary\" ng-click=\"search()\">查询</md-button> </md-input-container> </md-grid-tile> </md-grid-list> </form> </div> <table ng-if=\"!user.IsCenter\" class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>销售</th> <th>小规模数量</th> <th>小规模金额</th> <th>一般纳税人数量</th> <th>一般纳税人金额</th> <th>合计数量</th> <th>合计金额</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td>{{::customer.SalesName}}</td> <td>{{::customer.SmallScale}}</td> <td>{{::customer.SmallAmount}}</td> <td>{{::customer.GeneralTaxpayer}}</td> <td>{{::customer.GeneralAmount}}</td> <td>{{::customer.orderHJ}}</td> <td>{{::customer.AmountHJ}}</td> </tr> <tr> <td>合计</td> <td>{{total.SmallScale}}</td> <td>{{total.SmallAmount}}</td> <td>{{total.GeneralTaxpayer}}</td> <td>{{total.GeneralAmount}}</td> <td>{{total.orderHJ}}</td> <td>{{total.AmountHJ}}</td> </tr> </tbody> </table> <table ng-if=\"user.IsCenter\" class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>直营公司</th> <th>小规模数量</th> <th>小规模金额</th> <th>一般纳税人数量</th> <th>一般纳税人金额</th> <th>合计数量</th> <th>合计金额</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td>{{::customer.SubsidiaryName}}</td> <td>{{::customer.SmallScale}}</td> <td>{{::customer.SmallAmount}}</td> <td>{{::customer.GeneralTaxpayer}}</td> <td>{{::customer.GeneralAmount}}</td> <td>{{::customer.orderHJ}}</td> <td>{{::customer.AmountHJ}}</td> </tr> <tr> <td>合计</td> <td>{{total.SmallScale}}</td> <td>{{total.SmallAmount}}</td> <td>{{total.GeneralTaxpayer}}</td> <td>{{total.GeneralAmount}}</td> <td>{{total.orderHJ}}</td> <td>{{total.AmountHJ}}</td> </tr> </tbody> </table> <!-- <div class=\"u-paginator\">\r" +
    "\n" +
    "    <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\">\r" +
    "\n" +
    "    </uib-pagination>\r" +
    "\n" +
    "    <div class=\"u-pages\">\r" +
    "\n" +
    "        <span>{{paginator.currentPage}}</span> /\r" +
    "\n" +
    "        <span>{{paginator.numPages}}</span> <span>合计:{{paginator.total}}</span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <form name=\"paginatorForm\" novalidate>\r" +
    "\n" +
    "        <div class=\"input-group\">\r" +
    "\n" +
    "            <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" class=\"form-control\">\r" +
    "\n" +
    "            <span class=\"input-group-btn\">\r" +
    "\n" +
    "                        <button class=\"btn btn-default\" type=\"button\"  ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button>\r" +
    "\n" +
    "                    </span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</div> -->"
  );


  $templateCache.put('views/statis_signed.html',
    "<div class=\"o-search well well-sm\"> <form class=\"form-inline\"> <md-grid-list md-cols=\"1\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">时间范围</span> <md-datepicker ng-model=\"search.start\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> <md-input-container layout=\"row\"> <span style=\"line-height: 36px\">至</span> <md-datepicker ng-model=\"search.end\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> <md-button class=\"md-raised md-primary\" ng-click=\"searchFn()\">查询</md-button> </md-grid-tile> </md-grid-list> </form> </div> <div style=\"width: 400px; float: left\"> <canvas id=\"pie\" class=\"chart chart-pie\" chart-data=\"chart1Options.data\" chart-labels=\"chart1Options.labels\" chart-options=\"chart1Options.options\" chart-click=\"chart1Options.onClick\"> </canvas> <div class=\"text-center\">合计：{{total}}</div> </div> <div style=\"width: 800px; height: 400px; float: left\"> <div class=\"text-center\">{{chart2Options.title}}</div> <canvas id=\"bar\" class=\"chart chart-bar\" chart-data=\"chart2Options.data\" chart-labels=\"chart2Options.labels\" chart-series=\"chart2Options.series\"> </canvas>  <div class=\"text-center\">合计：{{total2}}</div> </div>"
  );


  $templateCache.put('views/statis_tend.html',
    "<div class=\"o-search well well-sm\"> <form class=\"form-inline\"> <md-grid-list md-cols=\"1\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label\">时间范围</span> <md-datepicker ng-model=\"search.start\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> <md-input-container layout=\"row\"> <span style=\"line-height: 36px\">至</span> <md-datepicker ng-model=\"search.end\" md-open-on-focus=\"true\"></md-datepicker> </md-input-container> <md-button class=\"md-raised md-primary\" ng-click=\"searchFn()\">查询</md-button> </md-grid-tile> </md-grid-list> </form> </div> <div style=\"width: 400px; float: left\"> <canvas id=\"pie\" class=\"chart chart-pie\" chart-data=\"chart1Options.data\" chart-labels=\"chart1Options.labels\" chart-options=\"chart1Options.options\" chart-click=\"chart1Options.onClick\"> </canvas> <div class=\"text-center\">合计：{{total}}</div> </div> <div style=\"width: 800px; height: 400px; float: left\"> <div class=\"text-center\">{{chart2Options.title}}</div> <canvas id=\"line\" class=\"chart chart-line\" chart-data=\"chart2Options.data\" chart-labels=\"chart2Options.labels\" chart-series=\"chart2Options.series\" chart-options=\"chart1Options.options\"> </canvas> <div class=\"text-center\">合计：{{total2}}</div> </div>"
  );


  $templateCache.put('views/statis_today.html',
    "<div class=\"o-search well well-sm\"> <form class=\"form-inline\"> <md-grid-list md-cols=\"4\" md-row-height=\"52px\"> <md-grid-tile ng-if=\"user.RoleId<11\"> <md-input-container layout=\"row\"> <span class=\"md-label\">分组</span> <md-select md-no-asterisk ng-model=\"search.DepartmentId\" class=\"md-select\" ng-change=\"verifyGroup()\"> <md-option ng-value=\"0\" ng-selected=\"true\">全部</md-option> <md-option ng-repeat=\"g in groups\" ng-value=\"g.DepartmentId\">{{g.DepartmentName}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile md-colspan=\"2\"> <div class=\"text-center\"> <md-input-container> <md-button class=\"md-raised md-primary\" ng-click=\"searchFn()\">查询</md-button> </md-input-container> </div> </md-grid-tile> </md-grid-list> </form> </div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th style=\"width: 40px\" ng-show=\"batIsOpen\"></th> <th>公司名称</th> <th>联系人</th> <th>联系人电话</th> <th>意向度</th> <th>首次跟踪时间</th> <th>最后跟踪时间</th> <th>销售</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td ng-show=\"batIsOpen\"> <md-checkbox ng-model=\"customer.selected\" ng-true-value=\"true\" ng-false-value=\"false\" class=\"md-primary md-align-top-left\" flex> </md-checkbox> </td> <td>{{customer.CompanyName}}</td> <td>{{customer.Connector}}</td> <td>{{customer.Mobile}}</td> <td>{{customer.CustomerTypeName}}</td> <td>{{customer.FirstTrackTime|tDate}}</td> <td>{{customer.LastTrackTime|tDate}}</td> <td>{{customer.SaleName}}</td> </tr> </tbody> </table> <div class=\"u-paginator\"> <uib-pagination total-items=\"paginator.total\" items-per-page=\"paginator.perPage\" boundary-links=\"true\" ng-model=\"paginator.currentPage\" previous-text=\"{{::paginator.previousText}}\" next-text=\"{{::paginator.nextText}}\" first-text=\"{{::paginator.firstText}}\" last-text=\"{{::paginator.lastText}}\" force-ellipses=\"true\" max-size=\"6\" num-pages=\"paginator.numPages\" ng-change=\"pageChanged()\"> </uib-pagination> <div class=\"u-pages\"> <span>{{paginator.currentPage}}</span> / <span>{{paginator.numPages}}</span> &nbsp; <span>合计:{{paginator.total}}</span> </div> <form name=\"paginatorForm\" novalidate> <div class=\"input-group\"> <input type=\"number\" name=\"paginatorInput\" ng-model=\"currentPage\" required min=\"1\" max=\"{{paginator.numPages}}\" class=\"form-control\"> <span class=\"input-group-btn\"> <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"!paginatorForm.$valid\" ng-click=\"setCurrentPage()\">Go!</button> </span> </div> </form> </div>"
  );


  $templateCache.put('views/statis_top.html',
    "<div ng-cloak> <div class=\"text-center statis-header\">个人排行榜</div> <md-content> <md-tabs md-dynamic-height md-border-bottom> <md-tab label=\"到款数\"> <md-content class=\"md-padding clearfix\"> <div style=\"width: 200px; margin: 12px;float: left\" ng-repeat=\"item in typeSList\"> <h4 class=\"text-center\">{{item.CompanyName}}</h4> <ul class=\"list-group\"> <li class=\"list-group-item\" ng-repeat=\"saler in item.salers\"><span class=\"list-header\">{{saler.RealName}}</span><span class=\"list-num\">{{saler.Num}}</span></li> <li class=\"list-group-item\"><span class=\"list-header\">合计：</span><span class=\"list-num\">{{item.total}}</span></li> </ul> </div> </md-content> </md-tab> <md-tab label=\"60%客户数\"> <md-content class=\"md-padding\"> <div layout=\"row\"> <div style=\"width: 200px; margin: 12px;float: left\" ng-repeat=\"item in typeCList\"> <h4 class=\"text-center\">{{item.CompanyName}}</h4> <ul class=\"list-group\"> <li class=\"list-group-item\" ng-repeat=\"saler in item.salers\"><span class=\"list-header\">{{saler.RealName}}</span><span class=\"list-num\">{{saler.Num}}</span></li> <li class=\"list-group-item\"><span class=\"list-header\">合计：</span><span class=\"list-num\">{{item.total}}</span></li> </ul> </div> </div> </md-content> </md-tab> <md-tab label=\"80%客户数\"> <md-content class=\"md-padding\"> <div layout=\"row\"> <div style=\"width: 200px; margin: 12px;float: left\" ng-repeat=\"item in typeBList\"> <h4 class=\"text-center\">{{item.CompanyName}}</h4> <ul class=\"list-group\"> <li class=\"list-group-item\" ng-repeat=\"saler in item.salers\"><span class=\"list-header\">{{saler.RealName}}</span><span class=\"list-num\">{{saler.Num}}</span></li> <li class=\"list-group-item\"><span class=\"list-header\">合计：</span><span class=\"list-num\">{{item.total}}</span></li> </ul> </div> </div> </md-content> </md-tab> </md-tabs> </md-content> </div> <div ng-cloak> <div class=\"text-center statis-header\">分组排行榜</div> <md-content> <md-tabs md-dynamic-height md-border-bottom> <md-tab label=\"{{company.CompanyName}}\" ng-repeat=\"company in companies\"> <md-content class=\"md-padding clearfix\"> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>签约数</th> <th>60%客户</th> <th>80%客户</th> <th>99%客户</th> </tr> </thead> <tbody> <tr> <td> <ul class=\"list-group\"> <li class=\"list-group-item\" ng-repeat=\"saler in company.SList\"><span class=\"list-header\">{{saler.DepartmentName||\"其他\"}}</span><span class=\"list-num\">{{saler.Num}}</span></li> <li class=\"list-group-item\"><span class=\"list-header\">合计：</span><span class=\"list-num\">{{company.total.st}}</span></li> </ul> </td> <td> <ul class=\"list-group\"> <li class=\"list-group-item\" ng-repeat=\"saler in company.CList\"><span class=\"list-header\">{{saler.DepartmentName||\"其他\"}}</span><span class=\"list-num\">{{saler.Num}}</span></li> <li class=\"list-group-item\"><span class=\"list-header\">合计：</span><span class=\"list-num\">{{company.total.ct}}</span></li> </ul> </td> <td> <ul class=\"list-group\"> <li class=\"list-group-item\" ng-repeat=\"saler in company.BList\"><span class=\"list-header\">{{saler.DepartmentName||\"其他\"}}</span><span class=\"list-num\">{{saler.Num}}</span></li> <li class=\"list-group-item\"><span class=\"list-header\">合计：</span><span class=\"list-num\">{{company.total.bt}}</span></li> </ul> </td> <td> <ul class=\"list-group\"> <li class=\"list-group-item\" ng-repeat=\"saler in company.AList\"><span class=\"list-header\">{{saler.DepartmentName||\"其他\"}}</span><span class=\"list-num\">{{saler.Num}}</span></li> <li class=\"list-group-item\"><span class=\"list-header\">合计：</span><span class=\"list-num\">{{company.total.at}}</span></li> </ul> </td> </tr> </tbody> </table> </md-content> </md-tab> </md-tabs> </md-content> </div>"
  );


  $templateCache.put('views/sure.html',
    "<div class=\"modal-body clearfix\"> <div>外勤任务还未创建，确认取消创建？</div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">取消</button> <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">确认</button> </div>"
  );


  $templateCache.put('views/tpl_inputContainer.html',
    "<md-input-container md-theme=\"{{to.theme}}\"> <span class=\"md-label\">{{to.label}}</span> <formly-transclude></formly-transclude> <div ng-messages=\"fc.$error\" ng-show=\"showError\"> <div ng-repeat=\"(name, message) in ::options.validation.messages\" ng-message-exp=\"name\"> {{message(fc.$viewValue, fc.$modelValue, this)}} </div> </div> </md-input-container>"
  );


  $templateCache.put('views/user_group.html',
    "<div layout=\"row\" style=\"height: 100%\"> <div style=\"width: 300px\" class=\"md-padding\"> <md-nav-bar> <md-nav-item md-nav-click=\"\" class=\"md-active\" ng-disabled=\"true\" name=\"page1\">分组列表</md-nav-item> </md-nav-bar> <ul class=\"list-group md-padding\" style=\"max-height: 60%;overflow: auto\"> <li ng-repeat=\"group in groups\" ng-click=\"active(group)\" class=\"list-group-item\" ng-class=\"{active:group.active}\" style=\"cursor: pointer\"><span>{{group.DepartmentName}}</span> <span class=\"close pull-right\" ng-click=\"delete(group.DepartmentId);$event.stopPropagation()\">&times;</span></li> </ul> <div> <md-button class=\"md-raised md-primary\" ng-click=\"add()\">添加</md-button> </div> </div> <div flex class=\"md-padding\"> <div layout=\"row\"> <span flex></span> <md-button class=\"md-raised md-primary\" ng-click=\"addMember()\">增加成员</md-button> </div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>姓名</th> <th style=\"width: 200px\">操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"member in members\"> <td>{{::member.RealName}} <span style=\"color: red\" ng-if=\"member.IsGroupLeader\">(组长)</span></td> <td class=\"table-opt\"> <a href=\"javascript:;\" ng-click=\"setLeader(member)\">设为组长</a> <a href=\"javascript:;\" ng-click=\"deleteMember(member)\">移除成员</a> </td> </tr> </tbody> </table> </div> </div>"
  );


  $templateCache.put('views/user_group_addMember.html',
    "<md-dialog class=\"md-dialog-md\"> <form name=\"cusform\" novalidate> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>增加成员</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1 md-padding\" style=\"overflow: hidden\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">成员选择</span> <md-select md-no-asterisk ng-model=\"selecteds\" required class=\"md-select\" multiple> <md-option ng-repeat=\"user in users\" ng-if=\"!user.hide\" ng-value=\"user.UserId\">{{user.RealName}}</md-option> </md-select> </md-input-container> </md-dialog-content> <md-dialog-actions layout=\"row\" md-colors=\"::{background: 'default-primary-100'}\"> <span flex></span> <md-button class=\"md-raised md-primary\" ng-disabled=\"!selecteds\" ng-click=\"ok($event)\">保存</md-button> <md-button ng-click=\"cancel()\">取消</md-button> </md-dialog-actions> </form> </md-dialog>"
  );


  $templateCache.put('views/user_group_addgroup.html',
    "<md-dialog aria-label=\"添加组\" class=\"md-dialog-md\"> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>添加组</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <form name=\"cusform\" novalidate> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1 md-padding\" style=\"overflow: hidden\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">组名称</span> <input required flex required ng-model=\"name\"> </md-input-container> </md-dialog-content> <md-dialog-actions layout=\"row\" md-colors=\"::{background: 'default-primary-100'}\"> <span flex></span> <md-button class=\"md-raised md-primary\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok($event)\">保存</md-button> <md-button ng-click=\"cancel()\">取消</md-button> </md-dialog-actions> </form> </md-dialog>"
  );


  $templateCache.put('views/user_my.html',
    "<md-toolbar> <div class=\"md-toolbar-tools\"> <h2>修改用户信息</h2> <span flex></span> </div> </md-toolbar> <form name=\"cusform\" novalidate> <md-grid-list md-cols=\"1\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">用户名</span> <input flex ng-model=\"postData.UserName\" class=\"md-input\" disabled> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">联系电话</span> <input required flex ng-model=\"postData.Phone\" class=\"md-input\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-button class=\"md-raised md-primary\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok($event)\">保存</md-button> </md-grid-tile> </md-grid-list> </form> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>修改密码</h2> <span flex></span> </div> </md-toolbar> <form name=\"psdform\" novalidate> <md-grid-list md-cols=\"1\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">原密码</span> <input flex ng-model=\"psdData.Old\" type=\"passWord\" class=\"md-input\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">新密码</span> <input required flex ng-model=\"psdData.New\" type=\"passWord\" class=\"md-input\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">重复新密码</span> <input required flex ng-model=\"psdData.New2\" type=\"passWord\" class=\"md-input\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-button class=\"md-raised md-primary\" ng-disabled=\"psdform.$invalid\" ng-click=\"changePsd($event)\">保存</md-button> </md-grid-tile> </md-grid-list> </form>"
  );


  $templateCache.put('views/user_outworker.html',
    "<div class=\"o-search well well-sm clearfix\"> <md-input-container class=\"pull-right\" style=\"margin:0\"> <md-button class=\"md-raised md-primary\" ng-click=\"open()\">新增用户</md-button> </md-input-container> </div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>姓名</th> <th>联系电话</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"outworker in outworkers\"> <td>{{outworker.Name}}</td> <td>{{outworker.Phone}}</td> <td class=\"table-opt\"> <a href=\"javascript:;\" ng-click=\"open(outworker)\">查看</a> <a href=\"javascript:;\" ng-click=\"delete(outworker)\">删除</a> </td> </tr> </tbody> </table>"
  );


  $templateCache.put('views/user_outworker_view.html',
    "<md-dialog aria-label=\"用户\" class=\"md-dialog-lg\"> <form name=\"cusform\" novalidate> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>{{::title}}</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1 md-padding\" style=\"overflow: hidden\"> <md-grid-list md-cols=\"2\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">姓名</span> <input flex required ng-model=\"postData.Name\" class=\"md-input\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">联系电话</span> <input required flex ng-model=\"postData.Phone\" class=\"md-input\"> </md-input-container> </md-grid-tile> </md-grid-list> </md-dialog-content> <md-dialog-actions layout=\"row\" md-colors=\"::{background: 'default-primary-100'}\"> <span flex></span> <md-button class=\"md-raised md-primary\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok($event)\">保存</md-button> <md-button ng-click=\"cancel()\">取消</md-button> </md-dialog-actions> </form> </md-dialog>"
  );


  $templateCache.put('views/user_users.html',
    "<div class=\"o-search well well-sm clearfix\"> <md-input-container class=\"pull-right\" style=\"margin:0\"> <md-button class=\"md-raised md-primary\" ng-click=\"open()\">新增用户</md-button> </md-input-container> </div> <table class=\"table table-striped table-hover table-bordered\"> <thead> <tr md-colors=\"::{background: 'default-primary-50'}\"> <th>用户名</th> <th>姓名</th> <th>角色</th> <th>联系电话</th> <th>操作</th> </tr> </thead> <tbody> <tr ng-repeat=\"customer in customers\"> <td>{{::customer.UserName}}</td> <td>{{::customer.RealName}}</td> <td>{{::customer.RoleName}}</td> <td>{{::customer.Phone}}</td> <td class=\"table-opt\"> <a href=\"javascript:;\" ng-click=\"open(customer)\">查看</a> <a href=\"javascript:;\" ng-click=\"delete(customer)\">删除</a> </td> </tr> </tbody> </table>"
  );


  $templateCache.put('views/user_view.html',
    "<md-dialog aria-label=\"用户\" class=\"md-dialog-lg\"> <form name=\"cusform\" novalidate> <md-toolbar> <div class=\"md-toolbar-tools\"> <h2>{{::title}}</h2> <span flex></span> <md-button class=\"md-icon-button\" ng-click=\"cancel()\"> <i class=\"fa fa-times\"></i> </md-button> </div> </md-toolbar> <md-dialog-content ng-cloak class=\"clearfix md-whiteframe-glow-z1 md-padding\" style=\"overflow: hidden\"> <md-grid-list md-cols=\"2\" md-row-height=\"52px\"> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">用户名</span> <input flex ng-model=\"postData.UserName\" class=\"md-input\"> </md-input-container> </md-grid-tile> <md-grid-tile ng-if=\"!postData.UserId\"> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">用户密码</span> <input required flex ng-model=\"postData.PassWord\" type=\"passWord\" class=\"md-input\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">姓名</span> <input flex required ng-model=\"postData.RealName\" class=\"md-input\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">联系电话</span> <input required flex ng-model=\"postData.Phone\" class=\"md-input\"> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">用户角色</span> <md-select required md-no-asterisk ng-model=\"postData.RoleId\" class=\"md-select\" ng-change=\"changeRole()\"> <md-option ng-repeat=\"item in roles\" ng-value=\"item.RoleId\">{{item.RoleName}}</md-option> </md-select> </md-input-container> </md-grid-tile> <md-grid-tile> <md-input-container layout=\"row\"> <span class=\"md-label md-required\">用户权限</span> <md-select required ng-model=\"postData.functions\" class=\"md-select\" md-selected-text=\"getSelectedText()\" multiple ng-model-options=\"{trackBy: '$value.Id'}\"> <md-optgroup ng-repeat=\"fun in functionlist\" label=\"{{fun.name}}\"> <md-option ng-repeat=\"item in fun.pages\" ng-value=\"item\">{{item.name}}</md-option> </md-optgroup> </md-select> </md-input-container> </md-grid-tile> </md-grid-list> </md-dialog-content> <md-dialog-actions layout=\"row\" md-colors=\"::{background: 'default-primary-100'}\"> <span flex></span> <md-button class=\"md-raised md-primary\" ng-disabled=\"cusform.$invalid\" ng-click=\"ok($event)\">保存</md-button> <md-button ng-click=\"cancel()\">取消</md-button> </md-dialog-actions> </form> </md-dialog>"
  );

}]);
