var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res) {
  res.render('index.ejs', { title: 'www.johnsandoval.us' });
});
/* GET projects page */
router.get('/projects', function(req, res) {
  res.render('projects.ejs', { title: 'www.johnsandoval.us' });
});
/* GET clearview page */
router.get('/projects/clearview', function(req, res) {
  res.render('clearview.ejs', { title: 'www.johnsandoval.us' });
});
/* GET journey page */
router.get('/journey', function(req, res) {
  res.render('journey.ejs', { title: 'www.johnsandoval.us' });
});

module.exports = router;
