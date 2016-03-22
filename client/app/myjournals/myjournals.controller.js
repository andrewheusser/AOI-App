angular.module('AOIApp')
.controller('myjournalsCtrl', ['$scope', 'pubMedService', 'userService', 'databaseService', function($scope, pubMedService, userService, databaseService) {

  $scope.user = userService.user;

  // $scope.myarticles =

}]);
