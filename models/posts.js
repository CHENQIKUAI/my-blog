const postModel = require('../lib/mongo').postModel

module.exports = {
    // 发布一篇文章
    create: (post) => {
        const newPost = new postModel(post);
        return newPost.save();
    },

    getAll: () => {
        return postModel.find();
    },

    getPostById: async (id, res) => {
        const result = await postModel.updateOne({ id: id }, { $inc: { view: 1 } });

        postModel.find({ id: id }).then((result) => {
            res.render('post', { post: result[0] })
        }).catch((err) => {
        });;

    }
}


