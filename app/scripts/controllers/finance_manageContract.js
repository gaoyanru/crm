angular.module('crmApp').controller('Finance_manageContract', ['$scope', '$http', '$state', '$uibModal', 'user', '$q', function($scope, $http, $state, $uibModal, user, $q) {
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
      accountstatus: 1,
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
  // 查看 审核 驳回功能
  $scope.detail = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'views/finance_contract_detail.html',
      controller: 'Finance_contract_detail',
      size: 'hg',
      resolve: {
        contractItem: function() {
          // return item
          var data = {
            belongCompanyName: '北京爱康鼎',
            contractstatus: 1,
            financestatus: 0,
            CompanyName: '爱康鼎',
            Connector: 'gyr',
            Mobile: '1567885454',
            SaleName: 'asdi',
            contractId: '11223',
            contracttype: 1,
            contractDate: 12,
            contractGift: 22,
            signTime: '2017-12-23',
            rlist: [
              {contractproject: 1, contractprojectChild: 2, projectAmount: 100},
              {contractproject: 2, contractprojectChild: 1, projectAmount: 200},
              {contractproject: 3, projectAmount: 100},
              {contractproject: 4, contractprojectChild: 2, projectAmount: 300}
            ],
            chargeAmount: 100,
            financeAmount: 200,
            outworkAmount: 300,
            collectionAmount: 400,
            amount: 1000,
            Remark: '你好按时到年底[管理员]',
            paylist: [
              {payType: 1, payId: '6212 2502 0000 2533 618', time: '2017-03-29', payimg: 'https://pilipa.oss-cn-beijing.aliyuncs.com/FileUploads/pay/201708/3cPE46BEJj.png'},
              {payType: 2, payId: '6212 2502 0000 2533 618', time: '2017-03-29', payimg: 'https://pilipa.oss-cn-beijing.aliyuncs.com/FileUploads/pay/201708/3cPE46BEJj.png'},
              {payType: 4, payId: '6212 2502 0000 2533 618', time: '2017-03-29', payimg: 'https://pilipa.oss-cn-beijing.aliyuncs.com/FileUploads/pay/201708/3cPE46BEJj.png'}
            ]
          }
          for(var i in data.rlist){
            var contractprojectChildOptions = {};
            switch (data.rlist[i].contractproject) {
              case 1:
                contractprojectChildOptions['1'] = '小规模'
                contractprojectChildOptions['2'] = '一般纳税人'
                break
              case 2:
                contractprojectChildOptions['1'] = '税控器托管'
                contractprojectChildOptions['2'] = '税务其他项目'
                break
              case 4:
                contractprojectChildOptions['1'] = '地址费'
                contractprojectChildOptions['2'] = '刻章费用'
                break
            }
            data.rlist[i].contractprojectChildOptions =  contractprojectChildOptions
          }
          return data
        }
      }
    })
    modalInstance.result.then(function (result) {
      console.log('刷新页面')
      refreshData()
    }, function () {

    })
  }
  $scope.check = function (item) {
    // 发送请求 审核成功 财务状态变成已审核
    item.accountstatus = 2
  }
  $scope.refuse = function (item) {
    var modalInstance = $uibModal.open({
      templateUrl: 'views/contract_refuse.html',
      controller: 'ContractRefuse',
      size: "lg",
      resolve: {
        contractMsg: function() {
          return item
        }
      },
      backdrop: 'static'
    })
    modalInstance.result.then(function(result) {
      item.accountstatus = 3
    }, function() {

    })
  }
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
}]).controller('Finance_contract_detail', ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'contractItem',
function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, contractItem) {
  console.log(contractItem, 'contractItem')
  var user = UserServe.get()
  $scope.user = UserServe.get()
  $scope.canChange = true
  $scope.isClick = false
  $scope.rlist = [{}]
  $scope.paylist = [{}]
  $scope.postDetail = {}

  contractItem.signTime = new Date(contractItem.signTime)
  $scope.postDetail = contractItem

  for (var i in $scope.postDetail.rlist) {
    $scope.postDetail.rlist[i].contractproject = $scope.postDetail.rlist[i].contractproject + ''
  }
  $scope.rlist = $scope.postDetail.rlist
  for (var i in $scope.postDetail.paylist) {
    $scope.postDetail.paylist[i].payType = $scope.postDetail.paylist[i].payType + ''
    $scope.postDetail.paylist[i].time = new Date($scope.postDetail.paylist[i].time)
  }
  $scope.paylist = $scope.postDetail.paylist

  $scope.contractprojects = {
    1: '记账报税',
    2: '财务服务费',
    3: '外勤服务费',
    4: '代收费'
  }
  $scope.payTypes = {
    1: '银行卡转账',
    2: '拉卡拉',
    3: '微信',
    4: '支付宝',
    5: '现金'
  }
  $scope.contractType = { // 合同类型
    1: "新增",
    2: "续费"
  }
  $scope.check = function () { // 财务审核
    // 点击审核发送请求 成功后弹框关闭 刷新数据列表 财务状态变成已审核
    // $http.post().success(function (res) {
    //   if (res.status) {
    //     $scope.postDetail.financestatus = 2
    //   }
    // })
    $scope.postDetail.financestatus = 2
    $scope.isClick = true
    // $uibModalInstance.dismiss('cancel')
  }
  $scope.refuse = function () { // 审单人员驳回
    // 点击驳回 弹框写原因后发送请求 此时有原因把原因拼接到备注里 然后整体全部数据发给后台 返回成功后 合同状态变成已驳回 财务状态无
    var modalInstance = $uibModal.open({
      templateUrl: 'views/contract_refuse.html',
      controller: 'ContractRefuse',
      size: "lg",
      resolve: {
        contractMsg: function() {
          return $scope.postDetail
        }
      },
      backdrop: 'static'
    })
    modalInstance.result.then(function(result) {
      $scope.isClick = true
      $scope.postDetail.financestatus = 3
    }, function() {

    });
  }
  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
  }
}]).controller('ContractRefuse', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'user', function($scope, $http, $uibModalInstance, contract, users) {
  var users = users.get()
  console.log(users)
  console.log(contract, 'contract')
  $scope.postData = contract
  $scope.Remark = ''
  $scope.save = function() {
    if ($scope.Remark) {
      var RealName = users.RealName
      $scope.postData.Remark = $scope.postData.Remark + $scope.Remark + '{' + RealName + '}'
    }
    console.log($scope.postData)
    $uibModalInstance.close('cancel');
    // $http.post().success(function(res) {
    //     if (res.status) {
    //         $uibModalInstance.close('cancel');
    //     }
    // })
  }
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  }
}])
