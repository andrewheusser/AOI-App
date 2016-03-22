angular.module('AOIApp')
    .config($stateProvider => {
        $stateProvider
            .state('newuser', {
                url: '/newuser',
                controller: 'newuserCtrl',
                templateUrl: './app/newuser/newuser.html'
        });
});
