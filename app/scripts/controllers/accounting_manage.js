angular.module('crmApp').controller('AccountingManage', ['$scope', '$http', '$state', '$uibModal', '$filter', 'user', '$q',
    function($scope, $http, $state, $uibModal, $filter, user, $q) {
      $scope.user = user.get();
      $scope.areas = [] // 所属区域列表

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

      // 查看详情
      $scope.detail = function(item) {
        // 点击请求接口返回 tab1信息 然后顶部公共部分需要从列表带过去
        var customerId = item.CustomerId
        // var customerId = '100017'
        $http.get('/api/customerdetail/' + customerId).success(function(res) {
          // console.log(res)
          var data = res.data
          if(res.status) {
            var modalInstance = $uibModal.open({
              templateUrl: 'views/signed_detail.html',
              controller: 'AccoutDetail',
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

        $scope.search = {
            SequenceNo: "",
            companyName: "",
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
            perPage: 15,
            previousText: '上一页',
            nextText: '下一页',
            lastText: '最后一页',
            firstText: '首页'
        };

        // $scope.searchItem = {
        //     SequenceNo: "",
        //     companyName: "",
        //     connector: "",
        //     salesName: "",
        //     serviceStatus: "",
        //     accountantStatus: "",
        //     accountantTaskSource: "",
        //     contractNo: "",
        //     contractDateStart: "",
        //     contractDateEnd: ""
        // };
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
        // $scope.changeDate = function(d) {
        //     console.log(d)
        //     // console.log(d2)
        //     // var d1 = angular.element($("#date1"))[0].value
        //     // var d2 = angular.element($("#date2"))[0].value
        //     // if (d2) {
        //     //     var _d1 = d1.replace(/-/ig, "")
        //     //     var _d2 = d2.replace(/-/ig, "")
        //     //     if ((_d2 - _d1) < 0) {
        //     //         angular.element($("#date1"))[0].value = d2
        //     //     }
        //     // }
        //     $scope.search.contractDateStart = d
        //     $scope.search.contractDateEnd = d2
        // }
        $scope.searchFn = function() {
          refreshData()
        }

        function refreshData() {
            // var deferred = $q.defer();
            var searchIt;
            // console.log($scope.dt1)
            // console.log($scope.dt2)
            // $scope.serviceEndDate = $filter('date')(enddate, 'yyyy-MM');
            if ($scope.dt1 && $scope.dt2) {
              if ($scope.dt1.getTime() > $scope.dt2.getTime()) {
                $scope.dt1 = $scope.dt2
              }
              $scope.search.contractDateStart = $filter('date')($scope.dt1, 'yyyy-MM-dd')
              $scope.search.contractDateEnd =  $filter('date')($scope.dt2, 'yyyy-MM-dd')
            }
            searchIt = $scope.search
            var data = angular.extend({
                offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
                limit: $scope.paginator.perPage
            }, searchIt, data);
            // console.log(data, '查询参数')
            $http.get('api/order/audit/list?' + $.param(data)).success(function(res) {
                $scope.paginator.total = res.data.total;
                $scope.customers = res.data.list;
            });
            // return deferred.promise;
        }
        refreshData();
        // 会计审核 列表审核按钮
        $scope.autid = function(item) {
          var modalInstance = $uibModal.open({
              templateUrl: 'views/SetFirstPostMonth.html',
              controller: 'SetFirstPostMonth',
              size: '',
              resolve: {
                contractMsg: function() {
                  return item
                }
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
            $http.put('/api/order/audit/reject/' + item.OrderId).success(function(res) {
                if (res.status) refreshData()
            })
        }
    }
]).controller('SetFirstPostMonth', ['$scope', '$http', '$uibModalInstance', '$filter', 'contractMsg', '$mdDialog', 'user', '$uibModal', function($scope, $http, $uibModalInstance, $filter, contractMsg, $mdDialog, user, $uibModal) {
    var date = ''
    $scope.serviceStartDate = ''
    $scope.serviceEndDate = ''
    var months = contractMsg.OrderMonths + contractMsg.GiftMonth
    // console.log(months)
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
      // console.log('计算服务结束日期')
      // $scope.serviceStartDate + months - 1
      // console.log(months)
      var getmonths = months - 1
      // console.log(getmonths)
      // console.log($scope.serviceStartDate, '$scope.serviceStartDate')
      var date = new Date($scope.serviceStartDate);
      var enddate = new Date(date.setMonth(date.getMonth() + getmonths));
      // console.log(date)
      // console.log(enddate)
      // $scope.serviceStartDate = enddate.getFullYear() + '-' + enddate.getMonth()
      // console.log($scope.serviceStartDate, '$scope.serviceStartDate')
      $scope.serviceEndDate = $filter('date')(enddate, 'yyyy-MM');
    }

    $scope.contractNo = contractMsg.ContractNo
    $scope.serveMonth = months + '个月'

    $scope.close = function(){
      $uibModalInstance.close();
    }
    $scope.sub = function(){
      if(!$scope.serviceStartDate){
        confirm('请选择首报月！')
        return
      }
      $scope.serviceStartDate = $filter('date')($scope.serviceStartDate, 'yyyy-MM');
      // console.log($scope.serviceStartDate, 'serviceStartDate')
      // console.log($scope.serviceEndDate, 'serviceEndDate')
      $http.put('/api/order/audit/pass/' + contractMsg.OrderId + '?accountantTaskSource=' + contractMsg.AccountantTaskSource + '&partTax=' + contractMsg.PartTax + '&serviceStatus=' + contractMsg.ServiceStatus + '&serviceStartDate=' + $scope.serviceStartDate + '&serviceEndDate=' + $scope.serviceEndDate).success(function(res){
        if (res.status) {
          $uibModalInstance.close();
        }
      })
    }
    $scope.dis = function(){
      return
    }
}]).controller('AccoutDetail', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'FileUploader','$filter', 'contractMsg', 'item', 'areas', 'user', function($scope, $http, $uibModal, $uibModalInstance, FileUploader, $filter, contract, item, areas, users) {
  var users = users.get()
  // console.log(users)
  // console.log(contract, 'contract')
  $scope.title = '会计审核管理>查看'
  $scope.isAccouting = true
  $scope.isEdit = true
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
  $scope.postDetail = contract
  // 提交会计 提交外勤是否可点
  $scope.isSubmitAccount = false
  $scope.isSubmitOutwork = false
  // 根据顶部公司信息里面的 会计审核状态和外勤审核状态 还有驳回来源 判断按钮是否可点

  if ($scope.item.OutWorkerStatus == 3) { // 外勤状态驳回 则都可点
    $scope.isSubmitAccount = false
    $scope.isSubmitOutwork = false
  }
  if ($scope.item.AccountantStatus == 2) {
    $scope.isSubmitAccount = false
    $scope.isSubmitOutwork = false
  }

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

  // 会计审核
  $scope.AccountCheck = function() {
    var item = $scope.item
    var modalInstance = $uibModal.open({
        templateUrl: 'views/SetFirstPostMonth.html',
        controller: 'SetFirstPostMonth',
        size: '',
        resolve: {
          contractMsg: function() {
            return item
          }
        },
        backdrop: 'static'
    });
    modalInstance.result.then(function(result) {
        $uibModalInstance.close()
    }, function() {

    });
  }
  // 会计驳回
  $scope.rejected = function() {
    var OrderId = $scope.item.OrderId
    if (!confirm("确认驳回？")) return;
    $http.put('/api/order/audit/reject/' + OrderId).success(function(res) {
        if (res.status) {
          $uibModalInstance.close()
        }
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
    var url = '/api/Customer/500?verify=1'
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
    var customerId = $scope.item.CustomerId
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
  }
  $scope.detailTab2 = function(item) {
    // 弹框查看
    $scope.detailTab2 = function(item) {
      // 弹框查看
      var OrderId = item.OrderId
      $http.get('/api/contractdetail/' + OrderId).success(function(res) {
        $scope.itemDetail = res.data
        if (res.status) {
          var modalInstance = $uibModal.open({
            templateUrl: 'views/signed_tab2_detail.html',
            controller: 'Tab2DetailAccount',
            size: 'lg',
            resolve: {
              contractItem: function() {
                return $scope.itemDetail
              }
            }
          })
          modalInstance.result.then(function (result) {
            $scope.refreshData2()
          }, function () {

          })
        }
      })
    }
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
    var customerId = $scope.item.CustomerId
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
  }
  $scope.detailTab3 = function(item) {
    // 弹框查看
    var OrderId = item.OrderId
    $http.get('/api/contractdetail/' + OrderId).success(function(res) {
      $scope.itemDetail3 = res.data
      if (res.status) {
        $http.get('api/contract/getmainitemlist').success(function(res) {
          // console.log(res, 'res')
          if (res.status) {
            $scope.projectItems = res.data
            var modalInstance = $uibModal.open({
              templateUrl: 'views/signed_tab3_detail.html',
              controller: 'Tab3DetailAccount',
              size: 'hg',
              resolve: {
                contractItem: function() {
                  return $scope.itemDetail3
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
    var customerId = $scope.item.CustomerId
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
    var Id = item.Id
    $http.get('api/maintask/' + Id).success(function(res) {
      // console.log(res, 'res')
      if (res.status) {
        $scope.outworkItems = res.data
        var modalInstance = $uibModal.open({
          templateUrl: 'views/signed_tab4_detail.html',
          controller: 'Tab4DetailAccount',
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
  $scope.tab3.pageChanged = function () {
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
    var customerId = $scope.item.CustomerId
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
      controller: 'MarkRefuseTab5Account',
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
    var customerId = $scope.item.CustomerId
    var post = {}
    post.customerId = customerId
    var data = angular.extend({
        offset: ($scope.tab6.paginator.currentPage - 1) * $scope.tab6.paginator.perPage,
        limit: $scope.tab6.paginator.perPage
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

}]).controller('Tab2DetailAccount',  ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'contractItem', function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, contractItem) {
  // console.log(contractItem, 'contractItem')
  $scope.paylist = [{}]
  $scope.postDetail = {}
  $scope.canChange = true
  $scope.postDetail = contractItem
  $scope.postDetail.ContractDate = $scope.postDetail.ContractDate.slice(0, 10)
  $scope.postDetail.ServiceStart = $scope.postDetail.ServiceStart.slice(0, 10)
  $scope.postDetail.ServiceEnd = $scope.postDetail.ServiceEnd.slice(0, 10)
  // console.log($scope.postDetail.ContractDate)
  for (var i in $scope.postDetail.PayInfoList) {
    $scope.postDetail.PayInfoList[i].PayTypeId = $scope.postDetail.PayInfoList[i].PayTypeId + ''
    $scope.postDetail.PayInfoList[i].PayTime = $scope.postDetail.PayInfoList[i].PayTime.slice(0, 10)
  }
  $scope.paylist = $scope.postDetail.PayInfoList

  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
  }
}]).controller('Tab3DetailAccount',  ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'contractItem', 'projectItems', function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, contractItem, projectItems) {
  // console.log(contractItem, 'contractItem')
  $scope.canChange = true
  $scope.isChange = true
  $scope.isEdit = true // 会计审核时候不可编辑
  $scope.canSave = false // 编辑和保存按钮切换
  $scope.rlist = [{}]
  $scope.postDetail = {}

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
}]).controller('Tab4DetailAccount',  ['$scope', '$http', '$uibModal', '$uibModalInstance', '$filter', 'user', 'contractItem', function($scope, $http, $uibModal, $uibModalInstance, $filter, UserServe, contractItem) {
  // console.log(contractItem, 'contractItem')

  $scope.customers = contractItem

  // 弹窗关闭
  $scope.cancel = function () {
    $uibModalInstance.dismiss()
  }
}]).controller('MarkRefuseTab5Account', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'signFrom', 'title', 'sign', 'user',
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
}])
