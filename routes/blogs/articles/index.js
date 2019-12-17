var express = require('express');
var router = express.Router();

router.use('/', require('./articles'));
router.use('/:articleIdx/comments', require('./comments'));

module.exports = router;
