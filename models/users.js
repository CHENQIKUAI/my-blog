const userModel = require('../lib/mongo').userModel

module.exports = {
    // 注册一个用户
    create: (user) => {
        const newUesr = new userModel(user);
        return newUesr.save();
    },

    // // 通过用户名获取用户信息
    // getUserByName: function getUserByName(name) {
    //     return User
    //         .findOne({ name: name })
    //         .addCreatedAt()
    //         .exec()
    // }
}
