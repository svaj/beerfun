var express = require('express');
var router = express.Router();
const createRequestBuilder = require('@commercetools/api-request-builder').createRequestBuilder;

const requestBuilder = createRequestBuilder(); // todo, set this in the app settings.

/* GET Product page. */
router.get('/:productId', function(req, res, next) {
  const client = req.app.get('CTClient');
  const projectKey = req.app.get('projectKey')
  console.log(req.params.productId);
  const productUri = requestBuilder.products
                                      .where(`masterData(current(slug(en="${req.params.productId}")))`)
                                      .sort('lastModifiedAt', false)
                                      .perPage(15)
                                      .build({ projectKey: projectKey })

    const request = {
      uri: productUri,
      method: "GET"
    }
    client.execute(request)
      .then(result => result.body.results)
      .then(apiProducts => {
        if (apiProducts.length) {
          p = apiProducts[0];
          res.render('product', { title: 'Product', product: p });
        } else {
          next();
        }
      })
      .catch(next);

});

module.exports = router;
