var express = require('express');
var router = express.Router();
const util = require('../../../../module/utils');
const statusCode = require('../../../../module/statusCode');
const resMessage = require('../../../../module/responseMessage');
const authUtil = require("../../../../module/authUtils");//토큰
const comments = require('../../../../model/comments');

// [GET]/blogs/${blogIdx}/articles/${articleIdx}/comments [POST]/blogs/${blogIdx}/articles/${articleIdx}/comments 
// [PUT]/blogs/${blogIdx}/articles/${articleIdx}/comments [DELETE]/blogs/${blogIdx}/articles/${articleIdx}/comments

router.get('/', async(req, res)=>{
    

});

module.exports = router;
