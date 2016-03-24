AOIApp.factory('localStorageService', function() {

  var persistedRecentDbArticles = [];
  var persistedMjArticles = [];


  persistRecentDbArticles = (articles) => {
    persistedRecentDbArticles = articles;
  };

  clearRecentDbArticles = () => {
    persistedRecentDbArticles = [];
  };

  getRecentDbArticles = () => {
    return persistedRecentDbArticles
  };

  persistMjArticles = (articles) => {
    persistedMjArticles = articles;
  }

  clearMjArticles = () => {
    persistedMjArticles = [];
  };

  getMjArticles = () => {
    return persistedMjArticles
  };



  return {
    persistRecentDbArticles: persistRecentDbArticles,
    clearRecentDbArticles: clearRecentDbArticles,
    getRecentDbArticles: getRecentDbArticles,
    persistMjArticles: persistMjArticles,
    clearMjArticles: clearMjArticles,
    getMjArticles: getMjArticles,
  };
});
