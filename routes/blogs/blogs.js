var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
// const authUtil = require("../../module/authUtils");//토큰
const blogs = require('../../model/blogs');

// [GET]/blogs [POST]/blogs [PUT]/blogs [DELETE]/blogs

router.get('/', async(req, res)=>{//[GET]/blogs
    try{
        blogs.readAll()
        .then(({code, json}) => {
            res.status(code).send(json);
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
        })
    }catch(err){
        console.log(err);
    }
});

router.post('/', async(req, res)=>{//[POST]/blogs
    const {title, contents, writer, password} = req.body;
    try{
        if(!title || !contents || !writer || !password){
            res.status(statusCode.BAD_REQUEST).send(util.successFalse(resMessage.NULL_VALUE));
            return;
        }
        blogs.create(title, contents, writer, password)
        .then(({code, json})=> {
            res.status(code).send(json);
        })
        .catch(err =>{
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
        })
    }catch(err){
        console.log(err);
    }
});


router.put('/', async(req, res)=>{//[PUT]/blogs
    const {blogIdx, title, contents, writer, password} = req.body;
    try{
        if(!blogIdx || !password){
            res.status(statusCode.BAD_REQUEST).send(util.successFalse(resMessage.NULL_VALUE));
            return;
        }
        blogs.update(blogIdx, title, contents, writer, password)
        .then(({code, json}) =>{
            res.status(code).send(json);
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
        })
    }catch(err){
        console.log(err);
    }
});

router.delete('/', async(req, res)=>{//[DELETE]/blogs
    const {blogIdx, password} = req.body;
    try{
        if(!blogIdx || !password){
            res.status(statusCode.BAD_REQUEST).send(util.successFalse(resMessage.NULL_VALUE));
            return;
        }
        blogs.delete(blogIdx, password)
        .then(({code, json}) => {
            res.status(code).send(json);
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
        })
    }catch(err){
        console.log(err);
    }
});


module.exports = router;
