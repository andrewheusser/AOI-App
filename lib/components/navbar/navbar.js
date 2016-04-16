angular.module('AOIApp').directive('navbar', function () {
    return {
        restrict: 'E',
        templateUrl: './components/navbar/navbar.html',
        controller: 'navbarController'
    };
});