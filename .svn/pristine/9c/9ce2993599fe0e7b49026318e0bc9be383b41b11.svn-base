angular.module('crmApp').controller('AccountingManage', ['$scope', '$http', '$state', '$uibModal', 'user', '$q',
    function($scope, $http, $state, $uibModal, user, $q) {
        $scope.user = user.get();

        $scope.detail = function(item) {

            var modalInstance = $uibModal.open({
                templateUrl: 'views/signed_detail.html',
                controller: 'SignedDetail',
                size: 'hg',
                resolve: {
                    contractMsg: function() {
                            return ''
                        }
                        // contractMsg: function() {
                        //     return {
                        //         id: item.Id,
                        //         title: '会计审核管理>查看'
                        //     }
                        // }
                },
                backdrop: 'static'
            });
            modalInstance.result.then(function(result) {
                refreshData();
            }, function() {

            });
        };
        if ($scope.user.Category !== 2 && $scope.user.Category !== 8) {
            delete $scope.taskStatus["1"];
        }

        $scope.search = {
            id: "",
            companyname: "",
            connector: "",
            salesName: "",
            serviceStatus: "",
            accountantStatus: "",
            accountantTaskSource: "",
            contractNo: "",
            contractDateStart: "",
            contractDateEnd: ""
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

        $scope.searchItem = {
            id: "",
            companyname: "",
            connector: "",
            salesName: "",
            serviceStatus: "",
            accountantStatus: "",
            accountantTaskSource: "",
            contractNo: "",
            contractDateStart: "",
            contractDateEnd: ""
        };
        $scope.pageChanged = function() {
            refreshData();
        };

        //set current page
        $scope.setCurrentPage = function() {
            $scope.currentPage = Math.abs(Math.floor($scope.currentPage)) || 1;
            $scope.paginator.currentPage = $scope.currentPage;
            refreshData();
        };

        //日期
        $scope.clear = function() { //清空
            $scope.dt = null;
        };
        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        }
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        }
        $scope.changeDate = function() {

            var d1 = angular.element($("#date1"))[0].value
            var d2 = angular.element($("#date2"))[0].value
            if (d2) {
                var _d1 = d1.replace(/-/ig, "")
                var _d2 = d2.replace(/-/ig, "")
                if ((_d2 - _d1) < 0) {
                    angular.element($("#date1"))[0].value = d2
                }
            }
            $scope.search.contractDateStart = d1
            $scope.search.contractDateEnd = d2
        }
        $scope.searchFn = function() {
            $scope.searchItem.id = $scope.search.id,
                $scope.searchItem.companyname = $scope.search.companyname,
                $scope.searchItem.connector = $scope.search.connector,
                $scope.searchItem.salesName = $scope.search.salesName,
                $scope.searchItem.serviceStatus = $scope.search.serviceStatus,
                $scope.searchItem.accountantStatus = $scope.search.accountantStatus,
                $scope.searchItem.accountantTaskSource = $scope.search.accountantTaskSource,
                $scope.searchItem.contractNo = $scope.search.contractNo,
                $scope.searchItem.contractDateStart = $scope.search.contractDateStart,
                $scope.searchItem.contractDateEnd = $scope.search.contractDateEnd
            refreshData($scope.searchItem);
        }

        function refreshData() {
            // var deferred = $q.defer();
            var searchIt;
            searchIt = $scope.searchItem
            var data = angular.extend({
                offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
                limit: $scope.paginator.perPage
            }, searchIt, data);

            $http.get('api/order/audit/list?' + $.param(data)).success(function(res) {
                $scope.paginator.total = res.data.total;
                $scope.customers = res.data.list;
            });
            // return deferred.promise;
        }
        refreshData();
        $scope.autid = function(item) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/SetFirstPostMonth.html',
                controller: 'SetFirstPostMonth',
                size: '',
                resolve: {
                    contractMsg: function() {
                            return item
                        }
                        // contractMsg: function() {
                        //     return {
                        //         id: item.Id,
                        //         title: '会计审核管理>查看'
                        //     }
                        // }
                },
                backdrop: 'static'
            });
            modalInstance.result.then(function(result) {
                refreshData();
            }, function() {

            });
        }
        $scope.rejected = function(item) {
            if (!confirm("确认驳回？")) return;
            $http.put('/api/order/audit/reject/' + item.Id).success(function(res) {
                if (res.status) refreshData()
            })
        }
    }
]).controller('SetFirstPostMonth', ['$scope', '$http', '$uibModalInstance', 'contractMsg', '$mdDialog', 'user', '$uibModal', function($scope, $http, $uibModalInstance, contractMsg, $mdDialog, user, $uibModal) {
    var date = ''
    var months = contractMsg.OrderMonths + contractMsg.GiftMonth
    $scope.clear = function() { //清空
        $scope.dt = null;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.popup2 = {
        opened: false
    };
    $scope.open1 = function() {
        $scope.popup1.opened = true;
    }
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    }
    $scope.changeDate = function() {
        var d1 = angular.element($("#date1"))[0].value
        
        d1 = d1.split('-')
        d1.length = 2
        date = angular.copy(d1)
        compute(date)
        d1 = d1.join('年')
        d1+='月'
        angular.element($("#date1")).val(d1)
        
    }
    function compute(date){
        date = date.join('-')
        var _date = new Date(date)
        _date.setMonth(_date.getMonth()+Number(months))
        $scope.serveEnd = _date.getFullYear()+'年'+_date.getMonth()+'月'
        // date[0] = Number(date[0])
        // date[1] = Number(date[1])
        // var month = date[1] + Number(months)
        // date[0]+=parseInt(month/12)
        // date[1] = month%12 - 1
        // date[1] = date[1] == 0?12:date[1]
        // date[1] == 0?date[0]-=1:
        // $scope.serveEnd = date.join('-')

    }
    $scope.contractNo = contractMsg.ContractNo
    $scope.serveMonth = months + '个月'
    $scope.close = function(){
        $uibModalInstance.close();
    }
    $scope.sub = function(){
        if(!angular.element($("#date1"))[0].value){
            confirm('请选择首报月！')
            return
        }
        $http.put('/api/order/audit/pass/'+contractMsg.Id+'?accountantTaskSource='+contractMsg.AccountantTaskSource+'&partTax='+contractMsg.PartTax+'&serviceStatus='+contractMsg.ServiceStatus+'&serviceStartDate='+date+'&serviceEndDate='+$scope.serveEnd).success(function(res){
            if(res){
                $uibModalInstance.close();
            }
        })
        
    }
    $scope.dis = function(){
        return 
    }
    $scope.ifClick = function(){
        if(!(contractMsg.AccountantStatus == 2 || contractMsg.AccountantStatus == 3)){
            return true
        }
        return false
    }
}])