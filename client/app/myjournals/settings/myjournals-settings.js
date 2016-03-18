angular.module('AOIApp')
    .config($stateProvider => {
        $stateProvider
            .state('myjournals.settings', {
                url: '/settings',
                controller: 'myjournalsSettingsCtrl',
                templateUrl: './app/myjournals/settings/myjournals-settings.html'
            })
    });
