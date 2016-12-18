angular.module('AOIApp').controller('myjournalsSettingsCtrl', ['$scope', 'userService', 'databaseService', function ($scope, userService, databaseService) {

  MYJOURNAL_SCOPE = $scope;

  $scope.user = userService.user;
  $scope.journals = userService.user.myjournals;
  $scope.keywords = userService.user.keywords;

  $scope.addJournal = function (addedjournal) {
    var addedJournal = { shortTitle: addedjournal, fullTitle: addedjournal };
    $scope.journals.push(addedJournal);
    $scope.addedjournal = '';
    var data = {
      email: $scope.user.email,
      myjournals: $scope.journals
    };
    databaseService.updateMyJournals(data).success(function (result) {
      userService.user.myjournals = result.local.myjournals;
    });
  };

  $scope.removeJournal = function (index) {
    $scope.journals.splice(index, 1);
    var data = {
      email: $scope.user.email,
      myjournals: $scope.journals
    };
    databaseService.updateMyJournals(data).success(function (result) {
      userService.user.myjournals = result.local.myjournals;
    });
  };

  $scope.addKeyword = function (addedkeyword) {
    $scope.keywords.push(addedkeyword);
    $scope.addedkeyword = '';
    var data = {
      email: $scope.user.email,
      keywords: $scope.keywords
    };
    databaseService.updateMyKeywords(data).success(function (result) {
      userService.user.keywords = result.local.keywords;
      console.log($scope.keywords);
    });
  };

  $scope.removeKeyword = function (index) {
    $scope.keywords.splice(index, 1);

    var data = {
      email: $scope.user.email,
      keywords: $scope.keywords
    };
    databaseService.updateMyKeywords(data).success(function (result) {
      userService.user.keywords = result.local.keywords;
      console.log($scope.keywords);
    });
  };
}]);