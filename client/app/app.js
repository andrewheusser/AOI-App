var AOIApp = angular.module('AOIApp', ['ui.router', 'ngResource']);

AOIApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/login');
    $locationProvider.html5Mode(true);
});
