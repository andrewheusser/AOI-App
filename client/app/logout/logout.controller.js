angular.module('AOIApp')
  .controller('logoutCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService) {

  $scope.user = userService.user;
  MY_SCOPE = $scope;

  $scope.logoutUser = () => {
    userService.logout({
  }).success((data)=>{
    console.log("succesfully logged out")
    userService.user.loggedIn = false;
    $location.path("/login");
  })};

}]);
