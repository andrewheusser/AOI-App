var AOIApp = angular.module('AOIApp', ['ui.router', 'ngResource']);

AOIApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    // $stateProvider
    //
    //     // HOME STATES AND NESTED VIEWS ========================================
    //     .state('home', {
    //         url: '/home',
    //         templateUrl: 'partial-home.html'
    //     })
    //
    //     // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    //     .state('about', {
    //         // we'll get to this in a bit
    //     });

});

//
// var AOIApp = angular.module('AOIApp', []);

//    .config(($stateProvider, $urlRouterProvider) => {
//     $urlRouterProvider.otherwise('/');
//
// })
//     .run(($state) => {
//
//     });
