// app/routes.js
module.exports = function(app, passport, mongoose) {

  var Aoi = mongoose.model('Aoi');
  var User = mongoose.model('User');

  app.get('/api/database/:search', (req, res) => {
    Aoi.find({ $text : { $search : req.params.search } }, (err, aois) =>{
      res.send(aois)
    })
  });

  app.get('/api/database/match/:search', (req, res) => {
    Aoi.find({PMID: req.params.search}, (err, aois) =>{
      res.send(aois)
    })
  });

  app.get('/api/database/recent/:num', (req, res) => {
    Aoi.find().sort({_id:-1}).limit(req.params.num).exec((err, aois) =>{
      res.send(aois)
    })
  });

  app.post('/api/database/:search', (req, res) => {
    aoi.find({ $text : { $search : req.params.search } }, (err, aois) =>{
      res.send(aois)
    })
  });


  app.post('/api/database/', function (req, res, next) {
    var aoi = new Aoi({
      Title: req.body.Title,
      Abstract: req.body.Abstract,
      Authors: req.body.Authors,
      URL: req.body.URL,
      Year: req.body.Year,
      User: req.body.User,
      PMID: req.body.PMID,
    })
    aoi.save(function (err, post) {
      if (err) { return next(err) }
      res.json(201, post)
    })
  });

  app.post('/api/database/myjournal/myjournals', function (req, res, next) {
    var query = { 'local.email': req.body.email };
    var update = {'local.myjournals': req.body.myjournals};
    var options = {new: true};

    User.findOneAndUpdate(query, update, options).exec((err, result) =>{
      res.send(result)
    });
  });

  app.post('/api/database/myjournal/keywords', function (req, res, next) {
    var query = { 'local.email': req.body.email };
    var update = {'local.keywords': req.body.keywords};
    var options = {new: true};

    User.findOneAndUpdate(query, update, options).exec((err, result) =>{
      res.send(result)
    });
  });


    // var aoi = new Aoi({
    //   Title: req.body.Title,
    //   Abstract: req.body.Abstract,
    //   Authors: req.body.Authors,
    //   URL: req.body.URL,
    //   Year: req.body.Year,
    //   User: req.body.User,
    //   PMID: req.body.PMID,
    // })
    // aoi.save(function (err, post) {
    //   if (err) { return next(err) }
    //   res.json(201, post)
    // })

  // app.get('/api/journals', (req, res) => {
  //   Aoi.find({ $text : { $search : req.params.search } }, (err, aois) =>{
  //     res.send(aois)
  //   })
  // });
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  // app.get('/', function(req, res) {
  //     res.render('index.ejs'); // load the index.ejs file
  // });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  // app.get('/login', function(req, res) {
  //     // render the page and pass in any flash data if it exists
  //     res.sendfile('./pages/login.htm');
  // });

  // process the login form
  // app.post('/login', do all our passport stuff here);

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  // app.get('/signup', function(req, res) {
  //
  //     // render the page and pass in any flash data if it exists
  //     res.render('signup.ejs', { message: req.flash('signupMessage') });
  // });

  // process the signup form
  // app.post('/signup', do all our passport stuff here);

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  // app.get('/profile', isLoggedIn, function(req, res) {
  //     res.render('profile.ejs', {
  //         user : req.user // get the user out of session and pass to template
  //     });
  // });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // process the signup form
  // app.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect : '/profile', // redirect to the secure profile section
  //   failureRedirect : '/signup', // redirect back to the signup page if there is an error
  //   failureFlash : true // allow flash messages
  // }));

  // process the login form
  // app.post('/login', passport.authenticate('local-login', {
  //   successRedirect : '/loginSuccess', // redirect to the secure profile section
  //   failureRedirect : '/loginFailure', // redirect back to the signup page if there is an error
  //   failureFlash : true, // allow flash messages
  // }));

  // app.get('/login', function(req, res) {
  //   res.redirect('/home');
  // });
  //
  // app.get('/home', function(req, res) {
  //   res.redirect('/');
  // });

  app.post('/api/auth/login',
  passport.authenticate('local-login', { failureRedirect: '/login' }),
  function(req, res) {
    // res.redirect('/home', { user : req });
    res.send(req.user);
  });

  // process the signup form
  app.post('/api/auth/register',
  passport.authenticate('local-signup', { failureRedirect: '/login' }),
    // successRedirect : '/home', // redirect to the secure profile section
    // failureRedirect : '/register', // redirect back to the signup page if there is an error
    // failureFlash : true // allow flash messages
    function(req, res) {
      // res.redirect('/home', { user : req });
      res.send(req.user);
  });


  app.get('*', function(req, res) {
    res.sendfile('./client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
  return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
