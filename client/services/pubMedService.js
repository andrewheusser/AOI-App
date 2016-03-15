AOIApp.factory('pubMedService', ['$resource', '$http', function($resource, $http) {

  var search = "Davachi L";

  searchArticles = $resource("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi");
  searchIds = $resource("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi");

  getIds = (search) => {
    return searchIds.get(
      {
        db: "pubmed",
        retmode: "json",
        term: search,
        retmax: "1000"
      }).$promise.then((data)=>{return data.esearchresult.idlist})
    };

    getArticles = (ids) => {
      return searchArticles.get({
        db: "pubmed",
        retmode: "json",
        id: ids.join()}).$promise.then((data)=>{return data.result})
      };

      getAbstracts = (ids) => $http({
        method  : 'GET',
        url     : 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi',
        timeout : 10000,
        params  : {
          db: "pubmed",
          retmode: "xml",
          rettype: "abstract",
          id: ids
        },
        transformResponse : function(data) {
          var x2js = new X2JS();
          var data = x2js.xml_str2json( data );
          return data
        }
      })
      .then((result)=>{
        return result
      }, (err)=>{
        console.log("Couldn't get articles!")
        return err
      });

      searchResults = (ids) => {
        return new Promise((res,rej)=>{
          getAbstracts(ids)
          // getArticles(ids)
          .then((data)=>{
            articles = formatArticles(data)
            res(articles)
          }, (err) => {
            console.log("Couldn't get articles!")
          })
        })
      };

      Article = function(){
        this.title = '';
        this.year = '';
        this.PMID = '';
        this.authorsFormatted = '';
        this.abstract = 'TEST';
        this.source = '';
      }

      formatArticles = (data) => {
        articlesArray = [];
        // article = {};
        data = data.data.PubmedArticleSet.PubmedArticle;
        data.forEach((article)=>{
          articleObj = new Article();
          articleObj.title = article.MedlineCitation.Article.ArticleTitle;
          articleObj.authorsFormatted = formatAuthors(article.MedlineCitation.Article.AuthorList.Author);
          articleObj.year = article.PubmedData.History.PubMedPubDate[0].Year;
          articleObj.PMID=article.MedlineCitation.PMID.__text;
          articleObj.source = article.MedlineCitation.Article.Journal.ISOAbbreviation;
          articleObj.abstract = formatAbstract(article);
          articlesArray.push(articleObj);
        });
        return articlesArray
      };

      formatAbstract = (article) => {
         if (typeof article.MedlineCitation.Article.Abstract === 'undefined'){
          return 'No Abstract Found'
        } else if (typeof article.MedlineCitation.Article.Abstract.AbstractText === 'object'){
           return article.MedlineCitation.Article.Abstract.AbstractText.__text;
        } else {
          return article.MedlineCitation.Article.Abstract.AbstractText
        }
      };

      formatAuthors = (authors) => {
        if(authors.constructor === Array) {
          authorList=[];
          authors.forEach((author)=>{
            authorList.push(author.LastName + ' ' + author.Initials)
          });
          return authorList.join(', ')
        } else if(authors.constructor === Object){
          return authors.LastName + ' ' + authors.Initials
        }
      };

      formatYear = (article) => {
        return article.pubdate.split(' ')[0];
      };

      loadMore = (articles) => {
        return new Promise((res,rej)=>{
          moreIds = articles.searchResults.slice(articles.loaded+1,articles.loaded+1+articles.numload);
          getAbstracts(moreIds)
          .then((data)=>{
            formattedNewArticles = formatArticles(data);
            formattedNewArticles.forEach((newArticle)=>{
              articles.push(newArticle)
            });
            articles.loaded=articles.loaded+articles.numload;
            res(articles)
          }, (err) => {
            console.log("Couldn't get articles!")
          })
        })
      }

      return {
        search: search,
        getIds: getIds,
        searchResults: searchResults,
        loadMore: loadMore,
      }

    }]);
