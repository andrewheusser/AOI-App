AOIApp.controller('searchController', ['$scope', '$location', 'pubMedService', function($scope, $location, pubMedService) {

  MY_SCOPE = $scope;

  $scope.search = pubMedService.search;
  $scope.showAbstract = false;
  $scope.loading = true;

  $scope.$watch('search', function(){
    return pubMedService.search = $scope.search;
  });

  $scope.loadMore = pubMedService.loadMore;
  var numload = 20;
  var loaded = 20;

  pubMedService.getIds($scope.search)
  .then((results) => {
    $scope.results = results;
    searchResults(results.slice(0, numload-1)).then((articles)=>{
      $scope.articles = articles;
      $scope.articles.searchResults = $scope.results;
      $scope.articles.numload = numload;
      $scope.articles.loaded = loaded;
      $scope.loading = false;
      $scope.$apply();
    }, (err) => {
      console.log("Couldn't get articles!")
    });
  });

  $scope.$watch('search',()=>{
    $scope.search = pubMedService.search;
  });

  $scope.filterFunction = function(element) {
    return element.title.match(/^Ma/)||element.title.name(/^Ma/)||element.title.year(/^Ma/) ? true : false;
  };

  $scope.navigationUrl = function (event, id) {
            window.open('http://www.ncbi.nlm.nih.gov/pubmed/' + id, '_blank'); // in new tab
  };

}]);
