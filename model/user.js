const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0
    }
})

const User = mongoose.model('User', userSchema);

async function creatUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'yiwai',
        email: 'yiwai@163.com',
        password: pass,
        role: 'admin',
        state: 0
    }).then(() => {
        console.log('用户创建成功')
    }).catch(() => {
        console.log('用户创建失败')
    })
}

const validateUser = user => {
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合要求')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值错误')),
        state: Joi.number().valid(0, 1).required().error(new Error('角色值非法'))
    };

    return Joi.validate(user, schema);
}

module.exports = {
    User,
    validateUser
}