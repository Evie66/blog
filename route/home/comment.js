const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
    const { content, aid, uid } = req.body;

    await Comment.create({
        content: content,
        aid: aid,
        uid: uid,
        time: new Date()
    });
    // res.send(req.body);
    res.redirect('/home/article?id=' + aid);
}