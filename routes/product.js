var express = require('express');
var router = express.Router();

/* GET Product page. */
router.get('/:productId', function(req, res) {
  res.render('product', { title: 'Product' });
});

module.exports = router;
