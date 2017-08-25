angular.module('crmApp').controller('Statis_tend', ['$scope', 'server',
    function($scope, server) {
        $scope.search = {};
        $scope.search.end = new Date();
        $scope.search.start = new Date();
        $scope.search.start.setMonth($scope.search.start.getMonth() - 1);
        $scope.searchFn = function() {
            var params = {
                startDate: $scope.search.start.toISOString(),
                endDate: $scope.search.end.toISOString()
            }
            server.http.get('/api/salesordertop?' + $.param(params)).success(function(res) {
                $scope.data1 = res.data;
                var labels = _.map(res.data, 'RealName');
                var data = _.map(res.data, 'Num');
                $scope.chart1Options.data = data;
                $scope.chart1Options.labels = labels;

                $scope.total = _.reduce($scope.data1, function(result, n, key) {
                    //result += n.Num
                    return result +n.Num;
                }, 0);

                getDetail(res.data[0]);
            });

        }
        $scope.searchFn();

        function getDetail(source) {
            $scope.total2 = source.Num;
            var params = {
                salesid: source.SalesId,
                startDate: $scope.search.start.toISOString(),
                endDate: $scope.search.end.toISOString()
            }
            server.http.get('/api/tendencychart?' + $.param(params)).success(function(res) {
                //$scope.chart2Options.options.title.text = source.Marking;
                var data = res.data[0];
                $scope.chart2Options.labels = _.map(res.data, 'OrderDate');
                $scope.chart2Options.data = [_.map(res.data, 'OrderNum')];
                $scope.chart2Options.title = source.RealName;
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
                if(!arg[0]._index) return;
                var source = $scope.data1[arg[0]._index];
                getDetail(source);
                //$scope.$apply();
            }
        }

        $scope.chart2Options = {
            data: [],
            labels: [],
            series: ['签单数量']
        }
    }
]);
