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
    }
    type like{
        id:ID!
        name:String
        email:String
        createdAt:String
    }
    type Query{
        hello:String
        getUserDetails:[userdetail]
        getPostDetails:[postdetail]
        getPostdetail(
            id:ID!
        ):postdetail
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
            id:ID!
        ):Boolean
        createComment(
            id:ID!
            body:String
        ):comment
        deleteComment(
            postId:ID!
            commentId:ID!
        ):Boolean
        likePost(
            id:ID!
        ):postdetail
    }
`

module.exports = {
    typeDefs
}