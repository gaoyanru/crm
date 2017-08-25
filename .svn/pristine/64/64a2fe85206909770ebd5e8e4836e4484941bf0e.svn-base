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
