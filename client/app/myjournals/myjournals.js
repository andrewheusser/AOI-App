angular.module('AOIApp')
    .config($stateProvider => {
        $stateProvider
            .state('myjournals', {
                url: '/myjournals',
                controller: 'myjournalsCtrl',
                templateUrl: './app/myjournals/myjournals.html'
        });
});
