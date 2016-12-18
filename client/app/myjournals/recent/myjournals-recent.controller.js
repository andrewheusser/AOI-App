angular.module('AOIApp').controller('myjournalsRecentCtrl', ['$scope', 'pubMedService', 'userService', 'databaseService', 'localStorageService', function ($scope, pubMedService, userService, databaseService, localStorageService) {

  $scope.journals = userService.user.myjournals;
  $scope.keywords = userService.user.keywords;
  $scope.user = userService.user;
  $scope.mjArticles = [];

  MY_SCOPE = $scope;

  $scope.getMyJournals = function (journals) {
    journalStr = '';
    $scope.journals.forEach(function (journal) {
      journalStr = journalStr + journal.fullTitle + ", ";
    });
    return journalStr.slice(0, -2);
  };

  var formatJournals = function formatJournals(journals) {
    formattedJournals = '';
    $scope.journals.forEach(function (journal) {
      formattedJournals = formattedJournals + journal.shortTitle + "[JOURNAL] OR ";
    });
    return formattedJournals.slice(0, -4);
  };

  $scope.getMyKeywords = function (keywords) {
    keywordStr = '';
    $scope.keywords.forEach(function (keyword) {
      keywordStr = keywordStr + keyword + ", ";
    });
    return keywordStr.slice(0, -2);
  };

  var formatKeywords = function formatKeywords(keywords) {
    if (keywords.length > 0) {
      formattedKeywords = '(';
      $scope.keywords.forEach(function (keyword) {
        formattedKeywords = formattedKeywords + keyword + "[All Fields] OR ";
      });
      return formattedKeywords.slice(0, -4) + ')';
    } else {
      return keywords;
    }
  };

  $scope.mjArticles = localStorageService.getMjArticles();

  $scope.getArticles = function () {

    var numload = 20;
    var loaded = 20;
    $scope.formattedJournals = formatJournals(userService.user.myjournals);
    $scope.formattedKeywords = formatKeywords(userService.user.keywords);
    $scope.showAbstract = false;
    $scope.loading = true;
    $scope.search = formatJournals(userService.user.myjournals) + ' AND ' + formatKeywords(userService.user.keywords);
    console.log($scope.search);

    pubMedService.getIds($scope.search).then(function (results) {
      $scope.results = results;
      searchResults(results.slice(0, numload - 1)).then(function (mjArticles) {
        $scope.mjArticles = mjArticles;
        $scope.mjArticles.searchResults = $scope.results;
        $scope.mjArticles.numload = numload;
        $scope.mjArticles.loaded = loaded;
        $scope.loading = false;
        localStorageService.persistMjArticles($scope.mjArticles);
        $scope.$apply();
        dbChecker(0);
      }, function (err) {
        console.log("Couldn't get mjArticles!");
      });
    });
  };

  if (userService.user.loggedIn && $scope.mjArticles.length < 1) {
    $scope.getArticles();
  };

  $scope.refreshArticles = function () {
    $scope.mjArticles = [];
    localStorageService.clearMjArticles();
    $scope.getArticles();
  };

  // query filter logic
  $scope.filterFunction = function (element) {
    return element.title.match(/^Ma/) || element.title.name(/^Ma/) || element.title.year(/^Ma/) ? true : false;
  };

  // open link when it is clicked
  $scope.navigationUrl = function (event, id) {
    window.open('http://www.ncbi.nlm.nih.gov/pubmed/' + id, '_blank'); // in new tab
  };

  // add in database services
  $scope.addArticle = function (id) {
    ind = findIndex($scope.mjArticles, id);
    $scope.mjArticles[ind].inDB = true;
    article = {
      Title: $scope.mjArticles[ind].title,
      Authors: $scope.mjArticles[ind].authorsFormatted,
      Abstract: $scope.mjArticles[ind].abstract,
      Journal: $scope.mjArticles[ind].source,
      Year: $scope.mjArticles[ind].year,
      URL: 'http://www.ncbi.nlm.nih.gov/pubmed/' + $scope.mjArticles[ind].PMID,
      PMID: $scope.mjArticles[ind].PMID,
      AddedBy: userService.user.firstname
    };
    databaseService.create(article).success(function () {
      dbChecker_single(ind);
    });
  };

  $scope.loadMore = function (ids) {
    pubMedService.loadMore(ids);
    dbChecker(0);
  };

  // Check to see if article is in database
  dbChecker_single = function dbChecker_single(i) {
    databaseService.getMatch($scope.mjArticles[i].PMID).success(function (data) {
      if (data.length) {
        $scope.mjArticles[i].inDB = true;
      } else {
        $scope.mjArticles[i].inDB = false;
      }
    });
  };

  // Check to see if article is in database
  dbChecker = function (_dbChecker) {
    function dbChecker(_x) {
      return _dbChecker.apply(this, arguments);
    }

    dbChecker.toString = function () {
      return _dbChecker.toString();
    };

    return dbChecker;
  }(function (i) {
    if (i < $scope.mjArticles.length) {
      a = $scope.mjArticles[i].id || $scope.mjArticles[i].PMID;
      databaseService.getMatch($scope.mjArticles[i].PMID).success(function (data) {
        if (data.length) {
          $scope.mjArticles[i].inDB = true;
        } else {
          $scope.mjArticles[i].inDB = false;
        }
        dbChecker(i + 1);
      });
    }
  });

  findIndex = function findIndex(arr, id) {
    counter = 0;
    arr.forEach(function (article) {
      if (article.PMID == id) {
        index = counter;
      }
      counter += 1;
    });
    return index;
  };
}]);