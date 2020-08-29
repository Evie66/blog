const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const template = require('art-template');
const morgan = require('morgan');
const config = require('config');
const dateFormat = require('dateformat');
const app = express();
const path = require('path');

require('./model/connect');
require('./model/user');

// 处理post请求参数
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret key',
    // 设置cookie到期时间
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 模板引擎设置
app.engine('art',require('express-art-template'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','art');

// 向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

// 静态资源访问
app.use(express.static(path.join(__dirname,'public')));

console.log(config.get('title'));

if(process.env.NODE_ENV == 'development') {
    console.log('开发环境');
    app.use(morgan('dev'));
}else {
    console.log('生产环境');
}

const home = require('./route/home');
const admin = require('./route/admin');

// 拦截请求 判断用户登录状态
app.use('/admin',require('./middleware/loginGuard'));

app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
    const result = JSON.parse(err);
    let params = [];
    for(let attr in result) {
        if(attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

app.listen(3000);
console.log('服务器启动成功');