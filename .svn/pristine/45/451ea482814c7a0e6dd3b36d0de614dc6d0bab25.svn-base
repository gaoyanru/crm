angular.module('crmApp').controller('Signed_manage', ['$scope', '$http', '$state', '$uibModal', 'user', '$q', function($scope, $http, $state, $uibModal, user, $q) {
  $scope.user = user.get()
  $scope.contracts = [] // 合同列表数据
  $scope.contractStatus = { // 合同状态
    1: "待审核",
    2: "已审核",
    3: "已驳回",
    4: "终止合同"
  }
  $scope.contractType = { // 合同类型
    1: "新增",
    2: "续费"
  }
  $scope.accountStatus = { // 财务审核
    1: "待审核",
    2: "已审核",
    3: "已驳回"
  }
  $scope.companys = [] // 所属公司列表

  $scope.search = { // 查询条件
    belongCompany: '',
    contractId: '',
    firstParty: '',
    contacts: '',
    salesId: '',
    contractstatus: '',
    contracttype: '',
    accountstatus: '',
    starttime: '',
    endtime: ''
  }

  // 分页功能开始
  $scope.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 15,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
  }
  $scope.pageChanged = function () {
      refreshData()
  }
  $scope.setCurrentPage = function () {
      $scope.currentPage = Math.abs(Math.floor($scope.currentPage)) || 1
      $scope.paginator.currentPage = $scope.currentPage
      refreshData()
  }
  // 分页功能结束

  // 获取所属公司列表
  function getcompanysList() {
    $scope.companys = [
      {id: 1, CompanyName: '北京爱康鼎'},
      {id: 2, CompanyName: '上海爱康鼎'},
      {id: 3, CompanyName: '天津爱康鼎'},
      {id: 4, CompanyName: '河南爱康鼎'},
    ]
    // $http.get().success(function (res) {
    //   console.log(res)
    //   $scope.companys = res.data
    // })
  }
  getcompanysList()

  // 查询条件
  $scope.searchFn = function () {
    console.log($scope.search)
    refreshData()
  }
  // 合同列表
  function refreshData() {
    var searchIt;
    searchIt = $scope.search
    var data = angular.extend({
        offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
        limit: $scope.paginator.perPage
    }, searchIt, data);
    console.log(data, '查询参数')
    $scope.contracts = [{
      companyName: '北京爱康鼎',
      contractId: 'BJ-A00001',
      firstParty: '北京爱康鼎科技有限公司',
      contacts: '王女士',
      salesId: '李大锤',
      contracttype: 1,
      contractstatus: 2,
      contractSignDate: '2017/06/07',
      contractSignAmount: '36000.00',
      accountstatus: 2,
      operator: '孙小妹',
      lastChangeDate: '2017/06/07 15:40:36'
    }]
    // $http.get('api/maintask?' + $.param(data)).success(function (res) {
    //     console.log(res)
    //     $scope.paginator.total = res.data.total;
    //     $scope.contracts = res.data.list;
    // });
  }
  refreshData()

  //日期
  $scope.clear = function () {
      $scope.dt = null;
  };
  $scope.popup1 = {
      opened: false
  };
  $scope.popup2 = {
      opened: false
  };
  $scope.open1 = function () {
      $scope.popup1.opened = true;
  }
  $scope.open2 = function () {
      $scope.popup2.opened = true;
  }
  $scope.changeDate = function () {
    var d1 = angular.element($("#date1"))[0].value
    var d2 = angular.element($("#date2"))[0].value
    if (d2) {
        var _d1 = d1.replace(/-/ig, "")
        var _d2 = d2.replace(/-/ig, "")
        if ((_d2 - _d1) < 0) {
            angular.element($("#date1"))[0].value = d2
        }
    }
    $scope.search.starttime = d1
    $scope.search.endtime = d2
  }
  // 日期功能结束
}])
