angular.module("crmApp").controller("User_group", ["$scope", "server", "$state", "$mdDialog", "user", "$mdToast", function(a, b, c, d, e, f) {
    function g(c) {
        b.http.get("/api/groups?groupId=" + c.DepartmentId).success(function(b) {
            a.members = b.data
        })
    }

    function h() {
        b.http.get("/api/departments").success(function(b) {
            a.groups = b.data,
                a.active(a.groups[0])
        })
    }
    a.user = e.get(),
        a.add = function() {
            d.show({
                controller: "User_group_addGroup",
                templateUrl: "views/user_group_addgroup.html",
                clickOutsideToClose: !0,
                fullscreen: !0
            }).then(function(a) {
                h()
            }, function() {})
        },
        a["delete"] = function(a) {
            confirm("确定要删除？") && b.http["delete"]("/api/departments/" + a).success(function(a) {
                h()
            })
        },
        a.active = function(b) {
            var c = _.find(a.groups, {
                active: !0
            });
            c && (c.active = !1),
                b.active = !0,
                a.seletedDept = b,
                g(b)
        },
        a.addMember = function(b) {
            d.show({
                controller: "User_group_addMember",
                templateUrl: "views/user_group_addMember.html",
                clickOutsideToClose: !0,
                fullscreen: !0,
                locals: {
                    members: a.members,
                    dptId: a.seletedDept.DepartmentId
                }
            }).then(function(b) {
                g(a.seletedDept)
            }, function() {})
        },
        a.deleteMember = function(c) {
            confirm("确定要移除成员？") && b.http.put("/api/delgroup?userid=" + c.UserId).success(function() {
                g(a.seletedDept)
            })
        },
        a.setLeader = function(c) {
            b.http.put("/api/groupleaders?userid=" + c.UserId + "&departmentid=" + a.seletedDept.DepartmentId).success(function(b) {
                g(a.seletedDept)
            })
        },
        h()
}]).controller("User_group_addGroup", ["$scope", "server", "$mdDialog", function(a, b, c) {
    a.ok = function(d) {
            var e = {
                DepartmentName: a.name,
                ParentID: 0
            };
            b.http.post("/api/departments", e).success(function(a) {
                c.hide()
            })
        },
        a.cancel = function() {
            c.cancel()
        }
}]).controller("User_group_addMember", ["$scope", "server", "user", "$mdDialog", "members", "dptId", function(a, b, c, d, e, f) {
    function g() {
        var c = {
            SubsidiaryId: a.user.SubsidiaryId,
            userName: ""
        };
        b.http.get("/api/users?" + $.param(c)).success(function(b) {
            _.each(b.data, function(a) {
                    _.find(e, {
                        UserId: a.UserId
                    }) && (a.hide = !0)
                }),
                a.users = b.data
        })
    }
    a.user = c.get(),
        g(),
        a.ok = function(c) {
            b.http.post("/api/addgroups?departmentid=" + f, a.selecteds).success(function(a) {
                d.hide()
            })
        },
        a.cancel = function() {
            d.cancel()
        }
}]);
