angular.module('AOIApp')
    .config($stateProvider => {
        $stateProvider
            .state('home', {
                url: '/home',
                controller: 'homeCtrl',
                templateUrl: './app/home/home.html'
        });
});
