angular.module('crmApp').controller('OrderAddAgent', ['$scope', '$state', 'server', '$filter', 'FileUploader', '$mdDialog', '$mdToast', '$timeout', 'user', '$uibModal',
    function ($scope, $state, server, $filter, FileUploader, $mdDialog, $mdToast, $timeout, user, $uibModal) {
        $scope.user = user.get();
        server.http.get('/api/mycity').success(function (res) {
            $scope.city = res.data[0];
        });
        if ($scope.orderid) {
            server.http.get('/api/contractdetail/' + $scope.orderid).success(function (res) {
                if (res.status) {

                    $scope.cStep = 2;
                    if ($scope.isRemind) {
                        $scope.postData.Customer = res.data.Customer;
                        $scope.postData.Category = 1;

                    } else {
                        $scope.postData = res.data;
                        $scope.postData.ContractDate = $filter('fDate')($scope.postData.ContractDate);
                        $scope.postData.ServiceStart = $filter('fDate')($scope.postData.ServiceStart);
                        $scope.postData.ServiceEnd = $filter('fDate')($scope.postData.ServiceEnd);
                        //if ($scope.postData.ServiceEnd.substring(0, 4) == '0001') $scope.postData.ServiceEnd = '';
                    }
                    var postData = $scope.postData;

                    if ($scope.isChange) {
                        postData.FreChangeOrderId = postData.OrderId;
                        delete postData.OrderId;
                        postData.Customer.AddedValue = 2;
                        postData.ServiceStart = null;
                        postData.Amount = '';
                        changePrice();
                    }
                    postData.Customer.RegisterDate = $filter('fDate')(postData.Customer.RegisterDate);
                    postData.Customer.BusnissDeadline = $filter('fDate')(postData.Customer.BusnissDeadline);
                    postData.Customer.NoDeadLine = !!postData.Customer.NoDeadLine;

                    if ($scope.isRemind) {
                        $scope.otherData = {
                            ServiceContent: "记账报税"
                        };
                    } else if ($scope.isChange) {
                        $scope.otherData = {
                            ServiceContent: "产品变更"
                        };
                    } else {
                        $scope.otherData = $scope.postData.StatementInfo;
                    }

                    if ($scope.postData.ServiceEnd)
                        $scope.maxDate = new Date($scope.postData.ServiceEnd);
                    if (postData.IsChange) {
                        postData.Customer.AddedValue = 1;
                    }
                }
            });
        }
        if ($scope.$parent && $scope.$parent.orderForm) {
            $scope.orderForm = $scope.$parent.orderForm;
        }
        $scope.postData = {
            Customer: {}
        };
        $scope.otherData = {
            ServiceContent: "记账报税"
        };
        $scope.timeoption = {
            timezone: 'UTC'
        }
        var tempData;
        server.getSalers().success(function (res) {
            $scope.salers = res.data;
            setSaler();
        });
        server.getIndustry().success(function (res) {
            $scope.industries = res.data;
        });
        server.http.get('/api/paymodes').success(function (res) {
            $scope.paymodes = res.data;
        });

        function setSaler() {
            if (!$scope.salers) return;
            if (!$scope.postData.SalesId) return;
            var saler = _.find($scope.salers, {
                UserId: $scope.postData.SalesId
            });
            if (!saler) {
                $scope.salers.push({
                    UserId: $scope.postData.SalesId,
                    RealName: $scope.postData.SalesName,
                    disabled: true
                });
            }
        }
        $scope.selectSalers = function () {
            if ($scope.cStep > 0) return;
            if (!$scope.orderid) $scope.cStep = 0;
        }
        $scope.selectTypeStep = function (type) {
            if ($scope.orderid) return;
            $scope.cStep = 1;
        }
        $scope.getAmount = function () { //其他服务总金额
            $scope.otherData.AccountsTax = +$scope.postData.Amount;
            var postData = _.pick($scope.otherData, 'AccountsTax', 'ServiceCharge', 'TaxPayment', 'AnnualReport', 'Register', 'OpenBank', 'NationLocalTax', 'Prints', 'AddressCost', 'Change');
            var all = 0;
            _.each(postData, function (value) {
                all += +(value || 0);
            });
            return all;
        }

        $scope.selectCustomer = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/Order_cusSelect.html',
                controller: 'Order_cusSelect',
                size: 'lg',
            });
            modalInstance.result.then(function (result) {
                $scope.postData.Customer = result;
                if (result.AreaCode) {
                    $scope.areaSele = result.AreaCode;
                }
            }, function () {

            });
        }
        $scope.selectCustomerStep = function (type) {
            if (type == 1) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/Order_cusSelect.html',
                    controller: 'Order_cusSelect',
                    size: 'lg',
                });
                modalInstance.result.then(function (customer) {
                    $scope.postData.Customer = customer;
                    $scope.postData.Customer.RegisterDate = $filter('fDate')($scope.postData.Customer.RegisterDate);
                    $scope.postData.Customer.BusnissDeadline = $filter('fDate')($scope.postData.Customer.BusnissDeadline);
                    $scope.postData.Customer.NoDeadLine = !!$scope.postData.Customer.NoDeadLine;
                    $scope.cStep = 2;
                }, function () {

                });

            } else {
                var cate = $scope.postData.Category;
                if (tempData) {
                    tempData.SalesId = $scope.postData.SalesId;
                    $scope.postData = tempData;
                }
                $scope.postData.Category = cate;
                $scope.cStep = 2;
            }
            tempData = angular.copy($scope.postData);
        }

        server.http.get('/api/gift').success(function (res) {
            $scope.gifts = res.data;
        });

        var uploadUrl = 'https://pilipa.oss-cn-beijing.aliyuncs.com';

        server.http.get('/api/signkey').success(function (res) {
            delete res.data.Filename;
            delete res.data.key;
            delete res.data.callback;
            delete res.data.expire;
            delete res.data.Host;
            $scope.signkey = res.data;
        });

        $scope.uploader1 = new FileUploader({
            url: uploadUrl,
            autoUpload: true
        });
        $scope.uploader1.onCompleteItem = function (fileItem, response, status, headers) {
            $scope.postData.Customer.PersonCardPath =  uploadUrl + '/' + $scope._key1;
        };
        $scope.uploader1.onBeforeUploadItem = function (item) {
            bindFormData(item, 1, 1);
        };
        $scope.uploader1.onErrorItem = function () {
            alert('上传失败!')
        };
        $scope.uploader1.filters.push({
            name: 'customFilter',
            fn: verifyImage
        });

        $scope.uploader2 = new FileUploader({
            url: uploadUrl,
            autoUpload: true
        });
        $scope.uploader2.onCompleteItem = function (fileItem, response, status, headers) {
            $scope.postData.Customer.BusinessLicense = uploadUrl + '/' + $scope._key2;
        };
        $scope.uploader2.onBeforeUploadItem = function (item) {
            bindFormData(item, 2, 2);
        };
        $scope.uploader2.onErrorItem = function () {
            alert('上传失败!')
        };
        $scope.uploader2.filters.push({
            name: 'customFilter',
            fn: verifyImage
        });

        function bindFormData(item, up, type) {
            var key = buildKey(type, item.file.name);
            item.formData.push({
                key: key
            });
            _.each($scope.signkey, function (value, key) {
                var temp = {};
                temp[key] = value;
                item.formData.push(temp);
            });
            $scope['_key' + up] = key;
        }

        function buildKey(type, fileName) {
            var randomFilename = "";

            var get_suffix = function (filename) {
                var suffix = '';
                var pos = filename.lastIndexOf('.');

                if (pos != -1) {
                    suffix = filename.substring(pos)
                }
                return suffix;
            };
            var random_string = function (len) {
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
            var nowstr = $filter('date')(new Date(), 'yyyyMM');
            var g_object_name = typMap[type] + nowstr + '/' + random_string(10) + suffix;
            return g_object_name;
        }

        $scope.save = function () {
            $scope.saving = true;
            if ($scope.city) $scope.postData.Customer.CityCode = $scope.city.Code;
            if ($scope.postData.GiftTypeId) {
                var gift = _.find($scope.gifts, function (item) {
                    return item.Id === +$scope.postData.GiftTypeId;
                });
                $scope.postData.GiftTypeId = gift.Id;
                $scope.postData.GiftTypeName = gift.GiftTypeName;
            }
            if ($scope.postData.Customer.NoDeadLine)
                $scope.postData.Customer.NoDeadLine = 1;
            else
                $scope.postData.Customer.NoDeadLine = 0;

            if ($scope.postData.ServiceStart)
                $scope.postData.ServiceStart = $filter('date')($scope.postData.ServiceStart, 'yyyy-MM');
            if ($scope.postData.Category == 1 || $scope.postData.Status == 2 || $scope.supp) {
                if ((!$scope.postData.Customer.BusnissDeadline) && (!$scope.postData.Customer.NoDeadLine)) {
                    alert('请输入完整营业期限！');
                    $scope.saving = false;
                    return;
                }
            }
            if ($scope.postData.Category == 2 && !$scope.postData.Customer.PersonCardPath) {
                alert('请上传法人身份证!');
                $scope.saving = false;
                return;
            }
            // if (($scope.postData.Category == 1 || $scope.supp) && !$scope.postData.Customer.BusinessLicense) {
            //     alert('请上传营业执照!');
            //     return;
            // }
            if ($scope.postData.IsChange) {
                $scope.postData.Customer.AddedValue = 2;
            }
            var postData = $scope.postData;
            var otherData = $scope.otherData;

            otherData.PayId = postData.PayId;
            otherData.SalesId = postData.SalesId;
            otherData.SumAccount = $scope.getAmount();
            if (!otherData.ServiceContent) otherData.ServiceContent = '记帐报税';
            $scope.postData.StatementInfo = otherData;

            if ($scope.postData.OrderId) {
                if ($scope.supp) {
                    server.http.put('/api/supplementaryinfo', $scope.postData).success(function (res) {
                        afterResult(res);
                    });
                } else {
                    server.http.put('/api/contract/' + $scope.postData.OrderId, $scope.postData).success(function (res) {
                        afterResult(res);
                    });
                }

            } else {
                if ($scope.isChange) {
                    server.http.post('/api/signacontract', $scope.postData).success(function (res) {
                        afterResult(res, true);
                    });
                    return;
                }
                server.http.post('/api/contract', $scope.postData).success(function (res) {
                    afterResult(res, true);
                });
            }

        }

        function afterResult(res, isOuter) {
            $scope.saving = false;
            if (res.status) {

                if ($scope.ok) $scope.ok();
                if (isOuter) {
                    if (!$scope.postData.Customer.Id)
                        $scope.postData.Customer.Id = res.data.CustomerId;
                    var confirm = $mdDialog.confirm()
                        .title('您需要添加外勤任务吗?')
                        .textContent('')
                        .ok('添加')
                        .cancel('不添加');

                    $mdDialog.show(confirm).then(function () {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'views/order_outworker_add.html',
                            controller: 'Order_outworker_add',
                            backdrop: 'static',
                            size: 'hg',
                            resolve: {
                                customer: function(){
                                  return $scope.postData.Customer;
                                }
                            }
                        });
                        modalInstance.result.then(function (result) {
                            jumpToList();
                        }, function () {
                            jumpToList();
                        });
                    }, function () {
                        jumpToList();
                    });

                } else {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('保存成功！')
                        .position('top center')
                        .hideDelay(2000)
                    );
                    jumpToList();
                }
            }

            function jumpToList() {
                $timeout(function () {
                    $state.go('main.order_list');
                }, 10);
            }
        }

        // function otherServiceSave(res) {
        //     var postData = $scope.postData;
        //     var otherData = $scope.otherData;
        //     otherData.AccountsTax = postData.Amount;
        //     otherData.CustomerId = res.data.CustomerId;
        //     otherData.PayId = postData.PayId;
        //     otherData.SalesId = postData.SalesId;
        //     otherData.SumAccount = $scope.getAmount();
        //     otherData.BillTime = postData.ContractDate;
        //     if (otherData.SumAccount > 0) {
        //         server.http.post('/api/statement', otherData).success(function(res) {
        //             afterResult(res);
        //         });
        //     }

        // }

        $scope.getPrice = function () {
            if (!$scope.postData.Customer.AddedValue) return;
            if (!$scope.postData.PayType) return;
            var param = {
                AddedValue: $scope.postData.Customer.AddedValue,
                PayType: $scope.postData.PayType
            }
            server.http.get('/api/order/price?' + $.param(param)).success(function (res) {
                $scope.postData.Amount = res.data;
            });
        }
        $scope.setChangePrice = function () {
            var postData = $scope.postData;
            if (!postData.ServiceStart) return;
            if (!postData.ServiceEnd) return;
            var end = new Date(postData.ServiceEnd);
            var start = new Date(postData.ServiceStart);
            var month = 1 + ((end.getYear() - start.getYear()) * 12 + end.getMonth() - start.getMonth());
            postData.Amount = +(($scope.cjPrice * month).toFixed(2));
        }
        $scope.maxDate = new Date('2029-12-31');


        $scope.setEndDate = function () {
            if (!$scope.postData.PayType) return;
            if (!$scope.postData.ServiceStart) return;
            if ($scope.isChange) {
                $scope.setChangePrice();
                return;
            }

            var dmap = {
                1: 5,
                2: 11,
                3: 2,
                4: 5,
                5: 12,
                6: 12
            }; // 付款方式
            var addMonth = dmap[$scope.postData.PayType];
            if ($scope.postData.GiftTypeId) {
                var gift = _.find($scope.gifts, function (item) {
                    return item.Id === +$scope.postData.GiftTypeId;
                });
                addMonth = addMonth + gift.MonthNum;
            }

            var date = new Date($scope.postData.ServiceStart);
            var enddate = new Date(date.setMonth(date.getMonth() + addMonth));

            $scope.postData.ServiceEnd = $filter('date')(enddate, 'yyyy-MM');
        }


        function verifyImage(item, options) {
            var reg = /^.*\.(?:png|jpg|bmp|gif|jpeg)$/;
            if (!reg.test(item.name)) {
                alert('请选择图片');
                return false;
            }
            return true;
        }

        function changePrice() {

            var xgmPrice, ybnPrice;
            server.http.get('/api/order/price?' + $.param({
                AddedValue: 1,
                PayType: 1
            })).success(function (res) {
                xgmPrice = (res.data / 6).toFixed(2);
                setChangePrice();
            });
            server.http.get('/api/order/price?' + $.param({
                AddedValue: 2,
                PayType: 1
            })).success(function (res) {
                ybnPrice = (res.data / 6).toFixed(2);
                setChangePrice();
            });

            function setChangePrice() {
                if (!xgmPrice) return;
                if (!ybnPrice) return;
                $scope.cjPrice = (ybnPrice - xgmPrice).toFixed(2);
            }
        }
    }
]).controller("Order_cusSelect", ['$scope', 'server', '$mdDialog', '$mdToast', function ($scope, server, $mdDialog, $mdToast) {



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
    $scope.pageChanged = function () {
        refreshData();
    };

    //set current page
    $scope.setCurrentPage = function () {
        $scope.paginator.currentPage = $scope.currentPage;
        refreshData();
    };
    $scope.searchItem = {
        companyname: ''
    };
    $scope.search = function () {
        $scope.searchItem.companyname = $scope.search.CompanyName;
        refreshData();
    }

    function refreshData() {
        var data = angular.extend({
            offset: ($scope.paginator.currentPage - 1) * $scope.paginator.perPage,
            limit: $scope.paginator.perPage
        }, $scope.searchItem);
        server.http.get('/api/order/customer?' + $.param(data)).success(function (res) {
            $scope.paginator.total = res.data.total;
            $scope.customers = res.data.list;
        });
    }
    refreshData();


    $scope.select = function (item) {
        $mdDialog.hide(item);
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    }
}]);
