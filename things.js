var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
	res.sendFile('/movies.html',{ root: __dirname + "/" })
});

router.get('/movies.html', function (req, res) {
	res.sendFile('/movies.html',{ root: __dirname + "/" })
});

router.get('/test', function(req, res, next) {
  res.json({ message: 'Hello World' });
});

module.exports = router;