angular.module('AOIApp').config(function ($stateProvider) {
    $stateProvider.state('myjournals.recent', {
        url: '/recent',
        controller: 'myjournalsRecentCtrl',
        templateUrl: './app/myjournals/recent/myjournals-recent.html'
    });
});