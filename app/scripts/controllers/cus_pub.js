angular.module('crmApp').controller('Customer_pub', ['$scope', 'server', '$state', '$mdDialog', 'FileUploader', '$timeout', '$mdToast', 'user', '$q',
  function($scope, server, $state, $mdDialog, FileUploader, $timeout, $mdToast, user, $q) {
    $scope.title = $state.current.title;
    $scope.user = user.get();

    $scope.open = function(item) {
      var tplUrl;
      if (item) {
        tplUrl = 'views/customer_view.html';
      } else {
        tplUrl = 'views/customer_addCustomer.html';
      }
      $mdDialog.show({
          controller: 'Customer_viewpub',
          templateUrl: tplUrl,
          clickOutsideToClose: true,
          fullscreen: true,
          locals: {
            customer: item || {},
            getNextId: $scope.getNextId
          },
          // preserveScope: true,
          // scope: $scope
        })
        .then(function(answer) {
          resFn(answer);
        }, function() {

        });

      function resFn(answer) {
        refreshData();
      }

    };
    $scope.getNextId = function(item) {
      var deferred = $q.defer();

      var c = _.find($scope.customers, { Id: item.Id });
      var index = _.indexOf($scope.customers, c) + 1;
      if (index < $scope.customers.length) {
        deferred.resolve($scope.customers[index].Id);
      } else {
        $scope.paginator.currentPage += 1;
        refreshData().then(function(id) {
          deferred.resolve(id);
        });
      }

      return deferred.promise;
    };
    $scope.delete = function(item) {
      if (!confirm("确认要删除客户吗？")) return;
      server.deleteCustomer(item.Id).success(function(res) {
        if (res.status) refreshData();
      });
    };

    $scope.forward = function(item) {
      server.http.put('/api/opencustomer/' + item.Id + '/6').success(function(res) {
        if (res.status) {
          $mdToast.show(
            $mdToast.simple()
            .textContent('操作成功！')
            .position('top center')
            .hideDelay(1000)
          );
          refreshData();
        }
      });
    }

    $scope.paginator = {
      total: 0,
      currentPage: 1,
      perPage: 10,
      previousText: '上一页',
      nextText: '下一页',
      lastText: '最后一页',
      firstText: '首页'
    };

    $scope.searchParams = {
      limit: 10,
      offset: 0,
      start: '',
      end: '',
      status: 0,
      cusname: '',
      cid: ''
    };
    $scope.pageChanged = function() {
      refreshData();
    };

    //set current page
    $scope.setCurrentPage = function() {
      $scope.paginator.currentPage = $scope.currentPage;
      refreshData();
    };
    $scope.searchItem = {
      companyName: '',
      Mobile: '',
      HisCusTypeId: 0
    };
    server.http.get('/api/cuscategory').success(function(res) {
      if (res.status) $scope.ctypes = res.data.sort(ctypeSortFn);
    });

    function ctypeSortFn(a, b) {
      return parseInt(a.Name) < parseInt(b.Name);
    }
    $scope.search = {
      cusType: 0
    };
    $scope.search = function() {
      $scope.searchItem.companyName = $scope.search.companyName;
      $scope.searchItem.Mobile = $scope.search.phone;
      $scope.searchItem.HisCusTypeId = $scope.search.cusType;
      refreshData($scope.searchItem);
    }

    function refreshData() {
      var data = angular.extend({
        offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
        limit: $scope.paginator.perPage
      }, $scope.searchItem, data);
      server.http.get('/api/opencustomer?' + $.param(data)).success(function(res) {
        $scope.paginator.total = res.data.total;
        $scope.customers = res.data.list;
      });
    }
    refreshData();

    server.http.get('/api/customersource').success(function(res) {
      if (res.status) {
        $scope.sourceTypes = res.data;
      }
    });


  }
]).controller("Customer_viewpub", ['$scope', 'server', '$mdDialog', '$mdToast', 'customer', 'getNextId',
  function($scope, server, $mdDialog, $mdToast, customer, getNextId) {
    $scope.postData = { CustomerTypeId: 5 };
    $scope.isPub = true; //是否是公海
    $scope.customer = { Id: customer.Id };
    server.getCustomerType().success(function(res) {
      $scope.ctypes = res.data;
    });
    server.http.get('/api/customersource').success(function(res) {
        if (res.status) {
            $scope.sourceTypes = res.data;
        }
    });
    $scope.title = customer.CompanyName || "新增客户";

    function getCustomerDetail(id) {
      if (!id) return;
      server.getCustomerDetail(id).success(function(res) {
        if (res.status) {
          $scope.postData = _.extend($scope.postData, res.data);
          $scope.title = $scope.postData.CompanyName;
        }
      });
      refreshTag();
    }
    getCustomerDetail(customer.Id);
    $scope.next = function(item) {
      angular.element('div[ng-controller="Customer_track"]').scope().save();
      if (!customer.Id) {
        server.saveCustomer($scope.postData, 0).success(function(res) {
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
                  getNextId(item).then(function(id) {
                    $scope.customer.Id = id;
                    getCustomerDetail(id);
                  });
                })
              };
            }
          } else {
            getNextId(item).then(function(id) {
              $scope.customer.Id = id;
              getCustomerDetail(id);
            });
          }
        });
      } else {
        server.http.put('/api/customer/' + customer.Id, $scope.postData).success(function(res) {
          if (res.status) {
            getNextId(item).then(function(id) {
              $scope.customer.Id = id;
              getCustomerDetail(id);
            });
          }
        });
      }

    }
    $scope.ok = function(ev) {
      if (!customer.Id) {
        server.saveCustomer($scope.postData, 0).success(function(res) {
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
                  if (res.status) $mdDialog.hide($scope.postData);
                })
              };
            }
          } else {
            $mdDialog.hide($scope.postData);
          }
        });
      } else {
        server.http.put('/api/customer/' + customer.Id, $scope.postData).success(function(res) {
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


    function refreshTag() {
      if (!customer.Id) return;
      server.http.get('/api/customertag/' + customer.Id).success(function(res) {
        $scope.custags = res.data;
      });
    }
  }
]).controller("Customer_rob", ['$scope', 'server', '$mdDialog', '$mdToast', 'customer', function($scope, server, $mdDialog, $mdToast, customer) {

  server.getCustomerType().success(function(res) {
    $scope.ctypes = res.data;
  });
  var isRefresh = false;
  $scope.ok = function(ev) {
    server.http.put('/api/opencustomer/' + customer.Id + '/' + $scope.cusType).success(function(res) {
      isRefresh = true;
      if (res.status) {
        $mdToast.show(
          $mdToast.simple()
          .textContent('操作成功！')
          .position('top center')
          .hideDelay(1000)
        );
        $mdDialog.hide();
      }
    });
  };
  $scope.cancel = function() {
    if (isRefresh)
      $mdDialog.hide();
    else
      $mdDialog.cancel();
  }
}]);
