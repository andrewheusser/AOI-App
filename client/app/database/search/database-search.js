angular.module('AOIApp')
    .config($stateProvider => {
        $stateProvider
            .state('database.search', {
                url: '/search',
                controller: 'databaseSearchCtrl',
                templateUrl: './app/database/search/database-search.html'
        });
});
