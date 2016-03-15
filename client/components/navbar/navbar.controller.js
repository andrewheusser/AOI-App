AOIApp.controller('navbarController', ['$scope', 'userService', function($scope, userService){
      $scope.user = userService.user;
      $scope.avatar = userService.user.firstname;
      console.log("scope has been initialized")

}]);
