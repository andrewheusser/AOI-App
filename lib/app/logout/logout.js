angular.module('AOIApp').config(function ($stateProvider) {
    $stateProvider.state('logout', {
        url: '/logout',
        controller: 'logoutCtrl',
        templateUrl: './app/logout/logout.html'
    });
});