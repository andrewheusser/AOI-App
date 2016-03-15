AOIApp.controller('homeController', ['$scope', '$location', 'pubMedService', 'userService', function($scope, $location, pubMedService, userService) {

  $scope.search = pubMedService.search;
  $scope.user = userService.user;

  $scope.$watch('search', function(){
    return pubMedService.search = $scope.search;
  });

  $scope.submit = () => {
    $location.path("/search");
  };

  MY_SCOPE = $scope;

}]);
