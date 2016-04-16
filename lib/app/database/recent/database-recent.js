angular.module('AOIApp').config(function ($stateProvider) {
    $stateProvider.state('database.recent', {
        url: '/recent',
        controller: 'databaseRecentCtrl',
        templateUrl: './app/database/recent/database-recent.html'
    });
});