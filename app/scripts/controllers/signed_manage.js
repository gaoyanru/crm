angular.module('crmApp').controller('Signed_manage', ['$scope', '$http', '$state', 'Excel', '$uibModal', 'user', '$q', function($scope, $http, $state, Excel, $uibModal, user, $q) {
  $scope.user = user.get()
  $scope.customers = [] // 签约客户列表数据
  $scope.areas = [] // 所属区域列表
  $scope.markBg = {}

  $scope.companyStatus = { // 服务状态
    1: "待分配",
    2: "未开始",
    3: "外勤服务",
    4: "外勤会计服务",
    5: "会计服务",
    7: "结束",
    8: "中止"
  }
  $scope.outworkStatus = { // 外勤处理状态
    1: "待审核",
    2: "已审核",
    3: '已驳回'
  }
  $scope.accountStatus = { // 会计处理状态
    1: "待审核",
    2: "已审核",
    3: "已驳回",
    5: "部分审核"
  }
  $scope.companys = [] // 所属公司列表

  $scope.search = { // 查询条件
    sequenceNumber: '',
    companyname: '',
    contact: '',
    saleName: '',
    serviceStatus: '0',
    areaCode: '',
    outworkStatus: '0',
    accountStatus: '0',
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

  // 查询条件
  $scope.searchFn = function () {
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
    // console.log(data, '查询参数')
    $http.get('api/signcustomerlist?' + $.param(data)).success(function(res) {
      // console.log(res, 'res')
      $scope.paginator.total = res.data.total
      $scope.customers = res.data.list
      for (var i in $scope.customers) {
        if ($scope.customers[i].RemarkSignId == 3) {
          $scope.markBg = {'background-color': 'red'}
        } else if ($scope.customers[i].RemarkSignId == 2) {
          $scope.markBg = {'background-color': 'blue'}
        } else if ($scope.customers[i].RemarkSignId == 1) {
          $scope.markBg = {'background-color': '#FFCC33'}
        }
        $scope.customers[i].markBg = $scope.markBg
      }
      // console.log($scope.customers)
    })

  }
  refreshData()

  // 挂起操作
  $scope.gq = function(item) {
    var modalInstance = $uibModal.open({
      templateUrl: 'views/contract_refuse.html',
      controller: 'MarkRefuse',
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
      // 挂起后公司状态跟新为挂起
      refreshData()
      // item.companystatus = 6
    }, function() {

    });
  }
  // 取消挂起
  $scope.cancelgq = function(item) {
    var post = {}
    post.CompanyId = item.customerId
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
      controller: 'MarkRefuse',
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
      // 挂起后公司状态跟新为挂起
      refreshData()
      // item.companystatus = 6
    }, function() {

    });
  }
  // 取消标记
  $scope.cancelmark = function(item) {
    // 取消标记  点击发送请求 修改tagStatus值为空
    var customerId = item.customerId
    $http.put('/api/cancelcompanysign?customerId=' + customerId).success(function(res) {
      // console.log(res)
      if(res.status) {
        refreshData()
      }
    })
  }
  // 查看详情
  $scope.detail = function(item) {
    // 点击请求接口返回 tab1信息 然后顶部公共部分需要从列表带过去
    var customerId = item.customerId
    // var PartTax = item.PartTax
    // console.log(customerId, 'customerId')
    $http.get('/api/customerdetail/' + customerId).success(function(res) {
      // console.log(res)
      var data = res.data
      if(res.status) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/signed_detail.html',
          controller: 'SignedDetail1',
          size: 'hg',
          resolve: {
            contractMsg: function() { // tab1选项卡内容
              return data
            },
            item: function() { // 顶部公共信息带过去
              return item
            },
            areas: function() { // 所属区域下拉列表
              return $scope.areas
            }
          },
          backdrop: 'static'
        })
        modalInstance.result.then(function(result) {
          refreshData()
        }, function() {

        });
      }
    })
  }
  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
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
}]).controller('MarkRefuse', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'signFrom', 'title', 'user',
function($scope, $http, $uibModalInstance, contract, signFrom, title, users) {
  var users = users.get()
  // console.log(users)
  // console.log(signFrom, title, 'title')
  // console.log(contract, 'contract')
  $scope.postData = angular.copy(contract)
  $scope.Remark = ''
  $scope.sign = signFrom // 区分挂起还是标记  标记true 挂起false
  $scope.title = title
  $scope.tags = {
    1: '低',
    2: '中',
    3: '高'
  }
  // 挂起和标记公用一个页面 需要判断是挂起还是标记 发送不同请求
  $scope.save = function() {
    var post = {}
    if (!$scope.sign) { // 挂起
      console.log($scope.postData, '$scope.postData')
      post.CompanyId = $scope.postData.customerId
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
    } else if ($scope.sign) { // 标记
      // if ($scope.Remark) {
      //   var RealName = users.RealName
      //   $scope.postData.Remark = $scope.postData.Remark + $scope.Remark + '{' + RealName + '}'
      // }
      if (!$scope.postData.RemarkSignId) {
        alert('请选择标记状态')
      } else {
        post.CustomerId = $scope.postData.customerId
        post.SignVal = $scope.postData.RemarkSignId
        post.Remark = $scope.Remark
        // console.log(post)
        var url = '/api/companySign'
        $http.put(url, post).success(function(res) {
          // console.log(res)
          if(res.status) {
            $uibModalInstance.close()
          }
        })
      }
    }
  }
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  }
}]).controller('SignedDetail1', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'FileUploader','$filter', 'contractMsg', 'item', 'areas', 'user', function($scope, $http, $uibModal, $uibModalInstance, FileUploader, $filter, contract, item, areas, users) {
  var users = users.get()
  // console.log(users)
  // console.log(contract, 'contract')
  $scope.isAccouting = false;
  $scope.title = '签约客户管理>查看';
  $scope.isEdit = true;
  $scope.postDetail = {} // tab1内容
  $scope.item = item // 顶部公共信息 列表带过来
  console.log($scope.item, '$scope.item')
  $scope.industries = [] // 所属行业列表
  $scope.areas = areas // 所属区域列表
  $scope.contractTab = [] // 合同信息lsit页卡2
  $scope.contractTab3 = [] // 合同信息lsit页卡3

  contract.BusnissDeadline = new Date(contract.BusnissDeadline)
  contract.RegisterDate = new Date(contract.RegisterDate)
  // contract.IndustryId = 1
  // contract.AreaCode = '110101'
  // contract.AddedValue = 1
  // console.log(contract.BusnissDeadline, contract.RegisterDate)
  if (new Date(contract.BusnissDeadline).getTime() < 0) {
    contract.BusnissDeadline = ''
  }
  if (new Date(contract.RegisterDate).getTime() < 0) {
    contract.RegisterDate = ''
  }
  // contract.BusnissDeadline = contract.BusnissDeadline + ''
  // if (contract.BusnissDeadline.substr(0, 4) == "0001") {
  //   contract.BusnissDeadline = ''
  // } else {
  //   contract.BusnissDeadline.replace('T', ' ')
  // }
  $scope.postDetail = contract

  // console.log($scope.item, '$scope.item')
  $scope.customerId = $scope.item.customerId
  // console.log($scope.customerId, 'customerId')

  // DisableCommitAccount提交会计 DisableOutWorkCommitAccount提交外勤 1禁止 0可以提交
  // console.log($scope.item.DisableCommitAccount, $scope.item.DisableOutWorkCommitAccount, '提交会计外勤')
  // 获取所属行业列表信息
  function getIndustries() {
    $http.get('/api/industry').success(function(res) {
      // console.log(res)
      if(res.status) {
        $scope.industries = res.data
      }
    })
  }
  getIndustries()
  // 合同详情 页卡2 3及页卡2 3详情 都用原来老接口
  function gettabmsg() {
    var OrderId = $scope.item.OrderId
    $http.get('/api/contractdetail/' + OrderId).success(function(res) {
      // console.log(res)
      $scope.itemDetail23 = res.data
    })
  }
  gettabmsg()

  $scope.postDataOut = {} // 提交外勤需要这些字段
  $scope.postDataOut.CustomerId = $scope.customerId
  $scope.postDataOut.AreaCode = $scope.postDetail.AreaCode
  $scope.postDataOut.OrderId = $scope.item.OrderId
  // console.log($scope.postDataOut, '$scope.postDataOut')
  // 审核提交会计
  $scope.submitAccount = function() {
    var post = {}
    post.orderId = $scope.itemDetail23.OrderId
    post.partTax = ''
    // 部分提交 会计驳回 外勤待审核 再次提交会计时候 只能选择部分 禁用全部
    var isOnlyPartChoose
    if ($scope.item.DisableCommitAccount == 0 && $scope.item.DisableOutWorkCommitAccount == 1) {
      isOnlyPartChoose = true
    } else {
      isOnlyPartChoose = false
    }

    var modalInstance = $uibModal.open({
      templateUrl: 'views/order_outworker_detail_sub.html',
      controller: 'SubmitAccount',
      size: '',
      resolve: {
        post: function() { // 提交会计传递参数
          return post
        },
        postDataOut: function() {
          return $scope.postDataOut
        },
        isOnlyPartChoose: function() {
          return isOnlyPartChoose
        },
        item: function() {
          return $scope.item
        }
      },
      backdrop: 'static'
    })
    modalInstance.result.then(function(result) {
      // 成功时关闭弹窗刷新页面
      $uibModalInstance.close()
      // 提交会计完成后操作 1.选择资料齐全提交 需要把两个按钮都禁止 2.部分提交需要弹窗选国地税报到外勤任务 如果不选需要禁止会计提交但是提交外勤可以点击 让他可以分配外勤任务 提交完成外勤任务后按钮不可点

    }, function() {

    });
  }
  // 审核提交外勤
  $scope.submitOutwork = function() {
    // 提交外勤完毕后按钮禁止
    var modalInstance = $uibModal.open({
        templateUrl: 'views/order_outworker_add.html',
        controller: 'Signed_outworker_add',
        backdrop: 'static',
        size: 'hg',
        resolve: {
            isShow: function () {
              return true
            },
            postDataOut: function () {
              return $scope.postDataOut
            },
            item: function() {
              return $scope.item
            }
        }
    });
    modalInstance.result.then(function(result) {
        // 成功时关闭弹窗刷新页面
        $uibModalInstance.close()
    }, function(result) {

    })
  }
  // 弹框关闭
  $scope.cancel = function() {
    $uibModalInstance.dismiss()
  }
  // 编辑tab1公司信息
  $scope.edit = function() {
    $scope.isEdit = false
  }
  // 编辑完成
  $scope.save = function() {
    // 保存提交后台信息 后变成不可编辑
    if (!$scope.postDetail.Connector) {
      alert ('请填写公司联系人')
      return
    }
    if (!$scope.postDetail.Mobile) {
      alert ('请联系人电话')
      return
    }
    if (!$scope.postDetail.AreaCode) {
      alert ('请选择所属区域')
      return
    }
    console.log($scope.item)
    var OrderId = $scope.item.OrderId
    var url = '/api/Customer/' + OrderId + '?verify=1'
    if ($scope.postDetail.NoDeadLine) {
      $scope.postDetail.NoDeadLine = 1
    } else {
      $scope.postDetail.NoDeadLine = 0
    }
    // console.log($scope.postDetail, '保存提交')
    $http.put(url, $scope.postDetail).success(function(res) {
      // console.log(res)
      if(res.status) {
          $uibModalInstance.close()
      }
    })
  }
  // 图片上传
  var uploadUrl = 'https://pilipa.oss-cn-beijing.aliyuncs.com';
  $http.get('/api/signkey').success(function (res) {
      delete res.data.Filename;
      delete res.data.key;
      delete res.data.callback;
      delete res.data.expire;
      delete res.data.Host;
      $scope.signkey = res.data;
  })
  $scope.uploader1 = new FileUploader({
      url: uploadUrl,
      autoUpload: true
  })
  $scope.uploader2 = new FileUploader({
      autoUpload: true,
      url: uploadUrl
  })
  $scope.uploader1.onCompleteItem = function (fileItem, response, status, headers) {
      $scope.postDetail.PersonCardPath = uploadUrl + '/' + $scope._key1;
  }
  $scope.uploader2.onCompleteItem = function (fileItem, response, status, headers) {
      $scope.postDetail.BusinessLicense = uploadUrl + '/' + $scope._key2;
  }
  $scope.uploader1.onBeforeUploadItem = function (item) {
    var key = buildKey(1, item.file.name);
    item.formData.push({
        key: key
    });
    _.each($scope.signkey, function (value, key) {
        var temp = {};
        temp[key] = value;
        item.formData.push(temp);
    });
    $scope._key1 = key;
  }
  $scope.uploader2.onBeforeUploadItem = function (item) {
    var key = buildKey(2, item.file.name)
    item.formData.push({
        key: key
    })
    _.each($scope.signkey, function (value, key) {
        var temp = {}
        temp[key] = value
        item.formData.push(temp)
    });
    $scope._key2 = key
  }
  $scope.uploader1.onErrorItem = function () {
    alert('上传失败!')
  }
  $scope.uploader2.onErrorItem = function () {
    alert('上传失败!')
  }
  $scope.uploader1.filters.push({
    name: 'customFilter',
    fn: verifyImage
  })
  $scope.uploader2.filters.push({
    name: 'customFilter',
    fn: verifyImage
  })
  function buildKey(type, fileName) {
    var randomFilename = ""

    var get_suffix = function (filename) {
      var suffix = ''
      var pos = filename.lastIndexOf('.')

      if (pos != -1) {
          suffix = filename.substring(pos)
      }
      return suffix
    };
    var random_string = function (len) {
      len = len || 32
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var maxPos = chars.length;
      var pwd = ''
      for (var i = 0; i < len; i++) {
          pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    }

    var suffix = get_suffix(fileName);
    var typMap = {
      1: 'FileUploads/Order/CardID/',
      2: 'FileUploads/Order/Contract/'
    }
    var nowstr = $filter('date')(new Date(), 'yyyyMM')
    var g_object_name = typMap[type] + nowstr + '/' + random_string(10) + suffix
    return g_object_name
  }
  function verifyImage(item, options) {
    var reg = /^.*\.(?:png|jpg|bmp|gif|jpeg)$/
    if (!reg.test(item.name.toLowerCase())) {
        alert('请选择图片')
        return false
    }
    return true
  }
  //日期
  $scope.clear = function () { //清空
      $scope.dt = null;
  }
  $scope.popup1 = {
      opened: false
  }
  $scope.popup2 = {
      opened: false
  }
  $scope.open1 = function () {
      $scope.popup1.opened = true;
  }
  $scope.open2 = function () {
      $scope.popup2.opened = true;
  }

  // tab2页卡内容
  $scope.refreshData2 = function() {
    // 点击页卡请求当前页卡数据内容
    $scope.contractTab = $scope.itemDetail23
    var customerId = $scope.item.customerId
    var searchIt = {}
    searchIt.customerId = customerId
    var data = angular.extend({
        offset: ($scope.tab2.paginator.currentPage - 1) * $scope.tab2.paginator.perPage,
        limit: $scope.tab2.paginator.perPage
    }, searchIt, data);
    // console.log(data, '查询参数')
    $http.get('/api/contractlistbycustomerId?'+ $.param(data)).success(function(res){
      // console.log(res)
      if(res.status) {
        $scope.contractTab = res.data.list
        $scope.tab2.paginator.total = res.data.total
      }
    })
    // $scope.contractTab = [
    //   {contractId: 'BJ-A00986', contractType: '2', signTime: '2017-07-17', service: '14月', serviceDateStart: '2017-08', serviceDateEnd: '2018-10', contractAmount: '2400.00'},
    //   {contractId: 'BJ-A00986', contractType: '1', signTime: '2017-07-17', service: '14月', serviceDateStart: '2017-08', serviceDateEnd: '2018-10', contractAmount: '2400.00'},
    //   {contractId: 'BJ-A00986', contractType: '2', signTime: '2017-07-17', service: '14月', serviceDateStart: '2017-08', serviceDateEnd: '2018-10', contractAmount: '2400.00'}
    // ]
  }
  $scope.detailTab2 = function(item) {
    // 弹框查看
    var modalInstance = $uibModal.open({
      templateUrl: 'views/signed_tab2_detail.html',
      controller: 'Tab2Detail',
      size: 'lg',
      resolve: {
        contractItem: function() {
          return $scope.itemDetail23
        }
      }
    })
    modalInstance.result.then(function (result) {
      $scope.refreshData2()
    }, function () {

    })
    // item.OrderId = 561
    // $http.get('/api/contractdetail/' + item.OrderId).success(function(res) {
    //   console.log(res)
    //   $scope.itemDetail2 = res.data
    //
    // })
  }
  $scope.stop = function(item) {
    // 根据返回状态判断是否是在服务器内 服务器过了就不能终止合同
    var modalInstance = $uibModal.open({
      templateUrl: 'views/contract_refuse.html',
      controller: 'ContractRefuseSigned',
      size: "lg",
      resolve: {
        contractMsg: function() {
          return item
        },
        title: function() {
          return '中止合同'
        }
      },
      backdrop: 'static'
    })
    modalInstance.result.then(function(result) {
      $scope.refreshData2()
    }, function() {

    });
  }

  // tab2分页功能开始
  $scope.tab2 = {}
  $scope.tab2.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 10,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
  }
  $scope.tab2.pageChanged = function () {
      $scope.refreshData2()
  }
  $scope.tab2.setCurrentPage = function () {
      $scope.tab2.currentPage = Math.abs(Math.floor($scope.tab2.currentPage)) || 1
      $scope.tab2.paginator.currentPage = $scope.tab2.currentPage
      $scope.refreshData2()
  }
  // 分页功能结束

  // tab3页卡内容
  $scope.refreshData3 = function() {
    // 点击页卡请求当前页卡数据内容
    $scope.contractTab = $scope.itemDetail23
    var customerId = $scope.item.customerId
    var searchIt = {}
    searchIt.customerId = customerId
    var data = angular.extend({
        offset: ($scope.tab3.paginator.currentPage - 1) * $scope.tab3.paginator.perPage,
        limit: $scope.tab3.paginator.perPage
    }, searchIt, data);
    // console.log(data, '查询参数')
    $http.get('/api/servicefeedbycustomerId?'+ $.param(data)).success(function(res){
      // console.log(res)
      if(res.status) {
        $scope.contractTab3 = res.data.list
        $scope.tab3.paginator.total = res.data.total
      }
    })
    // $scope.contractTab3 = [
    //   {ContractNo: 'BJ-A00986', service: '14月', Amount: 22, BookKeepFeed: 1, FinanceServiceFeed: 2, OutWorkServiceFeed: 0, AgentFeed: 1},
    //   {ContractNo: 'BJ-A00986', service: '14月', Amount: 22, BookKeepFeed: 1, FinanceServiceFeed: 2, OutWorkServiceFeed: 0, AgentFeed: 1},
    //   {ContractNo: 'BJ-A00986', service: '14月', Amount: 22, BookKeepFeed: 1, FinanceServiceFeed: 2, OutWorkServiceFeed: 0, AgentFeed: 1}
    // ]
  }
  $scope.detailTab3 = function(item) {
    // 弹框查看
    $http.get('api/contract/getmainitemlist').success(function(res) {
      // console.log(res, 'res')
      if (res.status) {
        $scope.projectItems = res.data
        var modalInstance = $uibModal.open({
          templateUrl: 'views/signed_tab3_detail.html',
          controller: 'Tab3Detail',
          size: 'hg',
          resolve: {
            contractItem: function() {
              return $scope.itemDetail23
            },
            projectItems: function() {
              return $scope.projectItems
            }
          }
        })
        modalInstance.result.then(function (result) {
          $scope.refreshData3()
        }, function () {

        })
      }
    })
  }

  // tab3分页功能开始
  $scope.tab3 = {}
  $scope.tab3.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 10,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
  }
  $scope.tab3.pageChanged = function () {
      $scope.refreshData3()
  }
  $scope.tab3.setCurrentPage = function () {
      $scope.tab3.currentPage = Math.abs(Math.floor($scope.tab3.currentPage)) || 1
      $scope.tab3.paginator.currentPage = $scope.tab3.currentPage
      $scope.refreshData3()
  }
  // 分页功能结束

  // tab4页卡内容
  $scope.refreshData4 = function() {
    // 点击页卡请求当前页卡数据内容
    // console.log($scope.postDetail, '$scope.postDetail')
    var customerId = $scope.customerId
    // var customerId = '1201043653'
    var url = '/api/maintask/listforCustomerId/' + customerId + '?'
    var data = angular.extend({
        offset: ($scope.tab4.paginator.currentPage - 1) * $scope.tab4.paginator.perPage,
        limit: $scope.tab4.paginator.perPage
    }, data);
    $http.get(url + $.param(data)).success(function(res) {
      // console.log(res)
      if (res.status) {
        $scope.contractTab4 = res.data.list
        $scope.tab4.paginator.total = res.data.total
      }
    })
  }
  $scope.detailTab4 = function(item) {
    // 弹框查看
    // console.log(item)
    var Id = item.Id
    // var Id = 193
    $http.get('api/maintask/' + Id).success(function(res) {
      // console.log(res, 'res')
      if (res.status) {
        $scope.outworkItems = res.data
        var modalInstance = $uibModal.open({
          templateUrl: 'views/signed_tab4_detail.html',
          controller: 'Tab4Detail',
          size: 'lg',
          resolve: {
            contractItem: function() {
              return $scope.outworkItems
            }
          }
        })
        modalInstance.result.then(function (result) {
          $scope.refreshData4()
        }, function () {

        })
      }
    })
  }

  // tab4分页功能开始
  $scope.tab4 = {}
  $scope.tab4.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 15,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
  }
  $scope.tab4.pageChanged = function () {
      $scope.refreshData4()
  }
  $scope.tab4.setCurrentPage = function () {
      $scope.tab4.currentPage = Math.abs(Math.floor($scope.tab4.currentPage)) || 1
      $scope.tab4.paginator.currentPage = $scope.tab4.currentPage
      $scope.refreshData4()
  }
  // 分页功能结束
  // tab5页卡内容
  $scope.refreshData5 = function() {
    // 点击页卡请求当前页卡数据内容
    var customerId = $scope.customerId
    // var customerId = '1201043653'
    var url = '/api/customer/remark/list/' + customerId + '?'
    var data = angular.extend({
        offset: ($scope.tab5.paginator.currentPage - 1) * $scope.tab5.paginator.perPage,
        limit: $scope.tab5.paginator.perPage
    }, data);
    $http.get(url + $.param(data)).success(function(res) {
      // console.log(res)
      if (res.status) {
        $scope.contractTab5 = res.data.list
        $scope.tab5.paginator.total = res.data.total
      }
    })
  }
  $scope.detailTab5 = function(item) {
    // 弹框查看 1标记2挂起
    if (item.Operation == 1) {
      var signFrom = true
    } else if (item.Operation == 2) {
      signFrom = false
    }
    var modalInstance = $uibModal.open({
      templateUrl: 'views/contract_refuse.html',
      controller: 'MarkRefuseTab5',
      resolve: {
        contractMsg: function() {
          return item
        },
        signFrom: function() {
          return signFrom
        },
        title: function() {
          return '查看详情'
        },
        sign: function() {
          return true
        }
      },
      backdrop: 'static'
    })
    modalInstance.result.then(function(result) {
    }, function() {

    });
  }

  // tab5分页功能开始
  $scope.tab5 = {}
  $scope.tab5.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 15,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
  }
  $scope.tab5.pageChanged = function () {
      $scope.refreshData5()
  }
  $scope.tab5.setCurrentPage = function () {
      $scope.tab5.currentPage = Math.abs(Math.floor($scope.tab5.currentPage)) || 1
      $scope.tab5.paginator.currentPage = $scope.tab5.currentPage
      $scope.refreshData5()
  }
  // 分页功能结束

  // tab6页卡内容
    // tab6分页功能开始
    $scope.tab6 = {}
    $scope.tab6.paginator = {
        total: 0,
        currentPage: 1,
        perPage: 10,
        previousText: '上一页',
        nextText: '下一页',
        lastText: '最后一页',
        firstText: '首页'
    }
    $scope.tab6.pageChanged = function () {
        $scope.refreshData6()
    }
    $scope.tab6.setCurrentPage = function () {
        $scope.tab6.currentPage = Math.abs(Math.floor($scope.tab6.currentPage)) || 1
        $scope.tab6.paginator.currentPage = $scope.tab6.currentPage
        $scope.refreshData6()
    }
    // 分页功能结束
  $scope.refreshData6 = function() {
    // 点击页卡请求当前页卡数据内容
    var customerId = $scope.item.customerId
    // var customerId = '111'
    var post = {}
    post.customerId = customerId
    // var data = angular.extend({
    //     offset: ($scope.tab6.paginator.currentPage - 1) * $scope.tab6.paginator.perPage,
    //     limit: $scope.tab6.paginator.perPage
    // }, post, data)
    var data = angular.extend({
        offset: 0,
        limit: 10
    }, post, data)
    $http.get('/api/customer/rz?' + $.param(data)).success(function(res) {
      // console.log(res)
      if (res.status) {
        $scope.contractTab6 = res.data.list
        $scope.tab6.paginator.total = res.data.total
        // console.log($scope.contractTab6)
      }
    })
  }

}]).controller('Tab2Detail',  ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'contractItem', function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, contractItem) {
  // console.log(contractItem, 'contractItem')
  $scope.paylist = [{}]
  $scope.postDetail = {}
  $scope.canChange = true
  $scope.postDetail = contractItem
  // $scope.postDetail.ContractDate = $scope.postDetail.ContractDate.slice(0, 10)
  // $scope.postDetail.ServiceStart = $scope.postDetail.ServiceStart.slice(0, 10)
  // $scope.postDetail.ServiceEnd = $scope.postDetail.ServiceEnd.slice(0, 10)
  // console.log($scope.postDetail.ContractDate)
  for (var i in $scope.postDetail.PayInfoList) {
    $scope.postDetail.PayInfoList[i].PayTypeId = $scope.postDetail.PayInfoList[i].PayTypeId + ''
    // $scope.postDetail.PayInfoList[i].PayTime = $scope.postDetail.PayInfoList[i].PayTime.slice(0, 10)
  }
  $scope.paylist = $scope.postDetail.PayInfoList

  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
  }
}]).controller('ContractRefuseSigned', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'title', 'user', function($scope, $http, $uibModalInstance, contract, title, users) {
  var users = users.get()
  // console.log(users)
  // console.log(contract, 'contract')
  $scope.postData = contract
  $scope.title = title
  $scope.Remark = ''
  $scope.save = function() {
    if ($scope.Remark) {
      var RealName = users.RealName
      $scope.postData.Remark = $scope.postData.Remark + $scope.Remark + '{' + RealName + '}'
    }
    var post = {}
    post.OrderId = $scope.postData.OrderId
    post.CustomerId = $scope.postData.CustomerId
    post.Remark = $scope.postData.Remark
    $http.put('/api/endcontract', post).success(function(res) {
      // console.log(res)
      if (res.status) {
          $uibModalInstance.close();
      }
    })
  }
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  }
}]).controller('Tab3Detail',  ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'contractItem', 'projectItems', function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, contractItem, projectItems) {
  // console.log(contractItem, 'contractItem')
  $scope.canChange = true
  $scope.isChange = true
  $scope.canSave = false // 编辑和保存按钮切换
  $scope.rlist = [{}]
  $scope.postDetail = {}
  $scope.Math = Math
  $scope.getAmount = function (rg) {
    // console.log(rg.Amount)
    rg.ReceiveAmount = +($scope.Math.abs(rg.ReceiveAmount)).toFixed(2)
  }
  $scope.projectItems = projectItems
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

  // 可编辑
  $scope.canCompile = function() {
    $scope.canChange = false
    $scope.canSave = true
  }
  // 保存提交修改
  $scope.ok = function() {
    $scope.postDetail.Details = $scope.rlist
    // console.log($scope.postDetail.Details)
    var url = '/api/receivefee/'
    $http.put(url, $scope.postDetail.Details).success(function(res) {
      // console.log(res)
      if (res.status) {
        $uibModalInstance.close();
      }
    })
  }
  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
  }
}]).controller('Tab4Detail',  ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'contractItem', function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, contractItem) {
  // console.log(contractItem, 'contractItem')

  $scope.customers = contractItem

  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
  }
}]).controller('MarkRefuseTab5', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'signFrom', 'title', 'sign', 'user',
function($scope, $http, $uibModalInstance, contract, signFrom, title, sign, users) {
  var users = users.get()
  // console.log(users)
  // console.log(signFrom, title, 'title')
  // console.log(contract, 'contract')
  // console.log(sign, 'sign')
  $scope.postData = contract
  $scope.Remark = ''
  $scope.sign = signFrom
  $scope.title = title
  $scope.isEdit = sign
  // $scope.postData.tagStatus = $scope.postData.Sign + ''// 标记高中低
  // console.log($scope.postData.tagStatus)
  $scope.Remark = $scope.postData.Content // 备注内容
  $scope.tags = {
    1: '低',
    2: '中',
    3: '高'
  }

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  }
}]).controller('SubmitAccount', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'postDataOut', 'isOnlyPartChoose', 'post', 'item', function($scope, $http, $uibModal, $uibModalInstance, postDataOut, isOnlyPartChoose, post, item) {
  // console.log(isOnlyPartChoose, 'isOnlyPartChoose')
  $scope.postDataOut = postDataOut
  $scope.postData = post
  $scope.title = '提交会计'
  // $scope.partT = '' // 存放提交给后台选择类型 0全部1国税2地税
  $scope.isChange = false // 判断选中状态是否可以改变

  console.log(item, 'item')
  $scope.PartTax = item.PartTax
  $scope.AccountantStatus = item.AccountantStatus
  $scope.OutWorkerStatus = item.OutWorkerStatus

  $scope.partT = $scope.PartTax // 驳回后再点开默认限制上次选中
  if ($scope.partT == 1 || $scope.partT == 2) {
    $scope._partT = true
  } else {
    $scope._partT = false
  }
  if ($scope.AccountantStatus == 3 && $scope.OutWorkerStatus != 3) {
    $scope.isSecondAccount = true
  } else {
    $scope.isSecondAccount = false
  }
  // 提交
  $scope.sub = function() {
    if ($scope.partT == null) {
      alert('请选择部分还是全部提交')
    } else {
      // if (isOnlyPartChoose && $scope.partT == 0) { // 部分审核 会计驳回 外勤待审核 只能选择部分提交
      //   alert('只能选择部分提交')
      //   return
      // }
      console.log($scope.partT, '$scope.partT')
      $http.put('/api/order/audit/toaccountant/' + $scope.postData.orderId + '/?partTax=' + $scope.partT ).success(function(res) {
        // console.log(res, 'res')
        if(res.status) {
          // console.log($scope.partT, '$scope.partT')
          if ($scope.partT == 0) { // 资料齐全 提交完成后两个按钮都是禁止点击 弹框关闭刷新页面
            // $uibModalInstance.close({partT:0})
            $uibModalInstance.close()
          } else if ($scope.AccountantStatus == 3 && $scope.OutWorkerStatus != 3) {
            $http.put('/api/order/audit/toaccountant/' + $scope.postData.orderId + '/?partTax=' + $scope.partT).success(function(res) {
              if(res.status) {
                $uibModalInstance.close()
              }
            })
          } else if ($scope.partT != 0) { // 国地税报告 提交完成弹出选择外勤任务的弹框
            var modalInstance = $uibModal.open({
                templateUrl: 'views/order_outworker_add.html',
                controller: 'Signed_outworker_add',
                backdrop: 'static',
                size: 'hg',
                resolve: {
                    isShow: function () {
                      return true
                    },
                    postDataOut: function() {
                      return $scope.postDataOut
                    },
                    item: function() {
                      return item
                    }
                }
            });
            modalInstance.result.then(function(result) {
              // console.log(result, '添加完外勤任务返回结果')
                $uibModalInstance.close() // 添加外勤任务成功后关闭外勤任务弹框 同事关闭之前两个弹窗 刷新页面
            }, function(result) {
              // console.log(result, '第二个弹框接收是否提交外勤') // 如果没有选择外勤任务 也是关闭弹窗 不过此时外勤任务按钮可点
              $uibModalInstance.close()
            })
          } else {
            $uibModalInstance.close()
          }
          // 根据选择国地税报到和外请任务确定按钮是否可点

        }
      })
    }
  }
  $scope.close = function() {
    $uibModalInstance.close()
  }
}]).controller("Signed_outworker_add", ['$scope', '$http', '$uibModal', '$uibModalInstance', 'isShow', 'postDataOut', 'item', 'user', function($scope, $http, $uibModal, $uibModalInstance, isShow, postDataOut, item, UserServe) {
  var user = UserServe.get()
  $scope.isShow = isShow // 是否显示选择公司 选择区域
  $scope.title = "添加外勤任务"
  $scope.postDataOut = postDataOut // 提交外勤任务传递参数
  console.log($scope.postDataOut, '$scope.postDataOut')

  if (item.OutWorkerStatus == 3) { // 已驳回请求接口
    $http.get('/api/maintaske/editbyorderid/' + item.OrderId).success(function(res) {
      if(res.status && res.data.length>0){
        $scope.currentData = res.data[0];
         $scope.postData.Remark = $scope.currentData.Remark
        $scope.renderData();
      }
    })
  }

  $http.get('/api/mycity').success(function(res) {
      $scope.city = res.data[0]
  });
  $http.get('/api/commontask').success(function(res) {
    $scope.tasksArr = formatData(_.filter(res.data, {
        Status: 1
    }));
    $scope.renderData();
  })
  $scope.open1 = false;
  $scope.open2 = false;
  $scope.checkTB = function(tbItem) {
    if (tbItem.checked) {
      _.each($scope.tasksArr, function(item) {
          if (tbItem.CommonTaskId !== item.CommonTaskId) item.checked = false;
      })
    }
  }
  $scope.tbIsDisable = function() {
    return !!_.chain($scope.tasks).pluck('list').flatten().find({
        selected: true
    }).value()
  }
  $scope.otherIsDisable = function() {
    return !!_.find($scope.tasksArr, {
        checked: true
    })
  }

  function formatData(data) {
    var result = []
    var last = {}
    _.each(data, function(item) {
        if (last.CommonTaskId !== item.CommonTaskId) {
            last = _.pick(item, 'CommonTaskName', 'Status', 'CommonTaskId', 'CommonWeight')
            last.TaskList = [_.pick(item, 'TaskName', 'OuterTaskId', 'Weight')]
            result.push(last)
        } else {
            last.TaskList.push(_.pick(item, 'TaskName', 'OuterTaskId', 'Weight'))
        }
    })
    return result
  }

  $scope.areaSele = 0
  $scope.postData = {}

  $scope.ok = function(ev) {
    var tb = _.find($scope.tasksArr, {
      checked: true
    });
    var data = {
      CustomerId: $scope.postDataOut.CustomerId,
      AreaCode: $scope.postDataOut.AreaCode,
      OrderId: $scope.postDataOut.OrderId,
      Remark: $scope.postData.Remark
    };
    var isOthers = false;
    if (tb) { //
      data.CommonTaskId = tb.CommonTaskId;
      data.ChildTasks = _.map(tb.TaskList, function(item) {
          var t = _.chain($scope.tasks).pluck('list').flatten().find({
              Id: item.OuterTaskId
          }).value();
          var temp = _.pick(t, 'TaskName', 'Price', 'Weight', 'Remark');
          temp.TaskId = item.OuterTaskId;
          temp.Weight = item.Weight;
          temp.CustomerId = data.CustomerId;
          return temp;
      });
      data.MainTaskName = tb.CommonTaskName;
    } else {
        isOthers = true;
        var subTasks = _.chain($scope.tasks).pluck('list').flatten().filter({
            selected: true
        }).map(function(item) {
            // delete item.selected;
            //item.MainTaskId =
            return item;
        }).value();
        data.ChildTasks = _.map(subTasks, function(item) {
            var temp = _.pick(item, 'TaskName', 'Price', 'Weight', 'Remark', 'selected');
            temp.TaskId = item.Id;
            temp.CustomerId = data.CustomerId;
            return temp;
        });
        data.MainTaskName = "其他";
        if (data.ChildTasks.length === 0) {
            alert('请选择任务！');
            return;
        }
      }
      if (isOthers) {
          var modalInstance = $uibModal.open({
              templateUrl: 'views/outwork_weight_setting.html',
              controller: 'outworkWeightSetting',
              size: 'lg',
              backdrop: 'static',
              resolve: {
                tasks: function() {
                    return data.ChildTasks;
                }
              }
          });

          modalInstance.result.then(function(result) {
            reSelect(result);
            var tasks = _.map(_.filter(result, { selected: true }), function(t) {
                t.Weight = t._weight;
                delete t.selected;
                return t;
            });
            data.ChildTasks = tasks;
            submit()
          }, function(result) {
              reSelect(result);
          });

          function reSelect(result) {
            _.chain($scope.tasks).pluck('list').flatten().filter(function(t) {
              var temp = _.find(result, { TaskId: t.Id });
              if (temp) {
                  t.selected = temp.selected;
              }
              return !!temp;
            }).value();
          }

      } else {
          submit()
      }

    function submit() {
      $http.post('/api/maintask', data).success(function(res) {
        if (res.status) {
          $uibModalInstance.close();
        }
      });
    }
  };
  $http.get('/api/outertasksub?taskname=&BusinessType=&status=0&offset=0&limit=10000').success(function(res) {
    var data = _.map(_.groupBy(_.filter(res.data.list, {
        Status: 1
    }), 'BusinessType'), function(val, key) {
        var item = {
            list: val
        };
        if (key == 1) {
            item.Name = '税务';
        } else if (key == 2) {
            item.Name = '工商';
        } else {
            item.Name = '其他';
        }
        return item;
    });

    $scope.tasks = data;
    $scope.renderData();
  });
    // $http.get("/api/code/area").success(function(res) {
    //     $scope.areaArr = res.data
    // })
    $scope.tbIsDisable = function() {
        return !!_.chain($scope.tasks).pluck('list').flatten().find({
            selected: true
        }).value();
    }
    $scope.otherIsDisable = function() {
        return !!_.find($scope.tasksArr, {
            checked: true
        });
    }
    $scope.cancel = function() {
      // 关闭弹框时候需要弹框提示 是否取消创建
      if (!confirm("确认要取消任务吗？")) return
      $uibModalInstance.dismiss()
    }
    $scope.renderData = function(){
      if($scope.rendered) return;
      if(!$scope.currentData) return;
      var data = $scope.currentData;
      // data.childrenId = '1343,1284,1285';
      if(data.CommonTaskId > 0){
        $scope.open1 = true;
        if(!$scope.tasksArr) return;
        _.find($scope.tasksArr, function(item){
          if(item.CommonTaskId == data.CommonTaskId){
            item.checked = true;
            return true;
          }
          return false;
        });
      }else{
        if(!$scope.tasks) return;
        $scope.open2 = true;
        var taskIds = data.childrenId.split(',');
        _.each($scope.tasks,function(tgroup){
          _.each(tgroup.list,function(t){
            if(taskIds.indexOf(t.Id + '') > -1){
              t.selected = true;
            }
          });
        });
      }
      $scope.rendered = true;
    }
  }
])
