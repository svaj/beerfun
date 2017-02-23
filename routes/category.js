var express = require('express');
var router = express.Router();

const createRequestBuilder = require('@commercetools/api-request-builder').createRequestBuilder;

const requestBuilder = createRequestBuilder(); // todo, set this in the app settings.
/* GET Category page. */
router.get('/:categoryId', function(req, res, next) {
  const client = req.app.get('CTClient');
  const projectKey = req.app.get('projectKey');
  const categoryUri = requestBuilder.categories
                                      .where(`slug(en="${req.params.categoryId}")`)
                                      .perPage(25)
                                      .build({ projectKey: projectKey });


    const request = {
      uri: categoryUri,
      method: "GET"
    }
    client.execute(request)
      .then(result => result.body.results)
      .then(cats => {
        if (cats.length) {
          const cat = cats[0];
          const productUri = requestBuilder.products
                                           .where(`masterData(current(categories(id="${cat.id}")))`)
                                           .sort('lastModifiedAt', false)
                                           .perPage(15)
                                           .build({ projectKey: projectKey });
          const prodRequest = { uri:productUri, method:'GET'};
          client.execute(prodRequest)
            .then(result => result.body.results)
            .then(prods => { console.log(prods); res.render('category', { title: cat.name.en, cat: cat, products: prods }); });
        } else {
          next();
        }
      })
      .catch(next);
});

module.exports = router;
