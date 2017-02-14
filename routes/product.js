var express = require('express');
var router = express.Router();
const createRequestBuilder = require('@commercetools/api-request-builder').createRequestBuilder;

const requestBuilder = createRequestBuilder(); // todo, set this in the app settings.

/* GET Product page. */
router.get('/:productId', function(req, res) {
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
    product = client.execute(request)
      .then(result => result.body.results)
      .then(apiProducts => {
        return apiProducts.map(p => {
          if (p && p.masterData && p.masterData.current ) {
            res.render('product', { title: 'Product', product: p });
          }
        });
      });

});

module.exports = router;
