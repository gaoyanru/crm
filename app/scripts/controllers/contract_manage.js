angular.module('crmApp').controller('Contract_manage', ['$scope', '$http', '$state', '$uibModal', 'user', '$q',
  function ($scope, $http, $state, $uibModal, user, $q) {
    $scope.user = user.get()
    console.log($scope.user, '登录用户信息')
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
    $scope.contracts = [{
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
    $scope.search = {
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
    // 分页
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
    // 新增合同
    $scope.open = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/order_contract_add.html',
        controller: 'Order_contract_add',
        backdrop: 'static',
        size: 'hg',
        resolve: {
            contract: {}
        }
      })
      modalInstance.result.then(function (result) {
        refreshData()
      }, function () {

      })
    }
    // 合同查看
    $scope.detail = function(item) {
      // console.log(item, '查看详情本行数据')
      var modalInstance = $uibModal.open({
        templateUrl: 'views/order_contract_detail.html',
        controller: 'Order_contract_detail',
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
                  {contractproject: '1', contractprojectChild: '1', projectAmount: 100},
                  {contractproject: '2', contractprojectChild: '3', projectAmount: 200},
                  {contractproject: '3', projectAmount: 100},
                  {contractproject: '4', contractprojectChild: '6', projectAmount: 300}
                ],
                chargeAmount: 1,
                financeAmount: 2,
                outworkAmount: 3,
                collectionAmount: 4,
                Remark: '你好按时到年底[管理员]',
                paylist: [
                  {payType: '1', payId: '6212 2502 0000 2533 618', time: '2017-03-29', payimg: 'https://pilipa.oss-cn-beijing.aliyuncs.com/FileUploads/pay/201708/3cPE46BEJj.png'},
                  {payType: '2', payId: '6212 2502 0000 2533 618', time: '2017-03-29', payimg: 'https://pilipa.oss-cn-beijing.aliyuncs.com/FileUploads/pay/201708/3cPE46BEJj.png'},
                  {payType: '4', payId: '6212 2502 0000 2533 618', time: '2017-03-29', payimg: 'https://pilipa.oss-cn-beijing.aliyuncs.com/FileUploads/pay/201708/3cPE46BEJj.png'}
                ]
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
    // 合同删除
    $scope.delete = function(item) {
      console.log(item, '操作本行数据')
      if (!confirm("确认要删除此条记录吗？")) return
      // $http.put('api/maintask/cancelstatus/' + item.contractId).success(function (res) {
      //     if (res.status) refreshData()
      // })
    }
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
  }
]).controller('Order_contract_add', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'FileUploader', '$filter', 'user',
  function ($scope, $http, $uibModal, $uibModalInstance, FileUploader, $filter, UserServe) {
    var user = UserServe.get()
    console.log('user')
    $scope.postData = {}
    $scope.areaSele = 0 // 选择用户列表
    $scope.canChange = true
    $scope.rlist = [{}]
    $scope.paylist = [{}]
    $scope.money = {}
    $scope.customer = {}
    $scope.payimg = ''
    $scope.uploader1 = []
    $scope.imgIndex = 0
    $scope.projectItems = []

    $scope.contractType = { // 合同类型
      1: "新增",
      2: "续费"
    }

    $scope.payTypes = {
      1: '银行卡转账',
      2: '拉卡拉',
      3: '微信',
      4: '支付宝',
      5: '现金'
    }
    function getProjectItem() { // 获取项目下拉选项
      $scope.projectItems = [{
        Id: '1',
        Name: '记账报税',
        Children: [
          {Id: '1', Name: '小规模'},
          {Id: '2', Name: '一般纳税人'}
      ]}, {
        Id: '2',
        Name: '财务费用',
        Children: [
          {Id: '3', Name: '税控器托管'},
          {Id: '4', Name: '税务其他项目'}
      ]}, {
        Id: '3',
        Name: '外勤服务费',
        Children: []
      }, {
        Id: '4',
        Name: '代收费用',
        Children: [
          {Id: '6', Name: '地址费'},
          {Id: '7', Name: '刻章费用'}
      ]}
    ]}
    getProjectItem()

    $scope.getcurProject = function (rg) {
      console.log(rg.contractproject)
      rg.contractprojectChildren = {}
      for (var i in $scope.projectItems) {
        if (rg.contractproject == $scope.projectItems[i].Id) {
          rg.contractprojectChildren = $scope.projectItems[i].Children
        }
      }
    }

    $scope.geteveryProjectAmount = function(rlist) {
      // console.log(rlist)
      var arr = [0, 0, 0, 0]
      for (let i in rlist) {
        if (rlist[i].contractproject === '1') {
          $scope.postData.chargeAmount = arr[0] += rlist[i].projectAmount || 0
        } else if (rlist[i].contractproject === '2') {
          $scope.postData.financeAmount = arr[1] += rlist[i].projectAmount || 0
        } else if (rlist[i].contractproject === '3') {
          $scope.postData.outworkAmount = arr[2] += rlist[i].projectAmount || 0
        } else if (rlist[i].contractproject === '4') {
          $scope.postData.collectionAmount = arr[3] += rlist[i].projectAmount || 0
        }
      }
      return arr
    }

    $scope.reduce = function(rlist) {
      return rlist.reduce(function(r,t){
        return r + (t.projectAmount||0);},0) || 0
    }
    // 图片上唇
    var uploadUrl = 'https://pilipa.oss-cn-beijing.aliyuncs.com'
    $http.get('/api/signkey').success(function (res) {
        delete res.data.Filename
        delete res.data.key
        delete res.data.callback
        delete res.data.expire
        delete res.data.Host
        $scope.signkey = res.data
    })
    $scope.imgClick = function (index) {
      $scope.imgIndex = index
    }
    $scope.addClick= function (index) {
      $scope.uploader1.push(addFileUploadInstance ())
    }
    $scope.uploader1[0] = addFileUploadInstance()
    function addFileUploadInstance () {
      var uploader = {}
      uploader1 = new FileUploader({
          autoUpload: true,
          url: uploadUrl
      })
      uploader1.onErrorItem = uploadError
      uploader1.onCompleteItem = function (fileItem, response, status, headers) {
          // $scope.imgs.push(uploadUrl + '/' + item.key)
          console.log(arguments)
          $scope.payimg = uploadUrl + '/' + $scope._key1
          $scope.paylist[$scope.imgIndex].payimg = $scope.payimg
      }

      uploader1.onErrorItem = function () {
          alert('上传失败')
      }
      uploader1.onBeforeUploadItem = function (item) {
        //item.formData = [];
        // debugger
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
      };
      uploader1.filters.push({
        name: 'customFilter',
        fn: function(item, options) {
            var reg = /^.*\.(?:png|jpg|bmp|gif|jpeg)$/;
            if (!reg.test(item.name.toLowerCase())) {
                alert('请选择图片')
                return false
            }
            return true
        }
      })
      return uploader1;
    }
    function buildKey(type, fileName) {
      var randomFilename = ""
      var get_suffix = function (filename) {
        var suffix = ''
        var pos = filename.lastIndexOf('.')

        if (pos != -1) {
            suffix = filename.substring(pos)
        }
        return suffix
      }
      var random_string = function (len) {
        len = len || 32
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        var maxPos = chars.length
        var pwd = ''
        for (var i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
      }
      var suffix = get_suffix(fileName)
      var typMap = 'FileUploads/pay/'
      var nowstr = $filter('date')(new Date(), 'yyyyMM')
      var g_object_name = typMap + nowstr + '/' + random_string(10) + suffix
      return g_object_name
    }
    function uploadError(item) {
      alert('上传失败!')
    }

    // $scope.add0 = function (m) {
    //   return m<10?'0'+m:m
    // }
    //
    // $scope.formateDate = function (time) {
    //   time = new Date(time);
    //   var y = time.getFullYear();
    //   var m = time.getMonth()+1;
    //   var d = time.getDate();
    //   return y+'-'+$scope.add0(m)+'-'+$scope.add0(d)
    // }

    $scope.ok = function (ev) {
      // if (!$scope.customer.CompanyName) {
      //   alert('请选择甲方！')
      //   return
      // }
      // if (!$scope.customer.Connector) {
      //   alert('请填写联系人！')
      //   return
      // }
      // if (!$scope.customer.Mobile) {
      //   alert('请填写联系人电话！')
      //   return
      // }
      // if (!$scope.postData.contractId) {
      //   alert('请填写合同编号！')
      //   return
      // }
      // if (!$scope.postData.contracttype) {
      //   alert('请选择合同类型！')
      //   return
      // }
      // if (!$scope.postData.signTime) {
      //   alert('请填写签订日期！')
      //   return
      // }

      // if ($scope.rlist.length === 1 && !$scope.rlist[0].contractproject) {
      //   alert('请选择项目！')
      //   return
      // }
      // if ($scope.rlist.length === 1 && !$scope.rlist[0].contractprojectChild && $scope.rlist[0].contractproject != 3) {
      //   alert('请选择子项目！')
      //   return
      // }
      // if ($scope.rlist.length === 1 && !$scope.rlist[0].projectAmount) {
      //   alert('请填写项目费用！')
      //   return
      // }

      // if ($scope.paylist.length === 1 && !$scope.paylist[0].payType) {
      //   alert('请选择支付方式！')
      //   return
      // }
      // if ($scope.paylist.length === 1 && !$scope.paylist[0].payId) {
      //   alert('请填写支付方账号！')
      //   return
      // }
      // if ($scope.paylist.length === 1 && !$scope.paylist[0].time) {
      //   alert('请选择支付时间！')
      //   return
      // }
      // if ($scope.paylist.length === 1 && !$scope.paylist[0].payimg) {
      //   alert('请上传支付凭证！')
      //   return
      // }
      // if ($scope.postData.signTime) {
      //   $scope.postData.signTime = $scope.formateDate($scope.postData.signTime)
      // }
      // for (let i in $scope.paylist) {
      //   $scope.paylist[i].time = $scope.formateDate($scope.paylist[i].time)
      // }
      var a = $scope.postData.chargeAmount || 0
      var b = $scope.postData.financeAmount || 0
      var c = $scope.postData.outworkAmount || 0
      var d = $scope.postData.collectionAmount || 0
      console.log(a, b, c, d)
      $scope.postData.amount = a + b + c + d
      console.log($scope.postData.amount)
      var RealName = user.RealName
      if ($scope.postData.Remark) {
        $scope.postData.Remark = $scope.postData.Remark  + '{' + RealName + '}'
      }
      $scope.postData.CompanyName = $scope.customer.CompanyName || ''
      $scope.postData.Connector = $scope.customer.Connector || ''
      $scope.postData.Mobile = $scope.customer.Mobile || ''
      $scope.postData.SaleName = $scope.customer.SaleName || ''
      console.log($scope.postData)
      console.log($scope.rlist, '$scope.rlist')
      console.log($scope.paylist, 'paylist')
      // 请求成功后弹窗倒计时 之后关闭弹窗
      // var i = 5
      // var intervalid
      // function fun() {
      //   i--
      //   if (i == 0) {
      //     // $uibModalInstance.dismiss()
      //     clearInterval(intervalid)
      //   }
      // }
      // intervalid = setInterval("fun()", 1000)
      alert('提交成功!' + i + '秒钟后跳转到合同列表页')
    }
    $scope.cancel = function () {
      $uibModalInstance.dismiss()
    }
    $scope.selectCustomer = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/Order_cusSelect.html',
        controller: 'Order_cusSelect',
        size: 'lg',
      })
      modalInstance.result.then(function (result) {
        $scope.customer = result // 选择完的用户赋值给列表需要显示的地方
        console.log(result, '读取用户数据')
        $scope.canChange = false
        if (result.AreaCode) {
          $scope.areaSele = result.AreaCode
        }
      }, function () {

      })
    }
    $scope.delete = function (index) {
        $scope.rlist.splice(index, 1);
    }
    $scope.delete2 = function (index) {
        $scope.uploader1.splice(index, 1);
        $scope.paylist.splice(index, 1);
    }
    //日期
    $scope.clear = function () { //清空
        $scope.dt = null;
    }
    $scope.popup1 = {
        opened: false
    }
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    }
  }
]).controller('Order_contract_detail', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'FileUploader','$filter', 'user', 'contractItem',
  function ($scope, $http, $uibModal, $uibModalInstance, FileUploader, $filter, UserServe, contractItem) {
    console.log(contractItem, 'contractItem')
    var user = UserServe.get()
    $scope.user = UserServe.get()
    $scope.canChange = true
    $scope.isEdit = false
    $scope.canSave = false
    $scope.rlist = [{}]
    $scope.paylist = [{}]
    $scope.postDetail = {}
    $scope.payimg = ''
    $scope.uploader1 = []
    $scope.imgIndex = 0
    $scope.canCheck = false
    $scope.canStop = false
    $scope.rlistMoney = {}
    $scope.Remark = ''
    $scope.projectItems = []

    // 获取项目下拉选项
    function getProjectItem() {
      $scope.projectItems = [{
        Id: '1',
        Name: '记账报税',
        Children: [
          {Id: '1', Name: '小规模'},
          {Id: '2', Name: '一般纳税人'}
      ]}, {
        Id: '2',
        Name: '财务费用',
        Children: [
          {Id: '3', Name: '税控器托管'},
          {Id: '4', Name: '税务其他项目'}
      ]}, {
        Id: '3',
        Name: '外勤服务费',
        Children: []
      }, {
        Id: '4',
        Name: '代收费用',
        Children: [
          {Id: '6', Name: '地址费'},
          {Id: '7', Name: '刻章费用'}
      ]}
    ]}
    getProjectItem()

    contractItem.signTime = new Date(contractItem.signTime)
    $scope.postDetail = contractItem

    for (var i in $scope.postDetail.rlist) {
      $scope.postDetail.rlist[i].contractproject = $scope.postDetail.rlist[i].contractproject + ''
    }

    for (var i in $scope.postDetail.rlist) {
      var contractprojectChildOptions = []
      for (var j in $scope.projectItems) {
        if ($scope.postDetail.rlist[i].contractproject == $scope.projectItems[j].Id) {
          $scope.postDetail.rlist[i].contractprojectChildOptions = $scope.projectItems[j].Children
        }
      }
    }
    $scope.rlist = $scope.postDetail.rlist
    console.log($scope.rlist)
    for (var i in $scope.postDetail.paylist) {
      $scope.postDetail.paylist[i].payType = $scope.postDetail.paylist[i].payType + ''
      $scope.postDetail.paylist[i].time = new Date($scope.postDetail.paylist[i].time)
    }
    $scope.paylist = $scope.postDetail.paylist
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

    $scope.getcurProject = function (index) {
      console.log($scope.rlist[index], 'item')
      $scope.rlist[index].contractprojectChild = ''
      var contractprojectChildOptions = {}
      for (var i in $scope.projectItems) {
        if ($scope.rlist[index].contractproject == $scope.projectItems[i].Id) {
          contractprojectChildOptions = $scope.projectItems[i].Children
        }
      }
      $scope.rlist[index].contractprojectChildOptions = contractprojectChildOptions
    }
    $scope.geteveryProjectAmount = function(rlist) {
      // console.log(rlist)
      var arr = [0, 0, 0, 0]
      for (let i in rlist) {
        if (rlist[i].contractproject === '1') {
          arr[0] += rlist[i].projectAmount || 0
        } else if (rlist[i].contractproject === '2') {
          arr[1] += rlist[i].projectAmount || 0
        } else if (rlist[i].contractproject === '3') {
          arr[2] += rlist[i].projectAmount || 0
        } else if (rlist[i].contractproject === '4') {
          arr[3] += rlist[i].projectAmount || 0
        }
      }
      return arr
    }
    $scope.canCompile = function() {
      $scope.paylist.forEach(function(){
          $scope.uploader1[arguments[1]] = addFileUploadInstance()
      })
      $scope.isEdit = true
      $scope.canChange = false
      $scope.canSave = true
    }
    $scope.reduce = function(rlist) {
      return rlist.reduce(function(r,t){
        return r + (t.projectAmount||0);},0) || 0
    }
    $scope.delete = function (index) {
        $scope.postDetail.rlist.splice(index, 1);
    }
    $scope.cancel = function () {
      $uibModalInstance.dismiss()
    }
    // 图片上唇
    var uploadUrl = 'https://pilipa.oss-cn-beijing.aliyuncs.com'
    $http.get('/api/signkey').success(function (res) {
        delete res.data.Filename
        delete res.data.key
        delete res.data.callback
        delete res.data.expire
        delete res.data.Host
        $scope.signkey = res.data
    })
    $scope.imgClick = function (index) {
      $scope.imgIndex = index
    }
    $scope.addClick= function (index) {
      $scope.uploader1.push(addFileUploadInstance ())
    }
    $scope.uploader1[0] = addFileUploadInstance()
    function addFileUploadInstance () {
      var uploader = {}
      uploader1 = new FileUploader({
          autoUpload: true,
          url: uploadUrl
      })
      uploader1.onErrorItem = uploadError
      uploader1.onCompleteItem = function (fileItem, response, status, headers) {
          // $scope.imgs.push(uploadUrl + '/' + item.key)
          console.log(arguments)
          $scope.payimg = uploadUrl + '/' + $scope._key1
          $scope.paylist[$scope.imgIndex].payimg = $scope.payimg
      }

      uploader1.onErrorItem = function () {
          alert('上传失败')
      }
      uploader1.onBeforeUploadItem = function (item) {
        //item.formData = [];
        // debugger
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
      };
      uploader1.filters.push({
        name: 'customFilter',
        fn: function(item, options) {
            var reg = /^.*\.(?:png|jpg|bmp|gif|jpeg)$/;
            if (!reg.test(item.name.toLowerCase())) {
                alert('请选择图片')
                return false
            }
            return true
        }
      })
      return uploader1;
    }
    function buildKey(type, fileName) {
      var randomFilename = ""
      var get_suffix = function (filename) {
        var suffix = ''
        var pos = filename.lastIndexOf('.')

        if (pos != -1) {
            suffix = filename.substring(pos)
        }
        return suffix
      }
      var random_string = function (len) {
        len = len || 32
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        var maxPos = chars.length
        var pwd = ''
        for (var i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
      }
      var suffix = get_suffix(fileName)
      var typMap = 'FileUploads/pay/'
      var nowstr = $filter('date')(new Date(), 'yyyyMM')
      var g_object_name = typMap + nowstr + '/' + random_string(10) + suffix
      return g_object_name
    }
    function uploadError(item) {
      alert('上传失败!')
    }
    $scope.delete2 = function (index) {
        $scope.uploader1.splice(index, 1);
        $scope.paylist.splice(index, 1);
    }
    // $scope.add0 = function (m) {
    //   return m<10?'0'+m:m
    // }
    //
    // $scope.formateDate = function (time) {
    //   time = new Date(time);
    //   var y = time.getFullYear();
    //   var m = time.getMonth()+1;
    //   var d = time.getDate();
    //   return y+'-'+$scope.add0(m)+'-'+$scope.add0(d)
    // }
    $scope.check = function () { // 审单人员审核
      // 点击审核发送请求 成功后弹框关闭 刷新数据列表 合同状态变成已审核 财务状态变成待审核
      $scope.postDetail.contractstatus = 2
      $scope.postDetail.financestatus = 1
      $uibModalInstance.dismiss('cancel')
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
          $scope.postDetail.contractstatus = 3
      }, function() {

      });
    }
    $scope.ok = function (ev) {
      // if (!$scope.postDetail.CompanyName) {
      //   alert('请填写甲方！')
      //   return
      // }
      // if (!$scope.postDetail.Connector) {
      //   alert('请填写联系人！')
      //   return
      // }
      // if (!$scope.postDetail.Mobile) {
      //   alert('请填写联系人电话！')
      //   return
      // }
      // if (!$scope.postDetail.contractId) {
      //   alert('请填写合同编号！')
      //   return
      // }
      // if (!$scope.postDetail.contracttype) {
      //   alert('请选择合同类型！')
      //   return
      // }
      // if (!$scope.postDetail.signTime) {
      //   alert('请填写签订日期！')
      //   return
      // }

      // if ($scope.rlist.length === 1 && !$scope.rlist[0].contractproject) {
      //   alert('请选择项目！')
      //   return
      // }
      // if ($scope.rlist.length === 1 && !$scope.rlist[0].contractprojectChild && $scope.rlist[0].contractproject != 3) {
      //   alert('请选择子项目！')
      //   return
      // }
      // if ($scope.rlist.length === 1 && !$scope.rlist[0].projectAmount) {
      //   alert('请填写项目费用！')
      //   return
      // }

      // if ($scope.paylist.length === 1 && !$scope.paylist[0].payType) {
      //   alert('请选择支付方式！')
      //   return
      // }
      // if ($scope.paylist.length === 1 && !$scope.paylist[0].payId) {
      //   alert('请填写支付方账号！')
      //   return
      // }
      // if ($scope.paylist.length === 1 && !$scope.paylist[0].time) {
      //   alert('请选择支付时间！')
      //   return
      // }
      // if ($scope.paylist.length === 1 && !$scope.paylist[0].payimg) {
      //   alert('请上传支付凭证！')
      //   return
      // }
      // 时间
      // if ($scope.postDetail.signTime) {
      //   $scope.postDetail.signTime = $scope.formateDate($scope.postDetail.signTime)
      // }
      // for (let i in $scope.paylist) {
      //   $scope.paylist[i].time = $scope.formateDate($scope.paylist[i].time)
      // }

      // 开始计算修改时候总金额
      var arr = [0, 0, 0, 0]
      for (let i in $scope.rlist) {
        if ($scope.rlist[i].contractproject === '1') {
          $scope.rlistMoney.chargeAmount = arr[0] += $scope.rlist[i].projectAmount || 0
        } else if ($scope.rlist[i].contractproject === '2') {
          $scope.rlistMoney.financeAmount = arr[1] += $scope.rlist[i].projectAmount || 0
        } else if ($scope.rlist[i].contractproject === '3') {
          $scope.rlistMoney.outworkAmount = arr[2] += $scope.rlist[i].projectAmount || 0
        } else if ($scope.rlist[i].contractproject === '4') {
          $scope.rlistMoney.collectionAmount = arr[3] += $scope.rlist[i].projectAmount || 0
        }
      }
      var a = $scope.rlistMoney.chargeAmount || 0
      var b = $scope.rlistMoney.financeAmount || 0
      var c = $scope.rlistMoney.outworkAmount || 0
      var d = $scope.rlistMoney.collectionAmount || 0
      console.log(a, b, c, d)
      $scope.postDetail.amount = a + b + c + d
      console.log($scope.postDetail.amount)
      // 结束计算修改时候总金额

      // 备注打标签
      var RealName = user.RealName
      if ($scope.Remark) {
        $scope.Remark = $scope.postDetail.Remark + $scope.Remark  + '{' + RealName + '}'
      }
      $scope.postDetail.Remark = $scope.Remark

      $uibModalInstance.dismiss('cancel');
      console.log($scope.postDetail)
      console.log($scope.rlist, '$scope.rlist')
      console.log($scope.paylist, 'paylist')
    }
    //日期
    $scope.clear = function () { //清空
        $scope.dt = null;
    }
    $scope.popup1 = {
        opened: false
    }
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    }
  }
]).controller('ContractRefuse', ['$scope', '$http', '$uibModalInstance', 'contractMsg', 'user', function($scope, $http, $uibModalInstance, contract, users) {
  var users = users.get()
  console.log(users)
  console.log(contract, 'contract')
  $scope.postData = contract
  $scope.Remark = ''
  $scope.save = function() {
    var RealName = users.RealName
    $scope.postData.Remark = $scope.postData.Remark + $scope.Remark + '{' + RealName + '}'
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
}]).controller("Order_cusSelect", ['$scope', '$http', '$uibModalInstance', function ($scope, $http, $uibModalInstance) {
    $scope.search = {
      CompanyName: ''
    }
    $scope.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 10,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
    }
    $scope.searchParams = {
      limit: 10,
      offset: 0,
      start: '',
      end: '',
      status: 0,
      cusname: '',
      cid: ''
    }
    $scope.pageChanged = function () {
      refreshData()
    }
    //set current page
    $scope.setCurrentPage = function () {
      $scope.paginator.currentPage = $scope.currentPage;
      refreshData()
    }
    $scope.searchItem = {
      companyname: ''
    };
    $scope.search = function () {
      $scope.searchItem.companyname = $scope.search.CompanyName;
      refreshData()
    }

    function refreshData() {
      var data = angular.extend({
        offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
        limit: $scope.paginator.perPage
      }, $scope.searchItem)
      $http.get('/api/order/customer?' + $.param(data)).success(function (res) {
        $scope.paginator.total = res.data.total
        $scope.customers = res.data.list
      })
    }
    refreshData()

    $scope.select = function (item) {
      $uibModalInstance.close(item);
    }
    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    }
}])
