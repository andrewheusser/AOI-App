angular.module('AOIApp')
    .config($stateProvider => {
        $stateProvider
            .state('database.results', {
                url: '/results',
                controller: 'databaseResultsCtrl',
                templateUrl: './app/database/results/database-search-results.html'
        });
});
