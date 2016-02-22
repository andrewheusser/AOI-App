// MODULE
// var parser = require('xml2json');
//
// var xml = "<foo>bar</foo>";
// var json = parser.toJson(xml); //returns a string containing the JSON structure by default
// console.log(json);

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
AOIApp.service('pubMedService', function(){
  this.search = "Davachi L";
})

// CONTROLLERS
AOIApp.controller('homeController', ['$scope', 'pubMedService', function($scope, pubMedService) {

  $scope.search = pubMedService.search;

  $scope.$watch('search', function(){
    pubMedService.search = $scope.search;
  });

}]);

AOIApp.controller('searchController', ['$scope', '$resource', '$http', 'pubMedService', function($scope, $resource, $http, pubMedService) {

  MY_SCOPE = $scope;

  $scope.search = pubMedService.search;

  $scope.pubMedAPISearch = $resource("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi", { get: { method: "JSONP" } } );
  $scope.pubMedAPISummary = $resource("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi", { get: { method: "JSONP" } } );

  $scope.getAbstract = (id) => $http({
            method  : 'GET',
            url     : 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi',
            timeout : 10000,
            params  : {
                  db: "pubmed",
                  retmode: "xml",
                  rettype: "abstract",
                  id: id
                },
                // Query Parameters (GET)
            transformResponse : function(data) {
                // string -> XML document object
                // return $.parseXML(data);
                var x2js = new X2JS();
                var data = x2js.xml_str2json( data );
                return data
            }
}).then((result)=>{
  $scope.abstract = result.data.PubmedArticleSet;
  console.log(result.data.PubmedArticleSet.PubmedArticle.MedlineCitation.Article.Abstract)
}, (err)=>{
  console.log("there was an error")
});

  $scope.searchResults = $scope.pubMedAPISearch
    .get({
      db: "pubmed",
      retmode: "json",
      rettype: "abstract",
      term: $scope.search,
      retmax: "20"}, function(data){
        $scope.idlist = $scope.searchResults.esearchresult.idlist;
        $scope.summaryResults();
      });

  $scope.summaryResults = () => {
    $scope.pubMedAPISummary
    .get({db: "pubmed",
    retmode: "json",
    rettype: "abstract",
    id: $scope.idlist.join()}, function(data){
      articles=[]
      $scope.abstracts=[]
      for (id of data.result.uids){
        // data.result[id].abstract = $scope.getAbstract(id);
        $scope.abstracts[id] = $scope.getAbstract(id);
        data.result[id].authorsFormatted = $scope.formatAuthors(data.result[id]);
        data.result[id].year = $scope.formatYear(data.result[id]);
        data.result[id].id=id;
        articles.push(data.result[id]);
      };
      $scope.articles = articles;
    });
};

  $scope.formatAuthors = (article) => {
    authorList=[];
    for (author of article.authors){
      authorList.push(author.name)
    }
    return authorList.join(', ')
  };

  $scope.formatYear = (article) => {
    return article.pubdate.split(' ')[0];
  };

}]);
