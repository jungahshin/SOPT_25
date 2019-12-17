const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/pool');
const moment = require('moment');

//blogIdx, title, contents, writer, time, password

module.exports = {
    create: (title, contents, writer, password) => {
        return new Promise(async(resolve, reject) => {
            const insertBlogQuery = 'INSERT INTO blogs (title, contents, writer, time, password) VALUES (?, ?, ?, ?, ?)';
            const time = moment().format("YYYY-MM-DD ddd HH:mm:ss");
            const insertBlogResult = await db.queryParam_Parse(insertBlogQuery, [title, contents, writer, time, password]);
            if(insertBlogResult.length == 0){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: util.successFalse(resMessage.BLOG_CREATE_FAIL)
                });
                return;
            }
            var create_json = new Object();
            create_json.boardIdx = insertBlogResult['insertId'];
            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.BLOG_CREATE_SUCCESS, create_json)
            });
            return;
        })
    },

    read: (blogIdx) => {
        return new Promise(async(resolve, reject) => {

        })
    },

    readAll: () => {
        return new Promise(async(resolve, reject) => { 
            const getBlogQuery = 'SELECT blogIdx, title, contents, writer, time FROM blogs';
            const getBlogResult = await db.queryParam_None(getBlogQuery);
            if(getBlogResult.length == 0){
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json : util.successFalse(resMessage.BLOG_GET_FAIL)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.BLOG_GET_SUCCESS, getBlogResult )
            }); 
        });
    },

    update: (blogIdx, title, contents, writer, password) => {//boardIdx를 blogs테이블에서 찾아서 password가 같은지 확인
        return new Promise(async(resolve, reject) => {
            const getPwQuery = 'SELECT password FROM blogs WHERE blogIdx = ?';
            const getPwResult = await db.queryParam_Parse(getPwQuery,[blogIdx]);
            if(getPwResult.length == 0){
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json : util.successFalse(resMessage.DB_ERROR)
                });
                return;
            }
            if(getPwResult[0]['password'] != password){
                resolve({
                    code : statusCode.OK,
                    json : util.successFalse(resMessage.MISS_MATCH_PW)
                });
                return;
            }
            //수정 가능
            const updateBlogQuery = 'UPDATE blogs SET title = ?, contents = ?, time = ?, writer = ? WHERE blogIdx = ? AND password = ?';
            const time = moment().format("YYYY-MM-DD ddd HH:mm:ss");
            const updateBlogResult = await db.queryParam_Parse(updateBlogQuery,[title, contents, time, writer, blogIdx, password]);
            if(updateBlogResult.length == 0){
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json : util.successFalse(resMessage.BLOG_UPDATE_FAIL)
                });
                return;
            }
            resolve({
                code : statusCode.OK,
                json : util.successTrue(resMessage.BLOG_UPDATE_SUCCESS)
            });
            return;
        })
    },

    delete: (blogIdx, password) => {
        return new Promise(async(resolve, reject) => {
            const getPwQuery = 'SELECT password FROM blogs WHERE blogIdx = ?';
            const getPwResult = await db.queryParam_Parse(getPwQuery,[blogIdx]);
            if(getPwResult.length == 0){
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json : util.successFalse(resMessage.DB_ERROR)
                });
                return;
            }
            if(getPwResult[0]['password'] != password){
                resolve({
                    code : statusCode.OK,
                    json : util.successFalse(resMessage.MISS_MATCH_PW)
                });
                return;
            }
            //삭제 가능
            const deleteBlogQuery = 'DELETE FROM blogs WHERE blogIdx = ? AND password = ?';
            const deleteBlogResult = await db.queryParam_Parse(deleteBlogQuery, [blogIdx, password] );
            if(deleteBlogResult.length == 0){
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json : util.successFalse(resMessage.BLOG_DELETE_FAIL)
                });
                return;
            }
            resolve({
                code : statusCode.OK,
                json : util.successTrue(resMessage.BLOG_DELETE_SUCCESS)
            });
        })
    },
};