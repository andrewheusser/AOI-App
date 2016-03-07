
AOIApp.factory('databaseService', ['$http',function($http) {
		return {
			get : function(searchTerm) {
				return $http.get('/api/db/' + searchTerm + '?callback=JSON_CALLBACK');
			},
			create : function(journalData) {
				return $http.post('/api/journals', journalData);
			},
			delete : function(id) {
				return $http.delete('/api/journals/' + id);
			}
		}
	}]);
