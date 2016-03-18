angular.module('AOIApp')
    .config($stateProvider => {
        $stateProvider
            .state('database', {
                url: '/database',
                controller: 'databaseCtrl',
                templateUrl: './app/database/database.html'
        });
});
