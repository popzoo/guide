// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

app.use(express.static("public"));
app.get("/", (request, response) => {//https://firepage.glitch.me/
    response.sendFile(__dirname + "/views/index.html");
});
app.get("/login", (request, response) => {//https://firepage.glitch.me/
    response.sendFile(__dirname + "/views/login.html");
});
// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
    addApiHead(response);
    let dreams = {code:1,msg:getTimeInfo()+"kiss your vagina"};
    response.json(dreams);
});
app.get("/poetry", (request, response) => {
    addApiHead(response);
    let dreams = {code:1,msg:getTimeInfo()+"江涵秋影枯万界,寒江孤舟驶星河！"};
    response.json(dreams);
});
//返回json数据时必须加此头部，返回html则勿加
function addApiHead(res) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    // 支持跨域
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
    // 控制缓存
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
}

app.use('/netlifysub', function(req, res) {
    console.info(req.url);
    var url = 'https://jiang.netlify.app';
    req.pipe(request(url)).pipe(res);
});
app.use('/ghsubfreev', function(req, res) {
    console.info(req.url);
    var url = 'https://raw.githubusercontent.com/freefq/free/master/v2';
    req.pipe(request(url)).pipe(res);
});
app.use('/ghsubfrees', function(req, res) {
    console.info(req.url);
    var url = 'https://raw.githubusercontent.com/freefq/free/master/ssr';
    req.pipe(request(url)).pipe(res);
});

// listen for requests 
const listener = app.listen(process.env.PORT||3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});

