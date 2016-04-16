angular.module('AOIApp').config(function ($stateProvider) {
    $stateProvider.state('pubmedsearch', {
        url: '/pubmedsearch',
        controller: 'pubmedsearchCtrl',
        templateUrl: './app/pubmedsearch/pubmedsearch.html'
    });
});