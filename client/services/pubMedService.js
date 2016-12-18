var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

AOIApp.factory('pubMedService', ['$resource', '$http', function ($resource, $http) {

  var search = "";

  searchArticles = $resource("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi");
  searchIds = $resource("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi");

  getIds = function getIds(search) {
    return searchIds.get({
      db: "pubmed",
      retmode: "json",
      term: search,
      retmax: "1000"
    }).$promise.then(function (data) {
      return data.esearchresult.idlist;
    });
  };

  getArticles = function getArticles(ids) {
    return searchArticles.get({
      db: "pubmed",
      retmode: "json",
      id: ids.join() }).$promise.then(function (data) {
      return data.result;
    });
  };

  getAbstracts = function getAbstracts(ids) {
    return $http({
      method: 'GET',
      url: 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi',
      timeout: 10000,
      params: {
        db: "pubmed",
        retmode: "xml",
        rettype: "abstract",
        id: ids
      },
      transformResponse: function transformResponse(data) {
        var x2js = new X2JS();
        var data = x2js.xml_str2json(data);
        return data;
      }
    }).then(function (result) {
      return result;
    }, function (err) {
      console.log(err);
      return err;
    });
  };

  searchResults = function searchResults(ids) {
    return new Promise(function (res, rej) {
      getAbstracts(ids)
      // getArticles(ids)
      .then(function (data) {
        if (data.status === 400) {
          res("Not Found");
        } else {
          articles = formatArticles(data);
          res(articles);
        };
      }, function (err) {
        rej(err);
      });
    });
  };

  Article = function Article() {
    this.title = '';
    this.year = '';
    this.PMID = '';
    this.authorsFormatted = '';
    this.abstract = 'TEST';
    this.source = '';
  };

  formatArticles = function formatArticles(data) {
    articlesArray = [];
    // article = {};
    data = data.data.PubmedArticleSet.PubmedArticle;
    data.forEach(function (article) {
      articleObj = new Article();
      articleObj.title = article.MedlineCitation.Article.ArticleTitle;
      articleObj.authorsFormatted = formatAuthors(article);
      articleObj.year = formatDate(article);
      articleObj.PMID = article.MedlineCitation.PMID.__text;
      articleObj.source = article.MedlineCitation.Article.Journal.ISOAbbreviation;
      articleObj.abstract = formatAbstract(article);
      articlesArray.push(articleObj);
    });
    return articlesArray;
  };

  formatDate = function formatDate(article) {
    var date = article.PubmedData.History.PubMedPubDate;
    if (date.constructor === Array) {
      return date[0].Year;
    } else {
      return date.Year;
    }
  };

  formatAbstract = function formatAbstract(article) {
    if (!article.MedlineCitation.Article.hasOwnProperty('Abstract')) {
      return 'No Abstract Found';
    } else if (article.MedlineCitation.Article.Abstract.AbstractText.constructor === Array) {
      return article.MedlineCitation.Article.Abstract.AbstractText[0].__text;
    } else if (_typeof(article.MedlineCitation.Article.Abstract.AbstractText) === 'object') {
      return article.MedlineCitation.Article.Abstract.AbstractText.__text;
    } else {
      return article.MedlineCitation.Article.Abstract.AbstractText;
    }
  };

  formatAuthors = function formatAuthors(article) {
    if (!article.MedlineCitation.Article.hasOwnProperty('AuthorList')) {
      return "No Authors Found";
    } else {
      authors = article.MedlineCitation.Article.AuthorList.Author;
      if (authors.constructor === Array) {
        authorList = [];
        authors.forEach(function (author) {
          authorList.push(author.LastName + ' ' + author.Initials);
        });
        return authorList.join(', ');
      } else if (authors.constructor === Object) {
        return authors.LastName + ' ' + authors.Initials;
      }
    }
  };

  formatYear = function formatYear(article) {
    return article.pubdate.split(' ')[0];
  };

  loadMore = function loadMore(articles) {
    return new Promise(function (res, rej) {
      moreIds = articles.searchResults.slice(articles.loaded + 1, articles.loaded + 1 + articles.numload);
      getAbstracts(moreIds).then(function (data) {
        formattedNewArticles = formatArticles(data);
        formattedNewArticles.forEach(function (newArticle) {
          articles.push(newArticle);
        });
        articles.loaded = articles.loaded + articles.numload;
        res(articles);
      }, function (err) {
        console.log("Couldn't get articles!");
      });
    });
  };

  return {
    search: search,
    getIds: getIds,
    searchResults: searchResults,
    loadMore: loadMore
  };
}]);