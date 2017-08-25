angular.module('crmApp').directive('picView', ['$uibModal', function($uibModal) {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attrs, ctrls) {
            var src = attrs.ngSrc;
            scope.src = src;
            element.find('img').viewer({
                navbar: false,
                title:false,
                built: function() {
                    var container = $(this).next();
                    var that= this;
                    container.find('.viewer-canvas').on('click',function(e){
                        if(e.target.tagName.toUpperCase() !=="IMG")
                        $(that).viewer('hide');
                    });
                    $('body').append(container);

                }
            });
            scope.$watch(function(){
                return attrs.ngSrc;
            },function(newval,oldval){
                if(newval!==oldval){
                    scope.src = newval;
                }
            });
        },
        template: '<div class="picView"><img src="{{src}}" alt="" class="img-thumbnail"></div>'
    };
}]);
