angular.module('AOIApp')
  .controller('myjournalsRecentCtrl', ['$scope', 'pubMedService', 'userService', function($scope, pubMedService, userService) {

  $scope.user = userService.user;

}]);
