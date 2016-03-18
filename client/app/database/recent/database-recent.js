angular.module('AOIApp')
    .config($stateProvider => {
        $stateProvider
            .state('database.recent', {
                url: '/recent',
                controller: 'databaseRecentCtrl',
                templateUrl: './app/database/recent/database-recent.html'
        });
});
