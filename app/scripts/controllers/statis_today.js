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
