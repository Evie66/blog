// 引入mongoose模块
const mongoose = require('mongoose');

// 创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: [true, '请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请填写作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
});
// 根据集合创建规则
const Article = mongoose.model('Article', articleSchema);

// Article.create({
//     title: '测试文章',
//     // author: 'yiwai',
//     content: '测试文章'
// }).then(() => {
//     console.log('文章创建成功');
// }).catch(() => {
//     console.log('文章创建失败');
// })
// Article.save()
// 将集合规则作为模块成员进行导出
module.exports = {
    Article
}