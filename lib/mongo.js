const config = require('config-lite')(__dirname)
const mongoose = require('mongoose');
mongoose.connect(config.mongodb);

mongoose.connection.on('connected', (err, doc) => {
    console.log('mongodb connected success')
});

// const todoSchema = mongoose.Schema({
//     id: String,
//     title: String,
//     date: String,
//     completed: Boolean
// })

// const todoModel = mongoose.model("todo", todoSchema);

// exports.todoModel = todoModel;

// user 
const userSchema = mongoose.Schema({
    email: String,
    nickname: String,
    password: String,
    avatar: String
})

const userModel = mongoose.model("user", userSchema);

exports.userModel = userModel;
