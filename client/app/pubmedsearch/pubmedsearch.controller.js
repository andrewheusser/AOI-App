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
    ind = findIndex($scope.pmArticles,id)
    $scope.pmArticles[ind].inDB=true;
    article = {
      Title: $scope.pmArticles[ind].title,
      Authors: $scope.pmArticles[ind].authorsFormatted,
      Abstract: $scope.pmArticles[ind].abstract,
      Journal: $scope.pmArticles[ind].source,
      Year: $scope.pmArticles[ind].year,
      URL: 'http://www.ncbi.nlm.nih.gov/pubmed/' + $scope.pmArticles[ind].PMID,
      PMID: $scope.pmArticles[ind].PMID,
      AddedBy: userService.user.firstname,
    };
    console.log(article)
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
    searchResults(results.slice(0, numload-1)).then((pmArticles)=>{
      $scope.pmArticles = pmArticles;
      $scope.pmArticles.searchResults = $scope.results;
      $scope.pmArticles.numload = numload;
      $scope.pmArticles.loaded = loaded;
      $scope.loading = false;
      $scope.$apply();

      // Check to see if article is in database
      dbChecker = (i) => {
        if(i < $scope.pmArticles.length){
          a = $scope.pmArticles[i].id || $scope.pmArticles[i].PMID
          databaseService.getMatch($scope.pmArticles[i].PMID)
            .success((data)=>{
              if (data.length){
                $scope.pmArticles[i].inDB = true;
              } else {
                $scope.pmArticles[i].inDB = false;
              }
              dbChecker(i+1)
            })
        }
      };
      dbChecker(0)

      // Check to see if article is in database
      dbChecker_single = (i) => {
          databaseService.getMatch($scope.pmArticles[i].PMID)
            .success((data)=>{
              console.log(data)
              if (data.length){
                $scope.pmArticles[i].inDB = true;
              } else {
                $scope.pmArticles[i].inDB = false;
              }
            })
      };

    }, (err) => {
      console.log("Couldn't get pmArticles!")

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
