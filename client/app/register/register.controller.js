angular.module('AOIApp')
  .controller('registerCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService) {

  $scope.user = userService.user;
  MY_SCOPE = $scope;

  $scope.loginUser = () => {
    userService.login({
      email: $scope.email,
      password: $scope.password
  }).success((data)=>{
    userService.user = data.local;
    userService.user.loggedIn = true;
    $location.path("/home");
  })};

  $scope.registerUser = () => {
    userService.register({
      email: $scope.email,
      password: $scope.password,
      firstname: $scope.firstname
  }).success((data)=>{
    userService.user = data.local;
    userService.user.loggedIn = true;
    $location.path("/home");
  })};

}]);
