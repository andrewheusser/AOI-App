angular.module('AOIApp').config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        controller: 'homeCtrl',
        templateUrl: './app/home/home.html'
    });
});