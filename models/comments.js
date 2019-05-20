const commentModel = require('../lib/mongo').commentModel;
const postModel = require('../lib/mongo').postModel

module.exports = {
    getCommentsByPostId: (postId) => {
        return commentModel.find({ postId: postId });
    },

    removeCommentById: (_id) => {
        return commentModel.findByIdAndRemove(_id);
    },

    AddComment: (comment) => {
        postModel.updateOne({ id: comment.postId }, { $inc: { view: -1 } }).exec();
        const newComment = new commentModel(comment);
        return newComment.save();
    }
}