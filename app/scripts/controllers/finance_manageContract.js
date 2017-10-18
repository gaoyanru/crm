angular.module('crmApp').controller('Finance_manageContract', ['$scope', '$http', '$state', '$timeout', 'Excel', '$uibModal', 'user', '$q', function($scope, $http, $state, $timeout, Excel, $uibModal, user, $q) {
  $scope.user = user.get()
  $scope.contracts = [] // 合同列表数据
  $scope.contractStatus = { // 合同状态
    1: "待审核",
    2: "已审核",
    3: "已驳回",
    4: "中止合同"
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
  $scope.forwards = {
    isSelectAll: false
  }

  $scope.search = { // 查询条件
    companyname: '',
    contractNo: '',
    subsidairy: '0',
    contact: '',
    saleName: '',
    contractStatus: '0',
    contractType: '0',
    financeStatus: '0',
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
    $http.get('/api/subsidiary').success(function(res) {
      // console.log(res)
      $scope.companys = res.data.list
    })
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
    // console.log(data, '查询参数')
    $http.get('api/contract/financelist?' + $.param(data)).success(function(res) {
      // console.log(res, 'res')
      $scope.paginator.total = res.data.total
      $scope.contracts = res.data.list
      for (var i in $scope.contracts) {
        $scope.contracts[i].isCheck = false
      }
      // console.log($scope.contracts, '$scope.contracts')
    })
  }
  refreshData()
  // 获取项目下拉选项
  function getProjectItem() {
    $http.get('api/contract/getmainitemlist').success(function(res) {
      // console.log(res, 'res')
      $scope.projectItems = res.data
    })
  }
  getProjectItem()
  // 查看 审核 驳回功能
  $scope.detail = function (item) {
    $http.get('/api/contractdetail/' + item.OrderId).success(function(res) {
      // console.log(res)
      $scope.itemDetail = res.data
      var modalInstance = $uibModal.open({
        templateUrl: 'views/finance_contract_detail.html',
        controller: 'Finance_contract_detail',
        size: 'hg',
        resolve: {
            contractItem: function() {
              return $scope.itemDetail
            },
            projectItems: function() {
              return $scope.projectItems
            }
        }
      })
      modalInstance.result.then(function (result) {
        refreshData()
      }, function () {

      })
    })
  }
  $scope.check = function (item) {
    // 发送请求 审核成功 财务状态变成已审核
    // console.log(item.OrderId)
    var post = {}
    post.contractId = item.OrderId
    post.remark = ''
    post.auditVal = 0
    if (!confirm("确认审核？")) return;
    $http.put('/api/contract/financeaudit', post).success(function(res) {
      // console.log(res)
      if(res.status) {
        alert('审核成功')
        refreshData()
      }
    })
    // item.accountstatus = 2
    // item.isCheck = true
  }
  $scope.refuse = function (item) {
    var modalInstance = $uibModal.open({
      templateUrl: 'views/contract_refuse.html',
      controller: 'ContractRefuse',
      size: "",
      resolve: {
        contractMsg: function() {
          return item
        }
      },
      backdrop: 'static'
    })
    modalInstance.result.then(function(result) {
      refreshData()
      // item.accountstatus = 3
      // item.isCheck = true
    }, function() {

    })
  }
  // 批量操作
  $scope.selectAll = function () {
    if ($scope.forwards.isSelectAll) {
        _.each($scope.contracts, function (item) {
          if (item.FinancialAudit == 1) item.selected = true;
        });
    } else {
        _.each($scope.contracts, function (item) {
          item.selected = false;
        });
    }
  }
  $scope.checkAll = function () {
    var ids = _.map(_.filter($scope.contracts, function (t) {
        return t.FinancialAudit == 1 && t.selected;
    }), function (item) {
        return item.OrderId
    });
    // console.log(ids, 'ids')
    if (ids.length === 0) {
        $scope.forwards.isSelectAll = false
        return
    }
    if (!confirm("确认批量审核？")) return;
    // 发送请求
    $http.put('/api/contract/financeauditlist', ids).success(function(res) {
      if (res.status) {
        alert('审核成功')
        refreshData()
        $scope.forwards.isSelectAll = false
      }
    })
    // $http.put('/api/childtask/trans?ids=' + ids + '&outworkerId=' + $scope.forwards.forwardUserId).success(function (res) {
    //   if (res.status) {
    //     refreshData();
    //     $scope.forwards.isSelectAll = false;
    //   }
    // })
  }

  // 导出excel表格
  $scope.toExcel = function() {
    var downItem = $scope.search
    $http.get('/api/financelistcount?' + $.param(downItem)).success(function(res) {
      // console.log(res)
      if (res.status) {
        var url = '/api/download/financelist?subsidairy=' + downItem.subsidairy + '&contractNo=' + downItem.contractNo + '&companyname=' + downItem.companyname + '&contact=' + downItem.contact + '&saleName=' + downItem.saleName + '&contractStatus=' + downItem.contractStatus + '&contractType=' + downItem.contractType + '&financeStatus=' + downItem.financeStatus + '&starttime=' + downItem.starttime + '&endtime=' + downItem.endtime
        window.open(url)
        // if (res.data > 700) {
        //   alert('总条数过多，请缩小查询范围')
        // } else {
        //   var url = '/api/download/financelist?subsidairy=' + downItem.subsidairy + '&contractNo=' + downItem.contractNo + '&companyname=' + downItem.companyname + '&contact=' + downItem.contact + '&saleName=' + downItem.saleName + '&contractStatus=' + downItem.contractStatus + '&contractType=' + downItem.contractType + '&financeStatus=' + downItem.financeStatus + '&starttime=' + downItem.starttime + '&endtime=' + downItem.endtime
        //   window.open(url)
        // }
      }
    })
      // console.log(downItem.subsidairy,
      // downItem.contractNo,
      // downItem.companyname,
      // downItem.contact,
      // downItem.saleName,
      // downItem.contractStatus,
      // downItem.contractType,
      // downItem.financeStatus,
      // downItem.starttime,
      // downItem.endtime)
      // subsidairy=&contractType=&financeStatus=&contractStatus=&contractNo=&companyname=&contact=&saleName=&starttime=&endtime=
      // var url = '/api/download/financelist?subsidairy=' + downItem.subsidairy + '&contractNo=' + downItem.contractNo + '&companyname=' + downItem.companyname + '&contact=' + downItem.contact + '&saleName=' + downItem.saleName + '&contractStatus=' + downItem.contractStatus + '&contractType' + downItem.contractType + '&financeStatus=' + downItem.financeStatus + '&starttime=' + downItem.starttime + '&endtime=' + downItem.endtime
      // var url = `/api/download/financelist?subsidairy=${downItem.subsidairy || 0}&contractNo=${downItem.contractNo || ''}&companyname=${downItem.companyname || ''}&contact=${downItem.contact || ''}&saleName=${downItem.saleName || ''}&contractStatus=${downItem.contractStatus || 0}&contractType=${downItem.contractType || 0}&financeStatus=${downItem.financeStatus || 0}&starttime=${downItem.starttime || ''}&endtime=${downItem.endtime || ''}`
      // console.log(url)
      // window.open(url)

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
}]).controller('Finance_contract_detail', ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'contractItem', 'projectItems',
function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, contractItem, projectItems) {
  // console.log(contractItem, 'contractItem')
  // console.log(projectItems, 'projectItems')
  var user = UserServe.get()
  $scope.user = UserServe.get()
  $scope.canChange = true
  $scope.rlist = [{}]
  $scope.paylist = [{}]
  $scope.postDetail = {}
  $scope.projectItems = projectItems

  contractItem.ContractDate = new Date(contractItem.ContractDate)
  $scope.postDetail = contractItem
  // 处理项目list
  for (var i in $scope.postDetail.Details) {
    $scope.postDetail.Details[i].MainItemId = $scope.postDetail.Details[i].MainItemId + ''
    $scope.postDetail.Details[i].ChildItemId = $scope.postDetail.Details[i].ChildItemId + ''
    var contractprojectChildOptions = []
    for (var j in $scope.projectItems) {
      // console.log($scope.postDetail.Details[i].MainItemId == $scope.projectItems[j].Id)
      if ($scope.postDetail.Details[i].MainItemId == $scope.projectItems[j].Id) {
        $scope.postDetail.Details[i].contractprojectChildOptions = $scope.projectItems[j].Children
      }
    }
  }
  $scope.rlist = $scope.postDetail.Details
  // 处理支付方式list
  for (var i in $scope.postDetail.PayInfoList) {
    $scope.postDetail.PayInfoList[i].PayTypeId = $scope.postDetail.PayInfoList[i].PayTypeId + ''
    $scope.postDetail.PayInfoList[i].PayTime = new Date($scope.postDetail.PayInfoList[i].PayTime)
  }
  $scope.paylist = $scope.postDetail.PayInfoList

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
    // console.log($scope.postDetail.OrderId)
    var post = {}
    post.contractId = $scope.postDetail.OrderId
    post.remark = ''
    post.auditVal = 0
    if (!confirm("确认审核？")) return;
    $http.put('/api/contract/financeaudit', post).success(function(res) {
      // console.log(res)
      if(res.status) {
        alert('审核成功')
        $uibModalInstance.close()
      }
    })
    // $http.post().success(function (res) {
    //   if (res.status) {
    //     $scope.postDetail.financestatus = 2
    //   }
    // })
    // $scope.postDetail.financestatus = 2
    // $scope.postDetail.isCheck = true
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
      $uibModalInstance.close()
      // $scope.postDetail.isCheck = true
      // $scope.postDetail.financestatus = 3
    }, function() {

    });
  }
  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
  }
}]).controller('ContractRefuse', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'user', function($scope, $http, $uibModalInstance, contract, users) {
  var users = users.get()
  // console.log(users)
  // console.log(contract, 'contract')
  $scope.postData = contract
  $scope.Remark = ''
  console.log($scope.postData.Remark, '$scope.postData.Remark')
  $scope.save = function() {
    if ($scope.Remark) {
      var RealName = users.RealName
      if ($scope.postData.Remark) {
        $scope.Remark = $scope.postData.Remark + $scope.Remark + '{' + RealName + '}'
      } else {
        $scope.Remark = $scope.Remark + '{' + RealName + '}'
      }
    }
    var post = {}
    post.contractId = $scope.postData.OrderId
    post.remark = $scope.Remark
    post.auditVal = 1
    $http.put('/api/contract/financeaudit', post).success(function(res) {
      // console.log(res)
      if (res.status) {
          $uibModalInstance.close();
      }
    })
  }
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  }
}])
