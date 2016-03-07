AOIApp.controller('dbSearchController', ['$scope', '$location', '$http', 'databaseService', function($scope, $location, $http, databaseService) {

  MY_SCOPE = $scope;

  $scope.dbSearch = databaseService.dbSearch;

  databaseService.get($scope.dbSearch)
    .success((data)=>{
      $scope.aois = data;
    })

  // $scope.dbSearch = "Davachi L";

  // url = "/api/db/" + $scope.dbSearch + '?callback=JSON_CALLBACK'
  // $http.get(url)
  // .success(function(data) {
  //   $scope.aois = data;
  //   console.log("callback happened")
  // });

  $scope.openLink = function (id) {
            link = $scope.aois[id].URL;
            window.open(link); // in new tab
  };
}]);
