angular.module('AOIApp')
    .config($stateProvider => {
        $stateProvider
            .state('logout', {
                url: '/logout',
                controller: 'logoutCtrl',
                templateUrl: './app/logout/logout.html'
        });
});
