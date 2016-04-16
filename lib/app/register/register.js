angular.module('AOIApp').config(function ($stateProvider) {
    $stateProvider.state('register', {
        url: '/register',
        controller: 'registerCtrl',
        templateUrl: './app/register/register.html'
    });
});