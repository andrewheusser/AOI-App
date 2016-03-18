angular.module('AOIApp')
  .controller('myjournalsCtrl', ['$scope', 'pubMedService', 'userService', function($scope, pubMedService, userService) {

  MY_SCOPE = $scope;

  $scope.user = userService.user;
  $scope.journals = userService.user.myjournals;

  formatJournals = (journals) => {
    formattedJournals = '';
    $scope.journals.forEach((journal) => {
      formattedJournals = formattedJournals + journal.shortTitle + "[JOURNAL] OR "
    })
    return formattedJournals.slice(0,-4)
  }

  // $scope.formattedJournals = formatJournals(userService.user.myjournals)
  //
  // getArticles = (search) => {
  //   databaseService.get(search)
  //   .success((data)=>{
  //     $scope.myarticles = data;
  //     $scope.loading = false;
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  // }
  //
  // getArticles($scope.formattedJournals)

  // $scope.myarticles =

}]);
