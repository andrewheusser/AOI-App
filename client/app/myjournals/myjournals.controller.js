angular.module('AOIApp')
  .controller('myjournalsCtrl', ['$scope', 'pubMedService', 'userService', function($scope, pubMedService, userService) {

  $scope.user = userService.user;

}]);
