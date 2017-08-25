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
