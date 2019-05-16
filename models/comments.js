const commentModel = require('../lib/mongo').commentModel;

module.exports = {
    getCommentsByPostId: (postId) => {
        return commentModel.find({ postId: postId });
    },

    removeCommentById: (_id) => {
        return commentModel.findByIdAndRemove(_id);
    },

    AddComment: (comment) => {
        const newComment = new commentModel(comment);
        return newComment.save();
    }
}