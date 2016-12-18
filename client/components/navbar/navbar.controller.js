angular.module('AOIApp').controller('navbarController', ['$scope', '$location', '$state', 'userService', function ($scope, $location, $state, userService) {

  NAVBAR_SCOPE = $scope;

  $scope.user = userService.user;

  $scope.isActive = function (path) {
    var currentPath = $location.path().split('/')[1];
    if (currentPath.indexOf('?') !== -1) {
      currentPath = currentPath.split('?')[0];
    }
    return currentPath === path.split('/')[1];
  };
}]);