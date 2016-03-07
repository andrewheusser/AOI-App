AOIApp.controller('homeController', ['$scope', '$location', 'pubMedService', function($scope, $location, pubMedService) {

  $scope.search = pubMedService.search;

  $scope.$watch('search', function(){
    return pubMedService.search = $scope.search;
  });

  $scope.submit = () => {
    $location.path("/search");
  };

}]);
