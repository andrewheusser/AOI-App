var AOIApp = angular.module('AOIApp', ['ui.router', 'ngResource']);

AOIApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/login');
    $locationProvider.html5Mode(true);
})

    .run(function ($rootScope, $state, userService){
      $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (toState.name === 'myjournals.recent' || toState.name === 'database.recent') {
          if (!userService.user.loggedIn) {
          event.preventDefault();
          $state.go('login');
        }
      }
      if (toState.name === 'login') {
        if (userService.user.loggedIn) {
        event.preventDefault();
        $state.go('logout');
      }
    }
    if (toState.name === 'myjournals.recent') {
      if (userService.user.myjournals.length==0 && userService.user.keywords.length==0) {
      event.preventDefault();
      $state.go('myjournals.settings');
    }
  }

    })
  });
