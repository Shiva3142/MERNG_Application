const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    createdAt: {
        type: String,
        default: Date().toString()
    }
})
let userdetails = mongoose.model("userdetails", userSchema);



let postSchema = mongoose.Schema({
    title:String,
    body: String,
    name: String,
    email: String,
    createdAt: {
        type: String,
        default: Date().toString()
    },
    comments: [{
        body: String,
        name: String,
        email: String,
        createdAt: String
    }],
    likes: [{
        name: String,
        email: String,
        createdAt: String
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userdetails'
    }
})

let postdetails=mongoose.model('postdetails',postSchema);



module.exports = {
    userdetails,
    postdetails
}