AOIApp.factory('localStorageService', function () {

  var persistedRecentDbArticles = [];
  var persistedMjArticles = [];

  persistRecentDbArticles = function persistRecentDbArticles(articles) {
    persistedRecentDbArticles = articles;
  };

  clearRecentDbArticles = function clearRecentDbArticles() {
    persistedRecentDbArticles = [];
  };

  getRecentDbArticles = function getRecentDbArticles() {
    return persistedRecentDbArticles;
  };

  persistMjArticles = function persistMjArticles(articles) {
    persistedMjArticles = articles;
  };

  clearMjArticles = function clearMjArticles() {
    persistedMjArticles = [];
  };

  getMjArticles = function getMjArticles() {
    return persistedMjArticles;
  };

  return {
    persistRecentDbArticles: persistRecentDbArticles,
    clearRecentDbArticles: clearRecentDbArticles,
    getRecentDbArticles: getRecentDbArticles,
    persistMjArticles: persistMjArticles,
    clearMjArticles: clearMjArticles,
    getMjArticles: getMjArticles
  };
});