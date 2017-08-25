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
