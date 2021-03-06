angular.module('crmApp').controller('ContractEndManage', ['$scope', '$http', '$state', 'Excel', '$uibModal', 'user', '$q', function($scope, $http, $state, Excel, $uibModal, user, $q) {
    $scope.user = user.get()
    $scope.contracts = [] // 到期合同列表
    $scope.areas = [] // 所属区域列表
    $scope.markBg = {}

    $scope.companyStatus = { // 服务状态
        // 1: "等待分配",
        2: "未开始",
        3: "外勤服务",
        4: "外勤会计服务",
        5: "会计服务",
        7: "结束",
        8: "终止"
    }

    $scope.companys = [] // 所属公司列表
    $scope.search = { // 查询条件
        SequenceNo: '',
        companyName: '',
        connector: '',
        salesName: '',
        serviceStatus: '',
        contractEndPeriod: '',
        contractDateStart: '',
        contractDateEnd: ''
    }

    // 分页功能开始
    $scope.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    }
    $scope.pageChanged = function() {
        refreshData()
    }
    $scope.setCurrentPage = function() {
      $scope.currentPage = Math.abs(Math.floor($scope.currentPage)) || 1
      $scope.paginator.currentPage = $scope.currentPage
      refreshData()
    }
        // 分页功能结束

    // 获取所属区域
    function getareasList() {
      $http.get('/api/code/area').success(function(res) {
        // console.log(res)
        if(res.status) {
          $scope.areas = res.data
        }
      })
    }
    getareasList()
     function getProjectItem() {
        $http.get('api/contract/getmainitemlist').success(function(res) {
        $scope.projectItems = res.data
        })
    }
    getProjectItem()
    // 查询条件
    $scope.searchFn = function() {
        // console.log($scope.search)
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
        $http.get('api/order/expire/list?' + $.param(data)).success(function(res) {
            // console.log(res)
            $scope.paginator.total = res.data.total;
            $scope.contracts = res.data.list;
            for (var i in $scope.contracts) {
              if ($scope.contracts[i].RemarkSignId == 3) {
                $scope.markBg = {'background-color': 'red'}
              } else if ($scope.contracts[i].RemarkSignId == 2) {
                $scope.markBg = {'background-color': 'blue'}
              } else if ($scope.contracts[i].RemarkSignId == 1) {
                $scope.markBg = {'background-color': '#FFCC33'}
              }
              $scope.contracts[i].markBg = $scope.markBg
            }
            // console.log($scope.contracts)
        })
    }
    refreshData()
    // 挂起操作
    $scope.gq = function(item) {
      var modalInstance = $uibModal.open({
          templateUrl: 'views/contract_refuse.html',
          controller: 'MarkRefuseEnd',
          resolve: {
              contractMsg: function() {
                  return item
              },
              signFrom: function() {
                  return false
              },
              title: function() {
                  return ''
              }
          },
          backdrop: 'static'
      })
      modalInstance.result.then(function(result) {
          refreshData()
      }, function() {

      })
    }
    // 取消挂起
    $scope.cancelgq = function(item) {
      var post = {}
      post.CompanyId = item.CustomerId
      post.SubsidiaryId = item.SubsidiaryId
      post.Description = ''
      $http.put('/api/order/expire/suspendcancel', post).success(function(res) {
        // console.log(res)
        if(res.status) {
          refreshData()
        }
      })
    }
    // 标记操作
    $scope.mark = function(item) {
      var modalInstance = $uibModal.open({
          templateUrl: 'views/contract_refuse.html',
          controller: 'MarkRefuseEnd',
          resolve: {
              contractMsg: function() {
                  return item
              },
              signFrom: function() {
                  return true
              },
              title: function() {
                  return '添加标签'
              }
          },
          backdrop: 'static'
      })
      modalInstance.result.then(function(result) {
          refreshData()
      }, function() {

      });
    }
    // 取消标记
    $scope.cancelmark = function(item) {
      var customerId = item.CustomerId
      $http.put('/api/cancelcompanysign?customerId=' + customerId).success(function(res) {
        // console.log(res)
        if(res.status) {
          refreshData()
        }
      })
    }
    // 查看详情
    $scope.detail = function(item) {
      // 点击请求接口返回 tab1及公共顶部信息
      $http.get('api/contractdetail/' + item.OrderId).success(function(res) {
          if (res.status) {
              data = res.data
              data.dt = item.ContractDate.replace('T'," ").split(' ')[0]
              var modalInstance = $uibModal.open({
                  templateUrl: 'views/contract_end_manage_detail.html',
                  controller: 'SignedDetail',
                  size: 'hg',
                  resolve: {
                      item: function() {
                          return data
                      },
                      projectItems: function() {
                          return $scope.projectItems
                      }
                  },
                  backdrop: 'static'
              })
              modalInstance.result.then(function(result) {

              }, function() {

              });
          }
      })
    }
        // 弹窗关闭
    $scope.cancel = function() {
      $uibModalInstance.dismiss()
    }
        //日期
    $scope.clear = function() {
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
  // 日期功能结束
}]).controller('MarkRefuseEnd', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'signFrom', 'title', 'user', function($scope, $http, $uibModalInstance, contract, signFrom, title, users) {
  var users = users.get()
  // console.log(users)
  // console.log(signFrom, title, 'title')
  // console.log(contract, 'contract')
  $scope.postData = angular.copy(contract)
  $scope.Remark = ''
  $scope.sign = signFrom // 区分挂起还是标记  标记true 挂起false
  $scope.title = title
  // $scope.RemarkSignId = $scope.postData.RemarkSignId
  $scope.tags = {
    '1': '低',
    '2': '中',
    '3': '高'
  }
  // 挂起和标记公用一个页面 需要判断是挂起还是标记 发送不同请求
  $scope.save = function() {
    var post = {}
    if (!$scope.sign) { // 挂起杨城接口
      // console.log($scope.postData)
      post.CompanyId = $scope.postData.CustomerId
      post.SubsidiaryId = $scope.postData.SubsidiaryId
      post.Description = $scope.Remark

      // console.log(post)
      var url = '/api/order/expire/suspend'
      $http.put(url, post).success(function(res) {
        // console.log(res)
        if(res.status) {
          $uibModalInstance.close()
        }
      })
    } else if ($scope.sign) { // 标记陈凯接口
      if ($scope.Remark) {
        var RealName = users.RealName
        $scope.postData.Remark = $scope.postData.Remark + $scope.Remark + '{' + RealName + '}'
      }
      // console.log($scope.postData.RemarkSignId)
      post.CustomerId = $scope.postData.CustomerId
      post.SignVal = $scope.postData.RemarkSignId
      post.Remark = $scope.postData.Remark
      var url = '/api/companySign'
      $http.put(url, post).success(function(res) {
        // console.log(res)
        if(res.status) {
          $uibModalInstance.close()
        }
      })
    }
  }
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  }
}]).controller('SignedDetail', ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'item','projectItems',
    function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, item,projectItems) {
        $scope.postDetail = item
        $scope.canChange = true
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
        $scope.dt = item.dt
        $scope.rlist = [{}]
        $scope.paylist = [{}]
        $scope.projectItems = projectItems
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

        // 弹窗关闭
        $scope.cancel = function() {
            $uibModalInstance.dismiss()
        }
    }
])
