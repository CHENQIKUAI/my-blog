const postModel = require('../lib/mongo').postModel

module.exports = {
    // 发布一篇文章
    create: (post) => {
        const newPost = new postModel(post);
        return newPost.save();
    },

    getAll: () => {
        return postModel.find();
    }
    // // 通过邮件获取用户信息
    // getUserByMsg: (emailAndPassword) => {
    //     return userModel.find(emailAndPassword);
    // }
}
