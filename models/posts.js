const postModel = require('../lib/mongo').postModel

module.exports = {

    create: (post) => {
        const newPost = new postModel(post);
        return newPost.save();
    },

    getAll: () => {
        return postModel.find().sort({'_id':-1});
    },

    getPostById: async (id) => {
        return postModel.find({ id: id })
    },

    viewPlus: (id) => {
        postModel.updateOne({ id: id }, { $inc: { view: 1 } }).exec();
    },

    like: (id) => {
        postModel.updateOne({ id: id }, { $inc: { like: 1, view: -1 } }).exec();
    },

    modifyPost: (id, title, content) => {
        postModel.updateOne({ id: id }, { title: title, content: content }).exec();
    },

    deletePost: (id) => {
        return postModel.remove({id: id});
    }
}


