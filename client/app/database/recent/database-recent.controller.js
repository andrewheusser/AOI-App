angular.module('AOIApp')
  .controller('databaseRecentCtrl', ['$scope', '$location', '$http', 'userService', 'databaseService', 'localStorageService', function($scope, $location, $http, userService, databaseService, localStorageService) {

    MY_SCOPE = $scope;

    $scope.dbSearch = databaseService.dbSearch;
    $scope.loading = true;
    $scope.showAbstract = false;
    $scope.recentDbArticles = localStorageService.getRecentDbArticles();

    getRecent = (num) =>{
      databaseService.getRecent(num)
      .success((data)=>{
        console.log(data)
        $scope.recentDbArticles = data;
        $scope.loading = false;
        localStorageService.persistRecentDbArticles($scope.recentDbArticles);
      }).catch((err)=>{
        console.log(err)
      })
    };
    if(userService.user.loggedIn && $scope.recentDbArticles.length<1){
      getRecent(20);
    };

    $scope.refreshArticles = () => {
      $scope.loading = false;
      $scope.recentDbArticles = [];
      localStorageService.clearRecentDbArticles();
      getRecent(20);
    }

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

    $scope.displayAll = () =>{
      $scope.loading = true;
      databaseService.getAll()
      .success((data)=>{
        $scope.recentDbArticles = data;
        $scope.loading = false;
        localStorageService.persistRecentDbArticles($scope.recentDbArticles);
      });
    };

    // $scope.dbSearch = "Davachi L";

    // url = "/api/db/" + $scope.dbSearch + '?callback=JSON_CALLBACK'
    // $http.get(url)
    // .success(function(data) {
    //   $scope.aois = data;
    //   console.log("callback happened")
    // });

    $scope.openLink = function (id) {
              link = $scope.recentDbArticles[id].URL;
              window.open(link); // in new tab
    };


}]);
