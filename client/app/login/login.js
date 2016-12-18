angular.module('AOIApp').config(function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        controller: 'loginCtrl',
        templateUrl: './app/login/login.html'
    });
});