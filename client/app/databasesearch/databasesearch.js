angular.module('AOIApp')
    .config($stateProvider => {
        $stateProvider
            .state('databasesearch', {
                url: '/databasesearch',
                controller: 'databasesearchCtrl',
                templateUrl: './app/databasesearch/databasesearch.html'
        });
});
