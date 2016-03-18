angular.module('AOIApp')
    .config($stateProvider => {
        $stateProvider
            .state('myjournals.recent', {
                url: '/recent',
                controller: 'myjournalsRecentCtrl',
                templateUrl: './app/myjournals/recent/myjournals-recent.html'
            })
    });
