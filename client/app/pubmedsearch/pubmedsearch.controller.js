angular.module('AOIApp')
  .controller('pubmedsearchCtrl', ['$scope', '$location', 'pubMedService', 'databaseService', 'userService', function($scope, $location, pubMedService, databaseService, userService) {

  // for easy debugging
  MY_SCOPE = $scope;

  // set some variables
  $scope.user = userService.user;
  $scope.showAbstract = false;
  $scope.loading = true;
  var numload = 20;
  var loaded = 20;

  // add in database services
  $scope.addArticle = (id) => {
    ind = findIndex($scope.articles,id)
    console.log(ind)
    console.log($scope.articles[ind])
    article = {
      Title: $scope.articles[ind].title,
      Authors: $scope.articles[ind].authorsFormatted,
      Abstract: $scope.articles[ind].abstract,
      Journal: $scope.articles[ind].source,
      Year: $scope.articles[ind].year,
      URL: 'http://www.ncbi.nlm.nih.gov/pubmed/' + $scope.articles[ind].PMID,
      PMID: $scope.articles[ind].PMID,
    }
    databaseService.create(article).success(()=>{
      dbChecker_single(ind)
    })

    };


  // add in pubmed services
  $scope.search = pubMedService.search;
  $scope.loadMore = (ids)=>{
    pubMedService.loadMore(ids)
    dbChecker(0)
  };

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

      // Check to see if article is in database
      dbChecker = (i) => {
        if(i < $scope.articles.length){
          a = $scope.articles[i].id || $scope.articles[i].PMID
          databaseService.getMatch($scope.articles[i].PMID)
            .success((data)=>{
              if (data.length){
                $scope.articles[i].inDB = true;
              } else {
                $scope.articles[i].inDB = false;
              }
              dbChecker(i+1)
            })
        }
      };
      dbChecker(0)

      // Check to see if article is in database
      dbChecker_single = (i) => {
          databaseService.getMatch($scope.articles[i].PMID)
            .success((data)=>{
              console.log(data)
              if (data.length){
                $scope.articles[i].inDB = true;
              } else {
                $scope.articles[i].inDB = false;
              }
            })
      };

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

  findIndex = (arr,id) =>{
    counter=0
    arr.forEach((article)=>{
      if(article.PMID==id){
        index=counter
      }
      counter+=1
    });
    return index
  };

}]);
