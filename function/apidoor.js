'use strict';
const request = require("request");
// exports.main_handler = (event,context,callbk)=>{
exports.handler = async function(event, context) {
    // exports.main_handler = function(event, context, callbk) {
    // console.info(event.queryString);
    // let path = event.path.replace('/tlstransfer', '');
    let path = event.path;
    let auth = '?auth=' + event.queryString.auth;
    let label = '&label=' + event.queryString.label;
    let type = '&type=' + event.queryString.type;
    let word = '&word=' + event.queryString.word;
    // let serverUrl = process.env.serverUrl;
    let serverUrl = 'http://47.93.190.201';
    serverUrl = serverUrl + path + auth + label + type + word;
    // event.headers['x-real-ip'] = event.requestContext.sourceIp;
    console.info(event.path);
    console.info(event.headers);
    request({
        url: encodeURI(serverUrl),
        method: "GET",
        gzip: true,
        headers: event.headers,
        timeout: 10000
    }, function(error, response, body) {
        if (!error && response.statusCode == 200 && body != undefined) {
            try {
                // callbk(null, JSON.parse(body)); //JSON.parse(body) ========这里响应无法返回头部的缓存设置
                // let json = JSON.parse(body);
                // callbk(null, JSON.stringify(fireArr));//函数结束
                // callbk(null, ['666']); //函数结束
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: "Hello World"
                    }),
                };
            } catch (e) {
                console.error("JSON解析数据失败", e);
                return {
                    statusCode: 502,
                    body: JSON.stringify({
                        message: "JSON解析数据失败"
                    }),
                };
            }
        } else {
            console.error("获取数据失败", error);
            return {
                statusCode: 503,
                body: JSON.stringify({
                    message: "获取数据失败"
                }),
            };
        }
    });
};