var AOIApp = angular.module('AOIApp', ['ui.router', 'ngResource']);

AOIApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/home');
  $locationProvider.html5Mode(true);
}).run(function ($rootScope, $state, userService) {
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    // if not logged in, go to log in page and if no journals defined, go to the settings page first
    if (toState.name === 'myjournals.recent') {
      if (!userService.user.loggedIn) {
        event.preventDefault();
        $state.go('login');
      } else if (userService.user.myjournals.length == 0 && userService.user.keywords.length == 0) {
        event.preventDefault();
        $state.go('myjournals.settings');
      }
    };
    // if not logged in, can't go to database unless called explicitly
    if (toState.name === 'database.recent') {
      if (!userService.user.loggedIn) {
        event.preventDefault();
        $state.go('login');
      }
    };
    // if you are already logged in, switch the state to log out
    if (toState.name === 'login') {
      if (userService.user.loggedIn) {
        event.preventDefault();
        $state.go('logout');
      }
    };
  });
});