angular.module('crmApp').controller('Statis_top', ['$scope', 'server', '$state', '$mdDialog', 'user', function($scope, server, $state, $mdDialog, user) {
    $scope.user = user.get();
    $scope.chartOptions = {};


    function refreshData() {
        //var url;
        // if (!$scope.user.IsCenter) {
        //     url = "/api/customerforsubsidiary"
        // } else {
        //     url = "/api/customerforcenter";
        // }
        server.http.get("/api/customerforsubsidiary").success(function(res) {
            var companyNames = _.uniq(_.map(res.data, 'CompanyName'));
            var t60 = $scope.typeCList = [];
            var t80 = $scope.typeBList = [];
            _.each(companyNames, function(n) {
                var cdata = _.chain(res.data).filter({ CompanyName: n });
                var temp = {
                    CompanyName: n,
                    salers: cdata.map(function(item) {
                        return {
                            RealName: item.RealName,
                            Num: item.CType
                        }
                    }).sortByOrder(['Num'],['desc']).value(),
                    total: cdata.reduce(function(total, n) {
                        if (_.isObject(total)) {
                            return total.CType + n.CType;
                        } else {
                            return total + n.CType;
                        }

                    }).value()
                }
                if (_.isObject(temp.total)) {
                    temp.total = temp.total.CType
                }

                t60.push(temp);

                var temp2 = {
                    CompanyName: n,
                    salers: cdata.map(function(item) {
                        return {
                            RealName: item.RealName,
                            Num: item.BType
                        };
                    }).sortByOrder(['Num'],['desc']).value(),
                    total: cdata.reduce(function(total, n) {
                        if (_.isObject(total)) {
                            return total.BType + n.BType;
                        } else {
                            return total + n.BType;
                        }

                    }).value()
                }
                if (_.isObject(temp2.total)) {
                    temp2.total = temp2.total.BType
                }

                t80.push(temp2);
            });

        });

        server.http.get("/api/currentmonthorder").success(function(res) {
            var companyNames = _.uniq(_.map(res.data, 'CompanyName'));
            var ts = $scope.typeSList = [];

            _.each(companyNames, function(n) {
                var cdata = _.chain(res.data).filter({ CompanyName: n });
                var temp = {
                    CompanyName: n,
                    salers: cdata.map(function(item) {
                        return {
                            RealName: item.RealName,
                            Num: item.OrderNum
                        }
                    }).sortByOrder(['Num'],['desc']).value(),
                    total: cdata.reduce(function(total, n) {
                        if (_.isObject(total)) {
                            return total.OrderNum + n.OrderNum;
                        } else {
                            return total + n.OrderNum;
                        }

                    }).value()
                }
                if (_.isObject(temp.total)) {
                    temp.total = temp.total.OrderNum
                }
                _.sortByOrder(temp.salers,['Num'],['desc']);
                ts.push(temp);
            });
        });

        server.http.get("/api/cusnumbygroup").success(function(res) {
            var companies = $scope.companies = [];
            var companyNames = _.uniq(_.map(res.data, 'SubsidiaryName'));
            _.each(companyNames, function(n) {
                var cdata = _.chain(res.data).filter({ SubsidiaryName: n });
                var total = {
                    at: 0,
                    bt: 0,
                    ct: 0,
                    st: 0
                };
                _.each(cdata.value(),function(t) {
                    total.bt += t.BType;
                    total.ct += t.CType;
                    total.at += t.AType;
                });
                var temp = {
                    CompanyName: n,
                    CList: cdata.map(function(item) {
                        return {
                            DepartmentName: item.DepartmentName,
                            Num: item.CType
                        }
                    }).sortByOrder(['Num'],['desc']).value(),
                    BList: cdata.map(function(item) {
                        return {
                            DepartmentName: item.DepartmentName,
                            Num: item.BType
                        }
                    }).sortByOrder(['Num'],['desc']).value(),
                    AList: cdata.map(function(item) {
                        return {
                            DepartmentName: item.DepartmentName,
                            Num: item.AType
                        }
                    }).sortByOrder(['Num'],['desc']).value(),
                    total: total
                };

                companies.push(temp);
            });
            server.http.get('/api/currmonthbygroup').success(function(res) {
                var companyNames = _.uniq(_.map(res.data, 'SubsidiaryName'));
                _.each(companyNames, function(n) {
                    var cdata = _.chain(res.data).filter({ SubsidiaryName: n });
                    var temp = _.find(companies, { CompanyName: n });
                    if (!temp) {
                        temp = {
                            CompanyName: n,
                            CList: [],
                            BList: [],
                            AList: [],
                            total: { at: 0, bt: 0, ct: 0, st: 0 }
                        };
                    }
                    temp.SList = cdata.map(function(item) {
                        return {
                            DepartmentName: item.DepartmentName,
                            Num: item.OrderNum
                        }
                    }).sortByOrder(['Num'],['desc']).value();
                    _.each(cdata.value(),function(t) {
                        temp.total.st += t.OrderNum;
                    });
                });
            });


        });

    }
    refreshData();
}]);
