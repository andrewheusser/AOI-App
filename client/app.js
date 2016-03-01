var AOIApp = angular.module('AOIApp', ['ngRoute', 'ngResource']);

// ROUTES
AOIApp.config(function ($routeProvider, $locationProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'pages/home.htm',
    controller: 'homeController'
  })

  .when('/myjournals', {
    templateUrl: 'pages/myjournals.htm',
    controller: 'myJournalsController'
  })

  .when('/login', {
    templateUrl: 'pages/login.htm',
    controller: 'loginController'
  })

  .when('/search', {
    templateUrl: 'pages/search.htm',
    controller: 'searchController'
  })

  .when('/db', {
    templateUrl: 'pages/db.htm',
    controller: 'searchController'
  });

  $locationProvider.html5Mode(true);

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
        console.log("Couldn't get articles!")
        return err
      });

      searchResults = (ids) => {
        return new Promise((res,rej)=>{
          getAbstracts(ids)
          // getArticles(ids)
          .then((data)=>{
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

      // formatArticles = (data) => {
      //   articlesArray = [];
      //   article = {};
      //   for (id of Object.keys(data)){
      //     if(id !='uids'){
      //       article[id]= new Article();
      //       article[id].title = data[id].title;
      //       article[id].authorsFormatted = formatAuthors(data[id]);
      //       article[id].year = formatYear(data[id]);
      //       article[id].id=id;
      //       article[id].source = data[id].source;
      //       articlesArray.push(article[id]);
      //     }
      //   }
      //   return articlesArray
      // };
      formatArticles = (data) => {
        articlesArray = [];
        // article = {};
        data = data.data.PubmedArticleSet.PubmedArticle;
        data.forEach((article)=>{
          console.log(article)
          articleObj = new Article();
          articleObj.title = article.MedlineCitation.Article.ArticleTitle;
          articleObj.authorsFormatted = formatAuthors(article.MedlineCitation.Article.AuthorList.Author);
          articleObj.year = article.PubmedData.History.PubMedPubDate[0].Year;
          articleObj.id=article.MedlineCitation.PMID.__text;
          articleObj.source = article.MedlineCitation.Article.Journal.ISOAbbreviation;
          articleObj.abstract = (typeof article.MedlineCitation.Article.Abstract === 'undefined') ? 'No Abstract Found' : article.MedlineCitation.Article.Abstract.AbstractText;
          articlesArray.push(articleObj);
        });
        return articlesArray
      };

      formatAuthors = (authors) => {
        if(authors.constructor === Array) {
          authorList=[];
          authors.forEach((author)=>{
            authorList.push(author.LastName + ' ' + author.Initials)
          });
          return authorList.join(', ')
        } else if(authors.constructor === Object){
          return authors.LastName + ' ' + authors.Initials
        }
      };

      formatYear = (article) => {
        return article.pubdate.split(' ')[0];
      };

      loadMore = (articles) => {
        return new Promise((res,rej)=>{
          moreIds = articles.searchResults.slice(articles.loaded+1,articles.loaded+1+articles.numload);
          console.log(moreIds)
          getAbstracts(moreIds)
          .then((data)=>{
            console.log(data)
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
    AOIApp.controller('homeController', ['$scope', '$location', 'pubMedService', function($scope, $location, pubMedService) {

      $scope.search = pubMedService.search;

      $scope.$watch('search', function(){
        return pubMedService.search = $scope.search;
      });

      $scope.submit = () => {
        $location.path("/search");
      };

    }]);

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
        })
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

    // CONTROLLERS
    AOIApp.controller('myJournalsController', ['$scope', 'pubMedService', function($scope, pubMedService) {

      $scope.journals = [
        {title: "Current Biology"},
        {title: "Nature Neuroscience"},
        {title: "Learning and Memory"},
      ]

    }]);
