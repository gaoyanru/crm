angular.module('crmApp').controller('OutworkManage', ['$scope', '$http', '$state', '$uibModal', 'user', '$q',
    function($scope, $http, $state, $uibModal, user, $q) {
        $scope.user = user.get();
        // console.log($scope.user)
        $scope.open = function(item) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/order_outworker_add.html',
                controller: 'Order_outworker_a',
                backdrop: 'static',
                size: 'hg',
                resolve: {
                    customer: {}
                }
            });
            modalInstance.result.then(function(result) {
                refreshData();
            }, function() {

            });
        };
        $scope.detail = function(item) {
          var modalInstance = $uibModal.open({
              templateUrl: 'views/order_outworker_detail.html',
              controller: 'Order_outworker_detail',
              size: 'hg',
              resolve: {
                item: function() {
                    return item
                }
              }
          });
          modalInstance.result.then(function(result) {
              refreshData();
          }, function() {

          });
        };

        $scope.taskStatus = { // 任务状态
            1: "待分配",
            2: "待处理",
            3: "进行中",
            4: "已完成",
            5: "已取消"
        };
        if ($scope.user.Category !== 2 && $scope.user.Category !== 8) {
            delete $scope.taskStatus["1"];
        }
        $scope.search = {
            sequenceNo: "",
            companyname: "",
            connector: "",
            taskname: "",
            childtaskname: "",
            outworkId: "",
            starttime: "",
            endtime: "",
            areacode: "",
            salesId: "0",
            taskstatus: "",
            servicestatus: ""
        };
        // 取消任务
        $scope.cancel = function(item) {
          if (!confirm("确认要取消任务吗？")) return
          $http.put('api/maintask/cancelstatus/' + item.Id).success(function(res) {
              if (res.status) refreshData()
          })
        }
        // 判断提交按钮是不是可点
        $scope.isSub = function(item) {
          // console.log(item, '列表数据')
          //  提交分三种情况
          //   1. 审单直接提交给外勤的时候 外勤审核状态OutWorkerStatus=2已审核 会计审核状态AccountantStatus是null的时候 提交时候可以选择资料齐全或者部分
          //   2. 审单分别提交给外勤和会计 审单提交给外勤后外勤要把剩下的部分提交给会计 外勤状态已审核OutWorkerStatus=2 会计审核状态部分审核 AccountantStatus=5 提交的时候只能选择资料齐全
          //   3. 审单提交给外勤 外勤部分提交给会计 外勤状态已审核OutWorkerStatus=2 会计审核状态已驳回AccountantStatus=3 来源是外勤提交的时候AccountantTaskSource 提交的时候选择资料齐全或者部分
          if (item.OutWorkerStatus == 2 && !item.AccountantStatus) {
            $scope.onlyInformationIsAll = false
            return false
          }
          if (item.OutWorkerStatus == 2 && item.AccountantStatus == 5) {
            $scope.onlyInformationIsAll = true // 这种情况的时候只能选择资料齐全提交会计
            return false
          }
          if (item.OutWorkerStatus == 6 && item.AccountantStatus == 5) {
            $scope.onlyInformationIsAll = true // 这种情况的时候只能选择资料齐全提交会计 外勤当月只跑完
            return false
          }
          if (item.AccountantStatus == 3 && item.AccountantTaskSource == '外勤') {
            if (item.ServiceStatus == 3) {
              $scope.onlyInformationIsAll = false
              return false
            }
            $scope.onlyInformationIsAll = true // 外勤二次提交的情况
            return false
          }
          $scope.onlyInformationIsAll = false
          return true
        }
        // 审核提交
        $scope.check = function(item) {
            if (!confirm("确认资料齐全？")) return;
            var PartTax
            if (!item.PartTax) {
                PartTax = 0
            } else {
                PartTax = item.PartTax
            }
            $http.put('api/maintask/audit/pass/' + item.OrderId + '?partTax=' + PartTax).success(function(res) {
                if (res.status) refreshData();
            });
        };
        $scope.reject = function(item) {
            if (!confirm("确认驳回？")) return;
            $http.put('api/maintask/audit/reject/' + item.OrderId).success(function(res) {
                if (res.status) refreshData();
            });
        };
        // 外勤提交给会计弹框选择资料齐全还是部分报税 注意情况2的时候只能选择资料齐全
        $scope.sub = function(item) {
          $scope.isSub(item);
          var modalInstance = $uibModal.open({
              templateUrl: 'views/outworker_sub.html',
              controller: 'Order_outworkerDetail_sub',
              size: '',
              resolve: {
                item: function() {
                    return item
                },
                onlyInformationIsAll: function() {
                  return $scope.onlyInformationIsAll
                }
              }
          });
          modalInstance.result.then(function(result) {
            refreshData();
          }, function() {

          });
        };
        //日期
        $scope.clear = function() { //清空
            $scope.dt = null;
        };

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
            $scope.search.starttime = d1
            $scope.search.endtime = d2
        }
        $scope.paginator = {
            total: 0,
            currentPage: 1,
            perPage: 15,
            previousText: '上一页',
            nextText: '下一页',
            lastText: '最后一页',
            firstText: '首页'
        };

        $scope.searchItem = {
            sequenceNo: "",
            companyname: "",
            connector: "",
            taskname: "",
            childtaskname: "",
            outworkId: "0",
            starttime: "",
            endtime: "",
            areacode: "",
            salesId: "0",
            taskstatus: "",
            servicestatus: ""
        };
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
            $scope.search.starttime = d1
            $scope.search.endtime = d2
        }
        $scope.searchFn = function() {
            $scope.searchItem.companyname = $scope.search.companyname;
            $scope.searchItem.sequenceNo = $scope.search.sequenceNo;
            $scope.searchItem.connector = $scope.search.connector; //???
            $scope.searchItem.taskname = $scope.search.taskname;
            $scope.searchItem.childtaskname = $scope.search.childtaskname;
            $scope.searchItem.starttime = $scope.search.starttime;
            $scope.searchItem.endtime = $scope.search.endtime;
            $scope.searchItem.areacode = $scope.search.areacode
            $scope.searchItem.salesId = $scope.search.salesId;
            $scope.searchItem.outworkId = $scope.search.outworkId || 0;
            $scope.searchItem.taskstatus = $scope.search.taskstatus
            $scope.searchItem.servicestatus = $scope.search.servicestatus
            refreshData($scope.searchItem);
        }

        function refreshData() {
            // var deferred = $q.defer();
            var searchIt;
            searchIt = $scope.searchItem
            var data = angular.extend({
                offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
                limit: $scope.paginator.perPage
            }, searchIt, data);
            // maintask？ Id = & companyname = & connector = & taskname = & childtaskname = & starttime = & endtime = & areacode = & salesId = 0 & outworkId = 0 & taskstatus = & offset = 0 & limit = 15
            $http.get('api/maintask?' + $.param(data)).success(function(res) {
                $scope.paginator.total = res.data.total;
                $scope.customers = res.data.list;
            });
            // return deferred.promise;
        }
        refreshData();
        // 获取销售人员
        $http.get("/api/contract/sales").success(function(res) {
            $scope.users = res.data;
        });
        // 获取外勤人员
        $http.get('api/outworkers').success(function(res) {
            $scope.outworkers = res.data.list;
        });
        // 获取当前子任务
        $http.get('/api/commontask').success(function(res) {
            $scope.Tasks = formatData(res.data);
        })
            // $scope.taskchange = function () {
            //     if (!$scope.search.taskname) {
            //         return
            //     }
            //     var subTask = _.find($scope.Tasks, function (chr) {
            //         return chr.CommonTaskId == $scope.search.taskname
            //     })
            //     $scope.search.childtaskname = ""
            //     $scope.outTasks = subTask.TaskList;
            // }
            // $http.get('/api/outertasksub?taskname=&BusinessType=&status=0&offset=0&limit=100000').success(function(res) {
        $scope.outTasks = []
            // })
        $http.get('/api/code/area').success(function(res) {
            $scope.areas = res.data
        })
        $http.get('/api/outertasksub?offset=0&limit=9999').success(function(res) {
            $scope.outTasks = _.filter(res.data.list, {
                Status: 1
            });
        });

        function formatData(data) {
            var result = [];
            var last = {};
            _.each(data, function(item) {
                if (last.CommonTaskId !== item.CommonTaskId) {
                    last = _.pick(item, 'CommonTaskName', 'Status', 'CommonTaskId', 'CommonWeight');
                    last.TaskList = [_.pick(item, 'TaskName', 'OuterTaskId', 'Weight')];
                    result.push(last);
                } else {
                    last.TaskList.push(_.pick(item, 'TaskName', 'OuterTaskId', 'Weight'));
                }
            });
            return result;

        }

    }
]).controller("Order_outworker_a", ['$scope', '$http', '$uibModal', '$uibModalInstance', 'customer', 'user',
    function($scope, $http, $uibModal, $uibModalInstance, customer, UserServe) {
        var user = UserServe.get();
        $http.get('/api/mycity').success(function(res) {
            $scope.city = res.data[0];
        });
        $http.get('/api/commontask').success(function(res) {
            $scope.tasksArr = formatData(_.filter(res.data, {
                Status: 1
            }));

        });
        $scope.open1 = false;
        $scope.open2 = false;
        $scope.checkTB = function(tbItem) {
            if (tbItem.checked) {
                _.each($scope.tasksArr, function(item) {
                    if (tbItem.CommonTaskId !== item.CommonTaskId) item.checked = false;
                });
            }
        }
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

        function formatData(data) {
            var result = [];
            var last = {};
            _.each(data, function(item) {
                if (last.CommonTaskId !== item.CommonTaskId) {
                    last = _.pick(item, 'CommonTaskName', 'Status', 'CommonTaskId', 'CommonWeight');
                    last.TaskList = [_.pick(item, 'TaskName', 'OuterTaskId', 'Weight')];
                    result.push(last);
                } else {
                    last.TaskList.push(_.pick(item, 'TaskName', 'OuterTaskId', 'Weight'));
                }
            });
            return result;

        }
        $scope.postData = {};
        $scope.postData.areaSele = 0;

        if (customer.Id) {
            $scope.cus_selected = true;
            $scope.postData.Customer = customer;
        }
        $scope.title = "添加外勤任务";

        $scope.ok = function(ev) {
            if (!$scope.postData.Customer) {
                alert('请选择公司！');
                return;
            }
            //tongban
            var tb = _.find($scope.tasksArr, {
                checked: true
            });
            var data = {
                CustomerId: $scope.postData.Customer.Id,
                AreaCode: $scope.postData.areaSele,
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

            if (!$scope.postData.areaSele) {
                alert('请选择区域！');
                return;
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
                        // alert('添加成功!');
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
        });
        $http.get("/api/code/area").success(function(res) {
            $scope.areaArr = res.data
        })
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
            $uibModalInstance.dismiss()
        };
        $scope.selectCustomer = function() {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/Order_cusSelect.html',
                controller: 'Order_cusSelect',
                size: 'lg',
            });
            modalInstance.result.then(function(result) {
                $scope.postData.Customer = result;
                if (result.AreaCode) {
                    $scope.postData.areaSele = result.AreaCode;
                }
            }, function() {

            });
        }


    }
]).controller("Order_outworker_detail", ['$scope', '$http', '$uibModalInstance', 'item', '$mdDialog', 'user', '$uibModal',
    function($scope, $http, $uibModalInstance, item, $mdDialog, user, $uibModal) {
        $scope.user = user
        console.log(item, 'item')
        $scope.item = item
        $scope.load = function() {
          $('.hover-remark').hover(function(e){
            var right = $('.modal-content').width() - $('.hover-remark')[0].offsetLeft - 30
            var top = $('.hover-remark')[0].offsetTop + 46
            $('.modal-content').append('<div class="order-outworer-detail-remark-tips">' + $scope.item.Remark + '</div>')
            $('.order-outworer-detail-remark-tips').css({
              position: 'absolute',
              top: top,
              right: right
            })
          }, function(){
            $('body .order-outworer-detail-remark-tips').remove()
          })
        }
        $scope.isSub = function() {
          if ($scope.item.OutWorkerStatus == 2 && !$scope.item.AccountantStatus) {
            $scope.onlyInformationIsAll = false
            return false
          }
          if ($scope.item.OutWorkerStatus == 2 && $scope.item.AccountantStatus == 5) {
            $scope.onlyInformationIsAll = true // 这种情况的时候只能选择资料齐全提交会计
            return false
          }
          if (item.OutWorkerStatus == 6 && item.AccountantStatus == 5) {
            $scope.onlyInformationIsAll = true // 这种情况的时候只能选择资料齐全提交会计 外勤当月只跑完
            return false
          }
          if ($scope.item.AccountantStatus == 3 && $scope.item.AccountantTaskSource == '外勤') {
          // if (item.OutWorkerStatus == 2 && item.AccountantStatus == 3 && item.AccountantTaskSource == '外勤') {
            if ($scope.item.ServiceStatus == 3) {
              $scope.onlyInformationIsAll = false // 外勤二次提交的情况
              return false
            }
            $scope.onlyInformationIsAll = true // 外勤二次提交的情况
            return false
          }
          $scope.onlyInformationIsAll = false
          return true
        }

        var taskId = item.Id
        $scope.ifSub = true
        $scope.customers = [];
        $scope.user = user.get();
        $scope.forwards = {
            forwardUserId: '0',
            isSelectAll: false
        };
        // $scope.dynamicPopover = {
        //     content: item.Remark,
        //     title: '备注'
        // }
        var count = 0

        function refreshData() {
            count++;
            $http.get('/api/maintask/' + taskId).success(function(res) {
                $scope.customers = res.data;
            });
        }
        $http.get('/api/outworkers').success(function(res) {
            $scope.outworkers = res.data.list;
        });
        $scope.cancel = function() {
            if (($scope.user.Category === 8 || $scope.user.Category === 2) && !_.every($scope.customers, function(t) {
                    return t.Status > 1
                })) {
                if (confirm('还有任务未分配，确认关闭？')) {
                    close();
                    return;
                }
                return;
            }
            close();
        };
        // 查看详情时候的提交
        $scope.sub = function() {
          $scope.isSub()
          var modalInstance = $uibModal.open({
              templateUrl: 'views/outworker_sub.html',
              controller: 'Order_outworkerDetail_sub',
              size: '',
              resolve: {
                item: function() {
                    return item
                },
                onlyInformationIsAll: function() {
                  return $scope.onlyInformationIsAll
                }
              }
          });
          modalInstance.result.then(function(result) {
              close()
              refreshData();
          }, function() {

          });
        }

        function close() {
            if (count > 0) {
                $uibModalInstance.close();
            } else {
                $uibModalInstance.dismiss();
            }
        }
        $scope.forward = function(item) {
            $mdDialog.show({
                    controller: 'OutworkForward',
                    templateUrl: 'views/customer_forward.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                })
                .then(function(result) {
                    $http.put('/api/childtask/trans?ids=' + item.Id + '&outworkerId=' + result).success(function(res) {
                        if (res.status) {
                            refreshData();
                        }
                    });
                }, function() {

                });

        };
        $scope.forwardAll = function() {
            var ids = _.map(_.filter($scope.customers, function(t) {
                return t.Status <= 3 && t.selected;
            }), function(item) {
                return item.Id
            }).join(',');
            if (ids.length === 0) {
                $scope.forwards.isSelectAll = false;
                $scope.forwards.forwardUserId = '0';
                return;
            }

            $http.put('/api/childtask/trans?ids=' + ids + '&outworkerId=' + $scope.forwards.forwardUserId).success(function(res) {
                if (res.status) {
                    refreshData();
                    $scope.forwards.isSelectAll = false;
                    $scope.forwards.forwardUserId = '0';
                }
            });

        }
        $scope.statusChange = function(item, status, str) {
            if (!confirm('确认要“' + str + '”?')) return;
            $http.put('/api/childtask/' + item.Id + '/' + status).success(function() {

                refreshData();

            })
        };
        $scope.editCompany = function(item) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/companyEdit.html',
                controller: 'CompanyEdit',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    companyId: function() {
                        return item.CustomerId;
                    }
                }
            });

            modalInstance.result.then(function(result) {
                $http.put('/api/childtask/trans?ids=' + item.Id + '&outworkerId=' + result).success(function(res) {
                    if (res.status) {
                        refreshData();
                    }
                });
            }, function() {

            });
        }
        $scope.selectAll = function() {
            if ($scope.forwards.isSelectAll) {
                _.each($scope.customers, function(item) {
                    if (item.Status <= 3) item.selected = true;
                });
            } else {
                _.each($scope.customers, function(item) {
                    item.selected = false;
                });
            }
        };
        refreshData();

    }
]).controller("Order_cusSelect", ['$scope', '$http', '$uibModalInstance', function($scope, $http, $uibModalInstance) {



    $scope.search = {
        CompanyName: ''
    };


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
        companyname: ''
    };
    $scope.search = function() {
        $scope.searchItem.companyname = $scope.search.CompanyName;
        refreshData();
    }

    function refreshData() {
        var data = angular.extend({
            offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
            limit: $scope.paginator.perPage
        }, $scope.searchItem);
        $http.get('/api/order/customer?' + $.param(data)).success(function(res) {
            $scope.paginator.total = res.data.total;
            $scope.customers = res.data.list;
        });
    }
    refreshData();


    $scope.select = function(item) {
        $uibModalInstance.close(item);
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss();
    }
}]).controller('CompanyEdit', ['$scope', '$uibModalInstance', '$http', 'companyId', 'FileUploader', '$filter', function($scope, $uibModalInstance, $http, companyId, FileUploader, $filter) {
    $http.get("/api/industry").success(function(data) {
        $scope.industries = data.data;
    });
    $http.get('/api/mycity').success(function(res) {
        $scope.city = res.data[0];
    });
    if ($scope.city) {
        $scope.postData.CityCode = $scope.city.Code;
    }
    // $http.get("/api/citybychannel").success(function (data) {
    //     $scope.cities = data.data;
    //     if (!$scope.postData.CityCode) {
    //         $scope.postData.CityCode = $scope.cities[0].CityCode;
    //     }
    // });
    $http.get('/api/code/area').success(function(res) {
        $scope.areas = res.data
    });
    $scope.postData = {};
    $http.get('/api/customerdetail/' + companyId).success(function(res) {
        var result = res.data;
        if (result.BusnissDeadline && result.BusnissDeadline.substr(0, 4) === '0001') {
            result.BusnissDeadline = "";
        } else {
            result.BusnissDeadline = new Date(result.BusnissDeadline);
        }
        if (result.RegisterDate && result.RegisterDate.substr(0, 4) === '0001') {
            result.RegisterDate = "";
        } else {
            result.RegisterDate = new Date(result.RegisterDate);
        }
        result.AddedValue = "" + result.AddedValue;
        result.IndustryId = "" + result.IndustryId;
        $scope.postData = result;
    });
    $scope.ok = function(item) {
        var postData = $scope.postData;
        if (postData.RegisterDate) postData.RegisterDate = $filter('date')($scope.postData.RegisterDate, 'yyyy-MM-dd');
        if (postData.NoDeadLine) {
            postData.BusnissDeadline = '';
            postData.NoDeadLine = 1;
        } else {
            postData.NoDeadLine = 0;
        }
        $http.put('/api/customer/' + companyId + '?verify=1', $scope.postData).success(function(res) {
            if (res.status) {
                alert('保存成功!');
                $uibModalInstance.dismiss('cancel');
            }
        })
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    var uploadUrl = 'https://pilipa.oss-cn-beijing.aliyuncs.com';

    $http.get('/api/signkey').success(function(res) {
        delete res.data.Filename;
        delete res.data.key;
        delete res.data.callback;
        delete res.data.expire;
        delete res.data.Host;
        $scope.signkey = res.data;
    });
    $scope.uploader2 = new FileUploader({
        url: uploadUrl,
        autoUpload: true
    });
    $scope.uploader2.onCompleteItem = function(fileItem, response, status, headers) {
        $scope.postData.BusinessLicense = uploadUrl + '/' + $scope._key2;
    };
    $scope.uploader2.onBeforeUploadItem = function(item) {
        bindFormData(item, 2, 2);
    };
    $scope.uploader2.onErrorItem = function() {
        alert('上传失败!')
    };

    function bindFormData(item, up, type) {
        var key = buildKey(type, item.file.name);
        item.formData.push({
            key: key
        });
        _.each($scope.signkey, function(value, key) {
            var temp = {};
            temp[key] = value;
            item.formData.push(temp);
        });
        $scope['_key' + up] = key;
    }

    function buildKey(type, fileName) {
        var randomFilename = "";

        var get_suffix = function(filename) {
            var suffix = '';
            var pos = filename.lastIndexOf('.');

            if (pos != -1) {
                suffix = filename.substring(pos)
            }
            return suffix;
        };
        var random_string = function(len) {
            len = len || 32;
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            var maxPos = chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        };

        var suffix = get_suffix(fileName);
        var typMap = {
            1: 'FileUploads/Order/CardID/',
            2: 'FileUploads/Order/BusinessLicense/',
            3: 'FileUploads/Order/Contract/',
            4: 'FileUploads/Agent/'
        }
        var nowstr = $filter('date')(new Date(), 'yyyy-MM');
        var g_object_name = typMap[type] + nowstr + '/' + random_string(10) + suffix;
        return g_object_name;
    }


}]).controller('OutworkForward', ['$scope', '$mdDialog', '$http', 'user', 'server', function($scope, $mdDialog, $http, user, server) {
    $http.get('/api/outworkers').success(function(res) {
        $scope.salers = res.data.list;
    });
    $scope.label = "外勤";
    $scope.title = "转接任务";
    $scope.ok = function(ev) {
        if (!$scope.saler) {
            alert('请选择外勤人员!');
            return;
        }
        $mdDialog.hide($scope.saler)

    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    }
}]).controller("outworkWeightSetting", ['$scope', '$http', '$uibModalInstance', 'tasks',
    function($scope, $http, $uibModalInstance, tasks) {
        $scope.Tasks = tasks;
        $scope.toInt = function(num, e) {
            return Math.floor(Math.abs(num)) || ''
        }
        $scope.delete = function(item) {
            if (!confirm("确认要删除？")) return;
            item.selected = false;
        }
        $scope.cancel = function() {
            $uibModalInstance.dismiss($scope.Tasks);
        };
        $scope.ok = function() {
            var t = _.filter($scope.Tasks, { selected: true });
            var _arr = _.uniq(t, function(t) {
                return t._weight;
            });
            if (_arr.length < t.length) {
                alert('权重不能重复！');
            } else {
                $uibModalInstance.close($scope.Tasks);
            }
        }
    }
]).controller("Order_outworkerDetail_sub", ['$scope', '$http', '$uibModalInstance', 'onlyInformationIsAll', 'item',
    function($scope, $http, $uibModalInstance, onlyInformationIsAll, item) {
      console.log(onlyInformationIsAll, '是否只能选择资料齐全')
      $scope.title = '外勤提交会计'
      $scope.isSecondAccount = false
      $scope.close = function() {
        $uibModalInstance.close();
      }

      console.log(onlyInformationIsAll, 'onlyInformationIsAll')
      if (onlyInformationIsAll) { // true的时候只能点击资料齐全
        $scope.isSecondAccount = true
      }
      $scope.sub = function() {
        console.log(item.OrderId, $scope.partT, item.ServiceStatus, '提交数据')
        $http.put('/api/maintask/audit/submit/' + item.OrderId + '?partTax=' + $scope.partT + '&serviceStatus=' + item.ServiceStatus).success(function(res) {
            $scope.close()
        })
      }
      // 只有选择一个提交按钮才能点
      $scope.dis = function() {
        return $scope.partT === undefined ? true : false
      }
      // 只有选择是部分报税的时候 国税地税才能被选择
      $scope.part = item.PartTax == 1 || item.PartTax == 2
    }
]);
