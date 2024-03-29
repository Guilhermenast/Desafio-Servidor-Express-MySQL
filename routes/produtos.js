var express = require('express');
var router = express.Router();
 
/* GET produtos listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource GET');
});
 
/* PUT produtos listing. */
router.put('/', function(req, res, next) {
    res.send('respond with a resource PUT');
  });
 
  /* POST produtos listing. */
router.post('/', function(req, res, next) {
    res.send('respond with a resource POST');
  });
 
  /* DELETE produtos listing. */
router.delete('/', function(req, res, next) {
    res.send('respond with a resource DELETE');
  });
 
module.exports = router;