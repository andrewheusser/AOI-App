angular.module('AOIApp')
  .controller('databaseCtrl', ['$scope', '$location', '$http', 'databaseService', 'userService', function($scope, $location, $http, databaseService, userService) {

  $scope.user = userService.user;
  MY_SCOPE = $scope;


  $scope.$watch('dbSearch',()=>{
    databaseService.dbSearch = $scope.dbSearch;
  });

  $scope.submit = () => {
    $location.path("/databasesearch");
  };

}]);
