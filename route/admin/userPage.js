const { User } = require('../../model/user');

module.exports = async (req,res)=> {
    req.app.locals.currentLink = 'user';
    let page = req.query.page || 1;
    // 每一页显示数据的条数
    let pageSize = 1;
    // 查询用户的总数
    let count = await User.countDocuments({});
    // 总页数
    let total = Math.ceil(count / pageSize);
    // 页码对应开始的查询位置
    let start = (page - 1) * pageSize;

    let users = await User.find({}).limit(pageSize).skip(start);
    res.render('admin/user',{
        users: users,
        page: page,
        total: total,
        count: count
    });
    res.send(users);
}