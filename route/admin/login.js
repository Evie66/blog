const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req,res)=> {
    const { email, password } = req.body;
    if(email.trim().length == 0||password.trim().length == 0){
        return res.status(400).render('admin/error',{msg: '邮箱地址或密码错误'});
    }
    let user = await User.findOne({email});
    if(user) {
        // 将客户端传递过来的密码和用户信息中的密码进行比对
        // true 比对成功
        // false 比对失败
        let isValid = await bcrypt.compare(password, user.password);
        if(isValid) {
            req.session.username = user.username;
            req.session.role = user.role;
            req.app.locals.userInfo = user;
            if(user.role == 'admin') {
                res.redirect('/admin/user');
            }else {
            res.redirect('/home/');
            }
        }else {
            // 没有查询到用户
            return res.status(400).render('admin/error',{msg: '邮箱地址或密码错误'});
        }
    }
}