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
