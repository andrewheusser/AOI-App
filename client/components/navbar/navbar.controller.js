AOIApp.controller('navbarController', ['$scope', 'userService', function($scope, userService){
      $scope.user = userService.user;
}]);
