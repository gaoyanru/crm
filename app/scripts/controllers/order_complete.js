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
