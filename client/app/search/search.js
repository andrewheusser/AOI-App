AOIApp.controller('searchController', ['$scope', '$location', 'pubMedService', 'databaseService', function($scope, $location, pubMedService, databaseService) {

  // for easy debugging
  MY_SCOPE = $scope;

  // set some variables
  $scope.showAbstract = false;
  $scope.loading = true;
  var numload = 20;
  var loaded = 20;

  // add in database services
  $scope.addArticle = (id) => {
    console.log($scope.articles[id])
    article = {
      Title: $scope.articles[id].title,
      Authors: $scope.articles[id].authorsFormatted,
      Abstract: $scope.articles[id].abstract,
      Journal: $scope.articles[id].source,
      Year: $scope.articles[id].year,
      URL: 'http://www.ncbi.nlm.nih.gov/pubmed/' + $scope.articles[id].id
    }
    databaseService.create(article)
  }

  // add in pubmed services
  $scope.search = pubMedService.search;
  $scope.loadMore = pubMedService.loadMore;

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

  // query filter logic
  $scope.filterFunction = function(element) {
    return element.title.match(/^Ma/)||element.title.name(/^Ma/)||element.title.year(/^Ma/) ? true : false;
  };

  // open link when it is clicked
  $scope.navigationUrl = function (event, id) {
            window.open('http://www.ncbi.nlm.nih.gov/pubmed/' + id, '_blank'); // in new tab
  };

}]);
