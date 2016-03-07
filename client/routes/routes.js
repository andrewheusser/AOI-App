AOIApp.config(function ($routeProvider, $locationProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'app/login/login.htm',
    controller: 'loginController'
  })

  .when('/home', {
    templateUrl: 'app/home/home.htm',
    controller: 'homeController'
  })

  .when('/myjournals', {
    templateUrl: 'app/myjournals/myjournals.htm',
    controller: 'myJournalsController'
  })

  .when('/login', {
    templateUrl: 'app/login/login.htm',
    controller: 'loginController'
  })

  .when('/search', {
    templateUrl: 'app/search/search.htm',
    controller: 'searchController'
  })

  .when('/database', {
    templateUrl: 'app/database/database.htm',
    controller: 'databaseController'
  })

  .when('/dbsearch', {
    templateUrl: 'app/dbsearch/dbsearch.htm',
    controller: 'dbSearchController'
  });

  $locationProvider.html5Mode(true);

});
