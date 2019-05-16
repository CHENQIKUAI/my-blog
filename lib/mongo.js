const config = require('config-lite')(__dirname)
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect(config.mongodb, { useNewUrlParser: true });

mongoose.connection.on('connected', (err, doc) => {
    console.log('mongodb connected success')
});


// users
const userSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    nickname: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
})
const userModel = mongoose.model("user", userSchema);


//posts
const postSchema = mongoose.Schema({
    id: { type: Number, unique: true, require: true },
    nickname: { type: String, required: true },
    email: { type: String, require: true },
    avatar: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    view: { type: Number, required: true },
    like: { type: Number, require: true }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

const postModel = mongoose.model('post', postSchema);


//comments
const commentSchema = mongoose.Schema({
    author: { type: Object, required: true },
    content: { type: String, required: true },
    postId: { type: String, required: true }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

const commentModel = mongoose.model('comment', commentSchema);

exports.userModel = userModel;
exports.postModel = postModel;
exports.commentModel = commentModel;