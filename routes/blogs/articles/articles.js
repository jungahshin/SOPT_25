var express = require('express');
var router = express.Router();
const util = require('../../../module/utils');
const statusCode = require('../../../module/statusCode');
const resMessage = require('../../../module/responseMessage');
const authUtil = require("../../../module/authUtils");//토큰
const articles = require('../../../model/articles');

// [GET]/blogs/${blogIdx}/articles [POST]/blogs/${blogIdx}/articles [PUT]/blogs/${blogIdx}/articles [DELETE]/blogs/${blogIdx}/articles

router.get('/', async(req, res)=>{
    

});

module.exports = router;
