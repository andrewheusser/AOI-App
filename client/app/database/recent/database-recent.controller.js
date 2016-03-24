angular.module('AOIApp')
  .controller('databaseRecentCtrl', ['$scope', '$location', '$http', 'databaseService', function($scope, $location, $http, databaseService) {

    MY_SCOPE = $scope;

    $scope.dbSearch = databaseService.dbSearch;
    $scope.loading = true;
    $scope.showAbstract = false;
    // $scope.user = userService.user;

    getRecent = (num) =>{
      databaseService.getRecent(num)
      .success((data)=>{
        console.log(data)
        $scope.recentAois = data;
        $scope.loading = false;
      }).catch((err)=>{
        console.log(err)
      })
    };
    getRecent(20);

    $scope.display20 = () =>{
      $scope.loading = true;
      getRecent(20);
    }

    $scope.display50 = () =>{
      $scope.loading = true;
      getRecent(50);
    }

    $scope.display100 = () =>{
      $scope.loading = true;
      getRecent(100);
    }

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
