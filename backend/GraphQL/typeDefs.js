const {
    gql
} = require('apollo-server-express')

let typeDefs = gql `
    type userdetail{
        id:ID!
        name:String
        email:String
        password:String
        createdAt:String
        token:String
    }
    type postdetail{
        id:ID!
        title:String
        body:String
        createdAt:String,
        name:String
        email:String
        comments:[comment]
        likes:[like]
        likeCount:Int
        commentCount:Int
    }
    type comment{
        id:ID!
        body:String
        name:String
        email:String
        createdAt:String
        postId:Int
    }
    type like{
        id:ID!
        name:String
        email:String
        createdAt:String
        postId:Int
    }
    type Query{
        hello:String
        getUserDetails:[userdetail]
        getPostDetails:[postdetail]
        getPostdetail(
            id:Int!
        ):postdetail
        getUserPosts(
            email:String
        ):[postdetail]
    }
    type Mutation{
        registerUser(
            name:String
            email:String
            password:String
            createdAt:String
        ):userdetail
        loginUser(
            email:String
            password:String
        ):userdetail
        createPost(
            body:String
            title:String
        ):postdetail
        deletePost(
            id:Int!
        ):Boolean
        createComment(
            id:Int!
            body:String
        ):comment
        deleteComment(
            commentId:Int!
        ):Boolean
        likePost(
            id:Int!
        ):postdetail
    }
`

module.exports = {
    typeDefs
}