angular.module('AOIApp')
    .config($stateProvider => {
        $stateProvider
            .state('register', {
                url: '/register',
                controller: 'registerCtrl',
                templateUrl: './app/register/register.html'
        });
});
