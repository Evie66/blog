const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
    const id = req.query.id;
    let article = await Article.findOne({_id: id}).populate('author');
    let comments = await Comment.find({aid: id}).populate('uid');
    // res.send(comments);
    // return;
    // res.send('欢迎来到博客文章详情页面');
    res.render('home/article.art', {
        article: article,
        comments: comments
    });
}