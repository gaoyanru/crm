angular.module('crmApp').controller('Customer_my', ['$scope', 'server', '$state', '$mdDialog', 'user', '$mdToast', '$q', 'FileUploader', '$timeout',
    function($scope, server, $state, $mdDialog, user, $mdToast, $q, FileUploader, $timeout) {
        $scope.user = user.get();
        $scope.open = function(item) {
            var tplUrl;
            if (item) {
                tplUrl = 'views/customer_view.html';
            } else {
                tplUrl = 'views/customer_addCustomer.html';
            }
            $mdDialog.show({
                    controller: 'Customer_view',
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

        server.getCustomerType().success(function(res) {
            $scope.ctypes = res.data.sort(ctypeSortFn);
        });

        function ctypeSortFn(a, b) {
            return parseInt(a.Name) < parseInt(b.Name);
        }


        $scope.search = {
            cusType: 0,
            userid: 0
        };
        $scope.delete = function(item) {
            if (!confirm("确认要删除客户吗？")) return;
            server.deleteCustomer(item.Id).then(function(res) {
                if (res.status) refreshData();
            });
        };

        //skipHide: true,
        $scope.forward = function(item) {
            $mdDialog.show({
                    controller: 'Customer_forword',
                    templateUrl: 'views/customer_forward.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: { customer: item || {} }
                })
                .then(function(answer) {
                    refreshData();
                }, function() {

                });
        }
        $scope.toPub = function(customer) {
            if (!confirm("确认要将客户转入公海吗？")) return;
            server.http.put('/api/custranstoocean?customerId=' + customer.Id).then(function(res) {
                if (res.status) refreshData();
            });
        };
        $scope.toPubAll = function() {
            var ids = _.map(_.filter($scope.customers, { selected: true }), 'Id');
            server.http.post('/api/customerocean', ids).then(function(res) {
                refreshData();
            });
        };
        $scope.selectAll = function() {
            _.each($scope.customers, function(item) {
                item.selected = true;
            });
        }
        $scope.clear = function() {
            _.each($scope.customers, function(item) {
                item.selected = false;
            });
        }
        $scope.toOthersAll = function() {
            var ids = _.map(_.filter($scope.customers, { selected: true }), 'Id');
            $mdDialog.show({
                    controller: 'Customer_forword',
                    templateUrl: 'views/customer_forward.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                    locals: { customer: ids || [] }
                })
                .then(function(answer) {
                    refreshData();
                }, function() {

                });
        }
        $scope.closeTool = function() {
            $scope.batIsOpen = false;
        }
        $scope.getFromPub = function(id) {
            server.http.put('/api/grabcustomers?CustomerSourceId=' + id).success(function(res) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('操作成功！')
                    .position('top center')
                    .hideDelay(1000)
                );
                refreshData();
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
            SalesId: 0,
            phone: '',
            CustomerTypeId: 0,
            tagIds: 0,
            DepartmentId: 0,
            CustomerSourceId: 0
        };

        $scope.searchFn = function() {
            $scope.searchItem.companyName = $scope.search.companyName;
            $scope.searchItem.phone = $scope.search.phone;
            $scope.searchItem.CustomerTypeId = $scope.search.cusType;
            if (angular.isArray($scope.search.tagId)) {
                $scope.searchItem.tagIds = _.map($scope.search.tagId, 'Id').join(',')
            } else {
                $scope.searchItem.tagIds = '';
            }

            $scope.searchItem.DepartmentId = $scope.search.DepartmentId || 0;
            $scope.searchItem.SalesId = $scope.search.userid || 0;
            $scope.searchItem.CustomerSourceId = $scope.search.CustomerSourceId || 0;
            $scope.searchItem.firsttracktime = $scope.search.firsttracktime ? $scope.search.firsttracktime.toISOString() : '';
            $scope.searchItem.lasttracktime = $scope.search.lasttracktime ? $scope.search.lasttracktime.toISOString() : '';
            refreshData($scope.searchItem);
        }

        $scope.checkBQ = function() {
            console.log($scope.search.tagId, '$scope.search.tagId')
            if ($scope.search.tagId.indexOf(0) > -1 && $scope.search.tagId.length > 1) {
                _.pull($scope.search.tagId, 0);
            }
        };
        $scope.tagSelect = function(tag) {
            console.log(tag, 'tag')
            if (!angular.isArray($scope.search.tagId)) {
                return;
            }
            if ($scope.search.tagId.indexOf(tag) > -1) {

            } else {
                _.remove($scope.search.tagId, function(item) {
                    return item.TagType === tag.TagType;
                });
            }

        };

        function refreshData() {
            var deferred = $q.defer();

            var data = angular.extend({
                offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
                limit: $scope.paginator.perPage
            }, $scope.searchItem, data);
            if (data.tagIds === 0) data.tagIds = '';
            server.getMyCustomer(data).success(function(res) {
                $scope.paginator.total = res.data.total;
                $scope.customers = res.data.list;
                deferred.resolve($scope.customers[0].Id);
            });
            return deferred.promise;
        }
        refreshData();
        $scope.verifyGroup = function() {
            if ($scope.search.DepartmentId == 0) return;
            var dptId = $scope.search.DepartmentId;
            var user = _.find($scope.users, { UserId: $scope.search.userid });
            if (!user) {
                $scope.search.userid = 0;
                return;
            }
            if (user.DepartmentId != dptId) {
                $scope.search.userid = 0;
                return;
            }

        }
        server.http.get('/api/tag').success(function(res) {
            console.log(res.data, '初始tag')
            $scope.tags = res.data;
            $scope.tagGroup = _.groupBy($scope.tags, 'TagType');
            console.log($scope.tagGroup, 'tagGroup')
        });
        server.getSalers().success(function(res) {
            $scope.users = res.data;
        });
        server.http.get("/api/departments").success(function(res) {
            $scope.groups = res.data;
        });
        server.http.get('/api/customersource').success(function(res) {
            if (res.status) {
                $scope.sourceTypes = res.data;
            }
        });

        $scope.uploader2 = new FileUploader({
            url: '/api/files/4',
            autoUpload: true
        });
        $scope.uploader2.onBeforeUploadItem = function(item, progress) {
            $mdDialog.show({
                controller: ['$scope', '$interval', function(self, $interval) {
                    self.loadingText = '导入中...'

                }],
                templateUrl: 'views/common_loading.html',
                clickOutsideToClose: false,
                fullscreen: true,
                locals: { customer: item || {} }
            });
        };

        $scope.uploader2.onCompleteItem = function(fileItem, response, status, headers) {
            if (response.hasError) {
                alert(response.message);
                location.reload();
                return;
            }
            $mdDialog.hide();
            $timeout(function() {
                if (response.data.length > 0) {
                    alert(response.data.join('\n'));
                    location.reload();
                } else {
                    alert("全部导入成功！");
                    location.reload();
                }
            }, 500);
        };
        $scope.uploader2.onErrorItem = function() {
            alert('上传失败!')
        };

        // FILTERS
        $scope.uploader2.filters.push({
            name: 'customFilter',
            fn: verifyImage
        });

        function verifyImage(item, options) {
            var reg = /^.*\.(?:xls|xlsx)$/;
            if (!reg.test(item.name)) {
                alert('请选择Excel文件');
                return false;
            }
            return true;
        }
        $scope.upFile = function(id, e) {
            $scope.uploader2.url = '/api/files/4?customSourceId=' + id + '&saleId=' + $scope.user.UserId;
            $(e.target).parents('.dropdown-menu').find('input[type="file"]').click();
        }

    }
]).controller("Customer_view", ['$scope', 'server', '$mdDialog', '$mdToast', 'customer', 'user', 'getNextId',
    function($scope, server, $mdDialog, $mdToast, customer, user, getNextId) {
        $scope.postData = {};
        $scope.customer = { Id: customer.Id };
        $scope.opt = {};
        $scope.notPub = true;
        server.getCustomerType().success(function(res) {
            $scope.ctypes = res.data.sort(ctypeSortFn);
        });
        server.http.get('/api/mycity').success(function(res){
          $scope.city =res.data[0];
        });
        function ctypeSortFn(a, b) {
            return parseInt(a.Name) < parseInt(b.Name);
        }
        server.http.get('/api/customersource').success(function(res) {
            if (res.status) {
                $scope.sourceTypes = res.data;
            }
        });
        var u = user.get();
        $scope.title = customer.CompanyName || "新增客户";
        if (customer.Id) {
            getCustomerDetail(customer.Id);
        }
        $scope.next = function(item) {
            angular.element('div[ng-controller="Customer_track"]').scope().save();

            server.http.put('/api/customer/' + customer.Id + '?verify=0', $scope.postData).success(function(res) {
                if (res && angular.isObject(res.data)) {
                    var data = res.data;
                    var customers = JSON.parse(data.name);
                    $mdDialog.show({
                            controller: 'Customer_warning',
                            templateUrl: 'views/customer_warning.html',
                            clickOutsideToClose: true,
                            fullscreen: true,
                            skipHide: true,
                            locals: { customers: customers }
                        })
                        .then(function(answer) {
                            server.http.put('/api/customer/' + customer.Id + '?verify=1', $scope.postData).success(function(res) {
                                if (res.status) {
                                    getNextId(item).then(function(id) {
                                        $scope.customer.Id = id;
                                        getCustomerDetail(id);
                                    });
                                }

                            });
                        }, function() {

                        });
                } else {
                    if (res.status) {
                        getNextId(item).then(function(id) {
                            $scope.customer.Id = id;
                            getCustomerDetail(id);
                        });
                    }
                }
            });


        }
        $scope.toPub = function(item) {
            if (!confirm("确认要将客户转入公海吗？")) return;
            server.http.put('/api/custranstoocean?customerId=' + $scope.customer.Id).then(function(res) {
                if (res.status) {
                    getNextId(item).then(function(id) {
                        $scope.customer.Id = id;
                        getCustomerDetail(id);
                    });
                }
            });
        }

        function getCustomerDetail(id) {
            server.getCustomerDetail(id).success(function(res) {
                if (res.status) {
                    $scope.postData = res.data;
                    $scope.title = $scope.postData.CompanyName;
                    customer = res.data;
                    refreshTag();
                }
            });


        }
        $scope.ok = function(ev) {
            if (!customer.Id) {
                if($scope.city) $scope.postData.CityCode = $scope.city.Code;
                server.saveCustomer($scope.postData, 0).success(function(res) {
                    if (res && angular.isObject(res.data)) {
                        var data = res.data;
                        if (data.errorcode == 1) {
                            $mdToast.show(
                                $mdToast.simple()
                                .textContent(res.data.name)
                                .position('top center')
                                .hideDelay(2000)
                            );
                        } else {
                            var customers = JSON.parse(data.name);
                            $mdDialog.show({
                                    controller: 'Customer_warning',
                                    templateUrl: 'views/customer_warning.html',
                                    clickOutsideToClose: true,
                                    fullscreen: true,
                                    skipHide: true,
                                    locals: { customers: customers }
                                })
                                .then(function(answer) {
                                    server.saveCustomer($scope.postData, 1).success(function(res) {
                                        if (res.status) $mdDialog.hide();
                                    });
                                }, function() {

                                });

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
                        $mdDialog.hide($scope.postData);
                    }
                });
            }

        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        }
        $scope.addTag = function(tag) {
            var data = {
                CustomerId: customer.Id,
                TagId: tag.Id,
                SalesId: u.UserId
            }
            var index = _.indexOf($scope.tags[tag.TagType].tags, tag);
            if ($scope.tags[tag.TagType].selected === index) return;
            $scope.tags[tag.TagType].selected = index;


            var l = _.find($scope.custags, { TagType: tag.TagType });
            if (l) {
                server.http.delete('/api/customertag/' + l.Id).success(function() {
                    _addTag();
                });
                return;
            }

            _addTag();

            function _addTag() {
                server.http.post('/api/customertag', data).success(function() {
                    refreshTag();
                });
            }

        }
        $scope.deleteTag = function(tag) {
            if (tagDict) {
                var t = _.find(tagDict, { Id: tag.TagId });
                $scope.tags[t.TagType].selected = -1;
            }

            server.http.delete('/api/customertag/' + tag.Id);
        }
        $scope.track = function(item) {

            $mdDialog.show({
                    controller: 'Customer_track',
                    templateUrl: 'views/customer_track.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                    skipHide: true,
                    locals: { customer: item || {} }
                })
                .then(function(answer) {
                    //refreshData();
                }, function() {

                });
        }
        var tagDict;

        function refreshTag() {
            server.http.get('/api/customertag/' + customer.Id).success(function(res) {
                $scope.custags = res.data;
                if (!$scope.tags) {
                    getTagDict();
                }
            });
        }

        function getTagDict() {
            server.http.get('/api/tag').success(function(res) {
                var tagGroups = {};
                var curTags = $scope.custags;
                tagDict = res.data;
                _.each(res.data, function(item) {
                    var temp = _.find(curTags, function(t) {
                        return item.Id === t.TagId;
                    });

                    if (tagGroups[item.TagType]) {
                        tagGroups[item.TagType].tags.push(item);
                    } else {
                        tagGroups[item.TagType] = {
                            selected: -1,
                            tags: [item]
                        };
                    }

                    if (temp) { //如果有
                        tagGroups[item.TagType].selected = tagGroups[item.TagType].tags.length - 1;
                    }

                });
                $scope.tags = tagGroups;
            });
        }
    }
]).controller("Customer_forword", ['$scope', 'server', '$mdDialog', '$mdToast', 'customer', function($scope, server, $mdDialog, $mdToast, customer) {

    server.getSalers().success(function(res) {
        $scope.salers = res.data;
    });

    $scope.ok = function(ev) {
        if (angular.isArray(customer)) {
            server.http.put('/api/transcustomer/' + $scope.saler, customer).success(function(res) {
                if (res.status) $mdDialog.hide();
            });
        } else {
            server.http.put('/api/customer/' + customer.Id + '/' + $scope.saler).success(function(res) {
                if (res.status) $mdDialog.hide();
            });
        }

    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    }
}]).controller("Customer_track", ['$scope', '$filter', 'server', '$mdDialog', '$mdToast', 'user', function($scope, $filter, server, $mdDialog, $mdToast, user) {
    var customer = $scope.customer; //parent scope
    var u = user.get();
    $scope.track = {};
    $scope.title = customer.CompanyName;

    $scope.save = function() {
        if (!$scope.track.content) return;
        var data = {
            CustomId: customer.Id,
            Description: $scope.track.content,
            TrackDate: $filter('date')($scope.TrackDate, 'yyyy-MM-dd')
        };
        server.http.post('/api/customertrack', data).success(function() {
            $scope.track.content = "";
            refresh();
        });
    };


    $scope.cancel = function() {
        $mdDialog.cancel()
    };

    function refresh() {
        server.http.get('/api/customertrack/' + customer.Id).success(function(res) {
            $scope.tracks = res.data;
        });
    }

    $scope.$watch('customer.Id', function(newVal, oldVal) {
        if (newVal) {
            refresh();
        }
    });


}]).controller("Customer_remind", ['$scope', '$filter', 'server', '$mdDialog', '$mdToast', 'user', function($scope, $filter, server, $mdDialog, $mdToast, user) {
    var customer = $scope.customer; //parent scope
    var u = user.get();
    $scope.title = customer.CompanyName;
    $scope.today = new Date();
    $scope.remind = {};


    function getRemind() {
        server.http.get('/api/nexttrackremind/' + customer.Id).success(function(res) {
            $scope.reminds = res.data;
        });
    }
    $scope.$watch('customer.Id', function(newVal, oldVal) {
        if (newVal) {
            getRemind();
        }
    });

    $scope.addRemind = function() {
        var r = _.find($scope.reminds, function(item) {
            return $filter('date')($scope.remind.remindDate, 'yyyy-MM-dd') == item.NextTrackTime.substr(0, 10);
        });
        if (r) {
            $scope.remind.remindDate = null;
            return;
        }
        var data = {
            SalesId: u.UserId,
            CustomerId: customer.Id,
            NextTrackTime: $scope.remind.remindDate
        }
        server.http.post('/api/nexttrackremind', data).success(function() {
            getRemind();
            $scope.remind.remindDate = null;
        });
    }
    $scope.deleteRemind = function(item) {
        server.http.delete('/api/nexttrackremind/' + item.Id);
    }
    $scope.cancel = function() {
        $mdDialog.cancel()
    };


}]).controller("Customer_warning", ['$scope', '$mdDialog', 'customers', function($scope, $mdDialog, customers) {

    $scope.customers = customers;

    $scope.ok = function(item) {
        $mdDialog.hide();
    }
    $scope.cancel = function() {
        $mdDialog.cancel()
    };


}]);
