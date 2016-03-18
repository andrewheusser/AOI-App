angular.module('AOIApp')
  .controller('myjournalsSettingsCtrl', ['$scope', 'pubMedService', 'userService', function($scope, pubMedService, userService) {

  $scope.user = userService.user;

  $scope.journals = [
    {title: "Current Biology"},
    {title: "Nature Neuroscience"},
    {title: "Learning and Memory"},
  ]

}]);
