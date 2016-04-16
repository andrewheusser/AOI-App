angular.module('AOIApp').config(function ($stateProvider) {
    $stateProvider.state('myjournals', {
        url: '/myjournals',
        controller: 'myjournalsCtrl',
        templateUrl: './app/myjournals/myjournals.html'
    });
});