angular.module('AOIApp')
  .controller('databaseCtrl', ['$scope', '$location', '$http', 'databaseService', function($scope, $location, $http, databaseService) {

  MY_SCOPE = $scope;

  $scope.$watch('dbSearch',()=>{
    databaseService.dbSearch = $scope.dbSearch;
  });

  $scope.submit = () => {
    $location.path("/databasesearch");
  };

}]);
