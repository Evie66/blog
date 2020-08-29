const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async (req,res)=> {
    let page = req.query.page;
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    // let result = await Article.find().populate('author');
    // res.send(result);
    // res.send('欢迎来到博客首页');
    res.render('home/default.art', {
        result: result
    });
}