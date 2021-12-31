const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    ApolloServer,
    UserInputError,
    AuthenticationError
} = require('apollo-server-express')

const {
    userdetails,
    postdetails
} = require('./Models/databaseModels.js')
const {
    typeDefs
} = require('./GraphQL/typeDefs.js')
// const {resolvers}=require('./GraphQL/resolvers.js')
const {
    validateRegisterInput
} = require('./utils/validate.js')

let app = express()
app.use(express.urlencoded())
app.use(express.json())


dotenv.config({
    path: "./config.env"
})
const Database = process.env.DATABASE
const SECRET_KEY = process.env.SECRET_KEY
let port = process.env.PORT || 80

mongoose.connect(Database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

db = mongoose.connection;
db.once("open", () => {
    console.log("connected to database");
});


async function checkAuth(context) {
    console.log(context.req.headers.authorization);
    let authHeader = context.req.headers.authorization;
    if (authHeader) {
        try {
            let user = jwt.verify(authHeader, SECRET_KEY);
            console.log(user);
            return user
        } catch (error) {
            console.log(error);
            throw new AuthenticationError('Invalid/Expired Tocken',{errors:{
                token:"Please Login First"
            }
            })
        }
    }
    throw new AuthenticationError('Authentication Header Must be provided',{
        errors:{
            header:"Please Login First"
        }
    })
}











let resolvers = {
    Query: {
        hello: () => {
            console.log("Welcome To This App");
            return "Welcome To This App"
        },
        getUserDetails: async () => {
            try {
                let users = await userdetails.find()
                return users
            } catch (error) {
                console.log(error);
            }
        },
        getPostDetails: async () => {
            try {
                let posts = await postdetails.find().sort({_id:-1});
                if (!posts) {
                    throw new UserInputError("Post Not Found")
                } else {
                    return posts
                }
            } catch (error) {
                console.log(error);
                throw new UserInputError("Post Not Found")
            }
        },
        getPostdetail: async (parent, object) => {
            try {
                let post = await postdetails.findById(object.id);
                if (!post) {
                    throw new UserInputError("Post Not Found")
                } else {
                    return post
                }
            } catch (error) {
                console.log(error);
                throw new UserInputError("Post Not Found")
            }
        }
    },
    postdetail:{
        likeCount:(parent)=>{
            return parent.likes.length
        },
        commentCount:(parent)=>{
            return parent.comments.length
        }
    },
    Mutation: {
        registerUser: async (parent, object) => {
            let {
                name,
                email,
                password
            } = object
            let {
                errors,
                valid
            } = validateRegisterInput(name, email, password)
            if (!valid) {
                throw new UserInputError("input error", errors)
            } else {
                let alreadySearch = await userdetails.find({
                    email: email.toLowerCase().trim()
                })
                console.log(alreadySearch);
                if (alreadySearch.length > 0) {
                    throw new UserInputError("User already exists", {
                        errors: {
                            email: "email is already exists"
                        }
                    })
                } else {
                    // console.log(object);
                    let hash = await bcrypt.hash(password.trim(), 12);
                    let new_user = new userdetails({
                        name: name.toLowerCase().trim(),
                        email: email.toLowerCase().trim(),
                        password: hash,
                    })
                    let result = await new_user.save()
                    const token = jwt.sign({
                        id: result._id,
                        email: result.email,
                        name: result.name,
                    }, SECRET_KEY, {
                        expiresIn: "1 Hour"
                    })
                    return {
                        ...result._doc,
                        id: result._id,
                        token: token
                    }
                }
            }
        },
        loginUser: async (parent, object) => {
            let {
                email,
                password
            } = object
            let userExists = await userdetails.findOne({
                email: email.toLowerCase().trim()
            })
            console.log(userExists);
            if (userExists) {
                let passwordValidate = await bcrypt.compare(password, userExists.password)
                console.log(passwordValidate);
                if (!passwordValidate) {
                    throw new UserInputError("Invalid Credentials",{
                        errors:{
                            authentication:"Invalid Credentials"
                        }
                    })
                } else {
                    console.log("Login Successfull");
                    console.log(userExists.name);
                    const token = jwt.sign({
                        id: userExists._id,
                        email: userExists.email,
                        name: userExists.name,
                    }, SECRET_KEY, {
                        expiresIn: "1 Hour"
                    })
                    console.log(token);
                    return {
                        ...userExists._doc,
                        id: userExists._id,
                        token: token
                    }
                }
            } else {
                throw new UserInputError("Invalid Credentials",{
                    errors:{
                        authentication:"Invalid Credentials"
                    }
                })
            }
        },
        createPost: async (parent, object, context) => {
            // console.log(context);
            let {
                title,body
            } = object
            let user = await checkAuth(context)
            console.log(user);
            let post = new postdetails({
                body,
                title,
                email: user.email,
                name: user.name,
            })
            console.log(post);
            let result = await post.save()
            console.log(result);
            return result
        },
        deletePost: async (parent, object, context) => {
            // console.log(context);
            let {
                id
            } = object
            let user = await checkAuth(context)
            console.log(user);
            try {
                let post = await postdetails.findById(id)
                console.log(post);
                if (post.email === user.email) {
                    await postdetails.deleteOne({
                        _id: post._id
                    })
                    return true
                } else {
                    throw new AuthenticationError("Deletion is not allowed")
                }
            } catch (error) {
                console.log(error);
                throw new Error(error)
            }
        },
        createComment: async (parent, object, context) => {
            // console.log(context);
            let {
                id,
                body
            } = object
            let user = await checkAuth(context)
            console.log(user);
            if (body.trim() != "" && id.trim() != "") {
                try {
                    let post = await postdetails.findById(id)
                    console.log(post);
                    if (post) {
                        post.comments.unshift({
                            body,
                            email: user.email,
                            name: user.name,
                            createdAt: Date().toString()
                        })
                        await post.save()
                        return post
                    } else {
                        throw new UserInputError("Post not Found")
                    }
                } catch (error) {
                    console.log(error);
                    throw new Error(error)
                }
            } else {
                throw new UserInputError("Please Fill value of id and comment body")
            }
        },
        deleteComment: async (parent, object, context) => {
            // console.log(context);
            let {
                postId,
                commentId
            } = object
            let user = await checkAuth(context)
            console.log(user);
            try {
                let post = await postdetails.findById(postId)
                console.log(post.comments);
                let commentIndex = post.comments.findIndex(element => element._id == commentId)
                console.log(commentIndex);
                if (post.comments[commentIndex].email === user.email) {
                    post.comments.splice(commentIndex, 1)
                    await post.save()
                    return true
                } else {
                    throw new AuthenticationError("Deletion is not allowed")
                }
            } catch (error) {
                console.log(error);
                throw new Error(error)
            }
        },
        likePost: async (parent, object, context) => {
            let {
                id
            } = object
            let user = await checkAuth(context)
            console.log(user);
            try {
                let post = await postdetails.findById(id)
                console.log(post);
                if (post) {
                    if (post.likes.find(like => like.email === user.email)) {
                        post.likes = post.likes.filter(like => like.email !== user.email)
                    } else {
                        post.likes.push({
                            name: user.name,
                            email: user.email,
                            createdAt: Date().toString()
                        })
                    }
                } 
                await post.save()
                return post
            } catch (error) {
                console.log(error);
                throw new Error(error)
            }
        }
    }
}


async function StartServer() {
    let apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({
            req
        }) => {
            return {
                req
            }
        }
    })
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app: app
    });
}
StartServer()

app.listen(port, () => {
    console.log(`SERVER is Running  at http://127.0.0.1:${port}`);
})