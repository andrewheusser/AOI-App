angular.module('AOIApp').factory('userService', ['$http', function ($http) {
  return {
    load: function load() {
      return $http.get('/api/auth');
    },
    logout: function logout() {
      return $http.get('/api/auth/logout');
    },
    login: function login(inputs) {
      return $http.post('/api/auth/login', inputs);
    },
    register: function register(inputs) {
      return $http.post('/api/auth/register', inputs);
    },
    locations: function locations() {
      return $http.get('/api/auth/locations');
    },
    check: function check() {
      return $http.get('/api/auth/check');
    },
    user: {
      email: '',
      password: '',
      loggedIn: false,
      myjournals: [],
      keywords: []
    }
  };
}]);