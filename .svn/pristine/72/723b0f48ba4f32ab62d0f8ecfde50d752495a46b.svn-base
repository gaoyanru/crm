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
