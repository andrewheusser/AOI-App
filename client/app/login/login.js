AOIApp.controller('loginController', ['$scope', '$location', 'userService', function($scope, $location, userService) {

  MY_SCOPE = $scope;

  $scope.loginUser = () => {
    userService.login({
      email: $scope.email,
      password: $scope.password
  }).success((data)=>{
    $scope.$emit('user-signed-in', data)
    userService.user = data.local;
    userService.user.loggedIn = true;
    $location.path("/home");

  })};


}]);
