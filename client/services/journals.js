angular.module('databaseService', [])

	// super simple service
	// each function returns a promise object
	.factory('Journals', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/journals');
			},
			create : function(journalData) {
				return $http.post('/api/journals', journalData);
			},
			delete : function(id) {
				return $http.delete('/api/journals/' + id);
			}
		}
	}]);
