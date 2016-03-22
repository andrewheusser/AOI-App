angular.module('AOIApp')
.controller('myjournalsCtrl', ['$scope', '$location', 'pubMedService', 'userService', 'databaseService', function($scope, $location, pubMedService, userService, databaseService) {

  $scope.user = userService.user;

  // $scope.myarticles =

}]);
