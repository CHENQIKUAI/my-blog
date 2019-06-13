const post = require('./posts');
const comment = require('./comments');

module.exports = {
    sortByComments: async () => {
        let posts = await post.getAll();
        for (let index = 0; index < posts.length; ++index) {
            const postsForComments = await comment.getCommentsByPostId(posts[index].id);
            const len = postsForComments.length;
            posts[index].countComments = len;
        }
        posts.sort((a, b) => {
            return b.countComments - a.countComments;
        })
        return posts.splice(0, 5);
    },
    

    sortByLikes: async () => {
        let posts = await post.getAll();
        posts.sort((a, b) => {
            return b.like - a.like;
        });
        return posts.splice(0, 5);
    },

    sortByViews: async () => {
        let posts = await post.getAll();
        posts.sort((a, b) => {
            return b.view - a.view;
        })
        return posts.splice(0, 5);
    }
}
