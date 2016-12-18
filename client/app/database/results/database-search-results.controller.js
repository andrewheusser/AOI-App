angular.module('AOIApp').controller('databaseResultsCtrl', ['$scope', '$location', '$http', 'databaseService', 'userService', function ($scope, $location, $http, databaseService, userService) {

  MY_SCOPE = $scope;

  $scope.dbSearch = databaseService.dbSearch;
  $scope.loading = true;
  $scope.showAbstract = false;
  $scope.user = userService.user;

  databaseService.get($scope.dbSearch).success(function (data) {
    console.log(data);
    $scope.dbArticles = data;
    $scope.loading = false;
  }).catch(function (err) {
    console.log(err);
  });

  // $scope.dbSearch = "Davachi L";

  // url = "/api/db/" + $scope.dbSearch + '?callback=JSON_CALLBACK'
  // $http.get(url)
  // .success(function(data) {
  //   $scope.dbArticles = data;
  //   console.log("callback happened")
  // });

  $scope.openLink = function (id) {
    link = $scope.dbArticles[id].URL;
    window.open(link); // in new tab
  };
}]);