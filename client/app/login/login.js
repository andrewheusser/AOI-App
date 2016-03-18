angular.module('AOIApp')
    .config($stateProvider => {
        $stateProvider
            .state('login', {
                url: '/login',
                controller: 'loginCtrl',
                templateUrl: './app/login/login.html'
        });
});
