var express = require('express');
var router = express.Router();

router.use('/', require('./blogs'));
router.use('/articles', require('./articles'));

module.exports = router;
