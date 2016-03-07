AOIApp.controller('myJournalsController', ['$scope', 'pubMedService', function($scope, pubMedService) {

  $scope.journals = [
    {title: "Current Biology"},
    {title: "Nature Neuroscience"},
    {title: "Learning and Memory"},
  ]

}]);
