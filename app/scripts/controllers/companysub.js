
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
