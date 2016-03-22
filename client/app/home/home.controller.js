angular.module('AOIApp')
  .controller('homeCtrl', ['$scope', '$location', 'pubMedService', 'userService', function($scope, $location, pubMedService, userService) {

  $scope.search = "";
  $scope.user = userService.user;

  $scope.$watch('search', function(){
    return pubMedService.search = $scope.search;
  });

  $scope.submit = () => {
    $location.path("/pubmedsearch");
  };

  MY_SCOPE = $scope;

}]);
