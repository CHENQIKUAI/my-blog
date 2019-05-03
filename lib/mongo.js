const config = require('config-lite')(__dirname)
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect(config.mongodb, { useNewUrlParser: true });

mongoose.connection.on('connected', (err, doc) => {
    console.log('mongodb connected success')
});

// user 
const userSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    nickname: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
})

const userModel = mongoose.model("user", userSchema);



exports.userModel = userModel;
