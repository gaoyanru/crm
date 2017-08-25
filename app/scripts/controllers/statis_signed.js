angular.module('crmApp').controller('Statis_signed', ['$scope', 'server',
    function($scope, server) {
        $scope.search = {};
        $scope.search.end = new Date();
        $scope.search.start = new Date();
        $scope.search.start.setMonth($scope.search.start.getMonth() - 1);
        $scope.searchFn = function() {
            var params = {
                starttime: $scope.search.start.toISOString(),
                endtime: $scope.search.end.toISOString()
            }
            server.http.get('/api/customernumbytag?' + $.param(params)).success(function(res) {
                //console.log(res);
                $scope.data1 = res.data;
                var labels = _.map(res.data, 'TagName');
                var data = _.map(res.data, 'CusNum');
                $scope.chart1Options.data = data;
                $scope.chart1Options.labels = labels;
                $scope.total = _.reduce($scope.data1, function(result, n, key) {
                    //result += n.Num
                    return result +n.CusNum;
                }, 0);
                //getDetail(res.data[0]);
            });

            server.http.get('/api/customernumbysource?' + $.param(params)).success(function(res) {
                //console.log(res);
                var labels = _.map(res.data, 'Marking');
                var data = _.map(res.data, 'CusNum');
                $scope.chart2Options.data = data;
                $scope.chart2Options.labels = labels;
                $scope.total2 = _.reduce(res.data, function(result, n, key) {
                    //result += n.Num
                    return result +n.CusNum;
                }, 0);
                //getDetail(res.data[0]);
            });


        }
        $scope.searchFn();

        function getDetail(source) {
            $scope.total2 = source.Num;
            var params = {
                sourceid: source.Id,
                startDate: $scope.search.start.toISOString(),
                endDate: $scope.search.end.toISOString()
            }
            server.http.get('/api/customerbysource?' + $.param(params)).success(function(res) {
                //$scope.chart2Options.options.title.text = source.Marking;
                var data = res.data[0];
                $scope.chart2Options.labels = ['签单', 'A类', 'B类', 'C类', 'D类','E类', 'F类', '公海'];
                $scope.chart2Options.data = [data.BillType, data.AType, data.BType, data.CType, data.DType,data.EType,data.FType, data.GType];
                $scope.chart2Options.title = source.Marking;
            });
        }

        $scope.chart1Options = {
            labels: [],
            data: [],
            options: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            onClick: function(arg) {
                var source = $scope.data1[arg[0]._index];
                getDetail(source);
                //$scope.$apply();
            }
        }

        $scope.chart2Options = {
            data: [],
            labels: [],
            series: ''
        }
    }
]);
