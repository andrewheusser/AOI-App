angular.module('AOIApp')
    .config($stateProvider => {
        $stateProvider
            .state('pubmedsearch', {
                url: '/pubmedsearch',
                controller: 'pubmedsearchCtrl',
                templateUrl: './app/pubmedsearch/pubmedsearch.html'
        });
});
