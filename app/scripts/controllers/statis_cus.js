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
