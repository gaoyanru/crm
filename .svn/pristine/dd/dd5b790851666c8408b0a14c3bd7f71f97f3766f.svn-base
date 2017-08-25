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
