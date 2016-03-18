var AOIApp = angular.module('AOIApp', ['ui.router', 'ngResource']);

AOIApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');
    $locationProvider.html5Mode(true);
});
