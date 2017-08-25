angular.module('crmApp').controller('Dashboard', ['$scope', '$state', 'user', 'menu', 'server', '$filter', '$mdDialog', '$q',
  function($scope, $state, user, menu, server, $filter, $mdDialog, $q) {
    $scope.sections = menu.sections;
    $scope.user = user.get();
    $scope.rmd = {};
    $scope.rmd.DQdate = new Date();
    $scope.getRemind = function() {
      server.http.get('/api/nexttrackremind?DQdate=' + $scope.rmd.DQdate.toISOString()).success(function(res) {
        //var today = $filter('date')(new Date(), 'yyyy-MM-dd');
        $scope.reminds = res.data;
      });
    };
    if ($scope.user.IsCenter) {
      if ($scope.user.RoleId === 4) {
        $state.go('main.site_ps');
      } else {
        server.http.get('/api/subsidiary').success(function(res) {
          $scope.companies = res.data.list;
        });
      }

    } else {
      $scope.timeoption = {
        timezone: 'UTC'
      }
      
      $scope.getRemind();
      if ($scope.user.RoleId == 11 || $scope.user.RoleId == 7 || $scope.user.RoleId == 9) {
        ranking();
      }
    }
    
    $scope.showNext = true;
    $scope.open = function(item) {
      var customer = angular.copy(item);
      customer.Id = customer.CustomerId;
      $mdDialog.show({
          controller: 'Customer_view',
          templateUrl: 'views/customer_view.html',
          clickOutsideToClose: true,
          fullscreen: true,
          locals: { customer: customer || {}, getNextId: $scope.getNextId }
        })
        .then(function(answer) {
          refreshData();
        }, function() {

        });
    };
    $scope.getNextId = function(item) {
      var deferred = $q.defer();

      var c = _.find($scope.reminds, { CustomerId: item.Id });
      var index = _.indexOf($scope.reminds, c) + 1;
      if (index < $scope.reminds.length) {
        deferred.resolve($scope.reminds[index].CustomerId);
      } else {
        alert('没有下一个了。');
        deferred.reject();
      }

      return deferred.promise;

    }

    $scope.track = function(item) {
      var customer = angular.copy(item);
      customer.Id = customer.CustomerId;
      $mdDialog.show({
          controller: 'Customer_track',
          templateUrl: 'views/customer_track.html',
          clickOutsideToClose: true,
          fullscreen: true,
          locals: { customer: customer || {} }
        })
        .then(function(answer) {
          refreshData();
        }, function() {

        });
    }
    $scope.forward = function(item) {
      var customer = angular.copy(item);
      customer.Id = customer.CustomerId;
      $mdDialog.show({
          controller: 'Customer_forword',
          templateUrl: 'views/customer_forward.html',
          clickOutsideToClose: true,
          fullscreen: true,
          locals: { customer: customer || {} }
        })
        .then(function(answer) {
          refreshData();
        }, function() {

        });
    }
    $scope.toPub = function(customer) {
      if (!confirm("确认要将客户转入公海吗？")) return;
      server.http.put('/api/custranstoocean?customerId=' + customer.CustomerId).success(function(res) {
        if (res.status) refreshData();
      });
    };


    $scope.enter = function(item) {
      server.http.put('/api/subsidiary/entrance?SubsidiaryId=' + item.SubsidiaryId).success(function(res) {
        server.http.get('/api/users/functionlist').success(function(res) {
          var menu = [];
          var last;
          _.each(res.data, function(item) {
            if (item.FunctionLevel == 1) {
              menu.push(item);
              item.children = [];
              last = item;
            } else {
              last.children.push(item)
            }
          });
          user.FunctionList = JSON.stringify(menu);
          user.IsCenter = 0;
          user.se = 1;
          user.set(user);
          location.reload();

        });
      });
    }


    function ranking() {
      var now = new Date();
      var endstr = $filter('date')(now, 'yyyy-MM-dd');
      var y = now.getFullYear();
      var m = now.getMonth();
      var yearStart = new Date(y + '-1-1');

      var halfStart;
      if (m > 5) {
        halfStart = new Date(y + '-7-1');
      }
      var quarterStart = new Date(y + '-' + (Math.floor(m / 3) * 3 + 1) + '-1');
      var monthStart = new Date()
      monthStart.setDate(1);
      server.http.get('/api/allsalestop?startDate=' + $filter('date')(yearStart, 'yyyy-MM-dd') + '&endDate=' + endstr).success(function(res) {
        $scope.year = res.data;
        if (!halfStart) $scope.halfyear = res.data;
      });
      if (halfStart) {
        server.http.get('/api/allsalestop?startDate=' + $filter('date')(halfStart, 'yyyy-MM-dd') + '&endDate=' + endstr).success(function(res) {
          $scope.halfyear = res.data;
        });
      }
      server.http.get('/api/allsalestop?startDate=' + $filter('date')(quarterStart, 'yyyy-MM-dd') + '&endDate=' + endstr).success(function(res) {
        $scope.quarter = res.data;
      });
      server.http.get('/api/allsalestop?startDate=' + $filter('date')(monthStart, 'yyyy-MM-dd') + '&endDate=' + endstr).success(function(res) {
        $scope.month = res.data;
      });

    }
  }
]);
