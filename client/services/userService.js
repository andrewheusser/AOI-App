angular.module('AOIApp')
  .factory('userService', ['$http',function($http) {
  return {
    load: function() {
      return $http.get('/api/auth');
    },
    logout: function() {
      return $http.get('/api/auth/logout');
    },
    login: function(inputs) {
      return $http.post('/api/auth/login', inputs);
    },
    register: function(inputs) {
      return $http.post('/api/auth/register', inputs);
    },
    locations: function() {
      return $http.get('/api/auth/locations');
    },
    check: function() {
      return $http.get('/api/auth/check');
    },
    user: {
      email: '',
      password: '',
      loggedIn: false,
      myJournals: ''
    }
  }
}]);
