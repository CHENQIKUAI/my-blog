const userModel = require('../lib/mongo').userModel

module.exports = {
    // 注册一个用户
    create: (user) => {
        const newUesr = new userModel(user);
        return newUesr.save();
    },

    // 通过邮件获取用户信息
    getUserByMsg: (emailAndPassword) => {
        return userModel.find(emailAndPassword);
    }
}
