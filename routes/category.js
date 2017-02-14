var express = require('express');
var router = express.Router();

/* GET Category page. */
router.get('/:categoryId', function(req, res, next) {
  res.render('category', { title: 'Browse Category' });
});

module.exports = router;
