angular.module('crmApp').controller('Contract_manage', ['$scope', '$http', '$state', '$uibModal', 'user', '$q',
  function ($scope, $http, $state, $uibModal, user, $q) {
    $scope.user = user.get()
    console.log(user, '登录用户信息')
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
    $scope.accountStatus = { // 合同状态
      1: "待审核",
      2: "已审核",
      3: "已驳回"
    }
    $scope.contracts = [{
      contractId: '22',
      firstParty: '22',
      contacts: '22',
      salesId: '22',
      contracttype: '22',
      contractstatus: '22',
      contractSignDate: '22',
      contractSignAmount: '22',
      accountstatus: '22',
      operator: '22',
      lastChangeDate: '22'
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
    $scope.detail = function() {
      alert('查看详情')
    }
    $scope.delete = function(item) {
      console.log(item, '操作本行数据')
      if (!confirm("确认要删除此条记录吗？")) return
      // $http.put('api/maintask/cancelstatus/' + item.contractId).success(function (res) {
      //     if (res.status) refreshData()
      // })
    }
    $scope.searchFn = function () {
      console.log($scope.search)
      refreshData()
    }

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
    $scope.clear = function () { //清空
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
    console.log(user, '新增用户时用户信息')
    $scope.postData = {}
    $scope.areaSele = 0 // 选择用户列表
    $scope.canChange = true
    $scope.rlist = [{}]
    $scope.paylist = [{}]

    $scope.contractType = { // 合同类型
      1: "新增",
      2: "续费"
    }
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
    $scope.getcurProject = function (rg) {
      rg.contractprojectChildren = {}
      switch (rg.contractproject) {
        case '1':
          rg.contractprojectChildren['1'] = '小规模'
          rg.contractprojectChildren['2'] = '一般纳税人'
          break
        case '2':
          rg.contractprojectChildren['1'] = '税控器托管'
          rg.contractprojectChildren['2'] = '税务其他项目'
          break
        case '4':
          rg.contractprojectChildren['1'] = '地址费'
          rg.contractprojectChildren['2'] = '刻章费用'
          break
        default:
          rg.contractprojectChildren = {}
      }
      // console.log(rg)
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
    $scope.reduce = function(rlist) {
      return rlist.reduce(function(r,t){
        // console.log(r, t)
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
    $scope.imgs = []
    $scope.uploader1 = new FileUploader({
        autoUpload: true,
        url: uploadUrl
    })
    $scope.uploader1.onErrorItem = uploadError
    $scope.uploader1.onSuccessItem = function (item, response, status, headers) {
        $scope.imgs.push(uploadUrl + '/' + item.key)
    }
    $scope.uploader1.onErrorItem = function (item, response, status, headers) {
        alert(item.file.name + '上传失败')
    }
    $scope.uploader1.onBeforeUploadItem = function (item) {
      //item.formData = [];
      var key = buildKey(item.file.name);
      item.formData.push({
          key: key
      });
      _.each($scope.signkey, function (value, key) {
          var temp = {};
          temp[key] = value;
          item.formData.push(temp)
      });
      item.key = key
    }
    $scope.uploader1.filters.push({
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
    function buildKey(fileName) {
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
      var typMap = 'FileUploads/Recharge/'
      var nowstr = $filter('date')(new Date(), 'yyyyMM')
      var g_object_name = typMap + nowstr + '/' + random_string(10) + suffix
      return g_object_name
    }
    function uploadError(item) {
      alert('上传失败!')
    }

    $scope.ok = function (ev) {
      alert('保存成功')
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
        $scope.postData.Customer = result // 选择完的用户赋值给列表需要显示的地方
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
]).controller("Order_cusSelect", ['$scope', '$http', '$uibModalInstance', function ($scope, $http, $uibModalInstance) {
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
