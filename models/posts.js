const postModel = require('../lib/mongo').postModel

module.exports = {

    create: (post) => {
        const newPost = new postModel(post);
        return newPost.save();
    },

    getAll: () => {
        return postModel.find();
    },

    getPostById: async (id) => {
        const result = await postModel.updateOne({ id: id }, { $inc: { view: 1 } });
        return postModel.find({ id: id })
    },

    like: (id) => {
        postModel.updateOne({ id: id }, { $inc: { like: 1, view: -1 } }).exec();
    }
}


