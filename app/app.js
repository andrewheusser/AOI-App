var AOIApp = angular.module('AOIApp', ['ngRoute', 'ngResource']);

// ROUTES
AOIApp.config(function ($routeProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'pages/home.htm',
    controller: 'homeController'
  })

  .when('/search', {
    templateUrl: 'pages/search.htm',
    controller: 'searchController'
  })

});

// SERVICES
AOIApp.factory('pubMedService', ['$resource', '$http', function($resource, $http) {

  var search = "Davachi L";

  searchArticles = $resource("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi");
  searchIds = $resource("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi");

  getIds = (search) => {
    return searchIds.get(
      {
        db: "pubmed",
        retmode: "json",
        term: search,
        retmax: "100"
      }).$promise.then((data)=>{return data.esearchresult.idlist})
    };

    getArticles = (ids) => {
      return searchArticles.get({
        db: "pubmed",
        retmode: "json",
        id: ids.join()}).$promise.then((data)=>{return data.result})
      };

      getAbstracts = (ids) => $http({
        method  : 'GET',
        url     : 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi',
        timeout : 10000,
        params  : {
          db: "pubmed",
          retmode: "xml",
          rettype: "abstract",
          id: ids
        },
        transformResponse : function(data) {
          var x2js = new X2JS();
          var data = x2js.xml_str2json( data );
          return data
        }
      })
      .then((result)=>{
        console.log(result)
        return result
      }, (err)=>{
        console.log("there was an error")
      });

      searchResults = (ids) => {
        return new Promise((res,rej)=>{
          getArticles(ids)
          .then((data)=>{
            console.log(data)
            articles = formatArticles(data)
            res(articles)
          }, (err) => {
            console.log("Couldn't get articles!")
          })
        })
      };

      Article = function(){
        this.title = '';
        this.year = '';
        this.id = '';
        this.authorsFormatted = '';
        this.abstract = 'TEST';
        this.source = '';
      }

      formatArticles = (data) => {
        articlesArray = [];
        article = {};
        for (id of Object.keys(data)){
          if(id !='uids'){
            article[id]= new Article();
            article[id].title = data[id].title;
            article[id].authorsFormatted = formatAuthors(data[id]);
            article[id].year = formatYear(data[id]);
            article[id].id=id;
            article[id].source = data[id].source;
            articlesArray.push(article[id]);
          }
        }
        return articlesArray
      };

      formatAuthors = (article) => {
        authorList=[];
        for (author of article.authors){
          authorList.push(author.name)
        }
        return authorList.join(', ')
      };

      formatYear = (article) => {
        return article.pubdate.split(' ')[0];
      };

      loadMore = (articles) => {
        return new Promise((res,rej)=>{
          moreIds = articles.searchResults.slice(articles.loaded+1,articles.loaded+1+articles.numload);
          console.log(moreIds)
          getArticles(moreIds)
          .then((data)=>{
            formattedNewArticles = formatArticles(data);
            formattedNewArticles.forEach((newArticle)=>{
              articles.push(newArticle)
            });
            articles.loaded=articles.loaded+articles.numload;
            res(articles)
          }, (err) => {
            console.log("Couldn't get articles!")
          })
        })
      }

      return {
        search: search,
        getIds: getIds,
        searchResults: searchResults,
        loadMore: loadMore,
      }

    }]);

    // CONTROLLERS
    AOIApp.controller('homeController', ['$scope', 'pubMedService', function($scope, pubMedService) {

      $scope.search = pubMedService.search;

      $scope.$watch('search', function(){
        return pubMedService.search = $scope.search;
      });

    }]);

    AOIApp.controller('searchController', ['$scope', 'pubMedService', function($scope, pubMedService) {

      MY_SCOPE = $scope;

      $scope.search = pubMedService.search;
      $scope.loggedIn = true;
      $scope.showAbstract = false;

      $scope.$watch('search', function(){
        return pubMedService.search = $scope.search;
      });

      $scope.loadMore = pubMedService.loadMore;
      var numload = 5;
      var loaded = 5;


      pubMedService.getIds($scope.search)
      .then((results) => {
        $scope.results = results;
        searchResults(results.slice(0, numload-1)).then((articles)=>{
          $scope.articles = articles;
          $scope.articles.searchResults = $scope.results;
          $scope.articles.numload = numload;
          $scope.articles.loaded = loaded;
          $scope.$apply();
        })
      });

      $scope.$watch('search',()=>{
        $scope.search = pubMedService.search;
      })

    }]);
