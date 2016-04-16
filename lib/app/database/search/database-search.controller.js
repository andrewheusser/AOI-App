angular.module('AOIApp').controller('databaseSearchCtrl', ['$scope', '$location', '$http', 'databaseService', function ($scope, $location, $http, databaseService) {

  MY_SCOPE = $scope;

  $scope.$watch('dbSearch', function () {
    databaseService.dbSearch = $scope.dbSearch;
  });

  $scope.submit = function () {
    $location.path("/database/results");
  };
}]);