angular.module('AOIApp').controller('loginCtrl', ['$scope', '$location', 'userService', function ($scope, $location, userService) {

  $scope.user = userService.user;
  MY_SCOPE = $scope;

  $scope.loginUser = function () {
    userService.login({
      email: $scope.email,
      password: $scope.password
    }).success(function (data) {
      userService.user = data.local;
      userService.user.loggedIn = true;
      $location.path("/myjournals/recent");
    });
  };
}]);