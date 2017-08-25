angular.module('crmApp').directive('menuLink', function() {
  return {
    scope: {
      section: '='
    },
    templateUrl: 'views/menu-link.tmpl.html',
    link: function($scope, $element) {
      var controller = $element.parent().controller();
      $scope.isSelected = function() {
        return controller.isSelected($scope.section);
      };
      $scope.selectPage = function(page) {
        controller.selectPage(page);
      };
    }
  };
}).directive('menuToggle', ['$mdUtil', '$animateCss', '$$rAF', function($mdUtil, $animateCss, $$rAF) {
  return {
    scope: {
      section: '='
    },
    templateUrl: 'views/menu-toggle.tmpl.html',
    link: function($scope, $element) {
      var controller = $element.parent().controller();
      $scope.renderContent = false;

      $scope.isOpen = function() {
        return controller.isOpen($scope.section);
      };

      $scope.toggle = function() {
        controller.toggleOpen($scope.section);
      };

      var parentNode = $element[0].parentNode.parentNode.parentNode;
      if(parentNode.classList.contains('parent-list-item')) {
        var heading = parentNode.querySelector('h2');
        $element[0].firstChild.setAttribute('aria-describedby', heading.id);
      }
    }
  };
}]);