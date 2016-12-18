angular.module('AOIApp').factory('databaseService', ['$http', function ($http) {
	return {

		// routes for dealing with articles
		get: function get(searchTerm) {
			return $http.get('/api/database/' + searchTerm + '?callback=JSON_CALLBACK');
		},
		getRecent: function getRecent(num) {
			return $http.get('/api/database/recent/' + num + '?callback=JSON_CALLBACK');
		},
		getAll: function getAll(num) {
			return $http.get('/api/database/all/' + num + '?callback=JSON_CALLBACK');
		},
		getMatch: function getMatch(searchTerm) {
			return $http.get('/api/database/match/' + searchTerm + '?callback=JSON_CALLBACK');
		},
		create: function create(journalData) {
			return $http.post('/api/database/', journalData);
		},
		delete: function _delete(id) {
			return $http.delete('/api/database/' + id);
		},

		// routes for dealing with myjournals and keywords
		updateMyJournals: function updateMyJournals(journalData) {
			return $http.post('/api/database/myjournal/myjournals', journalData);
		},
		updateMyKeywords: function updateMyKeywords(keywordData) {
			return $http.post('/api/database/myjournal/keywords', keywordData);
		}
	};
}]);