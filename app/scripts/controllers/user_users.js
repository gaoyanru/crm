angular.module('crmApp').controller('User_users', ['$scope', 'server', '$state', '$mdDialog', 'user', function($scope, server, $state, $mdDialog, user) {
    $scope.user = user.get();
    $scope.open = function(item) {
        $mdDialog.show({
                controller: 'User_view',
                templateUrl: 'views/user_view.html',
                clickOutsideToClose: true,
                fullscreen: true,
                locals: { customer: item || {} }
            })
            .then(function(answer) {
                refreshData();
            }, function() {

            });
    };
    $scope.delete = function(item) {
        if (!confirm('您确定要删除？')) return;
        server.http.delete('/api/user/' + item.UserId).success(function(res) {
            if (res.status) refreshData();
        });
    };

    function refreshData() {
        var data = {
            SubsidiaryId: $scope.user.SubsidiaryId,
            userName: ''
        }
        server.http.get('/api/users?' + $.param(data)).success(function(res) {
            $scope.customers = res.data;
        });
    }
    refreshData();


}]).controller("User_view", ['$scope', 'server', '$mdDialog', '$mdToast', 'customer', function($scope, server, $mdDialog, $mdToast, customer) {
    $scope.postData = {};
    server.http.get('/api/roles').success(function(res) {
        $scope.roles = res.data;
    });
    var pages = [];
    server.http.get('/api/users/functionlist').success(function(res) {

        var menus = [];
        var parent;

        _.each(res.data, function(item) {
            var temp = {};
            temp.name = item.FunctionName;
            temp.Id = item.FunctionId;
            temp.Rank = item.Rank;
            if (item.FunctionLevel == 1) {
                parent = temp;
                parent.children = [];
                menus.push(temp);
            } else {
                parent.children.push(temp);
                pages.push(temp);
            }
        });
        var sections = [];
        _.each(menus.sort(sortFn), function(item) {
            var section = _.pick(item, 'name', 'Id');
            section.pages = [];
            _.each(item.children.sort(sortFn), function(obj) {
                var page = _.pick(obj, 'name', 'Id');
                section.pages.push(page);
            });
            sections.push(section);
        });
        $scope.functionlist = sections;

        function sortFn(a, b) {
            return a.Rank > b.Rank;
        };

        if (customer.UserId) {
            $scope.postData = _.extend($scope.postData, customer);
            var flist = JSON.parse($scope.postData.FunctionList);
            $scope.postData.functions = [];
            _.each(flist, function(item) {
                _.each(item.children, function(page) {
                    var temp = _.find(pages, function(t) {
                        return page.FunctionId == t.Id;
                    });
                    if (temp) $scope.postData.functions.push(temp);
                });
            });
        }
    });
    $scope.changeRole = function() {
        var roleid = $scope.postData.RoleId;
        var role = _.find($scope.roles, function(r) {
            return r.RoleId == roleid;
        });
        if (role) {
            $scope.postData.functions = [];
            var flist = role.FunctionList.split(',');
            $scope.postData.functions = _.filter(pages, function(t) {
                return flist.indexOf(t.Id) >= 0;
            });

        }
    }

    $scope.title = customer.UserName || "新增用户";

    $scope.getSelectedText = function() {
        if (!$scope.postData.functions) return '';
        if ($scope.postData.functions.length > 1) {
            return $scope.postData.functions[0].name + ' 等' + $scope.postData.functions.length + '项';
        } else {
            return $scope.postData.functions[0].name;
        }
    }
    $scope.ok = function(ev) {
        var postData = angular.copy($scope.postData);
        postData.FunctionList = _.map(postData.functions, function(item) {
            return item.Id
        });
        var parr = _.chain(postData.FunctionList).map(function(item) {
            return item.substr(0, 2);
        }).uniq();
        postData.FunctionList = parr.union(postData.FunctionList).value().join(',');
        delete postData.functions;
        if (!customer.UserId) {
            server.http.post('/api/user', postData).success(function(res) {
                if (res.status) {
                    $mdDialog.hide();
                }
            });
        } else {
            server.http.put('/api/user/' + customer.UserId, postData).success(function(res) {
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
}]).controller("User_my", ['$scope', 'server', '$mdToast', function($scope, server, $mdToast) {
    $scope.postData = {};

    server.http.get('/api/user').success(function(res) {
        $scope.postData = res.data[0];
    });
    $scope.ok = function(ev) {
        var postData = angular.copy($scope.postData);
        var flist = JSON.parse(postData.FunctionList);
        var temp = [];
        _.each(flist, function(item) {
            temp.push(item.FunctionId);
            _.each(item.children, function(d) {
                temp.push(d.FunctionId);
            });
        });
        postData.FunctionList = temp.join(',');
        server.http.put('/api/user/' + postData.UserId, postData).success(function(res) {
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


    };
    $scope.psdData = {};
    $scope.changePsd = function(ev) {
        var postData = angular.copy($scope.psdData);
        if(postData.New != postData.New2){
            alert('新密码不一致！');
            return;
        }
        server.http.put('/api/user/pwd/reset', postData).success(function(res) {
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


    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    }
}]);
