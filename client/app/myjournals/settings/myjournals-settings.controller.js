angular.module('AOIApp')
  .controller('myjournalsSettingsCtrl', ['$scope', 'userService', function($scope, userService) {

  $scope.user = userService.user;

  $scope.journals = userService.user.myjournals;

  // $scope.addJournal = () => {
  //   $scope.journals.push({fullTitle:$scope.addedjournal,
  //   shortTitle:""})
  // };
  //
  // $scope.removeJournal = (index) =>{
  //   $scope.journals.splice(index,1)
  // };

}]);
