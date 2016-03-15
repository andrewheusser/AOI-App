AOIApp.factory('databaseService', ['$http',function($http) {
		return {
			get : function(searchTerm) {
				return $http.get('/api/database/' + searchTerm + '?callback=JSON_CALLBACK');
			},
			getMatch : function(searchTerm) {
				return $http.get('/api/database/match/' + searchTerm + '?callback=JSON_CALLBACK');
			},
			create : function(journalData) {
				return $http.post('/api/database/', journalData);
			},
			delete : function(id) {
				return $http.delete('/api/database/' + id);
			}
		}
	}]);
