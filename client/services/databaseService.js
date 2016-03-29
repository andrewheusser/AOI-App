angular.module('AOIApp')
	.factory('databaseService', ['$http', function($http) {
		return {

			// routes for dealing with articles
			get : function(searchTerm) {
				return $http.get('/api/database/' + searchTerm + '?callback=JSON_CALLBACK');
			},
			getRecent : function(num) {
				return $http.get('/api/database/recent/' + num + '?callback=JSON_CALLBACK');
			},
			getAll : function(num) {
				return $http.get('/api/database/all/' + num + '?callback=JSON_CALLBACK');
			},
			getMatch : function(searchTerm) {
				return $http.get('/api/database/match/' + searchTerm + '?callback=JSON_CALLBACK');
			},
			create : function(journalData) {
				return $http.post('/api/database/', journalData);
			},
			delete : function(id) {
				return $http.delete('/api/database/' + id);
			},

			// routes for dealing with myjournals and keywords
			updateMyJournals : function(journalData) {
				return $http.post('/api/database/myjournal/myjournals', journalData);
			},
			updateMyKeywords : function(keywordData) {
				return $http.post('/api/database/myjournal/keywords', keywordData);
			},
		}
	}]);
