angular.module('crmApp').factory('menu', ['user', function(user) {


    var menu = {
        selectSection: function(section) {
            section.opened = true;
        },
        toggleSelectSection: function(section) {
            section.opened = !section.opened;
        },
        isSectionSelected: function(section) {
            return section.opened;
        },

        selectPage: function(page) {
            if (self.currentPage) self.currentPage.selected = false;
            page.selected = true;
            self.currentPage = page;
        },
        isPageSelected: function(page) {
            return page.selected;
        },
        getSections: function() {
            var u = user.get();
            if(!u) return;
            var menus = JSON.parse(u.FunctionList);
            var sections = [];
            _.each(menus.sort(sortFn), function(item) {
                var section = {};
                section.name = item.FunctionName;
                section.icon = item.Icon;
                section.type = 'toggle';
                section.pages = [];
                _.each(item.children.sort(sortFn), function(obj) {
                    var page = {};
                    page.name = obj.FunctionName;
                    page.router = obj.FunctionUrl;
                    page.type = 'link';
                    section.pages.push(page);
                });
                sections.push(section);
            });
            this.sections = sections;

            function sortFn(a, b) {
                return a.Rank > b.Rank;
            };
        }

    };
    menu.getSections();
    return menu;
}]);
