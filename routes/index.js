var express = require('express');
var router = express.Router();
var app = require('../app.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'node-FS', category : 'movies', data: app.videos});
});

// router.get('/', function(req, res, next) {
  // res.render('index', { title: 'node-FS', category : 'document', data: app.documents});
// });
// router.get('/movies.html', function (req, res) {
// 	res.render('/movies.html',{ root: __dirname + "/", videos:videos})
// });
// 
// router.get('/tv_shows.html', function (req, res) {
	// res.sendFile('/tv_shows.html',{ root: __dirname + "/" })
// });
// 
// 
// router.get('/nav.html', function (req, res) {
	// res.sendFile('/nav.html',{ root: __dirname + "/" })
// });
// 
// router.get('/app.js', function (req, res) {
	// res.sendFile('/app.js',{ root: __dirname + "/" })
// });

module.exports = router;
