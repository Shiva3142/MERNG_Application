const {
    validateRegisterInput
} = require('../utils/validate.js')
const {
    checkAuth
} = require('../utils/auth-check.js')

const {
    UserInputError,
    AuthenticationError
} = require('apollo-server-express')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {PrismaClient}=require('@prisma/client')
const {SECRET_KEY}=require('../config.js')

let prismaClient=new PrismaClient()

let resolvers = {
    Query: {
        hello: () => {
            return "Welcome To This App"
        },
        getUserDetails: async () => {
            try {
                let users = await prismaClient.userdetails.findMany()
                return users
            } catch (error) {
                console.log(error);
            }
        },
        getPostDetails: async () => {
            try {
                let posts=await prismaClient.postdetails.findMany({
                    include:{
                        comments:true,
                        likes:true
                    }
                })
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
                let post=await prismaClient.postdetails.findUnique({
                    where:{
                        id:object.id
                    },
                    include:{
                        comments:true,
                        likes:true
                    }
                })
                if (!post) {
                    throw new UserInputError("Post Not Found")
                } else {
                    return post
                }
            } catch (error) {
                console.log(error);
                throw new UserInputError("Post Not Found")
            }
        },
        getUserPosts: async (parent, object,context) => {
            let user = await checkAuth(context)
            try {
                let post=await prismaClient.postdetails.findMany({
                    where:{
                        email:object.email
                    },
                    include:{
                        comments:true,
                        likes:true
                    }
                })
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
                let alreadySearch=await prismaClient.userdetails.findMany({
                    where:{
                    email: email.toLowerCase().trim()
                    }
                })
                // console.log(alreadySearch);
                if (alreadySearch.length > 0) {
                    throw new UserInputError("User already exists", {
                        errors: {
                            email: "email is already exists"
                        }
                    })
                } else {
                    let hash = await bcrypt.hash(password.trim(), 12);
                    let new_user=await prismaClient.userdetails.create({
                        data:{
                            name: name.toLowerCase().trim(),
                            email: email.toLowerCase().trim(),
                            password: hash,
                        }
                    })
                    // console.log(new_user);
                    const token = jwt.sign({
                        id: new_user.id,
                        email: new_user.email,
                        name: new_user.name,
                    }, SECRET_KEY, {
                        expiresIn: "1 Hour"
                    })
                    return {
                        ...new_user,
                        id: new_user.id,
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
            let userExists=await prismaClient.userdetails.findMany({
                where:{
                email: email.toLowerCase().trim()
                }
            })
            // console.log(userExists);
            
            if (userExists && userExists.length===1) {
                let user=userExists[0]
                let passwordValidate = await bcrypt.compare(password, user.password)
                if (!passwordValidate) {
                    throw new UserInputError("Invalid Credentials",{
                        errors:{
                            authentication:"Invalid Credentials"
                        }
                    })
                } else {
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    }, SECRET_KEY, {
                        expiresIn: "1 Hour"
                    })
                    return {
                        ...user,
                        id: user.id,
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
            let {
                title,body
            } = object
            let user = await checkAuth(context)
            let post=await prismaClient.postdetails.create({
                data:{
                    body,
                    title,
                    email: user.email,
                    name: user.name
                }
            })
            return result
        },
        deletePost: async (parent, object, context) => {
            let {
                id
            } = object
            let user = await checkAuth(context)
            try {
                let post = await prismaClient.postdetails.findUnique({
                    where:{
                        id:id
                    }
                })
                // console.log(post);
                if (post.email === user.email) {
                    let deletedLike=await prismaClient.likes.deleteMany({
                        where:{
                            postId:id
                        }
                    })
                    let deletedComment=await prismaClient.comments.deleteMany({
                        where:{
                            postId:id
                        }
                    })
                    let deletedPost=await prismaClient.postdetails.deleteMany({
                        where:{
                            id:id
                        }
                    })
                    // console.log(deletedPost);
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
            let {
                id,
                body
            } = object
            let user = await checkAuth(context)
            if (body.trim() !== "" ) {
                try {
                    let comment=await prismaClient.comments.create({
                        data:{
                            body,
                            email: user.email,
                            name: user.name,
                            postId:id
                        }
                    })
                    if (comment) {
                        return comment
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
            let {
                commentId
            } = object
            let user = await checkAuth(context)
            try {
                let comment = await prismaClient.comments.findUnique({
                    where:{
                        id:commentId
                    }
                })
                if (comment.email === user.email) {
                    
                    let deletedComment=await prismaClient.comments.delete({
                        where:{
                            id:commentId
                        }
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
        likePost: async (parent, object, context) => {
            let {
                id
            } = object
            let user = await checkAuth(context)
            try {
                let post = await prismaClient.postdetails.findMany({
                    where:{
                        id:id
                    }
                })
                // console.log(post);
                if (post && post.length!==0) {
                    let likes = await prismaClient.likes.findMany({
                        where:{
                                email:user.email,
                                postId:id
                        }
                    })
                    // console.log(likes);
                    if (likes.length===0) {
                        let createdPost=await prismaClient.likes.create({
                            data:{
                                name:user.name,
                                email :user.email,
                                postId:id
                            }
                        })
                        // console.log("created");
                        // console.log(createdPost);
                    } else{
                        let deletedPost=await prismaClient.likes.delete({
                            where:{
                                id:likes[0].id
                            }
                        })
                        // console.log("deleted");
                        // console.log(deletedPost);
                    }
                    let newpost = await prismaClient.postdetails.findUnique({
                        where:{
                            id:id
                        },
                        include:{
                            comments:true,
                            likes:true
                        }
                    })
                    // console.log(newpost);
                    return newpost
                    
                } else {
                    throw new UserInputError("Post not found")
                    
                }
            } catch (error) {
                console.log(error);
                throw new Error(error)
            }
        }
    }
}



module.exports={resolvers}