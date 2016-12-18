angular.module('AOIApp').config(function ($stateProvider) {
    $stateProvider.state('database', {
        url: '/database',
        controller: 'databaseCtrl',
        templateUrl: './app/database/database.html'
    });
});