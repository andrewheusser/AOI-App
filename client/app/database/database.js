AOIApp.controller('databaseController', ['$scope', '$location', '$http', 'databaseService', function($scope, $location, $http, databaseService) {

  MY_SCOPE = $scope;

  // $scope.dbSearch = "Davachi L";

  $scope.$watch('dbSearch',()=>{
    databaseService.dbSearch = $scope.dbSearch;
  });

  $scope.submit = () => {
    $location.path("/dbsearch");
  };

}]);
