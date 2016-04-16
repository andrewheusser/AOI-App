angular.module('AOIApp').config(function ($stateProvider) {
    $stateProvider.state('database.search', {
        url: '/search',
        controller: 'databaseSearchCtrl',
        templateUrl: './app/database/search/database-search.html'
    });
});