angular.module('AOIApp')
  .controller('myjournalsRecentCtrl', ['$scope', 'pubMedService', 'userService', 'databaseService', function($scope, pubMedService, userService, databaseService) {

  $scope.journals = userService.user.myjournals;
  $scope.user = userService.user;
  $scope.mjArticles = [];


  MY_SCOPE = $scope;

  $scope.getMyJournals = (journals) => {
    journalStr = '';
    $scope.journals.forEach((journal) => {
      journalStr = journalStr + journal.fullTitle + ", "
    })
    return journalStr.slice(0,-2)
  };

  formatJournals = (journals) => {
    formattedJournals = '';
    $scope.journals.forEach((journal) => {
      formattedJournals = formattedJournals + journal.shortTitle + "[JOURNAL] OR "
    })
    return formattedJournals.slice(0,-4)
  }

  if(userService.user.loggedIn && $scope.mjArticles.length<1){
    $scope.formattedJournals = formatJournals(userService.user.myjournals)


    $scope.showAbstract = false;
    $scope.loading = true;
    var numload = 20;
    var loaded = 20;

    // add in database services
    $scope.addArticle = (id) => {
      ind = findIndex($scope.mjArticles,id)
      console.log(ind)
      console.log($scope.mjArticles[ind])
      article = {
        Title: $scope.mjArticles[ind].title,
        Authors: $scope.mjArticles[ind].authorsFormatted,
        Abstract: $scope.mjArticles[ind].abstract,
        Journal: $scope.mjArticles[ind].source,
        Year: $scope.mjArticles[ind].year,
        URL: 'http://www.ncbi.nlm.nih.gov/pubmed/' + $scope.mjArticles[ind].PMID,
        PMID: $scope.mjArticles[ind].PMID,
      }
      databaseService.create(article).success(()=>{
        dbChecker_single(ind)
      })

    };

    // add in pubmed services
    $scope.search = $scope.formattedJournals;
    $scope.loadMore = (ids)=>{
      pubMedService.loadMore(ids)
      dbChecker(0)
    };

    pubMedService.getIds($scope.search)
    .then((results) => {
      $scope.results = results;
      searchResults(results.slice(0, numload-1)).then((mjArticles)=>{
        $scope.mjArticles = mjArticles;
        $scope.mjArticles.searchResults = $scope.results;
        $scope.mjArticles.numload = numload;
        $scope.mjArticles.loaded = loaded;
        $scope.loading = false;
        $scope.$apply();

        // Check to see if article is in database
        dbChecker = (i) => {
          if(i < $scope.mjArticles.length){
            a = $scope.mjArticles[i].id || $scope.mjArticles[i].PMID
            databaseService.getMatch($scope.mjArticles[i].PMID)
            .success((data)=>{
              if (data.length){
                $scope.mjArticles[i].inDB = true;
              } else {
                $scope.mjArticles[i].inDB = false;
              }
              dbChecker(i+1)
            })
          }
        };
        dbChecker(0)

        // Check to see if article is in database
        dbChecker_single = (i) => {
          databaseService.getMatch($scope.mjArticles[i].PMID)
          .success((data)=>{
            console.log(data)
            if (data.length){
              $scope.mjArticles[i].inDB = true;
            } else {
              $scope.mjArticles[i].inDB = false;
            }
          })
        };

      }, (err) => {
        console.log("Couldn't get mjArticles!")

      });
    });

  };

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
